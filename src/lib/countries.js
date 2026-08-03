import countries from '../data/countryPages.generated.json'
import { COUNTRY_CONTENT, FEATURED } from '../data/countryContent.js'

/**
 * A country page is the generated facts plus, where a market has actually been
 * researched, the authored content. `researched` is what the page keys off to
 * decide whether it can show regulatory sections at all — a country without it
 * gets the factual page and no compliance claims.
 */
export function getCountry(slug) {
  const base = countries.find((c) => c.slug === slug)
  if (!base) return null
  const content = COUNTRY_CONTENT[slug] ?? null
  return { ...base, ...content, researched: Boolean(content) }
}

/**
 * Markets with authored operator/regulatory content. These are the ones the
 * hero and the popular strip feature, because they have something to say.
 */
export const researchedCountries = FEATURED.map(getCountry).filter(Boolean)

/**
 * Every country gets a page. The 175 without authored content show verified
 * facts only — dial code, ISO, population, area, GDP — and say plainly that
 * their sending rules have not been verified. They never carry an invented
 * regulatory claim; see countryContent.js.
 */
export const publishedCountries = countries.map((c) => getCountry(c.slug))

export const allCountries = countries

/**
 * Stable per-country variant, so pages don't all present in the same order.
 * Derived from the slug rather than random, so a country's layout is the same
 * on every build and between server and client.
 */
export function variantOf(slug) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return h
}

export const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : '—')

/** Neighbouring markets by dial-code proximity, for the "explore more" rail. */
export function relatedCountries(slug, count = 6) {
  const me = getCountry(slug)
  if (!me) return []
  return publishedCountries
    .filter((c) => c.slug !== slug)
    .sort((a, b) => {
      const d = Math.abs(Number(a.dial.slice(1)) - Number(me.dial.slice(1)))
      const e = Math.abs(Number(b.dial.slice(1)) - Number(me.dial.slice(1)))
      return d - e
    })
    .slice(0, count)
}
