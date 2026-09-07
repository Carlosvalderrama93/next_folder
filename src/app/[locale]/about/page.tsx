import { getAboutProfile } from "@/lib/about";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutToc from "@/components/about/about-toc";
import ScrollReveal from "@/components/scroll-reveal";
import AboutHero from "@/components/about/about-hero";
import AboutBio from "@/components/about/about-bio";
import AboutExperience from "@/components/about/about-experience";
import AboutFocus from "@/components/about/about-focus";
import AboutStats from "@/components/about/about-stats";
import AboutSkills from "@/components/about/about-skills";
import AboutEducation from "@/components/about/about-education";
import AboutCertifications from "@/components/about/about-certifications";
import AboutLearning from "@/components/about/about-learning";
import AboutCta from "@/components/about/about-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return {
    title: "About",
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const profile = await getAboutProfile(locale);

  const stats = [
    { value: "50+", label: t("companiesPartnered") },
    { value: "200+", label: t("placementsMade") },
    { value: "100%", label: t("remoteFocus") },
  ];

  const tocSections = [
    { id: "experience", label: t("experienceHeading") },
    { id: "focus",      label: t("focusAreasHeading") },
    { id: "skills",     label: t("skillsHeading") },
    { id: "education",  label: t("educationHeading") },
    { id: "certifications", label: t("certificationsHeading") },
    { id: "learning",   label: t("learningHeading") },
  ];

  return (
    <>
      <AboutToc sections={tocSections} />
      <main id="main-content">
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
      </main>
    </>
  );
}
