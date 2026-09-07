import { getTranslations } from "next-intl/server";
import type { AboutProfile } from "@/lib/about";
import AboutToc from "./about-toc";
import ScrollReveal from "@/components/scroll-reveal";
import AboutHero from "./about-hero";
import AboutBio from "./about-bio";
import AboutExperience from "./about-experience";
import AboutFocus from "./about-focus";
import AboutStats from "./about-stats";
import AboutSkills from "./about-skills";
import AboutEducation from "./about-education";
import AboutCertifications from "./about-certifications";
import AboutLearning from "./about-learning";
import AboutCta from "./about-cta";

export interface AboutViewProps {
  profile: AboutProfile;
  locale: string;
}

/**
 * Canonical deep presentation module for the recruiter About profile.
 * Encapsulates section orchestration, layout order, scroll reveal boundaries,
 * table of contents generation, and localized copy resolution behind a minimal interface.
 */
export default async function AboutView({ profile, locale }: AboutViewProps) {
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  const stats = [
    { value: "50+", label: t("companiesPartnered") },
    { value: "200+", label: t("placementsMade") },
    { value: "100%", label: t("remoteFocus") },
  ];

  const tocSections = [
    { id: "experience", label: t("experienceHeading") },
    { id: "focus", label: t("focusAreasHeading") },
    { id: "skills", label: t("skillsHeading") },
    { id: "education", label: t("educationHeading") },
    { id: "certifications", label: t("certificationsHeading") },
    { id: "learning", label: t("learningHeading") },
  ];

  return (
    <>
      <AboutToc sections={tocSections} />
      <div className="w-full">
        <AboutHero
          profile={profile}
          translations={{
            viewLinkedIn: t("viewLinkedIn"),
            downloadCV: t("downloadCV"),
          }}
        />

        <AboutBio
          paragraphs={profile.bio}
          readMore={t("readMore")}
          showLess={t("showLess")}
        />

        <ScrollReveal>
          <AboutExperience
            experience={profile.experience}
            locale={locale}
            translations={{
              experienceHeading: t("experienceHeading"),
              present: t("present"),
              current: t("current"),
              awardLabel: t("awardLabel"),
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <AboutFocus
            focusAreas={profile.focusAreas}
            heading={t("focusAreasHeading")}
          />
        </ScrollReveal>

        <AboutStats stats={stats} />

        <ScrollReveal>
          <AboutSkills
            skills={profile.skills}
            translations={{
              skillsHeading: t("skillsHeading"),
              recruitmentSkills: t("recruitmentSkills"),
              technicalSkills: t("technicalSkills"),
              otherSkills: t("otherSkills"),
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <AboutEducation
            education={profile.education}
            translations={{
              educationHeading: t("educationHeading"),
              awardLabel: t("awardLabel"),
              notCompleted: t("notCompleted"),
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <AboutCertifications
            certifications={profile.certifications}
            translations={{
              certificationsHeading: t("certificationsHeading"),
              awardLabel: t("awardLabel"),
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <AboutLearning
            learningRoadmap={profile.learningRoadmap}
            heading={t("learningHeading")}
          />
        </ScrollReveal>

        <AboutCta
          translations={{
            ctaHeading: t("ctaHeading"),
            ctaPositions: t("ctaPositions"),
            ctaContact: t("ctaContact"),
          }}
        />
      </div>
    </>
  );
}
