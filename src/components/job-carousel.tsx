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

export default function JobCarousel({ jobs }: { jobs: JobCardProps[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onDot = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (jobs.length === 0) return null;

  // For a single job, skip carousel chrome
  if (jobs.length === 1) {
    return <JobCard {...jobs[0]} />;
  }

  return (
    <div>
      {/* Viewport — overflow hidden clips the slides */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex-[0_0_100%] min-w-0"
            >
              <JobCard {...job} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls row: dots left, prev/next right */}
      <div className="flex items-center justify-between mt-5">
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => onDot(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === selectedIndex
                  ? "w-5 bg-gray-900 dark:bg-white"
                  : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            disabled={prevDisabled}
            aria-label="Previous"
            className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={onNext}
            disabled={nextDisabled}
            aria-label="Next"
            className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
