import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let fields: Record<string, string> = {};
    let cvFilename = "";
    let cvBuffer: Buffer | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          cvFilename = value.name;
          cvBuffer = Buffer.from(await value.arrayBuffer());
        } else {
          fields[key] = value;
        }
      }
    } else {
      fields = await req.json();
    }

    const { jobId, jobTitle, name, email, linkedin, message } = fields;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
        subject: `New application for ${jobTitle ?? jobId}`,
        html: `
          <h2>New Job Application</h2>
          <p><strong>Position:</strong> ${jobTitle ?? jobId}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          ${cvFilename ? `<p><em>CV attached: ${cvFilename}</em></p>` : ""}
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
