// Applies simplify-prose to the generated posts JSON (FOCUS_SLUGS only). Idempotent.
import fs from 'node:fs'
import path from 'node:path'
import { simplifyProse } from './lib/simplify-prose.mjs'

const file = path.join(import.meta.dirname, '..', 'src', 'data', 'importedPosts.generated.json')
const posts = JSON.parse(fs.readFileSync(file, 'utf8'))
for (const p of posts) p.body = simplifyProse(p.slug, p.body)
fs.writeFileSync(file, `${JSON.stringify(posts, null, 1)}\n`)
console.log('done')
