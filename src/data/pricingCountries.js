import allCountriesRaw from './allCountries.generated.json'

// Illustrative USD->EUR conversion — not a live-fetched EUR rate. Shared by
// the rate calculator and the provider-compare section so both use the
// exact same (disclosed, approximate) multiplier.
export const EUR_RATE = 0.92

// Only United States carries a verified real rate. The live site's rate
// fluctuated between checks on 2026-07-29 ($0.0822, then $0.0305) — this
// uses the more recently confirmed, currently-live figure ($0.0305/SMS,
// matching what smslocal.com/pricing's own provider-compare table shows).
// Every other country is selectable but has no fetched rate — see
// PricingRateCalculator.jsx for the full sourcing note. Do not invent a
// number for any code not listed here.
const RATES = { US: 0.0305 }

// Matches the real site's own "Popular Countries" set, kept pinned to the
// top of the dropdown ahead of the alphabetical remainder.
const POPULAR_CODES = ['US', 'GB', 'AE', 'AU', 'ES']

function toEntry(c) {
  return { code: c.code, name: c.name, flagSrc: `/flags/${c.code.toLowerCase()}.svg`, rate: RATES[c.code] ?? null }
}

const byCode = Object.fromEntries(allCountriesRaw.map((c) => [c.code, c]))

export const POPULAR_COUNTRIES = POPULAR_CODES.map((code) => toEntry(byCode[code]))

export const OTHER_COUNTRIES = allCountriesRaw
  .filter((c) => !POPULAR_CODES.includes(c.code))
  .map(toEntry)

// Full list, popular countries first — this is what most callers want.
export const COUNTRIES = [...POPULAR_COUNTRIES, ...OTHER_COUNTRIES]
