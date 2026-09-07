"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import JobCard from "./job-card";
import {
  filterJobs,
  serializeJobQueryCriteria,
  ALL_STATUSES,
  ALL_MODALITIES,
  ALL_PAYMENTS,
  STATUS_CHIP_ACTIVE,
  STATUS_PAGE_KEYS,
  MODALITY_KEYS,
  PAYMENT_KEYS,
  type Job,
  type JobStatus,
  type JobModality,
  type JobPaymentType,
  type JobFilterCriteria,
} from "@/lib/jobs";


const CHIP_BASE =
  "text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors whitespace-nowrap";
const CHIP_INACTIVE =
  `${CHIP_BASE} border-gray-200 dark:border-border bg-white dark:bg-surface ` +
  "text-gray-600 dark:text-muted-fg hover:border-brand hover:text-brand";
const FILTER_CHIP_INACTIVE =
  "text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-border " +
  "bg-white dark:bg-surface text-gray-600 dark:text-muted-fg hover:border-brand hover:text-brand transition-colors";
const FILTER_CHIP_ACTIVE =
  "text-sm px-3 py-1 rounded-full border border-brand bg-brand/10 text-brand transition-colors";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XSmallIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function toggle<T>(set: Set<T>, item: T): Set<T> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

export interface JobFiltersProps {
  jobs: Job[];
  initialCriteria?: JobFilterCriteria;
}

export default function JobFilters({ jobs, initialCriteria }: JobFiltersProps) {
  const t = useTranslations("jobsPage");

  const [query, setQuery] = useState(initialCriteria?.query ?? "");
  const [selectedStatuses, setSelectedStatuses] = useState<Set<JobStatus>>(
    () => (initialCriteria?.statuses ? new Set(initialCriteria.statuses) : new Set())
  );
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(
    () => (initialCriteria?.skills ? new Set(initialCriteria.skills) : new Set())
  );
  const [selectedModalities, setSelectedModalities] = useState<Set<JobModality>>(
    () => (initialCriteria?.modalities ? new Set(initialCriteria.modalities) : new Set())
  );
  const [selectedPayments, setSelectedPayments] = useState<Set<JobPaymentType>>(
    () => (initialCriteria?.paymentTypes ? new Set(initialCriteria.paymentTypes) : new Set())
  );
  const [showAdvanced, setShowAdvanced] = useState(
    () =>
      Boolean(
        (initialCriteria?.skills && new Set(initialCriteria.skills).size > 0) ||
        (initialCriteria?.modalities && new Set(initialCriteria.modalities).size > 0) ||
        (initialCriteria?.paymentTypes && new Set(initialCriteria.paymentTypes).size > 0)
      )
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = serializeJobQueryCriteria({
      query,
      statuses: selectedStatuses,
      skills: selectedSkills,
      modalities: selectedModalities,
      paymentTypes: selectedPayments,
    });
    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (newUrl !== currentUrl) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [query, selectedStatuses, selectedSkills, selectedModalities, selectedPayments]);


  const allSkills = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.skills?.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [jobs]);

  const visible = useMemo(() => {
    return filterJobs(jobs, {
      query,
      statuses: selectedStatuses,
      skills: selectedSkills,
      modalities: selectedModalities,
      paymentTypes: selectedPayments,
    });
  }, [jobs, query, selectedStatuses, selectedSkills, selectedModalities, selectedPayments]);

  const totalActiveFilters =
    selectedStatuses.size + selectedSkills.size + selectedModalities.size + selectedPayments.size;
  const hasAnyFilter = query.trim() !== "" || totalActiveFilters > 0;

  function clearAll() {
    setQuery("");
    setSelectedStatuses(new Set());
    setSelectedSkills(new Set());
    setSelectedModalities(new Set());
    setSelectedPayments(new Set());
  }

  const resultKey = visible.length === 1 ? "results_one" : "results_other";

  return (
    <div>
      {/* ── Search bar + filters toggle ── */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-xl text-sm text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
        <button
          onClick={() => setShowAdvanced((v) => !v)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            showAdvanced || totalActiveFilters > 0
              ? "bg-brand/10 border-brand text-brand"
              : "bg-white dark:bg-surface border-gray-200 dark:border-border text-gray-600 dark:text-muted-fg hover:border-brand hover:text-brand"
          }`}
        >
          <SlidersIcon />
          {t("filters")}
          {totalActiveFilters > 0 && (
            <span className="bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold leading-none">
              {totalActiveFilters}
            </span>
          )}
        </button>
      </div>

      {/* ── Status chips (scrollable) ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-none">
        {ALL_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatuses(toggle(selectedStatuses, status))}
            className={
              selectedStatuses.has(status)
                ? `${CHIP_BASE} ${STATUS_CHIP_ACTIVE[status]}`
                : CHIP_INACTIVE
            }
          >
            {t(STATUS_PAGE_KEYS[status])}
          </button>
        ))}
      </div>

      {/* ── Advanced filters panel ── */}
      {showAdvanced && (
        <div className="border border-gray-200 dark:border-border rounded-2xl p-5 mb-6 bg-gray-50 dark:bg-surface space-y-5">
          {/* Skills */}
          {allSkills.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-muted-fg uppercase tracking-wider mb-3">
                {t("skillsLabel")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkills(toggle(selectedSkills, skill))}
                    className={selectedSkills.has(skill) ? FILTER_CHIP_ACTIVE : FILTER_CHIP_INACTIVE}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modality */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-muted-fg uppercase tracking-wider mb-3">
              {t("modalityLabel")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ALL_MODALITIES.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModalities(toggle(selectedModalities, m))}
                  className={selectedModalities.has(m) ? FILTER_CHIP_ACTIVE : FILTER_CHIP_INACTIVE}
                >
                  {t(MODALITY_KEYS[m])}
                </button>
              ))}
            </div>
          </div>

          {/* Payment type */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-muted-fg uppercase tracking-wider mb-3">
              {t("paymentLabel")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ALL_PAYMENTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPayments(toggle(selectedPayments, p))}
                  className={selectedPayments.has(p) ? FILTER_CHIP_ACTIVE : FILTER_CHIP_INACTIVE}
                >
                  {t(PAYMENT_KEYS[p])}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Active filter pills + result count ── */}
      {hasAnyFilter && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-muted-fg">
            {t(resultKey, { count: visible.length })}
          </span>

          {[...selectedStatuses].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatuses(toggle(selectedStatuses, s))}
              className="flex items-center gap-1 text-xs px-2.5 py-1 bg-gray-100 dark:bg-surface-raised rounded-full text-gray-600 dark:text-muted-fg hover:bg-gray-200 dark:hover:bg-surface transition-colors"
            >
              {t(STATUS_PAGE_KEYS[s])} <XSmallIcon />
            </button>
          ))}
          {[...selectedSkills].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSkills(toggle(selectedSkills, s))}
              className="flex items-center gap-1 text-xs px-2.5 py-1 bg-gray-100 dark:bg-surface-raised rounded-full text-gray-600 dark:text-muted-fg hover:bg-gray-200 dark:hover:bg-surface transition-colors"
            >
              {s} <XSmallIcon />
            </button>
          ))}
          {[...selectedModalities].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedModalities(toggle(selectedModalities, m))}
              className="flex items-center gap-1 text-xs px-2.5 py-1 bg-gray-100 dark:bg-surface-raised rounded-full text-gray-600 dark:text-muted-fg hover:bg-gray-200 dark:hover:bg-surface transition-colors"
            >
              {t(MODALITY_KEYS[m])} <XSmallIcon />
            </button>
          ))}
          {[...selectedPayments].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPayments(toggle(selectedPayments, p))}
              className="flex items-center gap-1 text-xs px-2.5 py-1 bg-gray-100 dark:bg-surface-raised rounded-full text-gray-600 dark:text-muted-fg hover:bg-gray-200 dark:hover:bg-surface transition-colors"
            >
              {t(PAYMENT_KEYS[p])} <XSmallIcon />
            </button>
          ))}

          <button
            onClick={clearAll}
            className="text-xs text-brand hover:text-brand-hover font-medium transition-colors"
          >
            {t("clearAll")}
          </button>
        </div>
      )}

      {/* ── Grid or empty state ── */}
      {visible.length === 0 ? (
        hasAnyFilter ? (
          <div className="flex flex-col items-center text-center py-16 px-8 rounded-2xl border border-dashed border-gray-200 dark:border-border">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-surface-raised flex items-center justify-center mb-4 text-muted-fg">
              <SearchIcon />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              {t("noResults")}
            </h3>
            <p className="text-sm text-muted-fg mb-6 max-w-xs leading-relaxed">
              {t("noResultsDesc")}
            </p>
            <button
              onClick={clearAll}
              className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors"
            >
              {t("clearFilters")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-16 px-8 rounded-2xl border border-dashed border-gray-200 dark:border-border">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-surface-raised flex items-center justify-center mb-4 text-muted-fg">
              <BriefcaseIcon />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              {t("noRoleHeading")}
            </h3>
            <p className="text-sm text-muted-fg mb-6 max-w-xs leading-relaxed">
              {t("noRoleDesc")}
            </p>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors"
            >
              {t("getInTouch")}
            </Link>
          </div>
        )
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
