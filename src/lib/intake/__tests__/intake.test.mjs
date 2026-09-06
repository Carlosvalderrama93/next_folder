/**
 * Unit tests for src/lib/intake — validation and templates.
 * Run with: node --test src/lib/intake/__tests__/intake.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Inline validation (mirrors validation.ts) ─────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_RE = /linkedin\.com/i;

const ALLOWED_CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_CV_EXTENSIONS = ".pdf,.doc,.docx";
const MAX_CV_BYTES = 5 * 1024 * 1024;

function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

function isValidLinkedInUrl(url) {
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  return !trimmed || LINKEDIN_RE.test(trimmed);
}

function isAllowedCvMime(mimeType) {
  return ALLOWED_CV_MIME.has(mimeType);
}

function isAllowedCvSize(sizeBytes) {
  return typeof sizeBytes === "number" && sizeBytes <= MAX_CV_BYTES;
}

function validateApplication(input) {
  const errors = {};
  if (!input.name?.trim()) errors.name = "Full name is required.";
  if (!input.email?.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (input.linkedin && !isValidLinkedInUrl(input.linkedin)) {
    errors.linkedin = "Enter a valid LinkedIn profile URL.";
  }
  if (!input.message?.trim()) errors.message = "Cover letter is required.";
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

function validateInquiry(input) {
  const errors = {};
  if (!input.name?.trim()) errors.name = "Full name is required.";
  if (!input.email?.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!input.message?.trim()) errors.message = "Message is required.";
  return { ok: Object.keys(errors).length === 0, errors };
}

// ── Inline templates (mirrors templates.ts) ───────────────────────────────────
function escape(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function applicationSubject(input) {
  return `New application for ${input.jobTitle || input.jobId}`;
}
function inquirySubject(input) {
  return input.subject ? `Contact: ${input.subject}` : `New contact from ${input.name}`;
}

// ── Fixtures ─────────────────────────────────────────────────────────────────
const validApp = {
  name: "Jane Doe", email: "jane@example.com",
  message: "I am a great fit.", jobId: "10", jobTitle: "Node.js Developer",
};
const validInquiry = {
  name: "Bob Smith", email: "bob@example.com",
  message: "Interested in partnership.",
};

// ── validateApplication ───────────────────────────────────────────────────────
describe("validateApplication", () => {
  it("returns ok=true for valid input", () => {
    const res = validateApplication(validApp);
    assert.equal(res.ok, true);
    assert.deepEqual(res.errors, {});
  });

  it("requires name", () => {
    const res = validateApplication({ ...validApp, name: "" });
    assert.equal(res.ok, false);
    assert.ok("name" in res.errors);
  });

  it("requires email", () => {
    const res = validateApplication({ ...validApp, email: "" });
    assert.equal(res.ok, false);
    assert.ok("email" in res.errors);
  });

  it("rejects malformed email", () => {
    const res = validateApplication({ ...validApp, email: "not-an-email" });
    assert.equal(res.ok, false);
    assert.ok("email" in res.errors);
  });

  it("requires message (cover letter)", () => {
    const res = validateApplication({ ...validApp, message: "  " });
    assert.equal(res.ok, false);
    assert.ok("message" in res.errors);
  });

  it("accumulates multiple errors", () => {
    const res = validateApplication({ name: "", email: "", message: "", jobId: "", jobTitle: "" });
    assert.equal(res.ok, false);
    assert.ok("name" in res.errors);
    assert.ok("email" in res.errors);
    assert.ok("message" in res.errors);
  });

  it("accepts valid CV attachment (PDF under 5MB)", () => {
    const res = validateApplication({
      ...validApp,
      cv: { filename: "cv.pdf", mimeType: "application/pdf", sizeBytes: 1024 * 1024 },
    });
    assert.equal(res.ok, true);
    assert.equal(res.errors.cv, undefined);
  });

  it("rejects CV with unsupported MIME type", () => {
    const res = validateApplication({
      ...validApp,
      cv: { filename: "script.exe", mimeType: "application/x-msdownload", sizeBytes: 500 },
    });
    assert.equal(res.ok, false);
    assert.equal(res.errors.cv, "Only PDF, DOC, and DOCX files are allowed.");
  });

  it("rejects CV exceeding 5MB size limit", () => {
    const res = validateApplication({
      ...validApp,
      cv: { filename: "huge.pdf", mimeType: "application/pdf", sizeBytes: 6 * 1024 * 1024 },
    });
    assert.equal(res.ok, false);
    assert.equal(res.errors.cv, "CV must be under 5 MB.");
  });

  it("accepts valid LinkedIn profile URL", () => {
    const res = validateApplication({
      ...validApp,
      linkedin: "https://www.linkedin.com/in/janedoe",
    });
    assert.equal(res.ok, true);
    assert.equal(res.errors.linkedin, undefined);
  });

  it("rejects invalid LinkedIn profile URL", () => {
    const res = validateApplication({
      ...validApp,
      linkedin: "https://github.com/janedoe",
    });
    assert.equal(res.ok, false);
    assert.equal(res.errors.linkedin, "Enter a valid LinkedIn profile URL.");
  });

  it("allows omitting optional LinkedIn URL", () => {
    const res = validateApplication({
      ...validApp,
      linkedin: "",
    });
    assert.equal(res.ok, true);
    assert.equal(res.errors.linkedin, undefined);
  });
});

// ── Validation Helpers ────────────────────────────────────────────────────────
describe("validation helpers", () => {
  it("isValidEmail correctly validates email formats", () => {
    assert.equal(isValidEmail("test@example.com"), true);
    assert.equal(isValidEmail("user.name+tag@sub.domain.org"), true);
    assert.equal(isValidEmail(""), false);
    assert.equal(isValidEmail("not-an-email"), false);
    assert.equal(isValidEmail("user@domain"), false);
  });

  it("isValidLinkedInUrl checks for linkedin.com in url", () => {
    assert.equal(isValidLinkedInUrl("https://linkedin.com/in/user"), true);
    assert.equal(isValidLinkedInUrl("https://www.linkedin.com/in/user/"), true);
    assert.equal(isValidLinkedInUrl(""), true); // optional
    assert.equal(isValidLinkedInUrl("https://facebook.com/user"), false);
  });

  it("isAllowedCvMime checks allowed document types", () => {
    assert.equal(isAllowedCvMime("application/pdf"), true);
    assert.equal(isAllowedCvMime("application/msword"), true);
    assert.equal(isAllowedCvMime("application/vnd.openxmlformats-officedocument.wordprocessingml.document"), true);
    assert.equal(isAllowedCvMime("application/zip"), false);
    assert.equal(isAllowedCvMime("image/png"), false);
  });

  it("isAllowedCvSize checks byte thresholds", () => {
    assert.equal(isAllowedCvSize(1024), true);
    assert.equal(isAllowedCvSize(5 * 1024 * 1024), true);
    assert.equal(isAllowedCvSize(5 * 1024 * 1024 + 1), false);
    assert.equal(isAllowedCvSize(10 * 1024 * 1024), false);
  });

  it("exposes ALLOWED_CV_EXTENSIONS string", () => {
    assert.equal(ALLOWED_CV_EXTENSIONS, ".pdf,.doc,.docx");
  });
});

// ── validateInquiry ───────────────────────────────────────────────────────────
describe("validateInquiry", () => {
  it("returns ok=true for valid input", () => {
    const res = validateInquiry(validInquiry);
    assert.equal(res.ok, true);
  });

  it("requires name", () => {
    const res = validateInquiry({ ...validInquiry, name: "" });
    assert.equal(res.ok, false);
    assert.ok("name" in res.errors);
  });

  it("rejects malformed email", () => {
    const res = validateInquiry({ ...validInquiry, email: "bad@@email" });
    assert.equal(res.ok, false);
    assert.ok("email" in res.errors);
  });

  it("requires message", () => {
    const res = validateInquiry({ ...validInquiry, message: "" });
    assert.equal(res.ok, false);
    assert.ok("message" in res.errors);
  });
});

// ── templates — subjects ──────────────────────────────────────────────────────
describe("applicationSubject", () => {
  it("uses jobTitle when present", () => {
    assert.equal(applicationSubject(validApp), "New application for Node.js Developer");
  });

  it("falls back to jobId when jobTitle is empty", () => {
    assert.equal(applicationSubject({ ...validApp, jobTitle: "" }), "New application for 10");
  });
});

describe("inquirySubject", () => {
  it("prefixes 'Contact:' when subject given", () => {
    assert.equal(inquirySubject({ ...validInquiry, subject: "Partnership" }), "Contact: Partnership");
  });

  it("uses sender name when subject absent", () => {
    assert.equal(inquirySubject(validInquiry), "New contact from Bob Smith");
  });
});

// ── escape ────────────────────────────────────────────────────────────────────
describe("escape", () => {
  it("escapes & < > quotes and apostrophes", () => {
    const input = ["&", "<", ">", '"', "'"].join("");
    const expected = "&amp;&lt;&gt;&quot;&#x27;";
    assert.equal(escape(input), expected);
  });
});
