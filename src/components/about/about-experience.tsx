import { TrophyIcon } from "./about-icons";
import { flattenExperience, formatExperienceDate } from "@/lib/about";
import type { ExperienceItem } from "@/lib/about/types";

interface AboutExperienceProps {
  experience: ExperienceItem[];
  locale: string;
  translations: {
    experienceHeading: string;
    present: string;
    current: string;
    awardLabel: string;
  };
}

export default function AboutExperience({
  experience,
  locale,
  translations,
}: AboutExperienceProps) {
  const lang = locale === "es" ? "es" : "en";
  const flattened = flattenExperience(experience);

  return (
    <section id="experience" className="max-w-4xl mx-auto px-4 pb-16 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">
        {translations.experienceHeading}
      </h2>
      <div className="flex flex-col gap-10">
        {flattened.map((entry, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-brand/20">
            <div
              className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-brand ${
                entry.current ? "bg-brand" : "bg-background dark:bg-background"
              }`}
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-fg">
                  {formatExperienceDate(entry.startDate.month, entry.startDate.year, locale)}
                  {" – "}
                  {entry.current
                    ? translations.present
                    : entry.endDate
                    ? formatExperienceDate(entry.endDate.month, entry.endDate.year, locale)
                    : ""}
                </span>
                {entry.current && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand/10 text-brand border border-brand/20">
                    {translations.current}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{entry.company}</h3>
              <p className="text-sm font-medium text-brand">{entry.title}</p>
              <p className="text-xs text-muted-fg">
                {entry.location} · {entry.employmentType}
              </p>
              {entry.highlights.filter((h) => !h.isAward).length > 0 && (
                <ul className="flex flex-col gap-1.5 mt-1">
                  {entry.highlights
                    .filter((h) => !h.isAward)
                    .map((h, hi) => (
                      <li
                        key={hi}
                        className="flex gap-2 items-start text-sm text-muted-fg leading-relaxed"
                      >
                        <span className="text-brand mt-0.5 flex-shrink-0">›</span>
                        {h[lang]}
                      </li>
                    ))}
                </ul>
              )}
              {entry.highlights
                .filter((h) => h.isAward)
                .map((h, hi) => (
                  <div
                    key={hi}
                    className="mt-3 flex items-center gap-2.5 w-fit px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-700/40"
                  >
                    <div className="text-amber-500 flex-shrink-0">
                      <TrophyIcon />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 leading-none mb-0.5">
                        {translations.awardLabel}
                      </p>
                      <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                        {h[lang]}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
