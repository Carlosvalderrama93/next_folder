import Hero from "@/components/hero";
import Articles from "@/components/articles";
import Job from "@/components/job";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";

export default function page() {
  return (
    <main id="main-content">
      <Hero />
      <Job />
      <Articles />
      <Testimonials />
      <FAQ />
    </main>
  );
}
