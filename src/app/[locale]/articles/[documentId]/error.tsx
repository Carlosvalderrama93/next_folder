"use client";

import Link from "next/link";

export default function ArticleDetailError() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-4xl mb-4">⚠</p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Couldn&apos;t load this article
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The article is temporarily unavailable. Please try again shortly.
      </p>
      <Link
        href="/articles"
        className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      >
        ← Back to Articles
      </Link>
    </main>
  );
}
