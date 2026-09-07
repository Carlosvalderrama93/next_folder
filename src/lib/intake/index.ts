/**
 * Intake module — single interface for submitting Applications and Inquiries.
 *
 * Callers import only { submitApplication, submitInquiry, handleApplicationRequest, handleInquiryRequest }
 * and validation constants/helpers.
 * Rate limiting, validation, HTML rendering, notification dispatching,
 * and HTTP protocol decoding are hidden behind the seam.
 */

export type {
  ApplicationInput,
  InquiryInput,
  IntakeResult,
  IntakeFailureReason,
  FieldErrors,
  ValidationResult,
} from "./types";

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

export { submitApplication, submitInquiry } from "./submission";
export { handleApplicationRequest, handleInquiryRequest } from "./http-adapter";
export { persistApplicationToStrapi, persistInquiryToStrapi } from "./persistence-adapter";

