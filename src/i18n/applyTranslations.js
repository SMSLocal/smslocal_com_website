// Client-side companion to the request-time translator (api/i18n-ssr.js). The
// HTML served for a locale page is already fully translated — this exists
// only because main.jsx does a fresh createRoot().render() rather than
// hydrateRoot(), so the moment React's client render commits, it repaints
// the DOM from the (English) JSX and would otherwise silently discard the
// translation. Re-applies the dictionary the server injected
// (window.__LD_TX__) right after that commit, then keeps re-applying via a
// MutationObserver for anything React re-renders afterward.
//
// It only ever covers the page that was actually served. Navigating within a
// locale is a full page load (see LocaleTranslator.jsx), so every page arrives
// with its own dictionary and there is no cross-page dictionary to fetch.
import { getLocaleFromPathname } from '../lib/locale.js'
import { isRTL } from '../data/languages.js'
import { hasTranslatedPage } from '../data/translatedRoutes.js'

const SKIP_TAGS = new Set([
  'script', 'style', 'code', 'pre', 'noscript', 'svg', 'canvas', 'textarea', 'input',
])

function hasLetters(s) {
  return /[A-Za-zÀ-ɏͰ-ϿЀ-ӿ؀-ۿऀ-ॿ฀-๿一-鿿぀-ヿ가-힯]/.test(s)
}

function collectTextNodes(root) {
  const nodes = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let n
  while ((n = walker.nextNode())) {
    const text = (n.textContent ?? '').trim()
    if (text.length < 2 || !hasLetters(text)) continue
    let el = n.parentElement
    let skip = false
    while (el) {
      if (SKIP_TAGS.has(el.tagName.toLowerCase())) {
        skip = true
        break
      }
      el = el.parentElement
    }
    if (!skip) nodes.push(n)
  }
  return nodes
}

// What each node said before we touched it. The chrome (navbar, footer)
// isn't re-created when React Router changes route, so its nodes survive a
// navigation with our translated text still in them — navigating from a
// translated page to an English one left a Korean navbar above English page
// content until this restored them. Keyed weakly so nodes React discards are
// not retained.
const originalText = new WeakMap()
const originalHref = new WeakMap()

// Everything the dictionary can produce. Some dictionaries chain — Italian
// has "Ecommerce"→"E-commerce" and separately "E-commerce"→"Commercio
// elettronico" — so text the server already translated correctly is itself a
// key, and the MutationObserver re-collects it and translates it a second
// time. The page then disagrees with the HTML that was served. Anything that
// is already a translation output is left alone.
let outputs = new WeakMap()
function outputsOf(dict) {
  let set = outputs.get(dict)
  if (!set) {
    set = new Set(Object.values(dict))
    outputs.set(dict, set)
  }
  return set
}

function applyDict(dict, nodes) {
  const produced = outputsOf(dict)
  for (const node of nodes) {
    const raw = node.textContent ?? ''
    const trimmed = raw.trim()
    if (!trimmed) continue
    if (produced.has(trimmed)) continue
    const translated = dict[trimmed]
    if (!translated || translated === trimmed) continue
    if (!originalText.has(node)) originalText.set(node, raw)
    const lead = raw.slice(0, raw.length - raw.trimStart().length)
    const trail = raw.slice(raw.trimEnd().length)
    const next = lead + translated + trail
    if (node.textContent !== next) node.textContent = next
  }
}

/** Puts back everything we translated, for when the route goes back to English. */
function restoreOriginal() {
  for (const node of collectTextNodes(document.body)) {
    const original = originalText.get(node)
    if (original !== undefined && node.textContent !== original) node.textContent = original
  }
  for (const a of document.querySelectorAll('a[href]')) {
    const href = originalHref.get(a)
    if (href !== undefined && a.getAttribute('href') !== href) a.setAttribute('href', href)
  }
}

// The prerendered file ships a translated <title> and <meta>, but they don't
// survive the client: Seo.jsx re-renders them from its English props and
// Canonical.jsx deletes the prerendered copies on mount, so without this the
// tab title and social/search preview revert to English even though the page
// body is translated. <title> is a text node so it's in the dictionary from
// the body pass; the <meta content> strings are merged in by the build (see
// html-translator.mjs).
const HEAD_TARGETS = [
  { selector: 'title', attr: null },
  { selector: 'meta[name="description"]', attr: 'content' },
  { selector: 'meta[property="og:title"]', attr: 'content' },
  { selector: 'meta[property="og:description"]', attr: 'content' },
]

function applyHead(dict) {
  for (const { selector, attr } of HEAD_TARGETS) {
    for (const el of document.querySelectorAll(selector)) {
      const current = (attr ? el.getAttribute(attr) : el.textContent) ?? ''
      const translated = dict[current.trim()]
      if (!translated || translated === current) continue
      if (attr) el.setAttribute(attr, translated)
      else el.textContent = translated
    }
  }
}

function headStrings() {
  const out = []
  for (const { selector, attr } of HEAD_TARGETS) {
    for (const el of document.querySelectorAll(selector)) {
      const value = ((attr ? el.getAttribute(attr) : el.textContent) ?? '').trim()
      if (value) out.push(value)
    }
  }
  return out
}

// The static file's own hrefs were already rewritten to /<locale>/... at
// build time (scripts/i18n/html-translator.mjs) — but React Router's <Link>
// renders from its own JSX-authored `to` prop, not from the DOM it's
// replacing, so the moment client render commits it repaints every internal
// href back to plain English. Same problem as the text nodes, same fix:
// reapply after every render. Only rewritten when the target is itself a
// translated page (PILOT_ROUTES) — anything else has no locale URL to send
// the browser to.
function rewriteLinks(locale) {
  const prefix = `/${locale}`
  document.querySelectorAll('a[href^="/"]').forEach((a) => {
    const href = a.getAttribute('href') ?? ''
    if (href.startsWith(`${prefix}/`) || href === prefix) return
    const bare = href.split(/[?#]/)[0]
    // Only page URLs: a file (/sitemap.xml, /assets/…) has no locale copy.
    if (/\.[a-z0-9]+$/i.test(bare) || bare.startsWith('/assets/')) return
    const clean = bare.length > 1 && bare.endsWith('/') ? bare.slice(0, -1) : bare || '/'
    // Must be a page that was actually generated, not merely "in scope":
    // /register/ is in scope but only exists in English via a redirect, so
    // /fr/register/ would 404.
    if (!hasTranslatedPage(clean)) return
    const suffix = href.slice(bare.length)
    if (!originalHref.has(a)) originalHref.set(a, href)
    a.setAttribute('href', `${prefix}${bare}${suffix}`)
  })
}

// Dev only. The dev server has no prerendered locale files, so there's no
// baked-in window.__LD_TX__ to apply — without this, /fr/ would render in
// English in dev and translations could only ever be checked by running a
// full build. Asks the dev-server endpoint (scripts/i18n/vite-dev-translate)
// for whatever strings this page actually contains; that shares the build's
// on-disk cache, so already-translated strings come back instantly.
//
// `translatedValues` is the guard the reference implementation calls out as
// essential: once text has been replaced, the MutationObserver re-collects
// it, and sending an already-translated string back to the translator
// corrupts it. Anything we've produced is never re-submitted.
const translatedValues = new Set()

async function fetchDevTranslations(locale, dict) {
  const candidates = [
    ...collectTextNodes(document.body).map((n) => (n.textContent ?? '').trim()),
    ...headStrings(),
  ]
  const needed = candidates.filter(
    (text) => text && !dict[text] && !translatedValues.has(text),
  )
  if (needed.length === 0) return false

  try {
    const res = await fetch('/__i18n/translate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ texts: [...new Set(needed)], targetLang: locale }),
    })
    if (!res.ok) return false
    const { translations } = await res.json()
    const unique = [...new Set(needed)]
    let added = false
    unique.forEach((src, i) => {
      const tr = translations[i]
      if (tr && tr !== src) {
        dict[src] = tr
        translatedValues.add(tr)
        added = true
      }
    })
    return added
  } catch {
    return false
  }
}

let observer = null
let pending = null
// Bumped on every route change. Disconnecting the observer stops new
// mutations firing, but anything already scheduled — the debounce timer, an
// in-flight translation fetch — still runs and would re-translate the page
// we just left. That's what put a Korean navbar above an English page after
// navigating from a translated route to an untranslated one. Callbacks
// compare against this and drop out if they belong to a previous route.
let generation = 0

/** Re-applies the injected dictionary and internal-link prefixes to the
 *  current DOM, and keeps doing so for anything React re-renders afterward
 *  (search results, carousel slides). */
export function applyTranslations() {
  const locale = getLocaleFromPathname(window.location.pathname)
  observer?.disconnect()
  observer = null
  if (pending) clearTimeout(pending)
  pending = null
  const mine = ++generation

  if (locale === 'en') {
    // Not a no-op: the persistent chrome may still be holding the previous
    // route's translation.
    restoreOriginal()
    document.documentElement.lang = 'en'
    document.documentElement.removeAttribute('dir')
    return
  }

  // In production this is the dictionary the build injected; in dev it starts
  // empty and is filled in by fetchDevTranslations below.
  const dict = window.__LD_TX__ ?? (window.__LD_TX__ = {})
  const run = () => {
    if (mine !== generation) return
    applyDict(dict, collectTextNodes(document.body))
    applyHead(dict)
    rewriteLinks(locale)
  }
  // In dev, also pick up text React renders after the first pass. This can't
  // loop: fetchDevTranslations skips both strings already in the dictionary
  // and strings it previously produced, so once everything is translated it
  // returns false without fetching and the cycle stops.
  const syncDev = () => {
    if (!import.meta.env.DEV || mine !== generation) return
    fetchDevTranslations(locale, dict).then((added) => {
      if (added) run()
    })
  }

  // The dev server serves the plain shell, so <html lang>/dir aren't set by
  // the build the way they are on a prerendered locale file.
  document.documentElement.lang = locale
  if (isRTL(locale)) document.documentElement.dir = 'rtl'

  run()
  syncDev()

  const onMutate = () => {
    if (pending) clearTimeout(pending)
    pending = setTimeout(() => {
      run()
      syncDev()
    }, 15)
  }
  observer = new MutationObserver(onMutate)
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })
  // React hoists <title>/<meta> into <head> after the body render, so the
  // head needs watching too or the title reverts and never comes back.
  observer.observe(document.head, { childList: true, subtree: true, characterData: true })
}

