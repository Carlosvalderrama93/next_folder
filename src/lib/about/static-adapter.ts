import { aboutData } from "./fixtures";
import type { AboutProfile } from "./types";
import { normalizeRawAboutData } from "./normalizer";

/**
 * Fetch profile data from static source (./fixtures).
 */
export function fetchAboutProfileFromStatic(): AboutProfile {
  return normalizeRawAboutData(aboutData);
}
