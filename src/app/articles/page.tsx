interface ArticlesResponse {
  data: ArticleItem[];
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

export default async function JobsPage() {
  const basicStructure = {
    title: "A bug is becoming a meme on the internet",
    slug: "a-bug-is-becoming-a-meme-on-the-internet",
    category: {
      id: 2,
    },
    author: {
      id: 2,
    },
    description: "How a bug on MySQL is becoming a meme on the internet",
    cover: null,
    blocks: [
      {
        __component: "shared.rich-text",
        body: "## Probant \n\nse Lorem markdownum negat. Argo *saxa* videnda cornuaque hunc qui tanta spes teneas! Obliquis est dicenti est salutat ille tamen iuvenum nostrae dolore. - Colores nocituraque comitata eripiunt - Addit quodcunque solum cui et dextram illis - Nulli meus nec extemplo ille ferebat pressit Se blandita fulvae vox gravem Pittheus cesserunt sanguine herbis tu comitum tenuit. Sui in ruunt; Doridaque maculosae fuissem! Et loqui. \n\n## Abit sua\n\nse Lorem markdownum negat. Argo *saxa* videnda cornuaque hunc qui tanta spes teneas! Obliquis est dicenti est salutat ille tamen iuvenum nostrae dolore. - Colores nocituraque comitata eripiunt - Addit quodcunque solum cui et dextram illis - Nulli meus nec extemplo ille ferebat pressit Se blandita fulvae vox gravem Pittheus cesserunt sanguine herbis tu comitum tenuit. Sui in ruunt; Doridaque maculosae fuissem! Et loqui. ",
      },
      {
        __component: "shared.quote",
        title: "Thelonius Monk",
        body: "You've got to dig it to dig it, you dig?",
      },
      {
        __component: "shared.media",
        file: "coffee-art.jpg",
      },
      {
        __component: "shared.rich-text",
        body: "## Spatiantia astra \n\nFoeda, medio silva *errandum*: onus formam munere. Mutata bibulis est auxiliare arces etiamnunc verbis virgineo Priamidas illa Thescelus, nam fit locis lucis auras. Exitus hospes gratulor ut pondere [speslimite](http://www.curas.io/figuram); quid habent, Avernales faciente de. Pervenit Ino sonabile supplex cognoscenti vires, Bacchumque errat miserarum venandi dignabere dedisti. Discrimina iuncosaque virgaque tot sine superest [fissus](http://quos.org/sitet.aspx). Non color esset potest non sumit, sed vix arserat. Nisi immo silva tantum pectusque quos pennis quisquam artus!",
      },
      {
        __component: "shared.slider",
        files: ["coffee-art.jpg", "coffee-beans.jpg"],
      },
    ],
  };

  const res = await fetch("http://localhost:1337/api/articles", {
    cache: "no-store",
  });
  const json: ArticlesResponse = await res.json();
  //console.log(json);

  //console.log(basicStructure);
  if (!json || !json.data) {
    return <p>No jobs found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <ul className="space-y-2">
        {json.data.map((article: ArticleItem) => (
          <li key={article.id}>
            <a
              href={`/articles/${article.documentId}`}
              className="text-blue-600 hover:underline"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
