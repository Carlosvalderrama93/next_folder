# 🌐 Recruiter & Talent Portal — Next.js 15 + Strapi 5

Plataforma bilingüe (EN/ES) de reclutamiento IT y presentación profesional de talento técnico para conectar ingenieros de software en Latinoamérica con empresas globales.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.25-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Strapi](https://img.shields.io/badge/Strapi-5-purple?style=flat&logo=strapi)](https://strapi.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-162%2F162%20Passing-brightgreen)](package.json)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com)

---

## 🚀 Entornos en Producción (100% Live)

| Servicio | Proveedor | URL / Endpoint | Estado |
|---|---|---|---|
| **Frontend Web** | Vercel (Edge Network) | [https://next-folder-1gnn34hll-carlosvalderrama93s-projects.vercel.app](https://next-folder-1gnn34hll-carlosvalderrama93s-projects.vercel.app) | 🟢 Operativo (HTTP 200) |
| **Backend CMS** | Render (Web Service Node 20) | [https://strapi-back-awqc.onrender.com](https://strapi-back-awqc.onrender.com) | 🟢 Operativo (HTTP 200) |
| **Panel Admin** | Strapi Admin Panel | [https://strapi-back-awqc.onrender.com/admin](https://strapi-back-awqc.onrender.com/admin) | 🟢 Operativo |
| **Base de Datos** | Supabase (PostgreSQL 15) | `aws-0-sa-east-1.pooler.supabase.com:5432` | 🟢 Conectado (IPv4 Pooler) |
| **Notificaciones** | Resend API | Notificación transaccional con CV adjunto | 🟢 Verificado |

---

## 💻 Inicio Rápido (Desarrollo Local)

### 1. Prerrequisitos
- **Node.js**: v20.x o superior.
- **npm**: v10.x o superior.

### 2. Instalación y Configuración

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd next_folder

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno locales
cp .env.example .env.local
```

Editar `.env.local`:
```env
# URL de Strapi (Local o Producción)
STRAPI_URL=https://strapi-back-awqc.onrender.com
# O para desarrollo local si corres Strapi en tu máquina:
# STRAPI_URL=http://localhost:1337

# Correo transaccional de Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=tu_correo@ejemplo.com
RESEND_FROM=onboarding@resend.dev
```

### 3. Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo en http://localhost:3000
npm run dev

# Ejecutar la suite completa de 162 pruebas unitarias
npm test

# Verificación de linter (ESLint 9)
npm run lint

# Verificación estricta de tipos TypeScript
npm run typecheck

# Compilar para producción (Build local)
npm run build
```

---

## 🏗️ Arquitectura y Costuras de Dominio (`src/lib/*`)

El frontend está estructurado mediante el patrón de **Costuras de Dominio (Domain Seams)** para evitar utilidades monolíticas y garantizar resiliencia estática (si Strapi no está disponible, el sistema consume fixtures locales sin romper la interfaz):

- **[`src/lib/jobs/`](docs/ARCHITECTURE.md#21-domain-seams-pattern-srclib)**: Motor de búsqueda, normalizadores de Strapi/estáticos, tokens de estado (6 badges canónicos) y filtros multidimensionales (modalidad, salario, skills).
- **[`src/lib/intake/`](docs/ARCHITECTURE.md#4-candidate-intake--application-pipeline)**: Pipeline de postulación y contacto con validación CSR/SSR, rate-limiting serverless, templates HTML de correo y persistencia dual (Strapi ATS + Resend).
- **[`src/lib/articles/`](docs/ARCHITECTURE.md#21-domain-seams-pattern-srclib)**: Renderizado de bloques dinámicos de Strapi (Rich Text, Quotes, Sliders, Media) y cálculo de tiempo de lectura.
- **[`src/lib/testimonials/`](docs/ARCHITECTURE.md#21-domain-seams-pattern-srclib)**: Adaptador y carrusel de testimonios de clientes y candidatos.
- **[`src/lib/about/`](docs/ARCHITECTURE.md#21-domain-seams-pattern-srclib)**: Biografía bilingüe, matriz de habilidades, línea de tiempo laboral y tabla de contenidos interactiva.
- **[`src/lib/site-config/`](docs/ARCHITECTURE.md#21-domain-seams-pattern-srclib)**: Rutas canónicas, contratos de navegación, enlaces sociales y metadatos JSON-LD estructurados (Schema.org).

---

## 📚 Índice de Documentación (`docs/`)

Para evitar confusiones, la documentación del proyecto se mantiene unificada y organizada:

| Documento | Propósito |
|---|---|
| **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** | **Referencia Técnica Completa**: Diagrama de topología, límites RSC vs Client, internacionalización, pipeline de postulaciones y políticas de calidad. |
| **[docs/PRODUCTION_DEPLOYMENT_GUIDE.md](docs/PRODUCTION_DEPLOYMENT_GUIDE.md)** | **Manual de Producción**: Guía exhaustiva de despliegue en Vercel, Render y Supabase con soluciones a resolución DNS IPv4 y verificación en vivo. |
| **[docs/DYNAMIC_ROLE_FORM_PLAN.md](docs/DYNAMIC_ROLE_FORM_PLAN.md)** | **Plan de Formularios Dinámicos con Gemini**: Flujo para estructurar nuevas vacantes y screening questions con IA gratuita en Strapi y Next.js *(archivo interno ignorado por git)*. |
| **[docs/archive/](docs/archive/)** | **Histórico del Proyecto**: Contiene roadmaps de ciclos anteriores completados (`TODO-ARCHITECTURE.md`, `DEPLOYMENT_STRATEGY.md`, reportes de auditoría). |

---

## 🧪 Calidad, Accesibilidad y Testing

- **162 Pruebas Automatizadas**: 100% pasando con el test runner nativo de Node.js (`npm test`), probando normalizadores, serialización de URLs, contratos de navegación e higiene de componentes.
- **Accesibilidad WCAG 2.1 AA**: Cero declaraciones `transition-all`, soporte riguroso de `prefers-reduced-motion`, alineación de números monoespaciados con `tabular-nums` y balance tipográfico con `text-balance`.
- **Seguridad**: Next.js actualizado a `^15.5.25` con parche para CVEs de Server Actions y variables de entorno protegidas con validación en build.
