import type { MetadataRoute } from "next";
import { listArticles } from "@/lib/articles";
import { listJobs } from "@/lib/jobs";
import { SITE_URL } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, jobs] = await Promise.all([listArticles(), listJobs()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/about`, priority: 0.8 },
    { url: `${SITE_URL}/jobs`, priority: 0.9 },
    { url: `${SITE_URL}/articles`, priority: 0.8 },
    { url: `${SITE_URL}/contact`, priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}${a.href}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    priority: 0.6,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${SITE_URL}${j.applyHref}`,
    lastModified: j.postedAt ? new Date(j.postedAt) : new Date(),
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...jobRoutes];
}
