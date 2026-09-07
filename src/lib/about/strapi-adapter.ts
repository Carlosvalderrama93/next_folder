import { STRAPI_URL } from "@/lib/site-config";
import type { AboutProfile } from "./types";

const REVALIDATE_SECONDS = 60;

/**
 * Fetch About single-type data from Strapi CMS.
 * Returns Partial<AboutProfile> or null on failure / unreachable host.
 */
export async function fetchAboutProfileFromStrapi(
  locale?: string
): Promise<Partial<AboutProfile> | null> {
  try {
    const query = locale ? `?locale=${encodeURIComponent(locale)}&populate=*` : "?populate=*";
    const res = await fetch(`${STRAPI_URL}/api/about${query}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const data = json?.data;
    if (!data || typeof data !== "object") return null;

    return data as Partial<AboutProfile>;
  } catch {
    return null;
  }
}
