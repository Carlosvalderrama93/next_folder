"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  STATUS_BADGE_CLASSES,
  STATUS_TRANSLATION_KEYS,
  type JobStatus,
} from "@/lib/jobs";

export interface JobStatusBadgeProps {
  status?: JobStatus;
  isOpen?: boolean;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Canonical visual status badge for jobs across cards, list items, and detail views.
 */
export default function JobStatusBadge({
  status,
  isOpen,
  label,
  size = "sm",
  className = "",
}: JobStatusBadgeProps) {
  const t = useTranslations("jobs");

  const sizeClasses = size === "md" ? "px-3 py-1" : "px-2.5 py-0.5";

  let colorClasses = "bg-emerald-500 text-white";
  let fallbackKey = "open";

  if (status && STATUS_BADGE_CLASSES[status]) {
    colorClasses = STATUS_BADGE_CLASSES[status];
    fallbackKey = STATUS_TRANSLATION_KEYS[status] ?? "open";
  } else if (isOpen === false) {
    colorClasses =
      "bg-gray-200 dark:bg-surface-raised text-gray-500 dark:text-muted-fg";
    fallbackKey = "closed";
  }

  const displayText = label ?? t(fallbackKey);

  return (
    <span
      className={`inline-flex items-center rounded-full text-xs font-semibold ${sizeClasses} ${colorClasses} ${className}`.trim()}
    >
      {displayText}
    </span>
  );
}
