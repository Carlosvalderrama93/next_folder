import { cache } from "react";
import type { AboutProfile } from "./types";
import { fetchAboutProfileFromStatic } from "./static-adapter";
import { fetchAboutProfileFromStrapi } from "./strapi-adapter";

export type {
  AboutProfile,
  ExperienceItem,
  PositionItem,
  PositionDate,
  AboutHighlight,
  FlattenedExperiencePosition,
  EducationItem,
  CertificationItem,
  FocusArea,
  AboutSkills,
} from "./types";

export {
  flattenExperience,
  formatExperienceDate,
  normalizeRawAboutData,
} from "./normalizer";

/**
 * Fetch the About profile, querying Strapi CMS when configured and falling back to static fixtures.
 * Cached per request using React cache().
 */
export const getAboutProfile = cache(async function getAboutProfile(
  locale?: string
): Promise<AboutProfile> {
  const staticProfile = fetchAboutProfileFromStatic();

  try {
    const strapiData = await fetchAboutProfileFromStrapi(locale);
    if (strapiData && typeof strapiData === "object" && Object.keys(strapiData).length > 0) {
      return {
        ...staticProfile,
        ...strapiData,
      };
    }
  } catch {
    // Fallback cleanly to static profile
  }

  return staticProfile;
});
