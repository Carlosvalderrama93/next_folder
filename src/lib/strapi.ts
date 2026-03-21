import { STRAPI_URL } from "./config";

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
}

export async function fetchStrapiArticles(): Promise<StrapiArticle[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}

export interface StrapiJob {
  id: number;
  documentId: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  isOpen: boolean;
  image?: { url: string; alternativeText?: string };
}

export function getStrapiImageSrc(url: string): string {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export async function fetchStrapiJobs(): Promise<StrapiJob[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/jobs?populate=image`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}
