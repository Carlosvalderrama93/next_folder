import type { MetadataRoute } from "next";
import { STRAPI_URL } from "@/lib/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlosvalderrama.com";

async function getStrapiArticleSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?fields=documentId`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data ?? []).map((a: { documentId: string }) => a.documentId);
  } catch {
    return [];
  }
}

async function getStrapiJobIds(): Promise<string[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/jobs?fields=documentId`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data ?? []).map((j: { documentId: string }) => j.documentId);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleIds, jobIds] = await Promise.all([
    getStrapiArticleSlugs(),
    getStrapiJobIds(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/about`, priority: 0.8 },
    { url: `${SITE_URL}/jobs`, priority: 0.9 },
    { url: `${SITE_URL}/apply`, priority: 0.9 },
    { url: `${SITE_URL}/articles`, priority: 0.8 },
    { url: `${SITE_URL}/contact`, priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articleIds.map((id) => ({
    url: `${SITE_URL}/articles/${id}`,
    priority: 0.6,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobIds.map((id) => ({
    url: `${SITE_URL}/apply/${id}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...jobRoutes];
}
