/**
 * Unit tests for src/lib/jobs/query.ts
 * Run with: node --test src/lib/jobs/__tests__/query.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Mirroring the pure logic of query.ts for node --test execution
function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function toSet(collection) {
  if (!collection) return null;
  if (collection instanceof Set) {
    return collection.size > 0 ? collection : null;
  }
  return collection.length > 0 ? new Set(collection) : null;
}

function filterJobs(jobs, criteria) {
  if (!criteria) return jobs;

  const rawQuery = criteria.query?.trim();
  const queryTokens = rawQuery ? normalizeText(rawQuery).split(/\s+/).filter(Boolean) : [];

  const statusSet = toSet(criteria.statuses);
  const skillSet = toSet(criteria.skills);
  const normalizedSkillTokens = skillSet
    ? new Set(Array.from(skillSet).map((s) => normalizeText(s)))
    : null;

  const modalitySet = toSet(criteria.modalities);
  const paymentSet = toSet(criteria.paymentTypes);

  return jobs.filter((job) => {
    if (queryTokens.length > 0) {
      const normalizedTitle = normalizeText(job.title || "");
      const normalizedDesc = normalizeText(job.description || "");
      const normalizedLocation = normalizeText(job.location || "");
      const normalizedModality = normalizeText(job.modality || "");
      const normalizedType = normalizeText(job.type || "");
      const normalizedSkills = (job.skills || []).map((s) => normalizeText(s));

      const matchesAllTokens = queryTokens.every((token) => {
        return (
          normalizedTitle.includes(token) ||
          normalizedDesc.includes(token) ||
          normalizedLocation.includes(token) ||
          normalizedModality.includes(token) ||
          normalizedType.includes(token) ||
          normalizedSkills.some((s) => s.includes(token))
        );
      });

      if (!matchesAllTokens) return false;
    }

    if (statusSet) {
      if (!job.status || !statusSet.has(job.status)) {
        return false;
      }
    }

    if (normalizedSkillTokens) {
      const jobSkillsNormalized = (job.skills || []).map((s) => normalizeText(s));
      const hasMatchingSkill = jobSkillsNormalized.some((js) =>
        normalizedSkillTokens.has(js)
      );
      if (!hasMatchingSkill) return false;
    }

    if (modalitySet) {
      if (!job.modality || !modalitySet.has(job.modality)) {
        return false;
      }
    }

    if (paymentSet) {
      if (!job.paymentType || !paymentSet.has(job.paymentType)) {
        return false;
      }
    }

    return true;
  });
}

// ── Test Fixtures ────────────────────────────────────────────────────────────

const sampleJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    description: "Build interactive frontends using TypeScript and Next.js.",
    location: "Bogotá, Colombia",
    type: "Full-time",
    status: "open",
    isOpen: true,
    skills: ["React", "TypeScript", "Next.js"],
    modality: "remote",
    paymentType: "salary",
    applyHref: "/jobs/1",
  },
  {
    id: "2",
    title: "Backend Node.js Engineer",
    description: "Design high performance PostgreSQL and microservice systems.",
    location: "Medellín, Colombia",
    type: "Full-time",
    status: "final-steps",
    isOpen: true,
    skills: ["Node.js", "PostgreSQL", "Docker"],
    modality: "hybrid",
    paymentType: "salary",
    applyHref: "/jobs/2",
  },
  {
    id: "3",
    title: "QA Automation Specialist",
    description: "Automate web testing with Playwright and Cypress.",
    location: "Remote, Global",
    type: "Contract",
    status: "filled",
    isOpen: false,
    skills: ["Playwright", "Cypress", "JavaScript"],
    modality: "remote",
    paymentType: "hourly",
    applyHref: "/jobs/3",
  },
];

// ── Test Suites ──────────────────────────────────────────────────────────────

describe("filterJobs · Text Search", () => {
  it("returns all jobs when criteria is empty or undefined", () => {
    assert.equal(filterJobs(sampleJobs).length, 3);
    assert.equal(filterJobs(sampleJobs, {}).length, 3);
    assert.equal(filterJobs(sampleJobs, { query: "   " }).length, 3);
  });

  it("finds jobs by case-insensitive keyword in title", () => {
    const results = filterJobs(sampleJobs, { query: "REACT" });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "1");
  });

  it("finds jobs by keyword in description", () => {
    const results = filterJobs(sampleJobs, { query: "microservice" });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "2");
  });

  it("finds jobs by keyword in skills array", () => {
    const results = filterJobs(sampleJobs, { query: "docker" });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "2");
  });

  it("finds jobs by modality in text search (e.g. 'remote')", () => {
    const results = filterJobs(sampleJobs, { query: "remote" });
    assert.equal(results.length, 2);
    const ids = results.map((r) => r.id);
    assert.ok(ids.includes("1"));
    assert.ok(ids.includes("3"));
  });

  it("normalizes accents (e.g. 'bogota' matches 'Bogotá')", () => {
    const results = filterJobs(sampleJobs, { query: "bogota" });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "1");
  });

  it("matches multi-token search queries across fields", () => {
    // "Senior" in title + "TypeScript" in skills
    const results = filterJobs(sampleJobs, { query: "senior typescript" });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "1");
  });

  it("returns empty array when query does not match any job", () => {
    const results = filterJobs(sampleJobs, { query: "nonexistent-language-xyz" });
    assert.equal(results.length, 0);
  });
});

describe("filterJobs · Dimension Filters", () => {
  it("filters jobs by single status", () => {
    const results = filterJobs(sampleJobs, { statuses: ["open"] });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "1");
  });

  it("filters jobs by multiple statuses (Set or Array)", () => {
    const resultsArray = filterJobs(sampleJobs, { statuses: ["open", "final-steps"] });
    assert.equal(resultsArray.length, 2);

    const resultsSet = filterJobs(sampleJobs, { statuses: new Set(["open", "final-steps"]) });
    assert.equal(resultsSet.length, 2);
  });

  it("filters jobs by modality", () => {
    const results = filterJobs(sampleJobs, { modalities: ["hybrid"] });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "2");
  });

  it("filters jobs by payment type", () => {
    const results = filterJobs(sampleJobs, { paymentTypes: ["hourly"] });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "3");
  });

  it("filters jobs by specific skills", () => {
    const results = filterJobs(sampleJobs, { skills: ["React", "Playwright"] });
    assert.equal(results.length, 2);
    const ids = results.map((r) => r.id);
    assert.ok(ids.includes("1"));
    assert.ok(ids.includes("3"));
  });
});

describe("filterJobs · Combined Criteria", () => {
  it("applies search query AND status filter simultaneously", () => {
    // "Remote" matches job 1 and job 3, but status "open" only matches job 1
    const results = filterJobs(sampleJobs, {
      query: "remote",
      statuses: ["open"],
    });
    assert.equal(results.length, 1);
    assert.equal(results[0].id, "1");
  });

  it("returns empty array if combined criteria contradict", () => {
    // Job 1 has modality "remote", asking for "hybrid" yields nothing
    const results = filterJobs(sampleJobs, {
      query: "react",
      modalities: ["hybrid"],
    });
    assert.equal(results.length, 0);
  });
});
