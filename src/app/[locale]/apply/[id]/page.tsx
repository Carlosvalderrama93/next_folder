import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJob } from "@/lib/strapi";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { getTranslations } from "next-intl/server";
import type { JobStatus, JobModality } from "@/types/homepage";
import ApplyForm from "./apply-form";

interface JobData {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: JobStatus;
  skills?: string[];
  modality?: JobModality;
}

const STATUS_BADGE: Record<JobStatus, string> = {
  open: "bg-emerald-500 text-white",
  "on-hold": "bg-amber-400 text-amber-900",
  "final-steps": "bg-indigo-500 text-white",
  filled: "bg-gray-200 dark:bg-surface-raised text-gray-500 dark:text-muted-fg",
  cancelled: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400",
  overstaffed: "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400",
};

const STATUS_KEYS: Record<JobStatus, string> = {
  open: "statusOpen",
  "on-hold": "statusOnHold",
  "final-steps": "statusFinalSteps",
  filled: "statusFilled",
  cancelled: "statusCancelled",
  overstaffed: "statusOverstaffed",
};

const MODALITY_KEYS: Record<JobModality, string> = {
  remote: "modalityRemote",
  hybrid: "modalityHybrid",
  "on-site": "modalityOnSite",
};

const getJob = cache(async function getJob(id: string): Promise<JobData | null> {
  const strapiJob = await fetchStrapiJob(id);
  if (strapiJob) {
    return {
      id: strapiJob.documentId,
      title: strapiJob.title,
      description: strapiJob.description,
      location: strapiJob.location,
      type: strapiJob.jobType,
      status: strapiJob.isOpen ? "open" : "filled",
    };
  }

  const staticJob = homePageData.openPositions.find((j) => j.id === id);
  if (staticJob) {
    return {
      id: staticJob.id,
      title: staticJob.title,
      description: staticJob.description,
      location: staticJob.location,
      type: staticJob.type,
      status: staticJob.status,
      skills: staticJob.skills,
      modality: staticJob.modality,
    };
  }

  return null;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const job = await getJob(id);
  const t = await getTranslations({ locale, namespace: "applyJobPage" });
  if (!job) return { title: t("positionNotFound") };
  return {
    title: `Apply — ${job.title}`,
    description: `Apply for ${job.title} · ${job.location}`,
    openGraph: {
      type: "website",
      title: `Apply — ${job.title}`,
      description: `Apply for ${job.title} · ${job.location}`,
    },
    twitter: {
      card: "summary",
      title: `Apply — ${job.title}`,
      description: `Apply for ${job.title} · ${job.location}`,
    },
  };
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default async function ApplyJobPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const job = await getJob(id);
  const t = await getTranslations({ locale, namespace: "applyJobPage" });

  if (!job) notFound();

  const isOpen = job.status === "open";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    jobLocation: { "@type": "Place", address: job.location },
    employmentType: job.type.toUpperCase().replace(/\s+/g, "_"),
    hiringOrganization: { "@type": "Organization", name: "Carlos Valderrama" },
  };

  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-16">
        <Breadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbPositions"), href: "/apply" },
            { label: job.title },
          ]}
        />

        {/* Job summary card */}
        <div className="border border-gray-200 dark:border-border rounded-2xl overflow-hidden bg-white dark:bg-surface mb-10">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
          <div className="p-6">
            {/* Status + type + modality */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[job.status]}`}>
                {t(STATUS_KEYS[job.status])}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{job.type}</span>
              {job.modality && (
                <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full font-medium">
                  {t(MODALITY_KEYS[job.modality])}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
              {job.title}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <MapPinIcon />
              {job.location}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              {job.description}
            </p>

            {/* Skills chips */}
            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-border">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-gray-100 dark:bg-surface-raised text-gray-600 dark:text-muted-fg px-2.5 py-0.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form or closed state */}
        {isOpen ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("yourApplication")}
            </h2>
            <ApplyForm jobTitle={job.title} jobId={job.id} />
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-14 px-8 rounded-2xl border border-dashed border-gray-200 dark:border-border">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-surface-raised flex items-center justify-center mb-4 text-muted-fg">
              <LockIcon />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t("positionClosed")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-muted-fg mb-6 max-w-xs leading-relaxed">
              {t("positionClosedDesc")}
            </p>
            <Link
              href="/apply"
              className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors"
            >
              {t("viewOpenRoles")}
            </Link>
          </div>
        )}
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
