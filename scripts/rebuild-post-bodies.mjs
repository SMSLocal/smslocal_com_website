// One-off repair: rebuild every post body from the original import (git rev
// passed as argv[2]) through the current prose pipeline. Used after the first
// sentence-splitting rules were found to leave "And ..." / "Which ..." fragments.
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { applyDeadLinkFixes } from './lib/dead-link-remap.mjs'
import { applyReadabilityFixes } from './lib/readability-fixes.mjs'
import { simplifyProse } from './lib/simplify-prose.mjs'
import { applyBlogCta } from './lib/blog-cta.mjs'

const rev = process.argv[2]
const root = path.join(import.meta.dirname, '..')
const file = path.join(root, 'src', 'data', 'importedPosts.generated.json')
const cur = JSON.parse(fs.readFileSync(file, 'utf8'))
let origText = execSync(`git show ${rev}:src/data/importedPosts.generated.json`, { cwd: root, maxBuffer: 1 << 29 }).toString()
// Hand fixes that were made to the generated JSON after the original import.
origText = origText
  .replaceAll('"/register/"', '"/signup/"')
  .replaceAll('https://www.arcee.ai/blog/arcee-meraj-maarj', 'https://en.wikipedia.org/wiki/Machine_translation')
  .replace('"a": "https://www.smslocal.com/login/register/",\n      "x": true', '"a": "/signup/",\n      "x": false')
const orig = Object.fromEntries(JSON.parse(origText).map((p) => [p.slug, p]))

const RESTORED = new Set(['what-is-rcs-messaging', 'how-to-change-from-rcs-to-sms'])
let n = 0
for (const p of cur) {
  if (RESTORED.has(p.slug)) continue
  let body = structuredClone(orig[p.slug].body)
  if (p.slug === 'how-to-stop-spam-texts') {
    // The scraped "tips" list arrived flattened into one paragraph of bold lead-ins.
    const i = body.findIndex((b) => b.type === 'p' && JSON.stringify(b.rich).includes('Confirming Your Number'))
    const r = body[i].rich
    const out = [{ type: 'p', rich: [r[0].trim()] }]
    for (let k = 1; k < r.length; k += 2) {
      const t = r[k].b[0]
      out.push({ type: 'h4', text: t, anchor: t.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') })
      out.push({ type: 'p', rich: [r[k + 1].trim()] })
    }
    body.splice(i, 1, ...out)
  }
  body = applyDeadLinkFixes(body, p.slug)
  body = applyReadabilityFixes(body)
  body = simplifyProse(p.slug, body)
  body = applyBlogCta(body)
  p.body = body
  n++
}
fs.writeFileSync(file, `${JSON.stringify(cur, null, 1)}\n`)
console.log(`rebuilt ${n} bodies`)
