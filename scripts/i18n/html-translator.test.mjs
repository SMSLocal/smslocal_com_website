// Self-check for the request-time path: node scripts/i18n/html-translator.test.mjs
//
// Covers what api/i18n-ssr.js asks of the translator that the build never did —
// turning a finished ENGLISH document into a locale one. The build path renders
// each locale URL through React, so it never needed the head rewritten; get
// this wrong at request time and every translated page ships an English
// canonical, which is the one mistake that silently deindexes the whole set.
import assert from 'node:assert/strict'
import { translatePageHtml } from './html-translator.mjs'

// Stub backend: uppercase, so a translated string is obvious and no network is
// touched. Same contract as the real ones — (texts, locale) => Map.
const translate = async (texts) => new Map(texts.map((t) => [t, t.toUpperCase()]))

const isTranslated = (p) => p !== '/signup'

const EN = `<!doctype html>
<html lang="en">
<head>
<link rel="canonical" href="https://smslocal.com/pricing/"/>
<title>Pricing</title>
<meta name="description" content="Pay per message"/>
<meta property="og:url" content="https://smslocal.com/pricing/"/>
<meta property="og:locale" content="en_US"/>
<link rel="alternate" hrefLang="fr" href="https://smslocal.com/fr/pricing/"/>
<script type="application/ld+json">{"@type":"WebPage","headline":"Pricing","url":"https://smslocal.com/pricing/"}</script>
</head>
<body>
<h1>Simple pricing</h1>
<a href="/products/">Products</a>
<a href="/signup/">Sign up</a>
<a href="https://x.example/">External</a>
<script>var keepMe = "Do not translate";</script>
<pre>leave this alone</pre>
</body></html>`

const { html: fr } = await translatePageHtml(EN, 'fr', isTranslated, translate, {
  localizeHead: true,
})

// ── head is pointed at the locale's own URL ─────────────────────────────────
assert.match(fr, /<html lang="fr">/, 'html lang not set')
assert.match(fr, /rel="canonical" href="https:\/\/smslocal\.com\/fr\/pricing\/"/, 'canonical not localized')
assert.match(fr, /property="og:url" content="https:\/\/smslocal\.com\/fr\/pricing\/"/, 'og:url not localized')
assert.match(fr, /property="og:locale" content="fr_FR"/, 'og:locale not localized')

// hreflang already lists every locale absolutely and must survive untouched —
// prefixing it would produce /fr/fr/pricing/.
assert.match(fr, /hrefLang="fr" href="https:\/\/smslocal\.com\/fr\/pricing\/"/, 'hreflang was rewritten')

// ── content ─────────────────────────────────────────────────────────────────
assert.match(fr, />SIMPLE PRICING</, 'h1 not translated')
assert.match(fr, /<title>PRICING<\/title>/, 'title not translated')
assert.match(fr, /name="description" content="PAY PER MESSAGE"/, 'description not translated')
assert.match(fr, /"headline":"PRICING"/, 'JSON-LD headline not translated')
assert.match(fr, /"inLanguage":"fr"/, 'JSON-LD inLanguage missing')

// ── links ───────────────────────────────────────────────────────────────────
assert.match(fr, /href="\/fr\/products\/"/, 'internal link not prefixed')
assert.match(fr, /href="\/signup\/"/, 'excluded route was prefixed — /fr/signup/ does not exist')
assert.match(fr, /href="https:\/\/x\.example\/"/, 'external link was rewritten')

// ── things that must never be touched ───────────────────────────────────────
assert.match(fr, /var keepMe = "Do not translate";/, 'script body was translated')
assert.match(fr, /<pre>leave this alone<\/pre>/, 'pre body was translated')

// ── the client dictionary the page carries ──────────────────────────────────
assert.match(fr, /window\.__LD_TX__=/, '__LD_TX__ not injected')
assert.match(fr, /window\.__LD_LOCALE__="fr"/, '__LD_LOCALE__ not injected')

// ── RTL ─────────────────────────────────────────────────────────────────────
const { html: ar } = await translatePageHtml(EN, 'ar', isTranslated, translate, {
  localizeHead: true,
  rtl: true,
})
assert.match(ar, /<html lang="ar" dir="rtl">/, 'RTL direction not set')

// ── the build path must NOT get the head rewrite ────────────────────────────
// It renders the locale URL through React, which already produced the right
// canonical; running localizeHeadUrls over that would double the prefix.
const { html: build } = await translatePageHtml(EN, 'fr', isTranslated, translate)
assert.match(build, /rel="canonical" href="https:\/\/smslocal\.com\/pricing\/"/, 'build path rewrote the head')
assert.match(build, /<html lang="en">/, 'build path rewrote html lang')

// ── English is a passthrough ────────────────────────────────────────────────
const { html: en, count } = await translatePageHtml(EN, 'en', isTranslated, translate)
assert.equal(en, EN, 'English document was modified')
assert.equal(count, 0, 'English reported translations')

console.log('html-translator: all checks passed')
