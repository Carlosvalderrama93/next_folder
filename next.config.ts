import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale/apply",
        destination: "/:locale/jobs",
        permanent: true,
      },
      {
        source: "/:locale/apply/:id",
        destination: "/:locale/jobs/:id",
        permanent: true,
      },
    ];
  },
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

export default withNextIntl(nextConfig);
