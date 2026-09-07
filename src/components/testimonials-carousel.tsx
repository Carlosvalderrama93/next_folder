"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Carousel from "@/components/ui/carousel";
import Card from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import type { Testimonial } from "@/lib/testimonials";

function TestimonialCard({
  testimonial,
  onClick,
}: {
  testimonial: Testimonial;
  onClick?: () => void;
}) {
  return (
    <Card
      className="group cursor-pointer flex flex-col h-[200px] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`${testimonial.name}, ${testimonial.role}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <Avatar src={testimonial.avatar} alt={testimonial.name} size={40} />
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-foreground">
            {testimonial.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-muted-fg">
            {testimonial.role}
          </div>
        </div>
      </div>

      <div className="text-sm leading-6 text-gray-700 dark:text-foreground">
        <p className="line-clamp-3">&ldquo;{testimonial.message}&rdquo;</p>
      </div>
    </Card>
  );
}

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const t = useTranslations("testimonials");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  if (!testimonials?.length) return null;

  const selectedTestimonial = testimonials.find((item) => item.id === selectedId);

  return (
    <>
      <Carousel
        options={{ align: "center", loop: true }}
        className="w-full px-0"
        slideClassName="flex-none w-[85vw] sm:w-[540px] md:w-[640px]"
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onClick={() => setSelectedId(testimonial.id)}
          />
        ))}
      </Carousel>

      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm px-4 py-8"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedTestimonial.name}
        >
          <article
            className="w-full max-w-3xl rounded-3xl border border-gray-200/80 bg-white/95 p-8 shadow-2xl transition-all duration-200 dark:border-border dark:bg-surface/95"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar
                  src={selectedTestimonial.avatar}
                  alt={selectedTestimonial.name}
                  size={48}
                />
                <div>
                  <div className="text-base font-semibold text-gray-900 dark:text-foreground">
                    {selectedTestimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-muted-fg">
                    {selectedTestimonial.role}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-full border border-gray-200/80 bg-white px-3 py-1 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-border dark:bg-surface dark:text-foreground"
              >
                {t("close")}
              </button>
            </div>

            <div className="mt-6 text-sm leading-7 text-gray-700 dark:text-foreground">
              &ldquo;{selectedTestimonial.message}&rdquo;
            </div>
          </article>
        </div>
      )}
    </>
  );
}
