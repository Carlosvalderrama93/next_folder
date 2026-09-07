import { listArticles, parseArticleQueryCriteria } from "@/lib/articles";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArticlesView } from "@/components/articles";

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
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const criteria = parseArticleQueryCriteria(resolvedSearchParams);
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
      <ArticlesView articles={articles} initialCategory={criteria.category} />
    </main>
  );
}
