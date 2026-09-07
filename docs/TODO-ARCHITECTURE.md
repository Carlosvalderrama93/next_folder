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

### Ciclo 4: Pulido Fino, Localidad Absoluta e Higiene UI (🚀 En Curso)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Retiro Definitivo de `src/Data/` y Localidad en About ([`src/lib/about/fixtures.ts`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/about/fixtures.ts)) | ✅ **Completada** | `feat/about-fixtures-locality-sprint` |
| **Opción 2** | Higiene UI y Purga de Clutter Muerto ([`src/components/ui/card.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/ui/card.tsx)) | ⚪ Pendiente | Alta |
| **Opción 3** | Desambiguación de Secciones y Colapso de Módulo Superficial ([`src/components/job.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/job.tsx)) | ⚪ Pendiente | Media |
| **Opción 4** | Consolidación de Configuración CMS ([`src/lib/site-config/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/)) | ⚪ Pendiente | Media |

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
