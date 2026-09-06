# Domain Glossary (CONTEXT.md)

## Core Entities

### Job
An open or archived employment position managed by the recruiter.
- **Attributes:** identifier, title, description (Markdown), location, employment type (Full-time, Part-time, Contract, Internship), status (`open`, `on-hold`, `final-steps`, `filled`, `cancelled`, `overstaffed`), modality (`remote`, `hybrid`, `on-site`), payment type (`salary`, `hourly`, `equity`, `mixed`), skills list, publication date, optional banner/company image.
- **Rules:** If a job has no explicit status, `isOpen = true` maps to `open`, and `isOpen = false` maps to `filled`. Every `Job` carries a canonical `applyHref` of `/jobs/:id` — never `/apply/:id`.

### Job Repository (deep module)
`src/lib/jobs/` — the single interface through which all callers obtain and filter Job data.
- **Interface:** `listJobs(options?)` · `getJob(id)` · `filterJobs(jobs, criteria)` — the symbols callers import.
- **Seam:** Backed by two real adapters (`strapi-adapter.ts`, `static-adapter.ts`), which justifies the seam. All schema normalization, URL resolution, status inference, deduplication, multi-token search, multi-criteria filtering, and fallback logic lives inside the module — invisible to callers.
- **Test surface:** `normalizeStaticJob`, `normalizeStrapiJob` in `normalizer.ts`, and token search/dimension matchers in `query.ts` are tested directly via `npm test`.

### Intake module (deep module)
`src/lib/intake/` — the single interface through which all inbound submissions flow.
- **Interface:** `submitApplication(req, input)` · `submitInquiry(req, input)` — the only symbols route handlers import.
- **Seam:** Backed by two real adapters: Resend (production) and console fallback (dev). Rate limiting, field validation, HTML email templating, and dispatch are hidden behind the seam.
- **Test surface:** `validateApplication`, `validateInquiry`, template subjects, and `escape` tested directly via `npm test`.

### Application
A candidate submission targeting an active `Job`. Includes personal contact details, LinkedIn URL, uploaded CV document, and cover note.

### Inquiry
A general inbound communication from prospective clients or candidates through the contact portal.

### Article
An editorial piece or guide published by the recruiter, consisting of metadata and dynamic content blocks.
- **Attributes:** identifier, documentId, title, slug, excerpt/description, coverImage, category, publication date, author, canonical `href` (`/articles/:slug`), and content blocks (`rich-text`, `quote`, `media`, `slider`).

### Article Repository (deep module)
`src/lib/articles/` — the single interface through which all callers query and read articles.
- **Interface:** `listArticles(options?)` · `getArticle(identifier)` — the only symbols callers import.
- **Seam:** Backed by Strapi CMS adapter (`strapi-adapter.ts`) and static fixture adapter (`static-adapter.ts`). Transparently resolves identifiers across documentIds, slugs, and static IDs. Falls back to static fixtures with rich editorial blocks when Strapi is offline, eliminating 404 routing leaks.
- **Test surface:** `normalizeStrapiArticle`, `normalizeStrapiBlocks`, `normalizeStaticArticle`, identifier resolution, and deduplication tested directly via `npm test`.

