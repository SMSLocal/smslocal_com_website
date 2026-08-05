// Writes a real HTML file per route into dist/, so the JSON-LD, head tags,
// headings and body copy are in the served document instead of appearing only
// after the client bundle runs. Vercel's SPA rewrite in vercel.json only fires
// when no file matches, so dist/pricing/index.html wins for /pricing while
// anything unlisted (the 404) still falls through to the shell.
//
// Runs after both `vite build` and the SSR build — see the build script.
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const MOUNT = '<div id="root"></div>'
if (!template.includes(MOUNT)) {
  throw new Error(`prerender: "${MOUNT}" not found in dist/index.html — the mount point changed`)
}

const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url))

// Seo/Canonical render their tags inside the tree, and renderToString of a
// partial tree emits them where they sit rather than in <head>. React hoists
// them once the client takes over; for the static file they have to be moved.
// rel="alternate" is in here for the same reason canonical is, and it matters
// more: Google only reads hreflang annotations from <head>. Left in the body
// (where renderToString puts them) all 21 alternates per page were ignored
// outright, so the 19 translated copies of every page were never linked to
// their English original. Matched on rel=, not on the attribute name — React
// emits it as hrefLang.
const HEAD_TAGS =
  /<title>[\s\S]*?<\/title>|<meta\s+(?:name|property)="[^"]*"[^>]*>|<link\s+rel="(?:canonical|alternate)"[^>]*>/g

function buildPage(body, htmlAttrs = 'lang="en"') {
  // Marked so the client can drop them once React has rendered its own copies —
  // React hoists its tags into <head> without noticing these, and two <title>
  // elements is invalid HTML with no defined winner. See Canonical.jsx.
  const lifted = (body.match(HEAD_TAGS) ?? []).map((tag) =>
    tag.replace(/^<(\w+)/, '<$1 data-prerendered'),
  )
  const rest = body.replace(HEAD_TAGS, '')
  // The template ships a placeholder <title>; drop it when the page rendered
  // its own, or the document ends up with two and the browser keeps the stub.
  const base = lifted.some((tag) => tag.startsWith('<title'))
    ? template.replace(/<title>[\s\S]*?<\/title>/, '')
    : template
  return base
    .replace(/<html[^>]*>/, `<html ${htmlAttrs}>`)
    .replace('</head>', () => `${lifted.join('')}</head>`)
    .replace(MOUNT, () => `<div id="root">${rest}</div>`)
}

// Both lists derive from generated data, so a route added in App.jsx or a post
// added to the archive flows in without a second list to keep in sync.
const pageDates = JSON.parse(readFileSync(join(root, 'src/data/pageDates.generated.json'), 'utf8'))
const posts = JSON.parse(readFileSync(join(root, 'src/data/importedPosts.generated.json'), 'utf8'))
const staticRoutes = Object.keys(pageDates)
const postRoutes = posts.map((post) => post.routePath ?? `/blog/${post.slug}`)

// Country pages are a dynamic route, so they aren't in pageDates. Every country
// in the generated data gets one; the ones without authored content render
// verified facts only and say so.
const countryRoutes = JSON.parse(
  readFileSync(join(root, 'src/data/countryPages.generated.json'), 'utf8'),
).map((c) => `/country-code/${c.slug}`)

const routes = [...staticRoutes, ...postRoutes, ...countryRoutes]

// Translated pages (the i18n block further down writes the files). Imported
// here rather than there so they can go in a sitemap — without one, the only
// path to a translated page is the hreflang tags on its English counterpart,
// which is a much weaker discovery signal than being listed outright.
const { LANGUAGES } = await import(new URL('../src/data/languages.js', import.meta.url))
const { isTranslatedRoute } = await import(new URL('../src/data/i18nScope.js', import.meta.url))
// Every route the site has, minus the handful that opt out — the same
// predicate the client uses, so the pages that exist and the pages the
// switcher/hreflang advertise can't drift apart.
const TRANSLATED_ROUTES = routes.filter(isTranslatedRoute)
const localeRoutes = TRANSLATED_ROUTES.flatMap((route) =>
  LANGUAGES.map(({ code }) => (route === '/' ? `/${code}` : `/${code}${route}`)),
)

// Sitemaps: an index at /sitemap.xml pointing at one sub-sitemap per content
// type, matching how the pages are actually grouped. Only canonical URLs go in
// — posts are listed at the one routePath they were imported under, never at
// their second reachable path — and lastmod reuses the dates each page already
// declares in its own schema. No priority/changefreq: Google ignores both, so
// inventing values would only add noise.
//
// Each file carries an <?xml-stylesheet?> pointing at /sitemap.xsl, which makes
// browsers render a styled page. Crawlers ignore it and read the raw XML.
const SITE = 'https://smslocal-com-website.vercel.app'
const STYLE = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
// Country pages have no per-page date of their own; they change when the
// authored content does, so they inherit that file's mtime.
const countryContentDate = statSync(join(root, 'src/data/countryContent.js'))
  .mtime.toISOString()
  .slice(0, 10)

function lastmodFor(route) {
  if (pageDates[route]) return pageDates[route]
  const post = posts.find((p) => (p.routePath ?? `/blog/${p.slug}`) === route)
  if (post?.modifiedISO) return post.modifiedISO.slice(0, 10)
  if (route.startsWith('/country-code/')) return countryContentDate
  return ''
}

// A locale page changes when its English source does, so it inherits that
// page's date rather than carrying one of its own.
const localeLastmod = (route) => {
  const stripped = route.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'
  return lastmodFor(stripped)
}

const routeOf = (p) => p.routePath ?? `/blog/${p.slug}`

// Split by page type, not by blog category: area-code posts are blog posts like
// any other, so two sub-sitemaps for them was a division without a difference.
const groups = [
  { file: 'page-sitemap.xml', routes: staticRoutes },
  { file: 'post-sitemap.xml', routes: posts.map(routeOf) },
  { file: 'country-code-sitemap.xml', routes: countryRoutes },
  { file: 'i18n-sitemap.xml', routes: localeRoutes },
].filter((g) => g.routes.length)

const urlsetFor = (list, dateFor = lastmodFor) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n${STYLE}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  list
    .map((route) => {
      const lastmod = dateFor(route)
      // Trailing slash: the served form (vercel.json trailingSlash: true). A
      // sitemap listing the slash-less URL would list a redirect.
      const loc = route.endsWith('/') ? route : `${route}/`
      return `  <url>\n    <loc>${SITE}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`
    })
    .join('\n') +
  `\n</urlset>\n`

const dateForGroup = (g) => (g.file === 'i18n-sitemap.xml' ? localeLastmod : lastmodFor)
for (const g of groups) writeFileSync(join(dist, g.file), urlsetFor(g.routes, dateForGroup(g)))

// The index's lastmod per sub-sitemap is the newest page inside it, so it moves
// only when something in that group actually changed.
const indexEntries = groups
  .map((g) => {
    const newest = g.routes.map(dateForGroup(g)).filter(Boolean).sort().pop()
    return `  <sitemap>\n    <loc>${SITE}/${g.file}</loc>${newest ? `\n    <lastmod>${newest}</lastmod>` : ''}\n  </sitemap>`
  })
  .join('\n')

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n${STYLE}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>\n`,
)
console.log(`sitemaps — index + ${groups.length} groups: ${groups.map((g) => `${g.file} (${g.routes.length})`).join(', ')}`)

// Every real route is a file on disk, so vercel.json no longer rewrites unknown
// paths to a shell — they fall through to this, which Vercel serves with a real
// 404 status instead of the 200 a rewrite would have given. Rendering the app's
// own catch-all keeps the nav, footer and styling; a path that matches no route
// is exactly what a visitor hitting a dead URL sees.
try {
  writeFileSync(join(dist, '404.html'), buildPage(render('/404')))
} catch (error) {
  // A plain shell still beats Vercel's default page if the app can't render.
  console.warn(`prerender — 404 page fell back to the bare shell: ${error.message.split('\n')[0]}`)
  writeFileSync(join(dist, '404.html'), template)
}

let written = 0
const failed = []
const meta = {}
for (const route of routes) {
  let body
  try {
    body = render(route)
  } catch (error) {
    // One bad page shouldn't cost every other page its prerender — it just
    // falls back to the SPA shell, which is the old behaviour.
    failed.push(`${route}: ${error.message.split('\n')[0]}`)
    continue
  }
  // Each page's own title/description, straight off what it just rendered —
  // llms.txt below is built from these rather than a second hand-kept list.
  meta[route] = {
    title: (body.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] ?? '',
    description: (body.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] ?? '',
  }
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, buildPage(body))
  written += 1
}

console.log(
  `prerender — ${written}/${routes.length} routes (${staticRoutes.length} static, ${postRoutes.length} posts)`,
)
if (failed.length) {
  console.warn(`prerender — ${failed.length} route(s) fell back to the SPA shell:`)
  for (const f of failed) console.warn(`  ${f}`)
}

// Translated pages are NOT written here. Every /<locale>/... URL is rendered
// at request time by api/i18n-ssr and cached at the edge for 7 days, which is
// how the reference implementation this was adapted from does it. Writing them
// at build time meant 5,491 routes × 19 languages = 104,329 files per build,
// almost all of which are never requested; a crawler receives the same HTML
// either way. The English pages written above are the origin that function
// fetches and translates, so they stay.
console.log(
  `prerender i18n — ${TRANSLATED_ROUTES.length} routes × ${LANGUAGES.length} languages served at request time by api/i18n-ssr (none prerendered)`,
)

// llms.txt — the AI-crawler counterpart to robots.txt/sitemap.xml. Crawlers that
// don't execute JavaScript get the same curated map a person would, in markdown
// rather than XML. Titles and descriptions come from `meta` above, i.e. from the
// pages themselves, so this cannot describe the site as something it isn't.
const decode = (s) =>
  s
    // Numeric entities in both forms — React escapes apostrophes as &#x27;.
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    // Ampersand last, so "&amp;lt;" cannot decode twice into a tag.
    .replace(/&amp;/g, '&')

// Titles carry the " | SMSLocal" suffix for search results; it is redundant when
// every line already sits under an SMSLocal heading.
const label = (route) => decode(meta[route]?.title ?? route).replace(/\s*\|\s*SMSLocal\s*$/, '')
const blurb = (route) => decode(meta[route]?.description ?? '')

const link = (route) => {
  const d = blurb(route)
  return `- [${label(route)}](${SITE}${route.endsWith('/') ? route : `${route}/`})${d ? `: ${d}` : ''}`
}

// Grouped by the route prefixes the site is already organised around, so the
// sections stay right as pages are added.
const startsWith = (...prefixes) => (r) =>
  prefixes.some((p) => r === p || r.startsWith(`${p}/`))
const used = new Set()
const take = (pred) => {
  const hit = staticRoutes.filter((r) => !used.has(r) && pred(r))
  for (const r of hit) used.add(r)
  return hit
}

// Hubs first (exact match), then each division. `take` removes what it claims,
// so /products is claimed by Core before /products/ai-agents is scanned.
const sections = [
  ['Core', take((r) => ['/', '/pricing', '/products', '/platform', '/solutions'].includes(r))],
  ['AI agents', take(startsWith('/products/ai-agents'))],
  ['Channels', take(startsWith('/products/channels'))],
  ['Social & apps', take(startsWith('/products/social-and-apps'))],
  ['Inbox & analytics', take(startsWith('/products/inbox-and-analytics'))],
  ['Platform', take(startsWith('/platform'))],
  ['By industry', take(startsWith('/solutions/industry'))],
  ['Services', take(startsWith('/solutions/services'))],
  ['Comparisons', take(startsWith('/compare'))],
  ['Country codes', countryRoutes],
  ['Resources', take(startsWith('/resources', '/blog'))],
  ['Company', take(() => true)],
]

const postsByCategory = new Map()
for (const p of posts) {
  const key = p.category ?? 'Articles'
  if (!postsByCategory.has(key)) postsByCategory.set(key, [])
  postsByCategory.get(key).push(p)
}

const llms = [
  '# SMSLocal',
  '',
  '> Business messaging platform for bulk SMS, WhatsApp Business API, RCS, voice and web chat, with AI agents for support, sales and booking. Send campaigns, alerts and two-way conversations from one dashboard or API.',
  '',
  'This file is a map of the site for AI crawlers and assistants. Every link below is a canonical URL; the same pages are listed machine-readably in [the sitemap index](' + SITE + '/sitemap.xml).',
  '',
  ...sections.flatMap(([name, list]) => (list.length ? [`## ${name}`, '', ...list.map(link), ''] : [])),
  ...[...postsByCategory.entries()].flatMap(([category, list]) => [
    `## ${category}`,
    '',
    ...list.map((p) => link(routeOf(p))),
    '',
  ]),
].join('\n')

writeFileSync(join(dist, 'llms.txt'), `${llms.trimEnd()}\n`)
console.log(
  `llms.txt — ${routes.length} links across ${sections.filter(([, l]) => l.length).length + postsByCategory.size} sections`,
)
