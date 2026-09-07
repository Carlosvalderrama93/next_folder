export function ArticleDetailSkeleton() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 animate-pulse motion-reduce:animate-none">
      <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
      <div className="mt-4">
        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
        <div className="h-10 w-4/5 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
        <div className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 mb-10">
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-2" />
          <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded" />
          <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded" />
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded" />
          <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded" />
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
      </div>
    </main>
  );
}

export default ArticleDetailSkeleton;
