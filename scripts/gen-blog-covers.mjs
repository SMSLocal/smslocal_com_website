/**
 * SUPERSEDED — do not run this unless you mean to.
 *
 * gen-bespoke-covers.mjs now owns every banner and writes to the same
 * public/blog/<slug>/cover.svg paths, so running this file overwrites the
 * hand-composed set with the templated one. Kept only for its layout
 * experiments; the templated look was rejected in review.
 *
 * Renders the blog banner for every imported post as an SVG.
 *
 *   node scripts/gen-blog-covers.mjs
 *
 * Writes public/blog/<slug>/cover.svg at 1024x576 (16:9, matching the cover
 * card and post-card frames).
 *
 * Design rules these enforce:
 *  - the background is ONE soft tint, edge to edge. No band, bar or gradient
 *    strip on any side — a card that crops the artwork must never reveal a
 *    hard stripe.
 *  - type is set large: at the ~35% scale a phone-width post card renders at,
 *    the title still lands around 24px.
 *  - the visual carries real content (what the acronym expands to, which
 *    region a code covers) rather than being ornament.
 *  - every pill is sized by pill()/centredPill() from its own text. Never
 *    hard-code a chip width: it leaves the text swimming inside it.
 *  - ten compositions, and they are not all a rounded card. Two use a card,
 *    one a handset, one a notched ticket, one chat bubbles; the other five
 *    carry no container at all.
 *  - no two posts adjacent in the listing may share a composition; checked at
 *    the end of every run.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { contentModel, COVER_SPECS, layoutFor, paletteFor } from './lib/cover-specs.mjs'

const OUT = path.join(import.meta.dirname, '..', 'public', 'blog')

const W = 1024
const H = 576
const FONT = "Geist, 'Segoe UI', system-ui, -apple-system, sans-serif"
const WHITE = '#ffffff'
const SLATE = '#5b6478'

/* Text column left, visual centred in the remaining space. */
const PAD = 68
const TEXT_MAX = 486
const VX = 790
const VY = 288

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Advance-width model, calibrated against canvas measureText for this stack.
 * SVG has neither text metrics nor auto-wrap, so wrapping is done here.
 */
function charWidth(ch, size, bold) {
  if ("iljI|!.,:;'’`".includes(ch)) return size * 0.31
  if (ch === ' ') return size * 0.29
  if ('ft()[]{}r/\\-'.includes(ch)) return size * 0.4
  if ('mwMW@'.includes(ch)) return size * 0.95
  if (ch >= 'A' && ch <= 'Z') return size * 0.75
  if (ch >= '0' && ch <= '9') return size * 0.63
  return size * (bold ? 0.6 : 0.56)
}

/**
 * `spacing` matters: an SVG letter-spacing adds (n-1) gaps to the advance, and
 * leaving it out made every pill wider than the text it wrapped.
 */
const textWidth = (text, size, bold, spacing = 0) =>
  [...text].reduce((sum, ch) => sum + charWidth(ch, size, bold), 0) +
  Math.max(0, [...text].length - 1) * spacing

/**
 * A label in a rounded chip, sized to its own text. One helper for every pill
 * on every layout, so padding can never drift per composition.
 */
function pill(x, y, text, opts = {}) {
  const {
    size = 19,
    spacing = 2,
    fill = WHITE,
    color,
    weight = 700,
    padX = 20,
    height = 38,
    upper = true,
    dot = null,
  } = opts
  const body = upper ? text.toUpperCase() : text
  const lead = dot ? 22 : 0
  const w = textWidth(body, size, weight >= 600, spacing) + padX * 2 + lead
  return {
    w,
    svg: `<rect x="${x}" y="${y}" width="${w}" height="${height}" rx="${height / 2}" fill="${fill}"/>
      ${dot ? `<circle cx="${x + padX + 5}" cy="${y + height / 2}" r="5" fill="${dot}"/>` : ''}
      ${label(x + padX + lead, y + height / 2 + size * 0.36, body, size, color, weight, 'start', spacing)}`,
  }
}

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

/**
 * Greedy wrapping strands the last word ("The 22395 Short / Code"). Keep the
 * line count but pick the most even split, penalising a line that grows on the
 * one before it — a short first line over a long second reads worse.
 */
function wrap(text, size, bold, maxWidth) {
  const target = greedyWrap(text, size, bold, maxWidth)
  if (target.length < 2) return target

  const tolerance = maxWidth * 0.12
  const score = (lines) => {
    const widths = lines.map((l) => textWidth(l, size, bold))
    let growth = 0
    for (let i = 1; i < widths.length; i++) {
      growth += Math.max(0, widths[i] - widths[i - 1] - tolerance)
    }
    return Math.max(...widths) - Math.min(...widths) + growth * 2
  }

  let best = target
  let bestScore = score(target)
  for (let w = maxWidth - 4; w > maxWidth * 0.5; w -= 4) {
    const candidate = greedyWrap(text, size, bold, w)
    if (candidate.length !== target.length) break
    const s = score(candidate)
    if (s < bestScore) {
      best = candidate
      bestScore = s
    }
  }
  return best
}

// ───────────────────────────────────────────────────────────────── visuals

/** A pill centred on `cx`, hugging its text rather than a container width. */
function centredPill(cx, y, text, opts = {}) {
  const o = { size: 21, spacing: 0, upper: false, weight: 600, padX: 28, height: 58, ...opts }
  const probe = pill(0, 0, text, o)
  return pill(cx - probe.w / 2, y, text, o).svg
}

/** The eyebrow chip, sized to its text. `align` shifts it left of `x`/centres it. */
function eyebrow(x, y, spec, c, align = 'start') {
  const probe = pill(0, 0, spec.eyebrow, { color: c.accent })
  const ox = align === 'end' ? x - probe.w : align === 'middle' ? x - probe.w / 2 : x
  return pill(ox, y, spec.eyebrow, { color: c.accent }).svg
}

/** Every visual is built from the same white card, so the set stays one family. */
const card = (x, y, w, h, rx = 26) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${WHITE}" filter="url(#soft)"/>`

const label = (x, y, text, size, fill, weight = 600, anchor = 'start', spacing = 0) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}"
         fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}">${esc(text)}</text>`

/** The term, and what it stands for — the answer the post gives, on the art. */
function acronym({ term, expansion, gloss }, c) {
  const w = 372
  const x = VX - w / 2
  let termSize = 108
  while (textWidth(term, termSize, true) > w - 96 && termSize > 48) termSize -= 3

  const expLines = wrap(expansion, 27, true, w - 88)
  const cardH = 148 + expLines.length * 36
  const y = VY - cardH / 2 - 30

  return `
    ${card(x, y, w, cardH, 34)}
    ${label(VX, y + 96, term, termSize, c.ink, 700, 'middle', -1)}
    <rect x="${x + 44}" y="${y + 122}" width="${w - 88}" height="3" rx="1.5" fill="${c.soft}"/>
    ${expLines
      .map((line, i) => label(VX, y + 162 + i * 36, line, 27, c.accent, 700, 'middle'))
      .join('')}
    ${centredPill(VX, y + cardH + 26, gloss, { size: 22, height: 62, color: c.ink, fill: c.soft })}`
}

/** The code, and the place it belongs to. */
function areaCode({ code, place, detail }, c) {
  const w = 372
  const h = 300
  const x = VX - w / 2
  const y = VY - h / 2 - 26

  const rows = detail
    .map(([k, v], i) => {
      const ry = y + 196 + i * 46
      return `${label(x + 40, ry, k, 21, SLATE, 500)}${label(x + w - 40, ry, v, 21, c.ink, 700, 'end')}`
    })
    .join('')

  return `
    ${card(x, y, w, h, 34)}
    ${label(VX, y + 112, `(${code})`, 92, c.ink, 700, 'middle', -1)}
    ${label(VX, y + 152, place.toUpperCase(), 20, c.accent, 700, 'middle', 2.4)}
    <rect x="${x + 40}" y="${y + 176}" width="${w - 80}" height="3" rx="1.5" fill="${c.soft}"/>
    ${rows}
    ${centredPill(VX, y + h + 26, 'Calls and texts, same code', { color: c.ink, fill: c.soft })}`
}

/** A five-digit sender, shown as the message it arrives in. */
function shortCode({ code, label: lab, note }, c) {
  const w = 372
  const h = 268
  const x = VX - w / 2
  const y = VY - h / 2 - 30
  return `
    ${card(x, y, w, h, 34)}
    ${label(VX, y + 62, 'FROM', 19, SLATE, 700, 'middle', 3)}
    ${label(VX, y + 138, code, 82, c.ink, 700, 'middle', 2)}
    ${label(VX, y + 178, lab.toUpperCase(), 19, c.accent, 700, 'middle', 2.2)}
    <rect x="${x + 40}" y="${y + 204}" width="${w - 80}" height="3" rx="1.5" fill="${c.soft}"/>
    ${label(VX, y + 240, note, 21, SLATE, 600, 'middle')}
    ${centredPill(VX, y + h + 26, 'Same number for everyone', { color: c.ink, fill: c.soft })}`
}

/** A message that did not go out, and the reason it gives. */
function blocked({ status, note }, c) {
  const w = 372
  const h = 236
  const x = VX - w / 2
  const y = VY - h / 2 - 44
  return `
    ${card(x, y, w, h, 34)}
    <rect x="${x + 40}" y="${y + 46}" width="${w - 150}" height="18" rx="9" fill="${c.bg}"/>
    <rect x="${x + 40}" y="${y + 80}" width="${w - 92}" height="18" rx="9" fill="${c.bg}"/>
    <rect x="${x + 40}" y="${y + 114}" width="${w - 200}" height="18" rx="9" fill="${c.bg}"/>
    <rect x="${x + 40}" y="${y + 158}" width="${w - 80}" height="3" rx="1.5" fill="${c.soft}"/>
    <circle cx="${x + 56}" cy="${y + 194}" r="9" fill="${c.accent}"/>
    ${label(x + 76, y + 202, status, 23, c.ink, 700)}
    <g transform="translate(${VX + 118}, ${y + h + 4})">
      <circle cx="0" cy="0" r="58" fill="${WHITE}" filter="url(#soft)"/>
      <circle cx="0" cy="0" r="40" fill="none" stroke="${c.accent}" stroke-width="11"/>
      <line x1="-27" y1="27" x2="27" y2="-27" stroke="${c.accent}" stroke-width="11" stroke-linecap="round"/>
    </g>
    ${centredPill(x + 10 + (w - 180) / 2, y + h + 44, note, { size: 19, color: c.ink, fill: c.soft })}`
}

/** One inbox, far more messages than it asked for. */
function flood({ count, label: lab }, c) {
  const w = 372
  const h = 300
  const x = VX - w / 2
  const y = VY - h / 2 - 26
  const bars = [0, 1, 2, 3, 4]
    .map((i) => {
      const bw = i % 2 ? w - 150 : w - 104
      const bx = i % 2 ? x + 110 : x + 40
      return `<rect x="${bx}" y="${y + 132 + i * 34}" width="${bw}" height="22" rx="11"
                    fill="${i % 2 ? c.bg : c.soft}"/>`
    })
    .join('')
  return `
    ${card(x, y, w, h, 34)}
    ${label(VX, y + 82, count, 76, c.ink, 700, 'middle', -1)}
    ${label(VX, y + 114, lab.toUpperCase(), 20, c.accent, 700, 'middle', 2.4)}
    ${bars}
    ${centredPill(VX, y + h + 26, 'One number, endless pings', { color: c.ink, fill: c.soft })}`
}

/** The same message, read three ways. */
function emoji({ labels }, c) {
  const w = 372
  const h = 244
  const x = VX - w / 2
  const y = VY - h / 2 - 34
  const faces = [
    { dx: -104, mouth: 'M-16,6 Q0,22 16,6', fill: c.ink },
    { dx: 0, mouth: 'M-16,12 L16,12', fill: c.accent },
    { dx: 104, mouth: 'M-16,17 Q0,1 16,17', fill: SLATE },
  ]
    .map(
      (f, i) => `
      <g transform="translate(${VX + f.dx}, ${y + 108})">
        <circle cx="0" cy="0" r="46" fill="${f.fill}"/>
        <circle cx="-16" cy="-13" r="6.5" fill="${WHITE}"/>
        <circle cx="16" cy="-13" r="6.5" fill="${WHITE}"/>
        <path d="${f.mouth}" stroke="${WHITE}" stroke-width="6.5" stroke-linecap="round" fill="none"/>
      </g>
      ${label(VX + f.dx, y + 186, labels[i].toUpperCase(), 18, SLATE, 700, 'middle', 1.6)}`,
    )
    .join('')
  return `
    ${card(x, y, w, h, 34)}
    ${label(VX, y + 46, 'SAME WORDS, THREE TONES', 19, c.accent, 700, 'middle', 2.2)}
    ${faces}
    ${centredPill(VX, y + h + 26, 'Context sets the meaning', { color: c.ink, fill: c.soft })}`
}

/** Code sends it, not a person. */
function automation({ from, to }, c) {
  const w = 372
  const h = 268
  const x = VX - w / 2
  const y = VY - h / 2 - 30
  const step = (cy, text, sub, filled) => `
    <rect x="${x + 36}" y="${cy}" width="${w - 72}" height="72" rx="24"
          fill="${filled ? c.accent : c.bg}"/>
    ${label(x + 62, cy + 34, text, 24, filled ? WHITE : c.ink, 700)}
    ${label(x + 62, cy + 58, sub, 18, filled ? WHITE : SLATE, 500)}`
  return `
    ${card(x, y, w, h, 34)}
    ${step(y + 32, from, 'Triggers the request', false)}
    <g stroke="${c.soft}" stroke-width="5" stroke-linecap="round" fill="none">
      <line x1="${VX}" y1="${y + 116}" x2="${VX}" y2="${y + 152}"/>
      <polyline points="${VX - 12},${y + 142} ${VX},${y + 154} ${VX + 12},${y + 142}"/>
    </g>
    ${step(y + 164, to, 'No manual sending', true)}
    ${centredPill(VX, y + h + 26, 'One API call, one message', { color: c.ink, fill: c.soft })}`
}

const VISUALS = { acronym, areaCode, shortCode, blocked, flood, emoji, automation }

// ──────────────────────────────────── wide artifacts, for the stack layout

/* The stack layout reads left-to-right across one strip instead of top-to-
   bottom inside a tall card, so each topic needs its own horizontal telling.
   `x`/`y`/`w`/`h` describe the strip these draw inside. */

const divider = (x, y, h, fill) =>
  `<rect x="${x}" y="${y}" width="3" height="${h}" rx="1.5" fill="${fill}"/>`

/** label above, value below — the repeated unit of the wide strips. */
const stat = (x, y, cap, value, c, valueSize = 30) => `
  ${label(x, y, cap.toUpperCase(), 17, SLATE, 700, 'start', 2)}
  ${label(x, y + 40, value, valueSize, c.ink, 700)}`

function wideAcronym({ term, expansion, gloss }, c, x, y, w, h) {
  let termSize = 82
  while (textWidth(term, termSize, true) > 250 && termSize > 42) termSize -= 3
  const midY = y + h / 2
  return `
    ${label(x + 52, midY + 26, term, termSize, c.accent, 700, 'start', -1)}
    ${divider(x + 330, y + 40, h - 80, c.soft)}
    ${stat(x + 380, midY - 24, 'Stands for', expansion, c)}
    ${divider(x + 620, y + 40, h - 80, c.soft)}
    ${stat(x + 670, midY - 24, 'Used for', gloss, c, 24)}`
}

function wideAreaCode({ code, place, detail }, c, x, y, w, h) {
  const midY = y + h / 2
  return `
    ${label(x + 52, midY + 24, `(${code})`, 74, c.accent, 700, 'start', -1)}
    ${divider(x + 330, y + 40, h - 80, c.soft)}
    ${stat(x + 380, midY - 24, 'Covers', place, c, 26)}
    ${divider(x + 620, y + 40, h - 80, c.soft)}
    ${stat(x + 670, midY - 24, detail[1][0], detail[1][1], c, 26)}`
}

function wideShortCode({ code, label: lab, note }, c, x, y, w, h) {
  const midY = y + h / 2
  return `
    ${label(x + 52, midY + 24, code, 74, c.accent, 700, 'start', 1)}
    ${divider(x + 330, y + 40, h - 80, c.soft)}
    ${stat(x + 380, midY - 24, 'Sender type', lab, c, 26)}
    ${divider(x + 620, y + 40, h - 80, c.soft)}
    ${stat(x + 670, midY - 24, 'Opt out', note.replace('Reply ', ''), c, 26)}`
}

function wideBlocked({ status, note }, c, x, y, w, h) {
  const midY = y + h / 2
  return `
    <g transform="translate(${x + 118}, ${midY})">
      <circle cx="0" cy="0" r="52" fill="${c.bg}"/>
      <circle cx="0" cy="0" r="34" fill="none" stroke="${c.accent}" stroke-width="10"/>
      <line x1="-23" y1="23" x2="23" y2="-23" stroke="${c.accent}" stroke-width="10" stroke-linecap="round"/>
    </g>
    ${divider(x + 220, y + 40, h - 80, c.soft)}
    ${stat(x + 270, midY - 24, 'Status', status, c, 28)}
    ${divider(x + 530, y + 40, h - 80, c.soft)}
    ${stat(x + 580, midY - 24, 'Shown as', note, c, 22)}`
}

function wideEmoji({ labels }, c, x, y, w, h) {
  const midY = y + h / 2
  const faces = [
    { mouth: 'M-14,5 Q0,19 14,5', fill: c.ink },
    { mouth: 'M-14,10 L14,10', fill: c.accent },
    { mouth: 'M-14,15 Q0,1 14,15', fill: SLATE },
  ]
    .map(
      (f, i) => `
      <g transform="translate(${x + 130 + i * 132}, ${midY - 12})">
        <circle cx="0" cy="0" r="40" fill="${f.fill}"/>
        <circle cx="-14" cy="-11" r="5.5" fill="${WHITE}"/>
        <circle cx="14" cy="-11" r="5.5" fill="${WHITE}"/>
        <path d="${f.mouth}" stroke="${WHITE}" stroke-width="5.5" stroke-linecap="round" fill="none"/>
      </g>
      ${label(x + 130 + i * 132, midY + 56, labels[i].toUpperCase(), 17, SLATE, 700, 'middle', 1.6)}`,
    )
    .join('')
  return `
    ${faces}
    ${divider(x + 500, y + 40, h - 80, c.soft)}
    ${stat(x + 552, midY - 24, 'Same words', 'Three different tones', c, 26)}`
}

function wideFlood({ count, label: lab }, c, x, y, w, h) {
  const midY = y + h / 2
  const bars = [0, 1, 2, 3]
    .map(
      (i) =>
        `<rect x="${x + 600}" y="${y + 44 + i * 28}" width="${240 - i * 46}" height="16" rx="8"
               fill="${i % 2 ? c.bg : c.soft}"/>`,
    )
    .join('')
  return `
    ${label(x + 52, midY + 24, count, 74, c.accent, 700, 'start', -1)}
    ${divider(x + 330, y + 40, h - 80, c.soft)}
    ${stat(x + 380, midY - 24, 'Arriving', lab, c, 26)}
    ${divider(x + 560, y + 40, h - 80, c.soft)}
    ${bars}`
}

function wideAutomation({ from, to }, c, x, y, w, h) {
  const midY = y + h / 2
  const node = (nx, text, sub, filled) => `
    <rect x="${nx}" y="${midY - 44}" width="264" height="88" rx="26" fill="${filled ? c.accent : c.bg}"/>
    ${label(nx + 28, midY - 6, text, 26, filled ? WHITE : c.ink, 700)}
    ${label(nx + 28, midY + 24, sub, 18, filled ? WHITE : SLATE, 500)}`
  return `
    ${node(x + 48, from, 'Triggers the request', false)}
    <g stroke="${c.soft}" stroke-width="5" stroke-linecap="round" fill="none">
      <line x1="${x + 336}" y1="${midY}" x2="${x + 392}" y2="${midY}"/>
      <polyline points="${x + 380},${midY - 12} ${x + 394},${midY} ${x + 380},${midY + 12}"/>
    </g>
    ${node(x + 420, to, 'No manual sending', true)}`
}

const WIDE_VISUALS = {
  acronym: wideAcronym,
  areaCode: wideAreaCode,
  shortCode: wideShortCode,
  blocked: wideBlocked,
  emoji: wideEmoji,
  flood: wideFlood,
  automation: wideAutomation,
}

// ───────────────────────────────────────────────────────────────── layout

const frame = (body, c) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <filter id="soft" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#1e293b" flood-opacity="0.09"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="${c.bg}"/>
  ${body}
</svg>
`

/**
 * Stack layout: the headline runs the full canvas width with the artifact as
 * one wide strip beneath, rather than a text column beside a tall card. The
 * strip keeps a margin on every side, so a cropped card never shows a band
 * running off an edge.
 */
function renderStack(slug, spec) {
  const c = paletteFor(slug)

  const EYEBROW = 20
  const DESC = 26
  const STRIP_H = 196
  const STRIP_X = 68
  const STRIP_W = W - STRIP_X * 2
  const STRIP_Y = H - 52 - STRIP_H

  // The full width lets the headline run larger than the split layout's column.
  let titleSize = 82
  let titleLines = wrap(spec.title, titleSize, true, STRIP_W - 40)
  if (titleLines.length > 1) {
    titleSize = 62
    titleLines = wrap(spec.title, titleSize, true, STRIP_W - 40)
  }

  const descLines = wrap(spec.desc, DESC, false, 700).slice(0, 2)

  let y = 58
  const head = eyebrow(STRIP_X, y, spec, c, 'start')
  y += 40 + 30

  const title = titleLines
    .map((line, i) =>
      label(STRIP_X, y + i * titleSize * 1.06 + titleSize * 0.76, line, titleSize, c.ink, 700, 'start', -2),
    )
    .join('')
  y += titleLines.length * titleSize * 1.06 + 18

  const desc = descLines
    .map((line, i) => label(STRIP_X, y + i * DESC * 1.45 + DESC * 0.8, line, DESC, SLATE, 500))
    .join('')

  const artifact = WIDE_VISUALS[spec.visual.kind](spec.visual, c, STRIP_X, STRIP_Y, STRIP_W, STRIP_H)

  return frame(
    `${head}
  ${title}
  ${desc}
  <rect x="${STRIP_X}" y="${STRIP_Y}" width="${STRIP_W}" height="${STRIP_H}" rx="32"
        fill="${WHITE}" filter="url(#soft)"/>
  ${artifact}`,
    c,
  )
}

/** Split layout: text column left, tall artifact card right. */
function renderSplit(slug, spec) {
  const c = paletteFor(slug)

  const EYEBROW = 20
  const TITLE = 68
  const DESC = 25
  const FACT = 20

  const titleLines = wrap(spec.title, TITLE, true, TEXT_MAX)
  const descLines = wrap(spec.desc, DESC, false, TEXT_MAX)

  const titleLead = TITLE * 1.1
  const descLead = DESC * 1.46
  const blockH =
    42 + titleLines.length * titleLead + 24 + descLines.length * descLead + (spec.facts ? 40 + 44 : 0)
  let y = (H - blockH) / 2 + EYEBROW

  const head = eyebrow(PAD, y - 22, spec, c, 'start')
  y += 42

  const title = titleLines
    .map((line, i) =>
      label(PAD, y + i * titleLead + TITLE * 0.76, line, TITLE, c.ink, 700, 'start', -1.6),
    )
    .join('')
  y += titleLines.length * titleLead + 24

  const desc = descLines
    .map((line, i) => label(PAD, y + i * descLead + DESC * 0.8, line, DESC, SLATE, 500))
    .join('')
  y += descLines.length * descLead

  let facts = ''
  if (spec.facts) {
    y += 40
    let fx = PAD
    facts = spec.facts
      .map((text) => {
        const p = pill(fx, y - 4, text, {
          size: FACT,
          spacing: 0,
          upper: false,
          weight: 600,
          color: c.ink,
          height: 44,
          padX: 18,
          dot: c.accent,
        })
        fx += p.w + 12
        return p.svg
      })
      .join('')
  }

  const visual = VISUALS[spec.visual.kind](spec.visual, c)

  return frame(
    `${head}
  ${title}
  ${desc}
  ${facts}
  ${visual}`,
    c,
  )
}

// ─────────────────────────────── eight further compositions (C through J)

/* These draw from contentModel(), so each works for every topic without
   branching on kind. Every one is a different arrangement of the canvas — not
   a recolour of the last. Nothing may touch a canvas edge. */

/** Either the model's mark or its big value, as one drawable unit. */
function bigMark(m, cx, cy, size, c, anchor = 'middle') {
  if (m.icon === 'ban') {
    const r = size * 0.42
    return `<g transform="translate(${cx}, ${cy - size * 0.22})">
      <circle cx="0" cy="0" r="${r}" fill="none" stroke="${c.accent}" stroke-width="${size * 0.11}"/>
      <line x1="${-r * 0.68}" y1="${r * 0.68}" x2="${r * 0.68}" y2="${-r * 0.68}"
            stroke="${c.accent}" stroke-width="${size * 0.11}" stroke-linecap="round"/>
    </g>`
  }
  if (m.icon === 'faces') {
    const r = size * 0.2
    return [
      { dx: -r * 2.3, mouth: 1 },
      { dx: 0, mouth: 0 },
      { dx: r * 2.3, mouth: -1 },
    ]
      .map(
        (f) => `<g transform="translate(${cx + f.dx}, ${cy - size * 0.22})">
          <circle cx="0" cy="0" r="${r}" fill="${f.mouth > 0 ? c.ink : f.mouth === 0 ? c.accent : SLATE}"/>
          <circle cx="${-r * 0.34}" cy="${-r * 0.28}" r="${r * 0.14}" fill="${WHITE}"/>
          <circle cx="${r * 0.34}" cy="${-r * 0.28}" r="${r * 0.14}" fill="${WHITE}"/>
          <path d="M${-r * 0.36},${r * (f.mouth > 0 ? 0.12 : f.mouth === 0 ? 0.26 : 0.4)}
                   Q0,${r * (f.mouth > 0 ? 0.5 : f.mouth === 0 ? 0.26 : 0.02)}
                   ${r * 0.36},${r * (f.mouth > 0 ? 0.12 : f.mouth === 0 ? 0.26 : 0.4)}"
                stroke="${WHITE}" stroke-width="${r * 0.15}" stroke-linecap="round" fill="none"/>
        </g>`,
      )
      .join('')
  }
  let s = size
  while (textWidth(m.big, s, true) > size * 3.1 && s > size * 0.45) s -= 2
  return label(cx, cy, m.big, s, c.accent, 700, anchor, -1)
}

/**
 * A handset drawn to real proportions (9:19.5), light-framed so it stays
 * inside the soft-palette rule. `screen(sx, sy, sw, sh)` fills the display.
 * Returns its width so callers can lay out beside it.
 */
function phone(x, y, h, c, screen) {
  const w = Math.round(h * 0.462)
  const rBody = w * 0.17
  const bez = Math.max(9, w * 0.046)
  const sw = w - bez * 2
  const sh = h - bez * 2
  const sx = x + bez
  const sy = y + bez
  const rScreen = rBody - bez * 0.6

  // Side keys sit flush against the shell rather than floating past it.
  const keys = `
    <rect x="${x - 3}" y="${y + h * 0.26}" width="4" height="${h * 0.055}" rx="2" fill="${c.soft}"/>
    <rect x="${x - 3}" y="${y + h * 0.34}" width="4" height="${h * 0.085}" rx="2" fill="${c.soft}"/>
    <rect x="${x + w - 1}" y="${y + h * 0.3}" width="4" height="${h * 0.11}" rx="2" fill="${c.soft}"/>`

  return {
    w,
    svg: `
    ${keys}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rBody}" fill="${WHITE}"
          stroke="${c.soft}" stroke-width="3" filter="url(#soft)"/>
    <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="${rScreen}" fill="${c.bg}"/>
    ${screen(sx, sy, sw, sh)}
    <rect x="${sx + sw / 2 - sw * 0.15}" y="${sy + 12}" width="${sw * 0.3}" height="${bez * 1.15}"
          rx="${bez * 0.58}" fill="${c.ink}" opacity="0.82"/>
    <rect x="${sx + sw / 2 - sw * 0.17}" y="${sy + sh - 16}" width="${sw * 0.34}" height="5"
          rx="2.5" fill="${c.ink}" opacity="0.28"/>`,
  }
}

/** C — mirror: a handset on the left, right-aligned headline on the right. */
function renderMirror(slug, spec, c, m) {
  const ph = 458
  const py = 59
  const px = 118
  const device = phone(px, py, ph, c, (sx, sy, sw, sh) => {
    const bubbleW = sw - 26
    const leadLines = wrap(m.lead, 17, true, bubbleW - 40).slice(0, 2)
    return `
      ${label(sx + sw / 2, sy + 62, 'NEW MESSAGE', 13, SLATE, 700, 'middle', 1.8)}
      <rect x="${sx + 13}" y="${sy + 84}" width="${bubbleW}" height="112" rx="26" fill="${WHITE}"/>
      ${bigMark(m, sx + sw / 2, sy + 158, 52, c)}
      <rect x="${sx + 13}" y="${sy + 210}" width="${bubbleW}" height="${34 + leadLines.length * 24}"
            rx="24" fill="${c.accent}"/>
      ${leadLines
        .map((l, i) => label(sx + sw / 2, sy + 240 + i * 24, l, 17, WHITE, 700, 'middle'))
        .join('')}
      ${m.stats
        .map(
          ([k, v], i) => `
        ${label(sx + 20, sy + 330 + i * 52, k.toUpperCase(), 12, SLATE, 700, 'start', 1.4)}
        ${label(sx + 20, sy + 352 + i * 52, v, 16, c.ink, 700)}`,
        )
        .join('')}`
  })

  const R = 956
  const titleLines = wrap(spec.title, 62, true, 452)
  const descLines = wrap(spec.desc, 24, false, 452).slice(0, 3)
  const ty = 288 - (52 + titleLines.length * 68 + 18 + descLines.length * 35) / 2 + 20

  return `
    ${device.svg}
    ${eyebrow(R, ty, spec, c, 'end')}
    ${titleLines
      .map((l, i) => label(R, ty + 52 + i * 68 + 47, l, 62, c.ink, 700, 'end', -1.6))
      .join('')}
    ${descLines
      .map((l, i) => label(R, ty + 52 + titleLines.length * 68 + 18 + i * 35 + 19, l, 24, SLATE, 500, 'end'))
      .join('')}`
}

/**
 * D — corner: no container at all. An oversized headline, with the value set
 * underlined at the lower right and its detail hung off a leader line.
 */
function renderCorner(slug, spec, c, m) {
  let size = 96
  let lines = wrap(spec.title, size, true, 620)
  if (lines.length > 1) {
    size = 74
    lines = wrap(spec.title, size, true, 620)
  }
  const descLines = wrap(spec.desc, 24, false, 520).slice(0, 2)

  const vx = 956
  const vy = 402
  let vSize = 104
  while (textWidth(m.big, vSize, true) > 330 && vSize > 44) vSize -= 3
  const vW = m.icon ? 200 : textWidth(m.big, vSize, true)

  return `
    ${eyebrow(68, 62, spec, c, 'start')}
    ${lines
      .map((l, i) => label(68, 152 + i * size * 1.04 + size * 0.76, l, size, c.ink, 700, 'start', -2.4))
      .join('')}
    ${descLines
      .map((l, i) => label(68, 152 + lines.length * size * 1.04 + 30 + i * 35 + 19, l, 24, SLATE, 500))
      .join('')}
    ${m.icon ? bigMark(m, vx - vW / 2, vy, 96, c) : label(vx, vy, m.big, vSize, c.accent, 700, 'end', -2)}
    <rect x="${vx - vW}" y="${vy + 26}" width="${vW}" height="5" rx="2.5" fill="${c.accent}"/>
    ${label(vx, vy + 62, m.lead.toUpperCase(), 18, c.ink, 700, 'end', 2)}
    ${label(vx, vy + 92, m.note, 19, SLATE, 500, 'end')}`
}

/** E — centred: no card at all; a centred stack over a row of pills. */
function renderCentred(slug, spec, c, m) {
  const CX = W / 2
  const titleLines = wrap(spec.title, 78, true, 840)
  const descLines = wrap(spec.desc, 25, false, 660).slice(0, 2)

  let y = 108
  const head = eyebrow(CX, y - 28, spec, c, 'middle')
  y += 34

  const title = titleLines
    .map((l, i) => label(CX, y + i * 84 + 60, l, 78, c.ink, 700, 'middle', -2))
    .join('')
  y += titleLines.length * 84 + 14

  const desc = descLines.map((l, i) => label(CX, y + i * 36 + 20, l, 25, SLATE, 500, 'middle')).join('')

  // One pill for the value, one per stat, laid out as a centred row.
  const items = [m.big, ...m.stats.map(([, v]) => v)]
  const opts = items.map((t, i) =>
    i === 0
      ? { size: 30, spacing: 0, upper: false, weight: 700, color: WHITE, fill: c.accent, height: 62, padX: 26 }
      : { size: 21, spacing: 0, upper: false, weight: 600, color: c.ink, height: 50, padX: 22 },
  )
  const widths = items.map((t, i) => pill(0, 0, t, opts[i]).w)
  const total = widths.reduce((a, b) => a + b, 0) + (items.length - 1) * 14
  let px = CX - total / 2
  const pills = items
    .map((t, i) => {
      const p = pill(px, i === 0 ? 468 : 474, t, opts[i])
      px += p.w + 14
      return p.svg
    })
    .join('')

  return `${head}${title}${desc}${pills}`
}

/**
 * F — rule: no container. A single hairline divides the canvas, with the value
 * and its details hung off the right of it, spec-sheet fashion.
 */
function renderPanel(slug, spec, c, m) {
  const RX = 596
  const titleLines = wrap(spec.title, 60, true, 470)
  const descLines = wrap(spec.desc, 23, false, 470).slice(0, 3)
  const y = 288 - (48 + titleLines.length * 66 + 20 + descLines.length * 34) / 2

  const rows = m.stats
    .map(
      ([k, v], i) => `
      <rect x="${RX + 44}" y="${330 + i * 74}" width="26" height="3" rx="1.5" fill="${c.accent}"/>
      ${label(RX + 84, 337 + i * 74, k.toUpperCase(), 15, SLATE, 700, 'start', 1.8)}
      ${wrap(v, 22, true, 250)
        .slice(0, 1)
        .map((l) => label(RX + 84, 366 + i * 74, l, 22, c.ink, 700))
        .join('')}`,
    )
    .join('')

  return `
    <rect x="${RX}" y="76" width="3" height="424" rx="1.5" fill="${c.soft}"/>
    ${m.icon
      ? bigMark(m, RX + 200, 208, 96, c)
      : label(RX + 44, 208, m.big, 96, c.accent, 700, 'start', -2)}
    ${wrap(m.lead, 22, true, 320)
      .slice(0, 2)
      .map((l, i) => label(RX + 44, 254 + i * 30, l, 22, c.ink, 700))
      .join('')}
    ${rows}
    ${eyebrow(68, y, spec, c, 'start')}
    ${titleLines
      .map((l, i) => label(68, y + 48 + i * 66 + 46, l, 60, c.ink, 700, 'start', -1.6))
      .join('')}
    ${descLines
      .map((l, i) => label(68, y + 48 + titleLines.length * 66 + 20 + i * 34 + 18, l, 23, SLATE, 500))
      .join('')}`
}

/** G — ghost: an oversized pale value sits behind the headline. */
function renderGhost(slug, spec, c, m) {
  const titleLines = wrap(spec.title, 66, true, 560)
  const descLines = wrap(spec.desc, 24, false, 520).slice(0, 2)

  let ghostSize = 230
  while (textWidth(m.big, ghostSize, true) > 470 && ghostSize > 90) ghostSize -= 4
  const ghost =
    m.icon
      ? `<g opacity="0.5">${bigMark(m, 762, 330, 190, { ...c, accent: c.soft, ink: c.soft })}</g>`
      : label(966, 372, m.big, ghostSize, c.soft, 700, 'end', -4)

  let y = 92
  const chip = pill(68, 454, m.lead, {
    size: 22, spacing: 0, upper: false, weight: 700, color: WHITE, fill: c.accent, height: 58, padX: 26,
  })
  return `
    ${ghost}
    ${eyebrow(68, y, spec, c, 'start')}
    ${titleLines
      .map((l, i) => label(68, 178 + i * 72 + 50, l, 66, c.ink, 700, 'start', -1.8))
      .join('')}
    ${descLines
      .map((l, i) => label(68, 178 + titleLines.length * 72 + 24 + i * 35 + 19, l, 24, SLATE, 500))
      .join('')}
    ${chip.svg}
    ${label(68 + chip.w + 26, 491, m.note, 20, SLATE, 600)}`
}

/** H — ticket: a notched card, value stub left of a perforation. */
function renderTicket(slug, spec, c, m) {
  const x = 68
  const y = 248
  const w = 888
  const h = 252
  const stub = 272
  const perf = x + stub
  const titleLines = wrap(spec.title, 58, true, 860).slice(0, 2)

  const dashes = Array.from({ length: 9 }, (_, i) => {
    const dy = y + 22 + i * ((h - 44) / 9)
    return `<line x1="${perf}" y1="${dy}" x2="${perf}" y2="${dy + (h - 44) / 18}" stroke="${c.soft}" stroke-width="3" stroke-linecap="round"/>`
  }).join('')

  const cols = m.stats
    .map(([k, v], i) => {
      const colX = perf + 56 + i * 296
      return `${label(colX, y + 158, k.toUpperCase(), 16, SLATE, 700, 'start', 1.8)}
              ${wrap(v, 23, true, 260)
                .slice(0, 2)
                .map((l, j) => label(colX, y + 190 + j * 30, l, 23, c.ink, 700))
                .join('')}`
    })
    .join('')

  return `
    ${eyebrow(x, 60, spec, c, 'start')}
    ${titleLines
      .map((l, i) => label(x, 128 + i * 64 + 44, l, 58, c.ink, 700, 'start', -1.6))
      .join('')}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="32" fill="${WHITE}" filter="url(#soft)"/>
    <path d="M${x + 32},${y} h${stub - 32} v${h} h${-(stub - 32)} a32,32 0 0 1 -32,-32 v${-(h - 64)} a32,32 0 0 1 32,-32 z"
          fill="${c.bg}"/>
    ${bigMark(m, x + stub / 2, y + h / 2 + 22, 78, c)}
    ${dashes}
    ${label(perf + 56, y + 82, m.lead, 30, c.ink, 700)}
    ${label(perf + 56, y + 116, m.note, 20, SLATE, 500)}
    ${cols}`
}

/** I — thread: text left, bubbles cascading down the right. */
function renderThread(slug, spec, c, m) {
  const titleLines = wrap(spec.title, 60, true, 430)
  const descLines = wrap(spec.desc, 23, false, 430).slice(0, 3)
  let y = 288 - (46 + titleLines.length * 66 + 20 + descLines.length * 34) / 2

  const bubble = (bx, by, bw, bh, fill, content, tail) => `
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${Math.min(30, bh / 2)}" fill="${fill}"/>
    ${tail === 'left'
      ? `<path d="M${bx + 30},${by + bh - 1} L${bx + 30},${by + bh + 22} L${bx + 62},${by + bh - 1} Z" fill="${fill}"/>`
      : `<path d="M${bx + bw - 30},${by + bh - 1} L${bx + bw - 30},${by + bh + 22} L${bx + bw - 62},${by + bh - 1} Z" fill="${fill}"/>`}
    ${content}`

  const b1 = bubble(
    548,
    68,
    340,
    116,
    WHITE,
    bigMark(m, 718, 68 + 84, 70, c),
    'left',
  )
  const b2 = bubble(
    616,
    218,
    340,
    104,
    c.accent,
    wrap(m.lead, 24, true, 280)
      .slice(0, 2)
      .map((l, i) => label(786, 218 + (m.lead.length > 22 ? 44 : 62) + i * 30, l, 24, WHITE, 700, 'middle'))
      .join(''),
    'right',
  )
  const b3 = bubble(
    548,
    356,
    306,
    96,
    WHITE,
    wrap(m.note, 21, true, 250)
      .slice(0, 2)
      .map((l, i) => label(701, 356 + (m.note.length > 22 ? 40 : 58) + i * 28, l, 21, c.ink, 600, 'middle'))
      .join(''),
    'left',
  )

  return `
    ${b1}${b2}${b3}
    ${eyebrow(68, y, spec, c, 'start')}
    ${titleLines
      .map((l, i) => label(68, y + 46 + i * 66 + 45, l, 60, c.ink, 700, 'start', -1.6))
      .join('')}
    ${descLines
      .map((l, i) => label(68, y + 46 + titleLines.length * 66 + 20 + i * 34 + 18, l, 23, SLATE, 500))
      .join('')}`
}

/** J — poster: a huge value over a full-width rule, headline beneath. */
function renderPoster(slug, spec, c, m) {
  let size = 210
  while (textWidth(m.big, size, true) > 700 && size > 90) size -= 4
  const titleLines = wrap(spec.title, 56, true, 560).slice(0, 2)

  const marks = m.stats
    .map(
      ([k, v], i) => `${label(68 + i * 300, 404, k.toUpperCase(), 15, SLATE, 700, 'start', 1.8)}
       ${label(68 + i * 300, 434, v, 21, c.ink, 700)}`,
    )
    .join('')

  return `
    ${eyebrow(68, 56, spec, c, 'start')}
    ${m.icon
      ? bigMark(m, 700, 300, 180, c)
      : label(956, 300, m.big, size, c.accent, 700, 'end', -5)}
    <rect x="68" y="352" width="888" height="3" rx="1.5" fill="${c.soft}"/>
    ${marks}
    ${titleLines
      .map((l, i) => label(68, 486 + i * 60 + 42, l, 56, c.ink, 700, 'start', -1.6))
      .join('')}
    ${label(956, 528, m.note, 21, SLATE, 600, 'end')}`
}

const LAYOUT_RENDERERS = {
  mirror: renderMirror,
  corner: renderCorner,
  centred: renderCentred,
  panel: renderPanel,
  ghost: renderGhost,
  ticket: renderTicket,
  thread: renderThread,
  poster: renderPoster,
}

function renderCover(slug, spec) {
  const layout = layoutFor(slug)
  if (layout === 'stack') return renderStack(slug, spec)
  if (layout === 'split') return renderSplit(slug, spec)
  const c = paletteFor(slug)
  return frame(LAYOUT_RENDERERS[layout](slug, spec, c, contentModel(spec)), c)
}

async function main() {
  const slugs = Object.keys(COVER_SPECS)
  const used = {}
  for (const slug of slugs) {
    const spec = COVER_SPECS[slug]
    await fs.mkdir(path.join(OUT, slug), { recursive: true })
    await fs.writeFile(path.join(OUT, slug, 'cover.svg'), renderCover(slug, spec))
    const c = paletteFor(slug)
    used[c.key] = (used[c.key] ?? 0) + 1
    const l = layoutFor(slug)
    console.log(`✓ ${slug.padEnd(36)} ${l.padEnd(6)} ${c.key.padEnd(7)} ${spec.visual.kind}`)
  }
  console.log(`\nWrote ${slugs.length} banners → public/blog/<slug>/cover.svg`)

  const byLayout = {}
  for (const s of slugs) {
    const l = layoutFor(s)
    byLayout[l] = (byLayout[l] ?? 0) + 1
  }
  console.log(`Layouts: ${Object.entries(byLayout).map(([k, n]) => `${k} ${n}`).join(', ')}`)
  console.log(`Colourways: ${Object.entries(used).map(([k, n]) => `${k} ${n}`).join(', ')}`)

  // Listing-page rule: newest-first, no two adjacent cards share a layout.
  const posts = JSON.parse(
    await fs.readFile(path.join(import.meta.dirname, '..', 'src/data/importedPosts.generated.json'), 'utf8'),
  )
  const FEATURED = '22395-short-code'
  const order = posts
    .filter((p) => p.slug !== FEATURED)
    .sort((a, b) => Date.parse(b.dateISO) - Date.parse(a.dateISO))
    .map((p) => p.slug)

  const clashes = []
  for (let i = 1; i < order.length; i++) {
    if (layoutFor(order[i]) === layoutFor(order[i - 1])) {
      clashes.push(`${i - 1}:${order[i - 1]} & ${i}:${order[i]} both ${layoutFor(order[i])}`)
    }
  }
  const dupColour = []
  for (const [layout, n] of Object.entries(byLayout)) {
    const group = slugs.filter((s) => layoutFor(s) === layout)
    const keys = new Set(group.map((s) => paletteFor(s).key))
    if (keys.size !== n) dupColour.push(`${layout}: ${n} posts, ${keys.size} colours`)
  }

  console.log(
    clashes.length
      ? `\n✗ ADJACENT SAME-LAYOUT CARDS:\n  ${clashes.join('\n  ')}`
      : `\n✓ No two adjacent listing cards share a layout (${order.length} cards checked)`,
  )
  console.log(
    dupColour.length
      ? `✗ Repeated colour inside a layout: ${dupColour.join('; ')}`
      : `✓ Every post in a layout group has its own colourway`,
  )
  if (clashes.length || dupColour.length) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
