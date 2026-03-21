"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Nav } from "../Data/homepage";
import { homePageData } from "../Data/homepage";

const nav: Nav = {
  ...homePageData.nav,
  links: homePageData.nav.links.map((l) =>
    l.href === "/blog" ? { ...l, href: "/articles" } : l
  ),
};

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white w-full px-6 md:px-10 py-4 border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link className="font-bold text-xl text-black hover:opacity-80" href="/">
          Carlos Valderrama
        </Link>
        <div className="hidden md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-gray-600 hover:text-black mx-4 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <Link
          href={nav.cta.href}
          className="px-5 py-2.5 font-semibold bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm"
        >
          {nav.cta.text}
        </Link>
      </div>

      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 flex flex-col px-6 py-4 gap-4 md:hidden shadow-md">
          {nav.links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-gray-700 hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={nav.cta.href}
            className="w-fit px-5 py-2.5 font-semibold bg-black text-white rounded-full hover:bg-gray-800 transition-colors text-sm"
            onClick={() => setMenuOpen(false)}
          >
            {nav.cta.text}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
