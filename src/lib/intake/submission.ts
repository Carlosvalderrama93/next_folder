import { rateLimit, getIp } from "./rate-limit";
import { validateApplication, validateInquiry } from "./validation";
import { applicationHtml, applicationSubject, inquiryHtml, inquirySubject } from "./templates";
import { sendNotification } from "./notification-adapter";
import { persistApplicationToStrapi, persistInquiryToStrapi } from "./persistence-adapter";
import type { ApplicationInput, InquiryInput, IntakeResult } from "./types";

async function checkRateLimit(req: Request): Promise<{ allowed: boolean; retryAfter: number }> {
  return await rateLimit(getIp(req));
}

export async function submitApplication(
  req: Request,
  input: ApplicationInput
): Promise<IntakeResult> {
  const { allowed, retryAfter } = await checkRateLimit(req);
  if (!allowed) {
    return {
      ok: false,
      status: 429,
      failureReason: "RATE_LIMITED",
      message: `Too many requests. Retry after ${retryAfter}s.`,
    };
  }

  const validation = validateApplication(input);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      failureReason: "VALIDATION_FAILED",
      errors: validation.errors,
    };
  }

  try {
    await sendNotification({
      subject: applicationSubject(input),
      html: applicationHtml(input),
      attachments: input.cv
        ? [{ filename: input.cv.filename, content: input.cv.buffer }]
        : undefined,
    });

    try {
      await persistApplicationToStrapi(input);
    } catch (persistErr) {
      console.warn("[intake] Application persistence fallback:", persistErr);
    }

    return { ok: true, status: 200 };
  } catch (err) {
    console.error("[intake] submitApplication error:", err);
    return {
      ok: false,
      status: 500,
      failureReason: "DISPATCH_FAILED",
      message: "Server error",
    };
  }
}

export async function submitInquiry(
  req: Request,
  input: InquiryInput
): Promise<IntakeResult> {
  const { allowed, retryAfter } = await checkRateLimit(req);
  if (!allowed) {
    return {
      ok: false,
      status: 429,
      failureReason: "RATE_LIMITED",
      message: `Too many requests. Retry after ${retryAfter}s.`,
    };
  }

  const validation = validateInquiry(input);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      failureReason: "VALIDATION_FAILED",
      errors: validation.errors,
    };
  }

  try {
    await sendNotification({
      subject: inquirySubject(input),
      html: inquiryHtml(input),
    });

    try {
      await persistInquiryToStrapi(input);
    } catch (persistErr) {
      console.warn("[intake] Inquiry persistence fallback:", persistErr);
    }

    return { ok: true, status: 200 };
  } catch (err) {
    console.error("[intake] submitInquiry error:", err);
    return {
      ok: false,
      status: 500,
      failureReason: "DISPATCH_FAILED",
      message: "Server error",
    };
  }
}
