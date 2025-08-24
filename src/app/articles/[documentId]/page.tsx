// src/app/articles/[id]/page.tsx
interface ArticleResponse {
  data: ArticleItem;
  meta: {
    pagination: PaginationMeta;
  };
}

interface ArticleItem {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export default async function ArticleDetail({
  params,
}: {
  params: { documentId: string };
}) {
  const res = await fetch(
    `http://localhost:1337/api/articles/${params.documentId}`
  );
  const data: ArticleResponse = await res.json();
  const article: ArticleItem = data.data;
  console.log("Article data: " + JSON.stringify(article));
  console.log("Params: " + JSON.stringify(params));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <a href="/articles" style={{ color: "blue" }}>
        ← Back to Articles
      </a>
    </div>
  );
}
