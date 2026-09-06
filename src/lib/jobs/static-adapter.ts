import { homePageData } from "@/Data/homepage";
import type { Job } from "./types";
import { normalizeStaticJob } from "./normalizer";

export function fetchJobsFromStatic(): Job[] {
  const positions = homePageData.openPositions ?? [];
  return positions.map(normalizeStaticJob);
}

export function fetchJobFromStatic(id: string): Job | null {
  const positions = homePageData.openPositions ?? [];
  const found = positions.find((p) => p.id === id);
  return found ? normalizeStaticJob(found) : null;
}
