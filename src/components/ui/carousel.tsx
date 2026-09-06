"use client";

import { Children, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

const ARROW_CLASS =
  "absolute top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full " +
  "bg-white/80 dark:bg-surface/80 backdrop-blur-md " +
  "border border-gray-200 dark:border-border shadow-md " +
  "text-gray-700 dark:text-foreground " +
  "hover:shadow-lg hover:scale-105 transition-all duration-200";

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

type CarouselProps = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  className?: string;
  slideClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
};

export default function Carousel({
  children,
  options,
  className = "",
  slideClassName = "flex-none w-[85vw] md:w-[560px]",
  showArrows = true,
  showDots = true,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onDot = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

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

  const slides = Children.toArray(children);

  if (slides.length === 0) return null;

  if (slides.length === 1) {
    return (
      <div className={className}>
        <div className={slideClassName}>{slides[0]}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative">
        <div className="py-2">
          <div className="overflow-hidden relative" ref={emblaRef}>
            <div className="flex gap-5 px-5">
              {slides.map((slide, index) => (
                <div key={index} className={slideClassName}>
                  {slide}
                </div>
              ))}
            </div>
          </div>
        </div>

        {showArrows ? (
          <>
            <button
              onClick={onPrev}
              aria-label="Previous"
              className={`${ARROW_CLASS} left-4`}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={onNext}
              aria-label="Next"
              className={`${ARROW_CLASS} right-4`}
            >
              <ChevronRight />
            </button>
          </>
        ) : null}
      </div>

      {showDots ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => onDot(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 h-2 bg-brand"
                  : "w-2 h-2 bg-gray-300 dark:bg-surface-raised hover:bg-brand/40"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
