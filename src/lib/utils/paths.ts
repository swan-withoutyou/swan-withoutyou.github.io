/** Prefixes a public asset path with the configured basePath (needed for raw <img>/<a> on project pages). */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(path: string, siteUrl: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
