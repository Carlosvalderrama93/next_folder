import React from "react";
import type { Job, BlogPreview, Author } from "../Data/homepage";
import { homePageData } from "../Data/homepage";

const positions: Job[] = homePageData.openPositions;
const articles: BlogPreview[] = homePageData.blogPreview;
const authors = homePageData.authors;

function Author(author: Author) {
  return (
    <div className="text-sm text-gray-600 flex items-center gap-2 mt-4">
      <img
        src={author.avatar}
        alt="Avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
      <span>By</span>
      <a href={`authors/${author.slug}`} className="underline font-bold">
        {author.name}
      </a>
    </div>
  );
}

function Article(article: BlogPreview) {
  return (
    <div className="flex flex-col justify-between w-[300px] h-[500px] border rounded-lg border-gray-200 p-6 m-2 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02] transform hover:z-10">
      <img
        src={article.coverImage}
        alt="Job Image"
        className="object-cover rounded-xl mb-4 w-full h-48"
      />
      <div>
        <span className="text-gray-950 font-extrabold tracking-wider text-xs mb-2 block">
          LATEST
        </span>
        <h2 className="text-gray-950 font-bold text-base pb-2 truncate">
          {article.title}
        </h2>
        <p className="leading[1.6] text-gray-950 text-sm line-clamp-4">
          {article.excerpt}
        </p>
        <a
          href={`/articles/${article.slug}`}
          className="font-bold text-blue-500 text-sm text-sm mt-4 inline-block hover:underline"
        >
          See more
        </a>
      </div>
      <Author {...authors[0]} />
    </div>
  );
}

function BigArticle(article: BlogPreview) {
  return (
    <div className="flex h-[460px] mx-4 mb-16 box-border h-">
      <a href={article.slug} className="flex-shrink-0 ">
        <img
          src={article.coverImage}
          alt="Image"
          className="min-w-sm object-cover rounded-4xl h-[460px] w-[502px] flex-shrink-0"
        />
      </a>
      <div className="flex flex-col max-w-xlg justify-center my-10 p-10">
        <span className="text-back font-bold text-sm">LATEST</span>
        <div>
          <a href={article.slug}>
            <h2 className="text-4xl font-bold py-8">{article.title}</h2>
          </a>
          <p className="text-gray-600 leading-[1.8]">{article.excerpt}</p>
        </div>
        <Author {...authors[0]} />
      </div>
    </div>
  );
}
function SmallArticle() {
  return <div>positions</div>;
}

function Articles() {
  return (
    <section className="flex flex-col items-center py-12 max-w-7xl mx-auto">
      <h1 className="text-black font-bold text-4xl mb-10">Articles</h1>
      <div className="flex justify-center p-6 flex-wrap">
        {articles.map((post, idx) =>
          idx === 0 ? (
            <BigArticle key={post.id} {...post} />
          ) : (
            <Article key={post.id} {...post} />
          )
        )}
      </div>
    </section>
  );
}

export default Articles;
