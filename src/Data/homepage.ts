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
      id: "10",
      title: "Node.js Backend Developer",
      description: `We're looking for a Backend Node.js Developer to build scalable APIs and backend services that power modern web applications. If you enjoy solving complex problems, designing reliable systems, and writing clean server-side code, we'd love to meet you.

## What you'll do

- Design, develop, and maintain RESTful APIs and backend services
- Build scalable and secure server-side applications using Node.js and TypeScript
- Integrate databases, third-party APIs, and cloud services
- Optimize application performance and troubleshoot production issues
- Collaborate with frontend developers, DevOps, QA, and product teams
- Write clean, maintainable, and well-tested code

## What you bring

- 3+ years of professional experience with Node.js
- Strong knowledge of TypeScript, Express.js, and REST APIs
- Experience with PostgreSQL or MongoDB
- Familiarity with authentication, authorization, and security best practices
- Experience using Git and CI/CD pipelines
- Bonus: Experience with Docker, AWS, or microservices

## Why join us

- Build scalable backend systems used by thousands of users
- Work with modern technologies and cloud infrastructure
- Collaborative engineering culture with continuous learning
- Opportunities for technical growth and career development

## Conditions

- **Type:** Remote
- **Contract:** Permanent contract directly with the company
- **Location:** Colombia
- **Hours:** Monday to Friday, 40 hours per week`,
      location: "Remote, Colombia",
      type: "Full-time",
      status: "open",
      skills: [
        "Node.js",
        "TypeScript",
        "Express",
        "PostgreSQL",
        "REST APIs",
        "Docker",
      ],
      modality: "remote",
      paymentType: "salary",
      postedAt: "2025-10-02",
    },
    {
      id: "11",
      title: "Full Stack Developer",
      description: `We're looking for a Full Stack Developer who enjoys building complete web applications from backend services to polished user interfaces. You'll work across the entire development lifecycle and help deliver high-quality software.

## What you'll do

- Develop frontend features using React and TypeScript
- Build backend APIs using Node.js and Express
- Design and optimize relational databases
- Collaborate with designers, QA, and product managers
- Participate in architecture discussions and code reviews
- Ensure applications are secure, scalable, and maintainable

## What you bring

- 4+ years of experience as a Full Stack Developer
- Strong experience with React, Node.js, and TypeScript
- Experience with SQL databases and REST APIs
- Familiarity with Git, Docker, and cloud platforms
- Understanding of software architecture and best practices
- Bonus: Experience with Next.js or GraphQL

## Why join us

- Work on products with real business impact
- Exposure to modern full-stack technologies
- Flexible and collaborative work environment
- Excellent opportunities for career growth

## Conditions

- **Type:** Hybrid (3 days in the office, 2 days from home)
- **Contract:** Permanent contract directly with the company
- **Location:** Bogotá
- **Hours:** Monday to Friday, 40 hours per week`,
      location: "Bogotá, Colombia",
      type: "Full-time",
      status: "open",
      skills: ["React", "Node.js", "TypeScript", "SQL", "Docker", "Git"],
      modality: "hybrid",
      paymentType: "salary",
      postedAt: "2025-10-03",
    },
    {
      id: "12",
      title: "DevOps Engineer",
      description: `We're looking for a DevOps Engineer to help build and maintain reliable cloud infrastructure while improving deployment automation and system performance. You'll work closely with development teams to deliver secure and scalable solutions.

## What you'll do

- Build and maintain CI/CD pipelines
- Manage cloud infrastructure and containerized applications
- Monitor application performance and system health
- Automate infrastructure using Infrastructure as Code
- Improve security and deployment processes
- Collaborate with engineering teams to optimize development workflows

## What you bring

- 3+ years of DevOps or Cloud Engineering experience
- Strong knowledge of Docker and Kubernetes
- Experience with AWS, Azure, or GCP
- Familiarity with Terraform or CloudFormation
- Experience with Linux systems and scripting
- Bonus: Monitoring tools such as Prometheus or Grafana

## Why join us

- Work with modern cloud-native technologies
- High ownership over infrastructure decisions
- Continuous learning and certification support
- Collaborative engineering environment

## Conditions

- **Type:** Remote
- **Contract:** Permanent contract directly with the company
- **Location:** Latin America
- **Hours:** Monday to Friday, 40 hours per week`,
      location: "Remote, Latin America",
      type: "Full-time",
      status: "open",
      skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Linux", "CI/CD"],
      modality: "remote",
      paymentType: "salary",
      postedAt: "2025-10-04",
    },
    {
      id: "13",
      title: "QA Automation Engineer",
      description: `We're looking for a QA Automation Engineer passionate about delivering high-quality software through automated testing. You'll work alongside developers to ensure reliability across every release.

## What you'll do

- Design and maintain automated test suites
- Execute regression, integration, and API testing
- Collaborate with developers to identify and resolve defects
- Improve testing processes and quality standards
- Integrate automated tests into CI/CD pipelines
- Document testing strategies and results

## What you bring

- 3+ years of QA Automation experience
- Experience with Selenium, Cypress, or Playwright
- Knowledge of API testing and REST services
- Familiarity with JavaScript or TypeScript
- Experience with Git and CI/CD pipelines
- Bonus: Performance or security testing experience

## Why join us

- Help deliver high-quality software products
- Modern automation tools and technologies
- Strong engineering culture focused on quality
- Professional development opportunities

## Conditions

- **Type:** Hybrid (2 days in the office, 3 days from home)
- **Contract:** Permanent contract directly with the company
- **Location:** Medellín
- **Hours:** Monday to Friday, 40 hours per week`,
      location: "Medellín, Colombia",
      type: "Full-time",
      status: "open",
      skills: [
        "Cypress",
        "Playwright",
        "Selenium",
        "REST APIs",
        "JavaScript",
        "Git",
      ],
      modality: "hybrid",
      paymentType: "salary",
      postedAt: "2025-10-05",
    },
    {
      id: "14",
      title: "Data Engineer",
      description: `We're looking for a Data Engineer to build scalable data pipelines and support analytics initiatives across the organization. You'll play a key role in transforming raw data into reliable business insights.

## What you'll do

- Develop and maintain scalable ETL/ELT pipelines
- Design and optimize data warehouses
- Integrate data from multiple internal and external sources
- Monitor data quality and pipeline reliability
- Collaborate with analysts, data scientists, and engineering teams
- Document data architecture and best practices

## What you bring

- 3+ years of experience as a Data Engineer
- Strong SQL skills and experience with relational databases
- Experience with Python and data processing frameworks
- Familiarity with cloud data platforms
- Knowledge of Airflow or similar orchestration tools
- Bonus: Experience with Spark or BigQuery

## Why join us

- Build data platforms that drive strategic decisions
- Modern cloud-based data stack
- Collaborative and data-driven culture
- Opportunities for growth in analytics and engineering

## Conditions

- **Type:** Remote
- **Contract:** Permanent contract directly with the company
- **Location:** Latin America
- **Hours:** Monday to Friday, 40 hours per week`,
      location: "Remote, Latin America",
      type: "Full-time",
      status: "open",
      skills: ["Python", "SQL", "Airflow", "ETL", "Data Warehousing", "Cloud"],
      modality: "remote",
      paymentType: "salary",
      postedAt: "2025-10-06",
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
