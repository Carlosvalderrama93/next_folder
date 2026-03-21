import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

export default function Loading() {
  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-16 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8" />

        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="h-4 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          <div className="h-7 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-4 w-32 bg-gray-100 dark:bg-gray-800 rounded mb-4" />
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-2" />
          <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>

        <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6" />

        <div className="flex flex-col gap-5">
          {["w-1/3", "w-1/3", "w-1/4"].map((w, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className={`h-4 ${w} bg-gray-200 dark:bg-gray-700 rounded`} />
              <div className="h-11 w-full bg-gray-100 dark:bg-gray-800 rounded-xl" />
            </div>
          ))}
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-11 w-full bg-gray-100 dark:bg-gray-800 rounded-xl" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-32 w-full bg-gray-100 dark:bg-gray-800 rounded-xl" />
          </div>
          <div className="h-12 w-44 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
