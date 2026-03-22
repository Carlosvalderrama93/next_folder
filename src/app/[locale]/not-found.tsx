import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "@/i18n/navigation";
import { homePageData } from "@/Data/homepage";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <>
      <Navigation />
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-[10rem] font-extrabold leading-none text-gray-100 dark:text-gray-800 select-none mb-2">
          404
        </p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 -mt-4">
          {t("heading")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {t("description")}
        </p>
        <Link
          href="/"
          className="px-7 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          {t("goHome")}
        </Link>
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
