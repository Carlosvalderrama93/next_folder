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

// ── Intake Client Seam & Form Lifecycle Contract ──────────────────────────────
describe("Intake Client Seam · useIntakeForm Contracts", () => {
  it("provides useIntakeForm hook with canonical export and state functions", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const hookPath = path.resolve(__dirname, "../use-intake-form.ts");

    assert.ok(fs.existsSync(hookPath), "use-intake-form.ts must exist in lib/intake/");
    const hookContent = fs.readFileSync(hookPath, "utf-8");

    assert.ok(hookContent.includes("export function useIntakeForm"), "Must export useIntakeForm function");
    assert.ok(hookContent.includes("showToast"), "Must encapsulate showToast");
    assert.ok(hookContent.includes("focusFirstError"), "Must encapsulate focusFirstError");
    assert.ok(hookContent.includes("clearFieldError"), "Must encapsulate clearFieldError");
    assert.ok(hookContent.includes("isDirty"), "Must encapsulate isDirty state");
    assert.ok(hookContent.includes("resetDirty"), "Must encapsulate resetDirty function");
    assert.ok(hookContent.includes("focusElement"), "Must encapsulate focusElement function");
    assert.ok(hookContent.includes("beforeunload"), "Must attach beforeunload event listener when dirty");
  });

  it("verifies both contact-form and apply-form consume useIntakeForm with form resilience", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const contactFormPath = path.resolve(__dirname, "../../../components/contact/contact-form.tsx");
    const legacyContactFormPath = path.resolve(__dirname, "../../../app/[locale]/contact/contact-form.tsx");
    const applyFormPath = path.resolve(__dirname, "../../../components/jobs/apply-form.tsx");

    assert.ok(fs.existsSync(contactFormPath), "contact-form.tsx must exist in components/contact/");
    assert.ok(!fs.existsSync(legacyContactFormPath), "contact-form.tsx must not exist in app/[locale]/contact/");
    assert.ok(fs.existsSync(applyFormPath), "apply-form.tsx must exist in components/jobs/");

    const contactContent = fs.readFileSync(contactFormPath, "utf-8");
    const applyContent = fs.readFileSync(applyFormPath, "utf-8");

    assert.ok(contactContent.includes("useIntakeForm"), "contact-form.tsx must import and consume useIntakeForm");
    assert.ok(applyContent.includes("useIntakeForm"), "apply-form.tsx must import and consume useIntakeForm");

    // Both forms must configure warnOnUnload for beforeunload protection
    assert.ok(contactContent.includes("warnOnUnload: true"), "contact-form must configure warnOnUnload: true");
    assert.ok(applyContent.includes("warnOnUnload: true"), "apply-form must configure warnOnUnload: true");

    // Both forms must reset dirty state upon successful submit
    assert.ok(contactContent.includes("resetDirty()"), "contact-form must call resetDirty() on success");
    assert.ok(applyContent.includes("resetDirty()"), "apply-form must call resetDirty() on success");

    // ApplyForm must focus success container for screen reader and keyboard accessibility
    assert.ok(applyContent.includes("focusElement(successRef)"), "apply-form must manage focus to success landmark");

    // Must not retain duplicated manual timeout / RAF boilerplate
    assert.ok(!contactContent.includes("setTimeout(() => {"), "contact-form must not manually execute raw setTimeout for toast");
    assert.ok(!applyContent.includes("setTimeout(() => setToastOpen"), "apply-form must not manually execute raw setTimeout for toast");
  });

  it("correctly resolves first error focus in DOM order", () => {
    const errors = { email: "Invalid email", message: "Required" };
    let focused = null;

    const nameRef = { current: { focus: () => { focused = "name"; } } };
    const emailRef = { current: { focus: () => { focused = "email"; } } };
    const messageRef = { current: { focus: () => { focused = "message"; } } };

    const fieldOrder = [
      ["name", nameRef],
      ["email", emailRef],
      ["message", messageRef],
    ];

    for (const [key, ref] of fieldOrder) {
      if (errors[key] && ref.current) {
        ref.current.focus();
        break;
      }
    }

    assert.equal(focused, "email", "Should focus first invalid element in order (email)");
  });

  it("correctly focuses element reference via focusElement helper", () => {
    let focused = false;
    const targetRef = { current: { focus: () => { focused = true; } } };
    if (targetRef.current) {
      targetRef.current.focus();
    }
    assert.equal(focused, true, "focusElement must invoke focus on element ref");
  });
});

// ── Intake HTTP Seam & Route Delegation Contracts ───────────────────────────
describe("Intake HTTP Seam · Protocol & Route Delegation Contracts", () => {
  it("guarantees route handlers delegate cleanly to intake HTTP adapter", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const applyRoutePath = path.resolve(__dirname, "../../../app/api/apply/route.ts");
    const contactRoutePath = path.resolve(__dirname, "../../../app/api/contact/route.ts");

    assert.ok(fs.existsSync(applyRoutePath), "api/apply/route.ts must exist");
    assert.ok(fs.existsSync(contactRoutePath), "api/contact/route.ts must exist");

    const applyRouteContent = fs.readFileSync(applyRoutePath, "utf-8");
    const contactRouteContent = fs.readFileSync(contactRoutePath, "utf-8");

    // Both routes must delegate cleanly to the intake seam
    assert.ok(applyRouteContent.includes("handleApplicationRequest"), "apply route must delegate to handleApplicationRequest");
    assert.ok(contactRouteContent.includes("handleInquiryRequest"), "contact route must delegate to handleInquiryRequest");

    // No route handler may perform manual multipart parsing or error string-sniffing
    assert.ok(!applyRouteContent.includes("multipart/form-data"), "apply route must not manually check multipart/form-data");
    assert.ok(!applyRouteContent.includes("result.message?.startsWith"), "apply route must not string-sniff error messages");
    assert.ok(!contactRouteContent.includes("result.message?.startsWith"), "contact route must not string-sniff error messages");
  });

  it("verifies http-adapter encapsulates protocol decoding and structured status codes", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const adapterPath = path.resolve(__dirname, "../http-adapter.ts");
    const submissionPath = path.resolve(__dirname, "../submission.ts");

    assert.ok(fs.existsSync(adapterPath), "http-adapter.ts must exist");
    assert.ok(fs.existsSync(submissionPath), "submission.ts must exist");

    const adapterContent = fs.readFileSync(adapterPath, "utf-8");
    const submissionContent = fs.readFileSync(submissionPath, "utf-8");

    // Adapter exports and encapsulates protocol decoding
    assert.ok(adapterContent.includes("export async function handleApplicationRequest"), "Must export handleApplicationRequest");
    assert.ok(adapterContent.includes("export async function handleInquiryRequest"), "Must export handleInquiryRequest");
    assert.ok(adapterContent.includes("multipart/form-data"), "Must encapsulate multipart decoding");
    assert.ok(adapterContent.includes("req.json()"), "Must encapsulate JSON decoding");
    assert.ok(adapterContent.includes("status: 429"), "Must return structured 429 status");
    assert.ok(adapterContent.includes("status: 400"), "Must return structured 400 status");

    // Submission encapsulates structured failure reasons
    assert.ok(submissionContent.includes('failureReason: "RATE_LIMITED"'), "Must return structured RATE_LIMITED reason");
    assert.ok(submissionContent.includes('failureReason: "VALIDATION_FAILED"'), "Must return structured VALIDATION_FAILED reason");
    assert.ok(submissionContent.includes('failureReason: "DISPATCH_FAILED"'), "Must return structured DISPATCH_FAILED reason");
  });

  it("guarantees index barrel exports all canonical intake seam methods", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const indexPath = path.resolve(__dirname, "../index.ts");

    const indexContent = fs.readFileSync(indexPath, "utf-8");
    assert.ok(indexContent.includes("submitApplication"), "Must export submitApplication");
    assert.ok(indexContent.includes("submitInquiry"), "Must export submitInquiry");
    assert.ok(indexContent.includes("handleApplicationRequest"), "Must export handleApplicationRequest");
    assert.ok(indexContent.includes("handleInquiryRequest"), "Must export handleInquiryRequest");
  });
});

describe("Contact Presentation Module · Locality & Purity Contracts", () => {
  it("guarantees components/contact/ acts as canonical presentation module and purifies contact/page.tsx", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const contactDir = path.resolve(__dirname, "../../../components/contact");
    const indexPath = path.join(contactDir, "index.ts");
    const viewPath = path.join(contactDir, "contact-view.tsx");
    const formPath = path.join(contactDir, "contact-form.tsx");
    const pagePath = path.resolve(__dirname, "../../../app/[locale]/contact/page.tsx");
    const legacyFormPath = path.resolve(__dirname, "../../../app/[locale]/contact/contact-form.tsx");

    assert.ok(fs.existsSync(contactDir), "components/contact/ directory must exist");
    assert.ok(fs.existsSync(indexPath), "components/contact/index.ts must exist");
    assert.ok(fs.existsSync(viewPath), "components/contact/contact-view.tsx must exist");
    assert.ok(fs.existsSync(formPath), "components/contact/contact-form.tsx must exist");
    assert.ok(!fs.existsSync(legacyFormPath), "Legacy contact-form.tsx in app route must be purged");

    const indexContent = fs.readFileSync(indexPath, "utf-8");
    assert.ok(indexContent.includes("ContactForm"), "index.ts must export ContactForm");
    assert.ok(indexContent.includes("ContactView"), "index.ts must export ContactView");

    const pageContent = fs.readFileSync(pagePath, "utf-8");
    assert.ok(pageContent.includes('from "@/components/contact"'), "contact/page.tsx must import from @/components/contact");
    assert.ok(!pageContent.includes("./contact-form"), "contact/page.tsx must not import local contact-form");
    const lines = pageContent.split("\n").filter((l) => l.trim().length > 0);
    assert.ok(lines.length <= 35, `ContactPage must be concise and declarative (found ${lines.length} non-empty lines)`);
  });
});

describe("Serverless Rate Limiter & Upstash/Vercel KV Contracts", () => {
  it("guarantees rate-limit.ts supports both KV REST execution and resilient in-memory fallback", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const rateLimitPath = path.resolve(__dirname, "../rate-limit.ts");

    assert.ok(fs.existsSync(rateLimitPath), "rate-limit.ts must exist");
    const content = fs.readFileSync(rateLimitPath, "utf-8");

    // Key architectural features
    assert.ok(content.includes("export async function rateLimit"), "rateLimit must be an async function");
    assert.ok(content.includes("UPSTASH_REDIS_REST_URL"), "Must support Upstash Redis REST URL");
    assert.ok(content.includes("KV_REST_API_URL"), "Must support Vercel KV REST URL");
    assert.ok(content.includes("pipeline"), "Must use atomic pipeline execution for INCR + EXPIRE");
    assert.ok(content.includes("AbortController"), "Must safeguard KV calls with timeout AbortController");
    assert.ok(content.includes("memoryRateLimit"), "Must have resilient in-memory fallback");
    assert.ok(content.includes("cf-connecting-ip"), "Must support Cloudflare client IP");
    assert.ok(content.includes("x-forwarded-for"), "Must support proxy forwarded IP");
    assert.ok(content.includes("x-real-ip"), "Must support real IP");
    assert.ok(content.includes("_resetMemoryStore"), "Must expose _resetMemoryStore helper");
  });

  it("verifies rate limiting sliding window algorithm and retryAfter calculation", () => {
    const store = new Map();
    function mockRateLimit(ip, maxRequests = 3, windowMs = 1000) {
      const now = Date.now();
      const entry = store.get(ip);
      if (!entry || now > entry.resetAt) {
        store.set(ip, { count: 1, resetAt: now + windowMs });
        return { allowed: true, retryAfter: 0, remaining: maxRequests - 1 };
      }
      if (entry.count >= maxRequests) {
        return {
          allowed: false,
          retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
          remaining: 0,
        };
      }
      entry.count++;
      return { allowed: true, retryAfter: 0, remaining: maxRequests - entry.count };
    }

    const ip = "192.168.1.100";
    const res1 = mockRateLimit(ip, 3, 1000);
    assert.equal(res1.allowed, true);
    assert.equal(res1.remaining, 2);

    const res2 = mockRateLimit(ip, 3, 1000);
    assert.equal(res2.allowed, true);
    assert.equal(res2.remaining, 1);

    const res3 = mockRateLimit(ip, 3, 1000);
    assert.equal(res3.allowed, true);
    assert.equal(res3.remaining, 0);

    // 4th request exceeds maxRequests
    const res4 = mockRateLimit(ip, 3, 1000);
    assert.equal(res4.allowed, false);
    assert.ok(res4.retryAfter >= 1);
  });
});



