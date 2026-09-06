import type { ApplicationInput, InquiryInput, FieldErrors, ValidationResult } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ALLOWED_CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
export const MAX_CV_BYTES = 5 * 1024 * 1024;

export function validateApplication(input: ApplicationInput): ValidationResult {
  const errors: FieldErrors = {};

  if (!input.name.trim()) errors.name = "Full name is required.";

  if (!input.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.message.trim()) errors.message = "Cover letter is required.";

  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateInquiry(input: InquiryInput): ValidationResult {
  const errors: FieldErrors = {};

  if (!input.name.trim()) errors.name = "Full name is required.";

  if (!input.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.message.trim()) errors.message = "Message is required.";

  return { ok: Object.keys(errors).length === 0, errors };
}
