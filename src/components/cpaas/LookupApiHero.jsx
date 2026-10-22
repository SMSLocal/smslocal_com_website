import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from './useMotion.js'
import './lookup-api-hero.css'

/**
 * Hero for the Number Lookup page. Copy on the left; on the right a number
 * decoder. A phone number is typed out digit by digit, then splits apart into
 * its parts (country, prefix, subscriber), each underlined and labelled. The
 * four result cards then decode letter by letter, like a cipher resolving,
 * hold for a moment, and the number is deleted to make way for the next one.
 * Three sample numbers rotate. Every value, carrier name included, is invented
 * for illustration. Reduced-motion visitors get the finished first number.
 */

// What a lookup returns: validity, line type, the network the number was issued
// by, and the region. The US and Canada show no carrier, as on the free tool.
const SAMPLES = [
  {
    parts: [['+44', 'Country'], ['7911', 'Prefix'], ['123456', 'Subscriber']],
    valid: 'Yes', type: 'Mobile', network: 'Sample Networks', region: 'United Kingdom',
  },
  {
    parts: [['+91', 'Country'], ['98765', 'Series'], ['43210', 'Subscriber']],
    valid: 'Yes', type: 'Mobile', network: 'Demo Telecom', region: 'India',
  },
  {
    parts: [['+1', 'Country'], ['415', 'Area'], ['555', 'Exchange'], ['0123', 'Line']],
    valid: 'Yes', type: 'Mobile', network: 'Not shown (US, CA)', region: 'California',
  },
]

const TONES = ['#4f5bd5', '#ec4899', '#0f766e', '#d97706']
const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
const STEPS = 14 // ticks for one card to resolve
const LABELS = {
  type: 'Reading the number', split: 'Splitting it up', decode: 'Matching the carrier', hold: 'Match found', erase: 'Next number',
}

/** Letters that have not resolved yet are shown as shuffling glyphs. */
function reveal(text, tick, offset) {
  const t = Math.max(0, tick - offset)
  const n = Math.floor((t / STEPS) * text.length)
  return text.split('').map((c, k) => (k < n || c === ' ' || c === '+' ? c : GLYPHS[(tick * 5 + k * 7) % GLYPHS.length])).join('')
}

function NumberDecoder() {
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)
  const [phase, setPhase] = useState('type') // type, split, decode, hold, erase
  const [typed, setTyped] = useState(0)
  const [tick, setTick] = useState(0)
  const s = SAMPLES[n % SAMPLES.length]
  const total = s.parts.reduce((a, [t]) => a + t.length, 0)
  const cards = [['Valid', s.valid], ['Line type', s.type], ['Network', s.network], ['Region', s.region]]
  const decoding = phase === 'decode' || phase === 'hold'

  useEffect(() => {
    if (reduced) { setTyped(total); setTick(99); setPhase('hold'); return undefined }
    let id
    if (phase === 'type') id = setInterval(() => setTyped((t) => Math.min(total, t + 1)), 120)
    else if (phase === 'split') id = setTimeout(() => setPhase('decode'), 1100)
    else if (phase === 'decode') id = setInterval(() => setTick((t) => t + 1), 45)
    else if (phase === 'hold') id = setTimeout(() => setPhase('erase'), 2800)
    else if (phase === 'erase') id = setInterval(() => setTyped((t) => Math.max(0, t - 1)), 40)
    return () => { clearTimeout(id); clearInterval(id) }
  }, [phase, reduced, total])

  useEffect(() => {
    if (phase !== 'type' || typed < total) return undefined
    const t = setTimeout(() => setPhase('split'), 350)
    return () => clearTimeout(t)
  }, [typed, phase, total])
  useEffect(() => { if (phase === 'decode' && tick >= STEPS + 9) setPhase('hold') }, [tick, phase])
  useEffect(() => {
    if (phase === 'erase' && typed <= 0) { setN((v) => v + 1); setTick(0); setPhase('type') }
  }, [typed, phase])

  const split = phase === 'split' || decoding

  let idx = 0
  return (
    <figure className="nh" aria-label="A phone number typed out, split into its parts, and checked for validity, line type, network and region (illustrative)">
      <span className="nh-ring r1" aria-hidden="true" />
      <span className="nh-ring r2" aria-hidden="true" />
      <div className="nh-bed">
        <div className="nh-top"><span key={phase}>{LABELS[phase]}</span><em>Illustrative</em></div>

        <div className={`nh-num${split ? ' split' : ''}`} aria-hidden="true">
          {s.parts.map(([t, label], pi) => {
            const start = idx
            idx += t.length
            return (
              <span key={`${n}-${pi}`} className="nh-seg" style={{ '--c': TONES[pi % TONES.length], '--k': pi }}>
                <b>
                  {t.split('').map((ch, ci) => {
                    const at = start + ci
                    const cls = at < typed ? 'in' : at === typed && (phase === 'type' || phase === 'erase') ? 'cur' : ''
                    return <em key={ci} className={cls}>{ch}</em>
                  })}
                </b>
                <i />
                <small>{label}</small>
              </span>
            )
          })}
        </div>

        <div className={`nh-res${decoding ? ' on' : ''}`} aria-hidden="true">
          {cards.map(([label, value], i) => (
            <div key={label} style={{ '--d': `${i * 0.1}s` }}>
              <small>{label}</small>
              <b>{decoding ? reveal(value, tick, i * 3) : value.replace(/./g, '·')}</b>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

function LookupApiHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="nhh">
      <div className="container nhh-inner">
        <div className="nhh-copy">
          <span className="nhh-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="nhh-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
        </div>
        <NumberDecoder />
      </div>
    </section>
  )
}

export default LookupApiHero
