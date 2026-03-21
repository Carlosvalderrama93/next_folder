import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import type { Job } from "@/Data/homepage";

const footerData = homePageData.footer;
const positions: Job[] = homePageData.openPositions;

export default function JobsPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Open Positions</h1>
          <p className="text-gray-500">
            {positions.length} position{positions.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {positions.map((job) => (
            <div
              key={job.id}
              className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {job.image && (
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-full md:w-48 h-44 object-cover flex-shrink-0"
                />
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                      Open
                    </span>
                    <span className="text-xs text-gray-400">{job.type}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>🌍 {job.location}</span>
                    <span>📅 {job.postedAt}</span>
                  </div>
                  <Link
                    href={job.applyUrl}
                    className="px-5 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
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
