"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import ApplyForm from "./apply-form";

interface Props {
  jobTitle: string;
  jobId: string;
}

export function ApplyToggle({ jobTitle, jobId }: Props) {
  const [showForm, setShowForm] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("applyJobPage");

  function handleApply() {
    setShowForm(true);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div ref={sectionRef}>
      {!showForm ? (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-border bg-white dark:bg-surface p-8 text-center">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {t("yourApplication")}
          </h2>
          <button
            onClick={handleApply}
            className="inline-flex items-center gap-2 px-10 py-4 bg-brand hover:bg-brand-hover text-white rounded-full text-base font-semibold transition-colors shadow-sm"
          >
            {t("applyForRole")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("yourApplication")}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-muted-fg hover:text-gray-700 dark:hover:text-foreground transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {t("backToJob")}
            </button>
          </div>
          <ApplyForm jobTitle={jobTitle} jobId={jobId} />
        </>
      )}
    </div>
  );
}
