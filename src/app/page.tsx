import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import Articles from "@/components/articles";
import Job from "@/components/job";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

const data = homePageData.footer;
function page() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Job />
        <Testimonials />
        <Articles />
      </main>
      <Footer {...data} />
    </>
  );
}

export default page;
