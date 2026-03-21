import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const STRAPI = "http://localhost:1337";
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
  const src = file.url.startsWith("http") ? file.url : `${STRAPI}${file.url}`;
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={file.alternativeText ?? ""}
        className="w-full rounded-xl object-cover max-h-[500px]"
      />
    </figure>
  );
}

function Slider({ files }: { files: MediaFile[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto my-8 pb-2">
      {files.map((file, i) => {
        const src = file.url.startsWith("http")
          ? file.url
          : `${STRAPI}${file.url}`;
        return (
          <img
            key={i}
            src={src}
            alt={file.alternativeText ?? ""}
            className="w-72 h-48 object-cover rounded-xl flex-shrink-0"
          />
        );
      })}
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

  let article: ArticleItem | null = null;
  let error = false;

  try {
    const res = await fetch(
      `${STRAPI}/api/articles/${documentId}?populate[blocks][populate]=*`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      article = data?.data ?? null;
    } else {
      error = true;
    }
  } catch {
    error = true;
  }

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

        {error || !article ? (
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Article not found
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Make sure Strapi is running at localhost:1337.
            </p>
          </div>
        ) : (
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
        )}
      </main>
      <Footer {...footerData} />
    </>
  );
}
