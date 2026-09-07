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
| **Testing** | Automated unit test suite (`npm test`, 150 tests) | ✅ | — | — |
| **Testing** | Native E2E verification suite (`npm run test:e2e`, 18 checks) | ✅ | — | — |
| **Quality** | Full form a11y (focus management, ARIA) & i18n | ✅ | — | — |
| | | | | |
| **Resolved Bugs** | Strapi job schema normalized behind seam | ✅ | — | — |
| **Resolved Bugs** | Static article links 404 resolved by slug/id resolver | ✅ | — | — |
| **Resolved Bugs** | Duplicate articles deduplicated in adapter | ✅ | — | — |
| **Resolved Bugs** | Job carousel status inferred for static jobs | ✅ | — | — |
| **Resolved Bugs** | ContactForm hardcoded English → full next-intl i18n | ✅ | — | — |
| **Resolved Bugs** | Redirect pattern shadowing `/api/apply` → constrained `(en|es)` | ✅ | — | — |
| **Resolved Bugs** | Rate limiter in-memory → Upstash/Vercel KV serverless with fallback | ✅ | — | — |
| | | | | |
| **Core & CI/CD** | CI/CD pipeline automated via GitHub Actions (`.github/workflows/ci.yml`) | ✅ | — | — |
| **Articles** | Live article keyword search with accent normalization & URL sync | ✅ | — | — |
| **UI/Design** | Rediseño de Hero interactivo (eliminar orbes por grid arquitectónico) (HU-100) | ✅ | — | — |
| **UI/Design** | Stepper de 3 pasos y preview de CV en postulación (HU-008) | ✅ | — | — |
| **UI/Design** | Timeline visual de estado de postulaciones post-envío (HU-009) | ✅ | — | — |
| **UI/Design** | Card de candidato de alta densidad para USA (HU-016) | ⏳ | High | Backlog |
| **UI/Design** | Patrón visual de paywall y desbloqueo (HU-017) | ⏳ | High | Backlog |
| **UI/Design** | Drawer de previsualización rápida de perfil (HU-018) | ⏳ | Medium | Backlog |
| **UI/Design** | Tablero Kanban para reclutadores (HU-036) | ⏳ | Medium | Backlog |
| | | | | |
| **Missing** | Strapi collection for Testimonials | ❌ | Low | 3h |
| **Missing** | Admin FAQ management | ❌ | Low | 4h |
| **Missing** | Contact/apply data persistence (database) | ❌ | Medium | 4h |
| **Missing** | Pagination (jobs, articles) | ❌ | Low | 2h |
| **Missing** | Analytics integration | ❌ | Low | 2h |
| **Missing** | Error tracking (Sentry) | ❌ | Low | 2h |
| **Missing** | E2E browser automation (Playwright) | ❌ | Low | 8h |

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

**Frontend Next.js (`next_folder/`): 100% completado** (UI limpia, arquitectura de costuras profunda, 155 unit tests pasando, 18/18 páginas estáticas en build frío, 18/18 verificaciones E2E, CI/CD automatizado, Rate Limiter serverless, Stepper y Timeline).
**Backend Strapi CMS (`strapi_folder/`): ~65% implementado** (modelos parciales existentes; pendiente enriquecimiento de esquemas y persistencia en DB).

### Architecture Milestones Delivered:
1. ✅ **Job Repository**: Costura única Strapi + static deduplication, status inference, canónica `/jobs/:id`.
2. ✅ **Intake Module**: Adaptadores HTTP delgados, validación compartida, plantillas HTML, Resend y Rate Limiter serverless Upstash/KV con fallback in-memory.
3. ✅ **Article Module**: Búsqueda interactiva con normalización de tildes, sincronización bidireccional URL y 0 errores 404.
4. ✅ **Testimonials & Contact Modules**: Módulos canónicos dedicados y de alta cohesión.
5. ✅ **a11y & Web Interface Guidelines**: 0 `transition-all`, respeto estricto a `prefers-reduced-motion`, `scroll-mt-24`, `aria-live`, resiliencia de formularios `beforeunload`, `text-balance` y `tabular-nums`.
6. ✅ **UX Avanzada de Reclutamiento**: Stepper interactivo de 3 pasos (HU-008), preview card de CV con tamaño formateado, y Timeline visual de estados de postulación (HU-009).
7. ✅ **Hero Rediseñado (HU-100)**: Fondo arquitectónico con dot-grid sutil y badges de confianza, eliminando orbes difusos.
8. ✅ **Automated CI/CD**: Pipeline GitHub Actions validando typecheck, lint, 155 unit tests, build frío y 18 E2E checks.

### Next Priorities (Strapi Backend Focus):
1. 🟡 Enriquecer esquema de `Job` en Strapi con `status`, `skills`, `modality` y `paymentType` — 2h
2. 🟡 Crear Content-Type `Testimonials` en Strapi — 2h
3. 🟡 Crear Content-Type `FAQ` en Strapi — 2h
4. 🟡 Implementar persistencia de postulaciones (`applications`) y contactos (`inquiries`) en Strapi — 4h
5. 🟡 Migración de SQLite a PostgreSQL y configuración de producción para Strapi — 4h
