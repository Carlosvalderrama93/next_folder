import type { HomePageData } from "@/types/homepage";
import { staticTestimonials } from "@/lib/testimonials/fixtures";

export type {
  NavLink,
  NavCTA,
  Nav,
  Hero,
  Job,
  Testimonial,
  Author,
  BlogPreview,
  Footer,
  HomePageData,
} from "@/types/homepage";

export const homePageData: HomePageData = {
  hero: {
    title: "Join Our Global Talent Network",
    subtitle: "We connect top talent with leading companies.",
    ctaText: "Apply for a Job",
    ctaLink: "/jobs",
    backgroundImage: "/me.png",
  },
  nav: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Jobs", href: "/jobs" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
    cta: {
      text: "Apply Now",
      href: "/contact",
    },
  },
  testimonials: staticTestimonials,
  footer: {
    copyright: "© 2025 Carlos Valderrama. All rights reserved.",
    email: "carlos@carlosvalderrama.com",
    social: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/solvo" },
      { platform: "GitHub", url: "https://github.com/solvo" },
    ],
  },
};
