"use client";
import { useState } from "react";

const MOBILE_MAX = 3;

export default function HeadlinePills({ pills }: { pills: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = pills.length > MOBILE_MAX;

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((h, i) => (
        <span
          key={h}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-700/50 ${
            !expanded && i >= MOBILE_MAX ? "hidden sm:inline-flex" : "inline-flex"
          }`}
        >
          {h}
        </span>
      ))}
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="sm:hidden px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-muted-fg border border-border"
        >
          {expanded ? "−" : `+${pills.length - MOBILE_MAX}`}
        </button>
      )}
    </div>
  );
}
