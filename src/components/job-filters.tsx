"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import JobCard, { type JobCardProps } from "./job-card";

type Filter = "open" | "all";

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export default function JobFilters({
  jobs,
  labels,
}: {
  jobs: JobCardProps[];
  labels: {
    filterOpen: string;
    filterAll: string;
    noRoleHeading: string;
    noRoleDesc: string;
    getInTouch: string;
  };
}) {
  const openJobs = jobs.filter((j) => j.isOpen);
  const [filter, setFilter] = useState<Filter>(openJobs.length > 0 ? "open" : "all");
  const visible = filter === "open" ? openJobs : jobs;

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-8">
        {(["open", "all"] as Filter[]).map((f) => {
          const count = f === "open" ? openJobs.length : jobs.length;
          const label = f === "open" ? labels.filterOpen : labels.filterAll;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-brand text-white"
                  : "bg-gray-100 dark:bg-surface-raised text-muted-fg hover:bg-gray-200 dark:hover:bg-surface"
              }`}
            >
              {label}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  filter === f
                    ? "bg-white/25 text-white"
                    : "bg-gray-200 dark:bg-surface text-muted-fg"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid or empty state */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16 px-8 rounded-2xl border border-dashed border-gray-200 dark:border-border">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-surface-raised flex items-center justify-center mb-4 text-muted-fg">
            <BriefcaseIcon />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            {labels.noRoleHeading}
          </h3>
          <p className="text-sm text-muted-fg mb-6 max-w-xs leading-relaxed">
            {labels.noRoleDesc}
          </p>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors"
          >
            {labels.getInTouch}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </div>
  );
}
