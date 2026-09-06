# Architecture

## Overview

Portfolio/recruitment platform for **Carlos Valderrama**, a bilingual IT Recruiter and Frontend JS Developer based in Bogotá, Colombia. The platform connects LATAM tech talent with global companies.

**Tech Stack:**
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4
- **CMS:** Strapi 5 (headless, SQLite)
- **i18n:** next-intl (en/es)
- **Email:** Resend
- **UI Library:** Radix UI primitives + embla-carousel
- **Content:** react-markdown + remark-gfm

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│                   Browser                         │
│  ┌────────────────────────────────────────────┐   │
│  │         Next.js 15 (App Router)            │   │
│  │  ┌─────────┐ ┌──────────┐ ┌────────────┐  │   │
│  │  │ Server  │ │  Client  │ │   Static   │  │   │
│  │  │Components│ │Components│ │   Data     │  │   │
│  │  └─────────┘ └──────────┘ └────────────┘  │   │
│  └────────────────────────────────────────────┘   │
└──────────────────────┬───────────────────────────┘
                       │ HTTP (REST)
                       ▼
┌──────────────────────────────────────────────────┐
│           Strapi 5 (Headless CMS)                 │
│  ┌────────┐ ┌─────────┐ ┌──────┐ ┌─────────┐   │
│  │ Jobs   │ │Articles │ │About │ │ Global  │   │
│  │ API    │ │  API    │ │ API  │ │  API    │   │
│  └────────┘ └─────────┘ └──────┘ └─────────┘   │
│  ┌────────────────────────────────────────────┐  │
│  │           SQLite Database                   │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘

Email ─── Resend API ───→ Contact/Apply notifications
```

The frontend uses a **hybrid data strategy**: static data (hardcoded in `src/Data/`) mixed with Strapi CMS data. If Strapi is available, its data takes precedence; static data serves as fallback and padding.

---

## Entity Model

### Job
| Field | Type | Source | Notes |
|---|---|---|---|
| id | `string` | Static / Strapi `documentId` | |
| title | `string` | Both | Required in Strapi |
| description | `string` | Both | Markdown content |
| location | `string` | Both | |
| type | `enum` | Both | Full-time, Part-time, Contract, Internship |
| status | `enum` | Static only | open, on-hold, final-steps, filled, cancelled, overstaffed |
| skills | `string[]` | Static only | |
| modality | `enum` | Static only | remote, hybrid, on-site |
| paymentType | `enum` | Static only | salary, hourly, equity, mixed |
| postedAt | `string` | Both | |
| image | `media` | Both | |

**⚠️ Gap:** Strapi schema lacks `status`, `skills`, `modality`, `paymentType` fields.

### Article
| Field | Type | Source | Notes |
|---|---|---|---|
| id | `number` | Strapi | |
| documentId | `string` | Strapi | URL parameter |
| title | `string` | Both | |
| description | `string` | Strapi / Static | |
| slug | `string` | Static only | Strapi uses `documentId` for routing |
| coverImage | `string` | Static only | |
| category | `string` | Static only | |
| createdAt | `string` | Both | |
| blocks | `dynamic zone` | Strapi | rich-text, quote, media, slider |

### Author
| Field | Type | Source |
|---|---|---|
| id | `string` | Static / Strapi |
| name | `string` | Both |
| avatar | `string` | Both |
| slug | `string` | Static only |

### About (Single Type)
- `title`, `blocks` (dynamic zone with same components as Article)

### Global (Single Type)
- `siteName`, `favicon`, `siteDescription`, `defaultSeo`

### Category
- `name`, `slug`, `description` — relates to Articles

### Strapi Shared Components
| Component | Fields |
|---|---|
| `shared.rich-text` | `body` (richtext) |
| `shared.quote` | `title`, `body` |
| `shared.media` | `file` (media) |
| `shared.slider` | `files` (multiple media) |
| `shared.seo` | `metaTitle`, `metaDescription`, `shareImage` |

---

## Component Tree

```
RootLayout (src/app/layout.tsx)
  └── [locale]/layout.tsx
       ├── SkipLink
       ├── ThemeProvider
       │   └── Navigation
       │       ├── ThemeToggle
       │       ├── LanguageSwitcher
       │       └── TooltipProvider
       ├── <Page Content />
       │
       ├── Homepage: Hero → Job(JobCarousel→JobCard) → Testimonials → FAQ → Articles
       ├── About: AboutToc → BioExpand → HeadlinePills → Stats → Skills → Education → Certs
       ├── Jobs: JobFilters → JobCard[]
       ├── Job Detail: Breadcrumb → Markdown → ApplyToggle → ApplyForm
       ├── Articles: Tabs → FeaturedArticleCard → ArticleCard[]
       ├── Article Detail: ReadingProgress → Breadcrumb → BlockRenderer → ShareButtons → Related
       └── Contact: ContactForm
       │
       ├── Footer
       └── BackToTop
```

---

## Data Flows

### 1. Job Application
```
User clicks "Apply" → /jobs/[id]
  → fetchStrapiJob(id) (server) OR static lookup
  → Render job detail + ApplyToggle (client)
    → Click "Apply for this Position"
      → ApplyForm renders
        → Submit → POST /api/apply (multipart/form-data)
          → Rate limit check
          → Validation
          → Resend email with CV attachment
          → Success/Error toast
```

### 2. Content Display (Articles)
```
Homepage → Articles component (static data)
  → Click "View All" → /articles
    → fetchStrapiArticles() (server)
    → ArticlesClient with category tabs
      → Click article → /articles/[documentId]
        → fetchStrapiArticleDetail(id) (server)
        → BlockRenderer per block type
        → Share buttons + Related articles
```

### 3. Job Filtering
```
/jobs page loads (server): merge Strapi + static jobs
  → JobFilters (client) manages all filter state
    → useMemo filters by: query, status, skills, modality, payment
    → Renders JobCard grid reactively
```

---

## Service Layer

### `src/lib/strapi-jobs.ts`
| Function | Returns | Endpoint |
|---|---|---|
| `fetchStrapiJobs()` | `StrapiJob[]` | `GET /api/jobs?populate=image` |
| `fetchStrapiJob(id)` | `StrapiJob \| null` | `GET /api/jobs/:id` |
| `getStrapiImageSrc(url)` | `string` | Resolves relative URLs |

### `src/lib/strapi-articles.ts`
| Function | Returns | Endpoint |
|---|---|---|
| `fetchStrapiArticles()` | `StrapiArticle[]` | `GET /api/articles` |
| `fetchStrapiArticleDetail(id)` | `StrapiArticleDetail \| null` | `GET /api/articles/:id?populate[blocks][populate]=*` |

### `src/lib/rate-limit.ts`
| Function | Returns | Notes |
|---|---|---|
| `rateLimit(ip, max, window)` | `{allowed, retryAfter}` | In-memory Map |
| `getIp(req)` | `string` | Reads x-forwarded-for |

### `src/lib/validation.ts`
| Function | Returns | Notes |
|---|---|---|
| `escapeHtml(str)` | `string` | Prevents XSS |
| `isValidEmail(email)` | `boolean` | Regex check |

### API Routes
| Route | Method | Purpose | Rate Limited |
|---|---|---|---|
| `/api/contact` | POST | Contact form → email | Yes (5/min) |
| `/api/apply` | POST | Job application + CV → email | Yes (5/min) |

---

## Component Details

See [PROMPTS.md](./PROMPTS.md) Section 1.2 for exhaustive component analysis (props, state, effects, relationships).

---

## What's Missing

### Critical
- Strapi Job schema lacks 5 fields (`status`, `skills`, `modality`, `paymentType`) that the frontend expects
- Static articles link to `/articles/[slug]` but the route expects `[documentId]` → 404
- Duplicate article entries in static data

### Feature Gaps
- No Strapi collection type for Testimonials (hardcoded in static data)
- No admin interface for FAQs (loaded from JSON translations)
- No contact/apply data persistence (email-only; no database storage)
- No dedicated blog editor experience (uses Strapi dynamic zones)
- No search functionality for articles
- No pagination for jobs or articles
- No caching layer (revalidate: 60 on fetch calls)
- No error tracking/monitoring
- No analytics integration

### Infrastructure
- Rate limiter is in-memory (ineffective on serverless)
- No CI/CD pipeline configured
- No tests (unit, integration, e2e)
- SQLite in Strapi limits production scalability
