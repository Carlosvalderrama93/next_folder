export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar?: string;
}

export interface TestimonialsQueryOptions {
  limit?: number;
}
