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

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  postedAt: string;
  image?: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type About = {
  heading: string;
  description: string;
  image?: string;
  stats?: AboutStat[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar?: string;
};

export type Author = {
  id: string;
  name: string;
  profileUrl: string;
  avatar?: string;
  slug: string;
};

export type BlogPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  createdAt: string;
};

export type ContactCTA = {
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
};

export type Footer = {
  copyright: string;
  links: { label: string; url: string }[];
  social?: { platform: string; url: string }[];
};

export type HomePageData = {
  nav: Nav;
  hero: Hero;
  openPositions: Job[];
  about: About;
  testimonials: Testimonial[];
  blogPreview: BlogPreview[];
  authors: Author[];
  contactCTA: ContactCTA;
  footer: Footer;
};
