/**
 * Unit tests for src/lib/about domain normalizer, flattener, and date utilities.
 * Run with: node --test src/lib/about/__tests__/about.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Pure domain functions (mirroring normalizer.ts) ──────────────────────────

function formatExperienceDate(month, year, locale = "en") {
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

function flattenExperience(experiences = []) {
  return (experiences || []).flatMap((exp) =>
    (exp.positions || []).map((pos) => ({
      ...pos,
      company: exp.company,
      location: exp.location,
      employmentType: exp.employmentType,
      recognition: exp.recognition,
    }))
  );
}

function normalizeRawAboutData(raw) {
  const data = (raw && typeof raw === "object" ? raw : {});

  const name = typeof data.name === "string" ? data.name : "";
  const headline = Array.isArray(data.headline)
    ? data.headline.filter((h) => typeof h === "string")
    : [];
  const location = typeof data.location === "string" ? data.location : "";
  const linkedIn = typeof data.linkedIn === "string" ? data.linkedIn : "";
  const languages = Array.isArray(data.languages)
    ? data.languages.filter((l) => typeof l === "string")
    : [];
  const image = typeof data.image === "string" ? data.image : "/me.png";

  const bio = Array.isArray(data.bio)
    ? data.bio.filter((b) => typeof b === "string")
    : [];

  const focusAreas = Array.isArray(data.focusAreas)
    ? data.focusAreas.map((f) => {
        const item = (f && typeof f === "object" ? f : {});
        return {
          label: typeof item.label === "string" ? item.label : "",
          icon: typeof item.icon === "string" ? item.icon : "code",
        };
      })
    : [];

  const rawSkills = (data.skills && typeof data.skills === "object" ? data.skills : {});
  const skills = {
    recruitment: Array.isArray(rawSkills.recruitment)
      ? rawSkills.recruitment.filter((s) => typeof s === "string")
      : [],
    technical: Array.isArray(rawSkills.technical)
      ? rawSkills.technical.filter((s) => typeof s === "string")
      : [],
    other: Array.isArray(rawSkills.other)
      ? rawSkills.other.filter((s) => typeof s === "string")
      : [],
  };

  const education = Array.isArray(data.education)
    ? data.education.map((e) => {
        const item = (e && typeof e === "object" ? e : {});
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

  const certifications = Array.isArray(data.certifications)
    ? data.certifications.map((c) => {
        const item = (c && typeof c === "object" ? c : {});
        return {
          title: typeof item.title === "string" ? item.title : "",
          issuer: typeof item.issuer === "string" ? item.issuer : "",
          isAward: Boolean(item.isAward),
          description: typeof item.description === "string" ? item.description : undefined,
        };
      })
    : [];

  const learningRoadmap = Array.isArray(data.learningRoadmap)
    ? data.learningRoadmap.filter((item) => typeof item === "string")
    : [];

  const experience = Array.isArray(data.experience)
    ? data.experience.map((exp) => {
        const item = (exp && typeof exp === "object" ? exp : {});
        const positions = Array.isArray(item.positions)
          ? item.positions.map((pos) => {
              const p = (pos && typeof pos === "object" ? pos : {});
              const start = (p.startDate && typeof p.startDate === "object" ? p.startDate : {});
              const end = (p.endDate && typeof p.endDate === "object" ? p.endDate : null);

              const highlights = Array.isArray(p.highlights)
                ? p.highlights.map((h) => {
                    const hl = (h && typeof h === "object" ? h : {});
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

// ── Test Suites ─────────────────────────────────────────────────────────────

describe("About Profile Module Seam", () => {
  describe("formatExperienceDate", () => {
    it("formats dates in English locale", () => {
      const formatted = formatExperienceDate(2, 2025, "en");
      assert.match(formatted, /Feb/i);
      assert.match(formatted, /2025/);
    });

    it("formats dates in Spanish locale", () => {
      const formatted = formatExperienceDate(1, 2024, "es");
      assert.match(formatted, /ene/i);
      assert.match(formatted, /2024/);
    });

    it("clamps out-of-range months safely", () => {
      const lower = formatExperienceDate(0, 2023, "en");
      assert.match(lower, /Jan/i);

      const upper = formatExperienceDate(13, 2023, "en");
      assert.match(upper, /Dec/i);
    });
  });

  describe("flattenExperience", () => {
    it("flattens multi-position company experiences into linear position entries", () => {
      const raw = [
        {
          company: "Solvo Global",
          location: "Bogota, Colombia",
          employmentType: "Full-time",
          recognition: "4x Recruiter",
          positions: [
            {
              title: "Senior Lead",
              startDate: { month: 2, year: 2025 },
              endDate: null,
              current: true,
              highlights: [{ en: "Closed 20 roles", es: "Cerro 20 roles" }],
            },
            {
              title: "Sourcer",
              startDate: { month: 4, year: 2024 },
              endDate: { month: 2, year: 2025 },
              current: false,
              highlights: [],
            },
          ],
        },
      ];

      const flattened = flattenExperience(raw);
      assert.equal(flattened.length, 2);
      assert.equal(flattened[0].company, "Solvo Global");
      assert.equal(flattened[0].title, "Senior Lead");
      assert.equal(flattened[0].current, true);
      assert.equal(flattened[0].recognition, "4x Recruiter");
      assert.equal(flattened[1].company, "Solvo Global");
      assert.equal(flattened[1].title, "Sourcer");
      assert.equal(flattened[1].current, false);
    });

    it("handles empty or missing experiences gracefully", () => {
      assert.deepEqual(flattenExperience([]), []);
      assert.deepEqual(flattenExperience(undefined), []);
      assert.deepEqual(flattenExperience(null), []);
    });
  });

  describe("normalizeRawAboutData", () => {
    it("safely handles null/empty raw payloads with fallback defaults", () => {
      const profile = normalizeRawAboutData(null);
      assert.equal(profile.name, "");
      assert.deepEqual(profile.headline, []);
      assert.equal(profile.image, "/me.png");
      assert.deepEqual(profile.bio, []);
      assert.deepEqual(profile.skills.recruitment, []);
      assert.deepEqual(profile.skills.technical, []);
      assert.deepEqual(profile.skills.other, []);
      assert.deepEqual(profile.education, []);
      assert.deepEqual(profile.certifications, []);
      assert.deepEqual(profile.learningRoadmap, []);
      assert.deepEqual(profile.experience, []);
    });

    it("normalizes complete profile fixture accurately", () => {
      const fixture = {
        name: "Carlos Alberto Valderrama Barbosa",
        headline: ["IT Recruiter", "Frontend JS Developer"],
        location: "Bogotá D.C., Colombia",
        linkedIn: "https://www.linkedin.com/in/carlosvalderrama93/",
        languages: ["Spanish", "English"],
        image: "/me.png",
        bio: ["Bio paragraph 1", "Bio paragraph 2"],
        focusAreas: [
          { label: "Tech Recruitment", icon: "people" },
          { label: "Frontend", icon: "code" },
        ],
        skills: {
          recruitment: ["IT Recruitment", "Talent Acquisition"],
          technical: ["React", "TypeScript"],
          other: ["Psychology"],
        },
        education: [
          {
            institution: "Alura",
            program: "Web Dev",
            dates: "2023",
            description: "ONE Scholar",
            badge: "Oracle ONE",
            incomplete: false,
          },
          {
            institution: "Uni Tolima",
            program: "Systems Eng",
            dates: "2012-2015",
            description: "Studies",
            incomplete: true,
          },
        ],
        certifications: [
          {
            title: "Best Research Award",
            issuer: "Colpsic",
            isAward: true,
            description: "Regional recognition",
          },
          {
            title: "Web Dev Fundamentals",
            issuer: "LinkedIn Learning",
          },
        ],
        learningRoadmap: ["React Patterns", "Next.js"],
        experience: [
          {
            company: "Solvo Global",
            recognition: "Top Recruiter",
            employmentType: "Full-time",
            location: "Bogota",
            positions: [
              {
                title: "Associate",
                startDate: { month: 2, year: 2025 },
                endDate: null,
                current: true,
                highlights: [
                  { en: "Lead recruitment", es: "Lidera reclutamiento" },
                  { en: "Awarded", es: "Premiado", isAward: true },
                ],
              },
            ],
          },
        ],
      };

      const normalized = normalizeRawAboutData(fixture);

      assert.equal(normalized.name, "Carlos Alberto Valderrama Barbosa");
      assert.equal(normalized.headline.length, 2);
      assert.equal(normalized.focusAreas.length, 2);
      assert.equal(normalized.skills.technical[0], "React");

      // Education
      assert.equal(normalized.education.length, 2);
      assert.equal(normalized.education[0].badge, "Oracle ONE");
      assert.equal(normalized.education[1].incomplete, true);

      // Certifications
      assert.equal(normalized.certifications.length, 2);
      const award = normalized.certifications.find((c) => c.isAward);
      assert.ok(award, "Award certification should be marked isAward");
      assert.equal(award.title, "Best Research Award");

      // Experience
      assert.equal(normalized.experience.length, 1);
      const pos = normalized.experience[0].positions[0];
      assert.equal(pos.current, true);
      assert.equal(pos.highlights.length, 2);
      assert.equal(pos.highlights[1].isAward, true);
    });
  });

  describe("About Fixtures Locality Contract", () => {
    it("ensures fixtures reside locally in src/lib/about/fixtures.ts and src/Data is deleted", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const aboutDir = path.resolve(__dirname, "..");
      const fixturesPath = path.join(aboutDir, "fixtures.ts");
      const staticAdapterPath = path.join(aboutDir, "static-adapter.ts");
      const srcDataDir = path.resolve(aboutDir, "../../Data");

      // 1. Local fixtures must exist
      assert.ok(fs.existsSync(fixturesPath), "src/lib/about/fixtures.ts must exist");
      const fixturesContent = fs.readFileSync(fixturesPath, "utf-8");
      assert.ok(
        fixturesContent.includes("export const aboutData"),
        "fixtures.ts must export aboutData"
      );

      // 2. static-adapter must import from local fixtures
      const adapterContent = fs.readFileSync(staticAdapterPath, "utf-8");
      assert.ok(
        adapterContent.includes('from "./fixtures"'),
        'static-adapter.ts must import from local "./fixtures"'
      );
      assert.ok(
        !adapterContent.includes("@/Data/about"),
        "static-adapter.ts must not leak imports to legacy @/Data/about"
      );

      // 3. Legacy src/Data directory must be completely removed
      assert.ok(
        !fs.existsSync(srcDataDir),
        "Legacy src/Data directory must be completely deleted from the codebase"
      );
    });
  });

  describe("About Presentation Seam & View Consolidation Contracts", () => {
    it("guarantees components/about/index.ts acts as the canonical presentation entry point", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const barrelPath = path.resolve(__dirname, "../../../components/about/index.ts");
      const viewPath = path.resolve(__dirname, "../../../components/about/about-view.tsx");

      assert.ok(fs.existsSync(barrelPath), "components/about/index.ts must exist");
      assert.ok(fs.existsSync(viewPath), "components/about/about-view.tsx must exist");

      const barrelContent = fs.readFileSync(barrelPath, "utf-8");
      assert.ok(barrelContent.includes("AboutView"), "index.ts must export AboutView");
    });

    it("verifies about/page.tsx delegates exclusively to AboutView without prop-drilling", async () => {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { fileURLToPath } = await import("node:url");

      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const pagePath = path.resolve(__dirname, "../../../app/[locale]/about/page.tsx");

      assert.ok(fs.existsSync(pagePath), "about/page.tsx must exist");
      const pageContent = fs.readFileSync(pagePath, "utf-8");

      assert.ok(pageContent.includes("AboutView"), "about/page.tsx must consume AboutView");
      assert.ok(
        pageContent.includes('from "@/components/about"'),
        "about/page.tsx must import from @/components/about seam"
      );

      // Must not manually import and drill props to individual sections
      assert.ok(!pageContent.includes("AboutHero"), "about/page.tsx must not directly import AboutHero");
      assert.ok(!pageContent.includes("AboutBio"), "about/page.tsx must not directly import AboutBio");
      assert.ok(!pageContent.includes("AboutExperience"), "about/page.tsx must not directly import AboutExperience");
      assert.ok(!pageContent.includes("AboutSkills"), "about/page.tsx must not directly import AboutSkills");
      assert.ok(!pageContent.includes("AboutEducation"), "about/page.tsx must not directly import AboutEducation");
      assert.ok(!pageContent.includes("AboutCertifications"), "about/page.tsx must not directly import AboutCertifications");
      assert.ok(!pageContent.includes("AboutLearning"), "about/page.tsx must not directly import AboutLearning");
      assert.ok(!pageContent.includes("AboutCta"), "about/page.tsx must not directly import AboutCta");
    });
  });
});

