import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJobs, getStrapiImageSrc } from "@/lib/strapi";
import { type JobCardProps } from "@/components/job-card";
import JobCarousel from "@/components/job-carousel";

export default async function Job() {
  const strapiJobs = await fetchStrapiJobs();

  const MIN_SLIDES = 5;

  const strapiMapped: JobCardProps[] = strapiJobs.map((job) => ({
    id: job.documentId,
    title: job.title,
    description: job.description,
    location: job.location,
    type: job.jobType,
    isOpen: job.isOpen,
    applyHref: `/apply/${job.documentId}`,
    imageUrl: job.image ? getStrapiImageSrc(job.image.url) : undefined,
    imageAlt: job.image?.alternativeText,
  }));

  const staticMapped: JobCardProps[] = homePageData.openPositions.map((job) => ({
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

  // Use Strapi jobs; pad with static ones to reach MIN_SLIDES
  const jobs: JobCardProps[] =
    strapiMapped.length >= MIN_SLIDES
      ? strapiMapped
      : [...strapiMapped, ...staticMapped].slice(0, Math.max(MIN_SLIDES, strapiMapped.length));

  return (
    <section className="py-16 border-t border-gray-100 dark:border-gray-800/50">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-pretty">
          Open Positions
        </h2>
        <div className="mt-3 w-10 h-1 bg-brand rounded-full" />
      </div>
      <JobCarousel jobs={jobs} />
      <div className="flex justify-center mt-8">
        <Link
          href="/jobs"
          className="group text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-brand transition-colors inline-flex items-center gap-1"
        >
          Browse all positions
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
