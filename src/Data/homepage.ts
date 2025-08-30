// types/home.ts

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
  applyUrl: string;
};

export type About = {
  heading: string;
  description: string;
  image?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar?: string;
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
  hero: Hero;
  openPositions: Job[];
  about: About;
  testimonials: Testimonial[];
  blogPreview: BlogPreview[];
  contactCTA: ContactCTA;
  footer: Footer;
};

export const homePageData: HomePageData = {
  hero: {
    title: "Join Our Global Talent Network",
    subtitle: "We connect top talent with leading companies.",
    ctaText: "Apply for a Job",
    ctaLink: "/apply",
    backgroundImage: "/images/hero-bg.jpg",
  },
  openPositions: [
    {
      id: "1",
      title: "Frontend Developer",
      description: "We are looking for a React developer...",
      location: "Remote",
      type: "Full-time",
      postedAt: "2025-08-25",
      applyUrl: "/apply/1",
    },
    {
      id: "2",
      title: "Backend Engineer",
      description: "Node.js and PostgreSQL experience required.",
      location: "Hybrid - Medellín",
      type: "Full-time",
      postedAt: "2025-08-28",
      applyUrl: "/apply/2",
    },
  ],
  about: {
    heading: "About Our Team",
    description:
      "We specialize in connecting IT professionals with top opportunities worldwide. Our mission is to bridge talent and opportunity through innovative recruitment strategies.",
    image: "/images/about.jpg",
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
      excerpt: "Remote interviews are the new normal. Here are 5 tips...",
      coverImage: "/images/blog/interview.jpg",
      createdAt: "2025-08-20",
    },
    {
      id: "102",
      title: "Top 10 Skills for IT Professionals in 2025",
      slug: "top-skills-it-2025",
      excerpt: "Stay ahead in your career with these trending skills...",
      coverImage: "/images/blog/skills.jpg",
      createdAt: "2025-08-15",
    },
  ],
  contactCTA: {
    heading: "Ready to take the next step?",
    description: "Contact us to learn more about open opportunities.",
    ctaText: "Get in Touch",
    ctaLink: "/contact",
  },
  footer: {
    copyright: "© 2025 Solvo Global",
    links: [
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Terms of Service", url: "/terms" },
    ],
    social: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/solvo" },
      { platform: "GitHub", url: "https://github.com/solvo" },
    ],
  },
};
