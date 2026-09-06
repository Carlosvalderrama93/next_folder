import type {
  Job,
  JobStatus,
  JobModality,
  JobPaymentType,
  RawStaticJob,
} from "@/lib/jobs/types";
import type { RawStaticArticle } from "@/lib/articles/types";
import type { Testimonial } from "@/lib/testimonials/types";

// Re-export canonical domain types to preserve compatibility
export type {
  Job,
  JobStatus,
  JobModality,
  JobPaymentType,
  RawStaticJob,
  Testimonial,
};
export type BlogPreview = RawStaticArticle;

export type NavLink = {
  name: string;
  href: string;
};

export type NavCTA = {
  text: string;
  href: string;
};

export type Nav = {
  logo: string;
  links: NavLink[];
  cta: NavCTA;
};

export type Hero = {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
};

export type Author = {
  id: string;
  name: string;
  profileUrl: string;
  avatar?: string;
  slug: string;
};

export type Footer = {
  copyright: string;
  email?: string;
  social?: { platform: string; url: string }[];
};

export type HomePageData = {
  nav: Nav;
  hero: Hero;
  testimonials?: Testimonial[];
  footer: Footer;
};
