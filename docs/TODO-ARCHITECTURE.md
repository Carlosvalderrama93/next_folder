# 📋 Roadmap & Tracking de Mejoras Arquitectónicas

Este documento registra el seguimiento detallado de las mejoras arquitectónicas del proyecto `recruiter_Page`.

---

## 🧭 Estado Global de las Opciones

### Ciclo 1: Costuras de Dominio y Descomposición de Monolitos (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Rama / Commit |
|---|---|---|---|
| **Opción 1** | Job Query & Filtering Seam ([`src/lib/jobs/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/)) | ✅ Completada | `feat/jobs-filter-query-sprint` (`5518fcb`) |
| **Opción 2** | Intake Validation & Ghost Purge ([`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/)) | ✅ Completada | `feat/intake-encapsulation-sprint` (`1680f0c`) |
| **Opción 3** | Article Entity Alignment & Move Cards ([`src/lib/articles/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/)) | ✅ Completada | `feat/articles-entity-alignment-sprint` (`2a1b832`) |
| **Opción 4** | About Profile Repository & Collapse Page ([`src/app/[locale]/about/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/about/)) | ✅ Completada | `feat/about-module-sprint` (`38f0eaa`) |

### Ciclo 2: Desacoplamiento de Datos, Higiene UI y Fugas de Validación (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Rama / Commit |
|---|---|---|---|
| **Opción A** | Desacoplar `homepage.ts` & Fixtures de Dominio ([`src/Data/homepage.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/Data/homepage.ts)) | ✅ Completada | `feat/domain-data-decoupling-sprint` (`5f38074`) |
| **Opción B** | Reglas de Validación en Costura de Intake ([`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/)) | ✅ Completada | `feat/intake-client-validation-sprint` (`da36328`) |
| **Opción C** | Purgar `ui/dialog.tsx` y Reubicar `ui/heroCTA.tsx` ([`src/components/ui/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/)) | ✅ Completada | `feat/ui-hygiene-sprint` (`f9be236`) |
| **Opción D** | Módulo Seam para Testimonios ([`src/lib/testimonials/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/testimonials/)) | ✅ Completada | `feat/testimonials-module-sprint` (`20c50e5`) |

### Ciclo 3: Shell Persistente en App Router y Centralización de Presentación (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Shell Persistente en Root Layout ([`src/app/[locale]/layout.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/layout.tsx)) | ✅ **Completada** | `feat/persistent-shell-layout-sprint` (`81e91d3`) |
| **Opción 2** | Costura de Configuración del Sitio ([`src/lib/site-config/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/)) | ✅ **Completada** | `feat/site-config-seam-sprint` (`4da4742`) |
| **Opción 3** | Componente Canónico `JobStatusBadge` & Presentación ([`src/components/job-status-badge.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/job-status-badge.tsx)) | ✅ **Completada** | `feat/job-status-badge-sprint` (`0afeb24`) |
| **Opción 4** | Descomposición de Bloques de Artículos ([`src/components/article-blocks.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/article-blocks.tsx)) | ✅ **Completada** | `feat/article-blocks-sprint` (`bb2806e`) |

### Ciclo 4: Pulido Fino, Localidad Absoluta e Higiene UI (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Retiro Definitivo de `src/Data/` y Localidad en About ([`src/lib/about/fixtures.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/fixtures.ts)) | ✅ **Completada** | `feat/about-fixtures-locality-sprint` (`f8eea3d`) |
| **Opción 2** | Higiene UI y Purga de Clutter Muerto ([`src/components/ui/card.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/card.tsx)) | ✅ **Completada** | `feat/ui-hygiene-card-purge-sprint` (`f7a48de`) |
| **Opción 3** | Desambiguación de Secciones y Colapso de Módulo Superficial ([`src/components/featured-jobs-section.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/featured-jobs-section.tsx)) | ✅ **Completada** | `feat/home-sections-clarity-sprint` (`faadf64`) |
| **Opción 4** | Consolidación de Configuración CMS ([`src/lib/site-config/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/)) | ✅ **Completada** | `feat/cms-config-consolidation-sprint` (`a563649`) |

### Ciclo 5: Profundización de Cliente, Localidad UI y Streaming Progresivo (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Encapsulación del Ciclo de Vida de Formularios Client (`useIntakeForm`) ([`src/lib/intake/use-intake-form.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/use-intake-form.ts)) | ✅ **Completada** | `feat/intake-form-lifecycle-sprint` |
| **Opción 2** | Localidad UI de Artículos: Purificar `components/ui/` y Crear `components/articles/` ([`src/components/articles/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/articles/)) | ✅ **Completada** | `feat/articles-ui-locality-sprint` |
| **Opción 3** | Límites de Suspense y Streaming Progresivo en Portada ([`src/app/[locale]/page.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/page.tsx)) | ✅ **Completada** | `feat/streaming-suspense-home-sprint` |
| **Opción 4** | Consolidación del Seam de Renderizado Markdown ([`src/components/ui/rich-text.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/rich-text.tsx)) | ✅ **Completada** | `feat/markdown-adapter-consolidation-sprint` |


---

## 🏛️ Opción 1: Shell Persistente en Root Layout (✅ Completada)
**Rama:** `feat/persistent-shell-layout-sprint`

### Objetivos
- [x] **1.1 Elevar `Navigation` y `Footer` a `LocaleLayout`:** En [`src/app/[locale]/layout.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/layout.tsx), renderizar `<Navigation />`, `<div className="flex-1">{children}</div>` y `<Footer />` de forma unificada con layout flex sticky.
- [x] **1.2 Desacoplar `Footer` de props externas:** Convertir `Footer` para que cargue sus datos de forma autónoma sin exigir `{...data}` en cada llamada (`FooterProps` opcionales con defaults).
- [x] **1.3 Purgar montaje duplicado en 15 páginas y skeletons:**
  - Removido `<Navigation />` y `<Footer />` de `page.tsx`, `about/page.tsx`, `jobs/page.tsx`, `jobs/[id]/page.tsx`, `articles/page.tsx`, `articles/[documentId]/page.tsx`, `contact/page.tsx` y `not-found.tsx`.
  - Removido de todos los `loading.tsx` y `error.tsx` de jobs y articles.
- [x] **1.4 Verificación de navegaciones fluidas y E2E:** 88 unit tests, typecheck sin errores, lint sin advertencias, build de producción (18/18 páginas) y 18/18 tests E2E superados exitosamente.

---

## ⚙️ Opción 2: Costura de Configuración del Sitio & Retiro de `homepage.ts` (✅ Completada)
**Rama:** `feat/site-config-seam-sprint`

### Objetivos
- [x] **2.1 Crear costura `src/lib/site-config/`:** Definido `types.ts`, `config.ts`, `utils.ts` (`isRouteActive`, `isValidSocialUrl`), `index.ts` y suite de pruebas unitarias (`site-config.test.mjs`).
- [x] **2.2 Unificar `NAV_LINKS` y `SITE_URL`:** Consumir los enlaces canónicos y URL canónica en `Navigation`, `Footer`, `Hero`, `LocaleLayout`, `robots.ts`, `sitemap.ts` y detalle de artículos.
- [x] **2.3 Reubicar tipos de Dominio de Empleos:** Exportar `JobStatus`, `JobModality`, `JobPaymentType`, `RawStaticJob` desde `@/lib/jobs` y actualizar imports en `job-card`, `job-filters`, `jobs/[id]/page.tsx`, `jobs/query.ts`.
- [x] **2.4 Retirar `src/Data/homepage.ts` y `src/types/homepage.ts`:** Eliminados definitivamente sin dejar código huérfano ni directorio vacío `src/types`.
- [x] **2.5 Verificación completa:** 95 pruebas unitarias (`npm test`), 0 errores de tipos, 0 linter warnings, build de producción y 18/18 tests E2E pasados.

---

## 🏷️ Opción 3: Componente Canónico `JobStatusBadge` & Tokens de Presentación (✅ Completada)
**Rama:** `feat/job-status-badge-sprint`

### Objetivos
- [x] **3.1 Centralizar tokens de estado y modalidad:** Creado [`src/lib/jobs/presentation.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/presentation.ts) con `STATUS_BADGE_CLASSES`, `STATUS_TRANSLATION_KEYS`, `STATUS_PAGE_KEYS`, `MODALITY_KEYS`, `PAYMENT_KEYS`, `STATUS_CHIP_ACTIVE`, `DIMMED_STATUSES` e `isJobDimmed()`.
- [x] **3.2 Crear componente canónico `JobStatusBadge`:** Implementado [`src/components/job-status-badge.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/job-status-badge.tsx) con soporte para variantes de tamaño (`sm`, `md`), traducción automática y soporte de fallback.
- [x] **3.3 Desacoplar `job-card.tsx` y `jobs/[id]/page.tsx`:** Reemplazadas las 50+ líneas de diccionarios duplicados por el componente canónico y helper `isJobDimmed()`.
- [x] **3.4 Sincronizar filtros:** Alinear [`job-filters.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/job-filters.tsx) consumiendo constantes y mapeos de presentación directamente del dominio, reduciendo el bundle del cliente en ~38%.
- [x] **3.5 Verificación completa:** 101 unit tests (`npm test`), 0 errores de tipos, 0 advertencias ESLint, build de producción y 18/18 tests E2E superados.

---

## 📰 Opción 4: Descomposición de Bloques de Artículos (✅ Completada)
**Rama:** `feat/article-blocks-sprint`

### Objetivos
- [x] **4.1 Crear `src/components/article-blocks.tsx`:** Extraídos como componentes modulares y limpios Server Components:
  - `RichTextBlock`: Encapsula `ReactMarkdown` con `remarkGfm` y tipografía Tailwind prose responsive.
  - `QuoteBlock`: Bloque de cita accesible con soporte de `<cite>` y `aria-label`.
  - `MediaBlock`: Imagen optimizada con Next.js `<Image>`, resolución automática de CDN Strapi o assets locales.
  - `SliderBlock`: Galería / slider horizontal accesible para colecciones de medios.
  - `ArticleBlockRenderer`: Despachador polimórfico de bloques según `__component`.
  - `ArticleBlocks`: Contenedor principal que itera sobre la lista de bloques tipados.
- [x] **4.2 Simplificar `articles/[documentId]/page.tsx`:**
  - Archivo reducido de 232 a 148 líneas (~36% de reducción en complejidad).
  - Eliminado el acoplamiento directo de la página con librerías pesadas de Markdown (`react-markdown`, `remark-gfm`).
  - Reducción del tamaño de ruta del detalle de artículos a solo 2.73 kB.
- [x] **4.3 Contratos y Pruebas:**
  - Agregada suite de pruebas para el contrato de renderizado y discriminación de bloques en [`src/lib/articles/__tests__/articles.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/articles/__tests__/articles.test.mjs).
- [x] **4.4 Verificación completa:**
  - 104 pruebas unitarias (`npm test`) pasadas.
  - 0 errores TypeScript (`npm run typecheck`).
  - 0 advertencias ESLint (`npm run lint`).
  - Build de producción Next.js 15.5.0 completado sin errores.
  - 18/18 pruebas End-to-End (`npm run test:e2e`) pasadas exitosamente.

---

## 📁 Ciclo 4 — Opción 1: Retiro Definitivo de `src/Data/` y Localidad en About Profile Fixtures (✅ Completada)
**Rama:** `feat/about-fixtures-locality-sprint`

### Objetivos
- [x] **1.1 Mover `src/Data/about.ts` a `src/lib/about/fixtures.ts`:**
  - Ubicados los fixtures de perfil dentro de su propia costura de dominio en [`src/lib/about/fixtures.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/fixtures.ts).
- [x] **1.2 Desacoplar `static-adapter.ts`:**
  - Actualizado [`src/lib/about/static-adapter.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/static-adapter.ts) para importar localmente desde `./fixtures` en lugar de fugarse hacia `@/Data/about`.
- [x] **1.3 Purgar directorio residual `src/Data/`:**
  - Eliminado por completo el directorio `src/Data/` del proyecto, satisfaciendo el *deletion test*.
- [x] **1.4 Contrato de localidad en tests:**
  - Agregada suite de pruebas `About Fixtures Locality Contract` en [`src/lib/about/__tests__/about.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/__tests__/about.test.mjs) que verifica que `fixtures.ts` reside localmente y que `src/Data` no existe.
- [x] **1.5 Verificación completa:**
  - 105 pruebas unitarias (`npm test`) pasadas al 100%.
  - 0 errores TypeScript (`npm run typecheck`).
  - 0 advertencias ESLint (`npm run lint`).
  - Build de producción Next.js 15.5.0 completado sin errores.
  - 18/18 pruebas End-to-End (`npm run test:e2e`) pasadas exitosamente.

---

## 🧹 Ciclo 4 — Opción 2: Higiene UI y Purga de Clutter Muerto (✅ Completada)
**Rama:** `feat/ui-hygiene-card-purge-sprint`

### Objetivos
- [x] **2.1 Desacoplar variantes de dominio en `ui/card.tsx`:**
  - Removido `CardVariant = "default" | "job" | "testimonial"` y `variantStyles`. El componente [`src/components/ui/card.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/card.tsx) ahora es un contenedor semántico y polimórfico 100% puro y agnóstico a entidades de negocio.
  - Actualizados los consumidores ([`job-card.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/job-card.tsx) y [`testimonials-carousel.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/testimonials-carousel.tsx)) para controlar sus alturas y estados mediante composición estándar con Tailwind.
- [x] **2.2 Purgar re-exports obsoletos `@deprecated`:**
  - Eliminados definitivamente `src/components/headline-pills.tsx` y `src/components/bio-expand.tsx` que no tenían ningún llamador activo.
- [x] **2.3 Purgar carpetas fantasma vacías en `src/app/`:**
  - Eliminadas las carpetas residuales `src/app/jobs/`, `src/app/about/`, `src/app/contact/` y `src/app/apply/` heredadas de la estructura pre-internacionalización.
- [x] **2.4 Reubicar `about-toc.tsx` para localidad de componentes:**
  - Movido `about-toc.tsx` a [`src/components/about/about-toc.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/about/about-toc.tsx) y actualizado su import en [`src/app/[locale]/about/page.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/about/page.tsx).
- [x] **2.5 Contratos en pruebas unitarias:**
  - Agregada la suite `UI Hygiene & Dead Code Purge Contracts` en [`src/lib/site-config/__tests__/site-config.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/__tests__/site-config.test.mjs) garantizando que `Card` no contenga variantes de negocio y que los archivos y carpetas fantasma no reaparezcan.
- [x] **2.6 Verificación completa:**
  - 107 pruebas unitarias (`npm test`) pasadas.
  - 0 errores TypeScript (`npm run typecheck`).
  - 0 advertencias ESLint (`npm run lint`).
  - Build de producción Next.js 15.5.0 completado sin errores.
  - 18/18 pruebas End-to-End (`npm run test:e2e`) pasadas exitosamente.

---

## 🧭 Ciclo 4 — Opción 3: Desambiguación de Secciones de Portada y Colapso de Módulo Superficial (✅ Completada)
**Rama:** `feat/home-sections-clarity-sprint`

### Objetivos
- [x] **3.1 Desambiguar sección de empleos (`FeaturedJobsSection`):**
  - Renombrado `src/components/job.tsx` a [`src/components/featured-jobs-section.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/featured-jobs-section.tsx), exportando `FeaturedJobsSection`.
  - Se erradica por completo la colisión de nombres entre la entidad de dominio `Job` (`CONTEXT.md`) y el componente visual de sección.
- [x] **3.2 Desambiguar carrusel y módulo superficial (`FeaturedJobsCarousel`):**
  - Renombrado `src/components/job-carousel.tsx` a [`src/components/featured-jobs-carousel.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/featured-jobs-carousel.tsx) con límites claros Server/Client respecto a `FeaturedJobsSection`.
- [x] **3.3 Desambiguar sección de artículos (`FeaturedArticlesSection`):**
  - Renombrado `src/components/articles.tsx` a [`src/components/featured-articles-section.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/featured-articles-section.tsx), exportando `FeaturedArticlesSection`.
- [x] **3.4 Actualizar HomePage ([`src/app/[locale]/page.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/page.tsx)):**
  - Consumiendo explícitamente `<FeaturedJobsSection />` y `<FeaturedArticlesSection />`, mejorando la legibilidad semántica del árbol de componentes de la página principal.
- [x] **3.5 Contratos en pruebas unitarias:**
  - Añadida prueba en [`src/lib/site-config/__tests__/site-config.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/__tests__/site-config.test.mjs) que verifica la no-existencia de componentes ambiguos y el consumo estricto de las secciones semánticas.
- [x] **3.6 Verificación completa:**
  - 108 pruebas unitarias (`npm test`) pasadas.
  - 0 errores TypeScript (`npm run typecheck`).
  - 0 advertencias ESLint (`npm run lint`).
  - Build de producción Next.js 15.5.0 completado sin errores.
  - 18/18 pruebas End-to-End (`npm run test:e2e`) pasadas exitosamente.

---

## ⚙️ Ciclo 4 — Opción 4: Consolidación de Configuración CMS y Retiro de `src/lib/config.ts` (✅ Completada)
**Rama:** `feat/cms-config-consolidation-sprint`

### Objetivos
- [x] **4.1 Centralizar `STRAPI_URL` en `src/lib/site-config/`:**
  - Añadido `STRAPI_URL` a [`src/lib/site-config/config.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/config.ts) con soporte para variable de entorno `process.env.STRAPI_URL` y fallback por defecto a `http://localhost:1337`.
  - Re-exportado canónicamente desde [`src/lib/site-config/index.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/index.ts).
- [x] **4.2 Actualizar adaptadores y normalizadores de dominio:**
  - Actualizados los 5 consumidores para importar `STRAPI_URL` desde `@/lib/site-config`:
    - `src/lib/jobs/strapi-adapter.ts`
    - `src/lib/jobs/normalizer.ts`
    - `src/lib/articles/strapi-adapter.ts`
    - `src/lib/articles/normalizer.ts`
    - `src/lib/about/strapi-adapter.ts`
- [x] **4.3 Purgar archivo huérfano `src/lib/config.ts`:**
  - Eliminado definitivamente `src/lib/config.ts`. Ahora el 100% de los archivos dentro de `src/lib/` residen de forma estricta y limpia dentro de subdirectorios de costura de dominio (`jobs/`, `articles/`, `about/`, `intake/`, `testimonials/`, `site-config/`).
- [x] **4.4 Contratos en pruebas unitarias:**
  - Agregada prueba en [`src/lib/site-config/__tests__/site-config.test.mjs`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/__tests__/site-config.test.mjs) validando que `STRAPI_URL` es expuesto por `site-config`, que los adaptadores lo importan de allí y que `src/lib/config.ts` no existe.
- [x] **4.5 Verificación completa:**
  - 109 pruebas unitarias (`npm test`) pasadas.
  - 0 errores TypeScript (`npm run typecheck`).
  - 0 advertencias ESLint (`npm run lint`).
  - Build de producción Next.js 15.5.0 completado sin errores.
  - 18/18 pruebas End-to-End (`npm run test:e2e`) pasadas exitosamente.

---

## 🚀 Ciclo 5 — Opciones de Profundización y Rendimiento (✅ 100% Completado)

### Opción 1: Encapsulación del Ciclo de Vida de Formularios Client (`useIntakeForm`) (✅ Completada)
**Rama:** `feat/intake-form-lifecycle-sprint`

- [x] **1.1 Crear hook en `src/lib/intake/use-intake-form.ts`:** Encapsula estado `submitting`, manejo de `toast` con variants ("success" | "error"), limpieza de campos (`clearFieldError`) y autofoco accesible en el primer error vía `requestAnimationFrame` (`focusFirstError`).
- [x] **1.2 Refactorizar `contact-form.tsx`:** Consume `useIntakeForm`, reduciendo el componente a su definición de campos y validación, eliminando timeouts crudos y lógica manual de RAF/refs.
- [x] **1.3 Refactorizar `apply-form.tsx`:** Consume `useIntakeForm`, manteniendo la carga de CV y eliminando timeouts crudos y lógica duplicada de toast y foco en error.
- [x] **1.4 Pruebas y verificación:** Agregadas 3 pruebas de contrato en `src/lib/intake/__tests__/intake.test.mjs`. 112 unit tests, 0 TS errors, 0 lints, build 18/18 y 18/18 E2E superados.

### Opción 2: Localidad UI de Artículos: Purificar `components/ui/` y Crear `components/articles/` (✅ Completada)
**Rama:** `feat/articles-ui-locality-sprint`

- [x] **2.1 Crear directorio canónico `src/components/articles/`:** Análogo a `src/components/about/`.
- [x] **2.2 Reubicar widgets exclusivos de artículos desde `src/components/ui/`:**
  - Movidos `reading-progress.tsx` y `share-buttons.tsx` a `src/components/articles/`.
- [x] **2.3 Agrupar componentes de presentación de artículos:**
  - Reubicados `article-blocks.tsx` y `article-card.tsx` a `src/components/articles/` con barril canónico `index.ts`.
- [x] **2.4 Actualizar rutas de consumo y contratos de prueba:** Actualizados `articles/[documentId]/page.tsx`, `articles-client.tsx` y `featured-articles-section.tsx`. Agregadas 3 pruebas de contrato en `articles.test.mjs`. 115 unit tests, 0 TS errors, 0 lints, build 18/18 y 18/18 E2E superados.

### Opción 3: Límites de Suspense y Streaming Progresivo en Portada (`HomePage`) (✅ Completada)
**Rama:** `feat/streaming-suspense-home-sprint`

- [x] **3.1 Diseñar skeletons semánticos ligeros para secciones de portada:** Creado [`src/components/home-skeletons.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/home-skeletons.tsx) con `FeaturedJobsSkeleton`, `FeaturedArticlesSkeleton` y `TestimonialsSkeleton` respetando las proporciones y grid de cada sección.
- [x] **3.2 Envolver secciones asíncronas en `<Suspense>` en `src/app/[locale]/page.tsx`:** El shell estático y el `Hero` se transmiten de inmediato (TTFB instantáneo) mientras las consultas de `jobs`, `articles` y `testimonials` transmiten en paralelo.
- [x] **3.3 Verificación de rendimiento y streaming:** 116 pruebas unitarias (`npm test`), 0 errores TS, 0 lints, build de producción 18/18 y 18/18 checks E2E superados sin regresiones ni parpadeos de hidratación.

### Opción 4: Consolidación del Seam de Renderizado Markdown (`jobs/[id]/page.tsx`) (✅ Completada)
**Rama:** `feat/markdown-adapter-consolidation-sprint`

- [x] **4.1 Crear o promover adaptador de texto enriquecido/markdown:** Implementado [`src/components/ui/rich-text.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/rich-text.tsx) encapsulando `react-markdown`, `remark-gfm` y estilos de prose responsivos en modo claro/oscuro.
- [x] **4.2 Refactorizar `jobs/[id]/page.tsx` y `article-blocks.tsx`:** Eliminado el acoplamiento directo a librerías externas de parsing en las rutas. Ahora el 100% del renderizado de Markdown en el sitio se centraliza en un único adaptador.
- [x] **4.3 Verificación de consistencia tipográfica:** Añadido contrato en `presentation.test.mjs`. 117 unit tests, 0 TS errors, 0 lints, build 18/18 y 18/18 E2E superados.

---

## 📜 Registro Histórico de Ciclos Anteriores


<details>
<summary><strong>Ver detalles de Ciclo 1 (Opciones 1-4) y Ciclo 2 (Opciones A-D) completados</strong></summary>

### Ciclo 1: Costuras de Dominio y Descomposición de Monolitos (✅ 100%)
- **Opción 1:** Evaluador tokenizado `filterJobs` e interfaz canónica `Job` (`5518fcb`).
- **Opción 2:** Validación y límite de CV encapsulados en `src/lib/intake/`, purga de archivos fantasma (`1680f0c`).
- **Opción 3:** Eliminada duplicación de tipos en artículos, tarjeta en `article-card.tsx` (`2a1b832`).
- **Opción 4:** Módulo `src/lib/about/`, monolito `about/page.tsx` colapsado de 459 a 130 líneas (`38f0eaa`).

### Ciclo 2: Desacoplamiento de Datos, Higiene UI y Fugas de Validación (✅ 100%)
- **Opción A:** Aislados fixtures de Jobs y Articles, `homepage.ts` reducido de 408 a 88 líneas (`5f38074`).
- **Opción B:** Helpers de validación compartidos desde `src/lib/intake/validation` sin barriles de servidor (`da36328`).
- **Opción C:** Purgado `ui/dialog.tsx` y desinstalado `@radix-ui/react-dialog` (-11 paquetes), `hero-cta` reubicado (`f9be236`).
- **Opción D:** Costura `src/lib/testimonials/`, separación Server/Client con `TestimonialsCarousel`, 88 tests verdes (`20c50e5`).

</details>
