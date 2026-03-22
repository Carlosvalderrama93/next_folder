"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PHRASES = [
  "Find jobs for me",
  "Match jobs to me",
  "Apply to be offered",
  "Get job offers",
  "Offer me roles",
  "Source my next role",
  "Recommend me jobs",
];

const INTERVAL_MS = 2500;

export default function CyclingCTA({ href }: { href: string }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 300);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center min-w-[220px] px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
    >
      <span
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          display: "inline-block",
        }}
      >
        {PHRASES[index]}
      </span>
    </Link>
  );
}
