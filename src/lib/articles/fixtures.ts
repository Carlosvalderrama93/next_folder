import type { ArticleAuthor, RawStaticArticle } from "./types";

export const defaultAuthor: ArticleAuthor = {
  name: "Carlos Valderrama",
  avatar:
    "https://split.trexthemes.dev/content/images/2025/06/ChatGPT-Image-Jun-11--2025--06_38_14-PM.png",
  role: "Lead Tech Recruiter",
};

export const staticArticles: RawStaticArticle[] = [
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
];
