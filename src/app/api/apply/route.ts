import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jobId, jobTitle, name, email, linkedin, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Log the application — replace with your email/ATS service:
    // e.g. Resend: await resend.emails.send({ from, to, subject, html })
    console.log("Job application received:", { jobId, jobTitle, name, email, linkedin, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
