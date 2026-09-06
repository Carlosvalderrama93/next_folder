/**
 * Testimonials domain seam.
 * Provides access to candidate and client testimonials with static fallback.
 */
import { getStaticTestimonials } from "./static-adapter";
import type { Testimonial, TestimonialsQueryOptions } from "./types";

export type { Testimonial, TestimonialsQueryOptions } from "./types";
export { getStaticTestimonials } from "./static-adapter";
export { staticTestimonials } from "./fixtures";

/**
 * Lists testimonials for display, with optional limit.
 */
export async function listTestimonials(options?: TestimonialsQueryOptions): Promise<Testimonial[]> {
  return getStaticTestimonials(options);
}
