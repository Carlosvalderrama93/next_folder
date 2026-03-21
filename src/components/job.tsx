import React from "react";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import type { Job } from "@/Data/homepage";

const positions: Job[] = homePageData.openPositions;
const authors = homePageData.authors;

function JobCard({ job }: { job: Job }) {
  const author = authors[0];
  return (
    <div className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-900">
      {job.image && (
        <img
          src={job.image}
          alt={job.title}
          className="w-full md:w-48 h-40 md:h-auto object-cover flex-shrink-0"
        />
      )}
      <div className="flex flex-col md:flex-row flex-1 p-6 gap-6">
        <div className="flex flex-col gap-2 md:w-44 flex-shrink-0">
          <span className="w-fit bg-blue-500 text-white px-4 py-1 rounded-full font-semibold text-xs">
            Open
          </span>
          <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-400 text-xs mt-2">
            <span className="flex items-center gap-2">
              📅 <span className="text-gray-700 dark:text-gray-300">{job.postedAt}</span>
            </span>
            <span className="flex items-center gap-2">
              🌍 <span className="text-gray-700 dark:text-gray-300">{job.location}</span>
            </span>
            <span className="flex items-center gap-2">
              💼 <span className="text-gray-700 dark:text-gray-300">{job.type}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-3 leading-snug">
              {job.title}
            </h2>
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
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-6 h-6 rounded-full object-cover"
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
  );
}

function Job() {
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
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

export default Job;
