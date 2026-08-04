// Client-side companion to the build-time translator (scripts/i18n/). The
// static HTML for a locale page is already fully translated — this exists
// only because main.jsx does a fresh createRoot().render() rather than
// hydrateRoot(), so the moment React's client render commits, it repaints
// the DOM from the (English) JSX and would otherwise silently discard the
// translation. Re-applies the dictionary the build injected
// (window.__LD_TX__) right after that commit, then keeps re-applying via a
// MutationObserver for anything React re-renders afterward.
import { getLocaleFromPathname } from '../lib/locale.js'
import { PILOT_ROUTES } from '../data/pilotRoutes.js'

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

function applyDict(dict, nodes) {
  for (const node of nodes) {
    const raw = node.textContent ?? ''
    const trimmed = raw.trim()
    if (!trimmed) continue
    const translated = dict[trimmed]
    if (!translated || translated === trimmed) continue
    const lead = raw.slice(0, raw.length - raw.trimStart().length)
    const trail = raw.slice(raw.trimEnd().length)
    const next = lead + translated + trail
    if (node.textContent !== next) node.textContent = next
  }
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
    const clean = bare.length > 1 && bare.endsWith('/') ? bare.slice(0, -1) : bare || '/'
    if (!PILOT_ROUTES.includes(clean)) return
    const suffix = href.slice(bare.length)
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
  const needed = []
  for (const node of collectTextNodes(document.body)) {
    const text = (node.textContent ?? '').trim()
    if (!text || dict[text] || translatedValues.has(text)) continue
    needed.push(text)
  }
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

/** Re-applies the injected dictionary and internal-link prefixes to the
 *  current DOM, and keeps doing so for anything React re-renders afterward
 *  (search results, carousel slides). */
export function applyTranslations() {
  const locale = getLocaleFromPathname(window.location.pathname)
  observer?.disconnect()
  observer = null
  if (locale === 'en') return

  // In production this is the dictionary the build injected; in dev it starts
  // empty and is filled in by fetchDevTranslations below.
  const dict = window.__LD_TX__ ?? (window.__LD_TX__ = {})
  const run = () => {
    applyDict(dict, collectTextNodes(document.body))
    rewriteLinks(locale)
  }
  // In dev, also pick up text React renders after the first pass. This can't
  // loop: fetchDevTranslations skips both strings already in the dictionary
  // and strings it previously produced, so once everything is translated it
  // returns false without fetching and the cycle stops.
  const syncDev = () => {
    if (!import.meta.env.DEV) return
    fetchDevTranslations(locale, dict).then((added) => {
      if (added) applyDict(dict, collectTextNodes(document.body))
    })
  }

  run()
  syncDev()

  let debounce = null
  observer = new MutationObserver(() => {
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(() => {
      run()
      syncDev()
    }, 15)
  })
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })
}

const SKIP_HREF_RE = /^(?:#|mailto:|tel:|javascript:)/i
let clickHandlerBound = false

/**
 * Client-side SPA navigation between two locale pages would leave window.__LD_TX__
 * pointing at the PREVIOUS page's dictionary — it's only injected once, at the
 * static file's initial load, and doesn't know the new page's page-specific text.
 * A full reload is the only way the new page's own translated file (and its own
 * dictionary) actually gets fetched, so locale-prefixed link clicks force one
 * instead of a client-side transition — the same trade the reference
 * implementation's GlobalTranslator makes for exactly this reason.
 */
export function forceReloadOnLocaleLinks() {
  if (clickHandlerBound || typeof document === 'undefined') return
  clickHandlerBound = true

  document.addEventListener(
    'click',
    (e) => {
      const locale = getLocaleFromPathname(window.location.pathname)
      if (locale === 'en') return
      const anchor = e.target.closest?.('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      if (!href.startsWith(`/${locale}/`) && href !== `/${locale}`) return
      if (SKIP_HREF_RE.test(href)) return
      e.preventDefault()
      window.location.href = href
    },
    { capture: true },
  )
}
