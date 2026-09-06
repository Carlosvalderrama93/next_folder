import type { AboutSkills as SkillsType } from "@/lib/about/types";

const pillColors = {
  indigo:  "bg-indigo-100  dark:bg-indigo-900/40  text-indigo-700  dark:text-indigo-300  border-indigo-200/60  dark:border-indigo-700/50",
  violet:  "bg-violet-100  dark:bg-violet-900/40  text-violet-700  dark:text-violet-300  border-violet-200/60  dark:border-violet-700/50",
  emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-700/50",
} as const;

interface AboutSkillsProps {
  skills: SkillsType;
  translations: {
    skillsHeading: string;
    recruitmentSkills: string;
    technicalSkills: string;
    otherSkills: string;
  };
}

export default function AboutSkills({ skills, translations }: AboutSkillsProps) {
  const skillGroups = [
    { label: translations.recruitmentSkills, pills: skills.recruitment, color: "indigo" as const },
    { label: translations.technicalSkills,   pills: skills.technical,   color: "violet" as const },
    { label: translations.otherSkills,       pills: skills.other,       color: "emerald" as const },
  ];

  return (
    <section id="skills" className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        {translations.skillsHeading}
      </h2>
      <div className="flex flex-col gap-7">
        {skillGroups.map(({ label, pills, color }) => (
          <div key={label}>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-fg mb-3 block">
              {label}
            </span>
            <div className="flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${pillColors[color]}`}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
