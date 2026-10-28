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
import { execFileSync } from 'node:child_process'
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

// Country pages have no component of their own, so their sitemap lastmod comes from
// the authored data file. Use the date of the last commit that touched it: a
// working-copy mtime resets to the clone time (and to the deploy time on CI),
// which would stamp all 195 pages as modified on every deploy. Falls back to
// mtime only when git history is unavailable.
const countryFile = 'src/data/countryContent.js'
let countryDate
try {
  countryDate = execFileSync('git', ['log', '-1', '--format=%cs', '--', countryFile], {
    cwd: root,
    encoding: 'utf8',
  }).trim()
} catch {
  countryDate = ''
}
if (!countryDate) countryDate = statSync(join(root, countryFile)).mtime.toISOString().slice(0, 10)
writeFileSync(
  join(root, 'src/data/countryContentDate.generated.json'),
  `${JSON.stringify({ date: countryDate }, null, 2)}
`,
)

const app = readFileSync(join(root, 'src/App.jsx'), 'utf8')

// `const Pricing = page(() => import('./pages/Pricing.jsx'))`
const files = Object.fromEntries(
  [...app.matchAll(/^const (\w+) = page\(\(\) => import\('(\.\/pages\/[^']+)'\)\)/gm)].map(
    ([, name, path]) => [name, path],
  ),
)

// The ROUTES table in App.jsx: `['/pricing', Pricing],`. Redirect routes are
// `<Navigate />` JSX outside the table and so drop out here, as do the `:slug`
// routes (dated per-post from the post data) and the `*` catch-all.
const dates = {}
for (const [, path, component] of app.matchAll(/^\s*\['([^']+)', (\w+)\],?$/gm)) {
  const file = files[component]
  if (!file || path.includes(':') || path === '*') continue
  const mtime = statSync(join(root, 'src', file.slice(2))).mtime
  dates[path] = mtime.toISOString().slice(0, 10)
}

const out = join(root, 'src/data/pageDates.generated.json')
writeFileSync(out, `${JSON.stringify(dates, null, 2)}\n`)

const spread = new Set(Object.values(dates))
console.log(`pageDates.generated.json — ${Object.keys(dates).length} routes, ${spread.size} distinct dates`)
