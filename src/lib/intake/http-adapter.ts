import { NextResponse } from "next/server";
import { submitApplication, submitInquiry } from "./submission";
import type { ApplicationInput } from "./types";

/**
 * Encapsulates HTTP request decoding and response dispatching for job applications.
 */
export async function handleApplicationRequest(req: Request): Promise<Response> {
  const contentType = req.headers.get("content-type") ?? "";
  const fields: Record<string, string> = {};
  let cv: ApplicationInput["cv"] = undefined;

  if (contentType.includes("multipart/form-data")) {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { errors: { name: "Name is required.", email: "Valid email is required." } },
        { status: 400 }
      );
    }
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        cv = {
          filename: value.name,
          buffer: Buffer.from(await value.arrayBuffer()),
          mimeType: value.type,
          sizeBytes: value.size,
        };
      } else if (typeof value === "string") {
        fields[key] = value;
      }
    }
  } else {
    try {
      const parsed = await req.json();
      if (parsed && typeof parsed === "object") {
        for (const [key, value] of Object.entries(parsed)) {
          if (typeof value === "string") fields[key] = value;
        }
      }
    } catch {
      return NextResponse.json(
        { errors: { name: "Name is required.", email: "Valid email is required." } },
        { status: 400 }
      );
    }
  }

  const result = await submitApplication(req, {
    name: fields.name?.trim() ?? "",
    email: fields.email?.trim() ?? "",
    phone: fields.phone?.trim(),
    linkedin: fields.linkedin?.trim(),
    message: fields.message?.trim() ?? "",
    jobId: fields.jobId ?? "",
    jobTitle: fields.jobTitle ?? "",
    cv,
  });

  if (!result.ok) {
    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }
    if (result.status === 429 || result.failureReason === "RATE_LIMITED") {
      return NextResponse.json({ error: result.message }, { status: 429 });
    }
    return NextResponse.json(
      { error: result.message ?? "Server error" },
      { status: result.status ?? 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

/**
 * Encapsulates HTTP request decoding and response dispatching for general inquiries.
 */
export async function handleInquiryRequest(req: Request): Promise<Response> {
  const body: Record<string, string> = {};
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await req.formData();
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          body[key] = value;
        }
      }
    } catch {
      return NextResponse.json(
        { errors: { name: "Name is required.", email: "Valid email is required." } },
        { status: 400 }
      );
    }
  } else {
    try {
      const parsed = await req.json();
      if (parsed && typeof parsed === "object") {
        for (const [key, value] of Object.entries(parsed)) {
          if (typeof value === "string") body[key] = value;
        }
      }
    } catch {
      return NextResponse.json(
        { errors: { name: "Name is required.", email: "Valid email is required." } },
        { status: 400 }
      );
    }
  }

  const result = await submitInquiry(req, {
    name: body.name?.trim() ?? "",
    email: body.email?.trim() ?? "",
    subject: body.subject?.trim(),
    message: body.message?.trim() ?? "",
  });

  if (!result.ok) {
    if (result.errors) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }
    if (result.status === 429 || result.failureReason === "RATE_LIMITED") {
      return NextResponse.json({ error: result.message }, { status: 429 });
    }
    return NextResponse.json(
      { error: result.message ?? "Server error" },
      { status: result.status ?? 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
