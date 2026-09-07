"use client";

import Carousel from "@/components/ui/carousel";
import JobCard, { type JobCardProps } from "./job-card";

export default function FeaturedJobsCarousel({ jobs }: { jobs: JobCardProps[] }) {
  if (jobs.length === 0) return null;

  return (
    <Carousel
      options={{ loop: true, align: "center" }}
      slideClassName="flex-none w-[85vw] md:w-[560px]"
    >
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </Carousel>
  );
}
