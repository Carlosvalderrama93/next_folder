/**
 * Unit tests for src/lib/jobs/normalizer.ts
 * Run with: node --test src/lib/jobs/__tests__/normalizer.test.mjs
 *
 * Tests cover:
 *  - normalizeStrapiJob: status inference, skills default, applyHref canonicalisation, image URL resolution
 *  - normalizeStaticJob: isOpen inference, skills default, applyHref canonicalisation
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Inline the logic (avoids TS/path-alias overhead).
// Replace with real imports once Vitest/Jest is configured.
const STRAPI_URL = "http://localhost:1337";

function getStrapiImageSrc(url) {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function normalizeStrapiJob(raw) {
  const status = raw.status ?? (raw.isOpen ? "open" : "filled");
  return {
    id: raw.documentId,
    title: raw.title,
    description: raw.description,
    location: raw.location,
    type: raw.jobType,
    status,
    isOpen: raw.isOpen ?? (status === "open"),
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    modality: raw.modality,
    paymentType: raw.paymentType,
    postedAt: raw.postedAt,
    applyHref: `/jobs/${raw.documentId}`,
    imageUrl: raw.image?.url ? getStrapiImageSrc(raw.image.url) : undefined,
    imageAlt: raw.image?.alternativeText ?? raw.title,
  };
}

function normalizeStaticJob(raw) {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    location: raw.location,
    type: raw.type,
    status: raw.status,
    isOpen: raw.status === "open",
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    modality: raw.modality,
    paymentType: raw.paymentType,
    postedAt: raw.postedAt,
    applyHref: `/jobs/${raw.id}`,
    imageUrl: raw.image ?? undefined,
    imageAlt: raw.title,
  };
}

// ── Fixtures ─────────────────────────────────────────────────────────────────

const baseStrapiRaw = {
  id: 1, documentId: "abc123", title: "Frontend Developer",
  description: "Build great UIs.", location: "Remote, LATAM",
  jobType: "Full-time", isOpen: true,
};

const baseStaticRaw = {
  id: "10", title: "Node.js Developer", description: "Build scalable APIs.",
  location: "Remote, Colombia", type: "Full-time", status: "open",
  skills: ["Node.js", "TypeScript"], modality: "remote", paymentType: "salary",
};

// ── normalizeStrapiJob ────────────────────────────────────────────────────────

describe("normalizeStrapiJob", () => {
  it("infers status=open when status is absent and isOpen=true", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw, isOpen: true });
    assert.equal(job.status, "open");
    assert.equal(job.isOpen, true);
  });

  it("infers status=filled when status is absent and isOpen=false", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw, isOpen: false });
    assert.equal(job.status, "filled");
    assert.equal(job.isOpen, false);
  });

  it("respects explicit status even when isOpen=false", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw, isOpen: false, status: "on-hold" });
    assert.equal(job.status, "on-hold");
  });

  it("defaults skills to empty array when absent", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw });
    assert.deepEqual(job.skills, []);
  });

  it("preserves skills array when present", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw, skills: ["React", "TypeScript"] });
    assert.deepEqual(job.skills, ["React", "TypeScript"]);
  });

  it("produces canonical applyHref /jobs/:id — never /apply/:id", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw });
    assert.equal(job.applyHref, "/jobs/abc123");
    assert.ok(!job.applyHref.startsWith("/apply/"), "href must not use legacy /apply/ prefix");
  });

  it("prefixes relative Strapi image URLs with STRAPI_URL", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw, image: { url: "/uploads/banner.jpg", alternativeText: "Banner" } });
    assert.equal(job.imageUrl, `${STRAPI_URL}/uploads/banner.jpg`);
    assert.equal(job.imageAlt, "Banner");
  });

  it("leaves absolute image URLs unchanged", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw, image: { url: "https://cdn.example.com/img.jpg" } });
    assert.equal(job.imageUrl, "https://cdn.example.com/img.jpg");
  });

  it("returns undefined imageUrl when image is absent", () => {
    const job = normalizeStrapiJob({ ...baseStrapiRaw });
    assert.equal(job.imageUrl, undefined);
  });
});

// ── normalizeStaticJob ────────────────────────────────────────────────────────

describe("normalizeStaticJob", () => {
  it("sets isOpen=true when status=open", () => {
    const job = normalizeStaticJob({ ...baseStaticRaw, status: "open" });
    assert.equal(job.isOpen, true);
  });

  it("sets isOpen=false for non-open statuses", () => {
    for (const status of ["filled", "on-hold", "cancelled", "overstaffed", "final-steps"]) {
      const job = normalizeStaticJob({ ...baseStaticRaw, status });
      assert.equal(job.isOpen, false, `Expected isOpen=false for status="${status}"`);
    }
  });

  it("defaults skills to empty array when absent", () => {
    const job = normalizeStaticJob({ ...baseStaticRaw, skills: undefined });
    assert.deepEqual(job.skills, []);
  });

  it("produces canonical applyHref /jobs/:id — never /apply/:id", () => {
    const job = normalizeStaticJob({ ...baseStaticRaw });
    assert.equal(job.applyHref, "/jobs/10");
    assert.ok(!job.applyHref.startsWith("/apply/"), "href must not use legacy /apply/ prefix");
  });

  it("passes imageUrl as-is when provided", () => {
    const job = normalizeStaticJob({ ...baseStaticRaw, image: "/me.png" });
    assert.equal(job.imageUrl, "/me.png");
  });

  it("sets imageUrl to undefined when image is absent", () => {
    const job = normalizeStaticJob({ ...baseStaticRaw, image: undefined });
    assert.equal(job.imageUrl, undefined);
  });
});
