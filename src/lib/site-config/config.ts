import type { NavLink, SiteConfig } from "./types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlosvalderrama.com";

export const STRAPI_URL =
  process.env.STRAPI_URL ?? "http://localhost:1337";

export const NAV_LINKS: readonly NavLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "jobs", href: "/jobs" },
  { key: "contact", href: "/contact" },
  { key: "articles", href: "/articles" },
] as const;

export const siteConfig: SiteConfig = {
  name: "Carlos Valderrama",
  title: "Carlos Valderrama",
  description: "Global talent connector and technical recruitment specialist.",
  url: SITE_URL,
  email: "carlos@carlosvalderrama.com",
  copyright: "© 2025 Carlos Valderrama. All rights reserved.",
  social: [
    { platform: "LinkedIn", url: "https://linkedin.com/company/solvo" },
    { platform: "GitHub", url: "https://github.com/solvo" },
  ],
  navLinks: [...NAV_LINKS],
  navCta: {
    href: "/contact",
  },
  hero: {
    backgroundImage: "/me.png",
    ctaLink: "/jobs",
  },
  footer: {
    copyright: "© 2025 Carlos Valderrama. All rights reserved.",
    email: "carlos@carlosvalderrama.com",
    social: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/solvo" },
      { platform: "GitHub", url: "https://github.com/solvo" },
    ],
  },
};
