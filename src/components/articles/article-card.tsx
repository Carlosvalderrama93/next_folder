import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { Avatar } from "@/components/ui/avatar";
import type { Article } from "@/lib/articles";

export type CardArticle = Article;

export function formatDate(dateStr: string, locale = "en") {
  const dateLocale = locale === "es" ? "es-ES" : "en-US";
  return new Date(dateStr).toLocaleDateString(dateLocale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const WORD_RE = /\s+/;

export function readingTime(text: string, locale = "en") {
  const words = text.trim().split(WORD_RE).length;
  const count = Math.max(1, Math.ceil(words / 200));
  return locale === "es" ? `${count} min de lectura` : `${count} min read`;
}

export function ArticleCard({
  article,
  locale = "en",
  readMoreText,
  byText,
}: {
  article: Article;
  locale?: string;
  readMoreText?: string;
  byText?: string;
}) {
  const readMore = readMoreText ?? (locale === "es" ? "Leer más" : "Read more");
  const by = byText ?? (locale === "es" ? "Por" : "By");

  return (
    <Link
      href={article.href}
      className="group flex flex-col justify-between border border-gray-200 dark:border-border rounded-xl bg-white dark:bg-surface shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-brand/40 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 overflow-hidden"
    >
      {article.coverImage && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold tracking-widest text-brand uppercase">
            {article.category}
          </span>
          <span className="text-xs text-gray-400 dark:text-muted-fg" aria-hidden="true">·</span>
          <time dateTime={article.date} className="text-xs text-gray-400 dark:text-muted-fg">
            {formatDate(article.date, locale)}
          </time>
          <span className="text-xs text-gray-400 dark:text-muted-fg" aria-hidden="true">·</span>
          <span className="text-xs text-gray-400 dark:text-muted-fg">
            {readingTime(article.excerpt, locale)}
          </span>
        </div>
        <h2 className="font-bold text-gray-900 dark:text-foreground text-base mb-2 line-clamp-2 group-hover:text-brand transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-muted-fg leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <span className="font-semibold text-black dark:text-foreground text-sm mt-4 inline-flex items-center gap-1 group-hover:text-brand transition-colors">
          {readMore}
          <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </span>
        {article.author && (
          <div className="text-sm text-gray-500 dark:text-muted-fg flex items-center gap-2 mt-4">
            <Avatar src={article.author.avatar} alt={article.author.name} size={28} />
            <span>
              {by}{" "}
              <span className="font-semibold text-gray-700 dark:text-foreground">
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
  locale = "en",
  byText,
  imageWidth = 460,
  children,
}: {
  article: Article;
  locale?: string;
  byText?: string;
  imageWidth?: number;
  children?: ReactNode;
}) {
  const by = byText ?? (locale === "es" ? "Por" : "By");

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      {article.coverImage && (
        <Link
          href={article.href}
          aria-hidden="true"
          tabIndex={-1}
          className="group flex-shrink-0 w-full overflow-hidden rounded-2xl"
          style={{ maxWidth: imageWidth }}
        >
          <div className="relative w-full h-64 md:h-[340px]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes={`(max-width: 768px) 100vw, ${imageWidth}px`}
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </Link>
      )}
      <div className="flex flex-col justify-center max-w-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold tracking-widest text-brand uppercase">
            {article.category}
          </span>
          <span className="text-xs text-gray-400 dark:text-muted-fg" aria-hidden="true">·</span>
          <time dateTime={article.date} className="text-xs text-gray-400 dark:text-muted-fg">
            {formatDate(article.date, locale)}
          </time>
          <span className="text-xs text-gray-400 dark:text-muted-fg" aria-hidden="true">·</span>
          <span className="text-xs text-gray-400 dark:text-muted-fg">
            {readingTime(article.excerpt, locale)}
          </span>
        </div>
        <Link href={article.href}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-4 hover:text-brand transition-colors leading-tight">
            {article.title}
          </h2>
        </Link>
        <p className="text-gray-600 dark:text-muted-fg leading-relaxed mb-4">
          {article.excerpt}
        </p>
        {article.author && (
          <div className="text-sm text-gray-500 dark:text-muted-fg flex items-center gap-2">
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
              {by}{" "}
              <span className="font-semibold text-gray-700 dark:text-foreground">
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
