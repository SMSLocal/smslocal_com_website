/**
 * Renders the bespoke in-body images referenced by INNER_IMAGE_SPECS
 * (scripts/lib/inner-image-specs.mjs) — the replacements for the original
 * WordPress stock/AI photos in posts being trimmed to exactly 7 images.
 *
 *   node scripts/gen-inner-images.mjs
 *
 * Writes public/blog/<slug>/<id>.svg at 1024x576. The site's own CSS clips
 * these to rounded corners with a 1px border (BlogPost.module.css `.figure
 * img`), so the artwork itself can run edge to edge like the hero banners.
 *
 * Rules:
 *  - full compositions, not a bare grid of empty containers — every image
 *    layers a background motif, a primary device (comparison / mockup /
 *    icon list), and a supporting annotation column or footer
 *  - each image gets its OWN soft background tint, not a single colour
 *    reused across every image in a post
 *  - content is grounded in what the article itself says (its own table
 *    rows, its own named companies, its own safety advice) rather than
 *    generic placeholder categories
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const OUT = path.join(import.meta.dirname, '..', 'public', 'blog')
const W = 1024
const H = 576

const SANS = "Geist, 'Segoe UI', system-ui, -apple-system, sans-serif"
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif"
const SERIF_NUM = "'Instrument Serif', 'Times New Roman', Times, serif"
const LINING = `font-variant-numeric="lining-nums" font-feature-settings="'lnum' 1, 'onum' 0"`

const INK = '#101a33'
const SLATE = '#5b6478'
const HAIR = '#d9dfe9'
const WHITE = '#ffffff'
const CAUTION = '#b45252'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const txt = (x, y, t, o = {}) => {
  const { size = 20, fill = INK, weight = 400, family = SANS, anchor = 'start', spacing = 0, opacity = 1 } = o
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}"
    fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}" opacity="${opacity}" ${LINING}>${esc(t)}</text>`
}
const num = (x, y, t, o = {}) => txt(x, y, t, { family: SERIF_NUM, ...o })
const caps = (x, y, t, o = {}) =>
  txt(x, y, t.toUpperCase(), { size: 20, weight: 700, spacing: 2, fill: SLATE, ...o })
const rule = (x, y, w, fill = HAIR, h = 1.4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`

function charWidth(ch, size, bold) {
  if ("iljI|!.,:;'’`".includes(ch)) return size * 0.31
  if (ch === ' ') return size * 0.29
  if ('ft()[]{}r/\\-'.includes(ch)) return size * 0.4
  if ('mwMW@'.includes(ch)) return size * 0.95
  if (ch >= 'A' && ch <= 'Z') return size * 0.75
  if (ch >= '0' && ch <= '9') return size * 0.63
  return size * (bold ? 0.6 : 0.56)
}
const textWidth = (t, size, bold, spacing = 0) =>
  [...t].reduce((s, ch) => s + charWidth(ch, size, bold), 0) + Math.max(0, [...t].length - 1) * spacing

/**
 * Standalone `<img src="*.svg">` rendering — which is how every one of these
 * files is actually used on the live site — has NO access to the page's
 * loaded webfonts (Instrument Serif, Geist); it falls back to whatever
 * generic serif/sans-serif the OS ships. That fallback runs measurably wider
 * than the webfont, so a line that fits when verified by injecting the SVG
 * inline into a page that HAS the webfont loaded can still overflow in the
 * real, isolated image context. `wrap()` exists so no single line of body
 * copy is ever left unbounded — always measured, always broken to fit.
 */
function greedyWrap(text, size, bold, maxWidth) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    const candidate = line ? `${line} ${word}` : word
    if (textWidth(candidate, size, bold) > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}
function wrap(text, size, bold, maxWidth, maxLines = 3) {
  const lines = greedyWrap(text, size, bold, maxWidth)
  if (lines.length <= maxLines) return lines
  // Too long even wrapped: keep the first (maxLines - 1) and ellipsise the rest.
  const head = lines.slice(0, maxLines - 1)
  const rest = lines.slice(maxLines - 1).join(' ')
  let last = rest
  while (textWidth(`${last}…`, size, bold) > maxWidth && last.length > 1) last = last.slice(0, -1).trimEnd()
  return [...head, `${last}…`]
}

/** A chip sized to its own text — never a fixed width a string might overrun. */
function pill(x, y, text, opts = {}) {
  const { size = 20, weight = 700, fill = WHITE, color = INK, padX = 20, height = 40, upper = false, spacing = 0, stroke = null } = opts
  const body = upper ? text.toUpperCase() : text
  const w = textWidth(body, size, weight >= 600, spacing) + padX * 2
  return {
    w,
    svg: `<rect x="${x}" y="${y}" width="${w}" height="${height}" rx="${height / 2}" fill="${fill}"
        ${stroke ? `stroke="${stroke}" stroke-width="2"` : ''}/>
      ${txt(x + padX, y + height / 2 + size * 0.36, body, { size, weight, fill: color, spacing })}`,
  }
}

const frame = (bg, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  ${body}
</svg>
`

const card = (x, y, w, h, rx = 26, fill = WHITE) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`

/** One row of a leader-lined fact list: a ringed icon, a bold line, nothing else. */
function factRow(x, y, iconFn, label, c) {
  return `
    <circle cx="${x + 22}" cy="${y}" r="22" fill="${c}" opacity="0.14"/>
    ${iconFn(x + 22, y, 13, c)}
    ${txt(x + 58, y + 8, label, { size: 24, family: SERIF, fill: INK })}`
}

/**
 * factRow's counterpart for a narrow column: wraps the label to `maxWidth`
 * (SANS, not SERIF — narrower and the safer fallback under an isolated
 * <img> render) instead of letting one long line run past its column.
 * Returns the pixel height it used, so the caller can space the next row.
 */
function factRowWrap(x, y, iconFn, label, c, maxWidth) {
  const size = 21
  const lines = wrap(label, size, false, maxWidth, 2)
  const lead = size * 1.28
  const iconY = y + (lines.length > 1 ? lead * 0.5 : 8)
  const svg = `
    <circle cx="${x + 20}" cy="${iconY}" r="20" fill="${c}" opacity="0.14"/>
    ${iconFn(x + 20, iconY, 12, c)}
    ${lines.map((l, i) => txt(x + 54, y + i * lead + 8, l, { size, fill: INK })).join('')}`
  return { svg, h: Math.max(44, lines.length * lead + 6) }
}

/** A ringed icon + a bold title + a short one-line label — the grid unit for common-uses. */
function useCell(x, y, w, h, iconFn, title, c, bg) {
  return `${card(x, y, w, h, 20, bg)}
    <circle cx="${x + 46}" cy="${y + h / 2}" r="24" fill="${WHITE}"/>
    ${iconFn(x + 46, y + h / 2, 14, c)}
    ${txt(x + 82, y + h / 2 + 8, title, { size: 22, weight: 600, fill: INK })}`
}

/**
 * A flat card with a coloured spine, an icon ring, a title and a one-line
 * description — the unit for a 2x2 benefits grid. Not the stacked-shadow
 * squares of the original graphic: a spine + real supporting copy per item
 * reads as a genuine explanation rather than four identical repeated tiles.
 */
function benefitCard(x, y, w, h, iconFn, title, desc, c) {
  const spine = 8
  const textX = x + spine + 24
  const textW = w - spine - 40 // an unwrapped title at this card width is
  // exactly what overflowed into the neighbouring card in the first pass —
  // every line here, title included, is measured and wrapped to this budget.

  const titleSize = 22
  const titleLead = titleSize * 1.2
  const titleLines = wrap(title, titleSize, true, textW, 2)
  let ty = y + 96
  const titleSvg = titleLines
    .map((l, i) => txt(textX, ty + i * titleLead, l, { size: titleSize, weight: 700, fill: INK }))
    .join('')

  const descSize = 20
  const descY = ty + (titleLines.length - 1) * titleLead + 30
  const descLines = wrap(desc, descSize, false, textW, 2)
  const descSvg = descLines
    .map((l, i) => txt(textX, descY + i * 25, l, { size: descSize, fill: SLATE }))
    .join('')

  return `${card(x, y, w, h, 20)}
    <rect x="${x}" y="${y}" width="${spine}" height="${h}" rx="4" fill="${c}"/>
    <circle cx="${x + spine + 34}" cy="${y + 44}" r="24" fill="${c}" opacity="0.12"/>
    ${iconFn(x + spine + 34, y + 44, 14, c)}
    ${titleSvg}
    ${descSvg}`
}

/**
 * A "Settings > Menu > Toggle" navigation trail — chips connected by chevron
 * arrows, the last one filled solid. Draws the actual tap path the article's
 * own numbered steps describe, without recreating an OS's real UI chrome.
 * Wraps to a second row if the full path doesn't fit `maxWidth`.
 */
function breadcrumbPath(x, y, steps, accent, maxWidth = 900) {
  const size = 21
  const gap = 34
  let cx = x
  let cy = y
  let out = ''
  steps.forEach((step, i) => {
    const last = i === steps.length - 1
    const p = pill(0, 0, step, { size, weight: 600, upper: false, padX: 18, height: 40 })
    if (cx + p.w > x + maxWidth && cx > x) {
      cx = x
      cy += 60
    }
    const placed = pill(cx, cy, step, {
      size, weight: 600, upper: false, padX: 18, height: 40,
      fill: last ? accent : WHITE, color: last ? WHITE : INK,
    })
    out += placed.svg
    cx += placed.w
    if (!last) {
      out += `<path d="M${cx + 8},${cy + 20} L${cx + gap - 8},${cy + 20}" stroke="${HAIR}" stroke-width="2.4" fill="none"/>
        <polyline points="${cx + gap - 16},${cy + 12} ${cx + gap - 6},${cy + 20} ${cx + gap - 16},${cy + 28}"
          stroke="${HAIR}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      cx += gap
    }
  })
  return { svg: out, rows: Math.round((cy - y) / 60) + 1 }
}

/** A labelled on/off toggle — the endpoint of most of these breadcrumb trails. */
function toggleGraphic(cx, cy, on, accent) {
  const w = 64
  const h = 34
  return `
    <rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${h / 2}"
          fill="${on ? accent : HAIR}"/>
    <circle cx="${cx + (on ? w / 2 - h / 2 - 3 : -w / 2 + h / 2 + 3)}" cy="${cy}" r="${h / 2 - 4}" fill="${WHITE}"/>`
}

// ───────────────────────────────────────────────────────────────── icons

const ICONS = {
  shieldCheck: (cx, cy, s, c) => `
    <path d="M${cx},${cy - s} L${cx + s * 0.85},${cy - s * 0.6} L${cx + s * 0.85},${cy + s * 0.25}
             C${cx + s * 0.85},${cy + s * 0.85} ${cx + s * 0.4},${cy + s * 1.15} ${cx},${cy + s * 1.3}
             C${cx - s * 0.4},${cy + s * 1.15} ${cx - s * 0.85},${cy + s * 0.85} ${cx - s * 0.85},${cy + s * 0.25}
             L${cx - s * 0.85},${cy - s * 0.6} Z" fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linejoin="round"/>
    <path d="M${cx - s * 0.36},${cy + s * 0.1} L${cx - s * 0.08},${cy + s * 0.42} L${cx + s * 0.44},${cy - s * 0.22}"
          fill="none" stroke="${c}" stroke-width="${s * 0.16}" stroke-linecap="round" stroke-linejoin="round"/>`,
  lock: (cx, cy, s, c) => `
    <rect x="${cx - s * 0.8}" y="${cy - s * 0.05}" width="${s * 1.6}" height="${s * 1.15}" rx="${s * 0.22}"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}"/>
    <path d="M${cx - s * 0.5},${cy - s * 0.05} L${cx - s * 0.5},${cy - s * 0.5}
             A${s * 0.5},${s * 0.5} 0 0 1 ${cx + s * 0.5},${cy - s * 0.5} L${cx + s * 0.5},${cy - s * 0.05}"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}"/>
    <circle cx="${cx}" cy="${cy + s * 0.42}" r="${s * 0.12}" fill="${c}"/>`,
  bell: (cx, cy, s, c) => `
    <path d="M${cx - s * 0.7},${cy + s * 0.35} C${cx - s * 0.7},${cy - s * 0.35} ${cx - s * 0.45},${cy - s}
             ${cx},${cy - s} C${cx + s * 0.45},${cy - s} ${cx + s * 0.7},${cy - s * 0.35} ${cx + s * 0.7},${cy + s * 0.35}
             L${cx + s * 0.9},${cy + s * 0.65} L${cx - s * 0.9},${cy + s * 0.65} Z"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linejoin="round"/>
    <path d="M${cx - s * 0.28},${cy + s * 0.85} a${s * 0.28},${s * 0.28} 0 0 0 ${s * 0.56},0"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linecap="round"/>`,
  tag: (cx, cy, s, c) => `
    <path d="M${cx - s * 0.9},${cy - s * 0.2} L${cx + s * 0.3},${cy - s} L${cx + s},${cy - s * 0.3} L${cx + s * 0.2},${cy + s * 0.9} Z"
          fill="none" stroke="${c}" stroke-width="${s * 0.13}" stroke-linejoin="round"/>
    <circle cx="${cx + s * 0.05}" cy="${cy - s * 0.55}" r="${s * 0.14}" fill="${c}"/>`,
  messageBubble: (cx, cy, s, c) => `
    <path d="M${cx - s},${cy - s * 0.7} h${s * 2} a${s * 0.2},${s * 0.2} 0 0 1 ${s * 0.2},${s * 0.2}
             v${s * 0.9} a${s * 0.2},${s * 0.2} 0 0 1 -${s * 0.2},${s * 0.2} h-${s * 1.3}
             l-${s * 0.4},${s * 0.5} v-${s * 0.5} h-${s * 0.5} a${s * 0.2},${s * 0.2} 0 0 1 -${s * 0.2},-${s * 0.2}
             v-${s * 0.9} a${s * 0.2},${s * 0.2} 0 0 1 ${s * 0.2},-${s * 0.2} Z"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linejoin="round"/>`,
  pollBars: (cx, cy, s, c) => `
    <rect x="${cx - s * 0.75}" y="${cy}" width="${s * 0.4}" height="${s * 0.7}" rx="${s * 0.08}" fill="${c}"/>
    <rect x="${cx - s * 0.2}" y="${cy - s * 0.4}" width="${s * 0.4}" height="${s * 1.1}" rx="${s * 0.08}" fill="${c}"/>
    <rect x="${cx + s * 0.35}" y="${cy - s * 0.75}" width="${s * 0.4}" height="${s * 1.45}" rx="${s * 0.08}" fill="${c}"/>`,
  calendar: (cx, cy, s, c) => `
    <rect x="${cx - s}" y="${cy - s * 0.75}" width="${s * 2}" height="${s * 1.65}" rx="${s * 0.22}"
          fill="none" stroke="${c}" stroke-width="${s * 0.13}"/>
    <line x1="${cx - s}" y1="${cy - s * 0.2}" x2="${cx + s}" y2="${cy - s * 0.2}" stroke="${c}" stroke-width="${s * 0.13}"/>
    <line x1="${cx - s * 0.5}" y1="${cy - s * 1.05}" x2="${cx - s * 0.5}" y2="${cy - s * 0.55}" stroke="${c}" stroke-width="${s * 0.13}" stroke-linecap="round"/>
    <line x1="${cx + s * 0.5}" y1="${cy - s * 1.05}" x2="${cx + s * 0.5}" y2="${cy - s * 0.55}" stroke="${c}" stroke-width="${s * 0.13}" stroke-linecap="round"/>`,
  gear: (cx, cy, s, c) => {
    const teeth = Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4
      return `<rect x="${cx - s * 0.1}" y="${cy - s * 1.15}" width="${s * 0.2}" height="${s * 0.32}" rx="${s * 0.05}"
        fill="${c}" transform="rotate(${(a * 180) / Math.PI}, ${cx}, ${cy})"/>`
    }).join('')
    return `${teeth}<circle cx="${cx}" cy="${cy}" r="${s * 0.72}" fill="none" stroke="${c}" stroke-width="${s * 0.14}"/>
      <circle cx="${cx}" cy="${cy}" r="${s * 0.22}" fill="${c}"/>`
  },
  alertTriangle: (cx, cy, s, c) => `
    <path d="M${cx},${cy - s} L${cx + s * 0.95},${cy + s * 0.75} L${cx - s * 0.95},${cy + s * 0.75} Z"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linejoin="round"/>
    <line x1="${cx}" y1="${cy - s * 0.32}" x2="${cx}" y2="${cy + s * 0.18}" stroke="${c}" stroke-width="${s * 0.15}" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy + s * 0.48}" r="${s * 0.09}" fill="${c}"/>`,
  star: (cx, cy, s, c) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 === 0 ? s : s * 0.42
      const a = (Math.PI / 5) * i - Math.PI / 2
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`
    }).join(' ')
    return `<polygon points="${pts}" fill="none" stroke="${c}" stroke-width="${s * 0.13}" stroke-linejoin="round"/>`
  },
  checkCircle: (cx, cy, s, c) => `
    <circle cx="${cx}" cy="${cy}" r="${s}" fill="${c}"/>
    <path d="M${cx - s * 0.42},${cy + s * 0.02} L${cx - s * 0.1},${cy + s * 0.36} L${cx + s * 0.44},${cy - s * 0.32}"
          fill="none" stroke="${WHITE}" stroke-width="${s * 0.2}" stroke-linecap="round" stroke-linejoin="round"/>`,
  xCircle: (cx, cy, s, c) => `
    <circle cx="${cx}" cy="${cy}" r="${s}" fill="${c}"/>
    <line x1="${cx - s * 0.36}" y1="${cy - s * 0.36}" x2="${cx + s * 0.36}" y2="${cy + s * 0.36}" stroke="${WHITE}" stroke-width="${s * 0.2}" stroke-linecap="round"/>
    <line x1="${cx + s * 0.36}" y1="${cy - s * 0.36}" x2="${cx - s * 0.36}" y2="${cy + s * 0.36}" stroke="${WHITE}" stroke-width="${s * 0.2}" stroke-linecap="round"/>`,
  broadcast: (cx, cy, s, c) => `
    <circle cx="${cx}" cy="${cy}" r="${s * 0.22}" fill="${c}"/>
    <path d="M${cx - s * 0.5},${cy - s * 0.5} A${s * 0.7},${s * 0.7} 0 0 0 ${cx - s * 0.5},${cy + s * 0.5}"
          fill="none" stroke="${c}" stroke-width="${s * 0.13}" stroke-linecap="round"/>
    <path d="M${cx + s * 0.5},${cy - s * 0.5} A${s * 0.7},${s * 0.7} 0 0 1 ${cx + s * 0.5},${cy + s * 0.5}"
          fill="none" stroke="${c}" stroke-width="${s * 0.13}" stroke-linecap="round"/>
    <path d="M${cx - s * 0.95},${cy - s * 0.95} A${s * 1.35},${s * 1.35} 0 0 0 ${cx - s * 0.95},${cy + s * 0.95}"
          fill="none" stroke="${c}" stroke-width="${s * 0.1}" stroke-linecap="round" opacity="0.55"/>
    <path d="M${cx + s * 0.95},${cy - s * 0.95} A${s * 1.35},${s * 1.35} 0 0 1 ${cx + s * 0.95},${cy + s * 0.95}"
          fill="none" stroke="${c}" stroke-width="${s * 0.1}" stroke-linecap="round" opacity="0.55"/>`,
  heart: (cx, cy, s, c) => `
    <path d="M${cx},${cy + s * 0.85}
             C${cx - s * 1.1},${cy - s * 0.05} ${cx - s * 0.55},${cy - s} ${cx},${cy - s * 0.35}
             C${cx + s * 0.55},${cy - s} ${cx + s * 1.1},${cy - s * 0.05} ${cx},${cy + s * 0.85} Z"
          fill="none" stroke="${c}" stroke-width="${s * 0.15}" stroke-linejoin="round"/>`,
  wifi: (cx, cy, s, c) => `
    <circle cx="${cx}" cy="${cy + s * 0.72}" r="${s * 0.13}" fill="${c}"/>
    <path d="M${cx - s * 0.42},${cy + s * 0.32} A${s * 0.6},${s * 0.6} 0 0 1 ${cx + s * 0.42},${cy + s * 0.32}"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linecap="round"/>
    <path d="M${cx - s * 0.78},${cy - s * 0.08} A${s * 1.1},${s * 1.1} 0 0 1 ${cx + s * 0.78},${cy - s * 0.08}"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linecap="round" opacity="0.7"/>
    <path d="M${cx - s * 1.1},${cy - s * 0.5} A${s * 1.55},${s * 1.55} 0 0 1 ${cx + s * 1.1},${cy - s * 0.5}"
          fill="none" stroke="${c}" stroke-width="${s * 0.14}" stroke-linecap="round" opacity="0.4"/>`,
  trash: (cx, cy, s, c) => `
    <path d="M${cx - s * 0.7},${cy - s * 0.55} L${cx + s * 0.7},${cy - s * 0.55}
             L${cx + s * 0.55},${cy + s * 0.9} L${cx - s * 0.55},${cy + s * 0.9} Z"
          fill="none" stroke="${c}" stroke-width="${s * 0.13}" stroke-linejoin="round"/>
    <line x1="${cx - s * 0.95}" y1="${cy - s * 0.55}" x2="${cx + s * 0.95}" y2="${cy - s * 0.55}"
          stroke="${c}" stroke-width="${s * 0.13}" stroke-linecap="round"/>
    <path d="M${cx - s * 0.3},${cy - s * 0.55} L${cx - s * 0.22},${cy - s * 0.85} L${cx + s * 0.22},${cy - s * 0.85} L${cx + s * 0.3},${cy - s * 0.55}"
          fill="none" stroke="${c}" stroke-width="${s * 0.13}" stroke-linejoin="round"/>
    <line x1="${cx}" y1="${cy - s * 0.28}" x2="${cx}" y2="${cy + s * 0.62}" stroke="${c}" stroke-width="${s * 0.1}" stroke-linecap="round"/>`,
  signal: (cx, cy, s, c) => `
    <rect x="${cx - s * 0.9}" y="${cy + s * 0.35}" width="${s * 0.4}" height="${s * 0.45}" rx="${s * 0.08}" fill="${c}" opacity="0.4"/>
    <rect x="${cx - s * 0.3}" y="${cy}" width="${s * 0.4}" height="${s * 0.8}" rx="${s * 0.08}" fill="${c}" opacity="0.7"/>
    <rect x="${cx + s * 0.3}" y="${cy - s * 0.5}" width="${s * 0.4}" height="${s * 1.3}" rx="${s * 0.08}" fill="${c}"/>`,
  search: (cx, cy, s, c) => `
    <circle cx="${cx - s * 0.12}" cy="${cy - s * 0.12}" r="${s * 0.6}" fill="none" stroke="${c}" stroke-width="${s * 0.16}"/>
    <line x1="${cx + s * 0.32}" y1="${cy + s * 0.32}" x2="${cx + s * 0.78}" y2="${cy + s * 0.78}"
          stroke="${c}" stroke-width="${s * 0.18}" stroke-linecap="round"/>`,
}

// ───────────────────────────────────────────────────────────────── diagrams

const INNER_IMAGES = {}

/**
 * Shared template for the message-blocking-is-active fix-steps: a headline +
 * description on the left, one breadcrumb navigation trail per platform
 * beneath it (each grounded in the article's own numbered Settings > … > …
 * instructions), and one big supporting icon on the right summarising what
 * the step actually does.
 */
function stepDiagram({ bg, ink, accent, eyebrow, headline, desc, platforms, heroIcon, heroLabel, heroNote }) {
  const LEFT_W = 560
  let y = 58
  const eyebrowSvg = caps(64, y, eyebrow, { fill: accent })
  y += 62

  const headlineLines = Array.isArray(headline) ? headline : [headline]
  const headlineSvg = headlineLines
    .map((l, i) => txt(60, y + i * 50, l, { size: 42, family: SERIF, fill: i === headlineLines.length - 1 ? accent : ink }))
    .join('')
  y += (headlineLines.length - 1) * 50 + 30

  const ruleSvg = rule(64, y, LEFT_W)
  y += 36

  const descLines = wrap(desc, 22, false, LEFT_W)
  const descSvg = descLines.map((l, i) => txt(64, y + i * 30, l, { size: 22, family: SERIF, fill: SLATE })).join('')
  y += descLines.length * 30 + 32

  let platformSvg = ''
  for (const p of platforms) {
    platformSvg += caps(64, y, p.label, { size: 20, fill: accent })
    y += 26
    const bc = breadcrumbPath(64, y, p.steps, accent, LEFT_W)
    platformSvg += bc.svg
    y += bc.rows * 60 + 24
  }

  const heroX = 790
  const heroY = 300
  const heroSvg = `
    <circle cx="${heroX}" cy="${heroY}" r="118" fill="${WHITE}"/>
    ${ICONS[heroIcon](heroX, heroY - 10, 62, accent)}
    ${caps(heroX, heroY + 130, heroLabel, { anchor: 'middle', size: 20, fill: accent })}
    ${heroNote ? txt(heroX, heroY + 166, heroNote, { size: 20, family: SERIF, fill: SLATE, anchor: 'middle' }) : ''}`

  return frame(bg, `${eyebrowSvg}${headlineSvg}${ruleSvg}${descSvg}${platformSvg}${heroSvg}`)
}

/**
 * 216-area-code · "local-benefits" — the article's own four benefits of a
 * local 216 number, as a real 2x2 grid with a title AND a description per
 * card, not four identical stacked squares repeating the same shape.
 */
INNER_IMAGES['216-area-code:local-benefits'] = () => {
  const bg = '#eaf2fb'
  const ink = '#154989'
  const accent = '#2563a8'
  const soft = '#d7e6f7'

  const items = [
    { icon: 'shieldCheck', title: 'Increased Credibility', desc: 'Feels like a real, local Cleveland business.' },
    { icon: 'broadcast', title: 'Improved Visibility', desc: 'Easier to find and remember in local searches.' },
    { icon: 'heart', title: 'Enhanced Customer Trust', desc: "Signals you're reachable and accountable." },
    { icon: 'messageBubble', title: 'Better Engagement', desc: 'Encourages more calls, texts, and replies.' },
  ]

  const gridX = 520
  const gridTop = 64
  const gridW = 440
  const gridH = 448
  const gap = 18
  const cw = (gridW - gap) / 2
  const ch = (gridH - gap) / 2

  const cells = items
    .map((it, i) => {
      const col = i % 2
      const row = Math.floor(i / 2)
      const x = gridX + col * (cw + gap)
      const y = gridTop + row * (ch + gap)
      return benefitCard(x, y, cw, ch, ICONS[it.icon], it.title, it.desc, accent)
    })
    .join('')

  return frame(
    bg,
    `<circle cx="150" cy="500" r="220" fill="${soft}" opacity="0.6"/>
    ${caps(64, 58, 'Benefits', { fill: accent })}
    ${txt(60, 138, 'Why Go Local', { size: 48, family: SERIF, fill: ink })}
    ${txt(60, 192, 'with a 216 Number', { size: 48, family: SERIF, fill: accent })}
    ${rule(64, 222, 380)}
    ${wrap('A local 216 number boosts credibility, visibility, trust, and sales.', 23, false, 400)
      .map((l, i) => txt(64, 266 + i * 32, l, { size: 23, family: SERIF, fill: SLATE }))
      .join('')}
    ${(() => {
      const tag = pill(64, 400, 'Cleveland, Ohio', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 20, height: 42 })
      return tag.svg
    })()}
    ${cells}`,
  )
}

/**
 * 22395-short-code · "code-length" — a fuller "anatomy" composition: the
 * digit comparison, a real example message the article itself describes
 * (an OTP from a bank login), and a 3-fact annotated column, over a ghost
 * numeral background for depth.
 */
INNER_IMAGES['22395-short-code:code-length'] = () => {
  const bg = '#eef2fc'
  const ink = '#154989'
  const accent = '#4f5bd5'
  const soft = '#dfe5fa'

  const boxRow = (cx, y, digits, boxSize, on) => {
    const gap = 8
    const totalW = digits.length * boxSize + (digits.length - 1) * gap
    const x0 = cx - totalW / 2
    return digits
      .map((d, i) => {
        const x = x0 + i * (boxSize + gap)
        return `<rect x="${x}" y="${y}" width="${boxSize}" height="${boxSize + 12}" rx="10"
            fill="${WHITE}" stroke="${on ? accent : HAIR}" stroke-width="${on ? 2.4 : 2}"/>
          ${num(x + boxSize / 2, y + boxSize * 0.6, d, { size: boxSize * 0.48, fill: on ? accent : SLATE, anchor: 'middle' })}`
      })
      .join('')
  }

  const facts = [
    { icon: 'broadcast', label: 'One sender, every carrier' },
    { icon: 'lock', label: 'Delivers OTPs for 2FA logins' },
    { icon: 'messageBubble', label: 'No area code to dial' },
  ]

  return frame(
    bg,
    `${/* A soft depth panel behind the fact column — a glyph here (the
          original "5" ghost numeral) sat directly behind that column's own
          text with nothing opaque between them and bled through it. */ ''}
    <circle cx="758" cy="290" r="260" fill="${soft}" opacity="0.5"/>
    ${caps(64, 58, 'Short Code Format', { fill: accent })}

    ${/* Ten individual digit boxes at this column width forced numerals
          below the 20px floor. A single formatted line reads more like a
          real phone number anyway, sharpening the contrast against the
          short code's distinct boxed digits below it. */ ''}
    ${caps(228, 108, 'A Standard Number', { size: 20, anchor: 'middle' })}
    ${num(228, 172, '(559) 555-1234', { size: 36, fill: SLATE, anchor: 'middle' })}
    <line x1="168" y1="222" x2="288" y2="222" stroke="${HAIR}" stroke-width="2"/>
    ${caps(228, 250, 'vs', { size: 20, anchor: 'middle' })}
    <line x1="168" y1="266" x2="288" y2="266" stroke="${HAIR}" stroke-width="2"/>
    ${caps(228, 314, 'A Short Code', { size: 20, anchor: 'middle', fill: accent })}
    ${boxRow(228, 330, [...'22395'], 42, true)}

    ${card(64, 428, 396, 108, 22)}
    ${pill(88, 452, '22395', { size: 20, weight: 700, fill: accent, color: WHITE, padX: 16, height: 34 }).svg}
    ${txt(88, 508, '"Your verification code is 4192."', { size: 21, family: SERIF, fill: INK })}

    <line x1="512" y1="86" x2="512" y2="470" stroke="${HAIR}" stroke-width="2"/>

    ${facts.map((f, i) => factRow(560, 150 + i * 108, ICONS[f.icon], f.label, accent)).join('')}
    ${rule(560, 462, 396, soft, 3)}
    ${txt(560, 500, 'Same number reaches every phone,', { size: 21, family: SERIF, fill: SLATE })}
    ${txt(560, 528, 'on any network.', { size: 21, family: SERIF, fill: SLATE })}`,
  )
}

/**
 * 22395-short-code · "common-uses" — the article's OWN table of nine use
 * cases (2FA, alerts, promos, support, surveys, reminders, account updates,
 * security notices, contests), laid out as a real information grid instead
 * of a handful of empty boxes.
 */
INNER_IMAGES['22395-short-code:common-uses'] = () => {
  const bg = '#fdeff6'
  const ink = '#9d1f5f'
  const accent = '#ec4899'
  const soft = '#fbdcec'

  const items = [
    { icon: 'lock', title: '2FA & OTP Codes' },
    { icon: 'bell', title: 'Account Alerts' },
    { icon: 'tag', title: 'Promo Offers' },
    { icon: 'messageBubble', title: 'Customer Support' },
    { icon: 'pollBars', title: 'Surveys & Polls' },
    { icon: 'calendar', title: 'Event Reminders' },
    { icon: 'gear', title: 'Account Updates' },
    { icon: 'alertTriangle', title: 'Security Alerts' },
    { icon: 'star', title: 'Contests & Sweeps' },
  ]

  const cols = 3
  const gapX = 16
  const gapY = 14
  const gridX = 64
  const gridTop = 92
  const gridBottom = 522
  const cw = (960 - gridX - (cols - 1) * gapX) / cols
  const ch = (gridBottom - gridTop - 2 * gapY) / 3

  const cells = items
    .map((it, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = gridX + col * (cw + gapX)
      const y = gridTop + row * (ch + gapY)
      return useCell(x, y, cw, ch, ICONS[it.icon], it.title, accent, WHITE)
    })
    .join('')

  const countPillW = textWidth('9 DOCUMENTED CASES', 18, true) + 36
  const countPill = pill(960 - countPillW, 40, '9 Documented Cases', {
    size: 20, weight: 700, fill: accent, color: WHITE, padX: 18, height: 36,
  })

  return frame(
    bg,
    `${caps(64, 58, 'Common Uses', { fill: accent })}
    ${countPill.svg}
    ${cells}
    ${txt(W / 2, 552, 'One number, nine kinds of messages.', { size: 20, family: SERIF, fill: ink, anchor: 'middle' })}`,
  )
}

/**
 * 22395-short-code · "is-it-safe" — three layers pulled straight from the
 * article's own sections: the trusted brands it names, the safe signals it
 * lists, and the phishing red flags it warns about. Not a shield with a
 * generic checklist — the actual contrast the article draws.
 */
INNER_IMAGES['22395-short-code:is-it-safe'] = () => {
  const bg = '#e9f8f5'
  const ink = '#0f6b60'
  const accent = '#14b8a6'
  const soft = '#d3f0ea'

  const safe = ['Registered with carriers', 'Used by known companies', 'Reply STOP anytime']
  const flags = ['Asks for passwords or codes', 'Creates urgent pressure', 'Requests payment details']
  const companies = ['Shop Pay', 'Twilio', 'Robinhood', 'The Frye Co.']

  // Column widths, measured to the actual divider/margin each column text
  // must clear — not eyeballed, since a single unbounded line here is what
  // overflowed in the first pass.
  const SAFE_X = 392
  const SAFE_W = 686 - (SAFE_X + 54) - 16
  const FLAG_X = 716
  const FLAG_W = 1008 - (FLAG_X + 54)

  const stackRows = (x, items, iconFn, c, w) => {
    let y = 168
    let out = ''
    for (const t of items) {
      const row = factRowWrap(x, y, iconFn, t, c, w)
      out += row.svg
      y += row.h + 22
    }
    return out
  }

  let cx = 64
  const chips = companies
    .map((name) => {
      const p = pill(cx, 486, name, { size: 20, weight: 600, fill: WHITE, color: ink, padX: 18, height: 40 })
      cx += p.w + 12
      return p.svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Is It Safe?', { fill: accent })}

    <circle cx="188" cy="240" r="112" fill="${soft}"/>
    ${ICONS.shieldCheck(188, 232, 66, accent)}
    ${caps(188, 398, 'Trusted Sender', { size: 20, anchor: 'middle', fill: accent })}

    <line x1="356" y1="96" x2="356" y2="452" stroke="${HAIR}" stroke-width="2"/>

    ${caps(SAFE_X, 116, "Signs It's Safe", { size: 20, fill: accent })}
    ${stackRows(SAFE_X, safe, ICONS.checkCircle, accent, SAFE_W)}

    <line x1="686" y1="96" x2="686" y2="452" stroke="${HAIR}" stroke-width="2"/>

    ${caps(FLAG_X, 116, 'Red Flags', { size: 20, fill: CAUTION })}
    ${stackRows(FLAG_X, flags, ICONS.xCircle, CAUTION, FLAG_W)}

    ${caps(64, 470, 'Trusted by', { size: 20, fill: SLATE })}
    ${chips}`,
  )
}

/* ── message-blocking-is-active ─────────────────────────────────────────
 * Six replacements for that post's step-illustration screenshots. Each
 * carries its own soft tint (a warm family, since the post's hero banner is
 * red) so the six read as distinct rather than one background reused.
 */

/** "What Does Message Blocking Is Active Mean?" — the definition itself. */
INNER_IMAGES['message-blocking-is-active:what-is'] = () => {
  const bg = '#fdf3f3'
  const ink = '#7a2020'
  const accent = '#e0575f'
  return frame(
    bg,
    `${caps(64, 58, 'What It Means', { fill: accent })}
    ${txt(60, 120, 'Your Carrier Is', { size: 44, family: SERIF, fill: ink })}
    ${txt(60, 170, 'Blocking the Message', { size: 44, family: SERIF, fill: accent })}
    ${rule(64, 202, 500)}
    ${wrap(
      'The error means your mobile carrier is preventing your message from reaching the recipient — the message never left the network.',
      23, false, 520,
    )
      .map((l, i) => txt(64, 246 + i * 31, l, { size: 23, family: SERIF, fill: SLATE }))
      .join('')}
    ${pill(64, 372, 'Not a bug in the app', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 20, height: 42 }).svg}

    <circle cx="800" cy="290" r="128" fill="${WHITE}"/>
    ${ICONS.messageBubble(800, 270, 58, accent)}
    ${/* A plain "blocked" badge drawn directly, rather than editing an
          icon function's already-interpolated output — that string-replace
          was matching literal template text, not the rendered colour, so it
          never actually changed anything. */ ''}
    <circle cx="864" cy="222" r="26" fill="${accent}"/>
    <line x1="850" y1="208" x2="878" y2="236" stroke="${WHITE}" stroke-width="4" stroke-linecap="round"/>
    <line x1="878" y1="208" x2="850" y2="236" stroke="${WHITE}" stroke-width="4" stroke-linecap="round"/>
    ${caps(800, 434, 'Not delivered', { anchor: 'middle', size: 20, fill: accent })}`,
  )
}

/** Step 1 — Check Your Network Connection. */
INNER_IMAGES['message-blocking-is-active:check-network'] = () =>
  stepDiagram({
    bg: '#fdf6ee', ink: '#8a4a12', accent: '#d97706',
    eyebrow: 'Step 1', headline: ['Check Your', 'Network Connection'],
    desc: 'A weak or unstable network is often the real cause — not a block at all.',
    platforms: [
      { label: 'Try This', steps: ['Airplane mode', 'Better coverage', 'Contact carrier'] },
    ],
    heroIcon: 'signal', heroLabel: 'Weak signal', heroNote: 'The most common fix',
  })

/** Step 2 — Review Your Blocked Numbers List. */
INNER_IMAGES['message-blocking-is-active:review-blocked'] = () =>
  stepDiagram({
    bg: '#f6f0fb', ink: '#5b21a6', accent: '#8b5cf6',
    eyebrow: 'Step 2', headline: ['Check Your', 'Blocked List'],
    desc: 'An active block on your own device can stop a reply from landing.',
    platforms: [
      { label: 'Android', steps: ['Phone app', 'Settings', 'Blocked numbers'] },
      { label: 'iPhone', steps: ['Settings', 'Messages', 'Blocked Contacts'] },
    ],
    heroIcon: 'xCircle', heroLabel: 'Blocked contact',
  })

/** Step 3 — Disable Wi-Fi Calling. */
INNER_IMAGES['message-blocking-is-active:disable-wifi-calling'] = () =>
  stepDiagram({
    bg: '#eef7f5', ink: '#0f6b60', accent: '#14b8a6',
    eyebrow: 'Step 3', headline: ['Turn Off', 'Wi-Fi Calling'],
    desc: 'Wi-Fi calling can interfere with delivery — disabling it often clears the error.',
    platforms: [
      { label: 'Android', steps: ['Network & Internet', 'SIM', 'Wi-Fi Calling'] },
      { label: 'iPhone', steps: ['Settings', 'Phone', 'Wi-Fi Calling'] },
    ],
    heroIcon: 'wifi', heroLabel: 'Wi-Fi calling off',
  })

/** Step 9 — Clear Cache for Messages App (Android). */
INNER_IMAGES['message-blocking-is-active:clear-cache'] = () =>
  stepDiagram({
    bg: '#eef2fc', ink: '#154989', accent: '#4f5bd5',
    eyebrow: 'Step 9', headline: ['Clear the', 'Messages Cache'],
    desc: 'Clearing app cache fixes messaging glitches — your texts themselves are untouched.',
    platforms: [
      { label: 'Android', steps: ['Settings', 'Apps', 'Messages', 'Storage & cache'] },
    ],
    heroIcon: 'trash', heroLabel: 'Cache cleared', heroNote: 'Messages are not deleted',
  })

/** Step 10 — Reset Your APN Settings. */
INNER_IMAGES['message-blocking-is-active:reset-apn'] = () =>
  stepDiagram({
    bg: '#fdeef6', ink: '#9d1f5f', accent: '#ec4899',
    eyebrow: 'Step 10', headline: ['Reset Your', 'APN Settings'],
    desc: 'A corrupted Access Point Name can block connectivity — resetting restores the default.',
    platforms: [
      { label: 'Android', steps: ['Network & Internet', 'APN', 'Reset to default'] },
      { label: 'iPhone', steps: ['Cellular', 'Cellular Data', 'Reset'] },
    ],
    heroIcon: 'gear', heroLabel: 'Restart after resetting',
  })

/* ── what-does-ty-mean ──────────────────────────────────────────────────
 * Four replacements, each grounded in what that section of the article
 * actually says rather than a generic "thank you" illustration repeated
 * four times. A warm palette family (this post's hero is green), one tint
 * per image.
 */

/** "What Does TY Mean in Text?" — the definition itself. */
INNER_IMAGES['what-does-ty-mean:what-is'] = () => {
  const bg = '#eefcf3'
  const ink = '#15803d'
  const accent = '#16a34a'

  const facts = [
    ['Letters', '2'],
    ['Stands for', 'Thank You'],
    ['Tone', 'Casual'],
  ]

  return frame(
    bg,
    `${caps(64, 58, 'What It Means', { fill: accent })}
    ${txt(60, 128, 'A Two-Letter', { size: 42, family: SERIF, fill: ink })}
    ${txt(60, 176, 'Way to Say Thanks', { size: 42, family: SERIF, fill: accent })}
    ${rule(64, 206, 500)}
    ${wrap(
      '“TY” is a popular text and internet abbreviation for “thank you” — quick, casual, and used everywhere from texts to comments.',
      23, false, 500,
    )
      .map((l, i) => txt(64, 250 + i * 31, l, { size: 23, family: SERIF, fill: SLATE }))
      .join('')}

    ${facts
      .map(([k, v], i) => {
        const y = 396 + i * 46
        return `${caps(64, y, k, { size: 20, fill: SLATE })}
          ${txt(220, y, v, { size: 22, weight: 700, family: SERIF, fill: ink })}`
      })
      .join('')}

    ${/* A tilted "approved" seal — the term stamped, not just typeset —
          a different device from the plain numeral this replaces. */ ''}
    <g transform="rotate(-8, 800, 290)">
      <circle cx="800" cy="290" r="126" fill="none" stroke="${accent}" stroke-width="4" stroke-dasharray="3 10" stroke-linecap="round"/>
      <circle cx="800" cy="290" r="102" fill="${WHITE}"/>
      ${num(800, 320, 'TY', { size: 92, fill: accent, anchor: 'middle' })}
      ${caps(800, 360, 'Thanks!', { anchor: 'middle', size: 20, fill: ink })}
    </g>`,
  )
}

/** The four-platform breakdown — real per-platform usage, not a repeated grid. */
INNER_IMAGES['what-does-ty-mean:platforms'] = () => {
  const bg = '#fef9ec'
  const ink = '#92400e'
  const accent = '#d97706'

  const items = [
    { icon: 'bell', title: 'Snapchat', desc: 'Quick appreciation after a snap or streak help.' },
    { icon: 'heart', title: 'Instagram', desc: 'Replies to DMs, story reactions, and comments.' },
    { icon: 'messageBubble', title: 'WhatsApp', desc: 'Quick gratitude in 1:1 and group chats.' },
    { icon: 'star', title: 'TikTok', desc: 'Thanking commenters or live gift senders.' },
  ]

  const gridX = 64
  const gridTop = 210
  const gridW = 896
  const gridH = 306
  const gap = 18
  const cw = (gridW - gap) / 2
  const ch = (gridH - gap) / 2

  const cells = items
    .map((it, i) => {
      const col = i % 2
      const row = Math.floor(i / 2)
      const x = gridX + col * (cw + gap)
      const y = gridTop + row * (ch + gap)
      return benefitCard(x, y, cw, ch, ICONS[it.icon], it.title, it.desc, accent)
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Across Platforms', { fill: accent })}
    ${txt(60, 128, 'Same Two Letters,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Different Feel', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${cells}`,
  )
}

/** How to respond — the article's own three response strategies. */
INNER_IMAGES['what-does-ty-mean:how-to-respond'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#2563eb'

  const steps = [
    { icon: 'messageBubble', text: 'Say "You\'re welcome!" or a kind reply' },
    { icon: 'heart', text: 'Reply with an emoji — quick and warm' },
    { icon: 'checkCircle', text: 'Keep it casual — save formal wording for work' },
  ]

  let y = 220
  const stepsSvg = steps
    .map((s) => {
      const row = factRowWrap(64, y, ICONS[s.icon], s.text, accent, 480)
      y += row.h + 26
      return row.svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'How to Reply', { fill: accent })}
    ${txt(60, 128, 'Three Ways to', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Respond to TY', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${stepsSvg}

    ${/* A two-bubble example thread on the right, showing the reply in action. */ ''}
    <rect x="620" y="180" width="336" height="90" rx="26" fill="${WHITE}"/>
    ${txt(656, 232, 'TY so much! 🙏', { size: 26, family: SERIF, fill: INK })}
    <path d="M660,270 L660,296 L692,270 Z" fill="${WHITE}"/>
    <rect x="620" y="320" width="336" height="90" rx="26" fill="${accent}"/>
    ${txt(656, 372, "You're welcome! 😊", { size: 26, family: SERIF, fill: WHITE })}
    <path d="M916,320 L916,294 L884,320 Z" fill="${accent}"/>`,
  )
}

/** Real alternatives the article lists, as a genuine reference grid. */
INNER_IMAGES['what-does-ty-mean:alternatives'] = () => {
  const bg = '#fdf2f8'
  const ink = '#9d174d'
  const accent = '#db2777'

  const items = [
    { title: 'TU / TQ', desc: 'Short for "thank you".' },
    { title: 'TIA', desc: '"Thanks in advance" — for a polite request.' },
    { title: 'TYVM / TQVM', desc: '"Thank you very much" — a bit more formal.' },
    { title: 'TVM', desc: 'Another way to say "thanks very much".' },
    { title: 'TYSM', desc: 'A cheerful "thank you so much".' },
    { title: 'Thx / Thanx', desc: 'Casual, quick way to say "thanks".' },
  ]

  const gridX = 64
  const gridTop = 200
  const gridW = 896
  const gridH = 336
  const gapX = 18
  const gapY = 16
  const cw = (gridW - gapX * 2) / 3
  const ch = (gridH - gapY) / 2

  const cells = items
    .map((it, i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      const x = gridX + col * (cw + gapX)
      const y = gridTop + row * (ch + gapY)
      return benefitCard(x, y, cw, ch, ICONS.tag, it.title, it.desc, accent)
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'More Ways to Say It', { fill: accent })}
    ${txt(60, 128, 'Alternatives to', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, '"TY"', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${cells}`,
  )
}

/* ── what-does-otp-mean-in-text ─────────────────────────────────────────
 * Seven replacements, each grounded in that section's real content — the
 * article's own four meanings, its own platform table, its own security-vs-
 * fandom split, its own reply examples, and its own TOTP/HOTP comparison
 * table. A blue/violet/rose/amber/teal/red family, bookended by the hero's
 * own blue on the last image.
 */

/** "What Does OTP Mean in Text?" — the four real meanings, as a 2x2 grid. */
INNER_IMAGES['what-does-otp-mean-in-text:what-is'] = () => {
  const bg = '#eef2fc'
  const ink = '#154989'
  const accent = '#4f5bd5'

  const items = [
    { icon: 'lock', title: 'One-Time Password', desc: 'A short-lived security code for logins.' },
    { icon: 'heart', title: 'One True Pairing', desc: 'A fan’s favorite couple, fictional or real.' },
    { icon: 'messageBubble', title: 'On The Phone', desc: 'Busy on a call — an informal use.' },
    { icon: 'tag', title: 'One-Time Offer', desc: 'A limited-time deal in marketing.' },
  ]

  const gridX = 64
  const gridTop = 200
  const gridW = 896
  const gridH = 316
  const gap = 18
  const cw = (gridW - gap) / 2
  const ch = (gridH - gap) / 2

  const cells = items
    .map((it, i) => {
      const col = i % 2
      const row = Math.floor(i / 2)
      const x = gridX + col * (cw + gap)
      const y = gridTop + row * (ch + gap)
      return benefitCard(x, y, cw, ch, ICONS[it.icon], it.title, it.desc, accent)
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'One Term, Four Meanings', { fill: accent })}
    ${txt(60, 128, 'What "OTP"', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Actually Means', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${cells}`,
  )
}

/** How to determine which meaning applies — the article's own 3 factors. */
INNER_IMAGES['what-does-otp-mean-in-text:how-to-determine'] = () => {
  const bg = '#f6f0fb'
  const ink = '#5b21a6'
  const accent = '#8b5cf6'

  const factors = [
    { icon: 'broadcast', text: 'Communication Platform — each has its own way of speaking' },
    { icon: 'heart', text: 'Sender’s Background — what they’re into and how they talk' },
    { icon: 'messageBubble', text: 'Conversation Tone — is it formal or casual?' },
  ]

  let y = 232
  const rows = factors
    .map((f) => {
      const row = factRowWrap(64, y, ICONS[f.icon], f.text, accent, 500)
      y += row.h + 40
      return row.svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Reading Context', { fill: accent })}
    ${txt(60, 128, 'Which Meaning', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Applies to You?', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}

    <circle cx="800" cy="340" r="140" fill="${WHITE}"/>
    ${ICONS.search(800, 316, 64, accent)}
    ${caps(800, 498, 'Context decides', { anchor: 'middle', size: 20, fill: accent })}`,
  )
}

/** The article's own 5-platform usage breakdown. */
INNER_IMAGES['what-does-otp-mean-in-text:social-media-usage'] = () => {
  const bg = '#fdf2f8'
  const ink = '#9d174d'
  const accent = '#db2777'

  const platforms = [
    ['TikTok', 'Predicting or cheering for a favorite couple.'],
    ['Snapchat', 'Showing affection, or a joke between friends.'],
    ['Twitter', 'Discussing relationships, fictional or real.'],
    ['Instagram', 'Captions, comments and stories for fan art.'],
    ['WhatsApp', 'Romantic pairings — or secure login codes.'],
  ]

  let y = 210
  const rowH = 68
  const rows = platforms
    .map(([name, desc], i) => {
      const rowY = y + i * rowH
      const svg = `
        ${num(64, rowY, String(i + 1).padStart(2, '0'), { size: 24, fill: accent })}
        ${txt(112, rowY, name, { size: 24, weight: 700, family: SERIF, fill: ink })}
        ${wrap(desc, 20, false, 780).slice(0, 1).map((l) => txt(300, rowY, l, { size: 20, fill: SLATE })).join('')}
        ${i < platforms.length - 1 ? rule(64, rowY + 20, 832) : ''}`
      return svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Across Platforms', { fill: accent })}
    ${txt(60, 128, 'Five Places,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'One Fandom Meaning', { size: 40, family: SERIF, fill: accent })}
    ${rows}`,
  )
}

/** Recognising context on social media — the fan-talk vs. work-talk fork. */
INNER_IMAGES['what-does-otp-mean-in-text:recognize-context'] = () => {
  const bg = '#fef9ec'
  const ink = '#92400e'
  const accent = '#d97706'

  const branchCard = (x, label, term, desc) => `
    ${card(x, 220, 372, 234, 26)}
    ${caps(x + 32, 268, label, { size: 20, fill: accent })}
    ${txt(x + 32, 322, term, { size: 34, family: SERIF, fill: ink })}
    ${wrap(desc, 21, false, 310).slice(0, 3).map((l, i) => txt(x + 32, 360 + i * 28, l, { size: 21, fill: SLATE })).join('')}`

  return frame(
    bg,
    `${caps(64, 58, 'Two Readings', { fill: accent })}
    ${txt(60, 128, 'Fan Talk, or', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Work Talk?', { size: 40, family: SERIF, fill: accent })}
    ${branchCard(64, 'Fan Talk', 'One True Pairing', 'A favorite couple in a show, book, or fandom.')}
    ${branchCard(588, 'Security Talk', 'One-Time Password', 'A code confirming a login is really you.')}
    ${pill(64, 486, '💡 If unsure, just ask', { size: 22, weight: 600, fill: WHITE, color: ink, padX: 24, height: 50 }).svg}`,
  )
}

/** Security talk vs social talk — the article's own two-sided real usage split. */
INNER_IMAGES['what-does-otp-mean-in-text:security-vs-social'] = () => {
  const bg = '#eef7f5'
  const ink = '#0f6b60'
  const accent = '#14b8a6'
  const social = '#7c3aed'

  const security = ['Checking if you’re really you', 'Adding an extra layer of security', 'Logging in safely']
  const socialList = ['Loving a favorite couple in stories', 'Thinking about the best match-ups', 'Talking about media romances']

  const SEC_X = 64
  const SEC_W = 402
  const SOC_X = 528
  const SOC_W = 432

  // Passing the icon FUNCTION itself, not its name — factRowWrap's output
  // is raw path/circle markup with no reference back to "checkCircle" or
  // "heart" as text, so a post-hoc string-replace on the rendered SVG (tried
  // first) silently matched nothing and both columns would have rendered
  // the same icon.
  const stackRows = (x, items, iconFn, c, w) => {
    let y = 246
    let out = ''
    for (const t of items) {
      const row = factRowWrap(x, y, iconFn, t, c, w)
      out += row.svg
      y += row.h + 38
    }
    return out
  }

  return frame(
    bg,
    `${caps(64, 58, 'Two Kinds of Talk', { fill: accent })}
    ${txt(60, 128, 'Security Talk,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'or Social Talk?', { size: 40, family: SERIF, fill: social })}
    ${rule(64, 190, 896)}

    ${caps(SEC_X, 216, 'Security Talk', { size: 20, fill: accent })}
    ${stackRows(SEC_X, security, ICONS.checkCircle, accent, SEC_W)}

    <line x1="480" y1="206" x2="480" y2="500" stroke="${HAIR}" stroke-width="2"/>

    ${caps(SOC_X, 216, 'Social Talk', { size: 20, fill: social })}
    ${stackRows(SOC_X, socialList, ICONS.heart, social, SOC_W)}

    ${pill(64, 500, '🗣️ Same word, completely different meaning', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 22, height: 40 }).svg}`,
  )
}

/** How to respond — a real example exchange, plus the article's own trust warning. */
INNER_IMAGES['what-does-otp-mean-in-text:how-to-respond'] = () => {
  const bg = '#fef2f2'
  const ink = '#991b1b'
  const accent = '#dc2626'

  return frame(
    bg,
    `${caps(64, 58, 'How to Reply', { fill: accent })}
    ${txt(60, 128, 'Confirm It,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Then Move On', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${wrap('These codes confirm it’s really you — a quick "got it" is all a reply needs.', 22, false, 500)
      .map((l, i) => txt(64, 232 + i * 30, l, { size: 22, family: SERIF, fill: SLATE }))
      .join('')}

    <rect x="616" y="180" width="344" height="88" rx="26" fill="${WHITE}"/>
    ${txt(650, 232, 'Your OTP code is 123456.', { size: 24, family: SERIF, fill: INK })}
    <path d="M650,268 L650,294 L682,268 Z" fill="${WHITE}"/>
    <rect x="616" y="318" width="344" height="88" rx="26" fill="${accent}"/>
    ${txt(650, 370, 'Got it, thanks!', { size: 24, family: SERIF, fill: WHITE })}
    <path d="M926,318 L926,292 L894,318 Z" fill="${accent}"/>

    ${pill(64, 460, '⚠️ Real companies never ask for your OTP', { size: 20, weight: 700, fill: ink, color: WHITE, padX: 22, height: 46 }).svg}`,
  )
}

/** TOTP vs HOTP — the article's own comparison table, for 2FA. */
INNER_IMAGES['what-does-otp-mean-in-text:otp-for-2fa'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#1d4ed8'

  const rows = [
    ['Generation Method', 'Time-synchronized', 'Counter-based'],
    ['Code Validity', '30–60 seconds', 'Depends on counter'],
    ['Security Level', 'High', 'Moderate'],
  ]

  const colX = [64, 420, 706]
  const colW = [340, 270, 254]

  const header = `
    ${caps(colX[0], 216, 'Feature', { size: 20, fill: SLATE })}
    ${pill(colX[1], 190, 'TOTP', { size: 20, weight: 700, fill: accent, color: WHITE, padX: 20, height: 38 }).svg}
    ${pill(colX[2], 190, 'HOTP', { size: 20, weight: 700, fill: WHITE, color: ink, padX: 20, height: 38, stroke: HAIR }).svg}
    ${rule(64, 244, 896)}`

  const body = rows
    .map(([f, t, h], i) => {
      const y = 296 + i * 78
      return `${txt(colX[0], y, f, { size: 22, family: SERIF, fill: ink, weight: 700 })}
        ${wrap(t, 21, false, colW[1]).slice(0, 1).map((l) => txt(colX[1], y, l, { size: 21, fill: accent })).join('')}
        ${wrap(h, 21, false, colW[2]).slice(0, 1).map((l) => txt(colX[2], y, l, { size: 21, fill: SLATE })).join('')}
        ${i < rows.length - 1 ? rule(64, y + 26, 896) : ''}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Under the Hood', { fill: accent })}
    ${txt(60, 128, 'TOTP vs. HOTP', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'for 2FA', { size: 40, family: SERIF, fill: accent })}
    ${header}
    ${body}
    ${pill(64, 500, '✅ Both keep your account just as secure', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 22, height: 40 }).svg}`,
  )
}

/** A numbered step card — round badge + short bold title, no description. */
function numberedCard(x, y, w, h, n, title, accent) {
  return `${card(x, y, w, h, 18)}
    <circle cx="${x + 36}" cy="${y + 36}" r="20" fill="${accent}"/>
    ${num(x + 36, y + 43, String(n).padStart(2, '0'), { size: 18, weight: 700, fill: WHITE, anchor: 'middle' })}
    ${wrap(title, 22, true, w - 68, 2)
      .map((l, i) => txt(x + 68, y + 34 + i * 27, l, { size: 22, weight: 700, family: SERIF, fill: INK }))
      .join('')}`
}

/* ── sms-bomber ───────────────────────────────────────────────────────────
 * Seven replacements, each grounded in the article's own explanations —
 * its own three real-world effects, its own four named tool categories,
 * its own four bombing types, its own individual/business impact split,
 * its own five protection tips, six stop-it steps and four tracing steps.
 * A red/amber/violet/teal-indigo/green/blue/indigo family.
 */

/** What SMS bombing is — a calm inbox vs. a flooded one, the article's own contrast. */
INNER_IMAGES['sms-bomber:what-is'] = () => {
  const bg = '#fef2f2'
  const ink = '#7f1d1d'
  const accent = '#dc2626'
  const calm = '#0f766e'

  const branchCard = (x, label, term, desc, c, count) => `
    ${card(x, 220, 372, 234, 26)}
    ${caps(x + 32, 264, label, { size: 20, fill: c })}
    ${txt(x + 32, 318, term, { size: 34, family: SERIF, fill: ink })}
    ${wrap(desc, 21, false, 310).slice(0, 2).map((l, i) => txt(x + 32, 356 + i * 28, l, { size: 21, fill: SLATE })).join('')}
    <circle cx="${x + 336}" cy="256" r="30" fill="${c}" opacity="0.12"/>
    ${txt(x + 336, 264, count, { size: 20, weight: 700, fill: c, anchor: 'middle', family: SERIF })}`

  return frame(
    bg,
    `${caps(64, 58, 'The Basics', { fill: accent })}
    ${txt(60, 128, 'One Number,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Endless Messages', { size: 40, family: SERIF, fill: accent })}
    ${branchCard(64, 'A Normal Day', 'A Few Texts', 'Easy to read, reply to, and keep track of.', calm, '3')}
    ${branchCard(588, 'Under Attack', 'Nonstop Texts', 'Hundreds flood in within minutes, automatically.', accent, '99+')}
    ${pill(64, 486, '⚡ Frustration, battery drain, slower performance follow', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 48 }).svg}`,
  )
}

/** The article's own four named tool categories, as an icon list with a supporting note. */
INNER_IMAGES['sms-bomber:common-tools'] = () => {
  const bg = '#fffbeb'
  const ink = '#92400e'
  const accent = '#d97706'

  const tools = [
    { icon: 'messageBubble', text: 'Android apps that mass-text a number' },
    { icon: 'broadcast', text: 'Telegram bots that automate the bombing' },
    { icon: 'search', text: 'Free websites needing just a phone number' },
    { icon: 'gear', text: 'Developer tools sometimes repurposed' },
  ]

  let y = 228
  const rows = tools
    .map((t) => {
      const row = factRowWrap(64, y, ICONS[t.icon], t.text, accent, 500)
      y += row.h + 32
      return row.svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Know the Tools', { fill: accent })}
    ${txt(60, 128, 'Common SMS', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Bomber Tools', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}

    <circle cx="800" cy="350" r="140" fill="${WHITE}"/>
    ${ICONS.alertTriangle(800, 324, 62, accent)}
    ${caps(800, 506, 'Free & easy to find', { anchor: 'middle', size: 20, fill: accent })}`,
  )
}

/** The article's own four bombing types, as a numbered reference list. */
INNER_IMAGES['sms-bomber:types'] = () => {
  const bg = '#f5f3ff'
  const ink = '#5b21a6'
  const accent = '#7c3aed'

  const types = [
    ['Random', "Testing a tool on a stranger's number just for curiosity."],
    ['Targeted', 'Aimed at one person as revenge, bullying, or harassment.'],
    ['Automated', 'Scripts blast thousands of texts with zero manual effort.'],
    ['Phishing', 'Fraudulent links disguised as a bank or delivery alert.'],
  ]

  let y = 220
  const rowH = 100
  const rows = types
    .map(([name, desc], i) => {
      const rowY = y + i * rowH
      return `
        ${num(64, rowY, String(i + 1).padStart(2, '0'), { size: 26, fill: accent })}
        ${txt(112, rowY, name, { size: 26, weight: 700, family: SERIF, fill: ink })}
        ${wrap(desc, 21, false, 700).slice(0, 1).map((l) => txt(300, rowY, l, { size: 21, fill: SLATE })).join('')}
        ${i < types.length - 1 ? rule(64, rowY + 30, 832) : ''}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Four Patterns', { fill: accent })}
    ${txt(60, 128, 'Ways SMS', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Bombing Happens', { size: 40, family: SERIF, fill: accent })}
    ${rows}`,
  )
}

/** Real impact on individuals vs. businesses — the article's own two lists. */
INNER_IMAGES['sms-bomber:impact'] = () => {
  const bg = '#f3f6fb'
  const ink = '#0f6b60'
  const biz = '#4338ca'
  const accent = '#14b8a6'

  const individuals = ['Missed critical messages', 'Increased stress and frustration', 'Phone performance issues']
  const businesses = ['Downtime in customer support', 'Damage to brand reputation', 'Security vulnerabilities']

  const IND_X = 64
  const IND_W = 402
  const BIZ_X = 528
  const BIZ_W = 432

  const stackRows = (x, items, iconFn, c, w) => {
    let y = 246
    let out = ''
    for (const t of items) {
      const row = factRowWrap(x, y, iconFn, t, c, w)
      out += row.svg
      y += row.h + 38
    }
    return out
  }

  return frame(
    bg,
    `${caps(64, 58, 'Real Consequences', { fill: accent })}
    ${txt(60, 128, 'For Individuals,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'or Businesses?', { size: 40, family: SERIF, fill: biz })}
    ${rule(64, 190, 896)}

    ${caps(IND_X, 216, 'Individuals', { size: 20, fill: accent })}
    ${stackRows(IND_X, individuals, ICONS.alertTriangle, accent, IND_W)}

    <line x1="480" y1="206" x2="480" y2="500" stroke="${HAIR}" stroke-width="2"/>

    ${caps(BIZ_X, 216, 'Businesses', { size: 20, fill: biz })}
    ${stackRows(BIZ_X, businesses, ICONS.broadcast, biz, BIZ_W)}

    ${pill(64, 500, '💸 Both can end up costing real money', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 22, height: 40 }).svg}`,
  )
}

/** The article's own five protection tips, as a simple checklist. */
INNER_IMAGES['sms-bomber:protect'] = () => {
  const bg = '#f0fdf4'
  const ink = '#166534'
  const accent = '#16a34a'

  const tips = [
    'Limit sharing your number publicly',
    'Turn on built-in spam filters',
    'Block the sender immediately',
    'Loop in your mobile carrier',
    'Report persistent attacks to authorities',
  ]

  const rows = tips
    .map((t, i) => factRow(64, 236 + i * 58, ICONS.checkCircle, t, accent))
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Stay Ahead', { fill: accent })}
    ${txt(60, 128, 'Protect Yourself', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Before It Starts', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}
    ${pill(64, 508, '🔒 A few habits go a long way', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 22, height: 40 }).svg}`,
  )
}

/** The article's own six stop-it steps, as a numbered 2x3 grid. */
INNER_IMAGES['sms-bomber:stop'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#1d4ed8'

  const steps = [
    'Limit Personal Info',
    'Avoid Suspicious Links',
    'Use Strong Passwords',
    'Recognize the Signs',
    'Block the Sender',
    'Report the Incident',
  ]

  const gridX = 64
  const gridTop = 210
  const gridW = 896
  const gridH = 326
  const gap = 18
  const cw = (gridW - gap) / 2
  const ch = (gridH - 2 * gap) / 3

  const cells = steps
    .map((title, i) => {
      const col = i % 2
      const row = Math.floor(i / 2)
      const x = gridX + col * (cw + gap)
      const y = gridTop + row * (ch + gap)
      return numberedCard(x, y, cw, ch, i + 1, title, accent)
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Six Ways to Respond', { fill: accent })}
    ${txt(60, 128, 'Stop It Before', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'It Spreads', { size: 40, family: SERIF, fill: accent })}
    ${cells}`,
  )
}

/** How to trace the source — the article's own four identification steps. */
INNER_IMAGES['sms-bomber:identify'] = () => {
  const bg = '#eef2ff'
  const ink = '#3730a3'
  const accent = '#4f46e5'

  const steps = [
    { icon: 'search', text: 'Check the message for clues or patterns' },
    { icon: 'signal', text: 'Ask your mobile carrier to trace the source' },
    { icon: 'shieldCheck', text: 'Run an anti-spam app to flag the sender' },
    { icon: 'alertTriangle', text: 'Report persistent attacks to authorities' },
  ]

  let y = 225
  const rows = steps
    .map((s) => {
      const row = factRowWrap(64, y, ICONS[s.icon], s.text, accent, 500)
      y += row.h + 34
      return row.svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Trace the Source', { fill: accent })}
    ${txt(60, 128, "Who's Behind", { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'the Flood?', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}

    <circle cx="800" cy="340" r="140" fill="${WHITE}"/>
    ${ICONS.search(800, 316, 64, accent)}
    ${caps(800, 498, 'Every clue counts', { anchor: 'middle', size: 20, fill: accent })}`,
  )
}

/** A bordered card for a 3-up row: small icon badge, eyebrow, short title, short desc. */
function triptychCard(x, y, w, h, iconFn, eyebrow, headline, desc, accent) {
  const padX = 28
  const textW = w - padX * 2 - 12

  const titleSize = 25
  const titleLead = titleSize * 1.18
  const titleLines = wrap(headline, titleSize, false, textW, 2)
  const ty = y + 96
  const titleSvg = titleLines
    .map((l, i) => txt(x + padX, ty + i * titleLead, l, { size: titleSize, family: SERIF, fill: INK }))
    .join('')

  const descSize = 19
  const descY = ty + (titleLines.length - 1) * titleLead + 28
  const descLines = wrap(desc, descSize, false, textW, 2)
  const descSvg = descLines
    .map((l, i) => txt(x + padX, descY + i * 24, l, { size: descSize, fill: SLATE }))
    .join('')

  return `${card(x, y, w, h, 24)}
    <circle cx="${x + w - 40}" cy="${y + 40}" r="22" fill="${accent}" opacity="0.14"/>
    ${iconFn(x + w - 40, y + 40, 13, accent)}
    ${caps(x + padX, y + 56, eyebrow, { size: 17, fill: accent })}
    ${titleSvg}
    ${descSvg}`
}

/* ── 385-area-code ───────────────────────────────────────────────────────
 * Seven replacements, each grounded in the article's own sections — its own
 * three history milestones, its own coverage/time-zone/nearby-code facts,
 * its own three dialing formats, its own scam red flags, its own three
 * text-message formats plus named carriers, its own four impacted sectors,
 * and its own 98% open-rate marketing stat. An indigo/teal/violet/red/
 * blue/amber/rose family.
 */

/** History — three milestones (801, 385, the proposed 986) as a card row. */
INNER_IMAGES['385-area-code:history'] = () => {
  const bg = '#eef2ff'
  const ink = '#3730a3'
  const accent = '#4f46e5'

  const milestones = [
    { icon: 'calendar', eyebrow: 'Since 1947', title: '801 Serves Utah', desc: 'The original code for Salt Lake City.' },
    { icon: 'star', eyebrow: 'May 2009', title: '385 Arrives', desc: 'Added on top to create more numbers.' },
    { icon: 'broadcast', eyebrow: 'Proposed 2022', title: '986 Comes Next', desc: "Utah's plan for future growth." },
  ]

  const gap = 20
  const cw = (896 - 2 * gap) / 3
  const cells = milestones
    .map((m, i) => triptychCard(64 + i * (cw + gap), 220, cw, 234, ICONS[m.icon], m.eyebrow, m.title, m.desc, accent))
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'A Growing Network', { fill: accent })}
    ${txt(60, 128, 'From 801', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'to 385, and Beyond', { size: 40, family: SERIF, fill: accent })}
    ${cells}
    ${pill(64, 486, "📈 Built to keep up with Utah's growth", { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 48 }).svg}`,
  )
}

/** Location and time zone — coverage, time zone, and nearby codes as a card row. */
INNER_IMAGES['385-area-code:location'] = () => {
  const bg = '#eef7f5'
  const ink = '#0f6b60'
  const accent = '#14b8a6'

  const facts = [
    { icon: 'broadcast', eyebrow: 'Coverage', title: 'Salt Lake Area', desc: 'Provo, Ogden, and West Jordan too.' },
    { icon: 'calendar', eyebrow: 'Time Zone', title: 'Mountain Time', desc: 'UTC-7 standard, UTC-6 in summer.' },
    { icon: 'signal', eyebrow: 'Nearby Codes', title: '801 & 986', desc: 'Same region, different overlay codes.' },
  ]

  const gap = 20
  const cw = (896 - 2 * gap) / 3
  const cells = facts
    .map((f, i) => triptychCard(64 + i * (cw + gap), 220, cw, 234, ICONS[f.icon], f.eyebrow, f.title, f.desc, accent))
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Where It Reaches', { fill: accent })}
    ${txt(60, 128, 'One Region,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Three Things to Know', { size: 40, family: SERIF, fill: accent })}
    ${cells}
    ${pill(64, 486, '🗺️ Utah, on Mountain Time', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 48 }).svg}`,
  )
}

/** Dialing rules — the article's own three formats, as number chips. */
INNER_IMAGES['385-area-code:dialing'] = () => {
  const bg = '#f5f3ff'
  const ink = '#5b21a6'
  const accent = '#7c3aed'

  const rows = [
    ['Local Calls & SMS', '385-XXX-XXXX', 'No leading 1 needed'],
    ['Long-Distance (U.S.)', '1-385-XXX-XXXX', "Start with the '1' prefix"],
    ['International', '+1-385-XXX-XXXX', "Add your country's exit code"],
  ]

  const rowH = 110
  const rowsSvg = rows
    .map(([label, number, note], i) => {
      const y = 210 + i * rowH
      return `
        ${caps(64, y, label, { fill: accent })}
        <rect x="64" y="${y + 16}" width="360" height="64" rx="16" fill="${WHITE}" stroke="${HAIR}" stroke-width="2"/>
        ${num(96, y + 58, number, { size: 26, weight: 700, fill: ink })}
        ${wrap(note, 19, false, 380).slice(0, 1).map((l) => txt(456, y + 58, l, { size: 19, fill: SLATE })).join('')}
        ${i < rows.length - 1 ? rule(64, y + 96, 896) : ''}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Dialing Rules', { fill: accent })}
    ${txt(60, 128, 'Ten Digits,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Every Time', { size: 40, family: SERIF, fill: accent })}
    ${rowsSvg}`,
  )
}

/** Scams and safety — the article's own red flags, as a checklist. */
INNER_IMAGES['385-area-code:scams'] = () => {
  const bg = '#fef2f2'
  const ink = '#7f1d1d'
  const accent = '#dc2626'

  const flags = [
    'Requests for passwords or PINs',
    'Urgent or threatening language',
    'Poor audio or sloppy texts',
    'Messages from unknown senders',
  ]

  const rows = flags.map((t, i) => factRow(64, 246 + i * 66, ICONS.xCircle, t, accent)).join('')

  return frame(
    bg,
    `${caps(64, 58, 'Watch For', { fill: accent })}
    ${txt(60, 128, 'Signs of a', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Scam Call or Text', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}
    ${pill(64, 498, '🛡️ When unsure, hang up and verify', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 22, height: 44 }).svg}`,
  )
}

/** Sending and receiving texts — the article's own three formats plus its named carriers. */
INNER_IMAGES['385-area-code:texting'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#1d4ed8'

  const formats = [
    { icon: 'messageBubble', title: 'SMS', desc: 'Plain text, up to 160 characters.' },
    { icon: 'tag', title: 'MMS', desc: 'Share photos, video, and audio.' },
    { icon: 'broadcast', title: 'Group', desc: 'Multiple people, one conversation.' },
  ]
  const colW = 896 / 3

  const cols = formats
    .map((f, i) => {
      const x = 64 + i * colW
      return `
        <circle cx="${x + 40}" cy="230" r="28" fill="${accent}" opacity="0.14"/>
        ${ICONS[f.icon](x + 40, 230, 16, accent)}
        ${txt(x, 300, f.title, { size: 28, weight: 700, family: SERIF, fill: ink })}
        ${wrap(f.desc, 19, false, 250, 2).map((l, j) => txt(x, 332 + j * 24, l, { size: 19, fill: SLATE })).join('')}`
    })
    .join('')

  const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Sprint']
  let cx = 64
  const chips = carriers
    .map((name) => {
      const p = pill(cx, 486, name, { size: 20, weight: 600, fill: WHITE, color: ink, padX: 18, height: 40 })
      cx += p.w + 12
      return p.svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'How Texting Works', { fill: accent })}
    ${txt(60, 128, 'Every Format,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Every Carrier', { size: 40, family: SERIF, fill: accent })}
    ${cols}
    ${caps(64, 470, 'Supported Carriers', { size: 20, fill: SLATE })}
    ${chips}`,
  )
}

/** Business and economic impact — the article's own four impacted areas. */
INNER_IMAGES['385-area-code:business'] = () => {
  const bg = '#fffbeb'
  const ink = '#92400e'
  const accent = '#d97706'

  const sectors = [
    ['Healthcare', 'Updating systems for patient communication.'],
    ['Finance', 'Adapting financial services and alerts.'],
    ['Technology', "Fueling Utah's growing tech and startup scene."],
    ['Overall Growth', 'New numbers support relocations and expansion.'],
  ]

  let y = 220
  const rowH = 100
  const rows = sectors
    .map(([name, desc], i) => {
      const rowY = y + i * rowH
      return `
        ${num(64, rowY, String(i + 1).padStart(2, '0'), { size: 26, fill: accent })}
        ${txt(112, rowY, name, { size: 26, weight: 700, family: SERIF, fill: ink })}
        ${wrap(desc, 21, false, 700).slice(0, 1).map((l) => txt(340, rowY, l, { size: 21, fill: SLATE })).join('')}
        ${i < sectors.length - 1 ? rule(64, rowY + 30, 832) : ''}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Who Feels It', { fill: accent })}
    ${txt(60, 128, 'Business and', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Economic Impact', { size: 40, family: SERIF, fill: accent })}
    ${rows}`,
  )
}

/** SMS marketing — the article's own 98% open-rate stat plus its own three benefits. */
INNER_IMAGES['385-area-code:marketing'] = () => {
  const bg = '#fdf2f8'
  const ink = '#9d174d'
  const accent = '#db2777'

  const benefits = [
    { icon: 'bell', text: 'Delivered and opened within minutes' },
    { icon: 'heart', text: 'Personalized to each customer' },
    { icon: 'checkCircle', text: 'Easy to track opens and replies' },
  ]

  let y = 232
  const rows = benefits
    .map((b) => {
      const row = factRowWrap(420, y, ICONS[b.icon], b.text, accent, 460)
      y += row.h + 34
      return row.svg
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Why It Works', { fill: accent })}
    ${txt(60, 128, 'Read Almost', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Instantly', { size: 40, family: SERIF, fill: accent })}

    ${txt(64, 360, '98%', { size: 120, family: SERIF, fill: accent })}
    ${caps(64, 392, 'of texts get read', { size: 18, fill: SLATE })}
    ${rows}

    ${pill(64, 478, '🎯 Great for promos, drops, and loyalty rewards', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 44 }).svg}`,
  )
}

/**
 * NEW DEFAULT TEMPLATE (replaces the card-grid/checklist/multi-column
 * patterns used above): one concrete device mockup as the sole artifact,
 * annotated by leader lines running out to real labels — instead of N
 * separate floating tiles with their own icon+title+desc (which reads as
 * empty, repeated boilerplate once you've seen it twice). Every "compare N
 * things" post going forward should reach for this, a numbered-callout
 * card (see `annotatedCard` below), or a fresh one-off — not another grid.
 */
function annotatedPhone(items, { startY = 248, rowGap = 96, rowH = 72 } = {}) {
  const phoneX = 660
  const phoneW = 260
  const phoneTop = startY - rowH / 2 - 26
  const phoneBottom = startY + (items.length - 1) * rowGap + rowH / 2 + 26
  const phoneH = phoneBottom - phoneTop

  const rows = items
    .map((it, i) => {
      const midY = startY + i * rowGap
      const rowY = midY - rowH / 2
      return `
      <line x1="64" y1="${midY}" x2="${phoneX - 6}" y2="${midY}" stroke="${HAIR}" stroke-width="2" stroke-dasharray="3 5"/>
      <circle cx="64" cy="${midY}" r="4" fill="${it.color}"/>
      ${caps(84, midY - 20, it.label, { size: 16, fill: it.color })}
      ${wrap(it.desc, 18, false, phoneX - 130, 1).map((l) => txt(84, midY + 6, l, { size: 18, fill: SLATE })).join('')}
      <rect x="${phoneX + 16}" y="${rowY}" width="${phoneW - 32}" height="${rowH}" rx="16" fill="${it.color}"/>
      ${txt(phoneX + 34, rowY + rowH / 2 + 7, it.chip, { size: 19, weight: 600, fill: WHITE })}`
    })
    .join('')

  return `
    <rect x="${phoneX}" y="${phoneTop}" width="${phoneW}" height="${phoneH}" rx="40" fill="${WHITE}" stroke="${HAIR}" stroke-width="2"/>
    <rect x="${phoneX + phoneW / 2 - 28}" y="${phoneTop + 20}" width="56" height="8" rx="4" fill="${HAIR}"/>
    ${rows}`
}

/* ── what-does-tbh-mean ──────────────────────────────────────────────────
 * Seven replacements, each grounded in the article's own sections — its own
 * three example quotes, its own three-platform breakdown, its own five ways
 * to use it, its own three/two response styles, its own five named
 * meanings, and its own eight related slang terms. A rose/blue/violet/
 * green/pink/amber/indigo family.
 */

/** What TBH means — the article's own three example quotes, as chat bubbles. */
INNER_IMAGES['what-does-tbh-mean:what-is'] = () => {
  const bg = '#fdf2f8'
  const ink = '#9d174d'
  const accent = '#db2777'

  const bubbles = [
    "TBH, you're talented!",
    'TBH, that movie was slow.',
    'TBH, I hate broccoli 😅',
  ]
  const bubbleSvg = bubbles
    .map((t, i) => {
      const y = 180 + i * 84
      const op = 1 - i * 0.16
      return `<rect x="620" y="${y}" width="320" height="64" rx="22" fill="${accent}" opacity="${op.toFixed(2)}"/>
        ${txt(652, y + 38, t, { size: 20, family: SERIF, fill: WHITE })}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'The Basics', { fill: accent })}
    ${txt(60, 128, 'What "TBH"', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Really Means', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${wrap("Short for 'to be honest' — a heads-up that what's coming is genuine, whether it's kind, blunt, or somewhere in between.", 22, false, 500)
      .map((l, i) => txt(64, 232 + i * 29, l, { size: 22, family: SERIF, fill: SLATE }))
      .join('')}
    ${bubbleSvg}
    ${pill(64, 470, "🗣️ Honest, kind, or playful — your call", { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 48 }).svg}`,
  )
}

/** Snapchat, Instagram, and WhatsApp — one phone, annotated per platform. */
INNER_IMAGES['what-does-tbh-mean:platforms'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#1d4ed8'

  const phone = annotatedPhone([
    { label: 'Snapchat', desc: 'Compliment games in stories', chip: '❄️ 3-day streak!', color: '#ca8a04' },
    { label: 'Instagram', desc: '"Like for a TBH" posts', chip: '❤️ 248 likes', color: '#db2777' },
    { label: 'WhatsApp', desc: 'Honest chats with friends', chip: '💬 TBH, miss you!', color: '#16a34a' },
  ])

  return frame(
    bg,
    `${caps(64, 58, 'Same Word, 3 Apps', { fill: accent })}
    ${txt(60, 128, 'TBH Across', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Social Media', { size: 40, family: SERIF, fill: accent })}
    ${phone}`,
  )
}

/** How to use TBH — the article's own five ways, as a numbered list. */
INNER_IMAGES['what-does-tbh-mean:how-to-use'] = () => {
  const bg = '#f5f3ff'
  const ink = '#5b21a6'
  const accent = '#7c3aed'

  const ways = [
    ['Share Opinions', 'Preface your honest take on anything.'],
    ['Compliment', 'Make praise sound more heartfelt.'],
    ['Give Feedback', 'Balance honesty with kindness.'],
    ['Express Feelings', 'Share something personal, naturally.'],
    ['Be Playful', 'Keep it light and fun with friends.'],
  ]

  const rowH = 72
  const rows = ways
    .map(([name, desc], i) => {
      const y = 200 + i * rowH
      return `
        ${num(64, y, String(i + 1).padStart(2, '0'), { size: 24, fill: accent })}
        ${txt(112, y, name, { size: 23, weight: 700, family: SERIF, fill: ink })}
        ${wrap(desc, 20, false, 620).slice(0, 1).map((l) => txt(340, y, l, { size: 20, fill: SLATE })).join('')}
        ${i < ways.length - 1 ? rule(64, y + 26, 832) : ''}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'In Practice', { fill: accent })}
    ${txt(60, 128, 'Five Ways to', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Use "TBH"', { size: 40, family: SERIF, fill: accent })}
    ${rows}`,
  )
}

/** How to respond over text or Snapchat — the article's own three responses. */
INNER_IMAGES['what-does-tbh-mean:respond-text'] = () => {
  const bg = '#f0fdf4'
  const ink = '#166534'
  const accent = '#16a34a'

  const responses = [
    'Thank them for a kind compliment',
    'Share your own opinion, respectfully',
    'Address insults calmly, or just ignore',
  ]

  const rows = responses.map((t, i) => factRow(64, 246 + i * 66, ICONS.checkCircle, t, accent)).join('')

  return frame(
    bg,
    `${caps(64, 58, 'Replying Well', { fill: accent })}
    ${txt(60, 128, 'How to Respond', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'to a "TBH"', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}
    ${pill(64, 498, "💬 Keep it kind, even when it's honest", { size: 20, weight: 600, fill: WHITE, color: ink, padX: 22, height: 44 }).svg}`,
  )
}

/** How to respond on Instagram — the article's own compliment-vs-hurt contrast. */
INNER_IMAGES['what-does-tbh-mean:respond-instagram'] = () => {
  const bg = '#fdf2f8'
  const ink = '#9d174d'
  const accent = '#db2777'
  const soft = '#0f766e'

  const branchCard = (x, label, term, desc, c) => `
    ${card(x, 220, 372, 234, 26)}
    ${caps(x + 32, 264, label, { size: 20, fill: c })}
    ${txt(x + 32, 318, term, { size: 32, family: SERIF, fill: ink })}
    ${wrap(desc, 21, false, 310).slice(0, 2).map((l, i) => txt(x + 32, 356 + i * 28, l, { size: 21, fill: SLATE })).join('')}`

  return frame(
    bg,
    `${caps(64, 58, 'On Instagram', { fill: accent })}
    ${txt(60, 128, 'A Compliment,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'or Something Harsher?', { size: 40, family: SERIF, fill: accent })}
    ${branchCard(64, 'If It Is Kind', 'Say Thanks', 'Thank them and return the kindness.', soft)}
    ${branchCard(588, 'If It Stings', 'Stay Calm', 'Say it hurt, but stay calm and kind.', accent)}
    ${pill(64, 486, '🌱 Keep the conversation positive either way', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 48 }).svg}`,
  )
}

/** All the meanings of TBH — the article's own five, each with its own icon. */
INNER_IMAGES['what-does-tbh-mean:all-meanings'] = () => {
  const bg = '#fffbeb'
  const ink = '#92400e'
  const accent = '#d97706'

  const meanings = [
    { icon: 'checkCircle', title: 'To Be Honest', desc: 'A candid, straightforward opinion.' },
    { icon: 'bell', title: 'To Be Heard', desc: 'Wanting your voice acknowledged.' },
    { icon: 'star', title: 'The Big Hit', desc: 'Something hugely popular right now.' },
    { icon: 'alertTriangle', title: 'Take Back Hope', desc: 'Feeling discouraged, ready to give up.' },
    { icon: 'broadcast', title: 'To Be Hyped', desc: 'Excited and pumped for something.' },
  ]

  const rowH = 70
  const rows = meanings
    .map((m, i) => {
      const y = 210 + i * rowH
      return `
        <circle cx="${64 + 20}" cy="${y}" r="20" fill="${accent}" opacity="0.14"/>
        ${ICONS[m.icon](84, y, 12, accent)}
        ${txt(118, y + 6, m.title, { size: 22, weight: 700, family: SERIF, fill: ink })}
        ${wrap(m.desc, 19, false, 600).slice(0, 1).map((l) => txt(370, y + 6, l, { size: 19, fill: SLATE })).join('')}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'One Abbreviation', { fill: accent })}
    ${txt(60, 128, 'Five Meanings', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'of "TBH"', { size: 40, family: SERIF, fill: accent })}
    ${rows}`,
  )
}

/** Related slang — the article's own eight terms, as a chip grid. */
INNER_IMAGES['what-does-tbh-mean:related-slang'] = () => {
  const bg = '#eef2ff'
  const ink = '#3730a3'
  const accent = '#4f46e5'

  const terms = [
    ['FS', 'For sure'],
    ['IYKYK', 'Only some get it'],
    ['IKR', 'I know, right'],
    ['FR', 'For real'],
    ['MK', 'Okay'],
    ['IDK', "Don't know"],
    ['WYLL', 'How you look'],
    ['ISTG', 'I swear'],
  ]

  const gridTop = 210
  const gridH = 280
  const gap = 16
  const cw = (896 - 3 * gap) / 4
  const ch = (gridH - gap) / 2

  const cells = terms
    .map(([term, meaning], i) => {
      const col = i % 4
      const row = Math.floor(i / 4)
      const x = 64 + col * (cw + gap)
      const y = gridTop + row * (ch + gap)
      return `${card(x, y, cw, ch, 18)}
        ${txt(x + 24, y + 46, term, { size: 28, weight: 700, family: SERIF, fill: ink })}
        ${txt(x + 24, y + 76, meaning, { size: 18, fill: SLATE })}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Keep Learning', { fill: accent })}
    ${txt(60, 128, 'Slang Related', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'to "TBH"', { size: 40, family: SERIF, fill: accent })}
    ${cells}
    ${pill(64, 508, '📚 A whole vocabulary of honest shorthand', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 22, height: 40 }).svg}`,
  )
}

/**
 * A hub-and-spoke diagram: one central question bubble, with N leader lines
 * fanning out to labeled outcome rows — for "one input, several possible
 * responses" content, without falling back to a plain checklist.
 */
function hubAndSpoke(hubText, outcomes, { hubColor = INK } = {}) {
  const hubCx = 190
  const hubCy = 360
  const hubR = 110
  const rowX = 360
  const rowGap = 100
  const rowStart = 260
  const edgeX = hubCx + hubR * 0.86

  const rows = outcomes
    .map((o, i) => {
      const rowY = rowStart + i * rowGap
      const edgeY = hubCy + (rowY - hubCy) * 0.35
      return `
      <line x1="${edgeX}" y1="${edgeY}" x2="${rowX - 14}" y2="${rowY}" stroke="${o.color}" stroke-width="2" stroke-dasharray="3 5" opacity="0.6"/>
      <circle cx="${rowX - 14}" cy="${rowY}" r="4" fill="${o.color}"/>
      ${caps(rowX, rowY - 20, o.label, { size: 16, fill: o.color })}
      ${wrap(o.reply, 19, false, 900 - rowX, 1).map((l) => txt(rowX, rowY + 8, l, { size: 19, family: SERIF, fill: SLATE })).join('')}`
    })
    .join('')

  return `
    <circle cx="${hubCx}" cy="${hubCy}" r="${hubR}" fill="${hubColor}" opacity="0.1"/>
    <circle cx="${hubCx}" cy="${hubCy}" r="${hubR - 14}" fill="${WHITE}" stroke="${hubColor}" stroke-width="2" stroke-dasharray="4 6"/>
    ${txt(hubCx, hubCy + 14, hubText, { size: 30, family: SERIF, weight: 700, fill: hubColor, anchor: 'middle' })}
    ${rows}`
}

/* ── what-does-wtw-mean ──────────────────────────────────────────────────
 * Three replacements, grounded in the article's own two named meanings, its
 * own four-platform examples, and its own three response scenarios. A
 * blue/violet/green family.
 */

/** What WTW means — its two real meanings, as two contrasting message threads. */
INNER_IMAGES['what-does-wtw-mean:what-is'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#1d4ed8'

  const thread = (x, label, color, q, a) => `
    ${card(x, 210, 432, 300, 24)}
    ${caps(x + 28, 250, label, { size: 17, fill: color })}
    <rect x="${x + 28}" y="272" width="376" height="56" rx="18" fill="#f1f5f9"/>
    ${txt(x + 46, 306, q, { size: 18, family: SERIF, fill: INK })}
    <rect x="${x + 28}" y="344" width="376" height="56" rx="18" fill="${color}"/>
    ${txt(x + 46, 378, a, { size: 18, family: SERIF, fill: WHITE })}`

  return frame(
    bg,
    `${caps(64, 58, 'Two Meanings', { fill: accent })}
    ${txt(60, 128, 'One Text,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Two Meanings', { size: 40, family: SERIF, fill: accent })}
    ${thread(64, 'Casual Check-In', accent, "WTW? Haven't heard from you!", 'Just got back from vacation!')}
    ${thread(528, 'Surprise Reaction', '#dc2626', 'My dog opened the fridge himself!', "WTW?! That's wild!")}`,
  )
}

/** WTW across platforms — one phone, annotated per app. */
INNER_IMAGES['what-does-wtw-mean:platforms'] = () => {
  const bg = '#f0fdf4'
  const ink = '#166534'
  const accent = '#16a34a'

  const phone = annotatedPhone(
    [
      { label: 'Snapchat', desc: 'Start a chat or check plans', chip: '📸 WTW today?', color: '#ca8a04' },
      { label: 'WhatsApp', desc: "Ask about the group's plans", chip: '💬 WTW for dinner?', color: '#16a34a' },
      { label: 'TikTok', desc: 'React to or start a trend', chip: '🎬 WTW on this trend?', color: '#111827' },
      { label: 'Instagram', desc: 'Kick off a fun conversation', chip: '✨ WTW this weekend?', color: '#db2777' },
    ],
    { startY: 222, rowGap: 76, rowH: 62 },
  )

  return frame(
    bg,
    `${caps(64, 58, 'Same 3 Letters', { fill: accent })}
    ${txt(60, 128, 'WTW Across', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, '4 Platforms', { size: 40, family: SERIF, fill: accent })}
    ${phone}`,
  )
}

/** How to respond — one question, three context-dependent replies. */
INNER_IMAGES['what-does-wtw-mean:how-to-respond'] = () => {
  const bg = '#f5f3ff'
  const ink = '#5b21a6'
  const accent = '#7c3aed'

  const hub = hubAndSpoke('WTW?', [
    { label: 'Casual Check-In', reply: '"Not much, just relaxing!"', color: '#1d4ed8' },
    { label: 'Surprise Reaction', reply: '"WTW! I didn\'t expect that!"', color: '#d97706' },
    { label: 'Style or Show Pick', reply: '"Go with something comfy!"', color: '#16a34a' },
  ], { hubColor: accent })

  return frame(
    bg,
    `${caps(64, 58, 'Context Matters', { fill: accent })}
    ${txt(60, 128, 'One Question,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Three Replies', { size: 40, family: SERIF, fill: accent })}
    ${hub}
    ${pill(64, 506, "💭 Same 3 letters, totally different reply", { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 44 }).svg}`,
  )
}

/* ── how-to-send-a-system-generated-sms ─────────────────────────────────
 * Seven new images for this authored (non-scraped) post — grounded in its
 * own trigger→API→gateway explanation, its own 5 named message types, its
 * own 6-step setup, its own Python/PHP note, and its own benefits/best-
 * practices lists. A blue/indigo/violet/slate/green/amber family.
 */

/** What it is — manual sending vs. system-generated, as a speed contrast. */
INNER_IMAGES['how-to-send-a-system-generated-sms:what-is'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#1d4ed8'

  const panel = (x, label, big, desc, color) => `
    ${card(x, 210, 432, 280, 24)}
    ${caps(x + 28, 250, label, { size: 17, fill: color })}
    ${txt(x + 28, 320, big, { size: 46, family: SERIF, weight: 700, fill: color })}
    ${wrap(desc, 19, false, 376).slice(0, 2).map((l, i) => txt(x + 28, 358 + i * 26, l, { size: 19, fill: SLATE })).join('')}`

  return frame(
    bg,
    `${caps(64, 58, 'The Real Difference', { fill: accent })}
    ${txt(60, 128, 'Who Actually', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Presses Send?', { size: 40, family: SERIF, fill: accent })}
    ${panel(64, 'Manual', '~5 min', 'Someone opens an app and types it.', '#94a3b8')}
    ${panel(528, 'System-Generated', '<1 sec', 'Code detects the event and sends it.', accent)}`,
  )
}

/** How it works — a trigger → API → gateway → recipient pipeline. */
INNER_IMAGES['how-to-send-a-system-generated-sms:how-it-works'] = () => {
  const bg = '#f5f3ff'
  const ink = '#5b21a6'
  const accent = '#7c3aed'

  const steps = [
    { icon: 'bell', title: 'Trigger', desc: 'An event fires' },
    { icon: 'gear', title: 'API Call', desc: 'JSON request sent' },
    { icon: 'broadcast', title: 'Gateway', desc: 'Carrier delivers it' },
    { icon: 'messageBubble', title: 'Recipient', desc: 'Text arrives' },
  ]
  const boxW = 190
  const gap = (896 - steps.length * boxW) / (steps.length - 1)
  const boxY = 250
  const boxH = 150

  const boxes = steps
    .map((s, i) => {
      const x = 64 + i * (boxW + gap)
      return `
      ${card(x, boxY, boxW, boxH, 20, i === steps.length - 1 ? accent : WHITE)}
      ${i < steps.length - 1 ? `<path d="M${x + boxW + 6},${boxY + boxH / 2} l${gap - 12},0 M${x + boxW + gap - 18},${boxY + boxH / 2 - 7} l12,7 l-12,7" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
      <circle cx="${x + boxW / 2}" cy="${boxY + 44}" r="24" fill="${i === steps.length - 1 ? WHITE : accent}" opacity="${i === steps.length - 1 ? 1 : 0.14}"/>
      ${ICONS[s.icon](x + boxW / 2, boxY + 44, 14, i === steps.length - 1 ? accent : accent)}
      ${txt(x + boxW / 2, boxY + 96, s.title, { size: 19, weight: 700, family: SERIF, anchor: 'middle', fill: i === steps.length - 1 ? WHITE : ink })}
      ${txt(x + boxW / 2, boxY + 122, s.desc, { size: 14, anchor: 'middle', fill: i === steps.length - 1 ? '#ede9fe' : SLATE })}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Under the Hood', { fill: accent })}
    ${txt(60, 128, 'From Event', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'to Delivered Text', { size: 40, family: SERIF, fill: accent })}
    ${boxes}
    ${pill(64, 448, '⚡ The whole trip happens in under a second', { size: 20, weight: 600, fill: WHITE, color: ink, padX: 24, height: 46 }).svg}`,
  )
}

/** Common types — one phone, annotated per message type. */
INNER_IMAGES['how-to-send-a-system-generated-sms:types'] = () => {
  const bg = '#fdf2f8'
  const ink = '#9d174d'
  const accent = '#db2777'

  const phone = annotatedPhone(
    [
      { label: 'OTP & 2FA', desc: 'A login or payment attempt', chip: '🔐 Your OTP is 5821', color: '#1d4ed8' },
      { label: 'Order Updates', desc: 'A status change ships it', chip: '📦 Order shipped!', color: '#16a34a' },
      { label: 'Reminders', desc: 'A scheduled time offset', chip: '📅 Tomorrow at 3 PM', color: '#d97706' },
      { label: 'Security Alerts', desc: 'A new device sign-in', chip: '🛡️ New login detected', color: '#dc2626' },
    ],
    { startY: 222, rowGap: 76, rowH: 62 },
  )

  return frame(
    bg,
    `${caps(64, 58, 'One System', { fill: accent })}
    ${txt(60, 128, 'Four Kinds of', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Automated Texts', { size: 40, family: SERIF, fill: accent })}
    ${phone}`,
  )
}

/** Setup steps — a numbered list, the article's own six steps. */
INNER_IMAGES['how-to-send-a-system-generated-sms:steps'] = () => {
  const bg = '#eef7f5'
  const ink = '#0f6b60'
  const accent = '#14b8a6'

  const steps = [
    ['Pick an API', 'Look for JSON support and delivery reports'],
    ['Get your key', 'Generate an access key from your dashboard'],
    ['Define the trigger', 'Decide exactly what event should fire a text'],
    ['Template it', 'Write the text once with placeholders'],
    ['Send the request', 'POST the number, message, and API key'],
    ['Confirm delivery', 'Check the delivery report and store the result'],
  ]

  const rowH = 68
  const rows = steps
    .map(([name, desc], i) => {
      const y = 205 + i * rowH
      return `
        ${num(64, y, String(i + 1).padStart(2, '0'), { size: 22, fill: accent })}
        ${txt(112, y, name, { size: 21, weight: 700, family: SERIF, fill: ink })}
        ${wrap(desc, 19, false, 620).slice(0, 1).map((l) => txt(320, y, l, { size: 19, fill: SLATE })).join('')}
        ${i < steps.length - 1 ? rule(64, y + 24, 832) : ''}`
    })
    .join('')

  return frame(
    bg,
    `${caps(64, 58, 'Setup', { fill: accent })}
    ${txt(60, 128, 'Six Steps to', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Your First Send', { size: 40, family: SERIF, fill: accent })}
    ${rows}`,
  )
}

/** Python and PHP — two mock code-editor panels, same request shape. */
INNER_IMAGES['how-to-send-a-system-generated-sms:code'] = () => {
  const bg = '#eff6ff'
  const ink = '#1e40af'
  const accent = '#1d4ed8'

  const editor = (x, label, lines, dot) => `
    ${card(x, 210, 432, 290, 18)}
    <circle cx="${x + 26}" cy="234" r="6" fill="#f87171"/>
    <circle cx="${x + 46}" cy="234" r="6" fill="#fbbf24"/>
    <circle cx="${x + 66}" cy="234" r="6" fill="#34d399"/>
    ${caps(x + 26, 268, label, { size: 16, fill: dot })}
    ${lines
      .map(
        ([w, c], i) =>
          `<rect x="${x + 26}" y="${294 + i * 32}" width="${w}" height="14" rx="4" fill="${c}" opacity="0.8"/>`,
      )
      .join('')}`

  return frame(
    bg,
    `${caps(64, 58, 'Same Shape', { fill: accent })}
    ${txt(60, 128, 'Any Language,', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'Same 3 Steps', { size: 40, family: SERIF, fill: accent })}
    ${editor(64, 'Python — requests', [
      [120, '#db2777'],
      [260, '#94a3b8'],
      [200, accent],
      [300, '#94a3b8'],
      [180, '#16a34a'],
    ], accent)}
    ${editor(528, 'PHP — cURL', [
      [140, '#db2777'],
      [280, '#94a3b8'],
      [220, accent],
      [260, '#94a3b8'],
      [160, '#16a34a'],
    ], '#7c3aed')}`,
  )
}

/** Benefits — the article's own five, as a checklist. */
INNER_IMAGES['how-to-send-a-system-generated-sms:benefits'] = () => {
  const bg = '#f0fdf4'
  const ink = '#166534'
  const accent = '#16a34a'

  const benefits = [
    'Trigger-to-delivery measured in seconds',
    'Same event always produces the same message',
    '10 texts or 10,000 — the code runs the same',
    'An OTP fires at 3 AM as reliably as 3 PM',
    'Proactive updates head off support tickets',
  ]

  const rows = benefits.map((t, i) => factRow(64, 246 + i * 62, ICONS.checkCircle, t, accent)).join('')

  return frame(
    bg,
    `${caps(64, 58, 'Why Automate', { fill: accent })}
    ${txt(60, 128, 'What You Get', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'in Return', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}`,
  )
}

/** Best practices — a checklist anchored by a shield motif. */
INNER_IMAGES['how-to-send-a-system-generated-sms:best-practices'] = () => {
  const bg = '#fffbeb'
  const ink = '#92400e'
  const accent = '#d97706'

  const practices = [
    'Get explicit opt-in before sending anything',
    'Always support a working STOP reply',
    'Keep templates short and specific',
    'Separate OTP from marketing sends',
  ]

  const rows = practices.map((t, i) => factRow(64, 246 + i * 62, ICONS.checkCircle, t, accent)).join('')

  return frame(
    bg,
    `${caps(64, 58, 'Stay Compliant', { fill: accent })}
    ${txt(60, 128, 'Best Practices', { size: 40, family: SERIF, fill: ink })}
    ${txt(60, 174, 'to Follow', { size: 40, family: SERIF, fill: accent })}
    ${rule(64, 190, 500)}
    ${rows}

    <circle cx="800" cy="350" r="140" fill="${WHITE}"/>
    ${ICONS.shieldCheck(800, 322, 62, accent)}
    ${caps(800, 504, 'Consent first', { anchor: 'middle', size: 20, fill: accent })}`,
  )
}

// ─────────────────────────────────────────────────────────────────── driver

async function main() {
  const want = process.argv.slice(2)
  const keys = want.length ? want : Object.keys(INNER_IMAGES)
  for (const key of keys) {
    const make = INNER_IMAGES[key]
    if (!make) {
      console.log(`· no inner image defined for ${key}`)
      continue
    }
    const [slug, id] = key.split(':')
    await fs.mkdir(path.join(OUT, slug), { recursive: true })
    await fs.writeFile(path.join(OUT, slug, `${id}.svg`), make())
    console.log(`✓ ${key}`)
  }
  console.log(`\n${Object.keys(INNER_IMAGES).length} inner images defined.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
