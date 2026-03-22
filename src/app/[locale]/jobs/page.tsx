import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJobs, getStrapiImageSrc } from "@/lib/strapi";
import JobFilters from "@/components/job-filters";
import type { JobCardProps } from "@/components/job-card";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jobsPage" });
  return {
    title: t("heading"),
    description: "Browse remote and hybrid tech jobs in LATAM. Apply today.",
  };
}

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jobsPage" });

  const strapiJobs = await fetchStrapiJobs();
  const staticPositions = homePageData.openPositions;
  const footerData = homePageData.footer;

  const jobs: JobCardProps[] =
    strapiJobs.length > 0
      ? strapiJobs.map((job) => ({
          id: job.documentId,
          title: job.title,
          description: job.description,
          location: job.location,
          type: job.jobType,
          isOpen: job.isOpen,
          applyHref: `/apply/${job.documentId}`,
          imageUrl: job.image ? getStrapiImageSrc(job.image.url) : undefined,
          imageAlt: job.image?.alternativeText,
        }))
      : staticPositions.map((job) => ({
          id: job.id,
          title: job.title,
          description: job.description,
          location: job.location,
          type: job.type,
          postedAt: job.postedAt,
          isOpen: true,
          applyHref: `/apply/${job.id}`,
          imageUrl: job.image ?? undefined,
        }));

  const countKey = jobs.length === 1 ? "available_one" : "available_other";

  return (
    <>
      <Navigation />

      {/* ── Gradient hero header ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white dark:from-indigo-950/30 dark:via-background dark:to-background pt-16 pb-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-900/15 blur-3xl" />
          <div className="absolute top-12 -left-16 w-64 h-64 rounded-full bg-violet-200/20 dark:bg-violet-900/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t("heading")}
          </h1>
          <div className="mt-3 mb-4 w-10 h-1 bg-brand rounded-full" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t(countKey, { count: jobs.length })}
          </p>
        </div>
      </section>

      {/* ── Job list ──────────────────────────────────────────── */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-10 pb-20">
        <JobFilters
          jobs={jobs}
          labels={{
            filterOpen: t("filterOpen"),
            filterAll: t("filterAll"),
            noRoleHeading: t("noRoleHeading"),
            noRoleDesc: t("noRoleDesc"),
            getInTouch: t("getInTouch"),
          }}
        />
      </main>

      <Footer {...footerData} />
    </>
  );
}
