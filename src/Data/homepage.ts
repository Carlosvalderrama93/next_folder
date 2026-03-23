import type { HomePageData } from "@/types/homepage";

export type {
  NavLink,
  NavCTA,
  Nav,
  Hero,
  Job,
  AboutStat,
  About,
  Testimonial,
  Author,
  BlogPreview,
  ContactCTA,
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
  authors: [
    {
      id: "1",
      name: "Carlos Valderrama",
      profileUrl: "carlos-valderrama",
      avatar:
        "https://split.trexthemes.dev/content/images/2025/06/ChatGPT-Image-Jun-11--2025--06_38_14-PM.png",
      slug: "carlos-valderrama",
    },
  ],
  openPositions: [
    /* ── Static jobs (always merged with Strapi results) ── */
    {
      id: "9",
      title: "React Dev",
      description: `We're looking for a Frontend React Developer to build modern, high-quality user interfaces that deliver an exceptional user experience. If you enjoy crafting clean components, working with the latest React features, and collaborating with a strong engineering team, this role is for you.

## What you'll do

- Develop responsive and modern UIs using React, Hooks, and TypeScript
- Build reusable, maintainable components and front-end libraries
- Ensure excellent performance, accessibility, and visual quality
- Collaborate closely with UX/UI, backend, QA, and product teams
- Participate in code reviews and help shape front-end best practices
- Write clean, testable code and maintain documentation for new features

## What you bring

- 3+ years of experience working with React in production environments
- Strong proficiency in TypeScript, HTML5, CSS3, and responsive design
- Solid understanding of hooks, state management, and component architecture
- Experience integrating REST APIs and handling asynchronous logic
- Familiarity with Git, CI/CD pipelines, and front-end build tools
- Bonus: Experience with design systems, accessibility, or UX principles

## Why join us

- Work with the latest React technologies
- High ownership and impact within a growing engineering team
- Collaborative culture with a strong focus on quality and innovation
- Opportunity to shape the UI/UX of next-generation industrial software

## Conditions

- **Type:** Hybrid (4 days in the office, 1 day from home)
- **Contract:** Permanent contract directly with the company
- **Location:** Medellín
- **Hours:** Monday to Friday, 44 hours per week`,
      location: "Medellín, Colombia",
      type: "Full-time",
      status: "open",
      skills: ["React", "TypeScript", "HTML5", "CSS3", "REST APIs", "Git"],
      modality: "hybrid",
      paymentType: "salary",
      postedAt: "2025-10-01",
    },
  ],
  about: {
    heading: "About Our Team",
    description:
      "We specialize in connecting IT professionals with top opportunities worldwide. Our mission is to bridge talent and opportunity through innovative recruitment strategies.",
    image: "/me.png",
    stats: [
      { value: "50+", label: "Companies Partnered" },
      { value: "200+", label: "Placements Made" },
      { value: "100%", label: "Remote Focus" },
    ],
  },
  testimonials: [
    {
      id: "1",
      name: "Jane Doe",
      role: "Software Engineer",
      message: "Thanks to this recruiter, I landed my dream job!",
      avatar: "/images/jane.jpg",
    },
    {
      id: "2",
      name: "John Smith",
      role: "Product Manager",
      message: "Professional and supportive during the whole process.",
      avatar: "/images/john.jpg",
    },
  ],
  blogPreview: [
    {
      id: "101",
      title: "How to Ace a Remote Interview",
      slug: "remote-interview-tips",
      excerpt:
        "Remote interviews are the new normal. Here are 5 tips... lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      coverImage:
        "https://images.unsplash.com/photo-1578321271369-d008a1ee4fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDI5M3x8YXJ0fGVufDB8fHx8MTc0OTY2MjE5NHww&ixlib=rb-4.1.0&q=80&w=2000",
      createdAt: "2025-08-20",
      category: "Career Advice",
    },
    {
      id: "102",
      title: "Top 10 Skills for IT Professionals in 2025",
      slug: "top-skills-it-2025",
      excerpt:
        "Stay ahead in your career with these trending skills. lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      coverImage:
        "https://images.unsplash.com/photo-1575995864268-5dec34a5bb99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMxOHx8YXJ0fGVufDB8fHx8MTc0OTY2MjIwNHww&ixlib=rb-4.1.0&q=80&w=2000",
      createdAt: "2025-08-15",
      category: "Tech Skills",
    },
    {
      id: "103",
      title: "How to Ace a Remote Interview",
      slug: "remote-interview-tips",
      excerpt:
        "Remote interviews are the new normal. Here are 5 tips.lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      coverImage:
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDMxNHx8YXJ0fGVufDB8fHx8MTc0OTY1MTY3NHww&ixlib=rb-4.1.0&q=80&w=2000",
      createdAt: "2025-08-20",
      category: "Remote Work",
    },
    {
      id: "104",
      title: "Top 10 Skills for IT Professionals in 2025",
      slug: "top-skills-it-2025",
      excerpt:
        "Stay ahead in your career with these trending skills. lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      coverImage:
        "https://images.unsplash.com/photo-1577049091731-e6ed8b1e8b02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDIxfHx2YW4tZ29naHxlbnwwfHx8fDE3NDk2NDg4OTR8MA&ixlib=rb-4.1.0&q=80&w=2000",
      createdAt: "2025-08-15",
      category: "Tech Skills",
    },
  ],
  contactCTA: {
    heading: "Ready to take the next step?",
    description: "Contact us to learn more about open opportunities.",
    ctaText: "Get in Touch",
    ctaLink: "/contact",
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
