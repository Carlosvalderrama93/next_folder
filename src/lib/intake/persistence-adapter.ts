import { STRAPI_URL } from "@/lib/site-config";
import type { ApplicationInput, InquiryInput } from "./types";

export interface PersistResult {
  saved: boolean;
  id?: string;
  error?: string;
}

export async function persistApplicationToStrapi(
  input: ApplicationInput
): Promise<PersistResult> {
  if (!STRAPI_URL) return { saved: false, error: "No STRAPI_URL configured" };
  try {
    const payload = {
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        linkedin: input.linkedin || null,
        jobId: input.jobId,
        coverLetter: input.message || null,
        cvFilename: input.cv ? input.cv.filename : null,
        status: "received",
      },
    };

    const res = await fetch(`${STRAPI_URL}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return { saved: false, error: `Strapi returned ${res.status}: ${errText}` };
    }

    const json = await res.json().catch(() => null);
    return { saved: true, id: json?.data?.documentId ?? json?.data?.id };
  } catch (err) {
    return {
      saved: false,
      error: err instanceof Error ? err.message : "Persistence network failure",
    };
  }
}

export async function persistInquiryToStrapi(
  input: InquiryInput
): Promise<PersistResult> {
  if (!STRAPI_URL) return { saved: false, error: "No STRAPI_URL configured" };
  try {
    const payload = {
      data: {
        name: input.name,
        email: input.email,
        subject: input.subject || null,
        message: input.message,
        status: "new",
      },
    };

    const res = await fetch(`${STRAPI_URL}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return { saved: false, error: `Strapi returned ${res.status}: ${errText}` };
    }

    const json = await res.json().catch(() => null);
    return { saved: true, id: json?.data?.documentId ?? json?.data?.id };
  } catch (err) {
    return {
      saved: false,
      error: err instanceof Error ? err.message : "Persistence network failure",
    };
  }
}
