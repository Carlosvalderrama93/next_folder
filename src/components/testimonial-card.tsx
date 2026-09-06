"use client";

import Card from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import type { Testimonial } from "@/types/homepage";

type TestimonialCardProps = {
  testimonial: Testimonial;
  onClick?: () => void;
};

export default function TestimonialCard({
  testimonial,
  onClick,
}: TestimonialCardProps) {
  return (
    <Card
      variant="testimonial"
      className="group cursor-pointer flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      onClick={onClick}
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
