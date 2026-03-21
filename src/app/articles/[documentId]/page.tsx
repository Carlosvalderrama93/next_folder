import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";

interface ArticleItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const footerData = homePageData.footer;

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
      `http://localhost:1337/api/articles/${documentId}`,
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
          className="text-sm font-semibold text-gray-500 hover:text-black transition-colors mb-8 inline-block"
        >
          ← Back to Articles
        </Link>

        {error || !article ? (
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Article not found
            </h1>
            <p className="text-gray-500 text-sm">
              Make sure Strapi is running at localhost:1337.
            </p>
          </div>
        ) : (
          <article className="mt-4">
            <p className="text-xs text-gray-400 mb-3">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            {article.description && (
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-4">
                {article.description}
              </p>
            )}
          </article>
        )}
      </main>
      <Footer {...footerData} />
    </>
  );
}
