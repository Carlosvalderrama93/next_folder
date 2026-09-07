export { siteConfig, SITE_URL, STRAPI_URL, NAV_LINKS } from "./config";
export { isRouteActive, isValidSocialUrl } from "./utils";
export {
  buildJobPostingJsonLd,
  buildArticleJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
  type StructuredJobData,
  type StructuredArticleData,
} from "./structured-data";
export type {
  NavKey,
  NavLink,
  NavCTA,
  SocialLink,
  HeroConfig,
  FooterConfig,
  SiteConfig,
} from "./types";

