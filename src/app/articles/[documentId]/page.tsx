import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import { STRAPI_URL } from "@/lib/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

const footerData = homePageData.footer;

interface MediaFile {
  url: string;
  alternativeText?: string;
}

type Block =
  | { __component: "shared.rich-text"; body: string }
  | { __component: "shared.quote"; title: string; body: string }
  | { __component: "shared.media"; file: MediaFile }
  | { __component: "shared.slider"; files: MediaFile[] };

interface ArticleItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
  blocks: Block[];
}

async function getArticle(documentId: string): Promise<ArticleItem | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles/${documentId}?populate[blocks][populate]=*`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ documentId: string }>;
}): Promise<Metadata> {
  const { documentId } = await params;
  const article = await getArticle(documentId);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | Carlos Valderrama`,
    description: article.description,
  };
}

function resolveUrl(url: string) {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
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

function MediaBlock({ file }: { file: MediaFile }) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video">
        <Image
          src={resolveUrl(file.url)}
          alt={file.alternativeText ?? ""}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
    </figure>
  );
}

function Slider({ files }: { files: MediaFile[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto my-8 pb-2">
      {files.map((file, i) => (
        <div key={i} className="relative w-72 h-48 flex-shrink-0">
          <Image
            src={resolveUrl(file.url)}
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

function BlockRenderer({ block }: { block: Block }) {
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

  return (
    <>
      <Navigation />
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
