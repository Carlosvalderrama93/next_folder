import { ArrowIcon } from "./about-icons";

interface AboutLearningProps {
  learningRoadmap: string[];
  heading: string;
}

export default function AboutLearning({
  learningRoadmap,
  heading,
}: AboutLearningProps) {
  return (
    <section id="learning" className="max-w-4xl mx-auto px-4 pb-16 scroll-mt-24">
      <div className="relative rounded-2xl border border-indigo-200/60 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 p-8 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl"
        />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{heading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {learningRoadmap.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 items-start p-3.5 rounded-lg bg-white/70 dark:bg-surface/50 border border-indigo-100 dark:border-indigo-800/30"
              >
                <span className="text-brand mt-0.5 flex-shrink-0">
                  <ArrowIcon />
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
