import { useRef, useState } from 'react'
import { Head } from './VerifyApiSections.jsx'
import { useInView } from './useMotion.js'
import './verify-api-extras.css'

/**
 * Two more sections for the Verify API page: a passcode tuner (three choices,
 * plain-language result) and a drop-off funnel. Both are calm, light-themed and
 * use the same `vx-` look as the other sections. Numbers are illustrative.
 */

/* ═════ Passcode tuner ═════ */

const LENGTHS = [4, 6, 8]
const LIFETIMES = [1, 5, 10]
const TRIES = [3, 5, 10]

function Segmented({ label, value, options, onChange, fmt }) {
  return (
    <div className="vt-seg" role="radiogroup" aria-label={label}>
      <span className="vt-seg-l">{label}</span>
      <div>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={o === value} className={o === value ? 'on' : ''} onClick={() => onChange(o)}>{fmt(o)}</button>
        ))}
      </div>
    </div>
  )
}

export function PasscodeTuner({ eyebrow, title, subtitle }) {
  const [len, setLen] = useState(6)
  const [mins, setMins] = useState(5)
  const [tries, setTries] = useState(3)
  const odds = Math.round(10 ** len / tries)
  const strength = Math.min(1, Math.max(0.08, (Math.log10(odds) - 2.5) / 5.5))
  const label = strength < 0.4 ? 'Light' : strength < 0.7 ? 'Solid' : 'Strong'
  return (
    <section className="vt">
      <div className="container vt-grid">
        <div>
          <Head eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="vt-list">
            <Segmented label="Length" value={len} options={LENGTHS} onChange={setLen} fmt={(v) => `${v} digits`} />
            <Segmented label="Lifetime" value={mins} options={LIFETIMES} onChange={setMins} fmt={(v) => `${v} min`} />
            <Segmented label="Tries allowed" value={tries} options={TRIES} onChange={setTries} fmt={(v) => `${v} tries`} />
          </div>
        </div>

        <div className="vt-out">
          <div className="vt-code" aria-hidden="true">
            {Array.from({ length: len }, (_, i) => <span key={`${len}-${i}`} style={{ '--i': i }}>{(i * 7 + 4) % 10}</span>)}
          </div>
          <p className="vt-sum" aria-live="polite">
            A {len}-digit code that works for {mins} {mins === 1 ? 'minute' : 'minutes'} and allows {tries} tries.
          </p>
          <div className="vt-meter">
            <div><i style={{ width: `${Math.round(strength * 100)}%` }} /></div>
            <span><b>{label}</b> against blind guessing</span>
          </div>
          <p className="vt-odds">A random guess lands within {tries} tries about <strong>1 in {odds.toLocaleString('en-US')}</strong> times.</p>
          <p className="vt-note">These rules live in your own app. Pair them with a limit on how often a number can ask for a new code. We deliver the passcode; you decide how it behaves.</p>
        </div>
      </div>
    </section>
  )
}

/* ═════ Drop-off funnel ═════ */

const FUNNEL = [
  { label: 'Code requested', n: 1000, tip: 'Every request returns a message ID, so each passcode can be followed from the start.' },
  { label: 'Code delivered', n: 962, tip: 'Delivery reports show which messages reached a phone and which did not, so a bad route or a mistyped number stands out.' },
  { label: 'Code entered', n: 846, tip: 'Users who got the code but never typed it often waited too long, let it expire or changed their mind.' },
  { label: 'Number verified', n: 811, tip: 'A gap here usually means wrong or expired codes. Watch it after any change to the flow.' },
]

export function DropoffFunnel({ eyebrow, title, subtitle }) {
  const ref = useRef(null)
  const seen = useInView(ref)
  const [on, setOn] = useState(1)
  return (
    <section className="vf" ref={ref}>
      <div className="container">
        <Head eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
        <div className="vf-card">
          <div className="vf-top"><span>Example sign-up funnel</span><em>Illustrative</em></div>
          <ol className="vf-rows">
            {FUNNEL.map((f, i) => {
              const lost = i > 0 ? FUNNEL[i - 1].n - f.n : 0
              return (
                <li key={f.label} className={i === on ? 'on' : ''}>
                  {i > 0 && <span className="vf-lost">−{lost} lost</span>}
                  <button type="button" onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} onClick={() => setOn(i)} aria-pressed={i === on}>
                    <span className="vf-l">{f.label}</span>
                    <span className="vf-track"><i style={{ width: seen ? `${f.n / 10}%` : '0%', transitionDelay: `${i * 0.12}s` }} /></span>
                    <b>{f.n.toLocaleString('en-US')}</b>
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="vf-tip" aria-live="polite" key={on}>{FUNNEL[on].tip}</p>
        </div>
      </div>
    </section>
  )
}
