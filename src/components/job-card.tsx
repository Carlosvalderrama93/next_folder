import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { JobStatus, JobModality, JobPaymentType } from "@/types/homepage";

export interface JobCardProps {
  id: string;
  title: string;
  description: string;
  location?: string;
  type?: string;
  status?: JobStatus;
  skills?: string[];
  modality?: JobModality;
  paymentType?: JobPaymentType;
  postedAt?: string;
  /** Legacy fallback when status is not provided */
  isOpen?: boolean;
  applyHref: string;
  imageUrl?: string;
  imageAlt?: string;
}

const STATUS_KEYS: Record<JobStatus, string> = {
  open: "open",
  "on-hold": "onHold",
  "final-steps": "finalSteps",
  filled: "filled",
  cancelled: "cancelled",
  overstaffed: "overstaffed",
};

const STATUS_BADGE: Record<JobStatus, string> = {
  open: "bg-emerald-500 text-white",
  "on-hold": "bg-amber-400 text-amber-900",
  "final-steps": "bg-indigo-500 text-white",
  filled: "bg-gray-200 dark:bg-surface-raised text-gray-500 dark:text-muted-fg",
  cancelled: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400",
  overstaffed:
    "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400",
};

const DIMMED_STATUSES = new Set<JobStatus>([
  "filled",
  "cancelled",
  "overstaffed",
]);

function MapPinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

import Card from "@/components/ui/card";

export default function JobCard({
  title,
  description,
  location,
  type,
  status,
  skills,
  postedAt,
  isOpen,
  applyHref,
  imageUrl,
  imageAlt,
}: JobCardProps) {
  const jobsTranslations = useTranslations("jobs");
  const locale = useLocale();

  const formattedDate = postedAt
    ? new Intl.DateTimeFormat(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(postedAt))
    : null;

  const isEffectivelyOpen = status ? status === "open" : (isOpen ?? true);
  const isDimmed = status ? DIMMED_STATUSES.has(status) : !isEffectivelyOpen;

  const badgeEl = status ? (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[status]}`}
    >
      {jobsTranslations(STATUS_KEYS[status])}
    </span>
  ) : isEffectivelyOpen ? (
    <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
      {jobsTranslations("open")}
    </span>
  ) : (
    <span className="bg-gray-200 dark:bg-surface-raised text-gray-500 dark:text-muted-fg px-2.5 py-0.5 rounded-full text-xs font-semibold">
      {jobsTranslations("closed")}
    </span>
  );

  const visibleSkills = skills?.slice(0, 3) ?? [];
  const extraSkills = (skills?.length ?? 0) - visibleSkills.length;

  return (
    <Card
      variant="job"
      className={`group relative flex flex-col transition-all duration-200 hover:border-brand/30 dark:hover:border-brand/30 hover:shadow-md${isDimmed ? " opacity-60" : ""}`}
    >
      {/* Body */}
      <div className="p-5 flex-1">
        {/* Top row: badges + optional thumbnail */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {badgeEl}
            {type && (
              <span className="text-xs text-muted-fg bg-gray-100 dark:bg-surface-raised px-2.5 py-0.5 rounded-full">
                {type}
              </span>
            )}
          </div>
          {imageUrl && (
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-border">
              <Image
                src={imageUrl}
                alt={imageAlt ?? title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}
        </div>

        {/* Title — ::before makes full card clickable */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-foreground mb-2 group-hover:text-brand transition-colors">
          <Link
            href={applyHref as `/${string}`}
            className="before:content-[''] before:absolute before:inset-0 focus:outline-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:rounded-2xl"
          >
            {title}
          </Link>
        </h2>

        <p className="text-sm text-muted-fg leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Skills chips */}
        {visibleSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="text-xs bg-gray-100 dark:bg-surface-raised text-gray-600 dark:text-muted-fg px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
            {extraSkills > 0 && (
              <span className="text-xs text-muted-fg self-center">
                +{extraSkills}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-fg">
          {location && (
            <span className="flex items-center gap-1">
              <MapPinIcon />
              {location}
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-1">
              <CalendarIcon />
              {formattedDate}
            </span>
          )}
        </div>
        {isEffectivelyOpen ? (
          <Link
            href={applyHref as `/${string}`}
            className="relative z-10 shrink-0 px-4 py-2 bg-brand text-white rounded-full text-xs font-semibold hover:bg-brand-hover transition-colors"
          >
            {jobsTranslations("applyNow")}
          </Link>
        ) : (
          <span className="shrink-0 px-4 py-2 bg-gray-100 dark:bg-surface-raised text-muted-fg rounded-full text-xs font-semibold cursor-not-allowed">
            {status
              ? jobsTranslations(STATUS_KEYS[status])
              : jobsTranslations("closed")}
          </span>
        )}
      </div>
    </Card>
  );
}
