// ── Domain Entity Types ──────────────────────────────────────────────────────

export interface ArticleAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export interface MediaFile {
  url: string;
  alternativeText?: string;
}

export type ArticleBlock =
  | { type: "rich-text"; body: string }
  | { type: "quote"; title?: string; body: string }
  | { type: "media"; file: MediaFile }
  | { type: "slider"; files: MediaFile[] };

export interface Article {
  id: string;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  coverImage?: string;
  category: string;
  date: string;
  publishedAt: string;
  author?: ArticleAuthor;
  href: string;
}

export interface ArticleDetail extends Article {
  blocks: ArticleBlock[];
}

export interface ListArticlesOptions {
  limit?: number;
  category?: string;
}

// ── Raw Strapi Response Shapes ───────────────────────────────────────────────

export interface RawStrapiMediaFile {
  url: string;
  alternativeText?: string;
}

export type RawStrapiBlock =
  | { __component: "shared.rich-text"; body: string }
  | { __component: "shared.quote"; title?: string; body: string }
  | { __component: "shared.media"; file?: RawStrapiMediaFile }
  | { __component: "shared.slider"; files?: RawStrapiMediaFile[] };

export interface RawStrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  slug: string;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
  category?: string;
  cover?: {
    url?: string;
    alternativeText?: string;
  };
}

export interface RawStrapiArticleDetail extends RawStrapiArticle {
  blocks?: RawStrapiBlock[];
}
