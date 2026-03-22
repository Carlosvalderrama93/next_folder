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
    ctaLink: "/apply",
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
        "We are looking for a React developer with strong TypeScript skills to join a fully remote product team. You will own the UI layer of a SaaS platform serving thousands of users across LATAM.",
      location: "Remote · LATAM",
      type: "Full-time",
      status: "open",
      skills: ["JavaScript", "React", "TypeScript", "CSS"],
      modality: "remote",
      paymentType: "salary",
      postedAt: "2025-08-25",
    },
    {
      id: "2",
      title: "Backend Engineer",
      description:
        "Node.js and PostgreSQL experience required. You will design and maintain RESTful APIs consumed by mobile and web clients, working in a hybrid setup from Medellín.",
      location: "Medellín, Colombia",
      type: "Full-time",
      status: "on-hold",
      skills: ["Node.js", "PostgreSQL", "REST APIs", "Docker"],
      modality: "hybrid",
      paymentType: "salary",
      postedAt: "2025-08-28",
    },
    {
      id: "3",
      title: "Full-Stack Developer",
      description:
        "Contract role for a fintech startup. You will build features across the React frontend and Node.js backend, shipping end-to-end from design handoff to production.",
      location: "Remote · LATAM",
      type: "Contract",
      status: "final-steps",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      modality: "remote",
      paymentType: "hourly",
      postedAt: "2025-09-01",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      description:
        "Own our CI/CD pipelines and cloud infrastructure on AWS. Kubernetes experience is a plus. You will work closely with our engineering team to improve reliability and deployment velocity.",
      location: "Remote · LATAM",
      type: "Full-time",
      status: "open",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      modality: "remote",
      paymentType: "salary",
      postedAt: "2025-09-05",
    },
    {
      id: "5",
      title: "React Native Developer",
      description:
        "Mobile-first role building cross-platform apps for iOS and Android. You will collaborate directly with product and design to ship polished native experiences.",
      location: "Bogotá, Colombia",
      type: "Full-time",
      status: "filled",
      skills: ["React Native", "JavaScript", "iOS", "Android"],
      modality: "hybrid",
      paymentType: "salary",
      postedAt: "2025-07-15",
    },
    {
      id: "6",
      title: ".NET Developer",
      description:
        "Join a Bogotá-based enterprise team building internal tooling on C# and .NET 8. Familiarity with Azure services and SQL Server is required.",
      location: "Bogotá, Colombia",
      type: "Full-time",
      status: "open",
      skills: ["C#", ".NET", "SQL Server", "Azure"],
      modality: "on-site",
      paymentType: "salary",
      postedAt: "2025-09-10",
    },
    {
      id: "7",
      title: "Data Engineer",
      description:
        "Build and maintain data pipelines that power analytics and ML models. Experience with Python, Spark, and NoSQL databases (MongoDB, Cassandra) is essential.",
      location: "Remote · LATAM",
      type: "Contract",
      status: "open",
      skills: ["Python", "MongoDB", "NoSQL", "Spark", "Airflow"],
      modality: "remote",
      paymentType: "mixed",
      postedAt: "2025-09-12",
    },
    {
      id: "8",
      title: "QA Automation Engineer",
      description:
        "Part-time QA role automating regression suites with Selenium and Cypress. The position was cancelled due to a budget freeze; check back for future openings.",
      location: "Lima, Perú",
      type: "Part-time",
      status: "cancelled",
      skills: ["Selenium", "Cypress", "JavaScript", "Testing"],
      modality: "hybrid",
      paymentType: "hourly",
      postedAt: "2025-08-01",
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
