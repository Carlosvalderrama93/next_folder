import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArticleCard, FeaturedArticleCard } from "./article-card";
import { listArticles } from "@/lib/articles";

export default async function FeaturedArticlesSection() {
  const t = await getTranslations("articles");
  const articles = await listArticles({ limit: 4 });
  const [featured, ...rest] = articles;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 border-t border-gray-100 dark:border-border">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground">
          {t("heading")}
        </h2>
        <Link
          href="/articles"
          className="text-sm font-semibold text-gray-500 dark:text-muted-fg hover:text-brand transition-colors"
        >
          {t("viewAll")}
        </Link>
      </div>
      {featured && (
        <FeaturedArticleCard article={featured} imageWidth={480}>
          <Link
            href={featured.href as `/${string}`}
            className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-full transition-colors"
          >
            {t("readArticle")}
          </Link>
        </FeaturedArticleCard>
      )}
      {rest.length > 0 && (
        <hr className="border-gray-100 dark:border-border mb-8" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rest.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
