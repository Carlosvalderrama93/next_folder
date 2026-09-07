import type {
  Job,
  JobFilterCriteria,
  JobStatus,
  JobModality,
  JobPaymentType,
} from "./types";

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function toSet<T>(collection?: Set<T> | T[]): Set<T> | null {
  if (!collection) return null;
  if (collection instanceof Set) {
    return collection.size > 0 ? collection : null;
  }
  return collection.length > 0 ? new Set(collection) : null;
}

/**
 * Filter a list of jobs according to search keywords and multi-criteria filters.
 *
 * Operates purely in-memory behind the Job module seam, enabling instant
 * client-side reactivity as well as zero-overhead automated unit testing.
 */
export function filterJobs(jobs: Job[], criteria?: JobFilterCriteria): Job[] {
  if (!criteria) return jobs;

  const rawQuery = criteria.query?.trim();
  const queryTokens = rawQuery ? normalizeText(rawQuery).split(/\s+/).filter(Boolean) : [];

  const statusSet = toSet<JobStatus>(criteria.statuses);
  const skillSet = toSet<string>(criteria.skills);
  const normalizedSkillTokens = skillSet
    ? new Set(Array.from(skillSet).map((s) => normalizeText(s)))
    : null;

  const modalitySet = toSet<JobModality>(criteria.modalities);
  const paymentSet = toSet<JobPaymentType>(criteria.paymentTypes);

  return jobs.filter((job) => {
    // 1. Text search across title, description, skills, location, modality, and type
    if (queryTokens.length > 0) {
      const normalizedTitle = normalizeText(job.title || "");
      const normalizedDesc = normalizeText(job.description || "");
      const normalizedLocation = normalizeText(job.location || "");
      const normalizedModality = normalizeText(job.modality || "");
      const normalizedType = normalizeText(job.type || "");
      const normalizedSkills = (job.skills || []).map((s) => normalizeText(s));

      const matchesAllTokens = queryTokens.every((token) => {
        return (
          normalizedTitle.includes(token) ||
          normalizedDesc.includes(token) ||
          normalizedLocation.includes(token) ||
          normalizedModality.includes(token) ||
          normalizedType.includes(token) ||
          normalizedSkills.some((s) => s.includes(token))
        );
      });

      if (!matchesAllTokens) return false;
    }

    // 2. Status filter
    if (statusSet) {
      if (!job.status || !statusSet.has(job.status)) {
        return false;
      }
    }

    // 3. Skills filter (at least one selected skill must match)
    if (normalizedSkillTokens) {
      const jobSkillsNormalized = (job.skills || []).map((s) => normalizeText(s));
      const hasMatchingSkill = jobSkillsNormalized.some((js) =>
        normalizedSkillTokens.has(js)
      );
      if (!hasMatchingSkill) return false;
    }

    // 4. Modality filter
    if (modalitySet) {
      if (!job.modality || !modalitySet.has(job.modality)) {
        return false;
      }
    }

    // 5. Payment type filter
    if (paymentSet) {
      if (!job.paymentType || !paymentSet.has(job.paymentType)) {
        return false;
      }
    }

    return true;
  });
}

export type RawSearchParams =
  | URLSearchParams
  | Record<string, string | string[] | undefined>;

/**
 * Parses URL search parameters or Next.js searchParams dictionary into validated JobFilterCriteria.
 */
export function parseJobQueryCriteria(params?: RawSearchParams): JobFilterCriteria {
  if (!params) return {};

  const getValues = (keys: string[]): string[] => {
    const values: string[] = [];
    if (params instanceof URLSearchParams) {
      for (const k of keys) {
        const all = params.getAll(k);
        for (const item of all) {
          values.push(...item.split(",").map((s) => s.trim()).filter(Boolean));
        }
      }
    } else {
      for (const k of keys) {
        const val = params[k];
        if (typeof val === "string") {
          values.push(...val.split(",").map((s) => s.trim()).filter(Boolean));
        } else if (Array.isArray(val)) {
          for (const item of val) {
            if (typeof item === "string") {
              values.push(...item.split(",").map((s) => s.trim()).filter(Boolean));
            }
          }
        }
      }
    }
    return values;
  };

  const queryValues = getValues(["q", "query"]);
  const query = queryValues.length > 0 ? queryValues.join(" ") : undefined;

  const validStatuses: Set<string> = new Set([
    "open",
    "on-hold",
    "final-steps",
    "filled",
    "cancelled",
    "overstaffed",
  ]);
  const rawStatuses = getValues(["status", "statuses"]);
  const statuses = new Set<JobStatus>(
    rawStatuses.filter((s): s is JobStatus => validStatuses.has(s))
  );

  const validModalities: Set<string> = new Set(["remote", "hybrid", "on-site"]);
  const rawModalities = getValues(["modality", "modalities"]);
  const modalities = new Set<JobModality>(
    rawModalities.filter((m): m is JobModality => validModalities.has(m))
  );

  const validPayments: Set<string> = new Set(["salary", "hourly", "equity", "mixed"]);
  const rawPayments = getValues(["payment", "paymentType", "payments"]);
  const paymentTypes = new Set<JobPaymentType>(
    rawPayments.filter((p): p is JobPaymentType => validPayments.has(p))
  );

  const rawSkills = getValues(["skill", "skills"]);
  const skills = new Set<string>(rawSkills);

  const criteria: JobFilterCriteria = {};
  if (query) criteria.query = query;
  if (statuses.size > 0) criteria.statuses = statuses;
  if (modalities.size > 0) criteria.modalities = modalities;
  if (paymentTypes.size > 0) criteria.paymentTypes = paymentTypes;
  if (skills.size > 0) criteria.skills = skills;

  return criteria;
}

/**
 * Serializes JobFilterCriteria into URLSearchParams for bookmarkable and shareable search URLs.
 */
export function serializeJobQueryCriteria(criteria: JobFilterCriteria): URLSearchParams {
  const params = new URLSearchParams();

  if (criteria.query && criteria.query.trim()) {
    params.set("q", criteria.query.trim());
  }

  const formatSet = (collection?: Set<unknown> | unknown[]): string[] => {
    if (!collection) return [];
    if (collection instanceof Set) return Array.from(collection).map(String);
    return collection.map(String);
  };


  const statuses = formatSet(criteria.statuses);
  if (statuses.length > 0) {
    params.set("status", statuses.join(","));
  }

  const modalities = formatSet(criteria.modalities);
  if (modalities.length > 0) {
    params.set("modality", modalities.join(","));
  }

  const paymentTypes = formatSet(criteria.paymentTypes);
  if (paymentTypes.length > 0) {
    params.set("payment", paymentTypes.join(","));
  }

  const skills = formatSet(criteria.skills);
  if (skills.length > 0) {
    params.set("skills", skills.join(","));
  }

  return params;
}

