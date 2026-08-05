import pageDates from './pageDates.generated.json'
import posts from './importedPosts.generated.json'
import countries from './countryPages.generated.json'
import { isTranslatedRoute } from './i18nScope.js'

/**
 * The routes that actually have a prerendered file in every language.
 *
 * This is deliberately narrower than isTranslatedRoute(). That predicate only
 * says "this route is in scope for translation"; it says nothing about whether
 * a file exists. Several paths are reachable in English purely through a
 * redirect in vercel.json — /register/ is the notable one, linked from 31
 * blog posts — and those have no page of their own to translate. Prefixing
 * such a link produced /it/register/: no file, no redirect, a hard 404, and
 * multiplied across 19 locales.
 *
 * Built from the same three generated sources prerender.mjs walks to decide
 * what to write, so the set the client advertises and the set the build emits
 * come from one place. prerender.mjs computes its own copy rather than
 * importing this module: it reads the JSON directly, which Vite resolves for
 * the browser bundle but Node's ESM loader rejects without an import
 * attribute.
 */
const ALL_ROUTES = [
  ...Object.keys(pageDates),
  ...posts.map((p) => p.routePath ?? `/blog/${p.slug}`),
  ...countries.map((c) => `/country-code/${c.slug}`),
]

export const TRANSLATED_ROUTES = new Set(ALL_ROUTES.filter(isTranslatedRoute))

const stripTrailing = (path) =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path || '/'

/** True only when /<locale><path>/ is a page that was actually generated. */
export function hasTranslatedPage(path) {
  return TRANSLATED_ROUTES.has(stripTrailing(path))
}
