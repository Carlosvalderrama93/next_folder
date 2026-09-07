import type { Article } from "./types";

/**
 * Article Query Criteria Codec.
 * Provides bidirectional parsing and serialization between URL query parameters
 * and structured Article query criteria, enabling shareable URLs, bookmarking, and browser history synchronization.
 */

export interface ArticleQueryCriteria {
  category?: string;
  q?: string;
}

/**
 * Normalizes strings by removing diacritics and converting to lowercase.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Parses raw search parameters (from Next.js Page searchParams or window.location.search)
 * into strongly-typed ArticleQueryCriteria.
 */
export function parseArticleQueryCriteria(
  searchParams?: Record<string, string | string[] | undefined> | URLSearchParams
): ArticleQueryCriteria {
  if (!searchParams) return {};

  const getParam = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) || undefined;
    }
    const val = searchParams[key];
    if (Array.isArray(val)) return val[0];
    return val || undefined;
  };

  const cat = getParam("category");
  const q = getParam("q");

  const category =
    cat && cat.trim().toLowerCase() !== "all" ? cat.trim() : undefined;
  const queryStr = q && q.trim().length > 0 ? q.trim() : undefined;

  return {
    ...(category ? { category } : {}),
    ...(queryStr ? { q: queryStr } : {}),
  };
}

/**
 * Serializes ArticleQueryCriteria into URLSearchParams for history synchronization.
 */
export function serializeArticleQueryCriteria(
  criteria: ArticleQueryCriteria
): URLSearchParams {
  const params = new URLSearchParams();

  if (criteria.category && criteria.category.trim().toLowerCase() !== "all") {
    params.set("category", criteria.category.trim());
  }

  if (criteria.q && criteria.q.trim().length > 0) {
    params.set("q", criteria.q.trim());
  }

  return params;
}

/**
 * Pure evaluation function that filters a list of articles based on criteria (category and keyword).
 */
export function filterArticles(
  articles: Article[],
  criteria: ArticleQueryCriteria
): Article[] {
  let result = articles;

  if (criteria.category && criteria.category.trim().toLowerCase() !== "all") {
    const targetCat = criteria.category.trim().toLowerCase();
    result = result.filter(
      (a) => a.category && a.category.trim().toLowerCase() === targetCat
    );
  }

  if (criteria.q && criteria.q.trim().length > 0) {
    const tokens = normalizeText(criteria.q)
      .split(/\s+/)
      .filter((t) => t.length > 0);

    result = result.filter((article) => {
      const searchTarget = normalizeText(
        `${article.title} ${article.excerpt} ${article.description || ""} ${article.category || ""}`
      );
      return tokens.every((token) => searchTarget.includes(token));
    });
  }

  return result;
}
