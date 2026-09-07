import Image from "next/image";
import HeadlinePills from "./headline-pills";
import { PinIcon, GlobeIcon, LinkedInIcon, DownloadIcon } from "./about-icons";
import type { AboutProfile } from "@/lib/about/types";

interface AboutHeroProps {
  profile: Pick<AboutProfile, "name" | "headline" | "location" | "languages" | "image" | "linkedIn">;
  translations: {
    viewLinkedIn: string;
    downloadCV: string;
  };
}

export default function AboutHero({ profile, translations }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white dark:from-indigo-950/30 dark:via-background dark:to-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />
        <div className="absolute top-24 -left-24 w-80 h-80 rounded-full bg-violet-200/30 dark:bg-violet-900/15 blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-10 md:gap-14 items-center">
        <div className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0 rounded-full ring-4 ring-brand/20 shadow-xl overflow-hidden">
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 176px"
            priority
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-3 text-balance">
              {profile.name}
            </h1>
            <HeadlinePills pills={profile.headline} />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-fg">
            <span className="flex items-center gap-1.5">
              <PinIcon />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <GlobeIcon />
              {profile.languages.join(" · ")}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] hover:bg-[#006097] text-white rounded-full text-sm font-semibold transition-colors"
            >
              <LinkedInIcon />
              {translations.viewLinkedIn}
            </a>
            <a
              href="/carlos-valderrama-cv.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-border text-gray-700 dark:text-foreground hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand rounded-full text-sm font-semibold transition-colors"
            >
              <DownloadIcon />
              {translations.downloadCV}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
