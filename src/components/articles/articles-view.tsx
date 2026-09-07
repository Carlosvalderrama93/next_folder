"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArticleCard, FeaturedArticleCard } from "@/components/articles";
import type { Article, ArticleQueryCriteria } from "@/lib/articles";
import {
  parseArticleQueryCriteria,
  serializeArticleQueryCriteria,
  filterArticles,
} from "@/lib/articles";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface ArticlesViewProps {
  articles: Article[];
  initialCategory?: string;
  initialSearch?: string;
  initialCriteria?: ArticleQueryCriteria;
}

/**
 * Deep presentation module for articles catalogue.
 * Encapsulates category filtering, keyword search, URL query parameter synchronization,
 * featured article showcase, responsive 3-column grid, and localized category tabs.
 */
export function ArticlesView({
  articles,
  initialCategory,
  initialSearch,
  initialCriteria,
}: ArticlesViewProps) {
  const t = useTranslations("articles");

  const startingCategory =
    initialCriteria?.category ?? initialCategory ?? "All";
  const startingSearch = initialCriteria?.q ?? initialSearch ?? "";

  const [activeCategory, setActiveCategory] = useState<string>(startingCategory);
  const [searchQuery, setSearchQuery] = useState<string>(startingSearch);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean))),
    ],
    [articles]
  );

  // Synchronize state with URL search parameters via window.history
  function updateUrl(category: string, q: string) {
    if (typeof window !== "undefined") {
      const params = serializeArticleQueryCriteria({
        category: category !== "All" ? category : undefined,
        q: q.trim() || undefined,
      });
      const queryString = params.toString();
      const nextUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.replaceState(null, "", nextUrl);
    }
  }

  function handleCategoryChange(nextCategory: string) {
    setActiveCategory(nextCategory);
    updateUrl(nextCategory, searchQuery);
  }

  function handleSearchChange(nextQuery: string) {
    setSearchQuery(nextQuery);
    updateUrl(activeCategory, nextQuery);
  }

  // Handle browser back / forward navigation
  useEffect(() => {
    function onPopState() {
      if (typeof window !== "undefined") {
        const criteria = parseArticleQueryCriteria(
          new URLSearchParams(window.location.search)
        );
        setActiveCategory(criteria.category ?? "All");
        setSearchQuery(criteria.q ?? "");
      }
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const filtered = useMemo(
    () =>
      filterArticles(articles, {
        category: activeCategory,
        q: searchQuery,
      }),
    [articles, activeCategory, searchQuery]
  );

  const [featured, ...rest] = filtered;

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="w-full pl-10 pr-9 py-2 text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors motion-reduce:transition-none"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              aria-label={t("clearSearch")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs transition-colors motion-reduce:transition-none"
            >
              ✕
            </button>
          )}
        </div>

        {/* Articles count indicator */}
        {searchQuery && (
          <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums self-center">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </span>
        )}
      </div>

      <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
        {/* Category filter bar */}
        {categories.length > 1 && (
          <TabsList ariaLabel={t("allCategories")}>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat === "All" ? t("allCategories") : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        <TabsContent value={activeCategory} className="mt-6">
          {/* Featured article (only when no search query is active) */}
          {!searchQuery && featured && (
            <FeaturedArticleCard article={featured}>
              <Link
                href={featured.href}
                className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-full transition-colors motion-reduce:transition-none"
              >
                {t("readArticle")}
              </Link>
            </FeaturedArticleCard>
          )}

          {/* Divider */}
          {!searchQuery && featured && rest.length > 0 && (
            <hr className="border-gray-100 dark:border-gray-800 my-8" />
          )}

          {/* Article grid */}
          {(searchQuery ? filtered : rest).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(searchQuery ? filtered : rest).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {searchQuery ? t("noSearchResults") : t("noArticles")}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ArticlesView;
