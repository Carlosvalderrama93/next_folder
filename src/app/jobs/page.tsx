import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJobs, getStrapiImageSrc } from "@/lib/strapi";
import JobCard, { type JobCardProps } from "@/components/job-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Positions | Carlos Valderrama",
  description: "Browse remote and hybrid tech jobs in LATAM. Apply today.",
};

export default async function JobsPage() {
  const strapiJobs = await fetchStrapiJobs();
  const staticPositions = homePageData.openPositions;
  const footerData = homePageData.footer;

  const jobs: JobCardProps[] =
    strapiJobs.length > 0
      ? strapiJobs.map((job) => ({
          id: job.documentId,
          title: job.title,
          description: job.description,
          location: job.location,
          type: job.jobType,
          isOpen: job.isOpen,
          applyHref: `/apply/${job.documentId}`,
          imageUrl: job.image ? getStrapiImageSrc(job.image.url) : undefined,
          imageAlt: job.image?.alternativeText,
        }))
      : staticPositions.map((job) => ({
          id: job.id,
          title: job.title,
          description: job.description,
          location: job.location,
          type: job.type,
          postedAt: job.postedAt,
          isOpen: true,
          applyHref: `/apply/${job.id}`,
          imageUrl: job.image ?? undefined,
        }));

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Open Positions
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {jobs.length} position{jobs.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </main>
      <Footer {...footerData} />
    </>
  );
}
