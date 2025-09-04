import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import Articles from "@/components/articles";
import Job from "@/components/job";

function page() {
  return (
    <>
      <Navigation />
      <Hero />
      <Articles />
      <Job />
    </>
  );
}

export default page;
