import { STRAPI_URL } from "@/lib/config";
import type { Job, RawStrapiJob } from "./types";
import { normalizeStrapiJob } from "./normalizer";

export async function fetchJobsFromStrapi(): Promise<Job[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/jobs?populate=image`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const data: RawStrapiJob[] = json?.data ?? [];
    return data.map(normalizeStrapiJob);
  } catch {
    return [];
  }
}

export async function fetchJobFromStrapi(id: string): Promise<Job | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/jobs/${id}?populate=image`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const data: RawStrapiJob | undefined = json?.data;
    return data ? normalizeStrapiJob(data) : null;
  } catch {
    return null;
  }
}
