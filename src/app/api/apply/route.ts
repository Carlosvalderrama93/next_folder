import { NextRequest, NextResponse } from "next/server";
import { submitApplication } from "@/lib/intake";

export async function POST(req: NextRequest) {
  // ── Parse multipart / JSON ─────────────────────────────────────────────────
  const contentType = req.headers.get("content-type") ?? "";
  let fields: Record<string, string> = {};
  let cv: { filename: string; buffer: Buffer; mimeType?: string; sizeBytes?: number } | undefined;

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
      } else {
        fields[key] = value;
      }
    }
  } else {
    try {
      fields = await req.json();
    } catch {
      return NextResponse.json(
        { errors: { name: "Name is required.", email: "Valid email is required." } },
        { status: 400 }
      );
    }
  }

  // ── Delegate to intake module ──────────────────────────────────────────────
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
    if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
    if (result.message?.startsWith("Too many"))
      return NextResponse.json({ error: result.message }, { status: 429 });
    return NextResponse.json({ error: result.message ?? "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
