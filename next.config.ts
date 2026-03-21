import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "split.trexthemes.dev" },
      { hostname: "zinduaschool.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "localhost" },
    ],
  },
};

export default nextConfig;
