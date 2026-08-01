// Generates src/data/pageDates.generated.json — a route -> last-modified date
// map read from the real mtime of each page component, consumed by SiteSchema.jsx
// for the WebPage `dateModified`.
//
// Why mtime and not a hand-written date list: Google validates declared dates
// against the page and treats the signal as all-or-nothing per site — one batch
// of dates that don't hold up and it stops trusting dates sitewide. Deriving
// them from the file means the date is true by construction, and it staggers on
// its own as pages get edited, which is the freshness pattern that earns crawl
// priority in the first place.
//
// Runs as part of `npm run build`, so a page edited today ships with today's date.
import { readFileSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// A CI checkout stamps every file with the clone time, so regenerating there
// would flatten all 65 routes to the deploy date and throw away the real edit
// history. Only the working copy has true mtimes — on Vercel, keep the dates
// that were committed from it.
if (process.env.VERCEL) {
  console.log('pageDates.generated.json — on Vercel, keeping committed dates (checkout mtimes are not real)')
  process.exit(0)
}

const app = readFileSync(join(root, 'src/App.jsx'), 'utf8')

// `import Pricing from './pages/Pricing.jsx'`
const files = Object.fromEntries(
  [...app.matchAll(/^import (\w+) from '(\.\/pages\/[^']+)'/gm)].map(([, name, path]) => [
    name,
    path,
  ]),
)

// `<Route path="/pricing" element={<Pricing />} />`. Redirect routes render
// `<Navigate to=... />`, which doesn't fit the `{<Word />}` shape and so drops
// out here — as do the `:slug` routes (dated per-post from the post data) and
// the `*` catch-all.
const dates = {}
for (const [, path, component] of app.matchAll(/<Route path="([^"]+)" element=\{<(\w+) \/>\}/g)) {
  const file = files[component]
  if (!file || path.includes(':') || path === '*') continue
  const mtime = statSync(join(root, 'src', file.slice(2))).mtime
  dates[path] = mtime.toISOString().slice(0, 10)
}

const out = join(root, 'src/data/pageDates.generated.json')
writeFileSync(out, `${JSON.stringify(dates, null, 2)}\n`)

const spread = new Set(Object.values(dates))
console.log(`pageDates.generated.json — ${Object.keys(dates).length} routes, ${spread.size} distinct dates`)
