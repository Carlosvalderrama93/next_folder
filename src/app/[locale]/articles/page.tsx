import { listArticles } from "@/lib/articles";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ArticlesClient from "./articles-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articlesPage" });
  return {
    title: t("heading"),
    description: "Insights on tech recruitment, career growth, and the LATAM tech scene.",
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articlesPage" });

  const articles = await listArticles();

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t("heading")}
        </h1>
        <div className="mt-3 mb-6 w-10 h-1 bg-brand rounded-full" />
      </div>
      <ArticlesClient articles={articles} />
    </main>
  );
}
