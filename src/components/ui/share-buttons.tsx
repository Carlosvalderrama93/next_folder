"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const linkClass =
    "text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5";

  return (
    <div className="flex items-center gap-3 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
      <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-widest">
        Share
      </span>
      <button onClick={copyLink} className={linkClass}>
        {copied ? "✓ Copied!" : "Copy link"}
      </button>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        LinkedIn
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Twitter
      </a>
    </div>
  );
}
