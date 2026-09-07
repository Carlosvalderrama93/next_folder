import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getStrapiImageSrc,
  type ArticleBlock,
  type MediaFile,
} from "@/lib/articles";

export function RichTextBlock({ body }: { body: string }) {
  return (
    <div className="prose dark:prose-invert prose-gray max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}

export function QuoteBlock({
  title,
  body,
}: {
  title?: string;
  body: string;
}) {
  return (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 my-8">
      <p className="text-xl italic text-gray-700 dark:text-gray-300 leading-relaxed">
        &ldquo;{body}&rdquo;
      </p>
      {title && (
        <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block not-italic font-semibold">
          — {title}
        </cite>
      )}
    </blockquote>
  );
}

export function MediaBlock({ file }: { file: MediaFile }) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video">
        <Image
          src={getStrapiImageSrc(file.url)}
          alt={file.alternativeText ?? ""}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
    </figure>
  );
}

export function SliderBlock({ files }: { files: MediaFile[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto my-8 pb-2">
      {files.map((file, i) => (
        <div key={i} className="relative w-72 h-48 flex-shrink-0">
          <Image
            src={getStrapiImageSrc(file.url)}
            alt={file.alternativeText ?? ""}
            fill
            className="object-cover rounded-xl"
            sizes="288px"
          />
        </div>
      ))}
    </div>
  );
}

export function ArticleBlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "rich-text":
      return <RichTextBlock body={block.body} />;
    case "quote":
      return <QuoteBlock title={block.title ?? ""} body={block.body} />;
    case "media":
      return block.file ? <MediaBlock file={block.file} /> : null;
    case "slider":
      return block.files?.length ? <SliderBlock files={block.files} /> : null;
    default:
      return null;
  }
}

export function ArticleBlocks({ blocks }: { blocks?: ArticleBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, i) => (
        <div key={i} className="mb-6">
          <ArticleBlockRenderer block={block} />
        </div>
      ))}
    </>
  );
}

export default ArticleBlocks;
