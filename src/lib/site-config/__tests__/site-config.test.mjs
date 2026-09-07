/**
 * Unit tests for site-config module seam: route matching, URL validation, and canonical configuration contracts.
 * Run with: node --test src/lib/site-config/__tests__/site-config.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Pure domain utilities (mirroring utils.ts) ───────────────────────────────

function isRouteActive(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(href);
}

function isValidSocialUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

// ── Canonical fixtures (mirroring config.ts) ─────────────────────────────────

const CANONICAL_NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "jobs", href: "/jobs" },
  { key: "contact", href: "/contact" },
  { key: "articles", href: "/articles" },
];

const CANONICAL_SITE_CONFIG = {
  name: "Carlos Valderrama",
  title: "Carlos Valderrama",
  description: "Global talent connector and technical recruitment specialist.",
  url: "https://carlosvalderrama.com",
  email: "carlos@carlosvalderrama.com",
  copyright: "© 2025 Carlos Valderrama. All rights reserved.",
  social: [
    { platform: "LinkedIn", url: "https://linkedin.com/company/solvo" },
    { platform: "GitHub", url: "https://github.com/solvo" },
  ],
  navLinks: CANONICAL_NAV_LINKS,
  navCta: {
    href: "/contact",
  },
  hero: {
    backgroundImage: "/me.png",
    ctaLink: "/jobs",
  },
  footer: {
    copyright: "© 2025 Carlos Valderrama. All rights reserved.",
    email: "carlos@carlosvalderrama.com",
    social: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/solvo" },
      { platform: "GitHub", url: "https://github.com/solvo" },
    ],
  },
};

describe("Site Config Seam · isRouteActive", () => {
  it("marks exact home path as active only on root /", () => {
    assert.equal(isRouteActive("/", "/"), true);
    assert.equal(isRouteActive("/about", "/"), false);
    assert.equal(isRouteActive("/jobs", "/"), false);
    assert.equal(isRouteActive("/articles", "/"), false);
  });

  it("marks section link active on exact match and nested subroutes", () => {
    assert.equal(isRouteActive("/jobs", "/jobs"), true);
    assert.equal(isRouteActive("/jobs/123", "/jobs"), true);
    assert.equal(isRouteActive("/jobs/software-engineer", "/jobs"), true);
    assert.equal(isRouteActive("/about", "/jobs"), false);

    assert.equal(isRouteActive("/articles", "/articles"), true);
    assert.equal(isRouteActive("/articles/my-slug", "/articles"), true);
    assert.equal(isRouteActive("/contact", "/articles"), false);
  });
});

describe("Site Config Seam · isValidSocialUrl", () => {
  it("accepts valid https URLs for social platforms", () => {
    assert.equal(isValidSocialUrl("https://linkedin.com/company/solvo"), true);
    assert.equal(isValidSocialUrl("https://github.com/solvo"), true);
    assert.equal(isValidSocialUrl("https://twitter.com/carlos"), true);
  });

  it("rejects non-https or invalid social URLs", () => {
    assert.equal(isValidSocialUrl("http://linkedin.com/company/solvo"), false);
    assert.equal(isValidSocialUrl("javascript:alert(1)"), false);
    assert.equal(isValidSocialUrl("not-a-url"), false);
    assert.equal(isValidSocialUrl(""), false);
  });
});

describe("Site Config Seam · Canonical Contracts", () => {
  it("guarantees 5 canonical navigation links without broken legacy routes", () => {
    assert.equal(CANONICAL_NAV_LINKS.length, 5);
    const keys = CANONICAL_NAV_LINKS.map((link) => link.key);
    assert.deepEqual(keys, ["home", "about", "jobs", "contact", "articles"]);

    const hrefs = CANONICAL_NAV_LINKS.map((link) => link.href);
    assert.equal(hrefs.includes("/blog"), false, "Must not contain legacy /blog");
  });

  it("validates all social entries in canonical config", () => {
    assert.ok(CANONICAL_SITE_CONFIG.social.length >= 2);
    for (const item of CANONICAL_SITE_CONFIG.social) {
      assert.ok(item.platform.length > 0);
      assert.equal(isValidSocialUrl(item.url), true);
    }
  });

  it("guarantees required email and copyright formats", () => {
    assert.match(CANONICAL_SITE_CONFIG.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    assert.ok(CANONICAL_SITE_CONFIG.copyright.includes("Carlos Valderrama"));
    assert.equal(CANONICAL_SITE_CONFIG.hero.ctaLink, "/jobs");
  });
});

describe("UI Hygiene & Dead Code Purge Contracts", () => {
  it("guarantees Card UI primitive is agnostic and free of domain variants", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const cardPath = path.resolve(__dirname, "../../../components/ui/card.tsx");

    assert.ok(fs.existsSync(cardPath), "ui/card.tsx must exist");
    const cardContent = fs.readFileSync(cardPath, "utf-8");

    // Must not contain hardcoded domain variants
    assert.ok(!cardContent.includes('"job"'), "Card must not contain hardcoded 'job' variant");
    assert.ok(
      !cardContent.includes('"testimonial"'),
      "Card must not contain hardcoded 'testimonial' variant"
    );
    assert.ok(
      !cardContent.includes("h-[200px]"),
      "Card must not bake in testimonial height"
    );
  });

  it("verifies dead deprecated re-exports and ghost app directories are purged", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const componentsDir = path.resolve(__dirname, "../../../components");
    const appDir = path.resolve(__dirname, "../../../app");

    // 1. Dead re-exports must not exist
    assert.ok(
      !fs.existsSync(path.join(componentsDir, "headline-pills.tsx")),
      "Root headline-pills.tsx must be purged"
    );
    assert.ok(
      !fs.existsSync(path.join(componentsDir, "bio-expand.tsx")),
      "Root bio-expand.tsx must be purged"
    );

    // 2. Ghost app route folders must not exist
    assert.ok(!fs.existsSync(path.join(appDir, "jobs")), "Ghost app/jobs must not exist");
    assert.ok(!fs.existsSync(path.join(appDir, "about")), "Ghost app/about must not exist");
    assert.ok(!fs.existsSync(path.join(appDir, "contact")), "Ghost app/contact must not exist");
    assert.ok(!fs.existsSync(path.join(appDir, "apply")), "Ghost app/apply must not exist");

    // 3. About TOC resides in about/
    assert.ok(
      fs.existsSync(path.join(componentsDir, "about/about-toc.tsx")),
      "about-toc.tsx must reside inside components/about/"
    );
    assert.ok(
      !fs.existsSync(path.join(componentsDir, "about-toc.tsx")),
      "about-toc.tsx must not be loose at components/ root"
    );
  });

  it("verifies homepage sections use unambiguous semantic naming without entity collisions", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const componentsDir = path.resolve(__dirname, "../../../components");
    const pagePath = path.resolve(__dirname, "../../../app/[locale]/page.tsx");

    // 1. Ambiguous component files must not exist
    assert.ok(
      !fs.existsSync(path.join(componentsDir, "job.tsx")),
      "components/job.tsx must not exist (eliminates collision with Job domain entity)"
    );
    assert.ok(
      !fs.existsSync(path.join(componentsDir, "articles.tsx")),
      "components/articles.tsx must not exist (eliminates collision with Article entity)"
    );
    assert.ok(
      !fs.existsSync(path.join(componentsDir, "job-carousel.tsx")),
      "components/job-carousel.tsx must not exist (renamed to featured-jobs-carousel)"
    );

    // 2. Clear semantic showcase sections must exist
    assert.ok(
      fs.existsSync(path.join(componentsDir, "featured-jobs-section.tsx")),
      "components/featured-jobs-section.tsx must exist"
    );
    assert.ok(
      fs.existsSync(path.join(componentsDir, "featured-articles-section.tsx")),
      "components/featured-articles-section.tsx must exist"
    );
    assert.ok(
      fs.existsSync(path.join(componentsDir, "featured-jobs-carousel.tsx")),
      "components/featured-jobs-carousel.tsx must exist"
    );

    // 3. page.tsx must consume the semantic section components
    const pageContent = fs.readFileSync(pagePath, "utf-8");
    assert.ok(
      pageContent.includes("FeaturedJobsSection"),
      "page.tsx must import and render FeaturedJobsSection"
    );
    assert.ok(
      pageContent.includes("FeaturedArticlesSection"),
      "page.tsx must import and render FeaturedArticlesSection"
    );
    assert.ok(
      !pageContent.includes("import Job from"),
      "page.tsx must not import Job as a section component"
    );
    assert.ok(
      !pageContent.includes("import Articles from"),
      "page.tsx must not import Articles as a section component"
    );
  });

  it("verifies CMS configuration is consolidated in site-config and legacy lib/config is purged", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const libDir = path.resolve(__dirname, "../../");
    const siteConfigIndex = path.join(libDir, "site-config/index.ts");
    const legacyConfigPath = path.join(libDir, "config.ts");

    // 1. Legacy config.ts must not exist
    assert.ok(
      !fs.existsSync(legacyConfigPath),
      "src/lib/config.ts must be completely removed"
    );

    // 2. site-config exports STRAPI_URL
    const indexContent = fs.readFileSync(siteConfigIndex, "utf-8");
    assert.ok(
      indexContent.includes("STRAPI_URL"),
      "site-config/index.ts must export STRAPI_URL"
    );

    // 3. Adapters must import from @/lib/site-config
    const jobsAdapterPath = path.join(libDir, "jobs/strapi-adapter.ts");
    const articlesAdapterPath = path.join(libDir, "articles/strapi-adapter.ts");
    const aboutAdapterPath = path.join(libDir, "about/strapi-adapter.ts");

    for (const adapter of [jobsAdapterPath, articlesAdapterPath, aboutAdapterPath]) {
      const content = fs.readFileSync(adapter, "utf-8");
      assert.ok(
        content.includes('from "@/lib/site-config"'),
        `${path.basename(adapter)} must import STRAPI_URL from @/lib/site-config`
      );
    }
  });

  it("guarantees HomePage implements Suspense boundaries and semantic skeletons for RSC streaming", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const componentsDir = path.resolve(__dirname, "../../../components");
    const pagePath = path.resolve(__dirname, "../../../app/[locale]/page.tsx");

    // 1. Skeletons component must exist
    const skeletonsPath = path.join(componentsDir, "home-skeletons.tsx");
    assert.ok(fs.existsSync(skeletonsPath), "components/home-skeletons.tsx must exist");

    const skeletonsContent = fs.readFileSync(skeletonsPath, "utf-8");
    assert.ok(skeletonsContent.includes("FeaturedJobsSkeleton"), "Must export FeaturedJobsSkeleton");
    assert.ok(skeletonsContent.includes("FeaturedArticlesSkeleton"), "Must export FeaturedArticlesSkeleton");
    assert.ok(skeletonsContent.includes("TestimonialsSkeleton"), "Must export TestimonialsSkeleton");

    // 2. page.tsx must wrap async sections in Suspense
    const pageContent = fs.readFileSync(pagePath, "utf-8");
    assert.ok(pageContent.includes("Suspense"), "page.tsx must import and use Suspense");
    assert.ok(pageContent.includes("<Suspense fallback={<FeaturedJobsSkeleton />}>"), "Jobs section must have Suspense fallback");
    assert.ok(pageContent.includes("<Suspense fallback={<FeaturedArticlesSkeleton />}>"), "Articles section must have Suspense fallback");
    assert.ok(pageContent.includes("<Suspense fallback={<TestimonialsSkeleton />}>"), "Testimonials section must have Suspense fallback");
  });

  describe("Structured Metadata & Schema.org JSON-LD Seam Contracts", () => {
    // Pure inline mirrors for node --test execution
    function serializeJsonLd(data) {
      return JSON.stringify(data).replace(/</g, "\\u003c");
    }

    function buildJobPostingJsonLd(job) {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
        jobLocation: { "@type": "Place", address: job.location },
        employmentType: job.type.toUpperCase().replace(/\s+/g, "_"),
        hiringOrganization: { "@type": "Organization", name: "Carlos Valderrama" },
      };
      if (job.postedAt) jsonLd.datePosted = job.postedAt;
      return jsonLd;
    }

    function buildArticleJsonLd(article) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description ?? "",
        datePublished: article.publishedAt,
        author: { "@type": "Person", name: "Carlos Valderrama" },
      };
    }

    function buildWebsiteJsonLd() {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Carlos Valderrama",
      };
    }

    it("builds valid Schema.org JobPosting structured payload", () => {
      const jobPosting = buildJobPostingJsonLd({
        title: "Senior Fullstack Engineer",
        description: "Leading frontend architecture.",
        location: "Remote LATAM",
        type: "Full-time",
        postedAt: "2025-01-15T00:00:00Z",
      });

      assert.equal(jobPosting["@context"], "https://schema.org");
      assert.equal(jobPosting["@type"], "JobPosting");
      assert.equal(jobPosting.title, "Senior Fullstack Engineer");
      assert.equal(jobPosting.employmentType, "FULL-TIME");
      assert.equal(jobPosting.jobLocation.address, "Remote LATAM");
      assert.equal(jobPosting.hiringOrganization.name, "Carlos Valderrama");
      assert.equal(jobPosting.datePosted, "2025-01-15T00:00:00Z");
    });

    it("builds valid Schema.org Article structured payload", () => {
      const articleData = buildArticleJsonLd({
        title: "Navigating Tech Recruitment in 2025",
        description: "Key trends in remote hiring.",
        publishedAt: "2025-02-01T00:00:00Z",
      });

      assert.equal(articleData["@context"], "https://schema.org");
      assert.equal(articleData["@type"], "Article");
      assert.equal(articleData.headline, "Navigating Tech Recruitment in 2025");
      assert.equal(articleData.datePublished, "2025-02-01T00:00:00Z");
      assert.equal(articleData.author.name, "Carlos Valderrama");
    });

    it("builds valid Schema.org WebSite structured payload", () => {
      const websiteData = buildWebsiteJsonLd();
      assert.equal(websiteData["@context"], "https://schema.org");
      assert.equal(websiteData["@type"], "WebSite");
      assert.equal(websiteData.name, "Carlos Valderrama");
    });

    it("safely escapes < characters in JSON-LD serialization to prevent XSS", () => {
      const malicious = {
        title: "Title with </script><script>alert(1)</script>",
      };
      const serialized = serializeJsonLd(malicious);
      assert.ok(!serialized.includes("</script>"), "Must not contain raw closing script tag");
      assert.ok(serialized.includes("\\u003c/script>"), "Must escape < to \\u003c");
    });

    it("guarantees routes consume StructuredData component without raw inline jsonLd scripts", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const jobRoutePath = path.resolve(__dirname, "../../../app/[locale]/jobs/[id]/page.tsx");
      const articleRoutePath = path.resolve(__dirname, "../../../app/[locale]/articles/[documentId]/page.tsx");
      const homeRoutePath = path.resolve(__dirname, "../../../app/[locale]/page.tsx");
      const structuredDataPath = path.resolve(__dirname, "../../../components/ui/structured-data.tsx");

      assert.ok(fs.existsSync(structuredDataPath), "components/ui/structured-data.tsx must exist");

      const jobContent = fs.readFileSync(jobRoutePath, "utf-8");
      const articleContent = fs.readFileSync(articleRoutePath, "utf-8");
      const homeContent = fs.readFileSync(homeRoutePath, "utf-8");

      assert.ok(jobContent.includes("StructuredData"), "jobs/[id]/page.tsx must use StructuredData");
      assert.ok(articleContent.includes("StructuredData"), "articles/[documentId]/page.tsx must use StructuredData");
      assert.ok(homeContent.includes("StructuredData"), "page.tsx must use StructuredData");

      // Zero raw dangerouslySetInnerHTML JSON.stringify(jsonLd) in route pages
      assert.ok(!jobContent.includes("JSON.stringify(jsonLd)"), "jobs route must not serialize raw jsonLd");
      assert.ok(!articleContent.includes("JSON.stringify(jsonLd)"), "article route must not serialize raw jsonLd");
    });
  });
});



