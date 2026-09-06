/**
 * Intake module — single interface for submitting Applications and Inquiries.
 *
 * Callers import only { submitApplication, submitInquiry } and validation constants/helpers.
 * Rate limiting, validation, HTML rendering, and notification dispatching are
 * hidden behind the seam.
 */

import { rateLimit, getIp } from "./rate-limit";
import { validateApplication, validateInquiry } from "./validation";
import { applicationHtml, applicationSubject, inquiryHtml, inquirySubject } from "./templates";
import { sendNotification } from "./notification-adapter";
import type { ApplicationInput, InquiryInput, IntakeResult } from "./types";

export type { ApplicationInput, InquiryInput, IntakeResult } from "./types";
export {
  ALLOWED_CV_MIME,
  ALLOWED_CV_EXTENSIONS,
  MAX_CV_BYTES,
  EMAIL_RE,
  LINKEDIN_RE,
  isValidEmail,
  isValidLinkedInUrl,
  isAllowedCvMime,
  isAllowedCvSize,
  validateApplication,
  validateInquiry,
} from "./validation";

// ── Rate-limit helper ────────────────────────────────────────────────────────

function checkRateLimit(req: Request): { allowed: boolean; retryAfter: number } {
  return rateLimit(getIp(req));
}

// ── submitApplication ────────────────────────────────────────────────────────

export async function submitApplication(
  req: Request,
  input: ApplicationInput
): Promise<IntakeResult> {
  const { allowed, retryAfter } = checkRateLimit(req);
  if (!allowed) {
    return {
      ok: false,
      message: `Too many requests. Retry after ${retryAfter}s.`,
    };
  }

  const validation = validateApplication(input);
  if (!validation.ok) {
    return { ok: false, errors: validation.errors };
  }

  try {
    await sendNotification({
      subject: applicationSubject(input),
      html: applicationHtml(input),
      attachments: input.cv
        ? [{ filename: input.cv.filename, content: input.cv.buffer }]
        : undefined,
    });
    return { ok: true };
  } catch (err) {
    console.error("[intake] submitApplication error:", err);
    return { ok: false, message: "Server error" };
  }
}

// ── submitInquiry ────────────────────────────────────────────────────────────

export async function submitInquiry(
  req: Request,
  input: InquiryInput
): Promise<IntakeResult> {
  const { allowed, retryAfter } = checkRateLimit(req);
  if (!allowed) {
    return {
      ok: false,
      message: `Too many requests. Retry after ${retryAfter}s.`,
    };
  }

  const validation = validateInquiry(input);
  if (!validation.ok) {
    return { ok: false, errors: validation.errors };
  }

  try {
    await sendNotification({
      subject: inquirySubject(input),
      html: inquiryHtml(input),
    });
    return { ok: true };
  } catch (err) {
    console.error("[intake] submitInquiry error:", err);
    return { ok: false, message: "Server error" };
  }
}
