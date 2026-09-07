import { rateLimit, getIp } from "./rate-limit";
import { validateApplication, validateInquiry } from "./validation";
import { applicationHtml, applicationSubject, inquiryHtml, inquirySubject } from "./templates";
import { sendNotification } from "./notification-adapter";
import type { ApplicationInput, InquiryInput, IntakeResult } from "./types";

function checkRateLimit(req: Request): { allowed: boolean; retryAfter: number } {
  return rateLimit(getIp(req));
}

export async function submitApplication(
  req: Request,
  input: ApplicationInput
): Promise<IntakeResult> {
  const { allowed, retryAfter } = checkRateLimit(req);
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
  const { allowed, retryAfter } = checkRateLimit(req);
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
