# 📋 Roadmap & Tracking de Mejoras Arquitectónicas

Este documento registra el seguimiento detallado de las 4 opciones de mejora arquitectónica identificadas en el Architecture Review.

---

## 🧭 Estado Global de las Opciones

| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Job Query & Filtering Seam ([`src/lib/jobs/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/)) | ✅ Completada | **Alta (Sprint Actual)** |
| **Opción 2** | Intake File Validation & Purge Ghosts ([`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/)) | ⚪ Pendiente | Media-Alta |
| **Opción 3** | Article Entity Alignment & Move Cards ([`src/lib/articles/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/)) | ⚪ Pendiente | Media |
| **Opción 4** | About Profile Repository & Collapse Page ([`src/app/[locale]/about/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/about/)) | ⚪ Pendiente | Media |

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

## 📦 Opción 2: Encapsulate Intake File Validation & Purge Ghosts (Pendiente)

### Objetivos
- [ ] **2.1 Validación de CV en Intake:** Mover la verificación de tipos MIME (`ALLOWED_CV_MIME`) y límite de 5 MB de [`api/apply/route.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/api/apply/route.ts) dentro de [`src/lib/intake/validation.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/validation.ts).
- [ ] **2.2 Adelgazar transport handler:** Convertir `api/apply/route.ts` en un adaptador delgado que solo extrae `FormData` y delega a `submitApplication`.
- [ ] **2.3 Purgar archivos huérfanos:**
  - Eliminar [`src/lib/validation.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/validation.ts) (código muerto).
  - Eliminar [`src/lib/strapi.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/strapi.ts) (barrel export sin uso).
- [ ] **2.4 Internalizar rate limiting:** Mover `rate-limit.ts` dentro de `src/lib/intake/` como adaptador interno.
- [ ] **2.5 Pruebas:** Agregar pruebas unitarias en `intake.test.mjs` para rechazo de CV mayor a 5MB y tipos de archivo inválidos.

---

## 📰 Opción 3: Eliminate Article Entity Drift & Relocate Cards (Pendiente)

### Objetivos
- [ ] **3.1 Reubicar presentación:** Mover [`src/components/ui/article-cards.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/article-cards.tsx) fuera de `components/ui/` hacia `src/components/article-card.tsx` o `src/components/articles/`.
- [ ] **3.2 Eliminar `CardArticle`:** Reemplazar la interfaz clonada por la entidad canónica `Article` de [`src/lib/articles/types.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/types.ts).
- [ ] **3.3 Purgar `BlogPreview`:** Eliminar el tipo obsoleto `BlogPreview` en [`src/types/homepage.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/types/homepage.ts) y limpiar datos no usados en `homepage.ts`.
- [ ] **3.4 Actualizar call sites:** Ajustar imports en `articles.tsx` y `articles-client.tsx`.

---

## 👤 Opción 4: Establish About Profile Module Seam (Pendiente)

### Objetivos
- [ ] **4.1 Crear repositorio About:** Crear `src/lib/about/` con interfaz `getAboutProfile(locale)`.
- [ ] **4.2 Adaptador estático:** Normalizar [`src/Data/about.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/Data/about.ts) detrás de la costura.
- [ ] **4.3 Colapsar página monolítica:** Dividir [`src/app/[locale]/about/page.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/about/page.tsx) (459 líneas) en secciones de alta cohesión y absorber los componentes satélites superficiales (`bio-expand`, `headline-pills`).
- [ ] **4.4 Pruebas de normalización:** Crear suite unitaria para el perfil de About.
