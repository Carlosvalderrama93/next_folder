import { cache } from "react";
import type { Article, ArticleDetail, ListArticlesOptions } from "./types";
import { fetchArticlesFromStrapi, fetchArticleFromStrapi } from "./strapi-adapter";
import { fetchArticlesFromStatic, fetchArticleFromStatic } from "./static-adapter";

export type {
  Article,
  ArticleDetail,
  ArticleBlock,
  MediaFile,
  ArticleAuthor,
  ListArticlesOptions,
} from "./types";
export { getStrapiImageSrc } from "./normalizer";
export {
  parseArticleQueryCriteria,
  serializeArticleQueryCriteria,
  type ArticleQueryCriteria,
} from "./query";

/**
 * List all available articles, merging Strapi CMS entries with static fallback articles.
 * Deduplicates by slug, ID, and title, and supports category filtering and limit slicing.
 */
export async function listArticles(
  options?: ListArticlesOptions
): Promise<Article[]> {
  const [strapiArticles, staticArticles] = await Promise.all([
    fetchArticlesFromStrapi(),
    Promise.resolve(fetchArticlesFromStatic()),
  ]);

  let combined: Article[];

  if (strapiArticles.length === 0) {
    combined = staticArticles;
  } else {
    const strapiSlugs = new Set(
      strapiArticles.map((a) => (a.slug || "").toLowerCase())
    );
    const strapiTitles = new Set(
      strapiArticles.map((a) => a.title.toLowerCase())
    );
    const strapiIds = new Set(strapiArticles.map((a) => a.id));

    const uniqueStatic = staticArticles.filter((article) => {
      const slugMatch =
        article.slug && strapiSlugs.has(article.slug.toLowerCase());
      const titleMatch = strapiTitles.has(article.title.toLowerCase());
      const idMatch = strapiIds.has(article.id);
      return !slugMatch && !titleMatch && !idMatch;
    });

    combined = [...strapiArticles, ...uniqueStatic];
  }

  if (options?.category && options.category !== "All") {
    const filterCat = options.category.toLowerCase();
    combined = combined.filter(
      (a) => a.category && a.category.toLowerCase() === filterCat
    );
  }

  if (options?.limit && options.limit > 0) {
    return combined.slice(0, options.limit);
  }

  return combined;
}

/**
 * Fetch a single article by identifier (documentId, ID, or slug).
 * Transparently checks Strapi first and falls back to static fixtures.
 * Wrapped with React cache() to deduplicate metadata and page body queries.
 */
export const getArticle = cache(async function getArticle(
  identifier: string
): Promise<ArticleDetail | null> {
  if (!identifier) return null;

  const strapiArticle = await fetchArticleFromStrapi(identifier);
  if (strapiArticle) return strapiArticle;

  return fetchArticleFromStatic(identifier);
});
