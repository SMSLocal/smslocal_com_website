// Translates the raw output of render(route) (see src/entry-server.jsx) into
// a target locale: every visible text node, including <title> (there's no
// separate metadata-translation step here — title/description are just text
// nodes and attribute values like everything else), plus <meta content="">
// attributes, which a text-node walker can never see on its own since <meta>
// is a void element with no children. Internal <a href="/..."> links only get
// rewritten to /<locale>/... when the target is itself translated (in
// PILOT_ROUTES) — pointing at a locale URL that doesn't exist would be worse
// than leaving the link in English.
//
// Adapted from the reference implementation's lib/html-translator.ts. Same
// tokenizer approach (split on tags, track a skip-scope stack, translate the
// text runs in between) — the free translation call itself lives in
// translate.mjs.
import { translateBatch } from './translate.mjs'

const SKIP_TAGS = new Set([
  'script', 'style', 'code', 'pre', 'noscript', 'svg', 'canvas',
  'textarea', 'template', 'math',
])

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

const SKIP_HREF_RE = /^(?:#|mailto:|tel:|javascript:|data:|https?:|\/\/|\/api\/|\/favicon|\/icon|\/robots|\/sitemap|\/assets\/)/i
const HAS_EXTENSION_RE = /\.[a-z0-9]+$/i

const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (m, ent) => {
    if (ent[0] === '#') {
      const code = ent[1] === 'x' || ent[1] === 'X' ? parseInt(ent.slice(2), 16) : parseInt(ent.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : m
    }
    return NAMED_ENTITIES[ent] ?? m
  })
}

// Re-encode only characters that would break HTML structure — over-encoding
// (e.g. every accented letter) would mangle text a translation just produced.
function encodeText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function hasLetters(s) {
  return /[A-Za-zÀ-ɏͰ-ϿЀ-ӿ؀-ۿऀ-ॿ฀-๿一-鿿぀-ヿ가-힯]/.test(s)
}

function tagName(tag) {
  const m = /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/.exec(tag)
  return m ? m[1].toLowerCase() : ''
}

function localizeAnchor(tag, locale, translatedRoutes) {
  return tag.replace(/(\shref\s*=\s*")(\/[^"]*)"/i, (full, pre, href) => {
    const bare = href.split(/[?#]/)[0]
    if (SKIP_HREF_RE.test(href) || HAS_EXTENSION_RE.test(bare)) return full
    if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return full
    const clean = bare.length > 1 && bare.endsWith('/') ? bare.slice(0, -1) : bare || '/'
    if (!translatedRoutes.has(clean)) return full
    return `${pre}/${locale}${href}"`
  })
}

// <meta name="description"|property="og:title"|property="og:description"
// content="..."> — the only translatable attribute values in the document;
// everything else translatable is a text node the tokenizer below handles.
async function translateMetaAttrs(html, locale) {
  const re = /<meta\s+[^>]*?(?:name="description"|property="og:(?:title|description)")[^>]*?content="([^"]*)"[^>]*>/gi
  const originals = new Set()
  for (const m of html.matchAll(re)) {
    const decoded = decodeEntities(m[1]).trim()
    if (decoded) originals.add(decoded)
  }
  if (originals.size === 0) return { html, map: new Map() }

  const map = await translateBatch([...originals], locale)
  const out = html.replace(re, (full, content) => {
    const decoded = decodeEntities(content).trim()
    const translated = map.get(decoded)
    if (!translated) return full
    return full.replace(`content="${content}"`, `content="${encodeText(translated)}"`)
  })
  // Returned so these land in the injected dictionary too: React re-renders
  // <Seo> on the client with the English meta and Canonical.jsx drops the
  // prerendered tags, so the client needs these strings to put the
  // translation back (see src/i18n/applyTranslations.js).
  return { html: out, map }
}

/**
 * Translate render(route)'s output into `locale`. Returns the translated
 * HTML string and how many distinct strings were translated.
 */
export async function translatePageHtml(html, locale, translatedRoutes) {
  if (locale === 'en') return { html, count: 0 }

  const { html: withMetaTranslated, map: metaMap } = await translateMetaAttrs(html, locale)

  const parts = withMetaTranslated.split(/(<[^>]+>)/)
  const skipStack = []
  const skipNow = () => skipStack.length > 0 && skipStack[skipStack.length - 1]

  const jobs = []
  const unique = new Set()

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue

    if (part[0] === '<') {
      if (part[1] === '!' || part[1] === '?') continue
      const closing = part[1] === '/'
      const name = tagName(part)
      if (closing) {
        if (!VOID_TAGS.has(name) && skipStack.length) skipStack.pop()
      } else {
        const selfClosing = /\/>\s*$/.test(part) || VOID_TAGS.has(name)
        if (!selfClosing) {
          const isSkip = SKIP_TAGS.has(name) || /\sdata-no-translate(?:[=\s>/]|$)/i.test(part)
          skipStack.push(skipNow() || isSkip)
        }
        if (name === 'a') parts[i] = localizeAnchor(part, locale, translatedRoutes)
      }
      continue
    }

    if (skipNow()) continue
    const lead = part.slice(0, part.length - part.trimStart().length)
    const trail = part.slice(part.trimEnd().length)
    const coreRaw = part.slice(lead.length, part.length - trail.length)
    if (!coreRaw) continue
    const core = decodeEntities(coreRaw).trim()
    if (core.length < 2 || !hasLetters(core)) continue
    jobs.push({ index: i, lead, core, trail })
    unique.add(core)
  }

  // No early return when there's no body text: the meta strings still need
  // to reach the client dictionary. translateBatch([]) is a no-op.
  const map = await translateBatch([...unique], locale)

  for (const job of jobs) {
    const tr = map.get(job.core)
    if (!tr) continue
    parts[job.index] = job.lead + encodeText(tr) + job.trail
  }

  // Body text and <meta content> strings go into one dictionary — the client
  // has to restore both after React re-renders the page in English.
  const dict = Object.fromEntries([...metaMap, ...map])
  const json = JSON.stringify(dict).replace(/<\/script>/gi, '<\\/script>')
  const inlineScript =
    `<script>window.__LD_TX__=${json};window.__LD_LOCALE__=${JSON.stringify(locale)};</script>`

  return { html: parts.join('') + inlineScript, count: Object.keys(dict).length, dict }
}
