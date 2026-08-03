/**
 * The site publishes every URL with a trailing slash (vercel.json sets
 * trailingSlash: true, so /pricing 308-redirects to /pricing/). Two helpers,
 * because the two directions are needed in different places:
 *
 * - `withSlash` for anything emitted outward — canonical tags, JSON-LD, the
 *   sitemap. These must match the URL the server actually serves, or the
 *   canonical points at a redirect.
 * - `stripSlash` for internal matching — route lookups and the pageDates map
 *   are keyed off App.jsx's route paths, which carry no trailing slash.
 *
 * The root is "/" in both forms.
 */
export function withSlash(path) {
  if (!path) return "/";
  const [base, ...rest] = path.split(/(?=[?#])/);
  const suffix = rest.join("");
  if (base.endsWith("/")) return base + suffix;
  // A path whose last segment has an extension is a file (/sitemap.xml), not a
  // page — appending a slash there would 404.
  if (/\.[a-z0-9]+$/i.test(base)) return base + suffix;
  return `${base}/${suffix}`;
}

export function stripSlash(path) {
  if (!path) return "/";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}
