import Link from "next/link";
import { homePageData } from "../Data/homepage";
import { ArticleCard, FeaturedArticleCard, type CardArticle } from "./ui/article-cards";

const rawArticles = homePageData.blogPreview;
const author = homePageData.authors[0];

function toCardArticle(a: (typeof rawArticles)[number]): CardArticle {
  return {
    id: a.id,
    title: a.title,
    href: `/articles/${a.slug}`,
    excerpt: a.excerpt,
    coverImage: a.coverImage,
    category: a.category ?? "Latest",
    date: a.createdAt,
    author: { name: author.name, avatar: author.avatar },
  };
}

const [featured, ...rest] = rawArticles.map(toCardArticle);

function Articles() {

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 border-t border-gray-100 dark:border-gray-800/50">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Articles
        </h2>
        <Link
          href="/articles"
          className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          View all →
        </Link>
      </div>
      {featured && (
        <FeaturedArticleCard article={featured} imageWidth={480} showButton />
      )}
      {rest.length > 0 && (
        <hr className="border-gray-100 dark:border-gray-800 mb-8" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rest.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

export default Articles;
