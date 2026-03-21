import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJob } from "@/lib/strapi";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ApplyForm from "./apply-form";

interface JobData {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

async function getJob(id: string): Promise<JobData | null> {
  const strapiJob = await fetchStrapiJob(id);
  if (strapiJob) {
    return {
      id: strapiJob.documentId,
      title: strapiJob.title,
      description: strapiJob.description,
      location: strapiJob.location,
      type: strapiJob.jobType,
    };
  }

  const staticJob = homePageData.openPositions.find((j) => j.id === id);
  if (staticJob) {
    return {
      id: staticJob.id,
      title: staticJob.title,
      description: staticJob.description,
      location: staticJob.location,
      type: staticJob.type,
    };
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return { title: "Position Not Found" };
  return {
    title: `Apply — ${job.title} | Carlos Valderrama`,
    description: `Apply for ${job.title} · ${job.location}`,
    openGraph: {
      type: "website",
      title: `Apply — ${job.title}`,
      description: `Apply for ${job.title} · ${job.location}`,
    },
    twitter: {
      card: "summary",
      title: `Apply — ${job.title}`,
      description: `Apply for ${job.title} · ${job.location}`,
    },
  };
}

export default async function ApplyJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    jobLocation: { "@type": "Place", address: job.location },
    employmentType: job.type.toUpperCase().replace(/\s+/g, "_"),
    hiringOrganization: { "@type": "Organization", name: "Carlos Valderrama" },
  };

  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/apply"
          className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8 inline-block"
        >
          ← Back to Positions
        </Link>

        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
              Open
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{job.type}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
            {job.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{job.location}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {job.description}
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Your Application
        </h2>
        <ApplyForm jobTitle={job.title} jobId={job.id} />
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
