import type { JobStatus, JobModality, JobPaymentType } from "./types";

/**
 * Visual styling tokens for Job Status badges across cards and detail views.
 */
export const STATUS_BADGE_CLASSES: Record<JobStatus, string> = {
  open: "bg-emerald-500 text-white",
  "on-hold": "bg-amber-400 text-amber-900",
  "final-steps": "bg-indigo-500 text-white",
  filled: "bg-gray-200 dark:bg-surface-raised text-gray-500 dark:text-muted-fg",
  cancelled: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400",
  overstaffed:
    "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400",
};

/**
 * Translation key mapping for standard "jobs" namespace (e.g., job cards).
 */
export const STATUS_TRANSLATION_KEYS: Record<JobStatus, string> = {
  open: "open",
  "on-hold": "onHold",
  "final-steps": "finalSteps",
  filled: "filled",
  cancelled: "cancelled",
  overstaffed: "overstaffed",
};

/**
 * Translation key mapping for "jobsPage" and "applyJobPage" namespaces.
 */
export const STATUS_PAGE_KEYS: Record<JobStatus, string> = {
  open: "statusOpen",
  "on-hold": "statusOnHold",
  "final-steps": "statusFinalSteps",
  filled: "statusFilled",
  cancelled: "statusCancelled",
  overstaffed: "statusOverstaffed",
};

/**
 * Translation key mapping for job modality (remote, hybrid, on-site).
 */
export const MODALITY_KEYS: Record<JobModality, string> = {
  remote: "modalityRemote",
  hybrid: "modalityHybrid",
  "on-site": "modalityOnSite",
};

/**
 * Translation key mapping for compensation / payment structure.
 */
export const PAYMENT_KEYS: Record<JobPaymentType, string> = {
  salary: "paymentSalary",
  hourly: "paymentHourly",
  equity: "paymentEquity",
  mixed: "paymentMixed",
};

/**
 * Filter chip active state classes for jobs directory.
 */
export const STATUS_CHIP_ACTIVE: Record<JobStatus, string> = {
  open: "bg-emerald-500 text-white border-emerald-500",
  "on-hold": "bg-amber-400 text-amber-900 border-amber-400",
  "final-steps": "bg-indigo-500 text-white border-indigo-500",
  filled: "bg-gray-500 text-white border-gray-500",
  cancelled: "bg-red-500 text-white border-red-500",
  overstaffed: "bg-orange-500 text-white border-orange-500",
};

/**
 * Set of statuses that indicate non-active recruiting.
 */
export const DIMMED_STATUSES: ReadonlySet<JobStatus> = new Set<JobStatus>([
  "filled",
  "cancelled",
  "overstaffed",
]);

/**
 * Canonical list of all possible job statuses.
 */
export const ALL_STATUSES: readonly JobStatus[] = [
  "open",
  "on-hold",
  "final-steps",
  "filled",
  "cancelled",
  "overstaffed",
] as const;

/**
 * Canonical list of all work modalities.
 */
export const ALL_MODALITIES: readonly JobModality[] = [
  "remote",
  "hybrid",
  "on-site",
] as const;

/**
 * Canonical list of all payment structures.
 */
export const ALL_PAYMENTS: readonly JobPaymentType[] = [
  "salary",
  "hourly",
  "equity",
  "mixed",
] as const;

/**
 * Checks whether a job card or row should be visually dimmed.
 */
export function isJobDimmed(status?: JobStatus, isOpen?: boolean): boolean {
  if (status) {
    return DIMMED_STATUSES.has(status);
  }
  return !(isOpen ?? true);
}
