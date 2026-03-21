import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-8xl font-extrabold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Back to Home
        </Link>
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
