export function JobDetailSkeleton() {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-10 pb-20 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-4 w-44 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Open header */}
      <div className="mt-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
              <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
            </div>
            {/* Title */}
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            {/* Meta */}
            <div className="flex gap-4">
              <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
          </div>
          {/* Image placeholder */}
          <div className="w-20 h-20 rounded-2xl bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
        </div>
        {/* Skills chips */}
        <div className="flex gap-2 mt-5">
          {["w-16", "w-20", "w-14", "w-18", "w-12"].map((w, i) => (
            <div key={i} className={`h-6 ${w} bg-gray-100 dark:bg-gray-800 rounded-full`} />
          ))}
        </div>
      </div>

      {/* JD prose */}
      <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800 rounded" style={{ width: `${85 - i * 8}%` }} />
        ))}
        <div className="h-6 w-2/5 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800 rounded" style={{ width: `${90 - i * 7}%` }} />
        ))}
      </div>

      {/* Apply toggle card */}
      <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-700">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 flex flex-col items-center gap-6">
          <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-14 w-56 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </main>
  );
}

export default JobDetailSkeleton;
