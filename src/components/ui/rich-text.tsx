import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface RichTextProps {
  content?: string;
  className?: string;
}

/**
 * Domain-agnostic markdown presentation adapter.
 * Encapsulates react-markdown, remark-gfm, and Tailwind typography styling.
 */
export function RichText({ content, className = "" }: RichTextProps) {
  if (!content) return null;

  return (
    <div
      className={`prose prose-gray dark:prose-invert max-w-none ${className}`.trim()}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

export default RichText;
