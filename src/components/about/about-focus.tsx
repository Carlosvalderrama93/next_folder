import { focusAreaIcons } from "./about-icons";
import type { FocusArea } from "@/lib/about/types";

interface AboutFocusProps {
  focusAreas: FocusArea[];
  heading: string;
}

export default function AboutFocus({ focusAreas, heading }: AboutFocusProps) {
  return (
    <section id="focus" className="max-w-4xl mx-auto px-4 pb-16 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-balance">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {focusAreas.map((area) => (
          <div
            key={area.label}
            className="group p-5 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-surface hover:border-brand/40 dark:hover:border-brand/40 hover:shadow-md transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-brand mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
              {focusAreaIcons[area.icon] ?? null}
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-foreground leading-snug">
              {area.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
