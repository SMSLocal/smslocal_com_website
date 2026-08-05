// Whole-site audit of the built output: broken internal links, SEO head tags,
// hreflang integrity, and (optionally) external link health.
//
// Runs against dist/, so it audits exactly what gets served — including the
// prerendered locale pages, which a source-level check can't see at all.
//
//   node scripts/audit-site.mjs            # internal + SEO + hreflang
//   node scripts/audit-site.mjs --external # also HEAD every external URL
//
// Exits non-zero if any ERROR-level finding is present, so it can gate a
// build. Warnings never fail the run.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const CHECK_EXTERNAL = process.argv.includes('--external')

// ── collect every built page ────────────────────────────────────────────────
const pages = []
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (name === 'index.html' || name === '404.html') pages.push(full)
  }
}
walk(DIST)

const routeOf = (file) => {
  const rel = file.slice(DIST.length).replace(/\\/g, '/')
  return '/' + rel.replace(/index\.html$/, '')
}

// A URL is servable if a matching file exists in dist.
const servable = new Set(pages.map(routeOf))
const fileExists = (p) => existsSync(join(DIST, p.replace(/^\//, '').replace(/\//g, '/')))

const errors = []
const warnings = []
const err = (kind, route, detail) => errors.push({ kind, route, detail })
const warn = (kind, route, detail) => warnings.push({ kind, route, detail })

const externalUrls = new Map() // url -> first route seen on
const titles = new Map() // title -> [routes]
const descriptions = new Map()

const pick = (html, re) => (html.match(re) || [])[1]?.trim()

const SKIP_LINK = /^(?:#|mailto:|tel:|javascript:|data:)/i

for (const file of pages) {
  const route = routeOf(file)
  const html = readFileSync(file, 'utf8')
  const isLocale = /^\/[a-z]{2}\//.test(route)

  // ── head tags ─────────────────────────────────────────────────────────────
  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/)
  const desc = pick(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/)
  const canonical = pick(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)

  if (!title) err('missing-title', route, '')
  else {
    if (title.length > 65) warn('title-too-long', route, `${title.length} chars`)
    titles.set(title, [...(titles.get(title) ?? []), route])
  }

  if (!desc) err('missing-description', route, '')
  else {
    if (desc.length > 160) warn('description-too-long', route, `${desc.length} chars`)
    descriptions.set(desc, [...(descriptions.get(desc) ?? []), route])
  }

  if (!canonical) err('missing-canonical', route, '')
  else if (!/^https:\/\//.test(canonical)) err('canonical-not-absolute', route, canonical)

  // <html lang> must reflect the locale the page is actually written in.
  const lang = pick(html, /<html[^>]*\blang="([^"]*)"/)
  if (!lang) err('missing-html-lang', route, '')
  else if (isLocale) {
    const expected = route.split('/')[1]
    if (lang !== expected) err('wrong-html-lang', route, `lang="${lang}" expected "${expected}"`)
  }

  const h1Count = (html.match(/<h1[\s>]/g) || []).length
  if (h1Count === 0) warn('no-h1', route, '')
  else if (h1Count > 1) warn('multiple-h1', route, `${h1Count}`)

  // ── hreflang: every advertised alternate must actually exist ───────────────
  for (const m of html.matchAll(/<link[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"/g)) {
    const href = m[2]
    const path = href.replace(/^https?:\/\/[^/]+/, '')
    if (!servable.has(path)) err('hreflang-target-missing', route, `${m[1]} -> ${path}`)
  }

  // ── links ─────────────────────────────────────────────────────────────────
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1]
    if (SKIP_LINK.test(href)) continue

    if (/^https?:\/\//i.test(href)) {
      if (!externalUrls.has(href)) externalUrls.set(href, route)
      continue
    }
    if (!href.startsWith('/')) continue

    const bare = href.split(/[?#]/)[0]
    // A real file (asset, sitemap, image) rather than a page route.
    if (/\.[a-z0-9]+$/i.test(bare)) {
      if (!fileExists(bare)) err('missing-file', route, bare)
      continue
    }
    const withSlash = bare.endsWith('/') ? bare : `${bare}/`
    if (!servable.has(withSlash)) err('broken-internal-link', route, bare)
  }

  // ── images ────────────────────────────────────────────────────────────────
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\salt=/.test(m[1])) warn('img-missing-alt', route, '')
  }
}

// ── duplicates ──────────────────────────────────────────────────────────────
for (const [t, routes] of titles) {
  if (routes.length > 1) warn('duplicate-title', routes[0], `${routes.length} pages share "${t.slice(0, 50)}"`)
}
for (const [d, routes] of descriptions) {
  if (routes.length > 1) warn('duplicate-description', routes[0], `${routes.length} pages`)
}

// ── external links (opt-in; network-bound) ──────────────────────────────────
let externalChecked = 0
if (CHECK_EXTERNAL) {
  const urls = [...externalUrls.keys()]
  const CONCURRENCY = 12
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    await Promise.all(
      urls.slice(i, i + CONCURRENCY).map(async (url) => {
        externalChecked++
        try {
          let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(12000) })
          // Plenty of servers reject HEAD but serve GET fine.
          if (res.status === 405 || res.status === 403) {
            res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(12000) })
          }
          if (res.status >= 400) warn('external-link-dead', externalUrls.get(url), `${res.status} ${url}`)
        } catch (e) {
          // Unreachable from this machine isn't proof it's dead for everyone.
          warn('external-link-unreachable', externalUrls.get(url), `${e.name} ${url}`)
        }
      }),
    )
  }
}

// ── report ──────────────────────────────────────────────────────────────────
const group = (list) => {
  const m = new Map()
  for (const f of list) m.set(f.kind, [...(m.get(f.kind) ?? []), f])
  return [...m.entries()].sort((a, b) => b[1].length - a[1].length)
}

console.log(`\naudit — ${pages.length} pages, ${externalUrls.size} distinct external URLs` +
  (CHECK_EXTERNAL ? ` (${externalChecked} checked)` : ' (not checked; pass --external)'))

console.log(`\nERRORS: ${errors.length}`)
for (const [kind, list] of group(errors)) {
  console.log(`  ${kind}: ${list.length}`)
  for (const f of list.slice(0, 5)) console.log(`      ${f.route}  ${f.detail}`)
  if (list.length > 5) console.log(`      … ${list.length - 5} more`)
}

console.log(`\nWARNINGS: ${warnings.length}`)
for (const [kind, list] of group(warnings)) {
  console.log(`  ${kind}: ${list.length}`)
  for (const f of list.slice(0, 3)) console.log(`      ${f.route}  ${f.detail}`)
  if (list.length > 3) console.log(`      … ${list.length - 3} more`)
}

console.log('')
process.exit(errors.length ? 1 : 0)
