import { staticJobs } from "./fixtures";
import type { Job } from "./types";
import { normalizeStaticJob } from "./normalizer";

export function fetchJobsFromStatic(): Job[] {
  return staticJobs.map(normalizeStaticJob);
}

export function fetchJobFromStatic(id: string): Job | null {
  const found = staticJobs.find(
    (p) => p.id === id || (id === "1" && p.id === "10")
  );
  return found ? normalizeStaticJob(found) : null;
}
