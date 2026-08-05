// Build-time translation via the free, unofficial Google Translate endpoint —
// no API key, no paid service. Adapted from the reference implementation's
// lib/server-translator.ts, but persisted to disk (not just in-memory)
// because this runs fresh in every `npm run build`, not in a long-lived
// server process: without a disk cache, every build would re-translate every
// string from scratch, which is slow and risks the free endpoint rate-limiting
// this unofficial, bulk, non-traffic-driven usage pattern.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
// One file per language, not one big file. This cache is committed so Vercel
// doesn't re-translate the whole site on every deploy — but at full-site
// scope a single file heads toward ~100MB, and GitHub refuses any file that
// large (and warns past 50MB). Split per language it's a few MB each, which
// git handles fine, and a build only rewrites the languages it touched.
const CACHE_DIR = join(root, 'scripts/.cache/i18n')
const LEGACY_CACHE_FILE = join(root, 'scripts/.cache/i18n-translations.json')

// lang -> Map(sourceText -> translation)
const cache = new Map()
const dirtyLangs = new Set()

const langCache = (lang) => {
  let m = cache.get(lang)
  if (!m) {
    m = new Map()
    cache.set(lang, m)
  }
  return m
}

function loadCache() {
  // Fold in the old single-file cache if it's still present, so changing the
  // format doesn't discard translations already paid for.
  if (existsSync(LEGACY_CACHE_FILE)) {
    try {
      const raw = JSON.parse(readFileSync(LEGACY_CACHE_FILE, 'utf8'))
      for (const [k, v] of Object.entries(raw)) {
        // Legacy keys are `${lang}\0${text}`. The separator is a NUL on
        // purpose — the source text is full of spaces, so splitting on
        // anything else would mangle every key and bin the whole cache.
        const sep = k.indexOf('\u0000')
        if (sep === -1) continue
        langCache(k.slice(0, sep)).set(k.slice(sep + 1), v)
      }
      for (const lang of cache.keys()) dirtyLangs.add(lang)
    } catch {
      // An unreadable legacy cache isn't worth failing a build over.
    }
  }

  if (!existsSync(CACHE_DIR)) return
  for (const file of readdirSync(CACHE_DIR)) {
    if (!file.endsWith('.json')) continue
    const lang = file.slice(0, -5)
    try {
      const raw = JSON.parse(readFileSync(join(CACHE_DIR, file), 'utf8'))
      const entries = langCache(lang)
      for (const [k, v] of Object.entries(raw)) if (!entries.has(k)) entries.set(k, v)
    } catch {
      // Skip a corrupt language file; those strings just get re-translated.
    }
  }
}

loadCache()

function persist() {
  if (dirtyLangs.size === 0) return
  mkdirSync(CACHE_DIR, { recursive: true })
  for (const lang of dirtyLangs) {
    const entries = cache.get(lang)
    if (entries) {
      writeFileSync(join(CACHE_DIR, `${lang}.json`), JSON.stringify(Object.fromEntries(entries)))
    }
  }
  dirtyLangs.clear()
  // Everything in it has been folded into the per-language files above.
  if (existsSync(LEGACY_CACHE_FILE)) rmSync(LEGACY_CACHE_FILE, { force: true })
}

async function requestChunk(texts, targetLang, attempt = 1) {
  const params = new URLSearchParams({ client: 'gtx', sl: 'en', tl: targetLang })
  for (const t of texts) params.append('q', t)

  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/t?${params}`, {
      headers: { 'user-agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return texts.map((t, i) => {
      const item = data[i]
      if (typeof item === 'string') return item
      if (Array.isArray(item)) return String(item[0] ?? t)
      return t
    })
  } catch (err) {
    // The free endpoint is unofficial and rate-limits under bulk load — back
    // off and retry a couple of times before giving up and keeping originals.
    if (attempt >= 3) {
      console.warn(`  translate: giving up on a chunk after ${attempt} attempts (${err.message})`)
      return texts
    }
    await new Promise((r) => setTimeout(r, attempt * 1000))
    return requestChunk(texts, targetLang, attempt + 1)
  }
}

/**
 * Translate a batch of distinct strings into `targetLang`. Cached to disk —
 * a string already translated in a prior build costs nothing. Chunked at 30
 * per request (matching the reference implementation) and throttled to a
 * small concurrency so a single build doesn't hammer the free endpoint.
 */
export async function translateBatch(texts, targetLang) {
  if (targetLang === 'en' || texts.length === 0) return new Map()

  const store = langCache(targetLang)
  const result = new Map()
  const needed = []
  for (const text of texts) {
    const hit = store.get(text)
    if (hit !== undefined) result.set(text, hit)
    else needed.push(text)
  }
  if (needed.length === 0) return result

  // Tuned up from 30/4. The original numbers were a guess made when this only
  // had to translate four pages; at whole-site scope they were the build's
  // bottleneck — the work is almost entirely waiting on the network, not CPU,
  // so more requests in flight is close to a linear speedup. Overridable
  // without a code change so it can be dialled back if the free endpoint
  // starts refusing: I18N_CHUNK / I18N_CONCURRENCY.
  //
  // The endpoint is unofficial and does rate-limit. requestChunk already
  // retries with backoff and, failing that, keeps the English text — so the
  // downside of pushing too hard is untranslated strings, not a broken build.
  // Watch the build log for "giving up on a chunk"; that's the signal these
  // are too high.
  const CHUNK = Number(process.env.I18N_CHUNK) || 60
  const CONCURRENCY = Number(process.env.I18N_CONCURRENCY) || 12
  const chunks = []
  for (let i = 0; i < needed.length; i += CHUNK) chunks.push(needed.slice(i, i + CHUNK))

  for (let i = 0; i < chunks.length; i += CONCURRENCY) {
    const batch = chunks.slice(i, i + CONCURRENCY)
    const results = await Promise.all(batch.map((c) => requestChunk(c, targetLang)))
    batch.forEach((chunk, ci) => {
      chunk.forEach((src, si) => {
        const translated = results[ci][si]
        result.set(src, translated)
        if (translated && translated !== src) {
          store.set(src, translated)
          dirtyLangs.add(targetLang)
        }
      })
    })
  }

  persist()
  return result
}

export function cacheStats() {
  let entries = 0
  for (const m of cache.values()) entries += m.size
  return { entries, languages: cache.size }
}
