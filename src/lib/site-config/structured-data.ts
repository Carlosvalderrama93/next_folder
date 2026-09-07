import { siteConfig, SITE_URL } from "./config";

export interface StructuredJobData {
  title: string;
  description: string;
  location: string;
  type: string;
  postedAt?: string;
}

export interface StructuredArticleData {
  title: string;
  description?: string;
  publishedAt: string;
  href?: string;
}

/**
 * Builds standard Schema.org JobPosting structured data for search engines.
 */
export function buildJobPostingJsonLd(job: StructuredJobData): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    jobLocation: {
      "@type": "Place",
      address: job.location,
    },
    employmentType: job.type.toUpperCase().replace(/\s+/g, "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
  };

  if (job.postedAt) {
    jsonLd.datePosted = job.postedAt;
  }

  return jsonLd;
}

/**
 * Builds standard Schema.org Article structured data for rich snippets.
 */
export function buildArticleJsonLd(article: StructuredArticleData): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description ?? "",
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (article.href) {
    jsonLd.mainEntityOfPage = {
      "@type": "WebPage",
      "@id": `${SITE_URL}${article.href}`,
    };
  }

  return jsonLd;
}

/**
 * Builds standard Schema.org WebSite / Organization structured data.
 */
export function buildWebsiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

/**
 * Safely serializes JSON-LD to prevent closing script tag injection (XSS protection).
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
