import { getJob } from "@/lib/jobs";
import { buildJobPostingJsonLd } from "@/lib/site-config";
import { JobDetailView } from "@/components/jobs";
import { StructuredData } from "@/components/ui/structured-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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

export default async function ApplyJobPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  return (
    <>
      <StructuredData data={buildJobPostingJsonLd(job)} />
      <JobDetailView job={job} locale={locale} />
    </>
  );
}
