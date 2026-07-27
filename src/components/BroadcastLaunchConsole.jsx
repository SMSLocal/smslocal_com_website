import { useEffect, useRef, useState } from 'react'
import './BroadcastLaunchConsole.css'

/**
 * Bespoke "how it works" section for /channels/sms-broadcasting.
 * Instead of a static numbered stepper, each step drives a live stage that
 * PERFORMS the thing it describes: contacts stream in, a merge token resolves
 * into real names, segment filters narrow a live audience count, then delivery
 * receipts and link clicks tick in.
 *
 * Interactive — click any step to jump; hover pauses the autoplay.
 * All timing is JS (setInterval) rather than CSS/rAF so the stages advance
 * reliably, and every stage has a meaningful resting state.
 */

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const STEPS = [
  { k: 'import', n: 'Import your opt-in list', d: 'Upload contacts or sync your CRM — consent and opt-out status travel with every record.' },
  { k: 'write', n: 'Write and personalize', d: 'Draft once and merge in names, order details or any variable that makes it personal.' },
  { k: 'segment', n: 'Segment and schedule', d: 'Target the exact slice of your list, then pick the moment it should go out.' },
  { k: 'send', n: 'Send and track', d: 'Broadcast to the whole segment at once, then watch receipts and clicks land live.' },
]

const CONTACTS = [
  { n: 'Emma Clarke', p: '+44 7700 900 981', c: 'UK' },
  { n: 'Ryan Mitchell', p: '+1 415 555 0134', c: 'US' },
  { n: 'Sophie Bauer', p: '+49 151 2345 678', c: 'DE' },
  { n: 'Marco Ricci', p: '+39 345 678 901', c: 'IT' },
  { n: 'Claire Dubois', p: '+33 6 12 34 56 78', c: 'FR' },
]

const FILTERS = [
  { label: 'Opted in', count: 12480 },
  { label: 'Active 30d', count: 8240 },
  { label: 'Tag: VIP', count: 3120 },
]

const RECEIPTS = [
  { p: '+44 7700 ••• 981', s: 'Delivered', t: '0.6s' },
  { p: '+1 415 ••• 0134', s: 'Delivered', t: '0.9s' },
  { p: '+49 151 ••• 678', s: 'Clicked', t: 'link' },
  { p: '+33 6 12 ••• 78', s: 'Delivered', t: '1.1s' },
]

const STEP_MS = 5200

function BroadcastLaunchConsole({ eyebrow = 'How it works', title, subtitle }) {
  const [active, setActive] = useState(0)
  const [beat, setBeat] = useState(0) // sub-step progress inside a stage
  const [paused, setPaused] = useState(false)
  const [nonce, setNonce] = useState(0) // bumped on manual click to restart dwell
  const beatRef = useRef(null)

  // advance stages — `nonce` guarantees a click restarts the dwell timer
  useEffect(() => {
    if (paused || REDUCED) return undefined
    const id = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS)
    return () => clearTimeout(id)
  }, [active, paused, nonce])

  // drive the reveal inside the current stage. Ticks fast enough that every
  // stage reaches its resting state well inside the dwell, with headroom for
  // slow/throttled timers.
  useEffect(() => {
    setBeat(REDUCED ? 9 : 0)
    if (REDUCED) return undefined
    clearInterval(beatRef.current)
    beatRef.current = setInterval(() => {
      setBeat((b) => {
        if (b >= 9) {
          clearInterval(beatRef.current)
          return 9
        }
        return b + 1
      })
    }, 240)
    return () => clearInterval(beatRef.current)
  }, [active])

  const pick = (i) => {
    setActive(i)
    setNonce((n) => n + 1)
  }

  const step = STEPS[active]

  const audience =
    beat >= 4 ? FILTERS[2].count : beat >= 3 ? FILTERS[1].count : FILTERS[0].count

  return (
    <section className="blc-section">
      <div className="container">
        <div className="blc-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div
          className="blc"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT — the step rail */}
          <ol className="blc-rail">
            {STEPS.map((s, i) => (
              <li key={s.k}>
                <button
                  type="button"
                  className={`blc-step${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                  onClick={() => pick(i)}
                  aria-current={i === active}
                >
                  <span className="blc-step-n">
                    {i < active ? (
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                    ) : (
                      String(i + 1).padStart(2, '0')
                    )}
                  </span>
                  <span className="blc-step-tx">
                    <strong>{s.n}</strong>
                    <span>{s.d}</span>
                  </span>
                  {i === active && !paused && !REDUCED && (
                    <span className="blc-step-bar" style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </ol>

          {/* RIGHT — the live stage */}
          <div className="blc-stage" key={step.k}>
            {/* 1 — contacts streaming in */}
            {step.k === 'import' && (
              <div className="blc-pane">
                <div className="blc-pane-top">
                  <span className="blc-tag">contacts.csv</span>
                  <span className="blc-count">{Math.min(beat, 5)} of 5 shown</span>
                </div>
                <ul className="blc-rows">
                  {CONTACTS.map((c, i) => (
                    <li key={c.p} className={`blc-row${beat > i ? ' is-in' : ''}`}>
                      <span className="blc-cc">{c.c}</span>
                      <span className="blc-name">{c.n}</span>
                      <span className="blc-phone">{c.p}</span>
                      <span className="blc-ok">
                        <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                        consent
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="blc-foot"><strong>12,480</strong> opted-in records imported</p>
              </div>
            )}

            {/* 2 — token resolving into real names */}
            {step.k === 'write' && (
              <div className="blc-pane">
                <div className="blc-pane-top">
                  <span className="blc-tag">message</span>
                  <span className="blc-count">1 draft · 12,480 versions</span>
                </div>
                <p className="blc-compose">
                  Hi <span className="blc-token">{'{{first_name}}'}</span>, flash sale — 50% off today only.
                  Shop: <span className="blc-link">smsl.co/x7k</span>
                </p>
                <span className="blc-arrow" aria-hidden="true">resolves to</span>
                <ul className="blc-previews">
                  {CONTACTS.slice(0, 3).map((c, i) => (
                    <li key={c.p} className={`blc-prev${beat > i + 1 ? ' is-in' : ''}`}>
                      Hi <b>{c.n.split(' ')[0]}</b>, flash sale — 50% off today only.
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3 — filters narrowing a live audience */}
            {step.k === 'segment' && (
              <div className="blc-pane">
                <div className="blc-pane-top">
                  <span className="blc-tag">segment</span>
                  <span className="blc-count">live audience</span>
                </div>
                <div className="blc-filters">
                  {FILTERS.map((f, i) => (
                    <span key={f.label} className={`blc-filter${beat >= i + 2 ? ' is-on' : ''}`}>
                      <span className="blc-check" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                      </span>
                      {f.label}
                    </span>
                  ))}
                </div>
                <p className="blc-audience">
                  <strong>{audience.toLocaleString()}</strong>
                  <span>recipients match</span>
                </p>
                <p className="blc-sched">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  Scheduled — Thu 09:00, recipient local time
                </p>
              </div>
            )}

            {/* 4 — receipts and clicks landing */}
            {step.k === 'send' && (
              <div className="blc-pane">
                <div className="blc-pane-top">
                  <span className="blc-tag blc-tag--live">
                    <span className="blc-dot" aria-hidden="true" />sending
                  </span>
                  <span className="blc-count">delivery receipts</span>
                </div>
                <ul className="blc-rows">
                  {RECEIPTS.map((r, i) => (
                    <li key={r.p} className={`blc-row${beat > i ? ' is-in' : ''}`}>
                      <span className="blc-phone blc-phone--wide">{r.p}</span>
                      <span className={`blc-state blc-state--${r.s === 'Clicked' ? 'click' : 'ok'}`}>{r.s}</span>
                      <span className="blc-t">{r.t}</span>
                    </li>
                  ))}
                </ul>
                <p className="blc-foot blc-foot--split">
                  <span><strong>12,214</strong> delivered</span>
                  <span><strong>1,306</strong> link clicks</span>
                  <span><strong>98.4%</strong> success</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BroadcastLaunchConsole
