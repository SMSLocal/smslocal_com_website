// One-off/idempotent: applies readability-fixes to the generated posts JSON
// without re-fetching the live site. Safe to re-run.
import fs from 'node:fs'
import path from 'node:path'
import { applyReadabilityFixes } from './lib/readability-fixes.mjs'

const file = path.join(import.meta.dirname, '..', 'src', 'data', 'importedPosts.generated.json')
const posts = JSON.parse(fs.readFileSync(file, 'utf8'))
let changed = 0
for (const p of posts) {
  const next = applyReadabilityFixes(p.body)
  if (JSON.stringify(next) !== JSON.stringify(p.body)) changed++
  p.body = next
}
fs.writeFileSync(file, `${JSON.stringify(posts, null, 1)}\n`)
console.log(`updated ${changed}/${posts.length} posts`)
