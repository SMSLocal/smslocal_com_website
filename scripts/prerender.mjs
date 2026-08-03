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

// sitemap.xml — only canonical URLs (posts are listed at the one routePath they
// were imported under, never at their second reachable path), with real lastmod
// from the same dates the page's own schema declares. No priority/changefreq:
// Google ignores both, and inventing them would just be noise.
const SITE = 'https://smslocal-com-website.vercel.app'
const lastmodFor = (route) =>
  pageDates[route] ??
  (posts.find((p) => (p.routePath ?? `/blog/${p.slug}`) === route)?.modifiedISO ?? '').slice(0, 10)

const urls = routes
  .map((route) => {
    const lastmod = lastmodFor(route)
    return `  <url>\n    <loc>${SITE}${route === '/' ? '/' : route}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`
  })
  .join('\n')

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

// dist/index.html stops being a neutral shell once "/" is prerendered into it,
// so the SPA rewrite gets its own copy to fall back to — otherwise every route
// without a file would serve homepage markup to anything that doesn't run JS.
// noindex because it's a real URL with no real content.
writeFileSync(
  join(dist, 'spa.html'),
  template.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>'),
)

let written = 0
const failed = []
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
