// Appends src/data/nativePosts.js into src/data/importedPosts.generated.json,
// so hand-authored posts get exactly the same prerendering/sitemap/llms.txt
// treatment as the imported archive (see scripts/prerender.mjs, which reads
// that generated file directly). Idempotent — re-running only adds slugs
// that aren't already present, so a post can be edited in nativePosts.js and
// this re-run to pick up the change without duplicating entries.
//
//   node scripts/merge-native-posts.mjs
import fs from 'node:fs/promises'
import path from 'node:path'
import nativePosts from '../src/data/nativePosts.js'

const ROOT = path.join(import.meta.dirname, '..')
const JSON_OUT = path.join(ROOT, 'src', 'data', 'importedPosts.generated.json')

const existing = JSON.parse(await fs.readFile(JSON_OUT, 'utf8'))
const existingSlugs = new Set(existing.map((p) => p.slug))

let added = 0
let updated = 0
const bySlug = new Map(existing.map((p) => [p.slug, p]))
for (const p of nativePosts) {
  if (bySlug.has(p.slug)) {
    bySlug.set(p.slug, p)
    updated++
  } else {
    bySlug.set(p.slug, p)
    added++
  }
}

const merged = [...bySlug.values()].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
await fs.writeFile(JSON_OUT, `${JSON.stringify(merged, null, 1)}\n`)
console.log(`merge-native-posts: ${added} added, ${updated} updated (already present), ${merged.length} total posts`)
