import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiArticles } from "@/lib/strapi";
import type { Metadata } from "next";
import ArticlesClient, { type ArticleItem } from "./articles-client";

export const metadata: Metadata = {
  title: "Articles",
  description: "Insights on tech recruitment, career growth, and the LATAM tech scene.",
};

export default async function ArticlesPage() {
  const strapiArticles = await fetchStrapiArticles();
  const staticArticles = homePageData.blogPreview;
  const footerData = homePageData.footer;
  const defaultAuthor = homePageData.authors[0];

  const articles: ArticleItem[] =
    strapiArticles.length > 0
      ? strapiArticles.map((a) => ({
          id: String(a.id),
          title: a.title,
          href: `/articles/${a.documentId}`,
          excerpt: a.description ?? "",
          category: "Articles",
          date: a.publishedAt,
          author: { name: defaultAuthor.name, avatar: defaultAuthor.avatar },
        }))
      : staticArticles.map((a) => ({
          id: a.id,
          title: a.title,
          href: `/articles/${a.slug}`,
          excerpt: a.excerpt,
          coverImage: a.coverImage,
          category: a.category ?? "Articles",
          date: a.createdAt,
          author: { name: defaultAuthor.name, avatar: defaultAuthor.avatar },
        }));

  return (
    <>
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Articles
          </h1>
          <div className="mt-3 mb-6 w-10 h-1 bg-brand rounded-full" />
        </div>
        <ArticlesClient articles={articles} />
      </main>
      <Footer {...footerData} />
    </>
  );
}
