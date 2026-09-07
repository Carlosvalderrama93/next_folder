import { TrophyIcon } from "./about-icons";
import type { EducationItem } from "@/lib/about/types";

interface AboutEducationProps {
  education: EducationItem[];
  translations: {
    educationHeading: string;
    awardLabel: string;
    notCompleted: string;
  };
}

export default function AboutEducation({
  education,
  translations,
}: AboutEducationProps) {
  return (
    <section id="education" className="max-w-4xl mx-auto px-4 pb-16 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10">
        {translations.educationHeading}
      </h2>
      <div className="flex flex-col gap-10">
        {education.map((edu, i) => (
          <div key={i} className="relative pl-8 border-l-2 border-brand/20">
            <div
              className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-brand ${
                edu.incomplete ? "bg-background dark:bg-background" : "bg-brand"
              }`}
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-muted-fg">{edu.dates}</span>
              <h3 className="font-bold text-gray-900 dark:text-white">{edu.institution}</h3>
              <p className="text-sm font-medium text-brand">{edu.program}</p>
              <p className="text-sm text-muted-fg leading-relaxed">{edu.description}</p>
              {edu.badge && (
                <div className="mt-3 flex items-center gap-2.5 w-fit px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-700/40">
                  <div className="text-amber-500 flex-shrink-0">
                    <TrophyIcon />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 leading-none mb-0.5">
                      {translations.awardLabel}
                    </p>
                    <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                      {edu.badge}
                    </p>
                  </div>
                </div>
              )}
              {edu.incomplete && (
                <span className="inline-flex w-fit mt-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-muted-fg border border-border">
                  {translations.notCompleted}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
