"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

export default function JobsError({ reset }: { reset: () => void }) {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-4">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500" aria-hidden="true">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Couldn&apos;t load jobs
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The jobs feed is temporarily unavailable. Please try again shortly.
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors"
        >
          Try again
        </button>
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
