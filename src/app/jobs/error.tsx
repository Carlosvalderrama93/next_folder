"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

export default function JobsError() {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-4xl mb-4">⚠</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Couldn&apos;t load jobs
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          The jobs feed is temporarily unavailable. Please try again shortly.
        </p>
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
