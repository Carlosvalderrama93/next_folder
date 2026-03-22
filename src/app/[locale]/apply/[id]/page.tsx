import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { homePageData } from "@/Data/homepage";
import { fetchStrapiJob } from "@/lib/strapi";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { getTranslations } from "next-intl/server";
import ApplyForm from "./apply-form";

interface JobData {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

const getJob = cache(async function getJob(id: string): Promise<JobData | null> {
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
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const job = await getJob(id);
  const t = await getTranslations({ locale, namespace: "applyJobPage" });
  if (!job) return { title: t("positionNotFound") };
  return {
    title: `Apply — ${job.title}`,
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

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default async function ApplyJobPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const job = await getJob(id);
  const t = await getTranslations({ locale, namespace: "applyJobPage" });

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
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-16">
        <Breadcrumb
          items={[
            { label: t("breadcrumbHome"), href: "/" },
            { label: t("breadcrumbPositions"), href: "/apply" },
            { label: job.title },
          ]}
        />

        <div className="border border-gray-200 dark:border-border rounded-2xl overflow-hidden bg-white dark:bg-surface mb-10">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-emerald-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                {t("open")}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{job.type}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">
              {job.title}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <MapPinIcon />
              {job.location}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t("yourApplication")}
        </h2>
        <ApplyForm jobTitle={job.title} jobId={job.id} />
      </main>
      <Footer {...homePageData.footer} />
    </>
  );
}
