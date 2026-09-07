import { STRAPI_URL } from "@/lib/site-config";
import type { Job, RawStrapiJob, RawStaticJob, JobStatus } from "./types";

export function getStrapiImageSrc(url: string): string {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

export function normalizeStrapiJob(raw: RawStrapiJob): Job {
  const status: JobStatus =
    (raw.status as JobStatus | undefined) ?? (raw.isOpen ? "open" : "filled");

  return {
    id: String(raw.documentId),
    title: raw.title,
    description: raw.description,
    location: raw.location,
    type: raw.jobType,
    status,
    isOpen: raw.isOpen ?? (status === "open"),
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    modality: raw.modality as Job["modality"],
    paymentType: raw.paymentType as Job["paymentType"],
    postedAt: raw.postedAt,
    applyHref: `/jobs/${raw.documentId}`,
    imageUrl: raw.image?.url ? getStrapiImageSrc(raw.image.url) : undefined,
    imageAlt: raw.image?.alternativeText ?? raw.title,
  };
}

export function normalizeStaticJob(raw: RawStaticJob): Job {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    location: raw.location,
    type: raw.type,
    status: raw.status,
    isOpen: raw.status === "open",
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    modality: raw.modality,
    paymentType: raw.paymentType,
    postedAt: raw.postedAt,
    applyHref: `/jobs/${raw.id}`,
    imageUrl: raw.image,
    imageAlt: raw.title,
  };
}
