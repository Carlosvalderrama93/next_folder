import { homePageData } from "@/Data/homepage";
import { getTranslations } from "next-intl/server";
import TestimonialsClient from "@/components/testimonials-client";

const { testimonials } = homePageData;

export default async function Testimonials() {
  if (!testimonials?.length) return null;
  const testimonialsTranslations = await getTranslations("testimonials");

  return (
    <TestimonialsClient
      heading={testimonialsTranslations("heading")}
      testimonials={testimonials}
    />
  );
}
