import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJobs, getStrapiImageSrc } from "@/lib/strapi";
import { type JobCardProps } from "@/components/job-card";
import JobCarousel from "@/components/job-carousel";

export default async function Job() {
  const strapiJobs = await fetchStrapiJobs();

  const jobs: JobCardProps[] =
    strapiJobs.length > 0
      ? strapiJobs.slice(0, 6).map((job) => ({
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
      : homePageData.openPositions.slice(0, 6).map((job) => ({
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
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Open Positions
        </h2>
        <Link
          href="/jobs"
          className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>
      <JobCarousel jobs={jobs} />
    </section>
  );
}
