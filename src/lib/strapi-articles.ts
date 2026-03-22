import { STRAPI_URL } from "./config";

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
}

export interface StrapiMediaFile {
  url: string;
  alternativeText?: string;
}

export type StrapiBlock =
  | { __component: "shared.rich-text"; body: string }
  | { __component: "shared.quote"; title: string; body: string }
  | { __component: "shared.media"; file: StrapiMediaFile }
  | { __component: "shared.slider"; files: StrapiMediaFile[] };

export interface StrapiArticleDetail extends StrapiArticle {
  blocks: StrapiBlock[];
}

export async function fetchStrapiArticles(): Promise<StrapiArticle[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}

export async function fetchStrapiArticleDetail(
  documentId: string
): Promise<StrapiArticleDetail | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles/${documentId}?populate[blocks][populate]=*`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data ?? null;
  } catch {
    return null;
  }
}
