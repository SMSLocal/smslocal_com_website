// Writes a real HTML file per route into dist/, so the JSON-LD, head tags,
// headings and body copy are in the served document instead of appearing only
// after the client bundle runs. Vercel's SPA rewrite in vercel.json only fires
// when no file matches, so dist/pricing/index.html wins for /pricing while
// anything unlisted (the 404) still falls through to the shell.
//
// Runs after both `vite build` and the SSR build — see the build script.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
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
const HEAD_TAGS =
  /<title>[\s\S]*?<\/title>|<meta\s+(?:name|property)="[^"]*"[^>]*>|<link\s+rel="canonical"[^>]*>/g

function buildPage(body) {
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
    .replace('</head>', () => `${lifted.join('')}</head>`)
    .replace(MOUNT, () => `<div id="root">${rest}</div>`)
}

// Both lists derive from generated data, so a route added in App.jsx or a post
// added to the archive flows in without a second list to keep in sync.
const pageDates = JSON.parse(readFileSync(join(root, 'src/data/pageDates.generated.json'), 'utf8'))
const posts = JSON.parse(readFileSync(join(root, 'src/data/importedPosts.generated.json'), 'utf8'))
const staticRoutes = Object.keys(pageDates)
const postRoutes = posts.map((post) => post.routePath ?? `/blog/${post.slug}`)
const routes = [...staticRoutes, ...postRoutes]

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
const lastmodFor = (route) =>
  pageDates[route] ??
  (posts.find((p) => (p.routePath ?? `/blog/${p.slug}`) === route)?.modifiedISO ?? '').slice(0, 10)

const routeOf = (p) => p.routePath ?? `/blog/${p.slug}`

// Split by page type, not by blog category: area-code posts are blog posts like
// any other, so two sub-sitemaps for them was a division without a difference.
const groups = [
  { file: 'page-sitemap.xml', routes: staticRoutes },
  { file: 'post-sitemap.xml', routes: posts.map(routeOf) },
].filter((g) => g.routes.length)

const urlsetFor = (list) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n${STYLE}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  list
    .map((route) => {
      const lastmod = lastmodFor(route)
      // Trailing slash: the served form (vercel.json trailingSlash: true). A
      // sitemap listing the slash-less URL would list a redirect.
      const loc = route.endsWith('/') ? route : `${route}/`
      return `  <url>\n    <loc>${SITE}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`
    })
    .join('\n') +
  `\n</urlset>\n`

for (const g of groups) writeFileSync(join(dist, g.file), urlsetFor(g.routes))

// The index's lastmod per sub-sitemap is the newest page inside it, so it moves
// only when something in that group actually changed.
const indexEntries = groups
  .map((g) => {
    const newest = g.routes.map(lastmodFor).filter(Boolean).sort().pop()
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

const sections = [
  ['Core', take((r) => ['/', '/pricing', '/products', '/platform', '/solutions', '/why-smslocal', '/integrations'].includes(r))],
  ['Channels', take(startsWith('/channels', '/numbers'))],
  ['AI agents', take(startsWith('/ai-agents', '/agentic-ai', '/voice-ai-agents', '/services'))],
  ['By industry', take(startsWith('/industry'))],
  ['Comparisons', take(startsWith('/compare'))],
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
  `llms.txt — ${staticRoutes.length + posts.length} links across ${sections.filter(([, l]) => l.length).length + postsByCategory.size} sections`,
)
