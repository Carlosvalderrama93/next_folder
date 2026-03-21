import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJobs } from "@/lib/strapi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | Carlos Valderrama",
  description: "Browse and apply for open tech positions. Remote jobs for LATAM talent.",
};

interface JobRow {
  id: string;
  title: string;
  location: string;
  type: string;
  postedAt?: string;
  isOpen: boolean;
  applyHref: string;
}

export default async function ApplyPage() {
  const strapiJobs = await fetchStrapiJobs();
  const { openPositions, footer } = homePageData;

  const jobs: JobRow[] =
    strapiJobs.length > 0
      ? strapiJobs.map((job) => ({
          id: job.documentId,
          title: job.title,
          location: job.location,
          type: job.jobType,
          isOpen: job.isOpen,
          applyHref: `/apply/${job.documentId}`,
        }))
      : openPositions.map((job) => ({
          id: job.id,
          title: job.title,
          location: job.location,
          type: job.type,
          postedAt: job.postedAt,
          isOpen: true,
          applyHref: `/apply/${job.id}`,
        }));

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          Apply for a Job
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Choose a position below and send us your application.
        </p>

        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  {job.isOpen && (
                    <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                      Open
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500">{job.type}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {job.location}{job.postedAt ? ` · ${job.postedAt}` : ""}
                </p>
              </div>
              <Link
                href={job.applyHref}
                className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex-shrink-0 ml-4"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-gray-50 dark:bg-gray-900 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Don&apos;t see the right role?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
            Send us a message and we&apos;ll keep you in mind for future openings.
          </p>
          <Link
            href="/contact"
            className="px-7 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}
