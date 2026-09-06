# Developer Guide

## First-time Setup

```bash
# Clone & install frontend
cd next_folder
cp .env.example .env.local
npm install

# Clone & install Strapi (separate repo or monorepo)
cd strapi_folder
cp .env.example .env
npm install

# Start Strapi (runs on :1337)
npm run develop

# Start Next.js dev server (runs on :3000)
npm run dev
```

**Required env vars in `.env.local`:**
- `STRAPI_URL=http://localhost:1337`
- `RESEND_API_KEY` (get at https://resend.com)
- `CONTACT_EMAIL=your@email.com`
- `RESEND_FROM=onboarding@resend.dev` (use sandbox while testing)

---

## Development Workflow

### Commands
| Command | Description |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run typecheck` | `tsc --noEmit` |

### Strapi commands
| Command | Description |
|---|---|
| `npm run develop` | Strapi dev server with auto-reload |
| `npm run build` | Build admin panel |
| `npm run seed:example` | Run seed script |

### How to load
1. Start Strapi: `cd strapi_folder && npm run develop`
2. Start Next.js: `cd next_folder && npm run dev`
3. Open http://localhost:3000
4. Strapi admin at http://localhost:1337/admin

---

## How to Add Features

### New Entity (e.g., Testimonials in Strapi)
1. Create collection type in Strapi admin or add schema:
   ```json
   // strapi_folder/src/api/testimonial/content-types/testimonial/schema.json
   {
     "kind": "collectionType",
     "info": { "singularName": "testimonial", "pluralName": "testimonials", "displayName": "Testimonial" },
     "options": { "draftAndPublish": true },
     "attributes": {
       "name": { "type": "string", "required": true },
       "role": { "type": "string" },
       "message": { "type": "text", "required": true },
       "avatar": { "type": "media", "multiple": false, "allowedTypes": ["images"] }
     }
   }
   ```
2. Create controller, route, service (use factories):
   ```typescript
   // routes/testimonial.ts — public read access
   export default {
     routes: [
       { method: "GET", path: "/testimonials", handler: "testimonial.find", config: { auth: false, policies: [] } },
       { method: "GET", path: "/testimonials/:id", handler: "testimonial.findOne", config: { auth: false, policies: [] } },
     ],
   };
   ```
3. Create lib function in Next.js:
   ```typescript
   // src/lib/strapi-testimonials.ts
   import { STRAPI_URL } from "./config";
   export async function fetchStrapiTestimonials() {
     try {
       const res = await fetch(`${STRAPI_URL}/api/testimonials`, { next: { revalidate: 60 } });
       if (!res.ok) return [];
       const json = await res.json();
       return json?.data ?? [];
     } catch { return []; }
   }
   ```
4. Update the component to use Strapi data with static fallback.

### New Component
1. Look at existing components for patterns (e.g., `components/hero.tsx` for server, `components/job-filters.tsx` for client)
2. Server component — async function, uses `getTranslations`:
   ```typescript
   import { getTranslations } from "next-intl/server";
   export default async function MySection() {
     const t = await getTranslations("mySection");
     return <section>{t("title")}</section>;
   }
   ```
3. Client component — `"use client"` directive, uses `useTranslations`:
   ```typescript
   "use client";
   import { useTranslations } from "next-intl";
   export default function MyWidget() {
     const t = useTranslations("myWidget");
     return <div>{t("label")}</div>;
   }
   ```

### New Message (i18n)
1. Add key to `messages/en.json` and `messages/es.json`
2. Access with `getTranslations("namespace")` / `useTranslations("namespace")`
3. For arrays/objects: `t.raw("items")`

### New Field (in existing entity)
1. Add to Strapi schema via admin UI or edit `schema.json`
2. Add to TypeScript interface in `src/types/homepage.ts` or `src/lib/strapi-jobs.ts`
3. Update component props and rendering
4. Add to static data in `src/Data/homepage.ts` or `src/Data/about.ts`

### New Route
1. Create file in `src/app/[locale]/` following Next.js App Router conventions
2. Add nav link in `Navigation.tsx` (`NAV_LINKS` constant)
3. Add footer link in `Footer.tsx`
4. Add translation keys for the nav label

### New Shortcut / API Endpoint
1. Create `src/app/api/[name]/route.ts`
2. Follow pattern from `api/contact/route.ts` (rate limit, validation, error handling)

---

## Debugging

### Inspect Next.js components
- Use React DevTools in browser
- Server Components can't be inspected directly — add `console.log` in server components (visible in terminal)

### Inspect Service Worker / Middleware
- Middleware runs on every request — add logs in `src/middleware.ts`
- Check terminal output for server-side logs

### Inspect Strapi
- Strapi admin at http://localhost:1337/admin
- API responses visible in browser Network tab or via `curl http://localhost:1337/api/jobs`
- Content manager for data, Content-Type Builder for schema

### Storage (localStorage)
- Theme: `localStorage.getItem("theme")` — `"light"` or `"dark"`
- No other client-side storage

### Messages / Data Flow
- All API calls go through `src/lib/strapi*.ts` — add logs there
- Form submissions go through `src/app/api/` — check terminal for `console.log` fallbacks when Resend is not configured
- Static data flows from `src/Data/` → components directly

---

## Common Patterns

### Service CRUD Pattern
```typescript
// lib/strapi-*.ts
export async function fetchAll(): Promise<Type[]> { ... }
export async function fetchOne(id: string): Promise<Type | null> { ... }
```

### Component Pattern (Server)
```typescript
import { getTranslations } from "next-intl/server";
export default async function Section() {
  const t = await getTranslations("namespace");
  return <section>{t("key")}</section>;
}
```

### Component Pattern (Client)
```typescript
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
export default function Widget() {
  const t = useTranslations("namespace");
  const [state, setState] = useState(false);
  return <button onClick={() => setState(!state)}>{t("label")}</button>;
}
```

### Message Types Reference
| Method | Where | Purpose |
|---|---|---|
| `getTranslations("ns")` | Server Components | Async, returns translations |
| `useTranslations("ns")` | Client Components | Hook, reactive |
| `t("key")` | Both | Single key |
| `t.raw("items")` | Both | Arrays/objects from JSON |
| `t("key", { count: n })` | Both | Pluralization |

### Storage Keys
| Key | Value | Used By |
|---|---|---|
| `theme` | `"light"` \| `"dark"` | ThemeProvider |

---

## Conventions

### Naming
- Files: `kebab-case.ts` (e.g., `job-filters.tsx`)
- Components: `PascalCase` exports
- Functions: `camelCase`
- Types/interfaces: `PascalCase` with type suffix for complex types
- CSS classes: Tailwind utility classes only (no custom CSS files except `globals.css`)
- Routes: `[param]` for dynamic segments (`[locale]`, `[id]`, `[documentId]`)

### Architecture Rules
- Server Components by default; Client Components only when needed (`"use client"`)
- i18n translations via `getTranslations` (server) / `useTranslations` (client)
- Data fetching: Strapi > static fallback
- Forms: client validation + server validation + rate limiting
- Email: Resend with console.log fallback
- Strapi routes: public read access (`auth: false`) for content APIs
- Theme: CSS custom properties + `.dark` class toggle

### Gotchas
- Static articles use `slug` for URLs → 404s because route expects `documentId`
- Strapi Job schema is missing `status`, `skills`, `modality`, `paymentType`
- Rate limiter is in-memory (resets per serverless invocation)
- `encodeURI()` is a valid JS global (not a bug)
- Strapi's `better-sqlite3` is a native module — won't work on Vercel

---

## Troubleshooting

| Symptom | Likely Cause | Solution |
|---|---|---|
| Jobs show "Open" for all | Strapi schema missing `status` field | Add field in Strapi admin |
| Static articles → 404 | Route expects `documentId`, data has `slug` | Fix href or add slug route |
| Emails not sending | `RESEND_API_KEY` not set | Add to `.env.local` or check Resend dashboard |
| Dark mode flashes on load | Hydration mismatch | Inline script handles this — check it runs before React |
| Strapi won't start | Port 1337 in use or SQLite issues | Kill process on :1337 or delete `.tmp/data.db` |
| `better-sqlite3` build errors | Native module compilation | Ensure Node 18-22, install build-essential |
| Strapi returns 403 on API | Auth required | Set `auth: false` in route config |
| Translations not showing | Key missing in JSON | Add to both `en.json` and `es.json` |
| Lint/type errors | Outdated types or wrong imports | Run `npm run lint` and `npm run typecheck` |

---

## Build & Deploy

### Frontend (Vercel)
```bash
cd next_folder
npm run build
# Deploy via Vercel CLI or GitHub integration
```
- Set env vars in Vercel dashboard
- Connect to Strapi (ensure `STRAPI_URL` points to deployed CMS)

### Strapi (Hosted)
```bash
cd strapi_folder
npm run build
# Deploy to Railway, Render, DigitalOcean, etc.
```
- Switch to PostgreSQL for production
- Configure CORS for frontend domain
- Set `ADMIN_JWT_SECRET`, `APP_KEYS`, etc. as production secrets
