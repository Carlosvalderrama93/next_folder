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
  publishedAt: string;
}

async function getArticles(): Promise<ArticleItem[]> {
  try {
    const res = await fetch("http://localhost:1337/api/articles", {
      cache: "no-store",
    });
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
        <h1 className="text-4xl font-bold mb-10">Articles</h1>

        {strapiArticles.length > 0 ? (
          <div className="flex flex-col gap-6">
            {strapiArticles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.documentId}`}
                className="block border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
              >
                <p className="text-xs text-gray-400 mb-1">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {article.description}
                  </p>
                )}
                <span className="text-sm font-semibold text-black mt-3 inline-block hover:underline">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-gray-500 mb-8 text-sm">
              Showing preview articles. Start Strapi to load live content.
            </p>
            <div className="flex flex-col gap-6">
              {staticArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col md:flex-row gap-5 border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  {article.coverImage && (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full md:w-48 h-40 object-cover flex-shrink-0"
                    />
                  )}
                  <div className="p-5 flex flex-col justify-center">
                    <p className="text-xs text-gray-400 mb-1">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
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
