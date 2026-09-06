import { NextRequest, NextResponse } from "next/server";
import { submitInquiry } from "@/lib/intake";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = await submitInquiry(req, {
    name: body.name?.trim() ?? "",
    email: body.email?.trim() ?? "",
    subject: body.subject?.trim(),
    message: body.message?.trim() ?? "",
  });

  if (!result.ok) {
    if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
    if (result.message?.startsWith("Too many"))
      return NextResponse.json({ error: result.message }, { status: 429 });
    return NextResponse.json({ error: result.message ?? "Server error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
