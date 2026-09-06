import { homePageData } from "@/Data/homepage";
import type { Article, ArticleDetail, ArticleBlock } from "./types";
import { normalizeStaticArticle } from "./normalizer";

const defaultAuthor = homePageData.authors?.[0]
  ? {
      name: homePageData.authors[0].name,
      avatar: homePageData.authors[0].avatar,
      role: "Lead Tech Recruiter",
    }
  : undefined;

// ── Curated Editorial Blocks for Static Articles ─────────────────────────────

const STATIC_ARTICLE_CONTENT: Record<string, ArticleBlock[]> = {
  "remote-interview-tips": [
    {
      type: "rich-text",
      body: `
Remote technical interviews are now the global standard for high-growth tech companies. Whether you are interviewing with US startups, European enterprises, or top LATAM teams, the bar has shifted from purely testing syntax to evaluating communication, autonomy, and problem-solving in distributed environments.

Here are 5 core strategies to stand out in your next remote interview:

### 1. Optimize Your Environment and Tech Setup
Your audio, lighting, and connection speed represent your daily workstation. Test your microphone and screen-sharing setup ahead of time. Ensure you have your IDE or whiteboarding tool open with font sizes increased for readability.

### 2. Communicate Your Thought Process Asynchronously and In Real-Time
In a remote team, writing and verbal clarity are paramount. When working through a technical prompt or live coding challenge, explain your thought process:
* Clarify requirements and constraints before writing a single line of code.
* Mention trade-offs explicitly (e.g., time complexity vs. memory vs. implementation speed).
* State your assumptions out loud.
      `.trim(),
    },
    {
      type: "quote",
      title: "Carlos Valderrama — Tech Recruiter",
      body: "The strongest remote candidates don't just answer questions well; they demonstrate how they collaborate, communicate asynchronously, and manage their autonomy under real-world constraints.",
    },
    {
      type: "rich-text",
      body: `
### 3. Emphasize Asynchronous Discipline and Documentation
Remote hiring managers want to know if you can operate without micromanagement. Provide concrete examples from past projects where you:
* Authored architectural RFCs or design documents.
* Set up automated CI/CD pipelines or automated testing to reduce friction.
* Unblocked teammates across different time zones.

### 4. Ask High-Signal Reverse-Interview Questions
At the end of the interview, ask questions that reveal team health:
* How does the team handle sprint planning across time zones?
* What is the ratio between synchronous meetings and deep async work?
* How are architectural decisions debated and resolved?

Preparing these points demonstrates senior engineering maturity and immediately sets you apart from passive candidates.
      `.trim(),
    },
  ],

  "top-skills-it-2025": [
    {
      type: "rich-text",
      body: `
The technology landscape in 2025 is defined by efficiency, cloud-native scalability, and rapid AI integration. Companies hiring global remote talent are prioritizing engineers who combine deep foundational knowledge with modern delivery speed.

Here are the top technical competencies recruiters and engineering leaders are actively seeking:

### 1. Cloud-Native Distributed Architecture
Understanding microservices, event-driven architectures (Kafka, RabbitMQ), serverless execution models, and edge compute. Candidates who understand data consistency, caching strategies, and resilience patterns stand out immediately.

### 2. Modern TypeScript & Fullstack Frameworks
TypeScript has become the default across the industry. Deep experience with modern React 19, Next.js App Router, server actions, and end-to-end type safety remains in peak demand for product-focused teams.
      `.trim(),
    },
    {
      type: "quote",
      title: "Carlos Valderrama — Tech Recruiter",
      body: "Technical depth gets you through the initial filter; your ability to drive business impact across time zones with clean architecture is what gets you the offer.",
    },
    {
      type: "rich-text",
      body: `
### 3. AI Tooling Integration and LLM Orchestration
Companies are embedding LLMs into production workflows. Experience with retrieval-augmented generation (RAG), vector databases (pgvector, Pinecone), and structured model outputs gives engineers a competitive edge.

### 4. Observability and DevOps Empathy
Senior engineers are expected to own their code in production. Familiarity with OpenTelemetry, Prometheus, structured logging, and automated deployment pipelines is highly valued.
      `.trim(),
    },
  ],
};

/**
 * Fetch all static articles from homePageData.blogPreview.
 * Deduplicates entries by slug and ID.
 */
export function fetchArticlesFromStatic(): Article[] {
  const rawList = homePageData.blogPreview || [];
  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();
  const results: Article[] = [];

  for (const raw of rawList) {
    if (seenIds.has(raw.id)) continue;
    if (raw.slug && seenSlugs.has(raw.slug)) continue;

    seenIds.add(raw.id);
    if (raw.slug) seenSlugs.add(raw.slug);

    const blocks = raw.slug ? STATIC_ARTICLE_CONTENT[raw.slug] : undefined;
    results.push(normalizeStaticArticle(raw, defaultAuthor, blocks));
  }

  return results;
}

/**
 * Fetch a single static article by identifier (matches slug, id, or documentId).
 */
export function fetchArticleFromStatic(identifier: string): ArticleDetail | null {
  if (!identifier) return null;

  const rawList = homePageData.blogPreview || [];
  const match = rawList.find(
    (item) =>
      item.slug === identifier ||
      item.id === identifier ||
      item.slug?.toLowerCase() === identifier.toLowerCase()
  );

  if (!match) return null;

  const blocks = match.slug ? STATIC_ARTICLE_CONTENT[match.slug] : undefined;
  return normalizeStaticArticle(match, defaultAuthor, blocks);
}
