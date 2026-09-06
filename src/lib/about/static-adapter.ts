import { aboutData } from "@/Data/about";
import type { AboutProfile } from "./types";
import { normalizeRawAboutData } from "./normalizer";

/**
 * Fetch profile data from static source (@/Data/about).
 */
export function fetchAboutProfileFromStatic(): AboutProfile {
  return normalizeRawAboutData(aboutData);
}
