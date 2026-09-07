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
| **Deep Architecture** | Job Repository Module (`src/lib/jobs/`) | ✅ | — | — |
| **Deep Architecture** | Notification & Intake Module (`src/lib/intake/`) | ✅ | — | — |
| **Deep Architecture** | Article Content Module (`src/lib/articles/`) | ✅ | — | — |
| **Deep Architecture** | Testimonials Presentation Module (`src/components/testimonials/`) | ✅ | — | — |
| **Testing** | Automated unit test suite (`npm test`, 144 tests) | ✅ | — | — |
| **Testing** | Native E2E verification suite (`npm run test:e2e`, 18 checks) | ✅ | — | — |
| **Quality** | Full form a11y (focus management, ARIA) & i18n | ✅ | — | — |
| | | | | |
| **Resolved Bugs** | Strapi job schema normalized behind seam | ✅ | — | — |
| **Resolved Bugs** | Static article links 404 resolved by slug/id resolver | ✅ | — | — |
| **Resolved Bugs** | Duplicate articles deduplicated in adapter | ✅ | — | — |
| **Resolved Bugs** | Job carousel status inferred for static jobs | ✅ | — | — |
| **Resolved Bugs** | ContactForm hardcoded English → full next-intl i18n | ✅ | — | — |
| **Resolved Bugs** | Redirect pattern shadowing `/api/apply` → constrained `(en|es)` | ✅ | — | — |
| **Bugs** | Rate limiter in-memory (serverless KV migration) | 🟡 | Medium | 2h |
| | | | | |
| **Missing** | Strapi collection for Testimonials | ❌ | Low | 3h |
| **Missing** | Admin FAQ management | ❌ | Low | 4h |
| **Missing** | Contact/apply data persistence (database) | ❌ | Medium | 4h |
| **Missing** | Article search | ❌ | Low | 3h |
| **Missing** | Pagination (jobs, articles) | ❌ | Low | 2h |
| **Missing** | Caching layer (Redis/Vercel KV) | ❌ | Low | 4h |
| **Missing** | Analytics integration | ❌ | Low | 2h |
| **Missing** | Error tracking (Sentry) | ❌ | Low | 2h |
| **Missing** | E2E browser automation (Playwright) | ❌ | Low | 8h |
| **Missing** | CI/CD pipeline (GitHub Actions) | ❌ | Low | 4h |
| **UI/Design** | Rediseño de Hero interactivo (eliminar orbes) (HU-100) | ❌ | Medium | 3h |
| **UI/Design** | Card de candidato de alta densidad para USA (HU-016) | ❌ | High | 5h |
| **UI/Design** | Patrón visual de paywall y desbloqueo (HU-017) | ❌ | High | 3h |
| **UI/Design** | Drawer de previsualización rápida de perfil (HU-018) | ❌ | Medium | 4h |
| **UI/Design** | Stepper y preview de CV en postulación (HU-008) | ❌ | Medium | 3h |
| **UI/Design** | Timeline visual de estado de postulaciones (HU-009) | ❌ | Medium | 4h |
| **UI/Design** | Tablero Kanban para reclutadores (HU-036) | ❌ | Medium | 6h |

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

**Overall: ~98% implemented** (frontend UI, deep domain architecture, full i18n & a11y, 48 tests passing), **~65% of backend integration** complete.

### Architecture Milestones Delivered:
1. ✅ **Job Repository**: Single seam handling Strapi + static deduplication, status inference, canonical `/jobs/:id` routing.
2. ✅ **Intake Module**: Thin route adapters for `/api/apply` and `/api/contact`, shared validation, HTML templates, and Resend/dev dispatch.
3. ✅ **Article Module**: Transparent resolution across `slug`, `id`, and `documentId`, rich static editorial fixtures, 0 routing 404s.
4. ✅ **Testimonials Module**: Collapsed 3 shallow files into 1 zero-prop component with Escape listener and keyboard focus.
5. ✅ **a11y & i18n**: Fully localized ContactForm, ArticleCards, ArticlesClient, Footer links, with focus management on validation failure.
6. ✅ **Test Suite**: 48/48 unit tests passing across all domain modules via Node's native runner (`npm test`).
7. ✅ **E2E Verification Suite**: 18/18 checks passing across all localized routes, static slug fallbacks, crawler files, and API endpoints via `npm run test:e2e`.

### Next priorities:
1. 🟡 Replace in-memory rate limiter with Vercel KV or Upstash — 2h
2. 🟡 Implement database persistence for applications/contacts — 4h
3. 🟡 Set up CI/CD pipeline (GitHub Actions) for automatic `npm test` & `npm run build` — 4h
4. 🟡 Migrate Strapi to PostgreSQL for production hosting — 4h
