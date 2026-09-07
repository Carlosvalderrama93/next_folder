import Hero from "@/components/hero";
import FeaturedJobsSection from "@/components/featured-jobs-section";
import FeaturedArticlesSection from "@/components/featured-articles-section";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <FeaturedJobsSection />
      <FeaturedArticlesSection />
      <Testimonials />
      <FAQ />
    </main>
  );
}
