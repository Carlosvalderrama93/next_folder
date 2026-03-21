import React from "react";
import type { Footer as FooterType } from "@/Data/homepage";

function Footer(data: FooterType) {
  const { copyright, links, social } = data;
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-10 px-6 md:px-16">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col gap-3 w-full md:w-1/4">
          <span className="font-bold text-2xl">Carlos Valderrama</span>
          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting top LATAM tech talent with leading companies worldwide.
          </p>
        </div>
        <div className="flex gap-12 flex-wrap flex-1 justify-end">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-1">
              Links
            </span>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          {social && social.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-1">
                Social
              </span>
              {social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500 text-right">
        {copyright}
      </div>
    </footer>
  );
}

export default Footer;
