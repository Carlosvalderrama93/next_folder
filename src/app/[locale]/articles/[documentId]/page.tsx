import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ShareButtons } from "@/components/ui/share-buttons";
import { homePageData } from "@/Data/homepage";
import {
  fetchStrapiArticleDetail,
  fetchStrapiArticles,
  getStrapiImageSrc,
  type StrapiArticleDetail,
  type StrapiBlock,
  type StrapiMediaFile,
} from "@/lib/strapi";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlosvalderrama.com";
const footerData = homePageData.footer;
const getArticle = cache(fetchStrapiArticleDetail);

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

function RichText({ body }: { body: string }) {
  return (
    <div className="prose dark:prose-invert prose-gray max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}

function Quote({ title, body }: { title: string; body: string }) {
  return (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 my-8">
      <p className="text-xl italic text-gray-700 dark:text-gray-300 leading-relaxed">
        &ldquo;{body}&rdquo;
      </p>
      {title && (
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic font-semibold">
          — {title}
        </cite>
      )}
    </blockquote>
  );
}

function MediaBlock({ file }: { file: StrapiMediaFile }) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video">
        <Image
          src={getStrapiImageSrc(file.url)}
          alt={file.alternativeText ?? ""}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
    </figure>
  );
}

function Slider({ files }: { files: StrapiMediaFile[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto my-8 pb-2">
      {files.map((file, i) => (
        <div key={i} className="relative w-72 h-48 flex-shrink-0">
          <Image
            src={getStrapiImageSrc(file.url)}
            alt={file.alternativeText ?? ""}
            fill
            className="object-cover rounded-xl"
            sizes="288px"
          />
        </div>
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: StrapiBlock }) {
  switch (block.__component) {
    case "shared.rich-text":
      return <RichText body={block.body} />;
    case "shared.quote":
      return <Quote title={block.title} body={block.body} />;
    case "shared.media":
      return block.file ? <MediaBlock file={block.file} /> : null;
    case "shared.slider":
      return block.files?.length ? <Slider files={block.files} /> : null;
    default:
      return null;
  }
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
    fetchStrapiArticles(),
  ]);

  if (!article) notFound();

  const related = allArticles
    .filter((a) => a.documentId !== documentId)
    .slice(0, 3);

  const articleUrl = `${SITE_URL}/articles/${documentId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description ?? "",
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: "Carlos Valderrama" },
  };

  const dateLocale = locale === "es" ? "es-ES" : "en-US";

  return (
    <>
      <ReadingProgress />
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-gray-200 dark:border-gray-700 pl-4 mb-10">
              {article.description}
            </p>
          )}
          {article.blocks?.map((block, i) => (
            <div key={i} className="mb-6">
              <BlockRenderer block={block} />
            </div>
          ))}
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
                  key={a.documentId}
                  href={`/articles/${a.documentId}`}
                  className="group flex flex-col gap-1 border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-all"
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
      <Footer {...footerData} />
    </>
  );
}
