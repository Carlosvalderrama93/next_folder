import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIp } from "@/lib/rate-limit";
import { escapeHtml, isValidEmail } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const { allowed, retryAfter } = rateLimit(getIp(req));
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  try {
    const contentType = req.headers.get("content-type") ?? "";
    let fields: Record<string, string> = {};
    let cvFilename = "";
    let cvBuffer: Buffer | null = null;

    if (contentType.includes("multipart/form-data")) {
      const ALLOWED_MIME = new Set([
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]);
      const MAX_BYTES = 5 * 1024 * 1024;

      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (!ALLOWED_MIME.has(value.type)) {
            return NextResponse.json(
              { errors: { cv: "Only PDF, DOC, and DOCX files are allowed." } },
              { status: 400 }
            );
          }
          if (value.size > MAX_BYTES) {
            return NextResponse.json(
              { errors: { cv: "CV must be under 5 MB." } },
              { status: 400 }
            );
          }
          cvFilename = value.name;
          cvBuffer = Buffer.from(await value.arrayBuffer());
        } else {
          fields[key] = value;
        }
      }
    } else {
      fields = await req.json();
    }

    const name = fields.name?.trim() ?? "";
    const email = fields.email?.trim() ?? "";
    const message = fields.message?.trim() ?? "";
    const linkedin = fields.linkedin?.trim() ?? "";
    const jobId = fields.jobId ?? "";
    const jobTitle = fields.jobTitle ?? "";

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Full name is required.";
    if (!email) errors.email = "Email address is required.";
    else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
    if (!message) errors.message = "Cover letter is required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

    if (apiKey && to) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      const attachments =
        cvBuffer && cvFilename
          ? [{ filename: cvFilename, content: cvBuffer }]
          : [];

      await resend.emails.send({
        from,
        to,
        subject: `New application for ${jobTitle || jobId}`,
        html: `
          <h2>New Job Application</h2>
          <p><strong>Position:</strong> ${escapeHtml(jobTitle || jobId)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${encodeURI(linkedin)}">${escapeHtml(linkedin)}</a></p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          ${cvFilename ? `<p><em>CV attached: ${escapeHtml(cvFilename)}</em></p>` : ""}
        `,
        attachments,
      });
    } else {
      console.log("Application received (set RESEND_API_KEY to enable emails):", {
        jobId, jobTitle, name, email, linkedin, message, cv: cvFilename,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
