import Image from "next/image";
import Link from "next/link";
import type { BlogPreview, Author } from "../Data/homepage";
import { homePageData } from "../Data/homepage";

const articles: BlogPreview[] = homePageData.blogPreview;
const authors = homePageData.authors;

function AuthorLine({ author }: { author: Author }) {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-4">
      {author.avatar && (
        <Image
          src={author.avatar}
          alt={author.name}
          width={28}
          height={28}
          className="rounded-full object-cover"
        />
      )}
      <span>
        By{" "}
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {author.name}
        </span>
      </span>
    </div>
  );
}

function ArticleCard({ article }: { article: BlogPreview }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col justify-between w-72 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {article.coverImage && (
        <div className="relative w-full h-44">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="288px"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 uppercase">
          Latest
        </span>
        <h2 className="font-bold text-gray-900 dark:text-white text-base mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <span className="font-semibold text-black dark:text-white text-sm mt-4 inline-flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          Read more
          <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
        </span>
        <AuthorLine author={authors[0]} />
      </div>
    </Link>
  );
}

function FeaturedArticle({ article }: { article: BlogPreview }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-12 px-4">
      {article.coverImage && (
        <Link
          href={`/articles/${article.slug}`}
          className="flex-shrink-0 w-full md:w-[480px]"
        >
          <div className="relative w-full h-72 md:h-[380px]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 480px"
              priority
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col justify-center max-w-lg">
        <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 uppercase">
          Featured
        </span>
        <Link href={`/articles/${article.slug}`}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-tight">
            {article.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <AuthorLine author={authors[0]} />
      </div>
    </div>
  );
}

function Articles() {
  const [featured, ...rest] = articles;
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
      {featured && <FeaturedArticle article={featured} />}
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {rest.map((post) => (
          <ArticleCard key={post.id} article={post} />
        ))}
      </div>
    </section>
  );
}

export default Articles;
