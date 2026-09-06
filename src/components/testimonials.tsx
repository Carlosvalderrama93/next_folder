import { getTranslations } from "next-intl/server";
import { listTestimonials } from "@/lib/testimonials";
import TestimonialsCarousel from "./testimonials-carousel";

export default async function Testimonials() {
  const t = await getTranslations("testimonials");
  const testimonials = await listTestimonials();

  if (!testimonials?.length) return null;

  return (
    <section className="py-16 px-4 border-t border-gray-100 dark:border-border">
      <div className="w-full mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-foreground mb-10 text-center">
          {t("heading")}
        </h2>
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
