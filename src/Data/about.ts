export const aboutData = {
  name: "Carlos Alberto Valderrama Barbosa",
  headline: [
    "IT Recruiter",
    "Frontend JS Developer",
    "Headhunter",
    "Psychologist",
    "Technical Recruiter",
    "Talent Acquisition",
  ],
  location: "Bogotá D.C., Colombia",
  linkedIn: "https://www.linkedin.com/in/carlosvalderrama93/",
  languages: ["Spanish", "English"] as string[],
  image: "/me.png",

  bio: [
    "I am a **bilingual IT Recruiter and Frontend JS Developer** based in Bogotá, Colombia, with over 2 years of experience in international tech recruitment and a growing track record building web products. I sit at the intersection of psychology, technology, and talent — helping companies find great engineers while also understanding the craft of software development from the inside.",
    "In my current role, I manage full-cycle selection processes for international clients — sourcing, screening, and closing candidates for roles across software development and related IT disciplines. My background in Psychology gives me a strong foundation in behavioral analysis, communication, and candidate experience, which I combine with technical conversations about stacks, architectures, and modern engineering practices.",
    "On the technical side, I work with **JavaScript and Frontend development**, building interfaces and internal tools that support recruiting operations. I enjoy designing practical solutions such as Chrome extensions, small apps, and internal dashboards that automate repetitive tasks for recruiters and hiring teams.",
    "I'm particularly interested in **recruitment automation, developer experience, and how AI can improve both candidate and recruiter workflows**. I like collaborating with multidisciplinary teams, sharing knowledge, and building long-term professional relationships based on transparency and trust.",
  ],

  focusAreas: [
    { label: "International tech recruitment", icon: "people" },
    { label: "Frontend JavaScript development", icon: "code" },
    { label: "Recruitment automation", icon: "gear" },
    { label: "Digital marketing & personal branding", icon: "chart" },
  ] as { label: string; icon: string }[],

  skills: {
    recruitment: [
      "IT Recruitment",
      "Headhunting",
      "Talent Acquisition",
      "Full-cycle Recruitment",
      "Recruitment Automation",
      "Candidate Experience",
    ],
    technical: [
      "JavaScript",
      "React",
      "TypeScript",
      "Next.js",
      "Frontend Development",
      "Chrome Extensions",
      "Git",
      "HTML & CSS",
    ],
    other: [
      "Psychology",
      "Behavioral Analysis",
      "Digital Marketing",
      "Personal Branding",
      "Content Strategy",
    ],
  },

  education: [
    {
      institution: "Alura (Oracle Next Education)",
      program: "Web Applications Development",
      dates: "Dec 2022 – Jun 2023",
      description:
        "Oracle Next Education program. Built web experiences with HTML, CSS, JavaScript, and React. Learned Git, Scrum, and modern frontend development practices.",
      badge: "Oracle ONE Scholar",
    },
    {
      institution: "Universidad de San Buenaventura",
      program: "Professional in Psychology",
      dates: "2015 – 2020",
      description:
        "Psychology degree with recognition for best practitioner and best research project at the regional level by COLPSIC.",
      badge: "Best Practitioner · COLPSIC",
    },
    {
      institution: "Universidad Tecnológica de Pereira",
      program: "Web Application Developer",
      dates: "2021",
      description:
        "Web applications development and introduction to data science — UTP Misión TIC 2022.",
    },
    {
      institution: "Universidad del Tolima",
      program: "Systems Engineer",
      dates: "2012 – 2015",
      description: "Systems engineering studies.",
      incomplete: true,
    },
  ] as {
    institution: string;
    program: string;
    dates: string;
    description: string;
    badge?: string;
    incomplete?: boolean;
  }[],

  certifications: [
    {
      title: "Best Research Project — X Encuentro Bonaventuriano",
      issuer: "Universidad de San Buenaventura Medellín",
      isAward: true,
      description:
        "Recognition for the impact and relevance of a practice project in the research field, presented at the X Bonaventurian Meeting of Professionalizing Practices.",
    },
    {
      title: "Fundamentos del desarrollo web: Full Stack o Front-end",
      issuer: "LinkedIn Learning",
    },
    { title: "Introducción a la innovación pública", issuer: "ESAP" },
    { title: "Estrategias de Marketing en Redes Sociales", issuer: "Platzi" },
    { title: "Construcción de Marca", issuer: "Platzi" },
    { title: "Content Marketing", issuer: "Platzi" },
    { title: "Escritura Online", issuer: "Platzi" },
    { title: "Negocios Online", issuer: "Platzi" },
    { title: "Community Manager", issuer: "Platzi" },
    { title: "Introducción al Marketing", issuer: "Platzi" },
    { title: "Marca Personal", issuer: "Platzi" },
  ] as {
    title: string;
    issuer: string;
    isAward?: boolean;
    description?: string;
  }[],

  learningRoadmap: [
    "React and TypeScript — advanced patterns, hooks, and state management",
    "Chrome extensions for recruitment workflow automation",
    "Recruitment automation and AI-assisted workflows",
    "SOLID principles in React and functional programming",
  ],
};
