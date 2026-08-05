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
// text runs in between).
//
// The translation backend is injected rather than imported. There are two:
// the build's disk-cached translateBatch (./translate.mjs) and the request-time
// one in api/i18n-ssr.js. Importing translate.mjs here would drag its cache —
// which reads and writes scripts/.cache at import time — into the serverless
// bundle, where the filesystem is read-only. One tokenizer, two backends, no
// second copy of this file to keep in sync.

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

const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00A0' }

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

// `isTranslated` is a predicate, not a Set: the build knows the exact list of
// files it is about to write, while at request time any route that isn't opted
// out is served by the function, so there is no list to hold — only a rule.
function localizeAnchor(tag, locale, isTranslated) {
  return tag.replace(/(\shref\s*=\s*")(\/[^"]*)"/i, (full, pre, href) => {
    const bare = href.split(/[?#]/)[0]
    if (SKIP_HREF_RE.test(href) || HAS_EXTENSION_RE.test(bare)) return full
    if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return full
    const clean = bare.length > 1 && bare.endsWith('/') ? bare.slice(0, -1) : bare || '/'
    if (!isTranslated(clean)) return full
    return `${pre}/${locale}${href}"`
  })
}

// <meta name="description"|property="og:title"|property="og:description"
// content="..."> — the only translatable attribute values in the document;
// everything else translatable is a text node the tokenizer below handles.
const META_RE =
  /<meta\s+[^>]*?(?:name="description"|property="og:(?:title|description)")[^>]*?content="([^"]*)"[^>]*>/gi

function collectMetaStrings(html, into) {
  for (const m of html.matchAll(META_RE)) {
    const decoded = decodeEntities(m[1]).trim()
    if (decoded) into.add(decoded)
  }
}

// Applied after the single shared translateBatch, so meta, JSON-LD and body
// text cost one request per page between them instead of three. With 5,491
// pages the difference is entirely round-trip latency, and it dominated the
// build.
function applyMetaStrings(html, map) {
  return html.replace(META_RE, (full, content) => {
    const decoded = decodeEntities(content).trim()
    const translated = map.get(decoded)
    if (!translated) return full
    return full.replace(`content="${content}"`, `content="${encodeText(translated)}"`)
  })
}

// JSON-LD lives inside <script type="application/ld+json">, and the tokenizer
// below skips every <script> — correctly, since translating JavaScript would
// destroy it. The consequence was that structured data stayed English on
// every translated page: Google read a Dutch article whose schema still
// announced the English headline and description. Handled separately here,
// parsing the JSON and translating only known human-readable fields, so the
// structure, URLs, dates and @type values are never touched.
const LD_TEXT_FIELDS = new Set(['headline', 'name', 'description', 'articleSection'])

const LD_RE = /(<script[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/gi

/** Parses each block once and collects its translatable strings. */
function collectJsonLd(html, into) {
  const parsed = []
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk)
    if (!node || typeof node !== 'object') return
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string' && LD_TEXT_FIELDS.has(k) && v.trim()) into.add(v.trim())
      else walk(v)
    }
  }
  for (const b of html.matchAll(LD_RE)) {
    try {
      const data = JSON.parse(b[2])
      parsed.push(data)
      walk(data)
    } catch {
      parsed.push(null) // leave unparseable blocks exactly as they are
    }
  }
  return parsed
}

function applyJsonLd(html, map, parsed, locale) {
  if (parsed.length === 0) return html
  const localize = (node) => {
    if (Array.isArray(node)) return node.map(localize)
    if (!node || typeof node !== 'object') return node
    const out = {}
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string' && LD_TEXT_FIELDS.has(k)) out[k] = map.get(v.trim()) ?? v
      else out[k] = localize(v)
    }
    return out
  }
  let i = 0
  return html.replace(LD_RE, (full, open, _body, close) => {
    const data = parsed[i++]
    if (!data) return full
    // inLanguage tells a crawler which language this page's content is in;
    // without it the schema silently inherits the site default.
    const localized = { ...localize(data), inLanguage: locale }
    return open + JSON.stringify(localized).replace(/<\/script>/gi, '<\\/script>') + close
  })
}

// Point the head at the locale's own URL. Only needed when the source document
// is the finished English page (the request-time path, where the origin is a
// static file): the build path renders each locale URL through React, so
// Canonical.jsx/Seo.jsx already emit the right canonical, og:url and og:locale
// and this must not run. hreflang is deliberately untouched — the English page
// already advertises every locale with absolute URLs, which is exactly what the
// translated copy should say too.
function localizeHeadUrls(html, locale, rtl) {
  const prefix = (m, pre, url) => `${pre}${url.replace(/^(https?:\/\/[^/]+)/, `$1/${locale}`)}"`
  return html
    .replace(/<html[^>]*>/i, `<html lang="${locale}"${rtl ? ' dir="rtl"' : ''}>`)
    .replace(/(<link[^>]*rel="canonical"[^>]*href=")([^"]*)"/i, prefix)
    .replace(/(<meta[^>]*property="og:url"[^>]*content=")([^"]*)"/i, prefix)
    .replace(
      /(<meta[^>]*property="og:locale"[^>]*content=")([^"]*)"/i,
      `$1${locale}_${locale.toUpperCase()}"`,
    )
}

/**
 * Translate a rendered English document into `locale`. `translate` is the
 * backend (see the note at the top of this file): (texts, locale) => Map.
 * Returns the translated HTML and how many distinct strings it translated.
 */
export async function translatePageHtml(
  html,
  locale,
  isTranslated,
  translate,
  { localizeHead = false, rtl = false } = {},
) {
  if (locale === 'en') return { html, count: 0, dict: {} }

  // Collect from all three sources first, translate once, then apply. Doing
  // them sequentially cost three round trips per page; across 5,491 pages
  // that latency, not the translation itself, was the build's bottleneck.
  const unique = new Set()
  collectMetaStrings(html, unique)
  const ldParsed = collectJsonLd(html, unique)

  const parts = html.split(/(<[^>]+>)/)
  const skipStack = []
  const skipNow = () => skipStack.length > 0 && skipStack[skipStack.length - 1]

  const jobs = []

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
        if (name === 'a') parts[i] = localizeAnchor(part, locale, isTranslated)
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

  // The one request per page: meta, JSON-LD and body text together.
  const map = await translate([...unique], locale)

  for (const job of jobs) {
    const tr = map.get(job.core)
    if (!tr) continue
    parts[job.index] = job.lead + encodeText(tr) + job.trail
  }

  // Body was translated in `parts`; meta and JSON-LD are applied over the
  // reassembled document, since both live in tags the body pass skips.
  let out = parts.join('')
  out = applyMetaStrings(out, map)
  out = applyJsonLd(out, map, ldParsed, locale)
  if (localizeHead) out = localizeHeadUrls(out, locale, rtl)

  // Everything goes into one dictionary — the client has to restore body text
  // AND head tags after React re-renders the page in English.
  const dict = Object.fromEntries(map)
  const json = JSON.stringify(dict).replace(/<\/script>/gi, '<\\/script>')
  const inlineScript =
    `<script>window.__LD_TX__=${json};window.__LD_LOCALE__=${JSON.stringify(locale)};</script>`

  return { html: out + inlineScript, count: Object.keys(dict).length, dict }
}
