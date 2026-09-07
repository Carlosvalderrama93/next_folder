"use client";
import { useEffect, useState } from "react";

export default function AboutToc({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const activeIndex = sections.findIndex((s) => s.id === active);
  const prev = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const next = activeIndex < sections.length - 1 ? sections[activeIndex + 1] : null;
  const activeLabel = sections.find((s) => s.id === active)?.label ?? "";

  return (
    <>
      {/* ── Desktop side TOC ──────────────────────────────── */}
      <nav
        aria-label="Page sections"
        className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-3.5 z-30"
      >
        {sections.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className="flex items-center gap-2 group">
            <span
              className={`block h-px transition-all duration-200 ${
                active === id
                  ? "w-6 bg-brand"
                  : "w-3 bg-gray-300 dark:bg-gray-600 group-hover:w-5 group-hover:bg-brand/60"
              }`}
            />
            <span
              className={`text-[11px] font-medium transition-all duration-200 whitespace-nowrap ${
                active === id
                  ? "text-brand opacity-100"
                  : "text-muted-fg opacity-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
          </a>
        ))}
      </nav>

      {/* ── Mobile bottom navigator ───────────────────────── */}
      <div
        className={`xl:hidden fixed bottom-0 left-0 right-0 z-30 transition-transform duration-300 ${
          scrolled && active ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-3 mb-3 rounded-2xl bg-background/95 backdrop-blur-sm border border-border shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <a
              href={prev ? `#${prev.id}` : "#"}
              aria-label="Previous section"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                prev
                  ? "text-brand hover:bg-brand/10"
                  : "text-gray-300 dark:text-gray-700 pointer-events-none"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </a>
            <span className="text-sm font-semibold text-brand">{activeLabel}</span>
            <a
              href={next ? `#${next.id}` : "#"}
              aria-label="Next section"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                next
                  ? "text-brand hover:bg-brand/10"
                  : "text-gray-300 dark:text-gray-700 pointer-events-none"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
