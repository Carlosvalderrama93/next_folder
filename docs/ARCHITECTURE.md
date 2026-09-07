# 🏛️ Technical Architecture Reference

This document provides a comprehensive technical reference for the **Recruiter & Talent Portal** platform built with **Next.js 15.5 (App Router)** and **Strapi 5 (Headless CMS)**.

---

## 1. System Overview

The platform connects bilingual LATAM tech talent with global tech employers. It is designed as a decoupled, modern web system with zero-cost static resilience: if the headless CMS goes down or undergoes maintenance, the frontend automatically falls back to local static domain fixtures without interrupting candidate experience.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USER / CANDIDATE BROWSER                         │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ HTTPS
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│               VERCEL EDGE NETWORK (Next.js 15.5.25 App Router)          │
│                                                                         │
│   ┌──────────────────────────┐          ┌───────────────────────────┐   │
│   │ React Server Components  │          │ Client Components ("use   │   │
│   │ (RSC) & Prerender 18/18  │          │ client")                  │   │
│   │ - Page Layouts & Headers │          │ - ApplyForm Stepper       │   │
│   │ - RichText Adapters      │          │ - JobFilters (query codec)│   │
│   │ - StructuredData JSON-LD │          │ - Carousels & Accordions  │   │
│   └────────────┬─────────────┘          └─────────────┬─────────────┘   │
│                │                                      │                 │
│                ▼                                      ▼                 │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ Domain Seams (src/lib/):                                        │   │
│   │ • jobs: Query engine, dimension filters, Strapi/static adapters │   │
│   │ • intake: Validation, multi-step lifecycle, rate-limit, dispatch│   │
│   │ • articles: Structured block mapper, reading time calculator    │   │
│   │ • testimonials: Client reviews, dynamic carousel presentation   │   │
│   │ • about: Career timeline, skills, interactive table of contents │   │
│   │ • site-config: Canonical nav contracts, social links, SEO       │   │
│   └────────────┬──────────────────────────────────────┬─────────────┘   │
│                │                                      │                 │
│                │ GET (ISR/SSR)                        │ POST /api/apply │
│                │                                      │ (FormData)      │
└────────────────┼──────────────────────────────────────┼─────────────────┘
                 │                                      │
                 │ Server-to-Server REST                │ Multi-dispatch
                 ▼                                      ▼
┌──────────────────────────────────────┐     ┌────────────────────────────┐
│      RENDER WEB SERVICE (Node 20)    │     │      RESEND EMAIL API      │
│   Strapi 5 Headless CMS (TypeScript) │     │ - Instant email to carlos  │
│   - Content Management API           │     │ - CV attached from buffer  │
│   - Document Service Engine          │     │ - Zero disk storage        │
│   - Public & Authenticated Roles     │     └────────────────────────────┘
└──────────────────┬───────────────────┘
                   │
                   │ IPv4 Session Pooler (Port 5432)
                   ▼
┌──────────────────────────────────────┐
│        SUPABASE POSTGRESQL           │
│   - Tables: jobs, articles, faqs,    │
│     testimonials, applications,      │
│     inquiries                        │
│   - Auto-seeded via bootstrap()      │
└──────────────────────────────────────┘
```

---

## 2. Frontend Architecture (Next.js 15.5)

### 2.1 Domain Seams Pattern (`src/lib/*`)
The project avoids monolithic utility files. Every major feature area is encapsulated into a strict **domain seam**:

| Seam Directory | Primary Responsibility | Key Files |
|---|---|---|
| [`src/lib/jobs/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/) | Job search, multi-attribute filtering, normalizers, status badges | `query.ts`, `normalizer.ts`, `presentation.ts`, `strapi-adapter.ts`, `static-adapter.ts` |
| [`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/) | Application & contact form validation, rate-limiting, persistence, email templates | `validation.ts`, `use-intake-form.ts`, `submission.ts`, `templates.ts`, `persistence-adapter.ts` |
| [`src/lib/articles/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/) | Blog post parsing, dynamic zones (rich-text, quotes, media, sliders) | `normalizer.ts`, `query.ts`, `strapi-adapter.ts`, `static-adapter.ts` |
| [`src/lib/testimonials/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/testimonials/) | Candidate & client testimonials, carousel adapters | `normalizer.ts`, `strapi-adapter.ts`, `static-adapter.ts` |
| [`src/lib/about/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/) | Recruiter biography, skills matrix, experience timeline, education | `normalizer.ts`, `strapi-adapter.ts`, `static-adapter.ts` |
| [`src/lib/site-config/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/) | Canonical navigation contracts, social media URLs, JSON-LD Schema.org generation | `config.ts`, `structured-data.ts`, `utils.ts` |

### 2.2 Server Components (RSC) vs Client Components
- **Server Components by Default**: All page routes (`page.tsx`), layout chrome (`layout.tsx`), headers, footers, article prose readers, and job details run as async React Server Components.
- **Client Components (`"use client"`)**: Restricted to interactive boundary elements:
  - `ApplyForm`: Multi-step intake form with drag-and-drop file upload and client validation.
  - `JobFilters`: Search input, debounce, modality and status chips synced with URL query params.
  - `ThemeToggle` & `ThemeScript`: Theme hydration with FOUC prevention.
  - `Carousel`: Embla-based smooth swiping widgets.

### 2.3 Internationalization (next-intl)
- Locale-prefixed routing: `/[locale]/jobs`, `/[locale]/about`, `/[locale]/contact`.
- Supported locales: English (`en`) and Spanish (`es`).
- Server components consume `await getTranslations({ locale, namespace })`.
- Client components consume `const t = useTranslations(namespace)`.

---

## 3. Headless CMS & Database Architecture (Strapi 5 + Supabase)

### 3.1 Content Types & API Endpoints

| Content-Type | API Endpoint | Methods | Access | Primary Attributes |
|---|---|---|---|---|
| **Job** | `/api/jobs`<br>`/api/jobs/:id` | `GET` | Public | `title`, `description`, `location`, `jobType`, `status`, `skills`, `modality`, `paymentType`, `postedAt`, `image` |
| **Article** | `/api/articles`<br>`/api/articles/:id` | `GET` | Public | `title`, `description`, `slug`, `blocks` (Dynamic Zone: rich-text, media, quote, slider) |
| **Testimonial** | `/api/testimonials` | `GET` | Public | `name`, `role`, `company`, `message`, `avatar`, `rating` |
| **FAQ** | `/api/faqs` | `GET` | Public | `question`, `answer`, `category`, `order` |
| **Application** | `/api/applications` | `POST`<br>`GET` | `POST`: Public<br>`GET`: Auth | `name`, `email`, `phone`, `linkedin`, `jobId`, `coverLetter`, `cvFilename`, `status` |
| **Inquiry** | `/api/inquiries` | `POST`<br>`GET` | `POST`: Public<br>`GET`: Auth | `name`, `email`, `subject`, `message`, `status` |

### 3.2 Database Connection & IPv4 Resolution
- Strapi runs on **Render Web Service** (which operates in an IPv4-only outbound network).
- Direct Supabase hostnames (`db.<project>.supabase.co`) resolve to IPv6 addresses, which fail on Render (`ENETUNREACH`).
- Strapi is configured to use the **Supabase Session Pooler** (`aws-0-sa-east-1.pooler.supabase.com:5432`) combined with `NODE_OPTIONS="--dns-result-order=ipv4first"` and `dns.setDefaultResultOrder('ipv4first')` in `src/index.ts`.

---

## 4. Candidate Intake & Application Pipeline

1. **Candidate Action**: Applicant fills personal info, LinkedIn, cover letter, and selects CV (PDF/DOCX max 5MB).
2. **Client-Side Validation (`src/lib/intake/validation.ts`)**: Instant check on email regex, LinkedIn URL structure, CV mime type, and file size.
3. **Transmission**: Sent as `multipart/form-data` to Next.js route handler `POST /api/apply`.
4. **Serverless Intake Handler (`src/lib/intake/http-adapter.ts`)**:
   - Parses `FormData` and extracts CV file buffer.
   - Applies sliding window rate limiting (5 submissions / minute per IP).
   - Validates data integrity server-side.
5. **Parallel Multi-Dispatch (`src/lib/intake/submission.ts`)**:
   - **Resend Notification**: Sends transactional HTML email to recruiter (`CONTACT_EMAIL`) with candidate data and CV buffer attached.
   - **Strapi ATS Record**: Persists application metadata in Strapi `/api/applications` with status `"received"`.
6. **Graceful User Feedback**: Candidate receives immediate modal confirmation with application reference, while errors gracefully highlight problematic fields.

---

## 5. Security & Quality Standards

- **Zero-CVE Policy**: Next.js maintained at `>=15.5.25` to prevent Server Actions CVE vulnerabilities.
- **Strict Accessibility (WCAG 2.1 AA)**:
  - Zero `transition-all` declarations (only targeted CSS properties like `transform`, `opacity`, `background-color`).
  - Strict `@media (prefers-reduced-motion: reduce)` overrides for all animated elements.
  - Form fields use `aria-describedby` and `aria-invalid` bindings for screen reader error announcements.
  - Visible `:focus-visible` rings on all interactive components.
- **Test Suite**: 162 automated unit and contract tests running under Node.js native test runner (`npm test`), verifying normalizers, filter algorithms, presentation tokens, and UI hygiene.
