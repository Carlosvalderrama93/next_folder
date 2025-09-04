import React from "react";
import type { Nav } from "../Data/homepage";
import { homePageData } from "../Data/homepage";

const nav: Nav = homePageData.nav;

function Navigation() {
  return (
    <nav className="flex items-center justify-between bg-white w-full h-25 px-10 ">
      <div className="flex items-center gap-10">
        <a className="font-bold text-2xl text-black hover:underline" href="/">
          Carlos Valderrama
        </a>
        <div>
          {nav.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-semibold hover:text-gray-900 mx-4 hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div>
        <a
          href={nav.cta.href}
          className="px-5 py-3 h-10 font-bold bg-black text-white rounded-full hover:bg-gray-800 "
        >
          {nav.cta.text}
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
