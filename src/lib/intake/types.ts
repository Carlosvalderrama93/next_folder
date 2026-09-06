// ── Shared field types ───────────────────────────────────────────────────────

export interface ApplicationInput {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  message: string;
  jobId: string;
  jobTitle: string;
  cv?: {
    filename: string;
    buffer: Buffer;
    mimeType?: string;
    sizeBytes?: number;
  };
}

export interface InquiryInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// ── Validation result ────────────────────────────────────────────────────────

export type FieldErrors = Record<string, string>;

export interface ValidationResult {
  ok: boolean;
  errors: FieldErrors;
}

// ── Dispatch result ──────────────────────────────────────────────────────────

export interface IntakeResult {
  ok: boolean;
  /** Field-level validation errors, present when ok=false */
  errors?: FieldErrors;
  /** Free-text error message for unexpected failures */
  message?: string;
}
