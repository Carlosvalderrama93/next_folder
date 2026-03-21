import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

export default function Loading() {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16 animate-pulse">
        <div className="mb-10">
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
          <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900"
            >
              <div className="w-full md:w-48 h-44 bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex gap-2 mb-3">
                    <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
                  </div>
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-2" />
                  <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800 rounded" />
                </div>
                <div className="flex justify-end mt-5">
                  <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
