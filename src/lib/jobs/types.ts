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

export interface JobFilterCriteria {
  query?: string;
  statuses?: Set<JobStatus> | JobStatus[];
  skills?: Set<string> | string[];
  modalities?: Set<JobModality> | JobModality[];
  paymentTypes?: Set<JobPaymentType> | JobPaymentType[];
}

export interface ListJobsOptions {
  limit?: number;
  filter?: JobFilterCriteria;
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
