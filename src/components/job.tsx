import Image from "next/image";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import type { Job } from "@/Data/homepage";
import { STRAPI_URL } from "@/lib/config";

const authors = homePageData.authors;

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

async function fetchStrapiJobs(): Promise<StrapiJob[]> {
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

async function Job() {
  const strapiJobs = await fetchStrapiJobs();
  const author = authors[0];

  if (strapiJobs.length > 0) {
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
            View all jobs →
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {strapiJobs.slice(0, 3).map((job) => {
            const imgSrc = job.image
              ? job.image.url.startsWith("http")
                ? job.image.url
                : `${STRAPI_URL}${job.image.url}`
              : null;
            return (
              <div
                key={job.id}
                className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white dark:bg-gray-900"
              >
                {imgSrc && (
                  <div className="relative w-full md:w-48 h-40 flex-shrink-0">
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
                    <div className="flex items-center gap-2 mb-2">
                      {job.isOpen && (
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full font-semibold text-xs">
                          Open
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {job.jobType}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      href={`/apply/${job.documentId}`}
                      className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    >
                      Apply Now
                    </Link>
                    {author && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                        )}
                        <span>
                          Posted by{" "}
                          <span className="font-semibold">{author.name}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Fallback: static data
  const positions: Job[] = homePageData.openPositions;
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
          View all jobs →
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {positions.map((job) => (
          <div
            key={job.id}
            className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white dark:bg-gray-900"
          >
            {job.image && (
              <div className="relative w-full md:w-48 h-40 flex-shrink-0">
                <Image
                  src={job.image}
                  alt={job.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              </div>
            )}
            <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
              <div className="flex flex-col gap-2 md:w-44 flex-shrink-0">
                <span className="w-fit bg-blue-500 text-white px-4 py-1 rounded-full font-semibold text-xs">
                  Open
                </span>
                <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-400 text-xs mt-2">
                  <span className="flex items-center gap-2">
                    📅{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {job.postedAt}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    🌍{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {job.location}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    💼{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {job.type}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-3">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={job.applyUrl}
                    className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    Apply Now
                  </Link>
                  {author && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          width={24}
                          height={24}
                          className="rounded-full object-cover"
                        />
                      )}
                      <span>
                        Posted by{" "}
                        <span className="font-semibold">{author.name}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Job;
