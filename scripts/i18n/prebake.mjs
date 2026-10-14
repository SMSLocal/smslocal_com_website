// Pre-translates the strings on built pages into scripts/.cache/i18n/<lang>.json,
// so api/i18n-ssr.js serves them from the cache instead of calling the free
// translation endpoint at request time — which throttles hard and was leaving
// locale pages in English.
//
//   npm run build                                   # pages to read from
//   node scripts/i18n/prebake.mjs [prefix] [langs]  # e.g. /blog/ es,fr
//
// Stricter than translateBatch in ./translate.mjs on purpose: an answer
// identical to a multi-word English source is the endpoint echoing its input
// while throttled, not a translation, so it is never written to the cache.
// Echo entries already in the cache are removed for the same reason. The cache
// is saved after every batch, so an interrupted run resumes where it stopped.
// Strings still untranslated at the end are listed in
// scripts/.cache/i18n-untranslated.json for manual review.
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { translatePageHtml } from './html-translator.mjs'
import { LANGUAGES } from '../../src/data/languages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const DIST = join(root, 'dist')
const CACHE_DIR = join(root, 'scripts/.cache/i18n')
const REPORT = join(root, 'scripts/.cache/i18n-untranslated.json')
// Strings reviewed by hand and confirmed correct in English for that language
// (names, addresses, acronym expansions): lang -> [source]. Stored as
// identity translations, and exempt from the echo purge below.
const KEEP_ENGLISH = join(root, 'scripts/i18n/keep-english.json')
const keepEnglish = existsSync(KEEP_ENGLISH) ? JSON.parse(readFileSync(KEEP_ENGLISH, 'utf8')) : {}
// Ambiguous strings translated through an unambiguous English phrasing; see
// the comment in aliases.json. Re-translated on every run so an edit there
// takes effect.
const ALIASES_FILE = join(root, 'scripts/i18n/aliases.json')
const aliases = existsSync(ALIASES_FILE) ? JSON.parse(readFileSync(ALIASES_FILE, 'utf8')) : {}
delete aliases._comment

const prefix = process.argv[2] || '/'
const langs = process.argv[3]
  ? process.argv[3].split(',')
  : LANGUAGES.map((l) => l.code).filter((c) => c !== 'en')

// Same rule as isEcho in api/i18n-ssr.js.
const ECHO_RE = /[A-Za-z]{2,}\s+[A-Za-z]{2,}\s+[A-Za-z]{2,}/
const isEcho = (src, tr) => tr.trim() === src.trim() && ECHO_RE.test(src)

const BRAND = 'SMSLocal'
const BRAND_TOKEN = 'XSMSLOCALX'
// Same list as api/i18n-ssr.js: forms the placeholder comes back as.
const MANGLED_BRAND_RE = /XSMS本地计算X?|X?XMSS?LOCALX|XSMSローカルX|एक्सएसएमएसलोकलएक्स/g

// Every index.html under dist/<prefix>.
function pagesUnder(dir) {
  const out = []
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...pagesUnder(p))
    else if (name === 'index.html') out.push(p)
  }
  return out
}

async function collectStrings() {
  const strings = new Set()
  const collect = async (texts) => {
    texts.forEach((t) => strings.add(t))
    return new Map()
  }
  const pages = pagesUnder(join(DIST, prefix))
  for (const file of pages) {
    await translatePageHtml(readFileSync(file, 'utf8'), 'fr', () => true, collect, { localizeHead: true })
  }
  return { pages: pages.length, strings: [...strings] }
}

async function googleChunk(texts, lang) {
  const params = new URLSearchParams({ client: 'gtx', sl: 'en', tl: lang })
  for (const t of texts) params.append('q', (aliases[t] ?? t).replaceAll(BRAND, BRAND_TOKEN))
  const res = await fetch(`https://translate.googleapis.com/translate_a/t?${params}`, {
    headers: { 'user-agent': 'Mozilla/5.0' },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const items = typeof data === 'string' ? [data] : data
  return texts.map((_t, i) => {
    const item = Array.isArray(items[i]) ? items[i][0] : items[i]
    return typeof item === 'string' && item ? item.replaceAll(BRAND_TOKEN, BRAND).replace(MANGLED_BRAND_RE, BRAND) : null
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function bakeLanguage(lang, strings) {
  const file = join(CACHE_DIR, `${lang}.json`)
  const cache = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {}

  const keep = new Set(keepEnglish[lang] || [])
  for (const k of Object.keys(aliases)) if (!keep.has(k)) delete cache[k]
  for (const k of keep) cache[k] = k

  let purged = 0
  for (const [k, v] of Object.entries(cache)) {
    if (typeof v !== 'string' || (isEcho(k, v) && !keep.has(k))) {
      delete cache[k]
      purged++
    }
  }

  const needed = strings.filter((s) => cache[s] === undefined)
  // Chunks are capped by characters as well as count: the endpoint takes its
  // input in the query string, and a run of long paragraphs blows the URL limit.
  const chunks = []
  let cur = []
  let len = 0
  for (const s of needed) {
    if (cur.length && (cur.length >= 40 || len + s.length > 4500)) {
      chunks.push(cur)
      cur = []
      len = 0
    }
    cur.push(s)
    len += s.length
  }
  if (cur.length) chunks.push(cur)

  const CONCURRENCY = Number(process.env.I18N_CONCURRENCY) || 4
  let added = 0
  let next = 0
  let limit = 0
  let backoff = 0
  // Windows can briefly lock the file (antivirus, an editor's watcher) and
  // fail the write with UNKNOWN/EBUSY; a short retry is enough.
  const save = async () => {
    for (let attempt = 1; ; attempt++) {
      try {
        return writeFileSync(file, JSON.stringify(cache))
      } catch (err) {
        if (attempt >= 5) throw err
        await sleep(1000 * attempt)
      }
    }
  }

  async function worker() {
    while (next < limit) {
      const chunk = chunks[next++]
      for (let attempt = 1; attempt <= 4; attempt++) {
        if (backoff) await sleep(backoff)
        try {
          const out = await googleChunk(chunk, lang)
          chunk.forEach((src, i) => {
            const tr = out[i]
            if (tr && !isEcho(src, tr)) {
              cache[src] = tr
              added++
            }
          })
          backoff = Math.max(0, backoff - 250)
          break
        } catch {
          backoff = Math.min(15000, backoff + 2000)
        }
      }
    }
  }

  // Save between rounds so an interrupted run keeps its progress.
  const ROUND = 50
  const total = chunks.length
  while (next < total) {
    limit = Math.min(total, next + ROUND)
    await Promise.all(Array.from({ length: CONCURRENCY }, worker))
    await save()
    process.stdout.write(`  ${lang}: ${Math.min(next, total)}/${total} chunks, +${added}\n`)
  }
  await save()

  const missing = strings.filter((s) => cache[s] === undefined && ECHO_RE.test(s))
  return { lang, needed: needed.length, added, purged, missing }
}

const { pages, strings } = await collectStrings()
console.log(`${pages} pages under ${prefix}: ${strings.length} unique strings, ${langs.length} languages`)

for (const lang of langs) {
  const r = await bakeLanguage(lang, strings)
  // Re-read before writing: several runs (one per language group) may share it.
  const report = existsSync(REPORT) ? JSON.parse(readFileSync(REPORT, 'utf8')) : {}
  report[lang] = r.missing
  writeFileSync(REPORT, JSON.stringify(report, null, 1))
  console.log(`${lang}: needed ${r.needed}, added ${r.added}, purged ${r.purged} echo entries, still missing ${r.missing.length}`)
}
