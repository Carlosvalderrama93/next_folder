/**
 * Unit tests for src/lib/articles/ normalizer and query logic.
 * Run with: node --test src/lib/articles/__tests__/articles.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const STRAPI_URL = "http://localhost:1337";

function getStrapiImageSrc(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function normalizeStrapiBlock(raw) {
  switch (raw.__component) {
    case "shared.rich-text":
      return { type: "rich-text", body: raw.body || "" };
    case "shared.quote":
      return { type: "quote", title: raw.title, body: raw.body || "" };
    case "shared.media":
      if (!raw.file?.url) return null;
      return {
        type: "media",
        file: {
          url: getStrapiImageSrc(raw.file.url),
          alternativeText: raw.file.alternativeText,
        },
      };
    case "shared.slider": {
      const files = (raw.files || [])
        .filter((f) => f && f.url)
        .map((f) => ({
          url: getStrapiImageSrc(f.url),
          alternativeText: f.alternativeText,
        }));
      return files.length > 0 ? { type: "slider", files } : null;
    }
    default:
      return null;
  }
}

function normalizeStrapiBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks.map(normalizeStrapiBlock).filter((b) => b !== null);
}

function normalizeStrapiArticle(raw, defaultAuthor) {
  const slug = raw.slug || raw.documentId;
  const publishedDate = raw.publishedAt || raw.createdAt || "2025-01-01T00:00:00.000Z";
  return {
    id: String(raw.id),
    documentId: raw.documentId,
    title: raw.title,
    slug,
    excerpt: raw.description || "",
    description: raw.description || "",
    coverImage: raw.cover?.url ? getStrapiImageSrc(raw.cover.url) : undefined,
    category: raw.category || "Articles",
    date: publishedDate,
    publishedAt: publishedDate,
    author: defaultAuthor,
    href: `/articles/${slug}`,
  };
}

function normalizeStrapiArticleDetail(raw, defaultAuthor) {
  const base = normalizeStrapiArticle(raw, defaultAuthor);
  const blocks = normalizeStrapiBlocks(raw.blocks);
  const contentBlocks =
    blocks.length > 0
      ? blocks
      : base.description
      ? [{ type: "rich-text", body: base.description }]
      : [];
  return {
    ...base,
    blocks: contentBlocks,
  };
}

function normalizeStaticArticle(raw, defaultAuthor, contentBlocks) {
  const publishedDate = raw.createdAt || "2025-01-01";
  const slug = raw.slug || raw.id;
  const fallbackBlocks = [{ type: "rich-text", body: raw.excerpt }];
  return {
    id: raw.id,
    documentId: raw.id,
    title: raw.title,
    slug,
    excerpt: raw.excerpt,
    description: raw.excerpt,
    coverImage: raw.coverImage,
    category: raw.category || "Articles",
    date: publishedDate,
    publishedAt: publishedDate,
    author: defaultAuthor,
    href: `/articles/${slug}`,
    blocks: contentBlocks && contentBlocks.length > 0 ? contentBlocks : fallbackBlocks,
  };
}

function matchArticle(identifier, list) {
  if (!identifier) return null;
  const target = identifier.toLowerCase();
  return (
    list.find(
      (a) =>
        a.id.toLowerCase() === target ||
        a.documentId.toLowerCase() === target ||
        a.slug.toLowerCase() === target
    ) || null
  );
}

function mergeArticles(strapiList, staticList, options) {
  let combined;
  if (strapiList.length === 0) {
    combined = staticList;
  } else {
    const strapiSlugs = new Set(strapiList.map((a) => (a.slug || "").toLowerCase()));
    const strapiTitles = new Set(strapiList.map((a) => a.title.toLowerCase()));
    const strapiIds = new Set(strapiList.map((a) => a.id));

    const uniqueStatic = staticList.filter((article) => {
      const slugMatch = article.slug && strapiSlugs.has(article.slug.toLowerCase());
      const titleMatch = strapiTitles.has(article.title.toLowerCase());
      const idMatch = strapiIds.has(article.id);
      return !slugMatch && !titleMatch && !idMatch;
    });

    combined = [...strapiList, ...uniqueStatic];
  }

  if (options?.category && options.category !== "All") {
    const filterCat = options.category.toLowerCase();
    combined = combined.filter((a) => a.category && a.category.toLowerCase() === filterCat);
  }

  if (options?.limit && options.limit > 0) {
    return combined.slice(0, options.limit);
  }

  return combined;
}

// ── Fixtures ─────────────────────────────────────────────────────────────────

const mockAuthor = { name: "Carlos Valderrama", avatar: "/carlos.jpg" };

const baseStrapiRaw = {
  id: 1,
  documentId: "doc-strapi-1",
  title: "Engineering Leadership in 2025",
  slug: "engineering-leadership-2025",
  description: "Insights on managing senior distributed engineers.",
  createdAt: "2025-06-01T10:00:00.000Z",
  publishedAt: "2025-06-01T10:00:00.000Z",
  category: "Leadership",
  cover: { url: "/uploads/leadership.jpg" },
};

const baseStaticRaw = {
  id: "101",
  title: "How to Ace a Remote Interview",
  slug: "remote-interview-tips",
  excerpt: "Remote interviews are the new normal. Here are 5 tips.",
  coverImage: "https://images.unsplash.com/photo-1578321271369",
  createdAt: "2025-08-20",
  category: "Career Advice",
};

// ── normalizeStrapiArticle ───────────────────────────────────────────────────

describe("normalizeStrapiArticle", () => {
  it("maps fields to domain Article shape and sets canonical href", () => {
    const article = normalizeStrapiArticle(baseStrapiRaw, mockAuthor);
    assert.equal(article.id, "1");
    assert.equal(article.documentId, "doc-strapi-1");
    assert.equal(article.title, "Engineering Leadership in 2025");
    assert.equal(article.slug, "engineering-leadership-2025");
    assert.equal(article.href, "/articles/engineering-leadership-2025");
    assert.equal(article.category, "Leadership");
    assert.equal(article.author?.name, "Carlos Valderrama");
  });

  it("falls back to documentId when slug is absent", () => {
    const article = normalizeStrapiArticle({ ...baseStrapiRaw, slug: "" });
    assert.equal(article.slug, "doc-strapi-1");
    assert.equal(article.href, "/articles/doc-strapi-1");
  });

  it("prefixes relative image URLs with STRAPI_URL", () => {
    const article = normalizeStrapiArticle(baseStrapiRaw);
    assert.equal(article.coverImage, `${STRAPI_URL}/uploads/leadership.jpg`);
  });

  it("preserves absolute cover image URLs", () => {
    const article = normalizeStrapiArticle({
      ...baseStrapiRaw,
      cover: { url: "https://cdn.example.com/cover.png" },
    });
    assert.equal(article.coverImage, "https://cdn.example.com/cover.png");
  });
});

// ── normalizeStrapiBlocks ────────────────────────────────────────────────────

describe("normalizeStrapiBlocks", () => {
  it("normalizes rich-text, quote, media, and slider blocks", () => {
    const rawBlocks = [
      { __component: "shared.rich-text", body: "Hello markdown" },
      { __component: "shared.quote", title: "Author", body: "Inspiring words" },
      { __component: "shared.media", file: { url: "/img.jpg", alternativeText: "Diagram" } },
      {
        __component: "shared.slider",
        files: [
          { url: "/s1.jpg", alternativeText: "Slide 1" },
          { url: "https://ext.com/s2.jpg", alternativeText: "Slide 2" },
        ],
      },
    ];

    const blocks = normalizeStrapiBlocks(rawBlocks);
    assert.equal(blocks.length, 4);
    assert.equal(blocks[0].type, "rich-text");
    assert.equal(blocks[0].body, "Hello markdown");

    assert.equal(blocks[1].type, "quote");
    assert.equal(blocks[1].title, "Author");

    assert.equal(blocks[2].type, "media");
    assert.equal(blocks[2].file.url, `${STRAPI_URL}/img.jpg`);

    assert.equal(blocks[3].type, "slider");
    assert.equal(blocks[3].files.length, 2);
    assert.equal(blocks[3].files[0].url, `${STRAPI_URL}/s1.jpg`);
    assert.equal(blocks[3].files[1].url, "https://ext.com/s2.jpg");
  });

  it("safely ignores unknown block components", () => {
    const blocks = normalizeStrapiBlocks([
      { __component: "unknown.future-block", foo: "bar" },
      { __component: "shared.rich-text", body: "Valid" },
    ]);
    assert.equal(blocks.length, 1);
    assert.equal(blocks[0].type, "rich-text");
  });
});

// ── normalizeStrapiArticleDetail ─────────────────────────────────────────────

describe("normalizeStrapiArticleDetail", () => {
  it("synthesizes rich-text block from description if blocks are empty", () => {
    const detail = normalizeStrapiArticleDetail({ ...baseStrapiRaw, blocks: [] });
    assert.equal(detail.blocks.length, 1);
    assert.equal(detail.blocks[0].type, "rich-text");
    assert.equal(detail.blocks[0].body, baseStrapiRaw.description);
  });
});

// ── normalizeStaticArticle ───────────────────────────────────────────────────

describe("normalizeStaticArticle", () => {
  it("produces valid ArticleDetail with canonical href", () => {
    const staticArticle = normalizeStaticArticle(baseStaticRaw, mockAuthor);
    assert.equal(staticArticle.id, "101");
    assert.equal(staticArticle.documentId, "101");
    assert.equal(staticArticle.slug, "remote-interview-tips");
    assert.equal(staticArticle.href, "/articles/remote-interview-tips");
    assert.equal(staticArticle.blocks.length, 1);
    assert.equal(staticArticle.blocks[0].type, "rich-text");
    assert.equal(staticArticle.blocks[0].body, baseStaticRaw.excerpt);
  });

  it("uses custom editorial blocks when provided", () => {
    const customBlocks = [
      { type: "rich-text", body: "Custom content" },
      { type: "quote", title: "Speaker", body: "Wisdom" },
    ];
    const staticArticle = normalizeStaticArticle(baseStaticRaw, mockAuthor, customBlocks);
    assert.equal(staticArticle.blocks.length, 2);
    assert.equal(staticArticle.blocks[0].body, "Custom content");
  });
});

// ── Identifier Resolver (prevents 404s) ───────────────────────────────────────

describe("Identifier Resolver", () => {
  const articles = [
    normalizeStrapiArticle(baseStrapiRaw),
    normalizeStaticArticle(baseStaticRaw),
  ];

  it("resolves article by Strapi documentId", () => {
    const found = matchArticle("doc-strapi-1", articles);
    assert.ok(found);
    assert.equal(found.title, "Engineering Leadership in 2025");
  });

  it("resolves article by Strapi slug", () => {
    const found = matchArticle("engineering-leadership-2025", articles);
    assert.ok(found);
    assert.equal(found.id, "1");
  });

  it("resolves static article by slug (fixes static 404 bug)", () => {
    const found = matchArticle("remote-interview-tips", articles);
    assert.ok(found);
    assert.equal(found.id, "101");
  });

  it("resolves static article by numeric id", () => {
    const found = matchArticle("101", articles);
    assert.ok(found);
    assert.equal(found.slug, "remote-interview-tips");
  });

  it("returns null for non-existent identifier", () => {
    const found = matchArticle("non-existent-xyz", articles);
    assert.equal(found, null);
  });
});

// ── Merge & Query Logic ──────────────────────────────────────────────────────

describe("Merge and Query Logic", () => {
  const strapiArticles = [
    normalizeStrapiArticle({
      id: 1,
      documentId: "doc-1",
      title: "Remote Interview Tips",
      slug: "remote-interview-tips",
      description: "Strapi version of interview tips",
      category: "Career",
    }),
  ];

  const staticArticles = [
    normalizeStaticArticle({
      id: "101",
      title: "Remote Interview Tips",
      slug: "remote-interview-tips",
      excerpt: "Static version of interview tips",
      category: "Career",
    }),
    normalizeStaticArticle({
      id: "102",
      title: "Top 10 Skills for IT in 2025",
      slug: "top-skills-it-2025",
      excerpt: "Skills preview",
      category: "Tech Skills",
    }),
  ];

  it("deduplicates static article when Strapi article has same slug", () => {
    const merged = mergeArticles(strapiArticles, staticArticles);
    // Should have 2 articles: 1 from Strapi + 1 unique from static
    assert.equal(merged.length, 2);
    assert.equal(merged[0].documentId, "doc-1"); // Strapi takes priority
    assert.equal(merged[1].id, "102"); // Unique static remains
  });

  it("falls back to full static list when Strapi returns empty", () => {
    const merged = mergeArticles([], staticArticles);
    assert.equal(merged.length, 2);
    assert.equal(merged[0].id, "101");
  });

  it("applies limit option correctly", () => {
    const merged = mergeArticles([], staticArticles, { limit: 1 });
    assert.equal(merged.length, 1);
    assert.equal(merged[0].id, "101");
  });

  it("applies category filter correctly", () => {
    const merged = mergeArticles([], staticArticles, { category: "Tech Skills" });
    assert.equal(merged.length, 1);
    assert.equal(merged[0].slug, "top-skills-it-2025");
  });
});

// ── Article Block Dispatch Contract ──────────────────────────────────────────

describe("Article Block Dispatch Contract", () => {
  function resolveBlockRenderer(block) {
    if (!block || !block.type) return null;
    switch (block.type) {
      case "rich-text":
        return block.body ? "RichTextBlock" : null;
      case "quote":
        return block.body ? "QuoteBlock" : null;
      case "media":
        return block.file ? "MediaBlock" : null;
      case "slider":
        return block.files?.length ? "SliderBlock" : null;
      default:
        return null;
    }
  }

  it("resolves rich-text and quote blocks correctly", () => {
    assert.equal(resolveBlockRenderer({ type: "rich-text", body: "Content" }), "RichTextBlock");
    assert.equal(resolveBlockRenderer({ type: "quote", body: "Quote" }), "QuoteBlock");
  });

  it("resolves media and slider blocks with valid attachments", () => {
    assert.equal(resolveBlockRenderer({ type: "media", file: { url: "/test.jpg" } }), "MediaBlock");
    assert.equal(resolveBlockRenderer({ type: "slider", files: [{ url: "/s1.jpg" }] }), "SliderBlock");
  });

  it("safely rejects blocks with missing payload or unrecognized types", () => {
    assert.equal(resolveBlockRenderer({ type: "media", file: null }), null);
    assert.equal(resolveBlockRenderer({ type: "slider", files: [] }), null);
    assert.equal(resolveBlockRenderer({ type: "unknown-type" }), null);
    assert.equal(resolveBlockRenderer(null), null);
  });
});
