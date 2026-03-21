export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 animate-pulse">
      <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
      <div className="h-4 w-72 bg-gray-100 dark:bg-gray-800 rounded mb-10" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900"
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
              </div>
              <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-full ml-4" />
          </div>
        ))}
      </div>
    </main>
  );
}
