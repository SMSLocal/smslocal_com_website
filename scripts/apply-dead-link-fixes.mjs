// Idempotent: applies dead-links rules to the generated posts JSON.
import fs from 'node:fs'
import path from 'node:path'
import { applyDeadLinkFixes } from './lib/dead-link-remap.mjs'

const file = path.join(import.meta.dirname, '..', 'src', 'data', 'importedPosts.generated.json')
const posts = JSON.parse(fs.readFileSync(file, 'utf8'))
for (const p of posts) {
  p.body = applyDeadLinkFixes(p.body, p.slug)
  p.faqs = applyDeadLinkFixes(p.faqs, p.slug)
}
fs.writeFileSync(file, `${JSON.stringify(posts, null, 1)}\n`)
console.log('done')
