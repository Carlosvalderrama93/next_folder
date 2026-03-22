import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "@/i18n/navigation";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJobs } from "@/lib/strapi";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { QuickContactDialog } from "./quick-contact-dialog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "applyPage" });
  return {
    title: t("heading"),
    description: "Browse and apply for open tech positions. Remote jobs for LATAM talent.",
  };
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function formatDate(dateStr: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

interface JobRow {
  id: string;
  title: string;
  location: string;
  type: string;
  postedAt?: string;
  isOpen: boolean;
  applyHref: string;
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "applyPage" });

  const strapiJobs = await fetchStrapiJobs();
  const { openPositions, footer } = homePageData;

  const jobs: JobRow[] =
    strapiJobs.length > 0
      ? strapiJobs.map((job) => ({
          id: job.documentId,
          title: job.title,
          location: job.location,
          type: job.jobType,
          isOpen: job.isOpen,
          applyHref: `/apply/${job.documentId}`,
        }))
      : openPositions.map((job) => ({
          id: job.id,
          title: job.title,
          location: job.location,
          type: job.type,
          postedAt: job.postedAt,
          isOpen: true,
          applyHref: `/apply/${job.id}`,
        }));

  return (
    <>
      <Navigation />

      <section className="bg-gradient-to-b from-indigo-50/60 via-white to-white dark:from-indigo-950/30 dark:via-background dark:to-background pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t("heading")}
          </h1>
          <div className="mt-3 mb-4 w-10 h-1 bg-brand rounded-full" />
          <p className="text-gray-500 dark:text-muted-fg">{t("subheading")}</p>
        </div>
      </section>

      <main id="main-content" className="max-w-4xl mx-auto px-4 py-10 pb-20">
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="relative flex items-center justify-between border border-gray-200 dark:border-border rounded-2xl p-6 bg-white dark:bg-surface hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  {job.isOpen && (
                    <span className="bg-emerald-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                      {t("open")}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-muted-fg">{job.type}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  <Link
                    href={job.applyHref as `/apply/${string}`}
                    className="before:content-[''] before:absolute before:inset-0 focus:outline-none"
                  >
                    {job.title}
                  </Link>
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-muted-fg">
                  <span className="flex items-center gap-1">
                    <MapPinIcon />
                    {job.location}
                  </span>
                  {job.postedAt && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon />
                        {formatDate(job.postedAt, locale)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <Link
                href={job.applyHref as `/apply/${string}`}
                className="relative z-10 px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors flex-shrink-0 ml-4"
              >
                {t("apply")}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-gray-200 dark:border-border rounded-2xl p-8 bg-gray-50 dark:bg-surface text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {t("noRoleHeading")}
          </h2>
          <p className="text-gray-500 dark:text-muted-fg text-sm mb-5">
            {t("noRoleDescription")}
          </p>
          <QuickContactDialog />
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}
