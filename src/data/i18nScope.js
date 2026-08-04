/**
 * Which routes exist in every language.
 *
 * An exclude list rather than an allow list: the site is translated by
 * default, and only these opt out. That inversion is the point — while this
 * was an allow list, every page outside it silently dropped the visitor back
 * to English and hid the language switcher, so browsing the site in Korean
 * ended the moment you clicked almost anything.
 *
 * Kept out:
 *  - /login, /signup hand off to secure.smslocal.com, which is English-only;
 *    translating the page around that is a promise the next screen breaks.
 *  - /terms-and-conditions, /privacy-policy are legal text. A machine
 *    translation of a contract is not the contract, and publishing one as if
 *    it were is worse than linking the English original.
 */
const EXCLUDED = new Set([
  '/login',
  '/signup',
  '/terms-and-conditions',
  '/privacy-policy',
])

/**
 * Whole sections held back for now, purely on build cost: the 195 country
 * detail pages and the 32 blog posts are ~4,200 extra pages across 19
 * languages, all fresh translations against a rate-limited free endpoint,
 * which is hours of build time. The marketing pages ship translated first;
 * these follow in a later pass once their translations are cached.
 *
 * Prefixes, not exact paths — the /country-code hub itself is a marketing
 * page and stays translated; only its per-country children are held back.
 */
const EXCLUDED_PREFIXES = ['/country-code/', '/blog/', '/resources/insights/']

const stripTrailing = (path) =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path || '/'

export function isTranslatedRoute(path) {
  const clean = stripTrailing(path)
  if (EXCLUDED.has(clean)) return false
  return !EXCLUDED_PREFIXES.some((p) => clean.startsWith(p))
}

export { EXCLUDED }
