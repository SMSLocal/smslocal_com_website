/**
 * Step 2 of the blog import: turn the cached WordPress/Elementor source
 * (see fetch-smslocal-blogs.mjs) into this site's own post schema, so the
 * imported copy renders in the local blog design rather than in Elementor
 * markup. Content, meta, links, dates and images are preserved verbatim;
 * only the presentation layer changes.
 *
 *   node scripts/transform-smslocal-blogs.mjs
 *
 * Writes:
 *   src/data/importedPosts.generated.json   the posts
 *   public/blog/<slug>/<file>               every image, downloaded locally
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { COVER_SPECS, coverPath } from './lib/cover-specs.mjs'
import { applyInnerImageCuration } from './lib/inner-image-specs.mjs'
import { CONTENT_OVERRIDES, TEXT_REPLACEMENTS } from './lib/content-overrides.mjs'

/**
 * Applies a post's TEXT_REPLACEMENTS to every string anywhere in its blocks
 * and FAQs. Recursive because body text isn't flat: a paragraph's `rich` is
 * an array mixing bare strings with {b:[…]}/{a:{…}} nodes, and FAQ answers
 * nest arrays again — a replace over only top-level `text` would silently
 * miss most of the copy.
 */
function applyTextReplacements(slug, value) {
  const pairs = TEXT_REPLACEMENTS[slug]
  if (!pairs) return value

  const walk = (node) => {
    if (typeof node === 'string') {
      let out = node
      for (const [from, to] of pairs) out = out.split(from).join(to)
      return out
    }
    if (Array.isArray(node)) return node.map(walk)
    if (node && typeof node === 'object') {
      return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, walk(v)]))
    }
    return node
  }
  return walk(value)
}
import { applyLinkCuration } from './lib/link-specs.mjs'
import { decodeEntities, hasClass, parseHtml, textOf } from './lib/mini-html.mjs'

const ROOT = path.join(import.meta.dirname, '..')
const CACHE = path.join(import.meta.dirname, '.cache', 'raw')
const IMG_OUT = path.join(ROOT, 'public', 'blog')
const JSON_OUT = path.join(ROOT, 'src', 'data', 'importedPosts.generated.json')
const ORIGIN = 'https://www.smslocal.com'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'

/** Images reused across posts are site chrome (arrows, badges), not content. */
// SMS-LOCAL-Banner-Image-2 is a generic product-dashboard screenshot the
// source theme tacks onto the end of nearly every post (29 of 32) — a closer
// CTA graphic, never content tied to that post's actual topic. right-arrows
// is a 64x64 UI chevron icon (alt="icon box") that the site's own CSS then
// stretches to full article width — the filename check alone missed it since
// it's "right-arrows", not "arrow-right"/"arrow-left".
const DECORATIVE_RE =
  /arrow-right|arrow-left|right-arrow|left-arrow|(^|[/-])icon|new-sms-local-logo|placeholder|SMS-LOCAL-Banner-Image/i

/**
 * A filename-pattern denylist misses new variants every time (this is the
 * second one). Anything this small in its ORIGINAL dimensions is UI chrome,
 * not body content — no real content photo in this archive is anywhere near
 * this size — so it backstops the regex regardless of what it's called.
 */
const DECORATIVE_MAX_DIMENSION = 100

/**
 * WordPress core replaces every emoji character with a small `<img
 * class="emoji" src=".../core/emoji/.../1f60a.svg" alt="😊">` for older-
 * browser compatibility. The `alt` carries the original character, so the
 * fix is to inline that text back in — not draw the icon as a full-width
 * body image, which is what made "😊" render as a page-tall glyph.
 */
function isEmojiImage(node) {
  return hasClass(node, 'emoji') || /\/core\/emoji\//.test(node.attrs.src ?? '')
}

const warnings = []
const internalLinks = new Set()
const externalLinks = new Set()

// ─────────────────────────────────────────────────────────── inline rich text

/**
 * Inline runs are kept as a small tree so links, bold and italics survive
 * word-for-word. Shape: string | {b:[…]} | {i:[…]} | {a:href, x:bool, c:[…]}
 */
function inline(nodes, ctx) {
  const out = []
  const push = (v) => {
    if (typeof v === 'string') {
      if (!v) return
      const last = out[out.length - 1]
      if (typeof last === 'string') out[out.length - 1] = last + v
      else out.push(v)
    } else out.push(v)
  }

  for (const n of nodes) {
    if (n.type === 'text') {
      push(n.text.replace(/\s+/g, ' '))
      continue
    }
    switch (n.tag) {
      case 'br':
        push(' ')
        break
      case 'strong':
      case 'b': {
        const c = inline(n.children, ctx)
        if (c.length) push({ b: c })
        break
      }
      case 'em':
      case 'i': {
        const c = inline(n.children, ctx)
        if (c.length) push({ i: c })
        break
      }
      case 'a': {
        const c = inline(n.children, ctx)
        if (!c.length) break
        const href = rewriteHref(n.attrs.href, ctx)
        if (!href) {
          for (const part of c) push(part)
          break
        }
        push({ a: href.href, x: href.external, c })
        break
      }
      case 'img': {
        if (isEmojiImage(n)) {
          push(decodeEntities(n.attrs.alt ?? ''))
          break
        }
        // A real image inside a paragraph — hoisted out by the block walker.
        ctx.hoistedImages.push(n)
        break
      }
      case 'script':
      case 'style':
        break
      default: {
        for (const part of inline(n.children, ctx)) push(part)
      }
    }
  }

  // Trim the outer edges without disturbing interior spacing.
  if (typeof out[0] === 'string') out[0] = out[0].replace(/^\s+/, '')
  const li = out.length - 1
  if (typeof out[li] === 'string') out[li] = out[li].replace(/\s+$/, '')
  return out.filter((v) => v !== '')
}

function richText(rich) {
  if (!rich) return ''
  return rich
    .map((n) => (typeof n === 'string' ? n : richText(n.c ?? n.b ?? n.i)))
    .join('')
}

function rewriteHref(raw, ctx) {
  if (!raw) return null
  let href = decodeEntities(raw).trim()
  if (!href || href === '#') return null
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return { href, external: true }

  if (href.startsWith('#')) return { href, external: false }

  // Same-site links become local paths so the copy stays self-contained.
  const sameSite = /^https?:\/\/(www\.)?smslocal\.com(\/|$)/i
  if (sameSite.test(href)) {
    const url = new URL(href)
    const local = url.pathname + url.search + url.hash
    internalLinks.add(url.pathname)
    return { href: local || '/', external: false }
  }
  if (href.startsWith('/')) {
    internalLinks.add(href.split(/[?#]/)[0])
    return { href, external: false }
  }
  if (/^https?:\/\//i.test(href)) {
    externalLinks.add(new URL(href).hostname)
    return { href, external: true }
  }
  ctx.warn(`unhandled href: ${href}`)
  return null
}

// ───────────────────────────────────────────────────────────── prose → blocks

function proseBlocks(nodes, ctx) {
  const blocks = []

  const flushImages = () => {
    while (ctx.hoistedImages.length) {
      const img = ctx.hoistedImages.shift()
      const block = imageBlock(img, ctx)
      if (block) blocks.push(block)
    }
  }

  for (const n of nodes) {
    if (n.type === 'text') {
      const stray = n.text.trim()
      if (stray) blocks.push({ type: 'p', rich: [stray] })
      continue
    }

    switch (n.tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6': {
        const rich = inline(n.children, ctx)
        flushImages()
        const text = richText(rich).trim()
        if (!text) break
        // h1 only ever appears as a stray in-body duplicate of the title.
        const level = n.tag === 'h1' ? 'h2' : n.tag === 'h5' || n.tag === 'h6' ? 'h4' : n.tag
        blocks.push({ type: level, text, anchor: headingAnchor(n) })
        break
      }
      case 'p': {
        const rich = inline(n.children, ctx)
        flushImages()
        if (richText(rich).trim()) blocks.push({ type: 'p', rich })
        break
      }
      case 'blockquote': {
        const rich = inline(n.children, ctx)
        flushImages()
        if (richText(rich).trim()) blocks.push({ type: 'quote', rich })
        break
      }
      case 'ul':
      case 'ol': {
        const items = []
        for (const li of n.children) {
          if (li.type !== 'el' || li.tag !== 'li') continue
          // Nested lists are flattened into the parent — the source only
          // ever uses one level of nesting for emphasis, not structure.
          const rich = inline(li.children, ctx)
          if (richText(rich).trim()) items.push(rich)
        }
        flushImages()
        if (items.length) blocks.push({ type: n.tag, items })
        break
      }
      case 'table': {
        const block = tableBlock(n, ctx)
        flushImages()
        if (block) blocks.push(block)
        break
      }
      case 'img': {
        const block = imageBlock(n, ctx)
        if (block) blocks.push(block)
        break
      }
      case 'hr':
        blocks.push({ type: 'hr' })
        break
      case 'figure': {
        blocks.push(...proseBlocks(n.children, ctx))
        break
      }
      case 'script':
      case 'style':
      case 'noscript':
      case 'head':
        break
      // Interactive filter controls: the script that drives them is not
      // carried over, so a dead dropdown would be worse than no dropdown.
      case 'select':
      case 'option':
      case 'input':
      case 'textarea':
      case 'button':
        ctx.warn(`skipped interactive <${n.tag}> control`)
        break
      // Some text-editor widgets embed a whole document; walk straight through
      // any structural wrapper rather than inlining it as one paragraph.
      case 'html':
      case 'body':
      case 'div':
      case 'section':
      case 'article':
      case 'main':
      case 'header':
      case 'footer':
      case 'aside':
      case 'nav':
      case 'form':
      case 'fieldset':
      case 'label':
      case 'span':
        blocks.push(...proseBlocks(n.children, ctx))
        break
      default: {
        const rich = inline([n], ctx)
        flushImages()
        if (richText(rich).trim()) blocks.push({ type: 'p', rich })
      }
    }
  }

  flushImages()
  return blocks
}

/** Reuses the source's own `ez-toc` anchor so in-page links keep working. */
function headingAnchor(node) {
  for (const child of node.children) {
    if (child.type === 'el' && child.tag === 'span' && hasClass(child, 'ez-toc-section') && child.attrs.id) {
      return child.attrs.id
    }
  }
  return null
}

function tableBlock(node, ctx) {
  const rows = []
  let head = null

  const readRow = (tr) => {
    const cells = []
    for (const cell of tr.children) {
      if (cell.type !== 'el' || (cell.tag !== 'td' && cell.tag !== 'th')) continue
      cells.push({ rich: inline(cell.children, ctx), th: cell.tag === 'th' })
    }
    return cells
  }

  const collect = (parent, isHead) => {
    for (const child of parent.children) {
      if (child.type !== 'el') continue
      if (child.tag === 'thead') collect(child, true)
      else if (child.tag === 'tbody' || child.tag === 'tfoot') collect(child, false)
      else if (child.tag === 'tr') {
        const cells = readRow(child)
        if (!cells.length) continue
        if ((isHead || cells.every((c) => c.th)) && !head) head = cells.map((c) => c.rich)
        else rows.push(cells.map((c) => c.rich))
      }
    }
  }
  collect(node, false)

  // The source styles most tables with a plain <td> first row as the header;
  // promote it when it reads like one so the design can render a real <thead>.
  if (!head && rows.length > 1) {
    const first = rows[0]
    const looksLikeHeader = first.every((cell) => {
      const text = richText(cell).trim()
      return text && text.split(/\s+/).length <= 6
    })
    if (looksLikeHeader) head = rows.shift()
  }

  if (!head && !rows.length) return null
  return { type: 'table', head, rows }
}

function imageBlock(node, ctx) {
  const src = node.attrs.src
  if (!src) return null
  // Should already have been caught inline (see isEmojiImage in inline()); a
  // stray one reaching block level would otherwise render as a page-tall glyph.
  if (isEmojiImage(node)) return null
  const abs = src.startsWith('http') ? src : new URL(src, ORIGIN).href
  if (DECORATIVE_RE.test(abs)) return null

  const w = Number(node.attrs.width) || null
  const h = Number(node.attrs.height) || null
  if (w && h && w <= DECORATIVE_MAX_DIMENSION && h <= DECORATIVE_MAX_DIMENSION) return null

  const local = ctx.queueImage(abs)
  if (!local) return null

  return {
    type: 'img',
    src: local,
    alt: decodeEntities(node.attrs.alt ?? '').trim(),
    width: w,
    height: h,
  }
}

// ───────────────────────────────────────────────────── elementor widget walk

function widgetContainer(node) {
  const stack = [...node.children]
  while (stack.length) {
    const n = stack.shift()
    if (n.type !== 'el') continue
    if (hasClass(n, 'elementor-widget-container')) return n
    stack.push(...n.children)
  }
  return node
}

/** Collects `data-widget_type` widgets in document order, without descending into them. */
function collectWidgets(nodes, out = []) {
  for (const n of nodes) {
    if (n.type !== 'el') continue
    const type = n.attrs['data-widget_type']
    if (type) {
      out.push({ kind: type.split('.')[0], node: n })
      continue
    }
    collectWidgets(n.children, out)
  }
  return out
}

function accordionItems(node, ctx) {
  const items = []
  const container = widgetContainer(node)
  const titles = []
  const bodies = []
  const scan = (nodes) => {
    for (const n of nodes) {
      if (n.type !== 'el') continue
      if (hasClass(n, 'elementor-tab-title') || hasClass(n, 'elementor-toggle-title')) {
        titles.push(textOf(n).replace(/\s+/g, ' ').trim())
        continue
      }
      if (hasClass(n, 'elementor-tab-content')) {
        bodies.push(n)
        continue
      }
      scan(n.children)
    }
  }
  scan(container.children)

  for (let i = 0; i < titles.length; i++) {
    const q = titles[i]
    const body = bodies[i]
    if (!q || !body) continue
    const blocks = proseBlocks(body.children, ctx)
    const answer = blocks
      .filter((b) => b.type === 'p' || b.type === 'ul' || b.type === 'ol')
      .map((b) => (b.type === 'p' ? b.rich : b.items.flatMap((it, j) => (j ? [' • ', ...it] : ['• ', ...it]))))
    if (!answer.length) continue
    items.push({ q, rich: answer.flatMap((rich, j) => (j ? [' ', ...rich] : rich)) })
  }
  return items
}

/** Elementor button widget → { text, href }. */
function buttonInfo(node, ctx) {
  const container = widgetContainer(node)
  let href = null
  let text = ''
  const scan = (nodes) => {
    for (const n of nodes) {
      if (n.type !== 'el') continue
      if (n.tag === 'a' && !href) href = rewriteHref(n.attrs.href, ctx)
      if (hasClass(n, 'elementor-button-text')) text = textOf(n).replace(/\s+/g, ' ').trim()
      scan(n.children)
    }
  }
  scan(container.children)
  if (!text) text = textOf(container).replace(/\s+/g, ' ').trim()
  if (!text) return null
  return { text, href: href?.href ?? null, external: href?.external ?? false }
}

/** Longest single paragraph that can serve as a promo banner's own copy. */
const PROMO_WORD_LIMIT = 25

/** Elementor heading widgets carry their real level on `.elementor-heading-title`. */
function headingWidgetTag(node) {
  const stack = [...widgetContainer(node).children]
  while (stack.length) {
    const n = stack.shift()
    if (n.type !== 'el') continue
    if (hasClass(n, 'elementor-heading-title')) return n.tag
    stack.push(...n.children)
  }
  return 'span'
}

/**
 * Builds the body blocks + faqs for one post from its Elementor widget list.
 * Heading/short-text widgets that immediately precede a button widget are a
 * promo banner in the source; they collapse into this design's `cta` block.
 */
function buildBody(widgets, ctx) {
  const blocks = []
  const faqs = []
  /** Promo copy seen so far, held back until we know a button follows. */
  let pendingPromo = []

  const flushPromo = () => {
    // Not folded into a `cta` block (that schema's heading/text are plain,
    // matching every other CTA): the promo becomes an ordinary paragraph, so
    // any link it carried — dropped here until this fix — survives.
    for (const { text, rich } of pendingPromo) blocks.push({ type: 'p', rich: rich ?? [text] })
    pendingPromo = []
  }

  for (const { kind, node } of widgets) {
    switch (kind) {
      case 'text-editor': {
        const parsed = proseBlocks(widgetContainer(node).children, ctx)
        // A lone short line is banner copy, not prose — hold it for the button.
        const lone = parsed.length === 1 && parsed[0].type === 'p' ? parsed[0] : null
        const loneText = lone ? richText(lone.rich).trim() : ''
        if (
          lone &&
          loneText.split(/\s+/).length <= PROMO_WORD_LIMIT &&
          !lone.rich.some((r) => typeof r !== 'string' && r.a)
        ) {
          pendingPromo.push({ text: loneText, rich: lone.rich })
          break
        }
        flushPromo()
        blocks.push(...parsed)
        break
      }
      case 'heading': {
        const tag = headingWidgetTag(node)
        // h1 is the page title, already rendered by the post header.
        if (tag === 'h1') break
        if (/^h[2-6]$/.test(tag)) {
          const text = textOf(widgetContainer(node)).replace(/\s+/g, ' ').trim()
          if (!text) break
          flushPromo()
          blocks.push({ type: tag === 'h5' || tag === 'h6' ? 'h4' : tag, text, anchor: null })
          break
        }
        // Non-semantic (span) heading widgets are styled promo/CTA lines in
        // the source, not real headings — but some still carry a real inline
        // link (e.g. "…more guides on popular acronyms…"), which a plain
        // textOf() would silently drop.
        const rich = inline(widgetContainer(node).children, ctx)
        const text = richText(rich).replace(/\s+/g, ' ').trim()
        if (!text) break
        pendingPromo.push({ text, rich })
        break
      }
      case 'image': {
        const container = widgetContainer(node)
        let placed = false
        for (const child of container.children) {
          if (child.type === 'el' && child.tag === 'img') {
            const block = imageBlock(child, ctx)
            if (block) {
              flushPromo()
              blocks.push(block)
              placed = true
            }
          }
        }
        if (!placed) {
          const nested = proseBlocks(container.children, ctx).filter((b) => b.type === 'img')
          if (nested.length) {
            flushPromo()
            blocks.push(...nested)
          }
        }
        break
      }
      case 'button': {
        const btn = buttonInfo(node, ctx)
        // A button with no destination is Elementor page furniture, not content.
        if (!btn || !btn.href) {
          flushPromo()
          break
        }
        const [first, ...rest] = pendingPromo
        pendingPromo = []
        // Rich, not plain text: the source sometimes links a phrase inside
        // this banner copy (e.g. "…more guides on popular acronyms…") and
        // that link must survive into the rendered CTA.
        const restRich = rest.flatMap((p, idx) => (idx === 0 ? p.rich : [' ', ...p.rich]))
        blocks.push({
          type: 'cta',
          heading: first?.rich ?? [btn.text],
          text: restRich,
          buttonText: btn.text,
          buttonHref: btn.href,
          buttonExternal: btn.external,
        })
        break
      }
      case 'accordion':
      case 'toggle': {
        flushPromo()
        faqs.push(...accordionItems(node, ctx))
        break
      }
      case 'html': {
        // A self-contained interactive embed with its own hardcoded styling;
        // it does not belong in this design system.
        ctx.warn('skipped raw html embed widget')
        break
      }
      default:
        flushPromo()
        ctx.warn(`unhandled widget: ${kind}`)
    }
  }
  flushPromo()

  return { blocks: dedupeBlocks(blocks), faqs }
}

/** Drops consecutive identical CTA promos (the source repeats them verbatim). */
function dedupeBlocks(blocks) {
  const out = []
  for (const b of blocks) {
    const prev = out[out.length - 1]
    if (
      b.type === 'cta' &&
      prev?.type === 'cta' &&
      richText(prev.heading) === richText(b.heading) &&
      prev.buttonText === b.buttonText
    )
      continue
    if (b.type === 'hr' && (!prev || prev.type === 'hr')) continue
    out.push(b)
  }
  while (out.length && out[out.length - 1].type === 'hr') out.pop()
  return out
}

// ─────────────────────────────────────────────────────────────────── metadata

function metaFromPage(html) {
  const pick = (re) => {
    const m = html.match(re)
    return m ? decodeEntities(m[1]).trim() : null
  }
  const ld = () => {
    const nodes = []
    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try {
        const data = JSON.parse(m[1])
        nodes.push(...(data['@graph'] ?? [data]))
      } catch {
        /* ignore malformed blocks */
      }
    }
    // Rank Math puts `keywords` on the BlogPosting node, which is not first.
    return (
      nodes.find((n) => ['BlogPosting', 'Article'].includes(n['@type']) && n.keywords) ??
      nodes.find((n) => ['BlogPosting', 'Article', 'WebPage'].includes(n['@type'])) ??
      {}
    )
  }
  const article = ld()
  return {
    metaTitle: pick(/<title>([\s\S]*?)<\/title>/),
    metaDescription: pick(/<meta name="description" content="([^"]*)"/),
    canonical: pick(/<link rel="canonical" href="([^"]*)"/),
    ogImage: pick(/<meta property="og:image" content="([^"]*)"/),
    keywords: article.keywords ?? null,
  }
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function displayDate(iso) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

function isoFromDisplay(text) {
  const m = text.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/)
  if (!m) return null
  const month = MONTHS.indexOf(m[1])
  if (month === -1) return null
  return `${m[3]}-${String(month + 1).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`
}

/**
 * The byline the live theme renders, which is NOT the REST API's `date`:
 * the Elementor post-info widget prints a custom "Published: …" string (in
 * practice the last-modified date), and the author is a per-post icon-box
 * rather than the WordPress post author. Both live in the page template,
 * outside `content.rendered`.
 */
function bylineFromPage(html) {
  const published = html.match(/elementor-post-info__item[^>]*>\s*([^<]*?)\s*<\/span>/)?.[1]
  const dateText = published ? decodeEntities(published).replace(/^Published:\s*/i, '').trim() : null

  const box = html.match(
    /elementor-icon-box-title">\s*<a[^>]*href="([^"]*)"[^>]*>\s*([^<]*?)\s*<\/a>/,
  )
  let author = null
  if (box) {
    const label = decodeEntities(box[2]).replace(/\s+/g, ' ').trim()
    // Rendered as "Senior Writer: Sadik Patel".
    const split = label.match(/^(.*?):\s*(.+)$/)
    const role = split ? split[1].trim() : 'Author'
    const name = split ? split[2].trim() : label
    author = {
      name,
      role,
      initials: name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join(''),
      url: box[1],
    }
  }

  return { dateText, dateISO: dateText ? isoFromDisplay(dateText) : null, author }
}

function readTime(blocks, faqs) {
  let words = 0
  const count = (rich) => {
    words += richText(rich).trim().split(/\s+/).filter(Boolean).length
  }
  for (const b of blocks) {
    if (b.type === 'p' || b.type === 'quote') count(b.rich)
    else if (b.type === 'h2' || b.type === 'h3' || b.type === 'h4') words += b.text.split(/\s+/).length
    else if (b.type === 'ul' || b.type === 'ol') b.items.forEach(count)
    else if (b.type === 'table') {
      if (b.head) b.head.forEach(count)
      b.rows.forEach((row) => row.forEach(count))
    } else if (b.type === 'cta') {
      count(b.heading)
      count(b.text)
    }
  }
  for (const f of faqs) {
    words += f.q.split(/\s+/).length
    count(f.rich)
  }
  return { words, readTime: `${Math.max(1, Math.round(words / 225))} min read` }
}

// ─────────────────────────────────────────────────────────── image downloads

const CATEGORY_NAMES = JSON.parse(
  await fs.readFile(path.join(import.meta.dirname, '.cache', 'categories.json'), 'utf8'),
).reduce((acc, c) => ({ ...acc, [c.id]: c.name }), {})

async function downloadImage(absUrl, dest) {
  try {
    await fs.access(dest)
    return true
  } catch {
    /* not downloaded yet */
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(absUrl, { headers: { 'user-agent': UA } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()))
      return true
    } catch (err) {
      if (attempt === 3) {
        warnings.push(`image failed: ${absUrl} — ${err.message}`)
        return false
      }
      await new Promise((r) => setTimeout(r, 600 * attempt))
    }
  }
}

// ──────────────────────────────────────────────────────────────────── driver

async function main() {
  const files = (await fs.readdir(CACHE)).filter((f) => f.endsWith('.json')).sort()
  const posts = []
  const downloads = []

  for (const file of files) {
    const raw = JSON.parse(await fs.readFile(path.join(CACHE, file), 'utf8'))
    const { slug, api, pageHtml, urlPath, type } = raw

    const ctx = {
      slug,
      hoistedImages: [],
      warn: (msg) => warnings.push(`[${slug}] ${msg}`),
      queueImage(absUrl) {
        let name
        try {
          name = decodeURIComponent(new URL(absUrl).pathname.split('/').pop() || '')
        } catch {
          return null
        }
        if (!name) return null
        name = name.replace(/[^a-zA-Z0-9._-]+/g, '-')
        // Some source filenames are auto-generated alt-text and run past
        // Windows' path-length limit — keep the extension, cap the stem.
        const ext = path.extname(name)
        const stem = name.slice(0, name.length - ext.length)
        if (stem.length > 60) name = `${stem.slice(0, 60)}${ext}`
        const local = `/blog/${slug}/${name}`
        downloads.push({ absUrl, dest: path.join(IMG_OUT, slug, name) })
        return local
      },
    }

    const tree = parseHtml(api.content.rendered)
    const widgets = collectWidgets(tree)
    // A handful of posts were authored in the plain WordPress editor, not
    // Elementor, so they carry no `data-widget_type` markup at all — walking
    // them as widgets finds nothing and silently yields an empty post. Fall
    // back to reading the rendered HTML as plain prose (same walker used
    // for prose *inside* Elementor text-editor widgets) instead.
    let blocks, faqs
    if (widgets.length === 0) {
      blocks = proseBlocks(tree, ctx)
      faqs = []
    } else {
      ;({ blocks, faqs } = buildBody(widgets, ctx))
    }
    // Full-content override: some source pages are too thin to reshape (a
    // couple of boilerplate paragraphs, no FAQ) — swap in original,
    // researched copy instead. No-op for any post without an entry.
    const override = CONTENT_OVERRIDES[slug]
    if (override) {
      // Each field is optional: an entry may replace only the title or meta
      // and leave the scraped body alone. Assigning override.body
      // unconditionally blanked the body for those entries.
      if (override.body) blocks = override.body
      faqs = override.faqs ?? faqs
    }
    // Per-post override: trim/remap/add internal & external content links so
    // every post carries exactly 2 internal and 1 external — the scraped
    // originals mostly link to blog posts and product pages this site
    // hasn't built locally. No-op for any post without an entry.
    ;({ blocks, faqs } = applyLinkCuration(slug, blocks, faqs))
    // Per-post override: drop/replace specific in-body images so every post
    // lands on exactly 7 (client requirement), same pattern as COVER_SPECS
    // overriding the hero banner. No-op for any post without an entry.
    blocks = applyInnerImageCuration(slug, blocks, { warn: ctx.warn })
    // Last, so it also covers text introduced by the overrides above.
    blocks = applyTextReplacements(slug, blocks)
    faqs = applyTextReplacements(slug, faqs)
    const meta = metaFromPage(pageHtml)
    if (override) {
      if (override.metaTitle) meta.metaTitle = override.metaTitle
      if (override.metaDescription) meta.metaDescription = override.metaDescription
      if (override.keywords) meta.keywords = override.keywords
    }
    const byline = bylineFromPage(pageHtml)
    const { words, readTime: rt } = readTime(blocks, faqs)
    if (!byline.dateText) ctx.warn('no rendered byline date; falling back to the API publish date')
    if (!byline.author) ctx.warn('no rendered author box')

    // The source banners carry the brand wordmark and a year, so the post
    // header uses our own generated banner (scripts/gen-blog-covers.mjs).
    // The original is kept for reference but not rendered.
    const sourceCover = meta.ogImage ? ctx.queueImage(meta.ogImage) : null
    const cover = COVER_SPECS[slug] ? coverPath(slug) : sourceCover
    const excerpt = decodeEntities(api.excerpt?.rendered ?? '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    const categoryNames = (api.categories ?? [])
      .map((id) => CATEGORY_NAMES[id])
      .filter((n) => n && n !== 'All' && n !== 'Uncategorized')

    posts.push({
      slug,
      routePath: urlPath.replace(/\/$/, ''),
      sourceUrl: raw.url,
      sourceType: type,
      // `title` is overridable for the same reason metaTitle is: a scraped
      // headline can carry a year that has since rolled over, and the source
      // page won't be updated. Falls through to the API title otherwise.
      title:
        override?.title ?? decodeEntities(api.title.rendered).replace(/\s+/g, ' ').trim(),
      metaTitle: meta.metaTitle,
      metaDescription: meta.metaDescription,
      keywords: meta.keywords,
      category: categoryNames[0] ?? 'SMS Insights',
      categories: categoryNames,
      tags: meta.keywords ? [meta.keywords] : [],
      // What the live page shows in its byline…
      date: byline.dateText ?? displayDate(api.date),
      dateISO: byline.dateISO ?? api.date.slice(0, 10),
      author: byline.author,
      // …versus the machine-readable dates its own meta tags carry.
      publishedISO: api.date,
      modifiedISO: api.modified,
      readTime: rt,
      words,
      excerpt: applyTextReplacements(
        slug,
        excerpt.length > 260 ? `${excerpt.slice(0, 257).trimEnd()}…` : excerpt,
      ),
      cover,
      sourceCover,
      coverAlt: COVER_SPECS[slug]?.title ?? decodeEntities(api.title.rendered).replace(/\s+/g, ' ').trim(),
      body: blocks,
      faqs,
    })

    console.log(
      `✓ ${slug.padEnd(36)} ${String(blocks.length).padStart(3)} blocks  ${String(faqs.length).padStart(2)} faqs  ${String(words).padStart(5)} words`,
    )
  }

  // Download every referenced image (deduped).
  const seen = new Set()
  const unique = downloads.filter((d) => !seen.has(d.dest) && seen.add(d.dest))
  console.log(`\nDownloading ${unique.length} images…`)
  let ok = 0
  const QUEUE = 8
  await Promise.all(
    Array.from({ length: QUEUE }, async () => {
      while (unique.length) {
        const job = unique.shift()
        if (await downloadImage(job.absUrl, job.dest)) ok++
      }
    }),
  )
  console.log(`Downloaded/verified ${ok} images into public/blog/`)

  posts.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
  await fs.mkdir(path.dirname(JSON_OUT), { recursive: true })
  await fs.writeFile(JSON_OUT, `${JSON.stringify(posts, null, 1)}\n`)
  console.log(`\nWrote ${posts.length} posts → src/data/importedPosts.generated.json`)

  await fs.writeFile(
    path.join(import.meta.dirname, '.cache', 'report.json'),
    JSON.stringify({ warnings, internalLinks: [...internalLinks].sort(), externalLinks: [...externalLinks].sort() }, null, 1),
  )
  console.log(`\n${warnings.length} warnings, ${internalLinks.size} internal link targets, ${externalLinks.size} external hosts (see scripts/.cache/report.json)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
