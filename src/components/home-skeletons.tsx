import React from "react";

export function FeaturedJobsSkeleton() {
  return (
    <section
      className="py-16 border-t border-gray-100 dark:border-border animate-pulse motion-reduce:animate-none"
      aria-busy="true"
      aria-label="Loading featured jobs"
    >
      <div className="flex flex-col items-center text-center mb-10">
        <div className="h-8 w-56 bg-gray-200 dark:bg-surface-raised rounded-xl mb-3" />
        <div className="w-10 h-1 bg-brand/30 rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-52 bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-border p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="h-5 w-16 bg-gray-200 dark:bg-surface-raised rounded-full" />
                <div className="w-10 h-10 bg-gray-200 dark:bg-surface-raised rounded-xl" />
              </div>
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-surface-raised rounded-lg" />
              <div className="h-4 w-1/2 bg-gray-100 dark:bg-surface-raised/60 rounded" />
            </div>
            <div className="h-4 w-24 bg-gray-100 dark:bg-surface-raised/60 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedArticlesSkeleton() {
  return (
    <section
      className="py-16 max-w-7xl mx-auto px-4 border-t border-gray-100 dark:border-border animate-pulse motion-reduce:animate-none"
      aria-busy="true"
      aria-label="Loading featured articles"
    >
      <div className="flex justify-between items-center mb-10">
        <div className="h-8 w-48 bg-gray-200 dark:bg-surface-raised rounded-xl" />
        <div className="h-4 w-16 bg-gray-200 dark:bg-surface-raised rounded" />
      </div>
      <div className="h-64 w-full bg-white dark:bg-surface rounded-3xl border border-gray-200 dark:border-border mb-8 p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 h-full bg-gray-200 dark:bg-surface-raised rounded-2xl" />
        <div className="w-full md:w-1/2 flex flex-col justify-between py-2 space-y-4">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 dark:bg-surface-raised rounded-full" />
            <div className="h-7 w-3/4 bg-gray-200 dark:bg-surface-raised rounded-lg" />
            <div className="h-4 w-full bg-gray-100 dark:bg-surface-raised/60 rounded" />
          </div>
          <div className="h-9 w-32 bg-gray-200 dark:bg-surface-raised rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-60 bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-border p-5 flex flex-col justify-between"
          >
            <div className="h-28 w-full bg-gray-200 dark:bg-surface-raised rounded-xl mb-3" />
            <div className="space-y-2">
              <div className="h-3 w-1/3 bg-gray-200 dark:bg-surface-raised rounded" />
              <div className="h-5 w-5/6 bg-gray-200 dark:bg-surface-raised rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section
      className="py-16 px-4 border-t border-gray-100 dark:border-border animate-pulse motion-reduce:animate-none"
      aria-busy="true"
      aria-label="Loading testimonials"
    >
      <div className="w-full mx-auto px-4 max-w-3xl flex flex-col items-center">
        <div className="h-8 w-52 bg-gray-200 dark:bg-surface-raised rounded-xl mb-10" />
        <div className="h-40 w-full bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-border p-6 flex flex-col items-center justify-center space-y-4">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-surface-raised rounded" />
          <div className="h-4 w-1/2 bg-gray-100 dark:bg-surface-raised/60 rounded" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-surface-raised rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
