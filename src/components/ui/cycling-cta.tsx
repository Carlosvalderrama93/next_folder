"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const INTERVAL_MS = 2500;

export default function CyclingCTA({ href }: { href: string }) {
  const t = useTranslations("hero");
  const phrases: string[] = t.raw("phrases");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
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
        {phrases[index]}
      </span>
    </Link>
  );
}
