import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";

const { openPositions, footer } = homePageData;

export default function ApplyPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-3">Apply for a Job</h1>
        <p className="text-gray-500 mb-10">
          Choose a position below and send us your application.
        </p>

        <div className="flex flex-col gap-4">
          {openPositions.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                    Open
                  </span>
                  <span className="text-xs text-gray-400">{job.type}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {job.location} · {job.postedAt}
                </p>
              </div>
              <Link
                href={job.applyUrl}
                className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors flex-shrink-0 ml-4"
              >
                Apply
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-gray-200 rounded-xl p-8 bg-gray-50 text-center">
          <h2 className="text-xl font-bold mb-2">Don&apos;t see the right role?</h2>
          <p className="text-gray-500 text-sm mb-5">
            Send us a message and we&apos;ll keep you in mind for future openings.
          </p>
          <Link
            href="/contact"
            className="px-7 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}
