import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import { notFound } from "next/navigation";
import ApplyForm from "./apply-form";

const { openPositions, footer } = homePageData;

export default async function ApplyJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = openPositions.find((j) => j.id === id);

  if (!job) notFound();

  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/apply"
          className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8 inline-block"
        >
          ← Back to Positions
        </Link>

        {/* Job summary */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
              Open
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {job.type}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
            {job.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {job.location} · Posted {job.postedAt}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Application form */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Your Application
        </h2>
        <ApplyForm jobTitle={job.title} jobId={job.id} />
      </main>
      <Footer {...footer} />
    </>
  );
}
