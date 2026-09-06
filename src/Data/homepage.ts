import type { HomePageData } from "@/types/homepage";

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
  testimonials: [
    {
      id: "3",
      name: "Emily Carter",
      role: "Frontend Developer",
      message:
        "The entire process was smooth, transparent, and much faster than I expected. I received constant updates and valuable interview preparation.",
      avatar: "/images/emily.jpg",
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "DevOps Engineer",
      message: "Excellent communication from start to finish.",
      avatar: "/images/michael.jpg",
    },
    {
      id: "5",
      name: "Sophia Wilson",
      role: "UX/UI Designer",
      message:
        "I felt genuinely supported throughout every stage of the hiring process. The recruiter understood my career goals and connected me with a company that was the perfect fit for both my skills and long-term aspirations.",
      avatar: "/images/sophia.jpg",
    },
    {
      id: "6",
      name: "David Lee",
      role: "Backend Developer",
      message:
        "Very professional, responsive, and always available to answer my questions. I highly recommend working with them.",
      avatar: "/images/david.jpg",
    },
    {
      id: "7",
      name: "Olivia Martinez",
      role: "QA Automation Engineer",
      message:
        "From the first call to signing my offer, everything was organized and stress-free. The guidance before each interview gave me the confidence I needed to perform at my best.",
      avatar: "/images/olivia.jpg",
    },
    {
      id: "8",
      name: "Daniel Kim",
      role: "Data Engineer",
      message: "Amazing experience!",
      avatar: "/images/daniel.jpg",
    },
  ],
  footer: {
    copyright: "© 2025 Carlos Valderrama. All rights reserved.",
    email: "carlos@carlosvalderrama.com",
    social: [
      { platform: "LinkedIn", url: "https://linkedin.com/company/solvo" },
      { platform: "GitHub", url: "https://github.com/solvo" },
    ],
  },
};
