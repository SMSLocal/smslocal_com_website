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

const stripTrailing = (path) =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path || '/'

export function isTranslatedRoute(path) {
  return !EXCLUDED.has(stripTrailing(path))
}

export { EXCLUDED }
