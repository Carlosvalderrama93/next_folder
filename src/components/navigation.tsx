"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Nav } from "../Data/homepage";
import { homePageData } from "../Data/homepage";
import { ThemeToggle } from "./theme-toggle";
import { TooltipProvider } from "./ui/tooltip";

const nav: Nav = {
  ...homePageData.nav,
  links: homePageData.nav.links.map((l) =>
    l.href === "/blog" ? { ...l, href: "/articles" } : l
  ),
};

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <TooltipProvider>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    <nav className="flex items-center justify-between bg-white/90 dark:bg-gray-950/90 backdrop-blur-md w-full px-6 md:px-10 py-4 border-b border-gray-100/80 dark:border-gray-800/80 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link
          className="font-bold text-xl text-black dark:text-white hover:opacity-80"
          href="/"
        >
          Carlos Valderrama
        </Link>
        <div className="hidden md:flex">
          {nav.links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`font-medium mx-4 transition-colors pb-0.5 border-b-2 ${
                  isActive
                    ? "text-black dark:text-white border-brand"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />
        <Link
          href={nav.cta.href}
          className="px-5 py-2.5 font-semibold bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm"
        >
          {nav.cta.text}
        </Link>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          className="flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-black dark:bg-white transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 flex flex-col px-6 py-4 gap-4 md:hidden shadow-md">
          {nav.links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`font-medium transition-colors pl-3 border-l-2 ${
                  isActive
                    ? "text-black dark:text-white border-brand"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-transparent"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href={nav.cta.href}
            className="w-fit px-5 py-2.5 font-semibold bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-sm"
            onClick={() => setMenuOpen(false)}
          >
            {nav.cta.text}
          </Link>
        </div>
      )}
    </nav>
    </TooltipProvider>
  );
}

export default Navigation;
