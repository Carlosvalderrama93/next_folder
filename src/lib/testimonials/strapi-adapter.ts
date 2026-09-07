import { STRAPI_URL } from "@/lib/site-config";
import type { Testimonial, TestimonialsQueryOptions } from "./types";

export interface RawStrapiTestimonial {
  id: number;
  documentId: string;
  name: string;
  role: string;
  company?: string;
  message: string;
  avatar?: string;
  rating?: number;
}

export function normalizeStrapiTestimonial(raw: RawStrapiTestimonial): Testimonial {
  const roleDisplay =
    raw.company && !raw.role.includes(raw.company)
      ? `${raw.role} · ${raw.company}`
      : raw.role;

  return {
    id: String(raw.documentId ?? raw.id),
    name: raw.name,
    role: roleDisplay,
    message: raw.message,
    avatar: raw.avatar,
  };
}

export async function fetchTestimonialsFromStrapi(
  options?: TestimonialsQueryOptions
): Promise<Testimonial[]> {
  try {
    const query = options?.limit ? `?pagination[pageSize]=${options.limit}` : "";
    const res = await fetch(`${STRAPI_URL}/api/testimonials${query}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const data: RawStrapiTestimonial[] = json?.data ?? [];
    return data.map(normalizeStrapiTestimonial);
  } catch {
    return [];
  }
}
