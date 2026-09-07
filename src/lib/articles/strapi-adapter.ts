import { STRAPI_URL } from "@/lib/site-config";
import type { Article, ArticleDetail } from "./types";
import {
  normalizeStrapiArticle,
  normalizeStrapiArticleDetail,
} from "./normalizer";

const REVALIDATE_SECONDS = 60;

/**
 * Fetch all articles from Strapi CMS.
 * Returns normalized Article[] or empty array on failure.
 */
export async function fetchArticlesFromStrapi(): Promise<Article[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return [];

    const json = await res.json();
    const data = json?.data;
    if (!Array.isArray(data)) return [];

    return data.map((item) => normalizeStrapiArticle(item));
  } catch {
    return [];
  }
}

/**
 * Fetch a single article by identifier (documentId, ID, or slug).
 * Queries Strapi by documentId first, and falls back to a slug filter query.
 */
export async function fetchArticleFromStrapi(
  identifier: string
): Promise<ArticleDetail | null> {
  if (!identifier) return null;

  try {
    // 1. Attempt direct documentId / ID fetch
    const directRes = await fetch(
      `${STRAPI_URL}/api/articles/${encodeURIComponent(identifier)}?populate[blocks][populate]=*`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );

    if (directRes.ok) {
      const json = await directRes.json();
      if (json?.data) {
        return normalizeStrapiArticleDetail(json.data);
      }
    }

    // 2. Fallback: query by slug filter
    const slugRes = await fetch(
      `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(identifier)}&populate[blocks][populate]=*`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );

    if (slugRes.ok) {
      const json = await slugRes.json();
      const first = Array.isArray(json?.data) ? json.data[0] : null;
      if (first) {
        return normalizeStrapiArticleDetail(first);
      }
    }

    return null;
  } catch {
    return null;
  }
}
