"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const INTERVAL_MS = 2500;

export default function HeroCTA({ href }: { href: string }) {
  // Obtiene las traducciones del namespace "hero".
  const heroTranslations = useTranslations("hero");
  // Lee la lista de frases que se mostrará en el CTA.
  const phrases: string[] = heroTranslations.raw("phrases");

  // Controla qué frase se muestra actualmente.
  const [index, setIndex] = useState(0);
  // Controla si la frase actual es visible o está en transición.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cada cierto tiempo, la frase actual desaparece y luego cambia a la siguiente.
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 300);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center min-w-[220px] px-8 py-3.5 bg-brand text-white rounded-full font-semibold hover:bg-brand-hover transition-colors shadow-sm"
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
