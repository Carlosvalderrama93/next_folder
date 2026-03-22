import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

export default function Loading() {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-10" />
        <div className="flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900"
            >
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-2" />
              <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
