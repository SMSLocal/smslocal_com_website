/**
 * In-body illustrations for the two restored RCS posts
 * (what-is-rcs-messaging, how-to-change-from-rcs-to-sms). The original
 * WordPress images are gone from the old site and the Wayback Machine, so
 * these are rebuilt from each section's own content.
 *
 *   node scripts/gen-rcs-post-images.mjs
 *
 * Writes public/blog/<slug>/<id>.svg at 1024x576, edge to edge on a soft tint
 * (the site's CSS rounds the corners), same look as gen-inner-images.mjs.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const OUT = path.join(import.meta.dirname, '..', 'public', 'blog')
const W = 1024
const H = 576
const SANS = "Geist, 'Segoe UI', system-ui, -apple-system, sans-serif"
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif"
const INK = '#101a33'
const SLATE = '#5b6478'
const WHITE = '#ffffff'

const TINTS = {
  indigo: { bg: '#eef2fc', ink: '#154989', accent: '#4f5bd5', soft: '#dfe5fa' },
  rose: { bg: '#fdeff6', ink: '#9d1f5f', accent: '#ec4899', soft: '#fbdcec' },
  teal: { bg: '#e9f8f5', ink: '#0f6b60', accent: '#14b8a6', soft: '#d3f0ea' },
  violet: { bg: '#f3effd', ink: '#4c3a9e', accent: '#7c5cd6', soft: '#e6ddfa' },
  coral: { bg: '#fff1f0', ink: '#a53a41', accent: '#fb7185', soft: '#fddedd' },
  sky: { bg: '#eaf5fd', ink: '#125f8a', accent: '#38a3d9', soft: '#d5eaf8' },
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const text = (x, y, t, { size = 22, fill = INK, weight = 400, family = SANS, anchor = 'start', spacing = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}">${esc(t)}</text>`

/** Wraps a headline into lines of at most `max` characters. */
function wrap(s, max) {
  const lines = []
  let cur = ''
  for (const w of s.split(' ')) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur)
      cur = w
    } else cur = (cur + ' ' + w).trim()
  }
  if (cur) lines.push(cur)
  return lines
}

/** Left column shared by every layout: kicker, big headline, one-line caption. */
function copy(t, { kicker, title, caption }) {
  const lines = wrap(title, 14)
  const out = [text(64, 112, kicker.toUpperCase(), { size: 20, weight: 700, fill: t.accent, spacing: 2 })]
  lines.forEach((l, i) => out.push(text(64, 190 + i * 60, l, { size: 54, family: SERIF, fill: t.ink })))
  const capY = 190 + lines.length * 60 + 20
  wrap(caption, 34).forEach((l, i) => out.push(text(64, capY + i * 30, l, { size: 22, fill: SLATE })))
  return out.join('')
}

const pillH = 46
const pill = (x, y, label, t, filled = false) => {
  const w = Math.round(label.length * 12.4 + 44)
  return `<rect x="${x}" y="${y}" width="${w}" height="${pillH}" rx="23" fill="${filled ? t.accent : WHITE}" stroke="${t.accent}" stroke-opacity="${filled ? 0 : 0.35}"/>${text(x + w / 2, y + 30, label, { size: 20, weight: 600, fill: filled ? WHITE : t.ink, anchor: 'middle' })}`
}

const card = (x, y, w, h) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${WHITE}" stroke="#d9dfe9"/>`

/** Phone with chat bubbles. */
function chatVisual(t, items) {
  const x = 600
  let body = `<rect x="${x}" y="48" width="320" height="480" rx="44" fill="${WHITE}" stroke="${t.accent}" stroke-opacity="0.4" stroke-width="3"/>`
  body += `<rect x="${x + 110}" y="62" width="100" height="10" rx="5" fill="${t.soft}"/>`
  let y = 110
  items.forEach((it, i) => {
    const w = Math.max(150, Math.min(260, it.length * 11.5 + 40))
    const mine = i % 2 === 1
    const bx = mine ? x + 320 - 24 - w : x + 24
    body += `<rect x="${bx}" y="${y}" width="${w}" height="52" rx="26" fill="${mine ? t.accent : t.soft}"/>`
    body += text(bx + w / 2, y + 33, it, { size: 19, weight: 600, fill: mine ? WHITE : t.ink, anchor: 'middle' })
    y += 74
  })
  return body
}

/** Two stacked comparison cards: left label vs right label per row. */
function compareVisual(t, head, rows) {
  const x = 520
  let body = card(x, 56, 440, 464)
  body += text(x + 32, 112, head[0], { size: 20, weight: 700, fill: SLATE })
  body += text(x + 330, 112, head[1], { size: 20, weight: 700, fill: t.accent })
  rows.forEach((r, i) => {
    const y = 150 + i * 62
    body += `<line x1="${x + 24}" y1="${y - 14}" x2="${x + 416}" y2="${y - 14}" stroke="#e5e9f1"/>`
    body += text(x + 32, y + 18, r[0], { size: 21, fill: INK })
    body += text(x + 330, y + 18, r[1], { size: 21, weight: 700, fill: r[2] === false ? '#b45252' : t.accent })
  })
  return body
}

/** Numbered step list in a white card. */
function stepsVisual(t, steps) {
  const x = 520
  let body = card(x, 56, 440, 464)
  steps.forEach((s, i) => {
    const y = 112 + i * 100
    body += `<circle cx="${x + 56}" cy="${y}" r="26" fill="${t.accent}"/>${text(x + 56, y + 9, String(i + 1), { size: 26, weight: 700, fill: WHITE, anchor: 'middle' })}`
    wrap(s, 24).slice(0, 2).forEach((l, j) => (body += text(x + 100, y - 2 + j * 28, l, { size: 22, weight: j === 0 ? 600 : 400, fill: INK })))
  })
  return body
}

/** Large tick/cross-less icon list: pills stacked in a card. */
function listVisual(t, items) {
  const x = 560
  let body = card(x, 56, 400, 464)
  items.forEach((s, i) => {
    const y = 96 + i * 84
    body += `<rect x="${x + 32}" y="${y}" width="336" height="64" rx="18" fill="${i % 2 ? t.soft : t.bg}"/>`
    body += `<circle cx="${x + 66}" cy="${y + 32}" r="12" fill="${t.accent}"/>`
    body += text(x + 92, y + 40, s, { size: 21, weight: 600, fill: t.ink })
  })
  return body
}

const SPECS = {
  'what-is-rcs-messaging': {
    'What-is-an-RCS-message': {
      tint: 'indigo', kicker: 'RCS Messaging', title: 'Rich chat inside the text app',
      caption: 'Photos, typing indicators and read receipts over your carrier.',
      pills: ['Rich media', 'Read receipts'], visual: ['chat', ['Typing…', 'Photo sent', 'Read ✓✓']],
    },
    'Where-is-RCS-messaging-used': {
      tint: 'teal', kicker: 'Coverage', title: 'Where RCS is used today',
      caption: 'Carrier support and adoption by region.',
      pills: ['Retail', 'Banking'],
      visual: ['compare', ['Region', 'Adoption'], [['North America', 'Retail, Banking'], ['Europe', 'Travel, Service'], ['Asia', 'Retail, Tech']]],
    },
    'RCS-vs.-SMS-and-MMS-vs.-OTT-messaging-apps': {
      tint: 'violet', kicker: 'Comparison', title: 'RCS vs SMS, MMS and OTT apps',
      caption: 'Carrier-based like SMS, with app-like features.',
      pills: ['Carrier-based'],
      visual: ['compare', ['Feature', 'RCS'], [['Character limit', 'Unlimited'], ['Media', 'Images, video'], ['Typing indicators', 'Yes'], ['Read receipts', 'Yes'], ['Encryption', 'Not end-to-end', false]]],
    },
    'Why-RCS-chat-is-a-game-changer-for-your-company-and-for-your': {
      tint: 'rose', kicker: 'For your business', title: 'Why RCS is a game-changer',
      caption: 'Interactive, trackable conversations instead of plain text.',
      pills: ['Carousels', 'Buttons'],
      visual: ['compare', ['Feature', 'RCS'], [['Rich media', 'Yes'], ['Buttons and QR codes', 'Yes'], ['Read receipts', 'Yes'], ['Typing indicators', 'Yes']]],
    },
    'How-can-RCS-messaging-grow-your-business': {
      tint: 'sky', kicker: 'Growth', title: 'How RCS can grow your business',
      caption: 'Each feature maps to a measurable benefit.',
      pills: ['Analytics'], visual: ['list', ['Rich media support', 'Quick actions', 'Read receipts', 'Analytics integration']],
    },
    'Challenges-and-Limitations-of-RCS-Messaging': {
      tint: 'coral', kicker: 'Limitations', title: 'Challenges to plan for',
      caption: 'Know the gaps before you build a campaign on RCS.',
      pills: ['Carrier-dependent'], visual: ['list', ['Interoperability issues', 'Internet dependency', 'Adoption lag', 'Security and privacy']],
    },
  },
  'how-to-change-from-rcs-to-sms': {
    'What-is-RCS': {
      tint: 'indigo', kicker: 'The basics', title: 'What is RCS?',
      caption: 'The upgraded text standard behind chat features in your messages app.',
      pills: ['Rich media', 'Group chats'], visual: ['chat', ['Typing…', 'Photo sent', 'Read ✓✓']],
    },
    'How-to-change-rcs-to-sms-chats-on-Android-Step-by-Step-Guide': {
      tint: 'teal', kicker: 'Android', title: 'Switch RCS chats to SMS',
      caption: 'Turn RCS off in Google Messages.',
      pills: ['Google Messages'], visual: ['steps', ['Open Google Messages', 'Tap your profile icon', 'Open Messages settings', 'Turn off RCS chats']],
    },
    'Troubleshooting_-RCS-Messages-Still-Sending': {
      tint: 'coral', kicker: 'Troubleshooting', title: 'RCS messages still sending?',
      caption: 'Work through these checks in order.',
      pills: ['Quick fixes'], visual: ['list', ['Wait a few minutes', 'Restart your phone', 'Check your connection', 'Check the recipient']],
    },
    'Why-People-Choose-to-Change-from-RCS-to-SMS': {
      tint: 'violet', kicker: 'Why switch', title: 'Why people go back to SMS',
      caption: 'Reliability and compatibility come first.',
      pills: ['Universal'], visual: ['list', ['Network compatibility', 'International messaging', 'Battery and data use', 'Works on every phone']],
    },
  },
}

function render(spec) {
  const t = TINTS[spec.tint]
  const [kind, ...args] = spec.visual
  const visual =
    kind === 'chat' ? chatVisual(t, args[0]) : kind === 'compare' ? compareVisual(t, args[0], args[1]) : kind === 'steps' ? stepsVisual(t, args[0]) : listVisual(t, args[0])
  let px = 64
  const pills = spec.pills
    .map((p) => {
      const out = pill(px, 470, p, t, px === 64)
      px += Math.round(p.length * 12.4 + 44) + 14
      return out
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(spec.title)}">
<rect width="${W}" height="${H}" fill="${t.bg}"/>
<circle cx="${W - 40}" cy="40" r="180" fill="${t.soft}" opacity="0.6"/>
<circle cx="20" cy="${H - 20}" r="140" fill="${t.soft}" opacity="0.5"/>
${copy(t, spec)}${pills}${visual}
</svg>
`
}

let n = 0
for (const [slug, images] of Object.entries(SPECS)) {
  await fs.mkdir(path.join(OUT, slug), { recursive: true })
  for (const [id, spec] of Object.entries(images)) {
    await fs.writeFile(path.join(OUT, slug, `${id}.svg`), render(spec))
    n++
  }
}
console.log(`wrote ${n} images`)
