# 📋 Roadmap & Tracking de Mejoras Arquitectónicas

Este documento registra el seguimiento detallado de las 4 opciones de mejora arquitectónica identificadas en el Architecture Review.

---

## 🧭 Estado Global de las Opciones

| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Job Query & Filtering Seam ([`src/lib/jobs/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/)) | ✅ Completada | **Alta (Sprint Actual)** |
| **Opción 2** | Intake File Validation & Purge Ghosts ([`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/)) | ✅ Completada | Media-Alta |
| **Opción 3** | Article Entity Alignment & Move Cards ([`src/lib/articles/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/)) | ✅ Completada | Media |
| **Opción 4** | About Profile Repository & Collapse Page ([`src/app/[locale]/about/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/about/)) | ✅ Completada | Media |

---

## 🎯 Opción 1: Deepen Job Query & Filtering Seam (✅ Completada)
**Rama:** `feat/jobs-filter-query-sprint`

### Objetivos
- [x] **1.1 Extender tipos de consulta:** Definir `JobFilterCriteria` en [`src/lib/jobs/types.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/types.ts) (query de texto, estados, modalidades, tipos de pago, habilidades).
- [x] **1.2 Crear el evaluador de búsqueda y filtrado:** Implementar `filterJobs(jobs: Job[], criteria: JobFilterCriteria): Job[]` en [`src/lib/jobs/query.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/query.ts) con soporte para:
  - Búsqueda tokenizada insensible a mayúsculas y acentos.
  - Coincidencia en título, descripción, habilidades, modalidad, tipo y ubicación.
  - Filtrado multi-estado (`Set<JobStatus>`).
  - Filtrado por modalidad y tipo de compensación.
- [x] **1.3 Exponer en la interfaz pública:** Exportar `filterJobs` y `JobFilterCriteria` desde [`src/lib/jobs/index.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/index.ts).
- [x] **1.4 Pruebas Unitarias exhaustivas:** Crear [`src/lib/jobs/__tests__/query.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/__tests__/query.test.mjs) en `node --test` probando 15 escenarios (búsqueda vacía, tokens, tildes, filtros combinados).
- [x] **1.5 Unificar `job-card.tsx`:** Eliminar `JobCardProps` duplicado y hacer que `JobCard` consuma la entidad canónica `Job`.
- [x] **1.6 Adelgazar `job-filters.tsx`:** Reemplazar el `useMemo` de filtrado manual en [`src/components/job-filters.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/job-filters.tsx) por la llamada limpia a `filterJobs`.
- [x] **1.7 Verificación completa:** `npm test` (63/63 pasan), `npm run typecheck` (0 errores), `npm run lint` (0 errores) y `npm run test:e2e` (18/18 pasan).

---

## 📦 Opción 2: Encapsulate Intake File Validation & Purge Ghosts (✅ Completada)
**Rama:** `feat/intake-encapsulation-sprint`

### Objetivos
- [x] **2.1 Validación de CV en Intake:** Mover la verificación de tipos MIME (`ALLOWED_CV_MIME`) y límite de 5 MB de [`api/apply/route.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/api/apply/route.ts) dentro de [`src/lib/intake/validation.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/validation.ts).
- [x] **2.2 Adelgazar transport handler:** Convertir `api/apply/route.ts` en un adaptador delgado que solo extrae `FormData` y delega a `submitApplication`.
- [x] **2.3 Purgar archivos huérfanos:**
  - Eliminado [`src/lib/validation.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/validation.ts) (código muerto).
  - Eliminado [`src/lib/strapi.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/strapi.ts) (barrel export sin uso).
- [x] **2.4 Internalizar rate limiting:** Movido `rate-limit.ts` dentro de `src/lib/intake/rate-limit.ts` como adaptador interno.
- [x] **2.5 Pruebas:** Agregadas pruebas unitarias en `intake.test.mjs` para rechazo de CV mayor a 5MB y tipos de archivo inválidos (66/66 pruebas pasando).

---

## 📰 Opción 3: Eliminate Article Entity Drift & Relocate Cards (✅ Completada)
**Rama:** `feat/articles-entity-alignment-sprint`

### Objetivos
- [x] **3.1 Reubicar presentación:** Movido [`src/components/ui/article-cards.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/article-cards.tsx) fuera de `components/ui/` hacia [`src/components/article-card.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/article-card.tsx).
- [x] **3.2 Eliminar `CardArticle`:** Reemplazada la interfaz clonada por la entidad canónica `Article` de [`src/lib/articles/types.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/types.ts).
- [x] **3.3 Purgar `BlogPreview`:** Reemplazado por `RawStaticArticle` canónico en `src/lib/articles/types.ts` y actualizado `src/types/homepage.ts`.
- [x] **3.4 Actualizar call sites:** Actualizados imports en `articles.tsx` y `articles-client.tsx`.

---

## 👤 Opción 4: Establish About Profile Module Seam (✅ Completada)
**Rama:** `feat/about-module-sprint`

### Objetivos
- [x] **4.1 Crear módulo y tipos canónicos de About:** Creado [`src/lib/about/types.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/types.ts) (`AboutProfile`, `ExperienceItem`, `EducationItem`, `CertificationItem`, `FocusArea`, `AboutSkills`).
- [x] **4.2 Normalizador y utilidades puras:** Creado [`src/lib/about/normalizer.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/normalizer.ts) con `normalizeRawAboutData`, `flattenExperience` y `formatExperienceDate`.
- [x] **4.3 Adaptadores estático y Strapi:** Creados [`src/lib/about/static-adapter.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/static-adapter.ts) y [`src/lib/about/strapi-adapter.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/strapi-adapter.ts), aislando el JSON estático `@/Data/about`.
- [x] **4.4 Interfaz pública del dominio:** Creado [`src/lib/about/index.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/index.ts) con `getAboutProfile(locale)` envuelto en React `cache()`.
- [x] **4.5 Descomponer monolito y absorber satélites:**
  - Creado directorio [`src/components/about/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/about/) con componentes modulares: `about-hero`, `about-bio`, `about-experience`, `about-focus`, `about-stats`, `about-skills`, `about-education`, `about-certifications`, `about-learning`, `about-cta`, `about-icons`, y `headline-pills`.
  - Absorbidos componentes satélites superficiales (`bio-expand`, `headline-pills`).
  - Reducido [`src/app/[locale]/about/page.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/about/page.tsx) de 459 líneas a ~130 líneas de orquestación pura.
- [x] **4.6 Suite de pruebas unitarias:** Creado [`src/lib/about/__tests__/about.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/__tests__/about.test.mjs) y añadido a `npm test` (73/73 pruebas pasando).
- [x] **4.7 Verificación completa:** `npm test` (73 pasan), `npm run typecheck` (0 errores), `npm run lint` (0 errores), `npm run build` (SSG exitoso), y `npm run test:e2e` (18/18 pasan).
