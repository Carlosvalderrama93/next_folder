import type {
  AboutProfile,
  ExperienceItem,
  FlattenedExperiencePosition,
  EducationItem,
  CertificationItem,
  FocusArea,
  AboutSkills,
} from "./types";

/**
 * Format a month/year combination according to the specified locale.
 * Fallbacks gracefully if year or month are out of range.
 */
export function formatExperienceDate(
  month: number,
  year: number,
  locale: string = "en"
): string {
  try {
    const validMonth = Math.min(12, Math.max(1, month));
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    }).format(new Date(year, validMonth - 1));
  } catch {
    return `${month}/${year}`;
  }
}

/**
 * Flattens hierarchical company experience entries into linear chronological position entries.
 */
export function flattenExperience(
  experiences: ExperienceItem[] = []
): FlattenedExperiencePosition[] {
  return experiences.flatMap((exp) =>
    (exp.positions || []).map((pos) => ({
      ...pos,
      company: exp.company,
      location: exp.location,
      employmentType: exp.employmentType,
      recognition: exp.recognition,
    }))
  );
}

/**
 * Normalizes raw/untrusted input into a canonical AboutProfile structure.
 */
export function normalizeRawAboutData(raw: unknown): AboutProfile {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const name = typeof data.name === "string" ? data.name : "";
  const headline = Array.isArray(data.headline)
    ? data.headline.filter((h): h is string => typeof h === "string")
    : [];
  const location = typeof data.location === "string" ? data.location : "";
  const linkedIn = typeof data.linkedIn === "string" ? data.linkedIn : "";
  const languages = Array.isArray(data.languages)
    ? data.languages.filter((l): l is string => typeof l === "string")
    : [];
  const image = typeof data.image === "string" ? data.image : "/me.png";

  const bio = Array.isArray(data.bio)
    ? data.bio.filter((b): b is string => typeof b === "string")
    : [];

  const focusAreas: FocusArea[] = Array.isArray(data.focusAreas)
    ? data.focusAreas.map((f: unknown) => {
        const item = (f && typeof f === "object" ? f : {}) as Record<string, unknown>;
        return {
          label: typeof item.label === "string" ? item.label : "",
          icon: typeof item.icon === "string" ? item.icon : "code",
        };
      })
    : [];

  const rawSkills = (data.skills && typeof data.skills === "object" ? data.skills : {}) as Record<
    string,
    unknown
  >;
  const skills: AboutSkills = {
    recruitment: Array.isArray(rawSkills.recruitment)
      ? rawSkills.recruitment.filter((s): s is string => typeof s === "string")
      : [],
    technical: Array.isArray(rawSkills.technical)
      ? rawSkills.technical.filter((s): s is string => typeof s === "string")
      : [],
    other: Array.isArray(rawSkills.other)
      ? rawSkills.other.filter((s): s is string => typeof s === "string")
      : [],
  };

  const education: EducationItem[] = Array.isArray(data.education)
    ? data.education.map((e: unknown) => {
        const item = (e && typeof e === "object" ? e : {}) as Record<string, unknown>;
        return {
          institution: typeof item.institution === "string" ? item.institution : "",
          program: typeof item.program === "string" ? item.program : "",
          dates: typeof item.dates === "string" ? item.dates : "",
          description: typeof item.description === "string" ? item.description : "",
          badge: typeof item.badge === "string" ? item.badge : undefined,
          incomplete: Boolean(item.incomplete),
        };
      })
    : [];

  const certifications: CertificationItem[] = Array.isArray(data.certifications)
    ? data.certifications.map((c: unknown) => {
        const item = (c && typeof c === "object" ? c : {}) as Record<string, unknown>;
        return {
          title: typeof item.title === "string" ? item.title : "",
          issuer: typeof item.issuer === "string" ? item.issuer : "",
          isAward: Boolean(item.isAward),
          description: typeof item.description === "string" ? item.description : undefined,
        };
      })
    : [];

  const learningRoadmap = Array.isArray(data.learningRoadmap)
    ? data.learningRoadmap.filter((item): item is string => typeof item === "string")
    : [];

  const experience: ExperienceItem[] = Array.isArray(data.experience)
    ? data.experience.map((exp: unknown) => {
        const item = (exp && typeof exp === "object" ? exp : {}) as Record<string, unknown>;
        const positions = Array.isArray(item.positions)
          ? item.positions.map((pos: unknown) => {
              const p = (pos && typeof pos === "object" ? pos : {}) as Record<string, unknown>;
              const start = (p.startDate && typeof p.startDate === "object" ? p.startDate : {}) as Record<string, unknown>;
              const end = (p.endDate && typeof p.endDate === "object" ? p.endDate : null) as Record<string, unknown> | null;

              const highlights = Array.isArray(p.highlights)
                ? p.highlights.map((h: unknown) => {
                    const hl = (h && typeof h === "object" ? h : {}) as Record<string, unknown>;
                    return {
                      en: typeof hl.en === "string" ? hl.en : "",
                      es: typeof hl.es === "string" ? hl.es : "",
                      isAward: Boolean(hl.isAward),
                    };
                  })
                : [];

              return {
                title: typeof p.title === "string" ? p.title : "",
                startDate: {
                  month: typeof start.month === "number" ? start.month : 1,
                  year: typeof start.year === "number" ? start.year : 2020,
                },
                endDate: end
                  ? {
                      month: typeof end.month === "number" ? end.month : 1,
                      year: typeof end.year === "number" ? end.year : 2020,
                    }
                  : null,
                current: Boolean(p.current),
                highlights,
              };
            })
          : [];

        return {
          company: typeof item.company === "string" ? item.company : "",
          recognition: typeof item.recognition === "string" ? item.recognition : undefined,
          employmentType: typeof item.employmentType === "string" ? item.employmentType : "Full-time",
          location: typeof item.location === "string" ? item.location : "",
          positions,
        };
      })
    : [];

  return {
    name,
    headline,
    location,
    linkedIn,
    languages,
    image,
    bio,
    focusAreas,
    skills,
    education,
    certifications,
    learningRoadmap,
    experience,
  };
}
