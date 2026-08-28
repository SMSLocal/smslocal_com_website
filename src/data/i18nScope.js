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
 *  - /login hands off to secure.smslocal.com, which is English-only;
 *    translating the page around that is a promise the next screen breaks.
 *
 * /signup was held back for the same reason as /login (its final step also
 * talks to an external, English-only backend), but the site owner asked for
 * it translated (2026-08-28) anyway — it's their call. Two things stay
 * English even with this on: whatever secure.smslocal.com itself shows after
 * signup, and any error message the WordPress AJAX backend returns at
 * runtime (only the static React-rendered labels/copy are translatable —
 * a server response isn't known ahead of time to put in a dictionary).
 *
 * /terms-and-conditions and /privacy-policy were held back too, on the view
 * that a machine translation of a contract is not the contract. The site owner
 * asked for them translated (2026-08-05); it is their call to make, and a
 * visitor reading the site in Japanese being unable to read the terms at all
 * is its own problem. Worth adding a line to both pages naming the English
 * version as the binding one — that is the normal way sites carry translated
 * legal text, and it costs nothing.
 */
const EXCLUDED = new Set([
  '/login',
])

/**
 * Nothing is held back by section. Country pages and blog posts were excluded
 * for two builds while their translations were being fetched, and the cost of
 * that showed: switching to Korean on the homepage and opening a blog post
 * dropped the visitor back to English with the switcher gone, because that
 * page had no Korean version to offer. Every page now exists in every
 * language, so the language survives wherever you click.
 */
const stripTrailing = (path) =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path || '/'

export function isTranslatedRoute(path) {
  return !EXCLUDED.has(stripTrailing(path))
}

export { EXCLUDED }
