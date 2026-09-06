# Project Status

## Next.js Frontend (`next_folder/`)

| Área | Feature | Estado | Prioridad | Esfuerzo |
|---|---|---|---|---|
| **Core** | Next.js 15 App Router setup | ✅ | — | — |
| **Core** | TypeScript strict mode | ✅ | — | — |
| **Core** | Tailwind v4 with dark mode | ✅ | — | — |
| **Core** | i18n (en/es) with next-intl | ✅ | — | — |
| **Core** | Responsive layout | ✅ | — | — |
| **Core** | SEO metadata + sitemap + robots | ✅ | — | — |
| **Core** | JSON-LD structured data | ✅ | — | — |
| | | | | |
| **Navigation** | Desktop nav with active state | ✅ | — | — |
| **Navigation** | Mobile hamburger menu | ✅ | — | — |
| **Navigation** | Skip to content link | ✅ | — | — |
| **Navigation** | Language switcher | ✅ | — | — |
| **Navigation** | Theme toggle (dark/light) | ✅ | — | — |
| | | | | |
| **Homepage** | Hero with avatar + cycling CTA | ✅ | — | — |
| **Homepage** | Job carousel (embla) | ✅ | — | — |
| **Homepage** | Testimonials section | ✅ | — | — |
| **Homepage** | FAQ accordion | ✅ | — | — |
| **Homepage** | Article preview cards | ✅ | — | — |
| **Homepage** | Footer with CTA strip | ✅ | — | — |
| | | | | |
| **Jobs** | Job listing with filters | ✅ | — | — |
| **Jobs** | Status badges (6 states) | ✅ | — | — |
| **Jobs** | Search bar | ✅ | — | — |
| **Jobs** | Advanced filters (skills, modality, payment) | ✅ | — | — |
| **Jobs** | Empty states (no results, no roles) | ✅ | — | — |
| **Jobs** | Loading skeleton | ✅ | — | — |
| **Jobs** | Error boundary | ✅ | — | — |
| **Jobs** | Job detail page with Markdown | ✅ | — | — |
| **Jobs** | Job status badges on detail | ✅ | — | — |
| **Jobs** | Closed job state with CTA | ✅ | — | — |
| **Jobs** | Breadcrumb navigation | ✅ | — | — |
| | | | | |
| **Apply** | Apply toggle (show/hide form) | ✅ | — | — |
| **Apply** | Application form (name, email, phone, LinkedIn, CV, cover letter) | ✅ | — | — |
| **Apply** | Client-side validation | ✅ | — | — |
| **Apply** | CV upload (PDF/DOC, max 5MB) | ✅ | — | — |
| **Apply** | Drag & drop CV area | ✅ | — | — |
| **Apply** | Character counter for cover letter | ✅ | — | — |
| **Apply** | Success state | ✅ | — | — |
| **Apply** | Server-side validation + rate limit | ✅ | — | — |
| **Apply** | Email notification via Resend | ✅ | — | — |
| | | | | |
| **Contact** | Contact form | ✅ | — | — |
| **Contact** | Server-side validation + rate limit | ✅ | — | — |
| **Contact** | Email notification via Resend | ✅ | — | — |
| | | | | |
| **About** | Bio with expand/collapse | ✅ | — | — |
| **About** | Headline pills (mobile expand) | ✅ | — | — |
| **About** | Desktop Table of Contents | ✅ | — | — |
| **About** | Mobile bottom navigator | ✅ | — | — |
| **About** | Experience timeline | ✅ | — | — |
| **About** | Skill groups with pills | ✅ | — | — |
| **About** | Education timeline | ✅ | — | — |
| **About** | Certifications + awards | ✅ | — | — |
| **About** | Learning roadmap | ✅ | — | — |
| **About** | ScrollReveal animations | ✅ | — | — |
| **About** | Stats band | ✅ | — | — |
| **About** | Download CV button | ✅ | — | — |
| | | | | |
| **Articles** | Article list page with category tabs | ✅ | — | — |
| **Articles** | Featured article + grid | ✅ | — | — |
| **Articles** | Article detail with Strapi blocks | ✅ | — | — |
| **Articles** | Reading progress bar | ✅ | — | — |
| **Articles** | Share buttons (copy, LinkedIn, Twitter) | ✅ | — | — |
| **Articles** | Related articles | ✅ | — | — |
| **Articles** | Loading skeleton | ✅ | — | — |
| **Articles** | Error boundary | ✅ | — | — |
| | | | | |
| **UI** | Toast notifications | ✅ | — | — |
| **UI** | Tooltips | ✅ | — | — |
| **UI** | Breadcrumbs | ✅ | — | — |
| **UI** | Back to top button | ✅ | — | — |
| **UI** | Accordion | ✅ | — | — |
| **UI** | Avatar with fallback initials | ✅ | — | — |
| **UI** | Dialog (modal) | ✅ | — | — |
| **UI** | Tabs | ✅ | — | — |
| **UI** | Form field with error state | ✅ | — | — |
| **UI** | Article cards with image, reading time | ✅ | — | — |
| | | | | |
| **Bugs** | Strapi job schema missing fields | ❌ | **High** | 2h |
| **Bugs** | Static article links → 404 (slug vs documentId) | ❌ | **High** | 1h |
| **Bugs** | Duplicate articles in static data | ❌ | **Medium** | 15min |
| **Bugs** | Rate limiter in-memory (serverless) | ❌ | **Medium** | 2h |
| **Bugs** | Job carousel omits status for static jobs | ❌ | **Low** | 15min |
| **Bugs** | `encodeURI` usage | ✅ (no bug) | — | — |
| | | | | |
| **Missing** | Strapi collection for Testimonials | ❌ | Low | 3h |
| **Missing** | Admin FAQ management | ❌ | Low | 4h |
| **Missing** | Contact/apply data persistence | ❌ | Medium | 4h |
| **Missing** | Article search | ❌ | Low | 3h |
| **Missing** | Pagination (jobs, articles) | ❌ | Low | 2h |
| **Missing** | Caching layer (Redis) | ❌ | Low | 4h |
| **Missing** | Analytics integration | ❌ | Low | 2h |
| **Missing** | Error tracking (Sentry) | ❌ | Low | 2h |
| **Missing** | Unit/integration tests | ❌ | Medium | 16h |
| **Missing** | E2E tests | ❌ | Low | 16h |
| **Missing** | CI/CD pipeline | ❌ | Low | 4h |

## Strapi CMS (`strapi_folder/`)

| Área | Feature | Estado | Prioridad | Esfuerzo |
|---|---|---|---|---|
| **Content** | Job collection type | ✅ | — | — |
| **Content** | Article collection type | ✅ | — | — |
| **Content** | Author collection type | ✅ | — | — |
| **Content** | Category collection type | ✅ | — | — |
| **Content** | Global single type | ✅ | — | — |
| **Content** | About single type | ✅ | — | — |
| **Content** | Shared components (rich-text, quote, media, slider, seo) | ✅ | — | — |
| **Content** | "Name" collection type (unused, legacy) | ✅ | — | — |
| | | | | |
| **Missing** | Job fields: status, skills, modality, paymentType | ❌ | **High** | 2h |
| **Missing** | Testimonial collection type | ❌ | Low | 2h |
| **Missing** | FAQ collection type | ❌ | Low | 2h |
| **Missing** | Contact/application storage | ❌ | Medium | 3h |
| **Missing** | API token scoping | ❌ | Medium | 1h |
| **Missing** | Rate limiting middleware | ❌ | Low | 1h |
| **Missing** | Database migration to PostgreSQL | ❌ | Medium | 4h |
| **Missing** | Seed scripts for all content types | 🟡 | Low | 3h |
| **Missing** | Tests | ❌ | Low | 8h |

## Summary

**Overall: ~90% implemented** (frontend UI), **~60% of backend integration** features complete.

### Next priorities:
1. 🔴 Fix Strapi job schema (add missing fields) — 2h
2. 🔴 Fix static article routing (documentId vs slug) — 1h
3. 🟡 Remove duplicate static articles — 15min
4. 🟡 Replace in-memory rate limiter with Vercel KV or similar — 2h
5. 🟡 Implement data persistence for applications/contacts — 4h
6. 🟡 Add tests — 16h
7. 🟡 Migrate Strapi to PostgreSQL for production — 4h
