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
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t("heading")}
        </h1>
        <div className="mt-3 mb-6 w-10 h-1 bg-brand rounded-full" />
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          {t("subheading")}
        </p>

        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  {job.isOpen && (
                    <span className="bg-emerald-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                      {t("open")}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500">{job.type}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {job.location}{job.postedAt ? ` · ${job.postedAt}` : ""}
                </p>
              </div>
              <Link
                href={job.applyHref as `/apply/${string}`}
                className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex-shrink-0 ml-4"
              >
                {t("apply")}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-gray-50 dark:bg-gray-900 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {t("noRoleHeading")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
            {t("noRoleDescription")}
          </p>
          <QuickContactDialog />
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}
