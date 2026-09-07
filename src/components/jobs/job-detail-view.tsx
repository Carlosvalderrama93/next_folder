import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RichText } from "@/components/ui/rich-text";
import {
  STATUS_PAGE_KEYS,
  MODALITY_KEYS,
  PAYMENT_KEYS,
  type Job,
} from "@/lib/jobs";
import JobStatusBadge from "./job-status-badge";
import { ApplyToggle } from "./apply-toggle";
import { getTranslations } from "next-intl/server";

export interface JobDetailViewProps {
  job: Job;
  locale: string;
}

function MapPinIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/**
 * Deep presentation module for a single job posting.
 * Encapsulates breadcrumbs, status tokens, metadata chips,
 * skills list, markdown description adapter, and application toggle / closed states.
 */
export async function JobDetailView({ job, locale }: JobDetailViewProps) {
  const t = await getTranslations({ locale, namespace: "applyJobPage" });
  const isOpen = job.status === "open";

  const formattedDate = job.postedAt
    ? new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(job.postedAt))
    : null;

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-10 pb-20 scroll-mt-24">
      <Breadcrumb
        items={[
          { label: t("breadcrumbHome"), href: "/" },
          { label: t("breadcrumbPositions"), href: "/jobs" },
          { label: job.title },
        ]}
      />

      {/* Header section */}
      <div className="mt-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <JobStatusBadge
                status={job.status}
                isOpen={isOpen}
                size="md"
                label={t(STATUS_PAGE_KEYS[job.status])}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {job.type}
              </span>
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

      {/* Job description prose */}
      <div className="mt-10 pt-10 border-t border-gray-200 dark:border-border">
        <RichText content={job.description} />
      </div>

      {/* Application section */}
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
  );
}
