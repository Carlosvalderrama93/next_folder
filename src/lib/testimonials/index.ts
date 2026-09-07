/**
 * Testimonials domain seam.
 * Provides access to candidate and client testimonials with Strapi CMS and static fallback.
 */
import { getStaticTestimonials } from "./static-adapter";
import { fetchTestimonialsFromStrapi } from "./strapi-adapter";
import type { Testimonial, TestimonialsQueryOptions } from "./types";

export type { Testimonial, TestimonialsQueryOptions } from "./types";
export { getStaticTestimonials } from "./static-adapter";
export { fetchTestimonialsFromStrapi, normalizeStrapiTestimonial } from "./strapi-adapter";
export { staticTestimonials } from "./fixtures";

/**
 * Lists testimonials for display, with optional limit.
 * Attempts to fetch from Strapi CMS first; falls back cleanly to static fixtures.
 */
export async function listTestimonials(options?: TestimonialsQueryOptions): Promise<Testimonial[]> {
  const strapiData = await fetchTestimonialsFromStrapi(options);
  if (strapiData.length > 0) {
    return strapiData;
  }
  return getStaticTestimonials(options);
}

