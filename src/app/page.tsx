import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import Articles from "@/components/articles";
import Job from "@/components/job";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

const data = homePageData.footer;
function page() {
  return (
    <>
      <Navigation />
      <Hero />
      <Job />
      <Articles />
      <Footer {...data} />
    </>
  );
}

export default page;
