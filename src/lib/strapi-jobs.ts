import { STRAPI_URL } from "./config";

export interface StrapiJob {
  id: number;
  documentId: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  isOpen: boolean;
  status?: string;
  skills?: string[];
  modality?: string;
  paymentType?: string;
  postedAt?: string;
  image?: { url: string; alternativeText?: string };
}

export function getStrapiImageSrc(url: string): string {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export async function fetchStrapiJob(id: string): Promise<StrapiJob | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/jobs/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? null;
  } catch {
    return null;
  }
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
