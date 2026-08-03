// Audits the built site: every internal link must already be the served URL
// (trailing slash), so no internal click or crawl costs a 308 hop. Reports the
// first page each offender was found on.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\//, '')
const offenders = new Map()
let pages = 0
let links = 0

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (name === 'index.html') {
      pages++
      const html = readFileSync(full, 'utf8')
      for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
        links++
        const bare = href.split(/[?#]/)[0]
        if (bare === '/' || bare.endsWith('/') || /\.[a-z0-9]+$/i.test(bare)) continue
        if (!offenders.has(bare)) offenders.set(bare, full.slice(DIST.length))
      }
    }
  }
}

walk(DIST)
console.log(`${pages} pages, ${links} internal links`)
console.log(`missing trailing slash: ${offenders.size}`)
for (const [href, page] of offenders) console.log(`   ${href}   <- ${page.replace(/\\/g, '/')}`)
process.exit(offenders.size ? 1 : 0)
