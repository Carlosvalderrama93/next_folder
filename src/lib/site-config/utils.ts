/**
 * Determines whether a given navigation link href is currently active based on the current pathname.
 * Root path ("/") requires exact match; sub-routes match prefixes.
 */
export function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(href);
}

/**
 * Validates that a social URL matches an expected secure protocol and platform domain.
 */
export function isValidSocialUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname.length > 0;
  } catch {
    return false;
  }
}
