import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import HeroCTA from "./hero-cta";
import { getTranslations } from "next-intl/server";

const heroData = siteConfig.hero;

async function Hero() {
  const heroTranslations = await getTranslations("hero");

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[580px] pb-20 pt-20 px-4 overflow-hidden bg-gradient-to-b from-indigo-50/40 via-white to-white dark:from-indigo-950/20 dark:via-background dark:to-background border-b border-gray-100 dark:border-border/60">
      {/* Subtle architectural dot grid pattern (replaces generic blurry orbs) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] dark:bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 dark:opacity-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 flex flex-col items-center">
        {heroData.backgroundImage && (
          <div className="relative w-32 h-32 mb-6 rounded-full ring-4 ring-white dark:ring-surface shadow-xl shadow-indigo-200/40 dark:shadow-indigo-950/40">
            <Image
              src={heroData.backgroundImage}
              alt="Carlos Valderrama"
              fill
              className="rounded-full object-cover"
              sizes="128px"
              priority
            />
          </div>
        )}

        <span className="inline-flex items-center gap-2 bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5 border border-indigo-200/60 dark:border-indigo-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
          {heroTranslations("badge")}
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-950 dark:text-foreground mb-4 leading-tight text-balance">
          {siteConfig.name}
        </h1>
        <p className="text-xl text-gray-500 dark:text-muted-fg max-w-xl leading-relaxed mb-8">
          {heroTranslations("subtitle")}
        </p>

        <div className="mb-8">
          <HeroCTA href={heroData.ctaLink} />
        </div>

        {/* ── Trust indicators (HU-100) ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-medium text-gray-600 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60">
            <span className="text-emerald-500">●</span> {heroTranslations("trustRemote")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60">
            <span className="text-indigo-500">★</span> {heroTranslations("trustVetted")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60">
            <span className="text-blue-500">✓</span> {heroTranslations("trustDirect")}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
