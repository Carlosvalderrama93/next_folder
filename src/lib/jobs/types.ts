import type { JobStatus, JobModality, JobPaymentType } from "@/types/homepage";

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: JobStatus;
  isOpen: boolean;
  skills: string[];
  modality?: JobModality;
  paymentType?: JobPaymentType;
  postedAt?: string;
  applyHref: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface ListJobsOptions {
  limit?: number;
}

export interface RawStrapiJob {
  id: number;
  documentId: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  isOpen: boolean;
  status?: string;
  skills?: string[];
  modality?: string;
  paymentType?: string;
  postedAt?: string;
  image?: { url: string; alternativeText?: string };
}
