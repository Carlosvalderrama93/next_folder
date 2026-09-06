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

### Ciclo 3: Shell Persistente en App Router y Centralización de Presentación (🚀 En Curso)
| Opción | Módulo / Área | Estado | Prioridad |
|---|---|---|---|
| **Opción 1** | Shell Persistente en Root Layout ([`src/app/[locale]/layout.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/app/%5Blocale%5D/layout.tsx)) | ✅ **Completada** | `feat/persistent-shell-layout-sprint` |
| **Opción 2** | Costura de Configuración del Sitio ([`src/lib/site-config/`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/lib/site-config/)) | ⚪ Pendiente | Alta |
| **Opción 3** | Componente Canónico `JobStatusBadge` & Presentación ([`src/components/job-status-badge.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/job-status-badge.tsx)) | ⚪ Pendiente | Media |
| **Opción 4** | Descomposición de Bloques de Artículos ([`src/components/article-blocks.tsx`](file:///home/charlie/Documents/Development/RecruiterProjects/recruiter_Page/next_folder/src/components/article-blocks.tsx)) | ⚪ Pendiente | Media |

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

## ⚙️ Opción 2: Costura de Configuración del Sitio & Retiro de `homepage.ts` (⚪ Pendiente)
**Rama:** `feat/site-config-seam-sprint`

### Objetivos
- [ ] **2.1 Crear costura `src/lib/site-config/`:** Definir `types.ts`, `fixtures.ts` e `index.ts` con la configuración canónica (marca, autor, redes sociales, contacto, `NAV_LINKS` canónicos).
- [ ] **2.2 Unificar `NAV_LINKS`:** Consumir los enlaces de navegación canónicos tanto en `Navigation` como en `Footer`.
- [ ] **2.3 Retirar `src/Data/homepage.ts` y `src/types/homepage.ts`:** Eliminar los datos huérfanos residuales (`nav.logo`, enlace roto a `/blog`, placeholders viejos).

---

## 🏷️ Opción 3: Componente Canónico `JobStatusBadge` & Tokens de Presentación (⚪ Pendiente)
**Rama:** `feat/job-status-badge-sprint`

### Objetivos
- [ ] **3.1 Centralizar tokens de estado y modalidad:** Crear `src/components/job-status-badge.tsx` (o `src/lib/jobs/presentation.ts`) para `STATUS_BADGE`, `STATUS_KEYS`, `MODALITY_KEYS` y `PAYMENT_KEYS`.
- [ ] **3.2 Desacoplar `job-card.tsx` y `jobs/[id]/page.tsx`:** Reemplazar las definiciones duplicadas por el nuevo badge canónico.
- [ ] **3.3 Sincronizar filtros:** Alinear `job-filters.tsx` con las constantes de presentación compartidas.

---

## 📰 Opción 4: Descomposición de Bloques de Artículos (⚪ Pendiente)
**Rama:** `feat/article-blocks-sprint`

### Objetivos
- [ ] **4.1 Crear `src/components/article-blocks.tsx`:** Extraer `RichText`, `Quote`, `MediaBlock`, `Slider` y `BlockRenderer`.
- [ ] **4.2 Simplificar `articles/[documentId]/page.tsx`:** Reducir el archivo controlador a menos de 100 líneas limpias de resolución de datos.

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
