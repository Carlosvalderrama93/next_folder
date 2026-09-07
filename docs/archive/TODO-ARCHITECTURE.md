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

### Ciclo 6: Profundización de Costuras de Protocolo, Presentación y Estado (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Profundizar Costura HTTP de Intake y Colapsar Route Handlers ([`src/lib/intake/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/intake/)) | ✅ **Completada** | `feat/intake-http-seam-sprint` |
| **Opción 2** | Consolidar Módulo de Presentación de About Profile ([`src/components/about/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/about/)) | ✅ **Completada** | `feat/about-presentation-consolidation-sprint` |
| **Opción 3** | Costura de Estado URL para Consultas y Filtros de Empleo ([`src/lib/jobs/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/jobs/)) | ✅ **Completada** | `feat/job-query-url-state-sprint` |
| **Opción 4** | Metadata Estructurada y Schema.org JSON-LD ([`src/lib/site-config/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/)) | ✅ **Completada** | `feat/structured-metadata-seam-sprint` |

### Ciclo 7: Módulos Canónicos de Presentación, Sincronización URL e Higiene UI (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Consolidar Módulo de Presentación de Jobs (`components/jobs/`) y Colapsar `jobs/[id]/page.tsx` ([`src/components/jobs/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/jobs/)) | ✅ **Completada** | `feat/jobs-presentation-module-sprint` |
| **Opción 2** | Costura de Estado URL y Módulo de Presentación para Artículos (`ArticlesView`) ([`src/components/articles/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/articles/)) | ✅ **Completada** | `feat/articles-url-state-seam-sprint` |
| **Opción 3** | Purificación de Primitivas UI e Higiene de Chrome Layout ([`src/components/ui/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/)) | ✅ **Completada** | `feat/ui-primitives-hygiene-sprint` |
| **Opción 4** | Encapsulación de Script de Hidratación de Tema en Root Layout ([`src/components/theme-script.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/theme-script.tsx)) | ✅ **Completada** | `feat/theme-hydration-seam-sprint` |

### Ciclo 8: Simetría de Presentación, Shell Unificado y Co-ubicación de Skeletons (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Módulo Canónico de Presentación de Contacto ([`src/components/contact/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/contact/)) | ✅ **Completada** | `feat/contact-presentation-module-sprint` |
| **Opción 2** | Módulo Canónico de Presentación de Testimonios ([`src/components/testimonials/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/testimonials/)) | ✅ **Completada** | `feat/testimonials-presentation-module-sprint` |
| **Opción 3** | Costura de Presentación Shell & Layout ([`src/components/shell/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/shell/)) | ✅ **Completada** | `feat/shell-presentation-seam-sprint` |
| **Opción 4** | Estandarización de Skeletons y Estados de Carga en Módulos | ✅ **Completada** | `feat/skeletons-presentation-locality-sprint` |

### Ciclo 9: Web Interface Guidelines, Accesibilidad (a11y) y Resiliencia UI (✅ 100% Completado)
| Opción | Módulo / Área | Estado | Prioridad / Rama |
|---|---|---|---|
| **Opción 1** | Respeto a `prefers-reduced-motion` y Purga de `transition-all` | ✅ Completada | `feat/a11y-reduced-motion-transitions-sprint` |
| **Opción 2** | Anclaje Accesible (`scroll-margin-top`) y Anuncios Asíncronos (`aria-live`) | ✅ Completada | `feat/a11y-scroll-margin-aria-live-sprint` |
| **Opción 3** | Resiliencia de Formularios: Alerta de Pérdida de Datos (`beforeunload`) e Higiene de Foco | ✅ Completada | `feat/form-resilience-beforeunload-sprint` |
| **Opción 4** | Pulido Tipográfico y Numérico (`text-balance`, `tabular-nums` y ellipsis) | ✅ Completada | `feat/typography-text-balance-tabular-nums-sprint` |



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

## ⚡ Ciclo 6 — Profundización de Costuras de Protocolo, Presentación y Estado (✅ 100% Completado)

### Opción 1: Profundizar Costura HTTP de Intake y Colapsar Route Handlers (✅ Completada)
**Rama:** `feat/intake-http-seam-sprint`

- [x] **1.1 Diseñar adaptador HTTP en módulo Intake (`src/lib/intake/http-adapter.ts`):** Encapsula el análisis de Content-Type (multipart/form-data y application/json), extracción de CV en Buffer, mapeo de errores de sintaxis a 400 y retorno de respuestas estándar tipadas (`NextResponse`).
- [x] **1.2 Erradicar string-sniffing de rate limit:** Eliminar comprobación frágil `result.message?.startsWith("Too many")` incorporando códigos estructurados (`status: 200 | 400 | 429 | 500` y `failureReason`) en `IntakeResult`.
- [x] **1.3 Colapsar route handlers (`api/apply/route.ts` y `api/contact/route.ts`):** Reducir ambos archivos a delegados limpios de 1-2 líneas que invocan `handleApplicationRequest(req)` y `handleInquiryRequest(req)`.
- [x] **1.4 Contratos de prueba y verificación:** Añadidas 3 pruebas unitarias de contrato en `src/lib/intake/__tests__/intake.test.mjs`, 120/120 unit tests verdes, 0 TS errors, 0 lints, build 18/18 y 18/18 E2E superados.


### Opción 2: Consolidar Módulo de Presentación de About Profile (✅ Completada)
**Rama:** `feat/about-presentation-consolidation-sprint`

- [x] **2.1 Crear costura unificada `AboutView` en `src/components/about/`:** Proporcionar un único módulo de presentación que encapsula la orquestación visual, navegación por secciones y resolución de i18n para el perfil profesional.
- [x] **2.2 Crear barril canónico `src/components/about/index.ts`:** Exponer `AboutView` como punto de entrada de la costura análogo a `src/components/articles/`.
- [x] **2.3 Simplificar `src/app/[locale]/about/page.tsx`:** Colapsar la página de 145 a 30 líneas eliminando la inyección manual de 10 diccionarios y acoplamiento a secciones individuales.
- [x] **2.4 Pruebas y verificación:** Contratos de no-regresión y eliminación de complejidad superficial en `about.test.mjs`. 122/122 unit tests verdes, 0 TS errors, 0 lints, build 18/18 y 18/18 E2E superados.


### Opción 3: Costura de Estado URL para Consultas y Filtros de Empleo (✅ Completada)
**Rama:** `feat/job-query-url-state-sprint`

- [x] **3.1 Crear códec bidireccional de criterios de búsqueda (`src/lib/jobs/query.ts`):** Funciones puras `parseJobQueryCriteria(params)` y `serializeJobQueryCriteria(criteria)` para sincronizar query string con `JobFilterCriteria` y re-exportadas canónicamente desde `@/lib/jobs`.
- [x] **3.2 Conectar `JobFilters` con la URL del navegador:** Soporte para `initialCriteria` procesado en el servidor vía `searchParams` y sincronización client-side vía `window.history.replaceState` garantizando enlaces compartibles, navegación atrás/adelante y persistencia ante recargas.
- [x] **3.3 Pruebas y verificación:** 4 pruebas de contrato y códec añadidas en `query.test.mjs`. 126/126 unit tests verdes, 0 TS errors, 0 lints, build 18/18 y 18/18 E2E superados.


### Opción 4: Metadata Estructurada y Schema.org JSON-LD (✅ Completada)
**Rama:** `feat/structured-metadata-seam-sprint`

- [x] **4.1 Crear constructores tipados de Schema.org en `src/lib/site-config/`:** Generadores fuertemente tipados `buildJobPostingJsonLd(job)`, `buildArticleJsonLd(article)` y `buildWebsiteJsonLd()`. Sanitización anti-XSS con escape de caracteres `<` (`\u003c`) en `serializeJsonLd`.
- [x] **4.2 Crear componente agnóstico `<StructuredData />`:** Renderizado seguro de scripts JSON-LD en `src/components/ui/structured-data.tsx` eliminando `dangerouslySetInnerHTML` crudo en páginas de jobs, articles y home.
- [x] **4.3 Pruebas y verificación:** Validación de esquemas requeridos por motores de búsqueda en suites unitarias (`site-config.test.mjs`). 131/131 pruebas unitarias, 0 TS errors, 0 lints, build 18/18 y 18/18 E2E superados.

---

## 🚀 Ciclo 7 — Módulos Canónicos de Presentación, Sincronización URL e Higiene UI (✅ 100% Completado)

### Opción 1: Consolidar Módulo de Presentación de Jobs (`components/jobs/`) y Colapsar `jobs/[id]/page.tsx` (✅ Completada)
**Rama:** `feat/jobs-presentation-module-sprint`

- [x] **1.1 Crear directorio canónico `src/components/jobs/` con barril `index.ts`:** Reubicados `job-card.tsx`, `job-filters.tsx`, `job-status-badge.tsx`, `apply-toggle.tsx` y `apply-form.tsx` en `src/components/jobs/`, erradicando componentes de presentación sueltos en la raíz de `src/components/` o rutas de `src/app/`.
- [x] **1.2 Crear módulo profundo `JobDetailView`:** Encapsula metadatos, badges, chips de habilidades, formato de fechas, bloque markdown `RichText`, y alternador de formulario de postulación / callout de posición cerrada.
- [x] **1.3 Colapsar `src/app/[locale]/jobs/[id]/page.tsx`:** Reducida la página de 215 a 50 líneas, actuando como coordinador Server Component puro que únicamente obtiene los datos del repositorio y renderiza `<JobDetailView />`.
- [x] **1.4 Contratos de prueba y verificación:** Pruebas unitarias de localidad e interfaz en suite de jobs (`presentation.test.mjs`), 132/132 unit tests verdes, 0 TS errors, 0 lints.

### Opción 2: Costura de Estado URL y Módulo de Presentación para Artículos (`ArticlesView`) (✅ Completada)
**Rama:** `feat/articles-url-state-seam-sprint`

- [x] **2.1 Crear códec bidireccional de categoría en `src/lib/articles/query.ts`:** Funciones `parseArticleQueryCriteria` y `serializeArticleQueryCriteria` re-exportadas canónicamente desde `@/lib/articles`.
- [x] **2.2 Crear `ArticlesView` en `src/components/articles/`:** Reubicado `articles-client.tsx` fuera de `src/app/`, sincronizando URL vía `window.history.replaceState` y soportando navegación `popstate`.
- [x] **2.3 Purificar `src/components/ui/tabs.tsx`:** Eliminado el texto de dominio quemado `aria-label="Filter articles by category"`, haciendo la etiqueta configurable como primitiva accesible neutra.
- [x] **2.4 Pruebas y verificación:** Pruebas unitarias de códec, round-trip y contratos de no-regresión en `articles.test.mjs`, 137/137 tests verdes, 0 TS errors, 0 lints.

### Opción 3: Purificación de Primitivas UI e Higiene de Chrome Layout (✅ Completada)
**Rama:** `feat/ui-primitives-hygiene-sprint`

- [x] **3.1 Reubicar widgets de chrome:** Reubicados `language-switcher.tsx` y `back-to-top.tsx` fuera de `src/components/ui/` hacia `src/components/`, dejando `components/ui/` 100% libre de elementos de navegación o shell.
- [x] **3.2 Generalizar `src/components/ui/accordion.tsx`:** Interfaz pura `AccordionItemData` con `{ title, content }` agnóstica a dominios de negocio, adaptando `faq.tsx` para proyectar sus preguntas a títulos/contenidos.
- [x] **3.3 Limpiar `Navigation` y `ThemeToggle`:** Removido `<TooltipProvider>` inerte en `Navigation`, elevado al layout raíz (`LocaleLayout`), e internacionalizados los tooltips y aria-labels de `ThemeToggle` en español e inglés.
- [x] **3.4 Pruebas y verificación:** Suite de contratos `UI Primitives Purity & Chrome Hygiene Contracts` en `site-config.test.mjs`, 140/140 tests verdes, 0 TS errors, 0 lints.

### Opción 4: Encapsulación de Script de Hidratación de Tema en Root Layout (✅ Completada)
**Rama:** `feat/theme-hydration-seam-sprint`

- [x] **4.1 Crear componente adaptador `<ThemeScript />`:** Creado `src/components/theme-script.tsx` exportando `THEME_INIT_SCRIPT` y componente `<ThemeScript />` con sincronización de `localStorage`, `matchMedia` y manejo resiliente con `try/catch`.
- [x] **4.2 Simplificar `src/app/[locale]/layout.tsx`:** Eliminado `dangerouslySetInnerHTML` crudo en `<head>` e inyectado `<ThemeScript />` de forma declarativa.
- [x] **4.3 Contratos y pruebas:** Validación en `site-config.test.mjs`, 141/141 pruebas unitarias pasando, 0 errores de tipos, 0 lints.

---

## 🚀 Ciclo 8 — Simetría de Presentación, Shell Unificado y Co-ubicación de Skeletons (✅ Completado)

### Opción 1: Módulo Canónico de Presentación de Contacto (`components/contact/`) y Purificación de `contact/page.tsx` (✅ Completada)
**Rama:** `feat/contact-presentation-module-sprint`

- [x] **1.1 Crear directorio canónico `src/components/contact/` y reubicar `contact-form.tsx`:** Trasladado el formulario de cliente fuera de `src/app/[locale]/contact/` hacia `src/components/contact/`, consolidando la localidad del intake de contacto.
- [x] **1.2 Crear barril canónico `src/components/contact/index.ts`:** Expuesta la interfaz canónica `<ContactForm />` y `<ContactView />`, encapsulando estados, validaciones en cliente, hooks y manejo de toasts.
- [x] **1.3 Colapsar `src/app/[locale]/contact/page.tsx`:** Reducida la página a un Server Component declarativo y minimalista (30 líneas) que delega limpiamente en `<ContactView />`.
- [x] **1.4 Contratos de interfaz y suite de pruebas:** Implementados contratos en `intake.test.mjs` que verifican la superficie de exportación y la pureza de la ruta de contacto. 142 tests pasando, 0 errores TS y 0 lints.

### Opción 2: Módulo Canónico de Presentación de Testimonios (`components/testimonials/`) (✅ Completada)
**Rama:** `feat/testimonials-presentation-module-sprint`

- [x] **2.1 Crear directorio canónico `src/components/testimonials/`:** Agrupados `testimonials-section.tsx` y `testimonials-carousel.tsx` en `src/components/testimonials/`.
- [x] **2.2 Crear barril canónico `src/components/testimonials/index.ts`:** Expuestos `TestimonialsSection` y `TestimonialsCarousel` como interfaz pública canónica del módulo.
- [x] **2.3 Actualizar importaciones consumidoras:** Conectado `src/app/[locale]/page.tsx` al barril canónico `@/components/testimonials` utilizando `<TestimonialsSection />`.
- [x] **2.4 Contratos de interfaz y suite de pruebas:** Validados contratos en `testimonials.test.mjs` garantizando la modularidad y purga de archivos sueltos en la raíz de `components/`. 143 tests pasando, 0 errores TS y 0 lints.

### Opción 3: Costura de Presentación Shell & Layout (`components/shell/`) (✅ Completada)
**Rama:** `feat/shell-presentation-seam-sprint`

- [x] **3.1 Crear directorio canónico `src/components/shell/`:** Reubicados los elementos de navegación y chrome (`navigation.tsx`, `footer.tsx`, `language-switcher.tsx`, `theme-toggle.tsx`, `theme-script.tsx`, `theme-provider.tsx`, `back-to-top.tsx`, `skip-link.tsx`).
- [x] **3.2 Crear barril canónico `src/components/shell/index.ts`:** Provisto un punto de entrada unificado y cohesivo para el layout de la aplicación.
- [x] **3.3 Simplificar `src/app/[locale]/layout.tsx`:** Reducida la superficie de acoplamiento de `LocaleLayout` delegando en `@/components/shell` y eliminando boilerplate inlined de `SkipLink`.
- [x] **3.4 Contratos de interfaz y verificación:** Validados contratos en `site-config.test.mjs` que garantizan la purga de componentes de shell sueltos en `components/`. 144 tests pasando, 0 errores TS y 0 lints.

### Opción 4: Estandarización de Skeletons y Estados de Carga en Módulos de Presentación (✅ Completada)
**Rama:** `feat/skeletons-presentation-locality-sprint`

- [x] **4.1 Co-ubicar esqueletos de Jobs:** Creados `src/components/jobs/jobs-skeleton.tsx` y `job-detail-skeleton.tsx`, exportándolos canónicamente desde `@/components/jobs`.
- [x] **4.2 Co-ubicar esqueletos de Articles:** Creados `src/components/articles/articles-skeleton.tsx` y `article-detail-skeleton.tsx`, exportándolos canónicamente desde `@/components/articles`.
- [x] **4.3 Colapsar archivos `loading.tsx` en App Router:** Convertidos `jobs/loading.tsx`, `jobs/[id]/loading.tsx`, `articles/loading.tsx` y `articles/[documentId]/loading.tsx` en adaptadores delgados de una sola línea que re-exportan los esqueletos de sus módulos canónicos.
- [x] **4.4 Contratos y verificación:** Agregados contratos en `presentation.test.mjs` y `articles.test.mjs` garantizando la co-ubicación de esqueletos y la pureza minimalista de los adaptadores de ruta. 146 tests pasando, 0 errores TS y 0 lints.

---

## 🎨 Ciclo 9 — Web Interface Guidelines, Accesibilidad (a11y) y Resiliencia UX (✅ Completado)

### Opción 1: Respeto a `prefers-reduced-motion` y Purga de `transition-all` (✅ Completada)
**Rama:** `feat/a11y-reduced-motion-transitions-sprint`

- [x] **1.1 Reglas globales de movimiento reducido:** Agregada regla `@media (prefers-reduced-motion: reduce)` en `src/app/globals.css` anulando transformaciones, opacidades y transiciones con `!important` para `.reveal-hidden`.
- [x] **1.2 Desactivar animaciones pulsantes y spinners bajo movimiento reducido:** Añadida clase utilitaria `motion-reduce:animate-none` a todos los skeletons (`home-skeletons`, `jobs-skeleton`, `job-detail-skeleton`, `articles-skeleton`, `article-detail-skeleton`) y spinners de envío en formularios (`contact-form.tsx`, `apply-form.tsx`).
- [x] **1.3 Purgar `transition-all` en toda la capa de componentes:** Reemplazado el uso indiscriminado de `transition-all` por propiedades CSS explícitas (`transition-[color,background-color,border-color]`, `transition-transform`, `transition-opacity`, `transition-[transform,opacity]`, etc.) junto a `motion-reduce:transition-none` en `articles/[documentId]/page.tsx`, `about-focus.tsx`, `about-toc.tsx`, `article-card.tsx`, `job-card.tsx`, `testimonials-carousel.tsx`, `ui/card.tsx`, `ui/carousel.tsx` y `ui/toast.tsx`.
- [x] **1.4 Contratos de interfaz y suite de pruebas:** Creada suite en `site-config.test.mjs` que escanea todo `src/` verificando 0 ocurrencias de `transition-all`, cobertura de `prefers-reduced-motion` y protección en esqueletos. 147 tests unitarios pasando, 0 errores de tipos y 0 lints.

### Opción 2: Anclaje Accesible (`scroll-margin-top`) y Anuncios Asíncronos (`aria-live`) (✅ Completada)
**Rama:** `feat/a11y-scroll-margin-aria-live-sprint`

- [x] **2.1 Configurar offset de desplazamiento en anclas (`scroll-mt-24`):** Garantizado que la barra de navegación sticky nunca tape encabezados o secciones al navegar con enlaces internos o SkipLink (`#main-content` en todas las páginas y esqueletos, `#focus`, `#skills`, `#experience`, `#education`, `#certifications`, `#learning` en la página de About).
- [x] **2.2 Anuncios asíncronos y regiones vivas accesibles:** Configurado `type={isSuccess ? "background" : "foreground"}` en `ToastPrimitive.Root` (`aria-live="polite"` vs `assertive`), añadido `aria-live="polite"` en errores de campos de formulario (`FormField`) y configurado `role="status"` + `aria-live="polite"` en el contenedor de éxito de postulación (`ApplyForm`).
- [x] **2.3 Contratos y verificación:** Suite de pruebas en `site-config.test.mjs`, 148 tests unitarios pasando, 0 errores de tipos, 0 lints y build de producción verificado.

### Opción 3: Resiliencia de Formularios (`beforeunload`) e Higiene de Foco (✅ Completada)
**Rama:** `feat/form-resilience-beforeunload-sprint`

- [x] **3.1 Prevención de pérdida accidental de datos:** Añadido detector de estado sucio (`isDirty`, `setIsDirty`, `resetDirty`) y listener de `beforeunload` en `useIntakeForm` que advierte al usuario antes de descartar cambios sin guardar en `contact-form` o `apply-form`. El listener se desactiva limpiamente al enviar con éxito o al resetear el formulario.
- [x] **3.2 Higiene y restauración de foco:** Implementado `focusElement` en `useIntakeForm` para enfocar de forma segura y accesible (`requestAnimationFrame`) el contenedor de confirmación (`role="status"`, `tabIndex={-1}`) tras enviar la postulación, además del enfoque en el primer campo inválido (`focusFirstError`).
- [x] **3.3 Contratos y verificación:** Suite de pruebas en `intake.test.mjs`, 149 tests unitarios pasando, 0 errores de tipos, 0 lints y build de producción verificado.

### Opción 4: Pulido Tipográfico y Numérico (`text-balance`, `tabular-nums`) (✅ Completada)
**Rama:** `feat/typography-text-balance-tabular-nums-sprint`

- [x] **4.1 Balanceo tipográfico de títulos:** Aplicado `text-balance` a encabezados principales `h1` y `h2` en las páginas de inicio (`hero`, `featured-jobs`, `featured-articles`, `testimonials`, `faq`), sobre mí (`about-hero`, `about-focus`, `about-skills`, `about-experience`, `about-education`, `about-certifications`, `about-learning`, `about-cta`), empleos (`jobs/page`, `job-detail-view`, `job-card`), artículos (`articles/page`, `articles/[documentId]`, `article-card`), contacto (`contact-view`) y 404 (`not-found`) para eliminar huérfanos tipográficos.
- [x] **4.2 Alineación numérica tabular:** Aplicado `tabular-nums` en contadores de caracteres (e.g. textarea de postulaciones), fechas (`job-card`, `job-detail-view`, `article-card`, `articles/[documentId]`), estadísticas de impacto (`about-stats`), contador de roles abiertos (`jobs/page`) y badges numéricos.
- [x] **4.3 Contratos y verificación:** Suite de pruebas en `site-config.test.mjs`, 150 tests unitarios pasando, 0 errores de tipos, 0 lints y build de producción verificado.

---


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
