// types/home.ts

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
  applyUrl: string;
  image?: string;
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

export const homePageData: HomePageData = {
  hero: {
    title: "Join Our Global Talent Network",
    subtitle: "We connect top talent with leading companies.",
    ctaText: "Apply for a Job",
    ctaLink: "/apply",
    backgroundImage:
      "https://split.trexthemes.dev/content/images/2025/06/ChatGPT-Image-Jun-11--2025--07_14_05-PM.png",
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
      href: "/apply",
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
    {
      id: "1",
      title: "Frontend Developer",
      description:
        "We are looking for a React developer...  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, nesciunt eius dolore quia, est debitis voluptas cum magnam et ipsa unde earum a tempora pariatur quo perspiciatis. Numquam, error voluptate.",
      location: "Remote",
      type: "Full-time",
      postedAt: "2025-08-25",
      applyUrl: "/apply/1",
      image:
        "https://zinduaschool.com/wp-content/uploads/sites/2/2023/10/WhatsApp-Image-2023-10-24-at-16.31.18.jpeg",
    },
    {
      id: "2",
      title: "Backend Engineer",
      description:
        "Node.js and PostgreSQL experience required.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, nesciunt eius dolore quia, est debitis voluptas cum magnam et ipsa unde earum a tempora pariatur quo perspiciatis. Numquam, error voluptate.",
      location: "Hybrid - Medellín",
      type: "Full-time",
      postedAt: "2025-08-28",
      applyUrl: "/apply/2",
      image:
        "https://zinduaschool.com/wp-content/uploads/sites/2/2023/10/WhatsApp-Image-2023-10-24-at-16.31.18.jpeg",
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
      excerpt:
        "Remote interviews are the new normal. Here are 5 tips... lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      coverImage:
        "https://images.unsplash.com/photo-1578321271369-d008a1ee4fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDI5M3x8YXJ0fGVufDB8fHx8MTc0OTY2MjE5NHww&ixlib=rb-4.1.0&q=80&w=2000",
      createdAt: "2025-08-20",
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
