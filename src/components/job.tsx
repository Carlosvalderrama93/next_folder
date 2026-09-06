import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { listJobs } from "@/lib/jobs";
import JobCarousel from "@/components/job-carousel";

export default async function Job() {
  const jobTranslations = await getTranslations("jobs");
  const jobs = await listJobs({ limit: 8 });

  return (
    <section className="py-16 border-t border-gray-100 dark:border-border">
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground text-pretty">
          {jobTranslations("heading")}
        </h2>
        <div className="mt-3 w-10 h-1 bg-brand rounded-full" />
      </div>
      <JobCarousel jobs={jobs} />
      <div className="flex justify-center mt-8">
        <Link
          href="/jobs"
          className="group text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-brand transition-colors inline-flex items-center gap-1"
        >
          {jobTranslations("browseAll")}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
