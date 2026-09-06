/**
 * Unit tests for src/lib/intake — validation and templates.
 * Run with: node --test src/lib/intake/__tests__/intake.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Inline validation (mirrors validation.ts) ─────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateApplication(input) {
  const errors = {};
  if (!input.name?.trim()) errors.name = "Full name is required.";
  if (!input.email?.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(input.email)) errors.email = "Enter a valid email address.";
  if (!input.message?.trim()) errors.message = "Cover letter is required.";
  return { ok: Object.keys(errors).length === 0, errors };
}

function validateInquiry(input) {
  const errors = {};
  if (!input.name?.trim()) errors.name = "Full name is required.";
  if (!input.email?.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(input.email)) errors.email = "Enter a valid email address.";
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
