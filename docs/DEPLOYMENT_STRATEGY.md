# 🌐 Estrategia de Despliegue a Producción — Plataforma de Reclutamiento

Guía arquitectónica y paso a paso para desplegar la solución completa:
**Frontend Next.js 15.5** + **Backend Headless Strapi 5 (TypeScript)** + **PostgreSQL** + **Upstash Redis** + **Resend Email**.

---

## 🗺️ 1. Topología de Arquitectura en Producción

```
                          ┌─────────────────────────────┐
                          │   DNS / Cloudflare CDN      │
                          │   midominio.com / www       │
                          └──────────────┬──────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │ HTTPS (Edge SSL)                              │ HTTPS (Edge SSL)
                 ▼                                               ▼
   ┌───────────────────────────┐                   ┌───────────────────────────┐
   │    Vercel (Frontend)      │                   │  Render / Railway / Fly   │
   │  Next.js 15.5 App Router  │                   │      Strapi 5 (Node 20)   │
   │  - SSR / SSG / Edge CDN   │                   │  - Headless CMS API       │
   │  - Static Prerender 18/18 │                   │  - Admin Dashboard        │
   │  - Route Handlers /api/*  │                   │  - Persistent Web Process │
   │  - Next-Intl (ES/EN)      │                   │  - Document Service       │
   └─────────────┬─────────────┘                   └─────────────┬─────────────┘
                 │                                               │
                 │ Server-to-Server API (REST)                   │ Connection Pool
                 ├───────────────────────────────────────────────┤
                 │                                               │
                 ▼                                               ▼
   ┌───────────────────────────┐                   ┌───────────────────────────┐
   │  Upstash Redis / Vercel KV│                   │   Managed PostgreSQL      │
   │  - REST Rate Limiter      │                   │   (Neon / Supabase /      │
   │  - Sliding window 5/min   │                   │    Render Postgres)       │
   │  - Serverless resilient   │                   │   - Jobs, Articles        │
   └───────────────────────────┘                   │   - Applications, Inquiries│
                                                   │   - FAQs, Testimonials    │
                                                   └─────────────┬─────────────┘
                                                                 │
                                                   ┌─────────────┴─────────────┐
                                                   │  Media Storage (R2 / S3)  │
                                                   │  - Cloudflare R2 / AWS S3 │
                                                   │  - Uploads & CV assets    │
                                                   └───────────────────────────┘
```

---

## 💰 2. Comparativa de Opciones de Despliegue

| Opción | Frontend | Backend | Base de Datos | Costo Aprox. | Ventajas / Recomendación |
|---|---|---|---|---|---|
| **Estrategia A (Free Tier)** | Vercel (Hobby) | Render (Free Web Service) | Neon Postgres (Free 0.5GB) | **$0 / mes** | **Ideal para testing y demos.** Render entra en sleep tras 15 min de inactividad (cold start ~40s en el primer request si Strapi se apaga). |
| **Estrategia B (Producción Recomendada)** | Vercel (Hobby o Pro) | Render Starter ($7/mes) o Railway ($5/mes) | Neon Postgres ($0) o Render Postgres ($7) | **~$7 - $14 / mes** | **100% Siempre activo.** Sin cold-starts, backups automáticos, SSL managed, cero fricción operativa. |
| **Estrategia C (VPS Todo-en-Uno)** | Hetzner / DigitalOcean (Docker) | Mismo VPS | PostgreSQL en Docker | **~$5 / mes** | Control total con Coolify o Docker Compose. Requiere mantenimiento de parches y servidor Linux. |

---

## 📋 3. Matriz de Variables de Entorno

### A. Frontend Next.js (`next_folder`)

| Variable | Requerida | Valor en Producción | Propósito |
|---|---|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | Sí | `https://api.tudominio.com` (o URL de Render) | Endpoint base para consultar vacantes, artículos, testimonios y FAQs. |
| `NEXT_PUBLIC_SITE_URL` | Sí | `https://www.tudominio.com` | Dominio canónico para sitemap.xml, robots.txt y OpenGraph. |
| `UPSTASH_REDIS_REST_URL` | Opcional | `https://xxx.upstash.io` | URL REST de Redis para rate limiting distribuido serverless. |
| `UPSTASH_REDIS_REST_TOKEN`| Opcional | `AXxx...` | Token de autenticación de Upstash Redis. |
| `RESEND_API_KEY` | Sí | `re_123456789...` | Envío de notificaciones transaccionales al recibir CVs y consultas. |
| `NOTIFICATION_EMAIL` | Sí | `reclutamiento@tudominio.com` | Buzón receptor de las alertas de postulaciones. |

### B. Backend Strapi CMS (`strapi_folder`)

| Variable | Requerida | Valor en Producción | Propósito |
|---|---|---|---|
| `NODE_ENV` | Sí | `production` | Activa optimizaciones de producción de Strapi. |
| `HOST` | Sí | `0.0.0.0` | Permite que el contenedor escuche conexiones externas. |
| `PORT` | Sí | `10000` (o `$PORT` asignado por Render/Railway) | Puerto del servidor HTTP. |
| `DATABASE_CLIENT` | Sí | `postgres` | Activa el cliente relacional PostgreSQL. |
| `DATABASE_URL` | Sí | `postgresql://user:pass@host:5432/dbname` | String de conexión con SSL gestionado. |
| `DATABASE_SSL` | Sí | `true` | Exige conexión cifrada TLS con la base de datos. |
| `APP_KEYS` | Sí | Generar 4 llaves en base64 (`openssl rand -base64 32`) | Cifrado de cookies y sesiones. |
| `API_TOKEN_SALT` | Sí | Generar con `openssl rand -base64 32` | Hash de tokens de API. |
| `ADMIN_JWT_SECRET` | Sí | Generar con `openssl rand -base64 32` | Firma de tokens del panel admin. |
| `JWT_SECRET` | Sí | Generar con `openssl rand -base64 32` | Firma de tokens de usuarios. |
| `TRANSFER_TOKEN_SALT`| Sí | Generar con `openssl rand -base64 32` | Importación y transferencia de contenido. |

---

## 🚀 4. Guía Paso a Paso para Desplegar

### Paso 1: Crear la Base de Datos PostgreSQL
1. Crea una cuenta en [Neon](https://neon.tech) (Serverless Postgres gratuito) o [Supabase](https://supabase.com).
2. Crea un nuevo proyecto llamado `recruiter-db`.
3. Copia el **Connection String** (ej. `postgresql://alex:AbCd123@ep-cool-fog.us-east-2.aws.neon.tech/recruiter?sslmode=require`).

---

### Paso 2: Desplegar el Backend Strapi en Render
1. Conecta tu repositorio de GitHub a [Render](https://dashboard.render.com).
2. Crea un nuevo **Web Service**:
   - **Root Directory**: `strapi_folder`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: Starter ($7/mes) o Free.
3. En la sección **Environment Variables**, añade las variables listadas en la sección 3.B:
   - `DATABASE_CLIENT` = `postgres`
   - `DATABASE_URL` = (tu connection string de Neon)
   - `DATABASE_SSL` = `true`
   - `NODE_ENV` = `production`
   - Llaves secretas (`APP_KEYS`, `JWT_SECRET`, etc.).
4. Haz clic en **Create Web Service**.
5. Una vez finalizado el build, abre la terminal Shell en Render y ejecuta la siembra inicial de datos:
   ```bash
   npm run seed
   npm run publish:all
   ```
6. Tu Strapi estará disponible en: `https://recruiter-strapi.onrender.com`. Verifica abriendo `https://recruiter-strapi.onrender.com/api/jobs`.

---

### Paso 3: Desplegar el Frontend Next.js en Vercel
1. Ingresa a [Vercel](https://vercel.com) y selecciona **Add New Project**.
2. Selecciona tu repositorio de GitHub:
   - **Root Directory**: `next_folder`
   - **Framework Preset**: `Next.js`
3. En **Environment Variables**, configura:
   - `NEXT_PUBLIC_STRAPI_URL` = `https://recruiter-strapi.onrender.com`
   - `NEXT_PUBLIC_SITE_URL` = `https://tudominio.vercel.app`
   - `RESEND_API_KEY` = `re_...`
   - `NOTIFICATION_EMAIL` = `tu-correo@empresa.com`
   - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` (si configuraste Upstash).
4. Haz clic en **Deploy**.
5. Vercel ejecutará:
   - `npm ci`
   - `next build` (pre-renderizando las 18 páginas estáticas con los datos en vivo de Strapi).
   - Generación de Edge Middleware y Serverless Functions para `/api/apply` y `/api/contact`.

---

### Paso 4: Pruebas de Humo en Producción (Smoke Test)
Una vez desplegados ambos servicios:
1. **Navegación y Catálogo**: Abre `https://tudominio.com/es/jobs` y confirma que liste las vacantes reales desde Strapi.
2. **Postulación con CV**: Aplica a una vacante adjuntando un CV de prueba.
   - Confirma que el Stepper avance de Paso 1 a Paso 3.
   - Al enviar, confirma que aparezca el Timeline visual (*Recibida -> En revisión*).
   - Verifica en el panel de Strapi (`/admin/content-manager/collectionType/api::application.application`) que el registro se haya guardado con status `received`.
   - Verifica en tu buzón de correo la llegada de la notificación vía Resend con el archivo adjunto.
3. **Formulario de Contacto**: Envía un mensaje desde `/es/contact` y valida que se registre en `/admin/content-manager/collectionType/api::inquiry.inquiry`.

---

## 🔒 5. Políticas de Resiliencia y Fallback Activas

La arquitectura implementada cuenta con garantías automáticas para entornos de producción:
- **Tolerancia a Caídas de Strapi**: Si el backend entra en mantenimiento o experimenta alta latencia, Next.js no arroja pantallas de error `500`; degrada de inmediato a los fixtures estáticos de `src/lib/jobs/fixtures.ts` y `src/lib/articles/fixtures.ts`.
- **Doble Vía de Intake**: Si Strapi estuviese inaccesible momentáneamente durante una postulación, el adaptador envía el email transaccional vía Resend sin interrumpir la experiencia del candidato (`ok: true`), registrando el incidente en logs sin bloquear el flujo.
- **Doble Capa de Rate Limiter**: El rate limiter serverless conmuta automáticamente al almacén en memoria si Upstash Redis no responde dentro del timeout de 1500ms.
