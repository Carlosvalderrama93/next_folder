import React from "react";
import type { Nav } from "../Data/homepage";
import { homePageData } from "../Data/homepage";

const nav: Nav = homePageData.nav;

function Navigation() {
  return (
    <nav className="flex items-center justify-between p-6 bg-white shadow-md w-full h-16">
      <img src={nav.logo} alt="logo" className="h-8 w-8" />
      <span className="font-bold text-xl text-black">Recruiter</span>
      <div>
        {nav.links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-600 hover:text-gray-900 mx-4"
          >
            {link.name}
          </a>
        ))}
      </div>
      <a
        href={nav.cta.href}
        className="px-4 py-2 bg-violet-600 text-white rounded-full hover:bg-gray-100"
      >
        {nav.cta.text}
      </a>
    </nav>
  );
}

export default Navigation;
