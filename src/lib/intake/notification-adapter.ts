/**
 * Notification adapter — two modes behind one seam:
 *   1. Resend (production): when RESEND_API_KEY + CONTACT_EMAIL are set.
 *   2. Dev/console (fallback): logs to stdout without crashing the flow.
 *
 * Callers never branch on env vars; the adapter absorbs the difference.
 */

interface SendOptions {
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}

export async function sendNotification(options: SendOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";

  if (apiKey && to) {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    });
  } else {
    console.log("[intake] Notification (set RESEND_API_KEY + CONTACT_EMAIL to send real emails):", {
      subject: options.subject,
      attachments: options.attachments?.map((a) => a.filename),
    });
  }
}
