import { cache } from "react";
import type { Job, ListJobsOptions } from "./types";
import { fetchJobsFromStrapi, fetchJobFromStrapi } from "./strapi-adapter";
import { fetchJobsFromStatic, fetchJobFromStatic } from "./static-adapter";
import { filterJobs } from "./query";

export type { Job, ListJobsOptions, JobFilterCriteria } from "./types";
export { getStrapiImageSrc } from "./normalizer";
export { filterJobs } from "./query";

/**
 * List all available jobs, merging Strapi CMS entries with static fallback data.
 * Deduplicates by ID and title, applies optional filtering and slicing behind the seam.
 */
export async function listJobs(options?: ListJobsOptions): Promise<Job[]> {
  const [strapiJobs, staticJobs] = await Promise.all([
    fetchJobsFromStrapi(),
    Promise.resolve(fetchJobsFromStatic()),
  ]);

  let combined: Job[];

  if (strapiJobs.length === 0) {
    combined = staticJobs;
  } else {
    const strapiIds = new Set(strapiJobs.map((j) => j.id));
    const strapiTitles = new Set(strapiJobs.map((j) => j.title.toLowerCase()));

    const uniqueStatic = staticJobs.filter(
      (job) => !strapiIds.has(job.id) && !strapiTitles.has(job.title.toLowerCase())
    );

    combined = [...strapiJobs, ...uniqueStatic];
  }

  if (options?.filter) {
    combined = filterJobs(combined, options.filter);
  }

  if (options?.limit && options.limit > 0) {
    return combined.slice(0, options.limit);
  }

  return combined;
}

/**
 * Fetch a single job by documentId or static ID.
 * Wrapped with React cache() to deduplicate metadata and page body queries.
 */
export const getJob = cache(async function getJob(id: string): Promise<Job | null> {
  const strapiJob = await fetchJobFromStrapi(id);
  if (strapiJob) return strapiJob;

  return fetchJobFromStatic(id);
});
