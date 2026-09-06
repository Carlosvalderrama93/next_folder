export type NavKey = "home" | "about" | "jobs" | "contact" | "articles";

export interface NavLink {
  key: NavKey;
  href: string;
}

export interface NavCTA {
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HeroConfig {
  backgroundImage?: string;
  ctaLink: string;
}

export interface FooterConfig {
  copyright: string;
  email?: string;
  social: SocialLink[];
}

export interface SiteConfig {
  name: string;
  title: string;
  description?: string;
  url: string;
  email: string;
  copyright: string;
  social: SocialLink[];
  navLinks: NavLink[];
  navCta: NavCTA;
  hero: HeroConfig;
  footer: FooterConfig;
}
