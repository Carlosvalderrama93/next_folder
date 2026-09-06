import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import Articles from "@/components/articles";
import Job from "@/components/job";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

const data = homePageData.footer;

export default function page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Job />
        <Articles />
        <Testimonials />
        <FAQ />
      </main>
      <Footer {...data} />
    </>
  );
}
