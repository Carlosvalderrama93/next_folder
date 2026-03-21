import type { MetadataRoute } from "next";
import { STRAPI_URL } from "@/lib/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlosvalderrama.com";

async function getStrapiArticles(): Promise<{ documentId: string; updatedAt: string }[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?fields[0]=documentId&fields[1]=updatedAt`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data ?? []).map((a: { documentId: string; updatedAt: string }) => ({
      documentId: a.documentId,
      updatedAt: a.updatedAt,
    }));
  } catch {
    return [];
  }
}

async function getStrapiJobs(): Promise<{ documentId: string; updatedAt: string }[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/jobs?fields[0]=documentId&fields[1]=updatedAt`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data ?? []).map((j: { documentId: string; updatedAt: string }) => ({
      documentId: j.documentId,
      updatedAt: j.updatedAt,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, jobs] = await Promise.all([getStrapiArticles(), getStrapiJobs()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/about`, priority: 0.8 },
    { url: `${SITE_URL}/jobs`, priority: 0.9 },
    { url: `${SITE_URL}/apply`, priority: 0.9 },
    { url: `${SITE_URL}/articles`, priority: 0.8 },
    { url: `${SITE_URL}/contact`, priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/articles/${a.documentId}`,
    lastModified: new Date(a.updatedAt),
    priority: 0.6,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${SITE_URL}/apply/${j.documentId}`,
    lastModified: new Date(j.updatedAt),
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...jobRoutes];
}
