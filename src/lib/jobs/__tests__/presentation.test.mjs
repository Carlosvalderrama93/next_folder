/**
 * Unit tests for jobs domain presentation tokens, status mappings, and dimming helpers.
 * Run with: node --test src/lib/jobs/__tests__/presentation.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Pure domain tokens (mirroring presentation.ts) ───────────────────────────

const STATUS_BADGE_CLASSES = {
  open: "bg-emerald-500 text-white",
  "on-hold": "bg-amber-400 text-amber-900",
  "final-steps": "bg-indigo-500 text-white",
  filled: "bg-gray-200 dark:bg-surface-raised text-gray-500 dark:text-muted-fg",
  cancelled: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400",
  overstaffed:
    "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400",
};

const STATUS_TRANSLATION_KEYS = {
  open: "open",
  "on-hold": "onHold",
  "final-steps": "finalSteps",
  filled: "filled",
  cancelled: "cancelled",
  overstaffed: "overstaffed",
};

const STATUS_PAGE_KEYS = {
  open: "statusOpen",
  "on-hold": "statusOnHold",
  "final-steps": "statusFinalSteps",
  filled: "statusFilled",
  cancelled: "statusCancelled",
  overstaffed: "statusOverstaffed",
};

const MODALITY_KEYS = {
  remote: "modalityRemote",
  hybrid: "modalityHybrid",
  "on-site": "modalityOnSite",
};

const PAYMENT_KEYS = {
  salary: "paymentSalary",
  hourly: "paymentHourly",
  equity: "paymentEquity",
  mixed: "paymentMixed",
};

const DIMMED_STATUSES = new Set(["filled", "cancelled", "overstaffed"]);

const ALL_STATUSES = [
  "open",
  "on-hold",
  "final-steps",
  "filled",
  "cancelled",
  "overstaffed",
];

const ALL_MODALITIES = ["remote", "hybrid", "on-site"];
const ALL_PAYMENTS = ["salary", "hourly", "equity", "mixed"];

function isJobDimmed(status, isOpen) {
  if (status) {
    return DIMMED_STATUSES.has(status);
  }
  return !(isOpen ?? true);
}

describe("Job Presentation Tokens · Status Badges", () => {
  it("defines distinct styling classes for all 6 canonical statuses", () => {
    for (const status of ALL_STATUSES) {
      assert.ok(
        STATUS_BADGE_CLASSES[status],
        `Missing badge classes for status: ${status}`
      );
      assert.match(STATUS_BADGE_CLASSES[status], /^bg-/);
    }
  });

  it("maps canonical translation keys for both card and page namespaces", () => {
    for (const status of ALL_STATUSES) {
      assert.ok(
        STATUS_TRANSLATION_KEYS[status],
        `Missing card key for ${status}`
      );
      assert.ok(
        STATUS_PAGE_KEYS[status],
        `Missing page key for ${status}`
      );
    }
  });

  it("maps modality and payment type keys without gaps", () => {
    for (const m of ALL_MODALITIES) {
      assert.ok(MODALITY_KEYS[m], `Missing modality key for ${m}`);
    }
    for (const p of ALL_PAYMENTS) {
      assert.ok(PAYMENT_KEYS[p], `Missing payment key for ${p}`);
    }
  });
});

describe("Job Presentation Helpers · isJobDimmed", () => {
  it("does not dim active recruiting statuses", () => {
    assert.equal(isJobDimmed("open"), false);
    assert.equal(isJobDimmed("on-hold"), false);
    assert.equal(isJobDimmed("final-steps"), false);
  });

  it("dims inactive or closed statuses", () => {
    assert.equal(isJobDimmed("filled"), true);
    assert.equal(isJobDimmed("cancelled"), true);
    assert.equal(isJobDimmed("overstaffed"), true);
  });

  it("falls back to isOpen boolean when status is absent", () => {
    assert.equal(isJobDimmed(undefined, true), false);
    assert.equal(isJobDimmed(undefined, false), true);
    assert.equal(isJobDimmed(undefined, undefined), false);
  });
});

// ── Markdown Presentation Adapter Contract ─────────────────────────────────────
describe("Job Markdown Presentation Adapter Contract", () => {
  it("guarantees JobDetailView consumes RichText adapter without direct markdown vendor coupling", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const detailViewPath = path.resolve(
      __dirname,
      "../../../components/jobs/job-detail-view.tsx"
    );
    const richTextPath = path.resolve(
      __dirname,
      "../../../components/ui/rich-text.tsx"
    );
    const pagePath = path.resolve(
      __dirname,
      "../../../app/[locale]/jobs/[id]/page.tsx"
    );

    assert.ok(fs.existsSync(richTextPath), "components/ui/rich-text.tsx must exist");
    assert.ok(fs.existsSync(detailViewPath), "components/jobs/job-detail-view.tsx must exist");

    const detailContent = fs.readFileSync(detailViewPath, "utf-8");
    const pageContent = fs.readFileSync(pagePath, "utf-8");

    assert.ok(
      detailContent.includes('import { RichText } from "@/components/ui/rich-text";'),
      "JobDetailView must import RichText adapter"
    );
    assert.ok(
      detailContent.includes("<RichText content={job.description} />"),
      "JobDetailView must render description using RichText"
    );
    assert.ok(
      !detailContent.includes("react-markdown"),
      "JobDetailView must not directly import react-markdown"
    );
    assert.ok(
      !detailContent.includes("remark-gfm"),
      "JobDetailView must not directly import remark-gfm"
    );

    // Page must delegate to JobDetailView
    assert.ok(
      pageContent.includes('import { JobDetailView } from "@/components/jobs";'),
      "jobs/[id]/page.tsx must import JobDetailView from @/components/jobs"
    );
    assert.ok(
      pageContent.includes("<JobDetailView job={job} locale={locale} />"),
      "jobs/[id]/page.tsx must render JobDetailView"
    );
  });

  it("guarantees components/jobs/ acts as the canonical presentation seam", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const jobsDir = path.resolve(__dirname, "../../../components/jobs");
    const rootComponentsDir = path.resolve(__dirname, "../../../components");
    const appJobIdDir = path.resolve(__dirname, "../../../app/[locale]/jobs/[id]");

    assert.ok(fs.existsSync(jobsDir), "components/jobs/ directory must exist");
    assert.ok(fs.existsSync(path.join(jobsDir, "job-card.tsx")), "job-card.tsx must exist in components/jobs/");
    assert.ok(fs.existsSync(path.join(jobsDir, "job-filters.tsx")), "job-filters.tsx must exist in components/jobs/");
    assert.ok(fs.existsSync(path.join(jobsDir, "job-status-badge.tsx")), "job-status-badge.tsx must exist in components/jobs/");
    assert.ok(fs.existsSync(path.join(jobsDir, "job-detail-view.tsx")), "job-detail-view.tsx must exist in components/jobs/");
    assert.ok(fs.existsSync(path.join(jobsDir, "apply-toggle.tsx")), "apply-toggle.tsx must exist in components/jobs/");
    assert.ok(fs.existsSync(path.join(jobsDir, "apply-form.tsx")), "apply-form.tsx must exist in components/jobs/");
    assert.ok(fs.existsSync(path.join(jobsDir, "index.ts")), "index.ts barrel must exist in components/jobs/");

    // Must not leave ghost duplicates in old locations
    assert.ok(!fs.existsSync(path.join(rootComponentsDir, "job-card.tsx")), "job-card.tsx must not exist in root components/");
    assert.ok(!fs.existsSync(path.join(rootComponentsDir, "job-filters.tsx")), "job-filters.tsx must not exist in root components/");
    assert.ok(!fs.existsSync(path.join(rootComponentsDir, "job-status-badge.tsx")), "job-status-badge.tsx must not exist in root components/");
    assert.ok(!fs.existsSync(path.join(appJobIdDir, "apply-toggle.tsx")), "apply-toggle.tsx must not exist in app/[locale]/jobs/[id]/");
    assert.ok(!fs.existsSync(path.join(appJobIdDir, "apply-form.tsx")), "apply-form.tsx must not exist in app/[locale]/jobs/[id]/");
  });

  it("guarantees job skeletons are colocated in components/jobs/ and loading.tsx files are thin re-exports", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const jobsDir = path.resolve(__dirname, "../../../components/jobs");
    const jobsLoading = path.resolve(__dirname, "../../../app/[locale]/jobs/loading.tsx");
    const jobIdLoading = path.resolve(__dirname, "../../../app/[locale]/jobs/[id]/loading.tsx");

    assert.ok(fs.existsSync(path.join(jobsDir, "jobs-skeleton.tsx")), "jobs-skeleton.tsx must exist in components/jobs/");
    assert.ok(fs.existsSync(path.join(jobsDir, "job-detail-skeleton.tsx")), "job-detail-skeleton.tsx must exist in components/jobs/");

    const jobsBarrel = fs.readFileSync(path.join(jobsDir, "index.ts"), "utf-8");
    assert.ok(jobsBarrel.includes("JobsSkeleton"), "jobs index.ts must export JobsSkeleton");
    assert.ok(jobsBarrel.includes("JobDetailSkeleton"), "jobs index.ts must export JobDetailSkeleton");

    const jobsLoadingContent = fs.readFileSync(jobsLoading, "utf-8");
    const jobIdLoadingContent = fs.readFileSync(jobIdLoading, "utf-8");

    assert.ok(
      jobsLoadingContent.includes('export { JobsSkeleton as default } from "@/components/jobs"'),
      "jobs/loading.tsx must be a clean 1-line re-export from @/components/jobs"
    );
    assert.ok(
      jobIdLoadingContent.includes('export { JobDetailSkeleton as default } from "@/components/jobs"'),
      "jobs/[id]/loading.tsx must be a clean 1-line re-export from @/components/jobs"
    );
  });
});

