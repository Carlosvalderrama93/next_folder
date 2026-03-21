import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { homePageData } from "@/Data/homepage";
import { STRAPI_URL } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Carlos Valderrama",
  description: "Insights on tech recruitment, career growth, and the LATAM tech scene.",
};

interface ArticleItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
}

async function getArticles(): Promise<ArticleItem[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const strapiArticles = await getArticles();
  const staticArticles = homePageData.blogPreview;
  const footerData = homePageData.footer;

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
          Articles
        </h1>

        {strapiArticles.length > 0 ? (
          <div className="flex flex-col gap-6">
            {strapiArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.documentId}`}
                className="block border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-900"
              >
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {article.description}
                  </p>
                )}
                <span className="text-sm font-semibold text-black dark:text-white mt-3 inline-block hover:underline">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Showing preview articles. Start Strapi to load live content.
            </p>
            <div className="flex flex-col gap-6">
              {staticArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col md:flex-row gap-5 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
                >
                  {article.coverImage && (
                    <div className="relative w-full md:w-48 h-40 flex-shrink-0">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col justify-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer {...footerData} />
    </>
  );
}
