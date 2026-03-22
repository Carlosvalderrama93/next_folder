import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import {
  fetchStrapiArticleDetail,
  getStrapiImageSrc,
  type StrapiArticleDetail,
  type StrapiBlock,
  type StrapiMediaFile,
} from "@/lib/strapi";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

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
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;
  const article = await getArticle(documentId);

  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description ?? "",
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: "Carlos Valderrama" },
  };

  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/articles"
          className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8 inline-block"
        >
          ← Back to Articles
        </Link>

        <article className="mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
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
      </main>
      <Footer {...footerData} />
    </>
  );
}
