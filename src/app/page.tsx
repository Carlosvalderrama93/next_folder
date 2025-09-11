import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import Articles from "@/components/articles";
import Job from "@/components/job";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";
import Article from "@/components/post_page/article";

const data = homePageData.footer;
function page() {
  return (
    <>
      <Navigation />
      <Article />
    </>
  );
}

export default page;
