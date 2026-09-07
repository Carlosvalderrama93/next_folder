"use client";
import { useState } from "react";

function parseParagraph(para: string, index: number) {
  const parts = para.split(/\*\*(.*?)\*\*/g);
  return (
    <p
      key={index}
      className={`leading-relaxed ${
        index === 0
          ? "text-lg text-gray-700 dark:text-gray-200"
          : "text-gray-600 dark:text-gray-300"
      }`}
    >
      {parts.map((part, j) =>
        j % 2 === 1 ? (
          <strong key={j} className="font-semibold text-gray-900 dark:text-white">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  );
}

interface AboutBioProps {
  paragraphs: string[];
  readMore: string;
  showLess: string;
}

export default function AboutBio({
  paragraphs,
  readMore,
  showLess,
}: AboutBioProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      <div className="flex flex-col gap-5">
        {visible.map((para, i) => parseParagraph(para, i))}
        {!expanded && paragraphs.length > 1 && (
          <button
            onClick={() => setExpanded(true)}
            className="self-start text-sm font-medium text-brand hover:text-brand-hover transition-colors"
          >
            {readMore} ↓
          </button>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="self-start text-sm font-medium text-muted-fg hover:text-brand transition-colors"
          >
            {showLess} ↑
          </button>
        )}
      </div>
    </section>
  );
}
