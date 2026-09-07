import { staticTestimonials } from "./fixtures";
import type { Testimonial, TestimonialsQueryOptions } from "./types";

export function getStaticTestimonials(options?: TestimonialsQueryOptions): Testimonial[] {
  const list = [...staticTestimonials];
  if (options?.limit && options.limit > 0) {
    return list.slice(0, options.limit);
  }
  return list;
}
