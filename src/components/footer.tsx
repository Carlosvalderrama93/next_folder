import React from "react";
import { homePageData } from "@/Data/homepage";
import type { Footer as FooterType } from "@/Data/homepage";

function Footer(data: FooterType) {
  const { copyright, links, social } = data;
  return (
    <div className="bg-gray-800 text-white py-8 flex flex-col gap-4 px-15">
      <div className="flex flex-wrap ">
        <div className="flex flex-col gap-2 w-1/4">
          <div>
            <span className="font-bold text-3xl">Carlos Valderrama</span>
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            nulla, neque accusantium dolorum magnam repellat dolore.
          </p>
        </div>
        <div className="flex gap-8 flex-wrap w-3/4 justify-end">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg">Links</span>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="hover:underline text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg">Social</span>
            {social?.map((url) => (
              <a
                key={url.platform}
                href={url.url}
                className="hover:underline text-sm"
              >
                {url.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-4 text-sm text-right">
        <span>{copyright}</span>
      </div>
    </div>
  );
}

export default Footer;
