/**
 * Article Query Criteria Codec.
 * Provides bidirectional parsing and serialization between URL query parameters
 * and structured Article query criteria, enabling shareable URLs, bookmarking, and browser history synchronization.
 */

export interface ArticleQueryCriteria {
  category?: string;
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
  if (!cat || cat.trim().toLowerCase() === "all") {
    return {};
  }

  return { category: cat.trim() };
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

  return params;
}
