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
