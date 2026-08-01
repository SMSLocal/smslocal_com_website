// Writes a real HTML file per static route into dist/, so the JSON-LD, headings
// and body copy are in the served document instead of appearing only after the
// client bundle runs. Vercel's SPA rewrite in vercel.json only fires when no
// file matches, so dist/pricing/index.html wins for /pricing while unlisted
// routes (blog posts, the 404) still fall through to the SPA shell.
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

// The same 65 static routes the date map covers: both derive from App.jsx, so a
// route added there flows into each without a second list to keep in sync.
const routes = Object.keys(JSON.parse(readFileSync(join(root, 'src/data/pageDates.generated.json'), 'utf8')))

// dist/index.html stops being a neutral shell once "/" is prerendered into it,
// so the SPA rewrite gets its own copy to fall back to — otherwise every route
// without a file (blog posts, 404s) would serve homepage markup to anything
// that doesn't run JS. noindex because it's a real URL with no real content.
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
  writeFileSync(file, template.replace(MOUNT, `<div id="root">${body}</div>`))
  written += 1
}

console.log(`prerender — ${written}/${routes.length} routes written to dist/`)
if (failed.length) {
  console.warn(`prerender — ${failed.length} route(s) fell back to the SPA shell:`)
  for (const f of failed) console.warn(`  ${f}`)
}
