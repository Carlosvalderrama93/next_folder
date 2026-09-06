import { TrophyIcon, BadgeIcon } from "./about-icons";
import type { CertificationItem } from "@/lib/about/types";

interface AboutCertificationsProps {
  certifications: CertificationItem[];
  translations: {
    certificationsHeading: string;
    awardLabel: string;
  };
}

export default function AboutCertifications({
  certifications,
  translations,
}: AboutCertificationsProps) {
  const award = certifications.find((c) => c.isAward);
  const regularCerts = certifications.filter((c) => !c.isAward);

  return (
    <section id="certifications" className="max-w-4xl mx-auto px-4 pb-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        {translations.certificationsHeading}
      </h2>
      <div className="flex flex-col gap-4">
        {award && (
          <div className="flex gap-4 items-start p-5 rounded-xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10">
            <div className="text-amber-500 flex-shrink-0 mt-0.5">
              <TrophyIcon />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1 block">
                {translations.awardLabel}
              </span>
              <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1">
                {award.title}
              </p>
              <p className="text-xs text-muted-fg">{award.issuer}</p>
              {award.description && (
                <p className="text-xs text-muted-fg mt-2 leading-relaxed">
                  {award.description}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-3">
          {regularCerts.map((cert) => (
            <div
              key={cert.title}
              className="flex gap-3 items-start p-4 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface"
            >
              <div className="text-brand flex-shrink-0 mt-0.5">
                <BadgeIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                  {cert.title}
                </p>
                <span className="text-xs text-muted-fg mt-0.5 block">{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
