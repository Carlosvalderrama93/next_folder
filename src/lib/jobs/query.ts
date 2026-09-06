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
