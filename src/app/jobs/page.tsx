import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { homePageData } from "@/Data/homepage";
import { STRAPI_URL } from "@/lib/config";
import type { Metadata, Job } from "next";

export const metadata: Metadata = {
  title: "Open Positions | Carlos Valderrama",
  description: "Browse remote and hybrid tech jobs in LATAM. Apply today.",
};

interface StrapiJob {
  id: number;
  documentId: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  isOpen: boolean;
  image?: { url: string; alternativeText?: string };
}

async function getStrapiJobs(): Promise<StrapiJob[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/jobs?populate=image`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}

export default async function JobsPage() {
  const strapiJobs = await getStrapiJobs();
  const staticPositions = homePageData.openPositions;
  const footerData = homePageData.footer;

  const usingStrapiJobs = strapiJobs.length > 0;

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Open Positions
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {(usingStrapiJobs ? strapiJobs : staticPositions).length} position
            {(usingStrapiJobs ? strapiJobs : staticPositions).length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {usingStrapiJobs
            ? strapiJobs.map((job) => {
                const imgSrc = job.image
                  ? job.image.url.startsWith("http")
                    ? job.image.url
                    : `${STRAPI_URL}${job.image.url}`
                  : null;
                return (
                  <div
                    key={job.id}
                    className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {imgSrc && (
                      <div className="relative w-full md:w-48 h-44 flex-shrink-0">
                        <Image
                          src={imgSrc}
                          alt={job.image?.alternativeText ?? job.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 192px"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          {job.isOpen && (
                            <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                              Open
                            </span>
                          )}
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {job.jobType}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {job.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                          {job.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-end mt-5">
                        <Link
                          href={`/apply/${job.documentId}`}
                          className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            : staticPositions.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
                >
                  {job.image && (
                    <div className="relative w-full md:w-48 h-44 flex-shrink-0">
                      <Image
                        src={job.image}
                        alt={job.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                          Open
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {job.type}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>🌍 {job.location}</span>
                        <span>📅 {job.postedAt}</span>
                      </div>
                      <Link
                        href={job.applyUrl}
                        className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </main>
      <Footer {...footerData} />
    </>
  );
}
