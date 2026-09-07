import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ReadingProgress,
  ShareButtons,
  ArticleBlocks,
} from "@/components/articles";
import { getArticle, listArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL, buildArticleJsonLd } from "@/lib/site-config";
import { StructuredData } from "@/components/ui/structured-data";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ documentId: string }>;
}): Promise<Metadata> {
  const { documentId } = await params;
  const article = await getArticle(documentId);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ documentId: string; locale: string }>;
}) {
  const { documentId, locale } = await params;
  const t = await getTranslations({ locale, namespace: "articleDetail" });
  const articlesT = await getTranslations({ locale, namespace: "articles" });

  const [article, allArticles] = await Promise.all([
    getArticle(documentId),
    listArticles(),
  ]);

  if (!article) notFound();

  const related = allArticles
    .filter(
      (a) =>
        a.documentId !== documentId &&
        a.slug !== documentId &&
        a.id !== documentId
    )
    .slice(0, 3);

  const articleUrl = `${SITE_URL}${article.href}`;
  const dateLocale = locale === "es" ? "es-ES" : "en-US";


  return (
    <>
      <ReadingProgress />
      <StructuredData data={buildArticleJsonLd(article)} />
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-16">

        <Breadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbArticles"), href: "/articles" },
            { label: article.title },
          ]}
        />

        <article className="mt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            {new Date(article.publishedAt).toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-gray-200 dark:border-border pl-4 mb-10">
              {article.description}
            </p>
          )}
          <ArticleBlocks blocks={article.blocks} />
        </article>

        <ShareButtons title={article.title} url={articleUrl} />

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {articlesT("moreArticles")}
            </h2>
            <div className="flex flex-col gap-4">
              {related.map((a) => (
                <Link
                  key={a.id || a.documentId}
                  href={a.href as `/${string}`}
                  className="group flex flex-col gap-1 border border-gray-200 dark:border-border rounded-xl p-5 bg-white dark:bg-surface hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none"
                >
                  <time className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(a.publishedAt).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <p className="font-semibold text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                    {a.title}
                  </p>
                  {a.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {a.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
