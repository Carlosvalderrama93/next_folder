"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS, siteConfig, isRouteActive } from "@/lib/site-config";
import { ThemeToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";

const ctaHref = siteConfig.navCta.href;

function Navigation() {
  const translate = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {menuOpen && (
        
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        
      )}
      <nav className="flex items-center justify-between bg-white/90 dark:bg-background/90 backdrop-blur-md w-full px-6 md:px-10 py-4 border-b border-gray-100/80 dark:border-border sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link
            className="font-bold text-xl text-black dark:text-white hover:opacity-80"
            href="/"
          >
            Carlos Valderrama
          </Link>
          <div className="hidden md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = isRouteActive(pathname, link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-medium mx-4 transition-colors pb-0.5 border-b-2 ${
                    isActive
                      ? "text-black dark:text-foreground border-brand"
                      : "text-gray-500 dark:text-muted-fg hover:text-black dark:hover:text-foreground border-transparent"
                  }`}
                >
                  {translate(link.key)}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href={ctaHref}
            className="px-5 py-2.5 font-semibold bg-brand text-white rounded-full hover:bg-brand-hover transition-colors text-sm"
          >
            {translate("cta")}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
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
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-white dark:bg-background border-b border-gray-100 dark:border-border flex flex-col px-6 py-4 gap-4 md:hidden shadow-md"
          >
            {NAV_LINKS.map((link) => {
              const isActive = isRouteActive(pathname, link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-medium transition-colors pl-3 border-l-2 ${
                    isActive
                      ? "text-black dark:text-foreground border-brand"
                      : "text-gray-500 dark:text-muted-fg hover:text-black dark:hover:text-foreground border-transparent"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {translate(link.key)}
                </Link>
              );
            })}
            <Link
              href={ctaHref}
              className="w-fit px-5 py-2.5 font-semibold bg-brand text-white rounded-full hover:bg-brand-hover transition-colors text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {translate("cta")}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navigation;
