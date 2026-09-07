import { Suspense } from "react";
import Hero from "@/components/hero";
import FeaturedJobsSection from "@/components/featured-jobs-section";
import FeaturedArticlesSection from "@/components/featured-articles-section";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import {
  FeaturedJobsSkeleton,
  FeaturedArticlesSkeleton,
  TestimonialsSkeleton,
} from "@/components/home-skeletons";
import { buildWebsiteJsonLd } from "@/lib/site-config";
import { StructuredData } from "@/components/ui/structured-data";

export default function HomePage() {
  return (
    <>
      <StructuredData data={buildWebsiteJsonLd()} />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<FeaturedJobsSkeleton />}>
          <FeaturedJobsSection />
        </Suspense>
        <Suspense fallback={<FeaturedArticlesSkeleton />}>
          <FeaturedArticlesSection />
        </Suspense>
        <Suspense fallback={<TestimonialsSkeleton />}>
          <Testimonials />
        </Suspense>
        <FAQ />
      </main>
    </>
  );
}

