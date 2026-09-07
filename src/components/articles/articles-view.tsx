"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArticleCard, FeaturedArticleCard } from "@/components/articles";
import type { Article } from "@/lib/articles";
import {
  parseArticleQueryCriteria,
  serializeArticleQueryCriteria,
} from "@/lib/articles";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface ArticlesViewProps {
  articles: Article[];
  initialCategory?: string;
}

/**
 * Deep presentation module for articles catalogue.
 * Encapsulates category filtering, URL query parameter synchronization,
 * featured article showcase, responsive 3-column grid, and localized category tabs.
 */
export function ArticlesView({ articles, initialCategory }: ArticlesViewProps) {
  const t = useTranslations("articles");
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory ?? "All"
  );

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean))),
    ],
    [articles]
  );

  // Synchronize category selection with URL search parameters via window.history
  function handleCategoryChange(nextCategory: string) {
    setActiveCategory(nextCategory);

    if (typeof window !== "undefined") {
      const params = serializeArticleQueryCriteria({ category: nextCategory });
      const queryString = params.toString();
      const nextUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.replaceState(null, "", nextUrl);
    }
  }

  // Handle browser back / forward navigation
  useEffect(() => {
    function onPopState() {
      if (typeof window !== "undefined") {
        const criteria = parseArticleQueryCriteria(
          new URLSearchParams(window.location.search)
        );
        setActiveCategory(criteria.category ?? "All");
      }
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
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

      <TabsContent value={activeCategory}>
        {/* Featured article */}
        {featured && (
          <FeaturedArticleCard article={featured}>
            <Link
              href={featured.href}
              className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-full transition-colors"
            >
              {t("readArticle")}
            </Link>
          </FeaturedArticleCard>
        )}

        {/* Divider */}
        {rest.length > 0 && (
          <hr className="border-gray-100 dark:border-gray-800 my-8" />
        )}

        {/* 3-col article grid */}
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          !featured && (
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {t("noArticles")}
            </p>
          )
        )}
      </TabsContent>
    </Tabs>
  );
}

export default ArticlesView;
