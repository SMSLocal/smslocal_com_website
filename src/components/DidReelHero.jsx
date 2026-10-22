import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck } from './icons.jsx'
import { useReducedMotion } from './cpaas/useMotion.js'
import './DidReelHero.css'

/**
 * Hero for the Virtual Numbers page. Copy on the left; on the right a number
 * console that tells the whole story in one loop: a country is typed into the
 * search, matching numbers slide in, one is picked and reserved, the list gives
 * way to a live panel, and then an inbound call and an inbound text travel
 * along their routes to a team and a CRM. Numbers and destinations are
 * fictional and everything shown is illustrative. Reduced-motion visitors get
 * the finished, live panel.
 */

const QUERY = 'United States'
const NUMBERS = ['+1 415 555 0182', '+1 415 555 0147', '+1 628 555 0119', '+1 650 555 0163']
const PICK = 1

function Console() {
  const reduced = useReducedMotion()
  // 0 typing, 1 results, 2 pressing a row, 3 reserved + live, 4 call routed, 5 text routed
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState(0)
  const [out, setOut] = useState(false)

  useEffect(() => {
    if (reduced) { setStep(5); setTyped(QUERY.length); return undefined }
    const ids = []
    const at = (ms, fn) => ids.push(setTimeout(fn, ms))
    if (step === 0) {
      for (let k = 1; k <= QUERY.length; k += 1) at(500 + k * 70, () => setTyped(k))
      at(500 + QUERY.length * 70 + 500, () => setStep(1))
    } else if (step === 1) at(2300, () => setStep(2))
    else if (step === 2) at(900, () => setStep(3))
    else if (step === 3) at(1500, () => setStep(4))
    else if (step === 4) at(2000, () => setStep(5))
    else {
      at(2800, () => setOut(true))
      at(3400, () => { setOut(false); setTyped(0); setStep(0) })
    }
    return () => ids.forEach(clearTimeout)
  }, [step, reduced])

  const live = step >= 3
  return (
    <figure className="dr" aria-label="Searching for a United States number, reserving it, and then an inbound call and text routed to a support team and a CRM (illustrative)">
      <div className={`dr-card${out ? ' out' : ''}`}>
        <div className="dr-search" aria-hidden="true">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
          <span>{QUERY.slice(0, typed)}{step === 0 && <i className="dr-caret" />}</span>
          <ul>
            <li className={typed === QUERY.length ? 'on' : ''}>Local</li>
            <li>Toll-free</li>
            <li>Mobile</li>
          </ul>
        </div>

        <div className="dr-stage">
          <ul className={`dr-list${live ? ' gone' : ''}`} aria-hidden="true">
            {NUMBERS.map((n, k) => (
              <li
                key={n}
                className={`${step >= 1 ? 'in' : ''}${k === PICK && step >= 2 ? ' pick' : ''}`}
                style={{ '--i': k }}
              >
                <b>{n}</b>
                <span>Local</span>
                <u>{k === PICK && step >= 2 ? <><IconCheck /> Reserve</> : 'Reserve'}</u>
              </li>
            ))}
          </ul>

          <div className={`dr-live${live ? ' on' : ''}`} aria-hidden="true">
            <div className="dr-num">
              <b>{NUMBERS[PICK]}</b>
              <span><i />Live</span>
            </div>

            <div className="dr-lanes">
              <div className="dr-lane">
                <span className="dr-src call">Call</span>
                <span className="dr-wire">{step === 4 && <i className="pulse" />}</span>
                <span className={`dr-dst${step >= 4 ? ' got' : ''}`}>Support team{step >= 4 && <IconCheck />}</span>
              </div>
              <div className="dr-lane">
                <span className="dr-src sms">SMS</span>
                <span className="dr-wire">{step >= 5 && <i className="pulse" />}</span>
                <span className={`dr-dst${step >= 5 ? ' got' : ''}`}>Your CRM{step >= 5 && <IconCheck />}</span>
              </div>
            </div>
          </div>
        </div>

        <ol className="dr-steps" aria-hidden="true">
          {['Search', 'Reserve', 'Route'].map((s, k) => {
            const cur = step < 2 ? 0 : step < 4 ? 1 : 2
            return <li key={s} className={k === cur ? 'on' : k < cur ? 'done' : ''}>{s}</li>
          })}
        </ol>
      </div>
      <figcaption>Illustrative</figcaption>
    </figure>
  )
}

function DidReelHero({ eyebrow, title, subtitle, primaryCta, secondaryCta, stats }) {
  return (
    <section className="drh">
      <div className="container drh-inner">
        <div className="drh-copy">
          <span className="drh-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="drh-ctas">
            <Link to={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
            <Link to={secondaryCta.href} className="btn btn-ghost">{secondaryCta.label}</Link>
          </div>
          {stats && (
            <dl className="drh-stats">
              {stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
            </dl>
          )}
        </div>
        <Console />
      </div>
    </section>
  )
}

export default DidReelHero
