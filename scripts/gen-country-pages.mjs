// Builds src/data/countryPages.generated.json — the factual base for the
// /country-code/ pages. Merges what the repo already has (ISO code, name, dial
// code) with the figures published on countrycode.org (population, area, GDP).
//
// Run explicitly, not on every build: it fetches a third-party page, and the
// numbers change rarely. `node scripts/gen-country-pages.mjs`
//
// Only verifiable facts live here. Anything about carriers, sender-ID rules or
// DND regulation is authored per country in src/data/countryContent.js, and
// only for countries where that has actually been checked — inventing it would
// be telling customers something false about what they are allowed to send.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import world from 'world-countries'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dial = JSON.parse(readFileSync(join(root, 'src/data/dialCodes.generated.json'), 'utf8'))

// Continent per country, from the world-countries package already in the tree.
// Keyed on ISO alpha-2, which both sides carry, rather than on name.
const REGION = new Map(world.map((c) => [c.cca2, c.region]))

// world-countries follows the UN geoscheme, which files Russia under Europe
// (its Eastern-Europe subregion) despite most of its territory and the
// directory's own dial-code neighbours sitting in Asia. Overridden to match
// how this directory is actually browsed.
const REGION_OVERRIDES = { RU: 'Asia' }

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// A handful of countries are known by their initialism, not their slugified
// name — URLs, COUNTRY_CONTENT keys and the redirects in vercel.json all
// depend on these exact values, so they must survive a re-run of this script.
const SLUG_OVERRIDES = {
  'united-states': 'usa',
  'united-kingdom': 'uk',
  'united-arab-emirates': 'uae',
}

// Names differ between sources ("Korea, South" vs "South Korea"); compare on a
// stripped form so the join doesn't silently drop rows.
// Decompose accents first, or "Türkiye" reduces to "trkiye" and never matches.
const key = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z]/g, '')

// countrycode.org still lists several countries under their former names.
const ALIASES = {
  czechia: 'czechrepublic',
  drcongo: 'democraticrepublicofthecongo',
  eswatini: 'swaziland',
  northmacedonia: 'macedonia',
  timorleste: 'easttimor',
  turkiye: 'turkey',
  vaticancity: 'vatican',
}

const html = await fetch('https://countrycode.org/', {
  headers: { 'user-agent': 'Mozilla/5.0 (compatible; SMSLocal-build/1.0)' },
}).then((r) => {
  if (!r.ok) throw new Error(`countrycode.org returned ${r.status}`)
  return r.text()
})

const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
  .map((r) =>
    [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) =>
      c[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim(),
    ),
  )
  .filter((r) => r.length >= 6 && r[0] && r[0] !== 'COUNTRY')

const stats = new Map()
const statsByIso = new Map()
for (const [name, , iso, population, area, gdp] of rows) {
  const row = {
    iso3: (iso.split('/')[1] ?? '').trim() || null,
    population: Number(population.replace(/,/g, '')) || null,
    areaKm2: Number(area.replace(/,/g, '')) || null,
    gdpUsd: gdp || null,
  }
  stats.set(key(name), row)
  statsByIso.set((iso.split('/')[0] ?? '').trim(), row)
}

// ── Territories ────────────────────────────────────────────────────────────
// Dependencies and special-administration areas that have their own dial code
// and their own search demand, but sit outside the 195-state list that
// dialCodes.generated.json (and therefore the contact / pricing dial pickers)
// is built from. Kept out of that file on purpose so those pickers don't
// change; they get a /country-code/ page only.
//
// Israel is deliberately NOT here: gen-dial-codes.cjs excludes it by client
// request, and that decision is not this list's to reverse. Antarctica is left
// out too: it has no networks or consumer market, and a generated page would
// still claim routes to "every licensed operator" there.
//
// `dial` overrides exist where world-countries' idd data is unusable for a
// single displayed code (shared or multi-suffix plans, or no idd at all).
const TERRITORIES = [
  { iso2: 'TW', name: 'Taiwan' },
  { iso2: 'HK', name: 'Hong Kong' },
  { iso2: 'BM', name: 'Bermuda' },
  { iso2: 'NC', name: 'New Caledonia' },
  { iso2: 'JE', name: 'Jersey' },
  { iso2: 'CW', name: 'Curaçao' },
  { iso2: 'AS', name: 'American Samoa' },
  { iso2: 'RE', name: 'Réunion' },
  { iso2: 'TK', name: 'Tokelau' },
  { iso2: 'SX', name: 'Sint Maarten' },
  { iso2: 'PR', name: 'Puerto Rico', dial: '+1' },
  { iso2: 'EH', name: 'Western Sahara', dial: '+212' },
  { iso2: 'PN', name: 'Pitcairn Islands', slug: 'pitcairn' },
  { iso2: 'CK', name: 'Cook Islands' },
  { iso2: 'BL', name: 'Saint Barthélemy' },
  { iso2: 'YT', name: 'Mayotte' },
  { iso2: 'GG', name: 'Guernsey' },
  { iso2: 'KY', name: 'Cayman Islands' },
  { iso2: 'FK', name: 'Falkland Islands' },
  { iso2: 'FO', name: 'Faroe Islands' },
  { iso2: 'GI', name: 'Gibraltar' },
  { iso2: 'MF', name: 'Saint Martin' },
  { iso2: 'SJ', name: 'Svalbard and Jan Mayen', dial: '+47' },
  { iso2: 'VI', name: 'United States Virgin Islands', slug: 'us-virgin-islands' },
  { iso2: 'PF', name: 'French Polynesia' },
  { iso2: 'CX', name: 'Christmas Island' },
  { iso2: 'GU', name: 'Guam' },
  { iso2: 'VG', name: 'British Virgin Islands' },
  { iso2: 'NU', name: 'Niue' },
  { iso2: 'TC', name: 'Turks and Caicos Islands' },
  { iso2: 'SH', name: 'Saint Helena', dial: '+290' },
  { iso2: 'MP', name: 'Northern Mariana Islands' },
  { iso2: 'AW', name: 'Aruba' },
]

function territoryRows() {
  return TERRITORIES.map((t) => {
    const w = world.find((c) => c.cca2 === t.iso2)
    if (!w) throw new Error(`world-countries has no entry for ${t.iso2}`)
    const idd = w.idd ?? {}
    const derived = idd.root ? idd.root + (idd.suffixes?.length === 1 ? idd.suffixes[0] : '') : null
    const dialCode = t.dial ?? derived
    if (!dialCode) throw new Error(`no dial code for ${t.iso2}`)
    const s = statsByIso.get(t.iso2) ?? {}
    if (!s.iso3) console.warn(`  no countrycode.org row matched for ${t.name} (${t.iso2}) — figures left empty`)
    return {
      slug: t.slug ?? slugify(t.name),
      name: t.name,
      iso2: t.iso2,
      iso3: s.iso3 ?? w.cca3 ?? null,
      dial: dialCode,
      region: w.region || null,
      population: s.population ?? null,
      areaKm2: s.areaKm2 ?? null,
      gdpUsd: s.gdpUsd ?? null,
    }
  })
}

// `node scripts/gen-country-pages.mjs --append-territories` adds any territory
// missing from countryPages.generated.json and downloads its flag, leaving
// every existing row (and its published figures) exactly as it is.
if (process.argv.includes('--append-territories')) {
  const outPath = join(root, 'src/data/countryPages.generated.json')
  const existing = JSON.parse(readFileSync(outPath, 'utf8'))
  const have = new Set(existing.map((c) => c.slug))
  const added = territoryRows().filter((c) => !have.has(c.slug))
  const merged = [...existing, ...added].sort((a, b) => a.name.localeCompare(b.name))
  writeFileSync(outPath, `${JSON.stringify(merged, null, 1)}\n`)
  console.log(`countryPages.generated.json — ${added.length} territories added, ${merged.length} pages total`)

  const { existsSync } = await import('node:fs')
  let flags = 0
  for (const c of added) {
    const dest = join(root, 'public/flags', `${c.iso2.toLowerCase()}.svg`)
    if (existsSync(dest)) continue
    const res = await fetch(`https://flagcdn.com/${c.iso2.toLowerCase()}.svg`)
    if (!res.ok) throw new Error(`flagcdn ${c.iso2} returned ${res.status}`)
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
    flags++
  }
  console.log(`public/flags — ${flags} flags downloaded`)
  process.exit(0)
}

const countries = dial
  .map((c) => {
    const k = key(c.name)
    const s = stats.get(k) ?? stats.get(ALIASES[k]) ?? {}
    return {
      slug: SLUG_OVERRIDES[slugify(c.name)] ?? slugify(c.name),
      name: c.name,
      iso2: c.code,
      iso3: s.iso3 ?? null,
      dial: c.dial,
      region: REGION_OVERRIDES[c.code] ?? REGION.get(c.code) ?? null,
      population: s.population ?? null,
      areaKm2: s.areaKm2 ?? null,
      gdpUsd: s.gdpUsd ?? null,
    }
  })
  .concat(territoryRows())
  .sort((a, b) => a.name.localeCompare(b.name))

writeFileSync(
  join(root, 'src/data/countryPages.generated.json'),
  `${JSON.stringify(countries, null, 1)}\n`,
)

const matched = countries.filter((c) => c.population).length
console.log(`countryPages.generated.json — ${countries.length} countries, ${matched} with figures from countrycode.org`)
const missing = countries.filter((c) => !c.population).map((c) => c.name)
if (missing.length) console.warn(`  no figures matched for: ${missing.join(', ')}`)
