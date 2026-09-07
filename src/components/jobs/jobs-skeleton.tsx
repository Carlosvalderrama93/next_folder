export function JobsSkeleton() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-gradient-to-b from-indigo-50/60 via-white to-white dark:from-indigo-950/30 dark:via-background dark:to-background pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 animate-pulse motion-reduce:animate-none">
          <div className="h-10 w-52 bg-gray-200 dark:bg-surface-raised rounded-lg mb-3" />
          <div className="w-10 h-1 bg-gray-200 dark:bg-surface-raised rounded-full mb-4" />
          <div className="h-4 w-32 bg-gray-100 dark:bg-surface rounded" />
        </div>
      </section>

      {/* Filter tabs skeleton */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-10 pb-20 animate-pulse motion-reduce:animate-none scroll-mt-24">
        <div className="flex gap-2 mb-8">
          <div className="h-9 w-28 bg-gray-200 dark:bg-surface-raised rounded-full" />
          <div className="h-9 w-20 bg-gray-100 dark:bg-surface rounded-full" />
        </div>

        {/* Card grid skeleton */}
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 dark:border-border bg-white dark:bg-surface"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-14 bg-gray-200 dark:bg-surface-raised rounded-full" />
                    <div className="h-5 w-20 bg-gray-100 dark:bg-surface rounded-full" />
                  </div>
                  <div className="w-12 h-12 bg-gray-200 dark:bg-surface-raised rounded-xl" />
                </div>
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-surface-raised rounded mb-3" />
                <div className="h-4 w-full bg-gray-100 dark:bg-surface rounded mb-1.5" />
                <div className="h-4 w-4/5 bg-gray-100 dark:bg-surface rounded" />
              </div>
              <div className="px-5 pb-5 flex items-center justify-between">
                <div className="h-4 w-24 bg-gray-100 dark:bg-surface rounded" />
                <div className="h-8 w-24 bg-gray-200 dark:bg-surface-raised rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default JobsSkeleton;
