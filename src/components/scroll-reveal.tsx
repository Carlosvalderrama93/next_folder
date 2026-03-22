"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export default function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.07 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-hidden${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
