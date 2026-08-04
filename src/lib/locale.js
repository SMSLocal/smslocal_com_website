import { LOCALE_CODES } from '../data/languages.js'

/**
 * Locale is carried purely as a URL prefix (/fr/pricing/), read the same way
 * on the server (StaticRouter's `location` string) and the client
 * (BrowserRouter's real URL) — one code path, no special-casing between SSR
 * and CSR. See App.jsx for where this gets applied.
 */
export function getLocaleFromPathname(pathname) {
  const first = (pathname || '/').split('/')[1]
  return LOCALE_CODES.includes(first) ? first : 'en'
}

export function stripLocaleFromPathname(pathname) {
  const locale = getLocaleFromPathname(pathname)
  if (locale === 'en') return pathname || '/'
  const stripped = pathname.slice(locale.length + 1)
  return stripped || '/'
}

export function addLocaleToPath(path, locale) {
  const clean = stripLocaleFromPathname(path)
  if (locale === 'en') return clean
  return clean === '/' ? `/${locale}/` : `/${locale}${clean.endsWith('/') ? clean : `${clean}/`}`
}
