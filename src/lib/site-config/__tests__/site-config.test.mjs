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

  describe("UI Primitives Purity & Chrome Hygiene Contracts", () => {
    it("guarantees navigation and chrome widgets are colocated in components/ and not in ui/", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const componentsDir = path.resolve(__dirname, "../../../components");
      const shellDir = path.resolve(componentsDir, "shell");
      const uiDir = path.resolve(componentsDir, "ui");

      assert.ok(
        fs.existsSync(path.join(shellDir, "language-switcher.tsx")),
        "language-switcher.tsx must reside in components/shell/"
      );
      assert.ok(
        !fs.existsSync(path.join(uiDir, "language-switcher.tsx")),
        "language-switcher.tsx must not reside in components/ui/"
      );
      assert.ok(
        !fs.existsSync(path.join(componentsDir, "language-switcher.tsx")),
        "language-switcher.tsx must not reside loose in components/"
      );

      assert.ok(
        fs.existsSync(path.join(shellDir, "back-to-top.tsx")),
        "back-to-top.tsx must reside in components/shell/"
      );
      assert.ok(
        !fs.existsSync(path.join(uiDir, "back-to-top.tsx")),
        "back-to-top.tsx must not reside in components/ui/"
      );
      assert.ok(
        !fs.existsSync(path.join(componentsDir, "back-to-top.tsx")),
        "back-to-top.tsx must not reside loose in components/"
      );
    });

    it("guarantees Accordion UI primitive is generic and domain-agnostic", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const accordionPath = path.resolve(
        __dirname,
        "../../../components/ui/accordion.tsx"
      );

      assert.ok(fs.existsSync(accordionPath), "components/ui/accordion.tsx must exist");
      const content = fs.readFileSync(accordionPath, "utf-8");

      assert.ok(content.includes("itemTitle"), "Accordion must support generic item title");
      assert.ok(content.includes("itemContent"), "Accordion must support generic item content");
      assert.ok(content.includes("title?:"), "AccordionItemData must declare title prop");
      assert.ok(content.includes("content?:"), "AccordionItemData must declare content prop");
    });

    it("guarantees Navigation removes dead TooltipProvider and ThemeToggle is internationalized", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const navPath = path.resolve(__dirname, "../../../components/shell/navigation.tsx");
      const themeTogglePath = path.resolve(__dirname, "../../../components/shell/theme-toggle.tsx");
      const layoutPath = path.resolve(__dirname, "../../../app/[locale]/layout.tsx");

      const navContent = fs.readFileSync(navPath, "utf-8");
      const themeToggleContent = fs.readFileSync(themeTogglePath, "utf-8");
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");

      // Navigation must not wrap tree in TooltipProvider
      assert.ok(
        !navContent.includes("<TooltipProvider>"),
        "Navigation must not wrap its tree in TooltipProvider"
      );
      assert.ok(
        !navContent.includes('from "./ui/tooltip"'),
        "Navigation must not import TooltipProvider"
      );

      // TooltipProvider must be hoisted to LocaleLayout
      assert.ok(
        layoutContent.includes("<TooltipProvider>"),
        "layout.tsx must wrap tree in TooltipProvider"
      );

      // ThemeToggle must use translations for tooltip
      assert.ok(
        themeToggleContent.includes('useTranslations("nav")'),
        "ThemeToggle must use translations from nav namespace"
      );
      assert.ok(
        !themeToggleContent.includes('"Switch to light mode"'),
        "ThemeToggle must not contain hardcoded English string"
      );
    });

    it("guarantees theme hydration logic is encapsulated in ThemeScript component", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const themeScriptPath = path.resolve(
        __dirname,
        "../../../components/shell/theme-script.tsx"
      );
      const layoutPath = path.resolve(
        __dirname,
        "../../../app/[locale]/layout.tsx"
      );

      assert.ok(fs.existsSync(themeScriptPath), "components/shell/theme-script.tsx must exist");
      const scriptContent = fs.readFileSync(themeScriptPath, "utf-8");
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");

      assert.ok(
        scriptContent.includes("export const THEME_INIT_SCRIPT"),
        "theme-script.tsx must export THEME_INIT_SCRIPT constant"
      );
      assert.ok(
        scriptContent.includes("export function ThemeScript"),
        "theme-script.tsx must export ThemeScript component"
      );
      assert.ok(
        scriptContent.includes("localStorage.getItem('theme')"),
        "THEME_INIT_SCRIPT must inspect localStorage"
      );
      assert.ok(
        scriptContent.includes("matchMedia"),
        "THEME_INIT_SCRIPT must inspect system media preference"
      );
      assert.ok(
        scriptContent.includes("try{") && scriptContent.includes("catch(e)"),
        "THEME_INIT_SCRIPT must be wrapped in try/catch error boundary"
      );

      // layout.tsx must consume ThemeScript declaratively and not have raw inline scripts in head
      assert.ok(
        layoutContent.includes("<ThemeScript />"),
        "layout.tsx must render ThemeScript component"
      );
      assert.ok(
        !layoutContent.includes("localStorage.getItem('theme')"),
        "layout.tsx must not contain raw inline theme script string"
      );
    });

    it("guarantees Shell presentation seam encapsulates chrome layout and purges loose root components", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const shellDir = path.resolve(__dirname, "../../../components/shell");
      const componentsDir = path.resolve(__dirname, "../../../components");
      const layoutPath = path.resolve(__dirname, "../../../app/[locale]/layout.tsx");

      assert.ok(fs.existsSync(shellDir), "components/shell/ directory must exist");
      assert.ok(fs.existsSync(path.join(shellDir, "index.ts")), "components/shell/index.ts must exist");
      assert.ok(fs.existsSync(path.join(shellDir, "navigation.tsx")), "navigation.tsx must reside in components/shell/");
      assert.ok(fs.existsSync(path.join(shellDir, "footer.tsx")), "footer.tsx must reside in components/shell/");
      assert.ok(fs.existsSync(path.join(shellDir, "theme-toggle.tsx")), "theme-toggle.tsx must reside in components/shell/");
      assert.ok(fs.existsSync(path.join(shellDir, "theme-script.tsx")), "theme-script.tsx must reside in components/shell/");
      assert.ok(fs.existsSync(path.join(shellDir, "theme-provider.tsx")), "theme-provider.tsx must reside in components/shell/");
      assert.ok(fs.existsSync(path.join(shellDir, "language-switcher.tsx")), "language-switcher.tsx must reside in components/shell/");
      assert.ok(fs.existsSync(path.join(shellDir, "back-to-top.tsx")), "back-to-top.tsx must reside in components/shell/");
      assert.ok(fs.existsSync(path.join(shellDir, "skip-link.tsx")), "skip-link.tsx must reside in components/shell/");

      // Loose legacy components must be purged from components/ root
      const looseFiles = [
        "navigation.tsx",
        "footer.tsx",
        "language-switcher.tsx",
        "theme-toggle.tsx",
        "theme-script.tsx",
        "theme-provider.tsx",
        "back-to-top.tsx",
      ];
      for (const file of looseFiles) {
        assert.ok(
          !fs.existsSync(path.join(componentsDir, file)),
          `Legacy file ${file} must be purged from components/ root`
        );
      }

      // Index barrel exports
      const indexContent = fs.readFileSync(path.join(shellDir, "index.ts"), "utf-8");
      assert.ok(indexContent.includes("Navigation"), "index.ts must export Navigation");
      assert.ok(indexContent.includes("Footer"), "index.ts must export Footer");
      assert.ok(indexContent.includes("LanguageSwitcher"), "index.ts must export LanguageSwitcher");
      assert.ok(indexContent.includes("ThemeToggle"), "index.ts must export ThemeToggle");
      assert.ok(indexContent.includes("ThemeScript"), "index.ts must export ThemeScript");
      assert.ok(indexContent.includes("ThemeProvider"), "index.ts must export ThemeProvider");
      assert.ok(indexContent.includes("BackToTop"), "index.ts must export BackToTop");
      assert.ok(indexContent.includes("SkipLink"), "index.ts must export SkipLink");

      // layout.tsx imports cleanly from @/components/shell
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");
      assert.ok(
        layoutContent.includes('from "@/components/shell"'),
        "layout.tsx must import chrome elements from @/components/shell"
      );
      assert.ok(
        !layoutContent.includes('from "@/components/navigation"'),
        "layout.tsx must not import directly from @/components/navigation"
      );
      assert.ok(
        !layoutContent.includes('from "@/components/footer"'),
        "layout.tsx must not import directly from @/components/footer"
      );
    });
  });

  describe("Ciclo 9 — Web Interface Guidelines & Accessibility", () => {
    it("verifies zero transition-all usage and strict prefers-reduced-motion coverage", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const srcDir = path.resolve(__dirname, "../../../");

      // 1. Scan all ts/tsx files in src/ for 'transition-all'
      function scanDir(dir, fileList = []) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            if (entry.name !== "node_modules" && entry.name !== ".next") {
              scanDir(fullPath, fileList);
            }
          } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
            fileList.push(fullPath);
          }
        }
        return fileList;
      }

      const tsFiles = scanDir(srcDir);
      const violations = [];
      for (const file of tsFiles) {
        const content = fs.readFileSync(file, "utf-8");
        if (content.includes("transition-all")) {
          violations.push(path.relative(srcDir, file));
        }
      }

      assert.strictEqual(
        violations.length,
        0,
        `transition-all must be purged in favor of specific transitions. Found in: ${violations.join(", ")}`
      );

      // 2. globals.css must define prefers-reduced-motion override for reveal-hidden
      const globalsCss = fs.readFileSync(path.join(srcDir, "app/globals.css"), "utf-8");
      assert.ok(
        globalsCss.includes("prefers-reduced-motion: reduce"),
        "globals.css must support prefers-reduced-motion"
      );
      assert.ok(
        globalsCss.includes(".reveal-hidden") && globalsCss.includes("transform: none !important"),
        "globals.css must negate .reveal-hidden transforms under reduced motion"
      );

      // 3. Skeletons must contain motion-reduce:animate-none
      const skeletons = [
        "components/home-skeletons.tsx",
        "components/jobs/jobs-skeleton.tsx",
        "components/jobs/job-detail-skeleton.tsx",
        "components/articles/articles-skeleton.tsx",
        "components/articles/article-detail-skeleton.tsx",
      ];
      for (const skel of skeletons) {
        const content = fs.readFileSync(path.join(srcDir, skel), "utf-8");
        assert.ok(
          content.includes("motion-reduce:animate-none"),
          `${skel} must include motion-reduce:animate-none alongside pulse animations`
        );
      }
    });

    it("verifies accessible anchor scroll margins and asynchronous live announcements", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const srcDir = path.resolve(__dirname, "../../../");

      // 1. All main landmarks targeted by SkipLink must have scroll-margin-top
      const mainPages = [
        "app/[locale]/page.tsx",
        "app/[locale]/about/page.tsx",
        "app/[locale]/jobs/page.tsx",
        "app/[locale]/articles/page.tsx",
        "app/[locale]/articles/[documentId]/page.tsx",
        "app/[locale]/contact/page.tsx",
        "app/[locale]/not-found.tsx",
        "components/jobs/job-detail-view.tsx",
        "components/jobs/jobs-skeleton.tsx",
        "components/jobs/job-detail-skeleton.tsx",
      ];

      for (const pageRel of mainPages) {
        const filePath = path.join(srcDir, pageRel);
        const content = fs.readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes('id="main-content"') && content.includes("scroll-mt-24"),
          `${pageRel} must have scroll-mt-24 on main-content landmark`
        );
      }

      // 2. All section anchors targeted by AboutToc must have scroll-margin-top
      const aboutSections = [
        { file: "components/about/about-focus.tsx", id: "focus" },
        { file: "components/about/about-skills.tsx", id: "skills" },
        { file: "components/about/about-experience.tsx", id: "experience" },
        { file: "components/about/about-education.tsx", id: "education" },
        { file: "components/about/about-certifications.tsx", id: "certifications" },
        { file: "components/about/about-learning.tsx", id: "learning" },
      ];

      for (const sec of aboutSections) {
        const filePath = path.join(srcDir, sec.file);
        const content = fs.readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes(`id="${sec.id}"`) && content.includes("scroll-mt-24"),
          `${sec.file} section #${sec.id} must have scroll-mt-24`
        );
      }

      // 3. Toast must configure type for accessible live announcements
      const toastContent = fs.readFileSync(path.join(srcDir, "components/ui/toast.tsx"), "utf-8");
      assert.ok(
        toastContent.includes('type={isSuccess ? "background" : "foreground"}'),
        "ToastPrimitive.Root must configure accessible type property"
      );

      // 4. FormField must declare aria-live=polite on error
      const formFieldContent = fs.readFileSync(path.join(srcDir, "components/ui/form-field.tsx"), "utf-8");
      assert.ok(
        formFieldContent.includes('aria-live="polite"'),
        "FormField must declare aria-live=polite on error alert"
      );

      // 5. ApplyForm must declare role=status and aria-live=polite on success state
      const applyFormContent = fs.readFileSync(path.join(srcDir, "components/jobs/apply-form.tsx"), "utf-8");
      assert.ok(
        applyFormContent.includes('role="status"') && applyFormContent.includes('aria-live="polite"'),
        "ApplyForm must declare role=status and aria-live=polite on success state"
      );
    });

    it("verifies typographic polish with text-balance and numeric alignment with tabular-nums", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const srcDir = path.resolve(__dirname, "../../../");

      // 1. Headings configured with text-balance to avoid orphaned words
      const balancedHeadingFiles = [
        "components/hero.tsx",
        "components/featured-jobs-section.tsx",
        "components/featured-articles-section.tsx",
        "components/testimonials/testimonials-section.tsx",
        "components/faq.tsx",
        "components/about/about-hero.tsx",
        "components/about/about-focus.tsx",
        "components/about/about-skills.tsx",
        "components/about/about-experience.tsx",
        "components/about/about-education.tsx",
        "components/about/about-certifications.tsx",
        "components/about/about-learning.tsx",
        "components/about/about-cta.tsx",
        "app/[locale]/jobs/page.tsx",
        "components/jobs/job-detail-view.tsx",
        "app/[locale]/articles/page.tsx",
        "app/[locale]/articles/[documentId]/page.tsx",
        "components/contact/contact-view.tsx",
        "app/[locale]/not-found.tsx",
      ];

      for (const relPath of balancedHeadingFiles) {
        const filePath = path.join(srcDir, relPath);
        const content = fs.readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes("text-balance"),
          `${relPath} must include text-balance on headings`
        );
      }

      // 2. Numeric elements configured with tabular-nums
      const tabularNumFiles = [
        "components/about/about-stats.tsx",
        "components/jobs/job-card.tsx",
        "components/jobs/job-detail-view.tsx",
        "components/articles/article-card.tsx",
        "app/[locale]/articles/[documentId]/page.tsx",
        "app/[locale]/jobs/page.tsx",
        "components/jobs/apply-form.tsx",
      ];

      for (const relPath of tabularNumFiles) {
        const filePath = path.join(srcDir, relPath);
        const content = fs.readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes("tabular-nums"),
          `${relPath} must include tabular-nums on numeric displays`
        );
      }
    });
  });

  describe("CI/CD Pipeline & GitHub Actions Automation", () => {
    it("guarantees .github/workflows/ci.yml enforces strict quality gates", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const ciPath = path.resolve(__dirname, "../../../../.github/workflows/ci.yml");

      assert.ok(fs.existsSync(ciPath), ".github/workflows/ci.yml must exist");
      const content = fs.readFileSync(ciPath, "utf-8");

      assert.ok(content.includes("npm run typecheck"), "CI must execute typecheck");
      assert.ok(content.includes("npm run lint"), "CI must execute lint");
      assert.ok(content.includes("npm test"), "CI must execute unit tests");
      assert.ok(content.includes("npm run build"), "CI must execute production build");
      assert.ok(content.includes("npm run test:e2e"), "CI must execute end-to-end verification");
    });
  });
});







