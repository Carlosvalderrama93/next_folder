import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

export interface CardArticle {
  id: string;
  title: string;
  href: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  date: string;
  author?: { name: string; avatar?: string };
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function ArticleCard({ article }: { article: CardArticle }) {
  return (
    <Link
      href={article.href}
      className="group flex flex-col justify-between border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {article.coverImage && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            {article.category}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
          <time dateTime={article.date} className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(article.date)}
          </time>
          <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {readingTime(article.excerpt)}
          </span>
        </div>
        <h2 className="font-bold text-gray-900 dark:text-white text-base mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <span className="font-semibold text-black dark:text-white text-sm mt-4 inline-flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          Read more
          <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </span>
        {article.author && (
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-4">
            {article.author.avatar && (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
            )}
            <span>
              By{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {article.author.name}
              </span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function FeaturedArticleCard({
  article,
  imageWidth = 460,
  children,
}: {
  article: CardArticle;
  imageWidth?: number;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      {article.coverImage && (
        <Link
          href={article.href}
          className="group flex-shrink-0 w-full overflow-hidden rounded-2xl"
          style={{ maxWidth: imageWidth }}
        >
          <div className="relative w-full h-64 md:h-[340px]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={`(max-width: 768px) 100vw, ${imageWidth}px`}
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </Link>
      )}
      <div className="flex flex-col justify-center max-w-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            {article.category}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
          <time dateTime={article.date} className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(article.date)}
          </time>
          <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {readingTime(article.excerpt)}
          </span>
        </div>
        <Link href={article.href}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-tight">
            {article.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          {article.excerpt}
        </p>
        {article.author && (
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            {article.author.avatar && (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
            )}
            <span>
              By{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {article.author.name}
              </span>
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
