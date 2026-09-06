"use client";

import { useState } from "react";
import Carousel from "@/components/ui/carousel";
import TestimonialCard from "@/components/testimonial-card";
import { Avatar } from "@/components/ui/avatar";
import type { Testimonial } from "@/types/homepage";

type TestimonialsClientProps = {
  heading: string;
  testimonials: Testimonial[];
};

export default function TestimonialsClient({
  heading,
  testimonials,
}: TestimonialsClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedTestimonial = testimonials.find(
    (testimonial) => testimonial.id === selectedId,
  );

  return (
    <section className="py-16 px-4 border-t border-gray-100 dark:border-border">
      <div className="w-full mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-foreground mb-10 text-center">
          {heading}
        </h2>
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
      </div>

      {selectedTestimonial ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm px-4 py-8"
          onClick={() => setSelectedId(null)}
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
                Cerrar
              </button>
            </div>

            <div className="mt-6 text-sm leading-7 text-gray-700 dark:text-foreground">
              &ldquo;{selectedTestimonial.message}&rdquo;
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
