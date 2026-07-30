import allCountriesRaw from './allCountries.generated.json'

// Illustrative USD->EUR conversion — not a live-fetched EUR rate. Shared by
// the rate calculator and the provider-compare section so both use the
// exact same (disclosed, approximate) multiplier.
export const EUR_RATE = 0.92

// Fetched live on 2026-07-30 directly from smslocal.com/pricing's own
// backend (POST action=get_sms_rate to its WordPress admin-ajax.php, the
// same endpoint the live page's country selector calls) — not scraped from
// rendered DOM text, which earlier looked inconsistent due to render lag.
// Every code below returned this exact figure repeatedly when re-queried.
// Six countries the live site itself has no rate for are omitted rather
// than invented: HR, KI, MH, FM, PW, VA.
const RATES = {
  AF: 0.2409, AL: 0.0913, DZ: 0.1828, AD: 0.1220, AO: 0.0913, AG: 0.1220,
  AR: 0.0763, AM: 0.1773, AU: 0.0305, AT: 0.0305, AZ: 0.2984, BS: 0.0694,
  BH: 0.0305, BD: 0.2670, BB: 0.1220, BY: 0.1828, BE: 0.0913, BZ: 0.1980,
  BJ: 0.2039, BT: 0.3657, BO: 0.1052, BA: 0.0723, BW: 0.0229, BR: 0.0457,
  BN: 0.0533, BG: 0.0930, BF: 0.0600, BI: 0.1023, KH: 0.2440, CM: 0.1828,
  CA: 0.0305, CV: 0.2133, CF: 0.0305, TD: 0.1828, CL: 0.0384, CN: 0.0457,
  CO: 0.0182, KM: 0.0763, CR: 0.0305, CD: 0.0457, EC: 0.1250, EG: 0.2052,
  SV: 0.0586, GQ: 0.1525, ER: 0.0913, EE: 0.0457, SZ: 0.0305, ET: 0.2743,
  FJ: 0.1398, FI: 0.0763, FR: 0.0610, GA: 0.1813, GM: 0.1361, GE: 0.1097,
  DE: 0.0763, GH: 0.2210, GR: 0.0457, GD: 0.0610, GT: 0.1480, GN: 0.1229,
  GW: 0.1542, GY: 0.0997, HT: 0.1425, HN: 0.2133, HU: 0.0542, IS: 0.0569,
  IN: 0.0684, ID: 0.3037, IR: 0.1220, IQ: 0.2440, IE: 0.0457, IL: 0.2086,
  IT: 0.0457, CI: 0.1315, JM: 0.1713, JP: 0.1713, JO: 0.0774, KZ: 0.0774,
  KE: 0.1201, XK: 0.2133, KW: 0.1703, KG: 0.1828, LA: 0.1220, LV: 0.0457,
  LB: 0.2335, LS: 0.0217, LR: 0.2213, LY: 0.2440, LI: 0.0457, LT: 0.0381,
  LU: 0.0677, MG: 0.2353, MW: 0.2440, MY: 0.2480, MV: 0.2052, ML: 0.0610,
  MT: 0.0610, MR: 0.1220, MU: 0.1535, MX: 0.0763, MD: 0.0457, MC: 0.0610,
  MN: 0.0610, ME: 0.1066, MA: 0.1661, MZ: 0.1271, MM: 0.2937, NA: 0.0305,
  NR: 0.1828, NP: 0.1828, NL: 0.0730, NZ: 0.0610, NI: 0.0457, NE: 0.0485,
  NG: 0.3604, KP: 0.0305, MK: 0.0586, NO: 0.0610, OM: 0.0971, PK: 0.1980,
  PA: 0.1182, PG: 0.1828, PY: 0.0308, PE: 0.1568, PH: 0.1948, PL: 0.0305,
  PT: 0.0275, QA: 0.0229, CG: 0.2252, RO: 0.0457, RU: 0.4259, RW: 0.0305,
  KN: 0.1438, LC: 0.1066, VC: 0.1220, WS: 0.1438, SM: 0.0610, ST: 0.0913,
  SA: 0.0913, SN: 0.2325, RS: 0.2092, SC: 0.2151, SL: 0.0907, SG: 0.0445,
  SK: 0.0459, SI: 0.1250, SB: 0.0457, SO: 0.1282, ZA: 0.0283, KR: 0.0295,
  SS: 0.0457, ES: 0.0457, LK: 0.3457, SD: 0.2229, SR: 0.1828, SE: 0.0485,
  CH: 0.0451, SY: 0.2133, TJ: 0.2743, TZ: 0.2229, TH: 0.0122, TL: 0.0469,
  TG: 0.2440, TO: 0.0512, TT: 0.1828, TN: 0.1495, TR: 0.0182, TM: 0.2440,
  TV: 0.1229, UG: 0.1948, UA: 0.1201, AE: 0.0229, GB: 0.0402, US: 0.0305,
  UY: 0.0684, UZ: 0.2927, VU: 0.1828, VE: 0.0798, VN: 0.1349, YE: 0.1980,
  ZM: 0.2200, ZW: 0.1619, CU: 0.0593, CY: 0.0610, CZ: 0.0502, DK: 0.0457,
  DJ: 0.1066, DM: 0.0913, DO: 0.1229,
}

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
