# 📋 Roadmap & Tracking de Mejoras Arquitectónicas

Este documento registra el seguimiento detallado de las mejoras arquitectónicas del proyecto `recruiter_Page`.

---

## 🧭 Estado Global de las Opciones

### Ciclo 1: Costuras de Dominio y Descomposición de Monolitos (✅ Completado)
| Opción | Módulo / Área | Estado | Rama / Commit |
|---|---|---|---|
| **Opción 1** | Job Query & Filtering Seam ([`src/lib/jobs/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/)) | ✅ Completada | `feat/jobs-filter-query-sprint` (`5518fcb`) |
| **Opción 2** | Intake Validation & Ghost Purge ([`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/)) | ✅ Completada | `feat/intake-encapsulation-sprint` (`1680f0c`) |
| **Opción 3** | Article Entity Alignment & Move Cards ([`src/lib/articles/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/)) | ✅ Completada | `feat/articles-entity-alignment-sprint` (`2a1b832`) |
| **Opción 4** | About Profile Repository & Collapse Page ([`src/app/[locale]/about/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/about/)) | ✅ Completada | `feat/about-module-sprint` (`38f0eaa`) |

### Ciclo 2: Desacoplamiento de Datos, Higiene UI y Fugas de Validación
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción A** | Desacoplar `homepage.ts` & Fixtures de Dominio ([`src/Data/homepage.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/Data/homepage.ts)) | ✅ Completada | Alta (`5f38074`) |
| **Opción B** | Reglas de Validación en Costura de Intake ([`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/)) | ✅ Completada | **Media-Alta (Sprint Actual)** |
| **Opción C** | Purgar `ui/dialog.tsx` y Reubicar `ui/heroCTA.tsx` ([`src/components/ui/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/)) | ⚪ Pendiente | Media |
| **Opción D** | Módulo Seam para Testimonios ([`src/components/testimonials.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/testimonials.tsx)) | ⚪ Pendiente | Especulativa |

---

## 🎯 Opción A: Desacoplar `homepage.ts` & Invertir Dependencias de Datos (✅ Completada)
**Rama:** `feat/domain-data-decoupling-sprint`

### Objetivos
- [x] **A.1 Aislar fixtures de Job en su propio dominio:** Creado [`src/lib/jobs/fixtures.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/fixtures.ts) con la lista estática de empleos tipados con `RawStaticJob`.
- [x] **A.2 Actualizar el adaptador estático de Jobs:** Modificado [`src/lib/jobs/static-adapter.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/static-adapter.ts) para importar desde `./fixtures`, eliminando la dependencia invertida hacia `homepage.ts`.
- [x] **A.3 Aislar fixtures de Artículos y autores:** Creado [`src/lib/articles/fixtures.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/fixtures.ts) y actualizado [`src/lib/articles/static-adapter.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/static-adapter.ts) para consumir sus propios fixtures locales.
- [x] **A.4 Purgar código muerto en `homepage.ts`:** Eliminadas 320 líneas de datos ajenos (`openPositions`, `blogPreview`, `authors`, `about`, `contactCTA`), reduciendo [`src/Data/homepage.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/Data/homepage.ts) de 408 a 88 líneas.
- [x] **A.5 Eliminar entidad duplicada en `src/types/homepage.ts`:** Reemplazada la duplicación de tipos `Job`, `JobStatus`, `JobModality`, `JobPaymentType` en [`src/types/homepage.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/types/homepage.ts) re-exportando desde la entidad canónica de [`src/lib/jobs/types.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/types.ts).
- [x] **A.6 Verificación completa:** `npm test` (73 tests pasan), `npm run typecheck` (0 errores), `npm run lint` (0 errores), `npm run build` (SSG exitoso con bundle reducido) y `npm run test:e2e` (18 checks pasan).

---

## 📦 Opción B: Compartir Reglas de la Costura de Intake con Formularios Cliente (✅ Completada)
**Rama:** `feat/intake-client-validation-sprint`

### Objetivos
- [x] **B.1 Exponer constantes y helpers de validación:** Exportados `ALLOWED_CV_MIME`, `ALLOWED_CV_EXTENSIONS`, `MAX_CV_BYTES`, `isValidEmail`, `isValidLinkedInUrl`, `isAllowedCvMime` e `isAllowedCvSize` en [`src/lib/intake/validation.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/validation.ts) y re-exportados en [`src/lib/intake/index.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/index.ts).
- [x] **B.2 Conectar `apply-form.tsx`:** Eliminadas las definiciones locales duplicadas (`EMAIL_RE`, `LINKEDIN_RE`, `ALLOWED_CV_TYPES`, `5 * 1024 * 1024`), reemplazándolas por importación directa de helpers desde [`@/lib/intake/validation`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/validation.ts) (siguiendo directriz Vercel `bundle-barrel-imports` para evitar dependencias de servidor en el bundle de cliente).
- [x] **B.3 Conectar `contact-form.tsx`:** Unificada la validación de email importando `isValidEmail` desde [`@/lib/intake/validation`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/validation.ts) y eliminando la regex local.
- [x] **B.4 Pruebas unitarias de validación:** Agregadas pruebas en [`src/lib/intake/__tests__/intake.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/__tests__/intake.test.mjs) (total sube a 81 tests 100% verdes).
- [x] **B.5 Verificación completa:** `npm test` (81/81 pasan), `npm run typecheck` (0 errores), `npm run lint` (0 errores), `npm run build` (limpio, sin advertencias de Resend en el cliente) y `npm run test:e2e` (18/18 checks pasan).

---

## 📰 Opción C: Purgar Código Muerto (`ui/dialog.tsx`) y Reubicar `ui/heroCTA.tsx` (⚪ Pendiente)
**Rama:** `feat/ui-hygiene-sprint`

### Objetivos
- [ ] **C.1 Reubicar `heroCTA.tsx`:** Mover fuera de `src/components/ui/` hacia `src/components/hero-cta.tsx` o absorberlo dentro de `src/components/hero.tsx`.
- [ ] **C.2 Deletion Test en `ui/dialog.tsx`:** Confirmar 0 importaciones en el proyecto y eliminar `src/components/ui/dialog.tsx` para reducir la superficie muerta.
- [ ] **C.3 Limpiar importaciones y barrel exports:** Garantizar que `src/components/ui/` solo aloje primitivas agnósticas y reutilizables.

---

## 👤 Opción D: Módulo Seam para Testimonios (⚪ Especulativa)
**Rama:** `feat/testimonials-module-sprint`

### Objetivos
- [ ] **D.1 Crear `src/lib/testimonials/`:** Definir interfaz `listTestimonials()` con adaptador estático.
- [ ] **D.2 Desacoplar `Testimonials` componente:** Consumir los testimonios a través de la costura en lugar del JSON estático en duro.

---

## 📜 Registro Histórico del Ciclo 1 (✅ 100% Completado)

<details>
<summary><strong>Ver detalles de las Opciones 1, 2, 3 y 4 completadas</strong></summary>

### Opción 1: Deepen Job Query & Filtering Seam (✅ Completada)
- `JobFilterCriteria` en `src/lib/jobs/types.ts`.
- Evaluador tokenizado e insensible a acentos/mayúsculas `filterJobs` en `src/lib/jobs/query.ts`.
- `job-card.tsx` anclado a la entidad canónica `Job`.
- `job-filters.tsx` adelgazado delegando a `filterJobs`.
- 15 pruebas unitarias en `src/lib/jobs/__tests__/query.test.mjs`.

### Opción 2: Encapsulate Intake File Validation & Purge Ghosts (✅ Completada)
- Validación de CV (<5MB y MIME types) encapsulada en `src/lib/intake/validation.ts`.
- Handler `api/apply/route.ts` convertido en adaptador delgado.
- Eliminados archivos muertos `src/lib/validation.ts` y `src/lib/strapi.ts`.
- Internalizado `rate-limit.ts` en `src/lib/intake/rate-limit.ts`.
- Pruebas unitarias de admisión en `src/lib/intake/__tests__/intake.test.mjs`.

### Opción 3: Eliminate Article Entity Drift & Relocate Cards (✅ Completada)
- Reubicada tarjeta en `src/components/article-card.tsx`.
- Eliminada interfaz clonada `CardArticle` a favor de la canónica `Article`.
- Purgado `BlogPreview` como entidad clonada en `src/types/homepage.ts`.
- Call sites actualizados en `articles.tsx` y `articles-client.tsx`.

### Opción 4: Establish About Profile Module Seam & Decompose Page (✅ Completada)
- Módulo `src/lib/about/` con `getAboutProfile(locale)`, adaptadores estático y Strapi, y `formatExperienceDate`.
- Monolito de `about/page.tsx` colapsado de 459 líneas a ~130 líneas.
- Componentes modulares en `src/components/about/` y satélites superficiales absorbidos.
- 7 pruebas unitarias en `src/lib/about/__tests__/about.test.mjs`.

</details>
