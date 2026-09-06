import type { ApplicationInput, InquiryInput, FieldErrors, ValidationResult } from "./types";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const LINKEDIN_RE = /linkedin\.com/i;

export const ALLOWED_CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const ALLOWED_CV_EXTENSIONS = ".pdf,.doc,.docx" as const;
export const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isValidLinkedInUrl(url: string): boolean {
  const trimmed = url.trim();
  return !trimmed || LINKEDIN_RE.test(trimmed);
}

export function isAllowedCvMime(mimeType: string): boolean {
  return ALLOWED_CV_MIME.has(mimeType);
}

export function isAllowedCvSize(sizeBytes: number): boolean {
  return sizeBytes <= MAX_CV_BYTES;
}

export function validateApplication(input: ApplicationInput): ValidationResult {
  const errors: FieldErrors = {};

  if (!input.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!input.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (input.linkedin && !isValidLinkedInUrl(input.linkedin)) {
    errors.linkedin = "Enter a valid LinkedIn profile URL.";
  }

  if (!input.message.trim()) {
    errors.message = "Cover letter is required.";
  }

  if (input.cv) {
    if (input.cv.mimeType && !isAllowedCvMime(input.cv.mimeType)) {
      errors.cv = "Only PDF, DOC, and DOCX files are allowed.";
    } else {
      const size = input.cv.sizeBytes ?? input.cv.buffer?.length ?? 0;
      if (!isAllowedCvSize(size)) {
        errors.cv = "CV must be under 5 MB.";
      }
    }
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

export function validateInquiry(input: InquiryInput): ValidationResult {
  const errors: FieldErrors = {};

  if (!input.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!input.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!input.message.trim()) {
    errors.message = "Message is required.";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}
