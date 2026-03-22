import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { homePageData } from "@/Data/homepage";
import { aboutData } from "@/Data/about";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import AboutToc from "@/components/about-toc";
import ScrollReveal from "@/components/scroll-reveal";
import BioExpand from "@/components/bio-expand";
import HeadlinePills from "@/components/headline-pills";

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

// ── Icons ────────────────────────────────────────────────────

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

const focusAreaIcons: Record<string, ReactNode> = {
  people: <PeopleIcon />,
  code: <CodeIcon />,
  gear: <GearIcon />,
  chart: <ChartIcon />,
};

// ── Helpers ───────────────────────────────────────────────────

function formatDate(month: number, year: number, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(
    new Date(year, month - 1)
  );
}

// ── Page ─────────────────────────────────────────────────────

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const { footer } = homePageData;
  const lang = locale as "en" | "es";

  const stats = [
    { value: "50+", label: t("companiesPartnered") },
    { value: "200+", label: t("placementsMade") },
    { value: "100%", label: t("remoteFocus") },
  ];

  const skillGroups = [
    { label: t("recruitmentSkills"), pills: aboutData.skills.recruitment, color: "indigo" },
    { label: t("technicalSkills"),   pills: aboutData.skills.technical,   color: "violet" },
    { label: t("otherSkills"),       pills: aboutData.skills.other,       color: "emerald" },
  ] as const;

  const pillColors = {
    indigo:  "bg-indigo-100  dark:bg-indigo-900/40  text-indigo-700  dark:text-indigo-300  border-indigo-200/60  dark:border-indigo-700/50",
    violet:  "bg-violet-100  dark:bg-violet-900/40  text-violet-700  dark:text-violet-300  border-violet-200/60  dark:border-violet-700/50",
    emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-700/50",
  };

  const award = aboutData.certifications.find((c) => c.isAward);
  const regularCerts = aboutData.certifications.filter((c) => !c.isAward);

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
      <Navigation />
      <AboutToc sections={tocSections} />
      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white dark:from-indigo-950/30 dark:via-background dark:to-background">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />
            <div className="absolute top-24 -left-24 w-80 h-80 rounded-full bg-violet-200/30 dark:bg-violet-900/15 blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-10 md:gap-14 items-center">
            <div className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0 rounded-full ring-4 ring-brand/20 shadow-xl overflow-hidden">
              <Image src={aboutData.image} alt={aboutData.name} fill className="object-cover" sizes="(max-width: 768px) 128px, 176px" priority />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
                  {aboutData.name}
                </h1>
                <HeadlinePills pills={aboutData.headline} />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-fg">
                <span className="flex items-center gap-1.5"><PinIcon />{aboutData.location}</span>
                <span className="flex items-center gap-1.5"><GlobeIcon />{aboutData.languages.join(" · ")}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={aboutData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] hover:bg-[#006097] text-white rounded-full text-sm font-semibold transition-colors"
                >
                  <LinkedInIcon />
                  {t("viewLinkedIn")}
                </a>
                <a
                  href="/carlos-valderrama-cv.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-border text-gray-700 dark:text-foreground hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand rounded-full text-sm font-semibold transition-colors"
                >
                  <DownloadIcon />
                  {t("downloadCV")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bio ───────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <BioExpand
            paragraphs={aboutData.bio}
            readMore={t("readMore")}
            showLess={t("showLess")}
          />
        </section>

        {/* ── Experience ────────────────────────────────────── */}
        <ScrollReveal>
          <section id="experience" className="max-w-4xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">{t("experienceHeading")}</h2>
            <div className="flex flex-col gap-10">
              {aboutData.experience
                .flatMap((exp) =>
                  exp.positions.map((pos) => ({
                    ...pos,
                    company: exp.company,
                    location: exp.location,
                    employmentType: exp.employmentType,
                  }))
                )
                .map((entry, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-brand/20">
                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-brand ${entry.current ? "bg-brand" : "bg-background dark:bg-background"}`} />
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-muted-fg">
                          {formatDate(entry.startDate.month, entry.startDate.year, locale)}
                          {" – "}
                          {entry.current
                            ? t("present")
                            : entry.endDate
                            ? formatDate(entry.endDate.month, entry.endDate.year, locale)
                            : ""}
                        </span>
                        {entry.current && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand/10 text-brand border border-brand/20">
                            {t("current")}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{entry.company}</h3>
                      <p className="text-sm font-medium text-brand">{entry.title}</p>
                      <p className="text-xs text-muted-fg">{entry.location} · {entry.employmentType}</p>
                      {entry.highlights.filter((h) => !("isAward" in h && h.isAward)).length > 0 && (
                        <ul className="flex flex-col gap-1.5 mt-1">
                          {entry.highlights
                            .filter((h) => !("isAward" in h && h.isAward))
                            .map((h, hi) => (
                              <li key={hi} className="flex gap-2 items-start text-sm text-muted-fg leading-relaxed">
                                <span className="text-brand mt-0.5 flex-shrink-0">›</span>
                                {h[lang]}
                              </li>
                            ))}
                        </ul>
                      )}
                      {entry.highlights
                        .filter((h) => "isAward" in h && h.isAward)
                        .map((h, hi) => (
                          <div key={hi} className="mt-3 flex items-center gap-2.5 w-fit px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-700/40">
                            <div className="text-amber-500 flex-shrink-0"><TrophyIcon /></div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 leading-none mb-0.5">{t("awardLabel")}</p>
                              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{h[lang]}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Focus areas ───────────────────────────────────── */}
        <ScrollReveal>
          <section id="focus" className="max-w-4xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t("focusAreasHeading")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {aboutData.focusAreas.map((area) => (
                <div key={area.label} className="group p-5 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface hover:border-brand/40 dark:hover:border-brand/40 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-brand mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                    {focusAreaIcons[area.icon]}
                  </div>
                  <p className="text-sm font-medium text-gray-800 dark:text-foreground leading-snug">{area.label}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Stats band ────────────────────────────────────── */}
        <section className="bg-surface dark:bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-8 px-6 text-center">
                <span className="text-5xl font-extrabold text-brand mb-2">{stat.value}</span>
                <span className="text-sm font-medium text-muted-fg">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ────────────────────────────────────────── */}
        <ScrollReveal>
          <section id="skills" className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t("skillsHeading")}</h2>
            <div className="flex flex-col gap-7">
              {skillGroups.map(({ label, pills, color }) => (
                <div key={label}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-fg mb-3 block">{label}</span>
                  <div className="flex flex-wrap gap-2">
                    {pills.map((pill) => (
                      <span key={pill} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${pillColors[color]}`}>
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Education timeline ────────────────────────────── */}
        <ScrollReveal>
          <section id="education" className="max-w-4xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">{t("educationHeading")}</h2>
            <div className="flex flex-col gap-10">
              {aboutData.education.map((edu, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-brand/20">
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-brand ${edu.incomplete ? "bg-background dark:bg-background" : "bg-brand"}`} />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-muted-fg">{edu.dates}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
                    <p className="text-sm font-medium text-brand">{edu.program}</p>
                    <p className="text-sm text-muted-fg leading-relaxed">{edu.description}</p>
                    {edu.badge && (
                      <div className="mt-3 flex items-center gap-2.5 w-fit px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-700/40">
                        <div className="text-amber-500 flex-shrink-0"><TrophyIcon /></div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 leading-none mb-0.5">{t("awardLabel")}</p>
                          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{edu.badge}</p>
                        </div>
                      </div>
                    )}
                    {edu.incomplete && (
                      <span className="inline-flex w-fit mt-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-muted-fg border border-border">
                        {t("notCompleted")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Certifications ────────────────────────────────── */}
        <ScrollReveal>
          <section id="certifications" className="max-w-4xl mx-auto px-4 pb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{t("certificationsHeading")}</h2>
            <div className="flex flex-col gap-4">
              {award && (
                <div className="flex gap-4 items-start p-5 rounded-xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10">
                  <div className="text-amber-500 flex-shrink-0 mt-0.5"><TrophyIcon /></div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1 block">{t("awardLabel")}</span>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1">{award.title}</p>
                    <p className="text-xs text-muted-fg">{award.issuer}</p>
                    {award.description && <p className="text-xs text-muted-fg mt-2 leading-relaxed">{award.description}</p>}
                  </div>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {regularCerts.map((cert) => (
                  <div key={cert.title} className="flex gap-3 items-start p-4 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface">
                    <div className="text-brand flex-shrink-0 mt-0.5"><BadgeIcon /></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">{cert.title}</p>
                      <span className="text-xs text-muted-fg mt-0.5 block">{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Currently learning ────────────────────────────── */}
        <ScrollReveal>
          <section id="learning" className="max-w-4xl mx-auto px-4 pb-16">
            <div className="relative rounded-2xl border border-indigo-200/60 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 p-8 overflow-hidden">
              <div aria-hidden="true" className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("learningHeading")}</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {aboutData.learningRoadmap.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start p-3.5 rounded-lg bg-white/70 dark:bg-surface/50 border border-indigo-100 dark:border-indigo-800/30">
                      <span className="text-brand mt-0.5 flex-shrink-0"><ArrowIcon /></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("ctaHeading")}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/apply" className="px-6 py-3 bg-brand text-white rounded-full font-semibold hover:bg-brand-hover transition-colors text-sm">
              {t("ctaPositions")}
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-gray-300 dark:border-border text-gray-700 dark:text-foreground rounded-full font-semibold hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand transition-colors text-sm">
              {t("ctaContact")}
            </Link>
          </div>
        </section>

      </main>
      <Footer {...footer} />
    </>
  );
}
