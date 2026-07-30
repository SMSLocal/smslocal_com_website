/**
 * One-off blog banners. Unlike gen-blog-covers.mjs there is no shared layout
 * engine here: each post gets its own function, composed for its own subject.
 *
 *   node scripts/gen-bespoke-covers.mjs [slug...]
 *
 * Design language taken from the reference banners on acepeak.com/blog:
 *   - a pale gradient wash, never a flat tint block, and nothing on any edge
 *   - editorial furniture: a centred serif headline over a hairline rule with
 *     a diamond ornament, small-caps tracked labels, a closing stat rule
 *   - a real illustrative prop (a projected US map with the relevant state
 *     picked out, leader-lined callouts) rather than an abstract card
 *   - serif display type for the subject, sans small-caps for the labels
 *   - no brand name, no year
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import US_MAP from './lib/us-map.generated.json' with { type: 'json' }

const OUT = path.join(import.meta.dirname, '..', 'public', 'blog')
const W = 1024
const H = 576

const SANS = "Geist, 'Segoe UI', system-ui, -apple-system, sans-serif"
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif"

/**
 * Numerals get their own stack. Georgia defaults to OLD-STYLE figures — 3 and
 * 5 drop below the baseline while 8 stands full height, so "385" renders as a
 * staircase and reads as a rendering fault. Times New Roman is put ahead of
 * Georgia here because its figures are lining, and `lnum` is requested
 * explicitly for any face that offers both sets.
 */
const SERIF_NUM = "'Instrument Serif', 'Times New Roman', Times, serif"
const LINING = `font-variant-numeric="lining-nums" font-feature-settings="'lnum' 1, 'onum' 0"`

const INK = '#101a33'
const SLATE = '#5b6478'
const HAIR = '#d9dfe9'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const txt = (x, y, t, o = {}) => {
  const {
    size = 20, fill = INK, weight = 400, family = SANS, anchor = 'start', spacing = 0, opacity = 1,
  } = o
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}"
    fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}" opacity="${opacity}" ${LINING}>${esc(t)}</text>`
}

/** A serif number — same as txt() but on the lining-figure stack. */
const num = (x, y, t, o = {}) => txt(x, y, t, { family: SERIF_NUM, ...o })

const rule = (x, y, w, fill = HAIR, h = 1.4) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`

/** Centred serif headline over a split hairline with a diamond in the gap. */
const masthead = (t, accent, y = 60) => `
  ${txt(W / 2, y, t, { size: 44, family: SERIF, anchor: 'middle', fill: INK })}
  ${rule(206, y + 26, 220)}
  ${rule(598, y + 26, 220)}
  <rect x="${W / 2 - 7}" y="${y + 20}" width="14" height="14" transform="rotate(45 ${W / 2} ${y + 27})" fill="${accent}"/>`

/** Small-caps tracked label — the reference uses these for every annotation. */
const caps = (x, y, t, o = {}) =>
  txt(x, y, t.toUpperCase(), { size: 23, weight: 700, spacing: 2, fill: SLATE, ...o })

/** Pastel state fills, cycled so neighbouring states never share one. */
const STATE_TINTS = ['#cdd8f7', '#c9efe2', '#f9d4e6', '#ded5fa', '#fde0d8', '#d3e8fa', '#fbe9c9']

/**
 * The projected lower-48 map, scaled into a box, with `highlight` picked out.
 * Returns the svg plus the highlighted state's centre so callers can pin it.
 */
function usMap({ x, y, w, highlight, accent }) {
  const scale = w / 1000
  const names = Object.keys(US_MAP.states)
  const paths = names
    .map((n, i) => {
      const on = n === highlight
      return `<path d="${US_MAP.states[n].d}" fill="${on ? accent : STATE_TINTS[i % STATE_TINTS.length]}"
        stroke="#ffffff" stroke-width="${on ? 3 : 2.2}" opacity="${on ? 1 : 0.85}"/>`
    })
    .join('')
  const s = US_MAP.states[highlight]
  return {
    h: 620 * scale,
    cx: x + s.cx * scale,
    cy: y + s.cy * scale,
    svg: `<g transform="translate(${x}, ${y}) scale(${scale})">${paths}</g>`,
  }
}

/** Bounds of one of the generated state paths ("M x,y L x,y … Z"). */
function pathBounds(d) {
  const n = d.match(/-?\d+(?:\.\d+)?/g).map(Number)
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (let i = 0; i < n.length; i += 2) {
    if (n[i] < minX) minX = n[i]
    if (n[i] > maxX) maxX = n[i]
    if (n[i + 1] < minY) minY = n[i + 1]
    if (n[i + 1] > maxY) maxY = n[i + 1]
  }
  return { minX, minY, maxX, maxY }
}

/**
 * A zoomed map of just a few neighbouring states — the reference uses this
 * where a national map would make the subject a speck.
 */
function regionMap({ x, y, w, h, states, highlight, accent, labelHighlight = true }) {
  let b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  for (const n of states) {
    const s = pathBounds(US_MAP.states[n].d)
    b = {
      minX: Math.min(b.minX, s.minX), minY: Math.min(b.minY, s.minY),
      maxX: Math.max(b.maxX, s.maxX), maxY: Math.max(b.maxY, s.maxY),
    }
  }
  const scale = Math.min(w / (b.maxX - b.minX), h / (b.maxY - b.minY))
  const ox = x + (w - (b.maxX - b.minX) * scale) / 2 - b.minX * scale
  const oy = y + (h - (b.maxY - b.minY) * scale) / 2 - b.minY * scale
  const at = (n) => ({
    cx: ox + US_MAP.states[n].cx * scale,
    cy: oy + US_MAP.states[n].cy * scale,
  })
  const paths = states
    .map((n, i) => {
      const on = n === highlight
      return `<path d="${US_MAP.states[n].d}" fill="${on ? accent : STATE_TINTS[i % STATE_TINTS.length]}"
        stroke="#ffffff" stroke-width="${(on ? 3.4 : 2.4) / scale}" opacity="${on ? 1 : 0.8}"/>`
    })
    .join('')
  const c = at(highlight)
  return {
    at,
    cx: c.cx,
    cy: c.cy,
    svg: `<g transform="translate(${ox}, ${oy}) scale(${scale})">${paths}</g>
      ${labelHighlight ? caps(c.cx, c.cy + 8, highlight, { anchor: 'middle', size: 21, fill: '#ffffff' }) : ''}`,
  }
}

/** The Hawaiian chain, which has no useful place on a lower-48 map. */
function hawaiiMap({ x, y, w, accent }) {
  const b = pathBounds(US_MAP.hawaii.d)
  const scale = w / (b.maxX - b.minX)
  const ox = x - b.minX * scale
  const oy = y - b.minY * scale
  return {
    h: (b.maxY - b.minY) * scale,
    svg: `<g transform="translate(${ox}, ${oy}) scale(${scale})">
      <path d="${US_MAP.hawaii.d}" fill="${accent}" stroke="#ffffff" stroke-width="${2.4 / scale}"/>
    </g>`,
  }
}

/**
 * A handset at true 9:19.5 proportions. `screen(sx, sy, sw, sh)` draws the
 * display; the shell stays light so it works on a pale wash.
 */
function phone({ x, y, h, screen, tint = '#f6f8fc' }) {
  const w = Math.round(h * 0.462)
  const bez = Math.max(10, w * 0.048)
  const sx = x + bez
  const sy = y + bez
  const sw = w - bez * 2
  const sh = h - bez * 2
  return {
    w,
    svg: `
    <rect x="${x - 3}" y="${y + h * 0.27}" width="4.5" height="${h * 0.06}" rx="2.2" fill="#dfe4ec"/>
    <rect x="${x - 3}" y="${y + h * 0.355}" width="4.5" height="${h * 0.09}" rx="2.2" fill="#dfe4ec"/>
    <rect x="${x + w - 1.5}" y="${y + h * 0.31}" width="4.5" height="${h * 0.115}" rx="2.2" fill="#dfe4ec"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.17}" fill="#ffffff"
          stroke="${HAIR}" stroke-width="3"/>
    <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="${w * 0.13}" fill="${tint}"/>
    ${screen(sx, sy, sw, sh)}
    <rect x="${sx + sw / 2 - sw * 0.15}" y="${sy + 11}" width="${sw * 0.3}" height="${bez * 1.1}"
          rx="${bez * 0.55}" fill="#cdd4e0"/>
    <rect x="${sx + sw / 2 - sw * 0.17}" y="${sy + sh - 15}" width="${sw * 0.34}" height="5.5"
          rx="2.75" fill="#cdd4e0"/>`,
  }
}

/** Acrostic: the acronym down the page, each letter against the word it stands for. */
function letterStack({ x, y, term, words, accent, step = 74, size = 62 }) {
  return [...term]
    .map((ch, i) => {
      const ly = y + i * step
      return `${txt(x, ly, ch, { size, family: SERIF, fill: accent })}
        ${rule(x + 58, ly - 18, 26, HAIR, 2)}
        ${txt(x + 98, ly - 8, words[i] ?? '', { size: 34, family: SERIF, fill: INK })}`
    })
    .join('')
}

/** Six one-time-password boxes, the last still empty. */
function codeBoxes({ x, y, digits, accent, box = 62, gap = 14 }) {
  return [...digits]
    .map((d, i) => {
      const bx = x + i * (box + gap)
      const filled = d !== '_'
      return `<rect x="${bx}" y="${y}" width="${box}" height="${box + 12}" rx="14"
        fill="${filled ? '#ffffff' : 'none'}" stroke="${filled ? accent : HAIR}" stroke-width="${filled ? 3 : 2.4}"/>
        ${filled ? num(bx + box / 2, y + box - 4, d, { size: 40, fill: INK, anchor: 'middle' }) : ''}`
    })
    .join('')
}

/** A clock face, for the posts about timing and sign-offs. */
function clockDial({ cx, cy, r, accent, hourAngle = -60, minuteAngle = 30 }) {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 - 90) * (Math.PI / 180)
    const r1 = r - 14
    const r2 = i % 3 === 0 ? r - 30 : r - 24
    return `<line x1="${cx + Math.cos(a) * r1}" y1="${cy + Math.sin(a) * r1}"
      x2="${cx + Math.cos(a) * r2}" y2="${cy + Math.sin(a) * r2}"
      stroke="${i % 3 === 0 ? accent : HAIR}" stroke-width="${i % 3 === 0 ? 4 : 2.4}" stroke-linecap="round"/>`
  }).join('')
  const hand = (deg, len, wid, col) => {
    const a = (deg - 90) * (Math.PI / 180)
    return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * len}" y2="${cy + Math.sin(a) * len}"
      stroke="${col}" stroke-width="${wid}" stroke-linecap="round"/>`
  }
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${HAIR}" stroke-width="3"/>
    ${ticks}
    ${hand(hourAngle, r * 0.48, 7, INK)}
    ${hand(minuteAngle, r * 0.7, 5, accent)}
    <circle cx="${cx}" cy="${cy}" r="7" fill="${accent}"/>`
}

/** A labelled scale with a marker — for "how strong / how warm does this read". */
function meter({ x, y, w, from, to, at, accent, label }) {
  return `
    <defs><linearGradient id="mtr${Math.round(x)}" x1="0" x2="1">
      <stop offset="0%" stop-color="${HAIR}"/><stop offset="100%" stop-color="${accent}"/>
    </linearGradient></defs>
    <rect x="${x}" y="${y}" width="${w}" height="14" rx="7" fill="url(#mtr${Math.round(x)})"/>
    <circle cx="${x + w * at}" cy="${y + 7}" r="17" fill="#ffffff" stroke="${accent}" stroke-width="5"/>
    ${caps(x, y + 52, from, { size: 20, fill: SLATE })}
    ${caps(x + w, y + 52, to, { size: 20, fill: SLATE, anchor: 'end' })}
    ${label ? caps(x + w * at, y - 26, label, { size: 21, fill: accent, anchor: 'middle' }) : ''}`
}

/** Two readings of the same word, as a fork. */
function fork({ x, y, w, stem, branches, accent }) {
  const midY = y + 96
  return `
    ${txt(x, y, stem, { size: 62, family: SERIF, fill: INK })}
    <path d="M${x + 26},${y + 18} L${x + 26},${midY} L${x + w},${midY}" fill="none"
          stroke="${HAIR}" stroke-width="2.4"/>
    ${branches
      .map(([k, v], i) => {
        const by = midY + 4 + i * 104
        return `<path d="M${x + 26},${midY} L${x + 26},${by} L${x + 74},${by}" fill="none"
            stroke="${i === 0 ? accent : HAIR}" stroke-width="2.6"/>
          <circle cx="${x + 26}" cy="${by}" r="7" fill="${i === 0 ? accent : SLATE}"/>
          ${txt(x + 92, by + 12, k, { size: 38, family: SERIF, fill: i === 0 ? accent : INK })}
          ${caps(x + 92, by + 46, v, { size: 20, fill: SLATE })}`
      })
      .join('')}`
}

/** Chat bubbles down a column, alternating sides. */
function thread({ x, y, w, items, accent, gap = 22 }) {
  let cy = y
  return items
    .map(([side, text, size = 30]) => {
      const bw = Math.min(w, 60 + text.length * size * 0.5)
      const bh = size + 46
      const bx = side === 'in' ? x : x + w - bw
      const fill = side === 'in' ? '#ffffff' : accent
      const col = side === 'in' ? INK : '#ffffff'
      const svg = `<rect x="${bx}" y="${cy}" width="${bw}" height="${bh}" rx="${Math.min(30, bh / 2)}"
          fill="${fill}" ${side === 'in' ? `stroke="${HAIR}" stroke-width="2.4"` : ''}/>
        ${txt(bx + bw / 2, cy + bh / 2 + size * 0.35, text, { size, family: SERIF, fill: col, anchor: 'middle' })}`
      cy += bh + gap
      return svg
    })
    .join('')
}

/** Circular icon badges with leader lines, as on the reference's 219 banner. */
function badgeColumn({ x, y, items, accent, step = 96, r = 34 }) {
  return items
    .map((t, i) => {
      const by = y + i * step
      return `<path d="M${x - 58},${by} L${x - r - 6},${by}" stroke="${HAIR}" stroke-width="2.2" fill="none"/>
        <circle cx="${x}" cy="${by}" r="${r}" fill="#ffffff" stroke="${accent}" stroke-width="3"/>
        <circle cx="${x}" cy="${by}" r="${r * 0.3}" fill="${accent}"/>
        ${txt(x + r + 20, by + 10, t, { size: 27, family: SERIF, fill: INK })}`
    })
    .join('')
}

/** A left-to-right flow of labelled nodes, as on the reference's UCaaS banner. */
function flow({ x, y, items, accent, boxW = 176, boxH = 84, gap = 44 }) {
  return items
    .map(([t, sub], i) => {
      const bx = x + i * (boxW + gap)
      const last = i === items.length - 1
      const arrow = last
        ? ''
        : `<path d="M${bx + boxW + 10},${y + boxH / 2} L${bx + boxW + gap - 14},${y + boxH / 2}"
             stroke="${HAIR}" stroke-width="2.6" fill="none"/>
           <polyline points="${bx + boxW + gap - 24},${y + boxH / 2 - 8} ${bx + boxW + gap - 12},${y + boxH / 2} ${bx + boxW + gap - 24},${y + boxH / 2 + 8}"
             stroke="${HAIR}" stroke-width="2.6" fill="none"/>`
      return `<rect x="${bx}" y="${y}" width="${boxW}" height="${boxH}" rx="22"
          fill="${last ? accent : '#ffffff'}" stroke="${last ? accent : HAIR}" stroke-width="2.6"/>
        ${txt(bx + boxW / 2, y + boxH / 2 + 2, t, { size: 29, family: SERIF, fill: last ? '#ffffff' : INK, anchor: 'middle' })}
        ${caps(bx + boxW / 2, y + boxH / 2 + 28, sub, { size: 17, fill: last ? '#ffffff' : SLATE, anchor: 'middle' })}
        ${arrow}`
    })
    .join('')
}

/**
 * A top-to-bottom flow of labelled nodes. The vertical form exists because the
 * right-hand column is ~390px wide — three boxes side by side there leaves no
 * room for a readable label inside each.
 */
function flowDown({ x, y, w, items, accent, boxH = 92, gap = 40 }) {
  return items
    .map(([t, sub], i) => {
      const by = y + i * (boxH + gap)
      const last = i === items.length - 1
      const arrow = last
        ? ''
        : `<path d="M${x + w / 2},${by + boxH + 8} L${x + w / 2},${by + boxH + gap - 12}"
             stroke="${HAIR}" stroke-width="2.6" fill="none"/>
           <polyline points="${x + w / 2 - 8},${by + boxH + gap - 22} ${x + w / 2},${by + boxH + gap - 10} ${x + w / 2 + 8},${by + boxH + gap - 22}"
             stroke="${HAIR}" stroke-width="2.6" fill="none"/>`
      return `<rect x="${x}" y="${by}" width="${w}" height="${boxH}" rx="24"
          fill="${last ? accent : '#ffffff'}" stroke="${last ? accent : HAIR}" stroke-width="2.6"/>
        ${txt(x + 30, by + 42, t, { size: 32, family: SERIF, fill: last ? '#ffffff' : INK })}
        ${caps(x + 30, by + 72, sub, { size: 20, fill: last ? '#ffffff' : SLATE })}
        ${arrow}`
    })
    .join('')
}

/** A simple column chart, for volume. */
function bars({ x, y, h, values, accent, barW = 26, gap = 14 }) {
  const max = Math.max(...values)
  return values
    .map((v, i) => {
      const bh = Math.max(8, (v / max) * h)
      return `<rect x="${x + i * (barW + gap)}" y="${y + h - bh}" width="${barW}" height="${bh}" rx="8"
        fill="${accent}" opacity="${0.3 + 0.7 * (v / max)}"/>`
    })
    .join('')
}

/** Rounded label tags in a row or column. */
function tags({ x, y, items, accent, size = 25, dir = 'col', step = 66 }) {
  let ox = x
  return items
    .map((t, i) => {
      const tw = 44 + t.length * size * 0.5
      const tx = dir === 'col' ? x : ox
      const ty = dir === 'col' ? y + i * step : y
      ox += tw + 16
      return `<rect x="${tx}" y="${ty}" width="${tw}" height="${size + 26}" rx="${(size + 26) / 2}"
        fill="#ffffff" stroke="${i === 0 ? accent : HAIR}" stroke-width="${i === 0 ? 3 : 2.2}"/>
        ${txt(tx + tw / 2, ty + size + 4, t, { size, family: SERIF, fill: i === 0 ? accent : INK, anchor: 'middle' })}`
    })
    .join('')
}

/** A ringed pin with a leader line out to a small-caps label. */
function pin({ cx, cy, label, accent, dir = 1 }) {
  const marker = `
    <circle cx="${cx}" cy="${cy}" r="24" fill="${accent}" opacity="0.16"/>
    <circle cx="${cx}" cy="${cy}" r="10" fill="${accent}" stroke="#ffffff" stroke-width="3.5"/>`

  // 'up' runs the leader vertically and centres the label over the marker —
  // the only safe option for a pin sitting near the right-hand margin.
  if (dir === 'up') {
    return `${marker}
      <path d="M${cx},${cy - 26} L${cx},${cy - 62}" stroke="${accent}" stroke-width="1.8" fill="none"/>
      ${caps(cx, cy - 74, label, { fill: INK, size: 22, anchor: 'middle' })}`
  }
  const lx = cx + 28 * dir
  const tx = lx + 58 * dir
  return `${marker}
    <path d="M${lx},${cy} L${tx},${cy}" stroke="${accent}" stroke-width="1.8" fill="none"/>
    ${caps(tx + 10 * dir, cy + 7, label, { fill: INK, size: 22, anchor: dir > 0 ? 'start' : 'end' })}`
}

/** The closing rule with evenly spaced stats, as on the reference banners. */
const statRule = (items, y = 514) => `
  ${rule(68, y, W - 136)}
  ${items
    .map((t, i) => {
      const step = (W - 136) / items.length
      const x = 68 + step * i + step / 2
      return caps(x, y + 40, t, { anchor: 'middle', size: 23, fill: SLATE })
    })
    .join('')}`

const frame = (body, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>${defs}</defs>
  ${body}
</svg>
`

/** A pale two-stop wash. Nothing hard-edged reaches the canvas boundary. */
const wash = (a, b) => `
  <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/>
  </linearGradient>
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </radialGradient>`

const washBg = `<rect width="${W}" height="${H}" fill="url(#wash)"/>
  <ellipse cx="512" cy="300" rx="620" ry="420" fill="url(#glow)"/>`

// ───────────────────────────────────────────────────────────── the banners

const BANNERS = {}

/** 385 — a state map with the code set as a serif numeral. */
BANNERS['385-area-code'] = () => {
  const accent = '#4f5bd5'
  const map = usMap({ x: 528, y: 152, w: 452, highlight: 'Utah', accent })
  return frame(
    `${washBg}
    ${masthead('Reach Utah with a 385 Number', accent)}
    ${caps(68, 178, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 320, '385', { size: 172, fill: INK })}
    ${txt(68, 376, 'Salt Lake City, Utah', { size: 42, family: SERIF, fill: INK })}
    ${caps(68, 416, 'Overlay of 801', { fill: accent, size: 22 })}
    ${rule(68, 442, 430)}
    ${txt(68, 486, 'Provo · Ogden · Sandy · Orem', { size: 28, family: SERIF, fill: SLATE })}
    ${map.svg}
    ${pin({ cx: map.cx, cy: map.cy, label: 'Salt Lake · 385', accent, dir: -1 })}
    ${statRule(['Mountain Time', 'Calls and texts'], 524)}`,
    wash('#f7f8ff', '#eef1fc'),
  )
}

/** FRL — a definition set as an editorial entry, no container. */
BANNERS['what-does-frl-mean-in-text'] = () => {
  const accent = '#d64584'
  return frame(
    `${washBg}
    ${masthead('A Short Word That Carries Weight', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 322, 'FRL', { size: 168, family: SERIF, fill: INK })}
    ${rule(68, 352, 320, accent, 3)}
    ${txt(68, 412, '“For real.”', { size: 50, family: SERIF, fill: accent })}
    ${txt(68, 460, 'Used to agree, and mean it.', { size: 28, family: SERIF, fill: SLATE })}

    ${caps(568, 186, 'How it reads', { fill: accent, size: 22 })}
    ${rule(568, 204, 388)}
    ${[
      ['Agreeing', '“FRL, that was the best.”'],
      ['Asking', '“FRL? You are serious?”'],
      ['Softening', '“FRL though, it was close.”'],
    ]
      .map(([k, v], i) => {
        const y = 256 + i * 84
        return `${rule(568, y - 14, 24, accent, 3)}
          ${caps(604, y - 6, k, { size: 22, fill: SLATE })}
          ${txt(568, y + 38, v, { size: 26, family: SERIF, fill: INK })}`
      })
      .join('')}
    ${statRule(['Casual register', 'Chat and social'], 514)}`,
    wash('#fffafd', '#fdeef5'),
  )
}

/** Message blocking — the failure state, drawn as the notice a phone shows. */
BANNERS['message-blocking-is-active'] = () => {
  const accent = '#e0575f'
  const pw = 222
  const ph = 396
  const px = 712
  const py = 106
  return frame(
    `${washBg}
    ${masthead('Why a Text Refuses to Send', accent)}
    ${caps(68, 182, 'Troubleshooting', { fill: accent, size: 22 })}
    ${txt(68, 268, 'Message', { size: 88, family: SERIF, fill: INK })}
    ${txt(68, 350, 'Blocking', { size: 88, family: SERIF, fill: accent })}
    ${rule(68, 384, 380)}
    ${txt(68, 430, 'The carrier stopped it — not your phone.', { size: 28, family: SERIF, fill: SLATE })}
    ${[
      'Texting not provisioned on the plan',
      'The number or short code is blocked',
    ]
      .map((t, i) => {
        const y = 470 + i * 34
        return `<circle cx="77" cy="${y - 8}" r="5" fill="${accent}"/>
          ${txt(100, y, t, { size: 26, family: SERIF, fill: SLATE })}`
      })
      .join('')}

    ${/* A handset at true 9:19.5, showing the notice it actually puts up. */ ''}
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="36" fill="#ffffff"
          stroke="${HAIR}" stroke-width="3"/>
    <rect x="${px + 11}" y="${py + 11}" width="${pw - 22}" height="${ph - 22}" rx="26" fill="#fdf6f6"/>
    <rect x="${px + pw / 2 - 30}" y="${py + 22}" width="60" height="11" rx="5.5" fill="#e6d9d9"/>
    <rect x="${px + 28}" y="${py + 62}" width="${pw - 104}" height="40" rx="17" fill="#edf0f5"/>
    <rect x="${px + 76}" y="${py + 116}" width="${pw - 104}" height="40" rx="17" fill="${accent}"/>
    <g transform="translate(${px + pw - 46}, ${py + 176})">
      <circle cx="0" cy="0" r="15" fill="${accent}"/>
      <rect x="-2" y="-7" width="4" height="9" rx="2" fill="#ffffff"/>
      <circle cx="0" cy="6" r="2.4" fill="#ffffff"/>
    </g>
    ${caps(px + pw / 2, py + 236, 'Not delivered', { anchor: 'middle', size: 20, fill: accent })}
    ${txt(px + pw / 2, py + 278, 'Message blocking', { size: 23, family: SERIF, fill: SLATE, anchor: 'middle' })}
    ${txt(px + pw / 2, py + 306, 'is active', { size: 23, family: SERIF, fill: SLATE, anchor: 'middle' })}
    <rect x="${px + pw / 2 - 34}" y="${py + ph - 38}" width="68" height="6" rx="3" fill="#e6d9d9"/>

    ${/* Leader runs left: a label on the phone's right ran off the canvas. */ ''}
    <path d="M${px - 18},${py + 176} L${px - 74},${py + 176}" stroke="${accent}" stroke-width="1.8" fill="none"/>
    <circle cx="${px - 18}" cy="${py + 176}" r="5.5" fill="${accent}"/>
    ${caps(px - 86, py + 184, 'Carrier block', { anchor: 'end', size: 22, fill: INK })}
    ${statRule(['Check the plan', 'Then the block list'], 506)}`,
    wash('#fffbfa', '#fdeeed'),
  )
}

/* ── Area codes ─────────────────────────────────────────────────────────── */

/** 216 — mirrored: national map on the left, the code set large on the right. */
BANNERS['216-area-code'] = () => {
  const accent = '#2563a8'
  const map = usMap({ x: 34, y: 158, w: 452, highlight: 'Ohio', accent })
  return frame(
    `${washBg}
    ${masthead('A Cleveland Number, Anywhere', accent)}
    ${map.svg}
    ${pin({ cx: map.cx, cy: map.cy, label: 'Cleveland', accent, dir: 'up' })}
    ${caps(956, 180, 'Area Code', { fill: accent, size: 22, anchor: 'end' })}
    ${num(960, 322, '216', { size: 172, fill: INK, anchor: 'end' })}
    ${txt(956, 378, 'Cleveland, Ohio', { size: 42, family: SERIF, fill: INK, anchor: 'end' })}
    ${rule(526, 406, 430)}
    ${txt(956, 448, 'Lakewood · Parma · Euclid', { size: 28, family: SERIF, fill: SLATE, anchor: 'end' })}
    ${statRule(['Eastern Time', 'Northeast Ohio'], 502)}`,
    wash('#f6faff', '#e9f2fb'),
  )
}

/** 252 — a zoomed regional map, because the coast is the point. */
BANNERS['252-area-code'] = () => {
  const accent = '#0f7d6b'
  const map = regionMap({
    x: 528, y: 150, w: 430, h: 300,
    states: ['Virginia', 'North Carolina', 'South Carolina'],
    highlight: 'North Carolina', accent, labelHighlight: false,
  })
  return frame(
    `${washBg}
    ${masthead('The Coast Side of North Carolina', accent)}
    ${caps(68, 180, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 324, '252', { size: 172, fill: INK })}
    ${txt(68, 382, 'Inner & Outer Banks', { size: 42, family: SERIF, fill: INK })}
    ${caps(68, 422, 'Split from 919', { fill: accent, size: 22 })}
    ${rule(68, 448, 430)}
    ${txt(68, 492, 'Greenville · Rocky Mount · Nags Head', { size: 26, family: SERIF, fill: SLATE })}
    ${map.svg}
    ${pin({ cx: map.cx, cy: map.cy, label: 'Eastern NC', accent, dir: 'up' })}
    ${statRule(['Eastern Time', 'Ten-digit dialling'], 526)}`,
    wash('#f5fdfb', '#e6f6f2'),
  )
}

/** 469 — the code that shares its ground with two others. */
BANNERS['469-area-code'] = () => {
  const accent = '#c2410c'
  const map = usMap({ x: 528, y: 158, w: 448, highlight: 'Texas', accent })
  return frame(
    `${washBg}
    ${masthead('Three Codes, One Dallas', accent)}
    ${caps(68, 180, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 324, '469', { size: 172, fill: INK })}
    ${txt(68, 382, 'Dallas, Northeast Texas', { size: 40, family: SERIF, fill: INK })}
    ${rule(68, 412, 430)}
    ${caps(68, 452, 'Shares the ground with', { size: 21, fill: SLATE })}
    ${tags({ x: 68, y: 470, items: ['214', '972'], accent, dir: 'row', size: 26 })}
    ${map.svg}
    ${pin({ cx: map.cx + 30, cy: map.cy - 46, label: 'Dallas · 469', accent, dir: 'up' })}
    ${statRule(['Central Time', 'Overlay plan'], 526)}`,
    wash('#fffaf6', '#fdefe4'),
  )
}

/** 626 — a city list is the subject, so the type carries it and the map supports. */
BANNERS['626-area-code'] = () => {
  const accent = '#7c3aed'
  const map = regionMap({
    x: 566, y: 170, w: 380, h: 280,
    states: ['California', 'Nevada', 'Arizona'],
    highlight: 'California', accent, labelHighlight: false,
  })
  return frame(
    `${washBg}
    ${masthead('The San Gabriel Valley Code', accent)}
    ${caps(68, 178, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 316, '626', { size: 168, fill: INK })}
    ${rule(68, 344, 420, accent, 3)}
    ${['Pasadena', 'El Monte', 'West Covina', 'Alhambra']
      .map((c, i) => txt(68, 396 + i * 40, c, { size: 30, family: SERIF, fill: i === 0 ? INK : SLATE }))
      .join('')}
    ${map.svg}
    ${pin({ cx: map.at('California').cx + 46, cy: map.at('California').cy + 62, label: 'Los Angeles', accent, dir: 'up' })}
    ${statRule(['Pacific Time', 'Los Angeles County'], 526)}`,
    wash('#fbf8ff', '#f1eafd'),
  )
}

/** 801 — two codes over one region, drawn as a pair. */
BANNERS['801-area-code'] = () => {
  const accent = '#1d4ed8'
  const map = regionMap({
    x: 596, y: 186, w: 340, h: 250,
    states: ['Utah', 'Nevada', 'Colorado', 'Wyoming'],
    highlight: 'Utah', accent, labelHighlight: false,
  })
  return frame(
    `${washBg}
    ${masthead('Utah’s Original Area Code', accent)}
    ${caps(68, 180, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 320, '801', { size: 172, fill: INK })}
    ${rule(68, 350, 400)}
    ${caps(68, 390, 'Now overlaid by', { size: 21, fill: SLATE })}
    ${num(68, 460, '385', { size: 64, fill: accent })}
    ${txt(190, 454, 'same region, same dialling', { size: 27, family: SERIF, fill: SLATE })}
    ${map.svg}
    ${pin({ cx: map.cx, cy: map.cy, label: 'Wasatch Front', accent, dir: 'up' })}
    ${statRule(['Mountain Time', 'Ten-digit dialling'], 512)}`,
    wash('#f7f9ff', '#eaf0fe'),
  )
}

/** 913 — a state-line story: one metro, two states. */
BANNERS['913-area-code'] = () => {
  const accent = '#0e7490'
  const map = usMap({ x: 528, y: 152, w: 448, highlight: 'Kansas', accent })
  return frame(
    `${washBg}
    ${masthead('One Metro, Either Side of a Line', accent)}
    ${caps(68, 178, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 320, '913', { size: 172, fill: INK })}
    ${txt(68, 376, 'Kansas City, Kansas', { size: 40, family: SERIF, fill: INK })}
    ${rule(68, 406, 420)}
    ${txt(68, 448, 'Overland Park · Olathe · Lenexa', { size: 27, family: SERIF, fill: SLATE })}
    ${map.svg}
    ${pin({ cx: map.cx + 34, cy: map.cy - 6, label: 'Kansas City', accent, dir: 'up' })}
    ${statRule(['Central Time', 'Northeast Kansas'], 502)}`,
    wash('#f5fcfe', '#e6f4f9'),
  )
}

/** 971 — an overlay pair, shown as two codes sharing one outline. */
BANNERS['971-area-code'] = () => {
  const accent = '#b45309'
  const map = regionMap({
    x: 588, y: 180, w: 350, h: 258,
    states: ['California', 'Nevada', 'Oregon'],
    highlight: 'California', accent, labelHighlight: false,
  })
  return frame(
    `${washBg}
    ${masthead('An Overlay for a Growing Region', accent)}
    ${caps(68, 178, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 318, '971', { size: 168, fill: INK })}
    ${txt(68, 372, 'Sacramento', { size: 42, family: SERIF, fill: INK })}
    ${rule(68, 402, 410)}
    ${caps(68, 440, 'Runs alongside', { size: 21, fill: SLATE })}
    ${num(68, 506, '916', { size: 58, fill: accent })}
    ${txt(180, 500, 'no split, no renumbering', { size: 26, family: SERIF, fill: SLATE })}
    ${map.svg}
    ${pin({ cx: map.at('California').cx + 20, cy: map.at('California').cy - 60, label: 'Sacramento', accent, dir: 'up' })}`,
    wash('#fffcf5', '#fdf2e3'),
  )
}

/** 808 — the island chain, drawn from its own projection. */
BANNERS['exploring-the-808-area-code'] = () => {
  const accent = '#0d9488'
  const isles = hawaiiMap({ x: 528, y: 236, w: 430, accent })
  return frame(
    `${washBg}
    ${masthead('One Code for Every Island', accent)}
    ${caps(68, 180, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 324, '808', { size: 172, fill: INK })}
    ${txt(68, 382, 'All of Hawaii', { size: 44, family: SERIF, fill: INK })}
    ${rule(68, 412, 420)}
    ${txt(68, 456, 'Honolulu · Hilo · Kahului · Lihue', { size: 27, family: SERIF, fill: SLATE })}
    ${isles.svg}
    ${caps(956, 200, 'Statewide', { anchor: 'end', size: 22, fill: accent })}
    ${caps(956, 468, 'Hawaii–Aleutian Time', { anchor: 'end', size: 21, fill: SLATE })}
    ${statRule(['No overlay code', 'Ten-digit dialling'], 512)}`,
    wash('#f4fdfb', '#e4f6f3'),
  )
}

/** 770 — the suburban ring, drawn as a ring around the metro. */
BANNERS['unlocking-the-770-area-code'] = () => {
  const accent = '#9333ea'
  const cx = 762
  const cy = 300
  return frame(
    `${washBg}
    ${masthead('The Ring Around Atlanta', accent)}
    ${caps(68, 180, 'Area Code', { fill: accent, size: 22 })}
    ${num(68, 324, '770', { size: 172, fill: INK })}
    ${txt(68, 382, 'Atlanta’s Suburbs', { size: 42, family: SERIF, fill: INK })}
    ${rule(68, 412, 420)}
    ${txt(68, 456, 'Marietta · Roswell · Duluth', { size: 27, family: SERIF, fill: SLATE })}

    ${/* Concentric ring: the metro core inside, 770 wrapping it. */ ''}
    <circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="10 12" opacity="0.55"/>
    <circle cx="${cx}" cy="${cy}" r="112" fill="#ffffff" stroke="${HAIR}" stroke-width="2.6"/>
    <circle cx="${cx}" cy="${cy}" r="60" fill="${accent}" opacity="0.14"/>
    ${num(cx, cy + 12, '404', { size: 46, fill: SLATE, anchor: 'middle' })}
    ${caps(cx, cy + 44, 'Core', { size: 19, fill: SLATE, anchor: 'middle' })}
    ${num(cx, cy - 168, '770', { size: 40, fill: accent, anchor: 'middle' })}
    ${caps(cx, cy + 196, 'Suburban ring', { size: 21, fill: accent, anchor: 'middle' })}
    ${statRule(['Eastern Time', 'Metro Georgia'], 512)}`,
    wash('#fdfaff', '#f5ecfe'),
  )
}

/** 22395 — a five-digit sender, shown on the handset it arrives on. */
/**
 * v2 — dropped the phone-screen prop for a digit-ticket motif: each of the
 * five digits gets its own torn stub, the way a claim ticket separates a
 * number from its stub. No handset anywhere, unlike the first pass.
 */
BANNERS['22395-short-code'] = () => {
  const accent = '#0369a1'
  const digits = ['2', '2', '3', '9', '5']
  const stubX = 588
  const stubY = 150
  const stubW = 68
  const stubH = 300
  const gap = 14

  const stubs = digits
    .map((d, i) => {
      const x = stubX + i * (stubW + gap)
      const mid = stubY + stubH * 0.42
      return `
      <rect x="${x}" y="${stubY}" width="${stubW}" height="${stubH}" rx="16" fill="#ffffff"
            stroke="${HAIR}" stroke-width="2.4"/>
      <circle cx="${x + stubW / 2}" cy="${mid}" r="7" fill="#eef6fc"/>
      <line x1="${x + 12}" y1="${mid}" x2="${x + stubW - 12}" y2="${mid}"
            stroke="${HAIR}" stroke-width="2" stroke-dasharray="5 6"/>
      ${num(x + stubW / 2, stubY + stubH * 0.24, d, { size: 46, fill: accent, anchor: 'middle' })}
      ${caps(x + stubW / 2, stubY + stubH - 24, `${i + 1}`, { size: 20, fill: SLATE, anchor: 'middle' })}`
    })
    .join('')

  const spanW = digits.length * (stubW + gap) - gap

  return frame(
    `${washBg}
    ${masthead('Five Digits, No Area Code', accent)}
    ${caps(68, 176, 'Short Code', { fill: accent, size: 22 })}
    ${txt(68, 302, 'One Sender.', { size: 58, family: SERIF, fill: INK })}
    ${txt(68, 366, 'Every Recipient.', { size: 58, family: SERIF, fill: accent })}
    ${rule(68, 396, 460)}
    ${txt(68, 440, 'A short code skips the area code', { size: 26, family: SERIF, fill: SLATE })}
    ${txt(68, 474, 'entirely — five digits reach anyone.', { size: 26, family: SERIF, fill: SLATE })}

    ${stubs}
    ${caps(stubX + spanW / 2, stubY - 24, 'Same number, every time', { size: 19, fill: accent, anchor: 'middle' })}

    ${statRule(['Two-way capable', 'Reply STOP to leave'], 500)}`,
    wash('#f6fbff', '#e8f3fb'),
  )
}

/* ── Acronyms ───────────────────────────────────────────────────────────── */

/** DW — a reassurance, so the art is the exchange that produces it. */
BANNERS['what-does-dw-mean-in-text'] = () => {
  const accent = '#2563eb'
  return frame(
    `${washBg}
    ${masthead('The Two Letters That Calm Things Down', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 330, 'DW', { size: 170, family: SERIF, fill: INK })}
    ${rule(68, 360, 300, accent, 3)}
    ${txt(68, 420, '“Don’t worry.”', { size: 50, family: SERIF, fill: accent })}
    ${txt(68, 466, 'Said to take the weight off.', { size: 28, family: SERIF, fill: SLATE })}
    ${thread({
      x: 560, y: 152, w: 396, accent,
      items: [['in', 'I think I broke it', 26], ['out', 'DW, easy fix', 28], ['in', 'You are the best', 24]],
    })}
    ${statRule(['Casual register', 'Reassuring'], 508)}`,
    wash('#f7faff', '#eaf1fe'),
  )
}

/** IG — one abbreviation, two unrelated readings: a fork. */
BANNERS['what-does-ig-mean'] = () => {
  const accent = '#db2777'
  return frame(
    `${washBg}
    ${masthead('Same Two Letters, Two Meanings', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 322, 'IG', { size: 168, family: SERIF, fill: INK })}
    ${rule(68, 352, 300, accent, 3)}
    ${txt(68, 404, 'Context decides which', { size: 34, family: SERIF, fill: SLATE })}
    ${txt(68, 446, 'one you are reading.', { size: 34, family: SERIF, fill: SLATE })}
    ${fork({
      x: 588, y: 196, w: 340, accent,
      stem: 'IG',
      branches: [['I guess', 'Reluctant agreement'], ['Instagram', 'The platform']],
    })}
    ${statRule(['Very common', 'Read the sentence'], 512)}`,
    wash('#fff8fb', '#fdecf4'),
  )
}

/** ISTG — an acrostic; the letters are the whole phrase. */
BANNERS['what-does-istg-mean'] = () => {
  const accent = '#b91c1c'
  return frame(
    `${washBg}
    ${masthead('Four Letters, One Emphatic Promise', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 310, 'ISTG', { size: 150, family: SERIF, fill: INK })}
    ${rule(68, 340, 360, accent, 3)}
    ${txt(68, 396, 'Used to stress you mean it —', { size: 28, family: SERIF, fill: SLATE })}
    ${txt(68, 434, 'and often, to joke.', { size: 28, family: SERIF, fill: SLATE })}
    ${letterStack({ x: 610, y: 200, term: 'ISTG', words: ['I', 'Swear', 'To', 'God'], accent, step: 76, size: 58 })}
    ${statRule(['Strong emphasis', 'Often playful'], 512)}`,
    wash('#fffafa', '#fdeeee'),
  )
}

/** LWK — "lowkey" is a volume setting, so the art is a dial. */
BANNERS['what-does-lwk-mean-in-text'] = () => {
  const accent = '#0d9488'
  return frame(
    `${washBg}
    ${masthead('Saying It, But Quietly', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 328, 'LWK', { size: 164, family: SERIF, fill: INK })}
    ${rule(68, 358, 320, accent, 3)}
    ${txt(68, 416, '“Lowkey.”', { size: 50, family: SERIF, fill: accent })}
    ${txt(68, 462, 'Softens whatever follows.', { size: 28, family: SERIF, fill: SLATE })}
    ${caps(566, 216, 'How loud it reads', { size: 21, fill: SLATE })}
    ${meter({ x: 566, y: 268, w: 380, from: 'Lowkey', to: 'Highkey', at: 0.24, accent, label: 'LWK' })}
    ${txt(566, 400, '“Lwk that was better.”', { size: 29, family: SERIF, fill: INK })}
    ${statRule(['Chat and social', 'Understatement'], 508)}`,
    wash('#f5fdfb', '#e5f6f3'),
  )
}

/** MB — two readings that could not be further apart. */
BANNERS['what-does-mb-mean'] = () => {
  const accent = '#ea580c'
  return frame(
    `${washBg}
    ${masthead('An Apology, or a Unit of Data', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 326, 'MB', { size: 168, family: SERIF, fill: INK })}
    ${rule(68, 356, 300, accent, 3)}
    ${txt(68, 412, '“My bad.”', { size: 50, family: SERIF, fill: accent })}
    ${txt(68, 458, 'Owning a small mistake.', { size: 28, family: SERIF, fill: SLATE })}
    ${fork({
      x: 588, y: 200, w: 340, accent,
      stem: 'MB',
      branches: [['My bad', 'In a conversation'], ['Megabyte', 'In a data plan']],
    })}
    ${statRule(['Quick apology', 'Reply: all good'], 512)}`,
    wash('#fffaf6', '#fdf0e6'),
  )
}

/** MK — the reply whose temperature is the whole question. */
BANNERS['what-does-mk-mean'] = () => {
  const accent = '#7c3aed'
  return frame(
    `${washBg}
    ${masthead('The Reply You Have to Read Twice', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 328, 'MK', { size: 170, family: SERIF, fill: INK })}
    ${rule(68, 358, 300, accent, 3)}
    ${txt(68, 416, '“Mmm, okay.”', { size: 46, family: SERIF, fill: accent })}
    ${txt(68, 462, 'Agreement, with a pause in it.', { size: 27, family: SERIF, fill: SLATE })}
    ${caps(566, 216, 'How it lands', { size: 21, fill: SLATE })}
    ${meter({ x: 566, y: 268, w: 380, from: 'Reluctant', to: 'Warm', at: 0.3, accent, label: 'MK' })}
    ${txt(566, 400, 'Tone does all the work.', { size: 29, family: SERIF, fill: INK })}
    ${statRule(['Easily misread', 'Add a word to soften'], 508)}`,
    wash('#fbf8ff', '#f1eafd'),
  )
}

/** NFS — three live readings, so three tags. */
BANNERS['what-does-nfs-mean-in-text'] = () => {
  const accent = '#0f766e'
  return frame(
    `${washBg}
    ${masthead('Three Readings, One Abbreviation', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 322, 'NFS', { size: 164, family: SERIF, fill: INK })}
    ${rule(68, 352, 320, accent, 3)}
    ${txt(68, 408, 'Listings, chats and posts', { size: 30, family: SERIF, fill: SLATE })}
    ${txt(68, 448, 'each pull it a different way.', { size: 30, family: SERIF, fill: SLATE })}
    ${caps(600, 200, 'Depending on where', { size: 21, fill: SLATE })}
    ${tags({ x: 600, y: 226, items: ['Not For Sale', 'Not For Sure', 'No Funny Stuff'], accent, size: 27, step: 76 })}
    ${statRule(['Marketplace and chat', 'Ask if unsure'], 512)}`,
    wash('#f4fcfa', '#e5f5f2'),
  )
}

/** OTP — a security code, so the art is the field you type it into. */
BANNERS['what-does-otp-mean-in-text'] = () => {
  const accent = '#1d4ed8'
  return frame(
    `${washBg}
    ${masthead('A Code That Works Once', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 322, 'OTP', { size: 164, family: SERIF, fill: INK })}
    ${rule(68, 352, 320, accent, 3)}
    ${txt(68, 408, '“One-time password.”', { size: 40, family: SERIF, fill: accent })}
    ${txt(68, 452, 'Also “one true pairing”, online.', { size: 27, family: SERIF, fill: SLATE })}
    ${caps(566, 216, 'Enter the code', { size: 21, fill: SLATE })}
    ${codeBoxes({ x: 566, y: 244, digits: '4192_', accent, box: 62, gap: 14 })}
    ${caps(566, 372, 'Expires in 10 minutes', { size: 20, fill: accent })}
    ${txt(566, 428, 'Never forward it to anyone.', { size: 27, family: SERIF, fill: INK })}
    ${statRule(['Security code', 'Also fandom slang'], 508)}`,
    wash('#f7f9ff', '#eaf0fe'),
  )
}

/** SMH — a gesture; the acrostic plus the motion it names. */
BANNERS['what-does-smh-mean-in-text'] = () => {
  const accent = '#c026d3'
  return frame(
    `${washBg}
    ${masthead('Disbelief, in Three Letters', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 324, 'SMH', { size: 164, family: SERIF, fill: INK })}
    ${rule(68, 354, 340, accent, 3)}
    ${txt(68, 412, 'A shrug you can type.', { size: 34, family: SERIF, fill: SLATE })}
    ${txt(68, 456, 'Mild, almost always.', { size: 34, family: SERIF, fill: SLATE })}
    ${letterStack({ x: 608, y: 236, term: 'SMH', words: ['Shaking', 'My', 'Head'], accent, step: 84, size: 60 })}
    ${statRule(['Mild exasperation', 'Very common'], 512)}`,
    wash('#fdf8fe', '#f9ecfb'),
  )
}

/** TBH — the word sits inside a sentence, so show it inline. */
BANNERS['what-does-tbh-mean'] = () => {
  const accent = '#0369a1'
  return frame(
    `${washBg}
    ${masthead('The Word That Prefaces Honesty', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 322, 'TBH', { size: 164, family: SERIF, fill: INK })}
    ${rule(68, 352, 320, accent, 3)}
    ${txt(68, 408, '“To be honest.”', { size: 46, family: SERIF, fill: accent })}
    ${txt(68, 452, 'A softener before a frank take.', { size: 27, family: SERIF, fill: SLATE })}
    ${caps(566, 210, 'In a sentence', { size: 21, fill: SLATE })}
    <rect x="566" y="238" width="390" height="4" rx="2" fill="${accent}" opacity="0.3"/>
    ${txt(566, 300, 'TBH,', { size: 44, family: SERIF, fill: accent })}
    ${txt(672, 300, 'I liked the', { size: 34, family: SERIF, fill: INK })}
    ${txt(566, 346, 'first one better.', { size: 34, family: SERIF, fill: INK })}
    <rect x="566" y="386" width="390" height="4" rx="2" fill="${accent}" opacity="0.3"/>
    ${caps(566, 434, 'Signals candour, not conflict', { size: 20, fill: SLATE })}
    ${statRule(['Chat and social', 'Softens the blow'], 508)}`,
    wash('#f6fbff', '#e8f3fb'),
  )
}

/** TS — the point is how many readings there are. */
BANNERS['what-does-ts-mean-in-text'] = () => {
  const accent = '#be123c'
  const items = ['This stuff', 'Tough situation', 'Talking stage', 'Take screenshot', 'Time stamp']
  return frame(
    `${washBg}
    ${masthead('Ten Readings and Counting', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 326, 'TS', { size: 170, family: SERIF, fill: INK })}
    ${rule(68, 356, 300, accent, 3)}
    ${txt(68, 414, 'Two letters doing far', { size: 32, family: SERIF, fill: SLATE })}
    ${txt(68, 454, 'too many jobs at once.', { size: 32, family: SERIF, fill: SLATE })}
    ${caps(560, 178, 'A few of them', { size: 21, fill: SLATE })}
    ${items
      .map((t, i) => {
        const y = 226 + i * 58
        return `${num(560, y, String(i + 1).padStart(2, '0'), { size: 24, fill: accent })}
          ${txt(614, y, t, { size: 30, family: SERIF, fill: INK })}
          ${rule(560, y + 18, 396)}`
      })
      .join('')}
    ${statRule(['Context decides', 'Ask if it matters'], 508)}`,
    wash('#fff8f9', '#fdeaee'),
  )
}

/** TTYL — a sign-off about time, so a clock carries it. */
BANNERS['what-does-ttyl-mean'] = () => {
  const accent = '#4338ca'
  return frame(
    `${washBg}
    ${masthead('Ending a Chat Without Closing It', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 316, 'TTYL', { size: 152, family: SERIF, fill: INK })}
    ${rule(68, 346, 360, accent, 3)}
    ${txt(68, 402, '“Talk to you later.”', { size: 42, family: SERIF, fill: accent })}
    ${txt(68, 448, 'A pause, not a goodbye.', { size: 28, family: SERIF, fill: SLATE })}
    ${clockDial({ cx: 780, cy: 288, r: 132, accent, hourAngle: 300, minuteAngle: 54 })}
    ${caps(780, 462, 'Later, not never', { size: 22, fill: accent, anchor: 'middle' })}
    ${statRule(['Friendly sign-off', 'Still in use'], 506)}`,
    wash('#f8f8ff', '#ecedfd'),
  )
}

/** TY — a two-beat exchange: thanks, and the reply to it. */
BANNERS['what-does-ty-mean'] = () => {
  const accent = '#15803d'
  return frame(
    `${washBg}
    ${masthead('The Shortest Way to Say Thanks', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 330, 'TY', { size: 172, family: SERIF, fill: INK })}
    ${rule(68, 360, 300, accent, 3)}
    ${txt(68, 420, '“Thank you.”', { size: 50, family: SERIF, fill: accent })}
    ${txt(68, 466, 'Two letters, whole gesture.', { size: 28, family: SERIF, fill: SLATE })}
    ${thread({
      x: 566, y: 176, w: 390, accent,
      items: [['in', 'Sent it over', 26], ['out', 'TY', 34], ['in', 'NP', 30]],
    })}
    ${statRule(['Quick gratitude', 'Reply: NP'], 508)}`,
    wash('#f6fdf8', '#e7f7ec'),
  )
}

/** WTW — an opener, so the art is the conversation starting. */
BANNERS['what-does-wtw-mean'] = () => {
  const accent = '#0e7490'
  return frame(
    `${washBg}
    ${masthead('How a Conversation Starts', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 326, 'WTW', { size: 162, family: SERIF, fill: INK })}
    ${rule(68, 356, 340, accent, 3)}
    ${txt(68, 412, '“What’s the word?”', { size: 42, family: SERIF, fill: accent })}
    ${txt(68, 458, 'An opener that wants a reply.', { size: 27, family: SERIF, fill: SLATE })}
    ${thread({ x: 566, y: 168, w: 390, accent, items: [['in', 'WTW tonight?', 30]] })}
    ${caps(566, 300, 'Answers that work', { size: 21, fill: SLATE })}
    ${tags({ x: 566, y: 326, items: ['Nothing much', 'Free after 8'], accent, size: 26, step: 74 })}
    ${statRule(['Greeting', 'Expects an answer'], 512)}`,
    wash('#f5fcfe', '#e6f4f9'),
  )
}

/** WYF — two readings that change the whole question. */
BANNERS['what-does-wyf-mean'] = () => {
  const accent = '#a21caf'
  return frame(
    `${washBg}
    ${masthead('Two Questions, One Abbreviation', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 324, 'WYF', { size: 164, family: SERIF, fill: INK })}
    ${rule(68, 354, 320, accent, 3)}
    ${txt(68, 412, 'One asks about you.', { size: 32, family: SERIF, fill: SLATE })}
    ${txt(68, 452, 'The other, about now.', { size: 32, family: SERIF, fill: SLATE })}
    ${fork({
      x: 578, y: 198, w: 350, accent,
      stem: 'WYF',
      branches: [['Where you from', 'Getting to know you'], ['What you feeling', 'Asking about now']],
    })}
    ${statRule(['Two readings', 'Context decides'], 512)}`,
    wash('#fdf7fd', '#f8eafa'),
  )
}

/** WYLL — a request for a photo, so a profile card is the prop. */
BANNERS['what-does-wyll-mean'] = () => {
  const accent = '#e11d48'
  const cx = 780
  return frame(
    `${washBg}
    ${masthead('The Question Behind the Ask', accent)}
    ${caps(68, 182, 'Text Slang', { fill: accent, size: 22 })}
    ${txt(68, 314, 'WYLL', { size: 148, family: SERIF, fill: INK })}
    ${rule(68, 344, 360, accent, 3)}
    ${txt(68, 400, '“What you look like.”', { size: 40, family: SERIF, fill: accent })}
    ${txt(68, 444, 'A request for a photo —', { size: 27, family: SERIF, fill: SLATE })}
    ${txt(68, 480, 'answer it on your terms.', { size: 27, family: SERIF, fill: SLATE })}

    ${/* A profile card with the photo slot deliberately empty. */ ''}
    <rect x="${cx - 138}" y="150" width="276" height="290" rx="30" fill="#ffffff" stroke="${HAIR}" stroke-width="3"/>
    <rect x="${cx - 112}" y="178" width="224" height="150" rx="20" fill="${accent}" opacity="0.09"/>
    <g stroke="${accent}" stroke-width="4" fill="none" stroke-linecap="round">
      <rect x="${cx - 34}" y="234" width="68" height="48" rx="10"/>
      <circle cx="${cx}" cy="258" r="15"/>
      <path d="M${cx - 16},234 L${cx - 8},224 L${cx + 8},224 L${cx + 16},234"/>
    </g>
    ${caps(cx, 366, 'Photo requested', { size: 19, fill: accent, anchor: 'middle' })}
    ${rule(cx - 96, 386, 192)}
    ${txt(cx, 420, 'Share only if you want to', { size: 21, family: SERIF, fill: SLATE, anchor: 'middle' })}
    ${statRule(['Dating apps and DMs', 'You can say no'], 500)}`,
    wash('#fff7f9', '#fdeaee'),
  )
}

/* ── The remaining topics ───────────────────────────────────────────────── */

/** Emoji — the same phrase read three ways. */
BANNERS['emoji-meaning-in-text'] = () => {
  const accent = '#d97706'
  const faces = [
    { dx: -140, fill: '#f59e0b', mouth: 'M-17,6 Q0,24 17,6', label: 'Warm' },
    { dx: 0, fill: '#8b93a7', mouth: 'M-17,13 L17,13', label: 'Flat' },
    { dx: 140, fill: '#6366f1', mouth: 'M-17,19 Q0,1 17,19', label: 'Unsure' },
  ]
  return frame(
    `${washBg}
    ${masthead('The Same Words, Read Three Ways', accent)}
    ${caps(68, 178, 'Text Meanings', { fill: accent, size: 22 })}
    ${txt(68, 268, 'Emoji', { size: 92, family: SERIF, fill: INK })}
    ${txt(68, 352, 'Meanings', { size: 92, family: SERIF, fill: accent })}
    ${rule(68, 386, 420)}
    ${txt(68, 432, 'Over 230 entries, and the tone', { size: 27, family: SERIF, fill: SLATE })}
    ${txt(68, 468, 'shifts with the sentence.', { size: 27, family: SERIF, fill: SLATE })}
    ${faces
      .map(
        (f) => `<g transform="translate(${740 + f.dx * 0.72}, 268)">
        <circle cx="0" cy="0" r="52" fill="${f.fill}"/>
        <circle cx="-18" cy="-15" r="7" fill="#ffffff"/>
        <circle cx="18" cy="-15" r="7" fill="#ffffff"/>
        <path d="${f.mouth}" stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none"/>
      </g>
      ${caps(740 + f.dx * 0.72, 360, f.label, { size: 20, anchor: 'middle', fill: SLATE })}`,
      )
      .join('')}
    ${caps(740, 424, 'One phrase, three tones', { size: 21, anchor: 'middle', fill: accent })}
    ${statRule(['230+ entries', 'Context sets the tone'], 500)}`,
    wash('#fffcf5', '#fdf3e2'),
  )
}

/** SMS bombing — volume is the whole story, so plot it. */
BANNERS['sms-bomber'] = () => {
  const accent = '#dc2626'
  return frame(
    `${washBg}
    ${masthead('When One Inbox Takes Every Message', accent)}
    ${caps(68, 178, 'SMS Security', { fill: accent, size: 22 })}
    ${txt(68, 272, 'SMS', { size: 92, family: SERIF, fill: INK })}
    ${txt(68, 356, 'Bombing', { size: 92, family: SERIF, fill: accent })}
    ${rule(68, 390, 420)}
    ${txt(68, 438, 'A flood of texts, sent to drown', { size: 27, family: SERIF, fill: SLATE })}
    ${txt(68, 474, 'the one that mattered.', { size: 27, family: SERIF, fill: SLATE })}
    ${caps(566, 186, 'Messages per minute', { size: 21, fill: SLATE })}
    ${bars({ x: 566, y: 216, h: 186, values: [4, 9, 18, 34, 62, 108, 190, 240], accent, barW: 34, gap: 14 })}
    ${rule(566, 408, 390, accent, 2.4)}
    ${num(566, 462, '1,284', { size: 58, fill: accent })}
    ${caps(700, 458, 'in under ten minutes', { size: 21, fill: SLATE })}
    ${statRule(['Block and report', 'Never reply'], 502)}`,
    wash('#fffafa', '#fdeeee'),
  )
}

/** System-generated SMS — an API pipeline, drawn as a flow. */
BANNERS['how-to-send-a-system-generated-sms'] = () => {
  const accent = '#0f766e'
  return frame(
    `${washBg}
    ${masthead('A Message No One Types', accent)}
    ${caps(68, 176, 'SMS API', { fill: accent, size: 22 })}
    ${txt(68, 268, 'Automated', { size: 84, family: SERIF, fill: INK })}
    ${txt(68, 348, 'SMS', { size: 84, family: SERIF, fill: accent })}
    ${rule(68, 382, 480)}
    ${txt(68, 428, 'Your app makes one call.', { size: 30, family: SERIF, fill: SLATE })}
    ${txt(68, 466, 'The text goes out on its own.', { size: 30, family: SERIF, fill: SLATE })}
    ${flowDown({
      x: 596, y: 142, w: 350, accent,
      items: [['Event', 'In your app'], ['API call', 'One request'], ['Delivered', 'To the handset']],
      boxH: 92, gap: 38,
    })}
    ${statRule(['Triggered by code', 'Delivery reported back'], 500)}`,
    wash('#f4fcfa', '#e5f5f2'),
  )
}

// ─────────────────────────────────────────────────────────────────── driver

async function main() {
  const want = process.argv.slice(2)
  const slugs = want.length ? want : Object.keys(BANNERS)
  for (const slug of slugs) {
    const make = BANNERS[slug]
    if (!make) {
      console.log(`· no bespoke banner yet for ${slug}`)
      continue
    }
    await fs.mkdir(path.join(OUT, slug), { recursive: true })
    await fs.writeFile(path.join(OUT, slug, 'cover.svg'), make())
    console.log(`✓ ${slug}`)
  }
  console.log(`\n${Object.keys(BANNERS).length} of 32 posts have a bespoke banner.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
