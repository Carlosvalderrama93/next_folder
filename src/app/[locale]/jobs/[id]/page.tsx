import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getJob } from "@/lib/jobs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { JobStatus, JobModality, JobPaymentType } from "@/types/homepage";
import Image from "next/image";
import { ApplyToggle } from "./apply-toggle";

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

const PAYMENT_KEYS: Record<JobPaymentType, string> = {
  salary: "paymentSalary",
  hourly: "paymentHourly",
  equity: "paymentEquity",
  mixed: "paymentMixed",
};

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

  const formattedDate = job.postedAt
    ? new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(job.postedAt))
    : null;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-10 pb-20">
        <Breadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbPositions"), href: "/jobs" },
            { label: job.title },
          ]}
        />

        {/* Open header — no card border */}
        <div className="mt-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[job.status]}`}>
                  {t(STATUS_KEYS[job.status])}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{job.type}</span>
                {job.modality && (
                  <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full font-medium">
                    {t(MODALITY_KEYS[job.modality])}
                  </span>
                )}
                {job.paymentType && (
                  <span className="text-xs bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 px-2.5 py-1 rounded-full font-medium">
                    {t(PAYMENT_KEYS[job.paymentType])}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon />
                  {job.location}
                </span>
                {formattedDate && (
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    {t("postedOn", { date: formattedDate })}
                  </span>
                )}
              </div>
            </div>

            {/* Company image */}
            {job.imageUrl && (
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-border shadow-sm">
                <Image
                  src={job.imageUrl}
                  alt={job.imageAlt ?? job.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
          </div>

          {/* Skills chips */}
          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-gray-100 dark:bg-surface-raised text-gray-700 dark:text-muted-fg px-3 py-1 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Job description — open prose */}
        <div className="mt-10 pt-10 border-t border-gray-200 dark:border-border">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{job.description}</ReactMarkdown>
          </div>
        </div>

        {/* Apply section */}
        <div className="mt-12 pt-10 border-t border-gray-200 dark:border-border">
          {isOpen ? (
            <ApplyToggle jobTitle={job.title} jobId={job.id} />
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
                href="/jobs"
                className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors"
              >
                {t("viewOpenRoles")}
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
