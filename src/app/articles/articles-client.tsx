"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArticleCard, FeaturedArticleCard } from "@/components/ui/article-cards";
import type { CardArticle } from "@/components/ui/article-cards";

export type { CardArticle as ArticleItem };

export default function ArticlesClient({ articles }: { articles: CardArticle[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))],
    [articles]
  );

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Category filter bar */}
      {categories.length > 1 && (
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === cat
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                  : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Featured article */}
      {featured && (
        <FeaturedArticleCard article={featured}>
          <Link
            href={featured.href}
            className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-full transition-colors"
          >
            Read article →
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
        !featured ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            No articles in this category yet.
          </p>
        ) : null
      )}
    </>
  );
}
