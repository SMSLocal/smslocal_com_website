/**
 * Step 1 of the blog import: pull the raw source for every URL in the
 * SEMrush positions sheet and cache it on disk so the transform step
 * (transform-smslocal-blogs.mjs) can run offline and be re-run cheaply.
 *
 *   node scripts/fetch-smslocal-blogs.mjs
 *
 * Writes:  scripts/.cache/raw/<slug>.json   { url, type, api, pageHtml }
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const ORIGIN = 'https://www.smslocal.com'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
const CACHE = path.join(import.meta.dirname, '.cache', 'raw')

export const SOURCE_URLS = [
  '/blog/385-area-code/',
  '/blog/what-does-wyf-mean/',
  '/blog/913-area-code/',
  '/blog/what-does-ttyl-mean/',
  '/blog/469-area-code/',
  '/blog/what-does-mb-mean/',
  '/blog/what-does-lwk-mean-in-text/',
  '/blog/what-does-dw-mean-in-text/',
  '/blog/what-does-istg-mean/',
  '/blog/22395-short-code/',
  '/blog/what-does-frl-mean-in-text/',
  '/blog/what-does-ts-mean-in-text/',
  '/blog/971-area-code/',
  '/blog/801-area-code/',
  '/blog/message-blocking-is-active/',
  '/blog/216-area-code/',
  '/blog/what-does-otp-mean-in-text/',
  '/blog/emoji-meaning-in-text/',
  '/blog/what-does-wtw-mean/',
  '/blog/what-does-ig-mean/',
  '/blog/what-does-wyll-mean/',
  '/blog/exploring-the-808-area-code/',
  '/blog/what-does-mk-mean/',
  '/blog/what-does-smh-mean-in-text/',
  '/blog/sms-bomber/',
  '/blog/252-area-code/',
  '/blog/what-does-nfs-mean-in-text/',
  '/blog/what-does-ty-mean/',
  '/blog/626-area-code/',
  '/blog/what-does-tbh-mean/',
  '/blog/unlocking-the-770-area-code/',
  '/resources/insights/how-to-send-a-system-generated-sms/',
]

async function get(url, asJson = false) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA, accept: '*/*' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return asJson ? await res.json() : await res.text()
    } catch (err) {
      if (attempt === 4) throw err
      await new Promise((r) => setTimeout(r, 800 * attempt))
    }
  }
}

async function fetchOne(urlPath) {
  const slug = urlPath.replace(/\/$/, '').split('/').pop()
  const url = ORIGIN + urlPath

  // Posts live under /blog/, the insights article is a WP page — try both.
  let api = null
  let type = 'post'
  for (const endpoint of ['posts', 'pages']) {
    const rows = await get(`${ORIGIN}/wp-json/wp/v2/${endpoint}?slug=${slug}`, true)
    if (Array.isArray(rows) && rows.length > 0) {
      api = rows[0]
      type = endpoint === 'posts' ? 'post' : 'page'
      break
    }
  }
  if (!api) throw new Error(`no WP record for ${urlPath}`)

  const pageHtml = await get(url)
  return { url, urlPath, slug, type, api, pageHtml }
}

async function main() {
  await fs.mkdir(CACHE, { recursive: true })
  const force = process.argv.includes('--force')
  let done = 0

  for (const urlPath of SOURCE_URLS) {
    const slug = urlPath.replace(/\/$/, '').split('/').pop()
    const out = path.join(CACHE, `${slug}.json`)
    if (!force) {
      try {
        await fs.access(out)
        console.log(`· cached  ${slug}`)
        done++
        continue
      } catch {
        /* not cached yet */
      }
    }
    const record = await fetchOne(urlPath)
    await fs.writeFile(out, JSON.stringify(record))
    done++
    console.log(`✓ ${String(done).padStart(2)}/${SOURCE_URLS.length}  ${slug}  (${(record.api.content.rendered.length / 1024).toFixed(0)}kb content)`)
  }
  console.log(`\nCached ${done} sources in ${CACHE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
