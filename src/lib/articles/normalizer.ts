import { STRAPI_URL } from "@/lib/config";
import type {
  Article,
  ArticleDetail,
  ArticleBlock,
  ArticleAuthor,
  RawStrapiArticle,
  RawStrapiArticleDetail,
  RawStrapiBlock,
  RawStaticArticle,
} from "./types";

export function getStrapiImageSrc(url: string): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export function normalizeStrapiBlock(raw: RawStrapiBlock): ArticleBlock | null {
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

export function normalizeStrapiBlocks(blocks?: RawStrapiBlock[]): ArticleBlock[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .map(normalizeStrapiBlock)
    .filter((b): b is ArticleBlock => b !== null);
}

export function normalizeStrapiArticle(
  raw: RawStrapiArticle,
  defaultAuthor?: ArticleAuthor
): Article {
  const slug = raw.slug || raw.documentId;
  const publishedDate = raw.publishedAt || raw.createdAt || new Date().toISOString();

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

export function normalizeStrapiArticleDetail(
  raw: RawStrapiArticleDetail,
  defaultAuthor?: ArticleAuthor
): ArticleDetail {
  const base = normalizeStrapiArticle(raw, defaultAuthor);
  const blocks = normalizeStrapiBlocks(raw.blocks);

  // Fallback: if CMS returns no blocks, synthesize one from description
  const contentBlocks =
    blocks.length > 0
      ? blocks
      : base.description
      ? [{ type: "rich-text" as const, body: base.description }]
      : [];

  return {
    ...base,
    blocks: contentBlocks,
  };
}

export function normalizeStaticArticle(
  raw: RawStaticArticle,
  defaultAuthor?: ArticleAuthor,
  contentBlocks?: ArticleBlock[]
): ArticleDetail {
  const publishedDate = raw.createdAt || new Date().toISOString();
  const slug = raw.slug || raw.id;

  const fallbackBlocks: ArticleBlock[] = [
    {
      type: "rich-text",
      body: raw.excerpt,
    },
  ];

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
