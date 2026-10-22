// Idempotent: applies the blog CTA rule to the generated posts JSON.
import fs from 'node:fs'
import path from 'node:path'
import { applyBlogCta } from './lib/blog-cta.mjs'

const file = path.join(import.meta.dirname, '..', 'src', 'data', 'importedPosts.generated.json')
const posts = JSON.parse(fs.readFileSync(file, 'utf8'))
let n = 0
for (const p of posts) {
  const next = applyBlogCta(p.body)
  n += next.filter((b, i) => b !== p.body[i]).length
  p.body = next
}
fs.writeFileSync(file, `${JSON.stringify(posts, null, 1)}\n`)
console.log(`updated ${n} CTA blocks`)
