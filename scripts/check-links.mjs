// Audits the built site on two axes: every internal link must already be the
// served URL (trailing slash), so no internal click or crawl costs a 308 hop,
// and every internal link must actually resolve — to a built page, a static
// file, or a redirect. Reports the first page each offender was found on.
//
// The target check exists because a dead link is invisible without it: the SPA
// used to answer every unknown path with 200, and even after real 404s landed,
// 14 links to pages that had never been built sat in the nav and card decks
// through several releases. The slash check would pass all of them.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// fileURLToPath, not `.pathname` with the leading slash stripped: that strip
// is a Windows fix (pathname there is "/C:/…") but on Linux it turns the
// absolute "/vercel/path0/dist/" into a relative path that doesn't exist, so
// the script only worked on the machine it was written on. It went unnoticed
// while this was run by hand; wiring it into `npm run build` made every
// Vercel deploy fail here, after a fully successful build.
const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const ROOT = fileURLToPath(new URL('../', import.meta.url))
const offenders = new Map()
const unresolved = new Map()
let links = 0

// Every index.html in dist is one served page. Collected before any link is
// checked, because a link's target is usually a page further along the walk.
const built = new Set()
function collect(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) collect(full)
    else if (name === 'index.html')
      built.add(full.slice(DIST.length).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\/$/, '') || '/')
  }
}

// A redirect is a valid destination for an internal link: /register/ has no
// page of its own and is linked from 31 blog posts. Sources are stored as
// written — pre-slashed, since trailingSlash normalises before matching.
const redirects = new Set(
  (JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8')).redirects ?? []).map(
    (r) => r.source.replace(/\/$/, '') || '/',
  ),
)

function check(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      check(full)
      continue
    }
    if (name !== 'index.html') continue
    const page = full.slice(DIST.length).replace(/\\/g, '/')
    for (const [, href] of readFileSync(full, 'utf8').matchAll(/href="(\/[^"]*)"/g)) {
      links++
      const bare = href.split(/[?#]/)[0]
      const isFile = /\.[a-z0-9]+$/i.test(bare)
      if (!(bare === '/' || bare.endsWith('/') || isFile) && !offenders.has(bare))
        offenders.set(bare, page)
      const clean = bare.length > 1 && bare.endsWith('/') ? bare.slice(0, -1) : bare || '/'
      if (built.has(clean) || redirects.has(clean)) continue
      // A locale path is served at request time by api/i18n-ssr, so it has no
      // file; its English origin having been built is what makes it reachable.
      if (isFile ? existsSync(join(DIST, bare)) : existsSync(join(DIST, clean))) continue
      if (!unresolved.has(clean)) unresolved.set(clean, page)
    }
  }
}

collect(DIST)
check(DIST)
console.log(`${built.size} pages, ${links} internal links`)
console.log(`missing trailing slash: ${offenders.size}`)
for (const [href, page] of offenders) console.log(`   ${href}   <- ${page}`)
console.log(`unresolvable target: ${unresolved.size}`)
for (const [href, page] of unresolved) console.log(`   ${href}   <- ${page}`)
process.exit(offenders.size + unresolved.size ? 1 : 0)
