"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import JobCard, { type JobCardProps } from "./job-card";

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const ARROW_CLASS =
  "absolute top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full " +
  "bg-white/90 dark:bg-surface/90 backdrop-blur-sm " +
  "border border-gray-200 dark:border-border shadow-md " +
  "text-gray-700 dark:text-foreground " +
  "hover:shadow-lg hover:scale-105 transition-all duration-200";

export default function JobCarousel({ jobs }: { jobs: JobCardProps[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onDot = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (jobs.length === 0) return null;

  if (jobs.length === 1) {
    return (
      <div className="max-w-[560px] mx-auto px-4">
        <JobCard {...jobs[0]} />
      </div>
    );
  }

  return (
    <div>
      {/* Viewport + side arrows in a relative container */}
      <div className="relative">
        {/* Extra vertical padding so card shadows aren't clipped */}
        <div className="py-2">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 px-5">
              {jobs.map((job) => (
                <div key={job.id} className="flex-none w-[85vw] md:w-[560px]">
                  <JobCard {...job} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side arrows — overlaid on the viewport */}
        <button onClick={onPrev} aria-label="Previous" className={`${ARROW_CLASS} left-4`}>
          <ChevronLeft />
        </button>
        <button onClick={onNext} aria-label="Next" className={`${ARROW_CLASS} right-4`}>
          <ChevronRight />
        </button>
      </div>

      {/* Dots — centered below the viewport */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-6 h-2 bg-gray-900 dark:bg-foreground"
                : "w-2 h-2 bg-gray-300 dark:bg-surface-raised hover:bg-gray-400 dark:hover:bg-muted-fg"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
