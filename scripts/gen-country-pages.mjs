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

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

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
for (const [name, , iso, population, area, gdp] of rows) {
  stats.set(key(name), {
    iso3: (iso.split('/')[1] ?? '').trim() || null,
    population: Number(population.replace(/,/g, '')) || null,
    areaKm2: Number(area.replace(/,/g, '')) || null,
    gdpUsd: gdp || null,
  })
}

const countries = dial
  .map((c) => {
    const k = key(c.name)
    const s = stats.get(k) ?? stats.get(ALIASES[k]) ?? {}
    return {
      slug: slugify(c.name),
      name: c.name,
      iso2: c.code,
      iso3: s.iso3 ?? null,
      dial: c.dial,
      region: REGION.get(c.code) ?? null,
      population: s.population ?? null,
      areaKm2: s.areaKm2 ?? null,
      gdpUsd: s.gdpUsd ?? null,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

writeFileSync(
  join(root, 'src/data/countryPages.generated.json'),
  `${JSON.stringify(countries, null, 1)}\n`,
)

const matched = countries.filter((c) => c.population).length
console.log(`countryPages.generated.json — ${countries.length} countries, ${matched} with figures from countrycode.org`)
const missing = countries.filter((c) => !c.population).map((c) => c.name)
if (missing.length) console.warn(`  no figures matched for: ${missing.join(', ')}`)
