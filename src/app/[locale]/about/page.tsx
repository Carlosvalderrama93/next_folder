import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { homePageData } from "@/Data/homepage";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return {
    title: "About",
    description: t("description"),
  };
}

function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const { about, footer } = homePageData;

  const stats = [
    { value: "50+", label: t("companiesPartnered") },
    { value: "200+", label: t("placementsMade") },
    { value: "100%", label: t("remoteFocus") },
  ];

  const specializations = [
    { icon: <CodeIcon />, title: t("spec1Title"), desc: t("spec1Desc") },
    { icon: <RouteIcon />, title: t("spec2Title"), desc: t("spec2Desc") },
    { icon: <CheckIcon />, title: t("spec3Title"), desc: t("spec3Desc") },
  ];

  return (
    <>
      <Navigation />
      <main id="main-content">

        {/* ── Hero intro ───────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center">
            {about.image && (
              <div className="relative w-44 h-44 flex-shrink-0 rounded-full ring-4 ring-brand/20 shadow-xl overflow-hidden">
                <Image
                  src={about.image}
                  alt="Carlos Valderrama"
                  fill
                  className="object-cover"
                  sizes="176px"
                  priority
                />
              </div>
            )}
            <div>
              <span className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 border border-indigo-200/60 dark:border-indigo-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                {t("badge")}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {t("heading")}
              </h1>
              <div className="w-10 h-1 bg-brand rounded-full mb-5" />
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </section>

        {/* ── Stats band ───────────────────────────────────── */}
        <section className="bg-surface dark:bg-surface border-y border-border dark:border-border">
          <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-px">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-8 px-6 text-center">
                <span className="text-5xl font-extrabold text-brand mb-2">{stat.value}</span>
                <span className="text-sm font-medium text-muted-fg">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Specialization grid ──────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {t("specializationHeading")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {specializations.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface hover:border-brand/40 dark:hover:border-brand/40 transition-colors"
              >
                <div className="text-brand mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-muted-fg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t("ctaHeading")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/apply"
              className="px-6 py-3 bg-brand text-white rounded-full font-semibold hover:bg-brand-hover transition-colors text-sm"
            >
              {t("ctaPositions")}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-300 dark:border-border text-gray-700 dark:text-foreground rounded-full font-semibold hover:border-brand dark:hover:border-brand hover:text-brand dark:hover:text-brand transition-colors text-sm"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </section>

      </main>
      <Footer {...footer} />
    </>
  );
}
