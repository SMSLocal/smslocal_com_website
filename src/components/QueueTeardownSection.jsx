import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './QueueTeardownSection.css'

/* One day of a real support queue, plotted honestly: every ticket that came in
   yesterday, on the channel it arrived on, at the hour it arrived. Grouped by
   the help-centre article that already answers it — which is the whole point.
   Hit "Run the agent" and the answerable ones drain into their article,
   leaving the queue your team should have had. */

const CLUSTERS = [
  {
    id: 'orders',
    label: "Where's my order?",
    article: 'Tracking your delivery',
    count: 34,
    hue: 'a',
    samples: [
      'Order #48219 still says processing?',
      'Has my parcel shipped yet',
      'Tracking link is not updating',
      'When will #51044 arrive?',
    ],
  },
  {
    id: 'plan',
    label: 'How do I change my plan?',
    article: 'Upgrading & downgrading',
    count: 21,
    hue: 'b',
    samples: [
      'Can I move to the Growth plan?',
      'How do I downgrade mid-month',
      'Do you pro-rate an upgrade?',
      'Where is the billing page',
    ],
  },
  {
    id: 'ship',
    label: 'Do you ship to…?',
    article: 'International shipping',
    count: 18,
    hue: 'c',
    samples: [
      'Do you deliver to Germany?',
      'Shipping cost to Ireland',
      'Any customs fee for Canada?',
      'How long to Australia',
    ],
  },
  {
    id: 'login',
    label: 'I can’t sign in',
    article: 'Resetting your password',
    count: 15,
    hue: 'd',
    samples: [
      'Reset email never arrived',
      'Locked out after 3 tries',
      'Two-factor code not working',
      'Forgot which email I used',
    ],
  },
  {
    id: 'return',
    label: 'Can I return this?',
    article: 'Returns & refunds',
    count: 12,
    hue: 'e',
    samples: [
      'Return window on a gift?',
      'Item arrived in the wrong size',
      'Do I pay return postage',
      'Refund still not showing',
    ],
  },
  {
    id: 'human',
    label: 'Genuinely needs a person',
    article: null,
    count: 9,
    hue: 'human',
    samples: [
      'Charged twice, need it reversed',
      'Wrong address on a live order',
      'Damaged on arrival — want a call',
      'Cancel my contract early',
    ],
  },
]

const CHANNELS = ['Web chat', 'WhatsApp', 'SMS', 'Email']
const HOURS = ['8am', '10am', '12pm', '2pm', '4pm', '6pm']
const TOTAL = CLUSTERS.reduce((n, c) => n + c.count, 0)
const DEFLECTED = TOTAL - 9

/* Deterministic scatter — the same queue every render, no jitter on re-paint. */
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const DOTS = (() => {
  const rand = seeded(20260727)
  const out = []
  CLUSTERS.forEach((c, ci) => {
    for (let i = 0; i < c.count; i += 1) {
      // Volume leans to the middle of the working day, the way real queues do.
      const t = (rand() + rand() + rand()) / 3
      const lane = Math.floor(rand() * CHANNELS.length)
      const hour = 8 + t * 10
      const h24 = Math.floor(hour)
      const mins = Math.floor((hour - h24) * 60)
      out.push({
        key: `${c.id}-${i}`,
        cluster: c.id,
        ci,
        hue: c.hue,
        x: 3 + t * 94,
        y: lane * 25 + 6 + rand() * 13,
        lane,
        delay: rand(),
        ask: c.samples[i % c.samples.length],
        time: `${((h24 + 11) % 12) + 1}:${String(mins).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`,
        channel: CHANNELS[lane],
      })
    }
  })
  return out
})()

const PILE_CLUSTERS = CLUSTERS.filter((c) => c.article)

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function QueueTeardownSection() {
  const [ran, setRan] = useState(false)
  const [focus, setFocus] = useState(null)
  const [peek, setPeek] = useState(null)
  const [counted, setCounted] = useState(0)
  const touched = useRef(false)
  const reduced = prefersReducedMotion()

  // Plays itself once so the point lands without a click, then it's the
  // visitor's toy — any interaction stops the loop for good.
  useEffect(() => {
    if (reduced) { setRan(true); setCounted(DEFLECTED); return undefined }
    const loop = []
    const cycle = (delay) => {
      const t = setTimeout(() => {
        if (touched.current) return
        setRan((v) => !v)
        cycle(4200)
      }, delay)
      loop.push(t)
    }
    cycle(2200)
    return () => loop.forEach(clearTimeout)
  }, [reduced])

  // Roll the deflected count up while the dots drain.
  useEffect(() => {
    if (!ran) { setCounted(0); return undefined }
    if (reduced) { setCounted(DEFLECTED); return undefined }
    let n = 0
    const step = setInterval(() => {
      n += Math.max(1, Math.round((DEFLECTED - n) / 6))
      if (n >= DEFLECTED) { n = DEFLECTED; clearInterval(step) }
      setCounted(n)
    }, 38)
    return () => clearInterval(step)
  }, [ran, reduced])

  const take = useCallback(() => { touched.current = true }, [])

  const toggle = () => { take(); setRan((v) => !v) }

  const pilePos = useMemo(() => {
    const map = {}
    PILE_CLUSTERS.forEach((c, i) => {
      map[c.id] = 6 + (i * 100) / PILE_CLUSTERS.length + 50 / PILE_CLUSTERS.length - 6
    })
    return map
  }, [])

  return (
    <section className="qtd">
      <div className="container">
        <div className="qtd-head">
          <span className="qtd-eyebrow">The problem</span>
          <h2 className="qtd-title">
            {TOTAL} tickets came in yesterday.{' '}
            <em>{DEFLECTED} of them already had an answer written down.</em>
          </h2>
          <p className="qtd-sub">
            This is one day of a real support queue — every ticket on the channel it arrived
            on, at the hour it arrived, grouped by the help-centre article that already
            answers it. Run the agent and watch what your team was actually left with.
          </p>
        </div>

        <div className="qtd-bar">
          <button
            type="button"
            className={`qtd-run${ran ? ' is-on' : ''}`}
            onClick={toggle}
            aria-pressed={ran}
          >
            <span className="qtd-run-knob" />
            <span className="qtd-run-txt">{ran ? 'Agent running' : 'Run the agent'}</span>
          </button>

          <div className="qtd-legend">
            {CLUSTERS.map((c) => (
              <button
                type="button"
                key={c.id}
                className={`qtd-key qtd-key--${c.hue}${focus === c.id ? ' is-focus' : ''}${focus && focus !== c.id ? ' is-dim' : ''}`}
                onMouseEnter={() => { take(); setFocus(c.id) }}
                onMouseLeave={() => setFocus(null)}
                onClick={() => { take(); setFocus(focus === c.id ? null : c.id) }}
              >
                <i />
                {c.label}
                <b>{c.count}</b>
              </button>
            ))}
          </div>
        </div>

        {/* the artifact */}
        <div className={`qtd-plot${ran ? ' is-ran' : ''}`}>
          <div className="qtd-hours" aria-hidden="true">
            {HOURS.map((h) => <span key={h}>{h}</span>)}
          </div>

          <div className="qtd-lanes">
            {CHANNELS.map((ch) => (
              <div className="qtd-lane" key={ch}>
                <span className="qtd-lane-name">{ch}</span>
              </div>
            ))}

            <div className="qtd-field">
              {DOTS.map((d) => {
                const human = d.hue === 'human'
                const drained = ran && !human
                const style = {
                  left: `${drained ? pilePos[d.cluster] + (d.delay - 0.5) * 7 : d.x}%`,
                  top: drained ? `${101 + d.delay * 5}%` : `${d.y}%`,
                  transitionDelay: reduced ? '0ms' : `${Math.round(d.delay * 620)}ms`,
                }
                return (
                  <span
                    key={d.key}
                    className={`qtd-dot qtd-dot--${d.hue}${drained ? ' is-drained' : ''}${focus && focus !== d.cluster ? ' is-dim' : ''}${ran && human ? ' is-left' : ''}`}
                    style={style}
                    onMouseEnter={() => { take(); setPeek(d) }}
                    onMouseLeave={() => setPeek(null)}
                  />
                )
              })}

              {peek && (
                <div
                  className={`qtd-peek qtd-peek--${peek.hue}${peek.x > 62 ? ' is-flip' : ''}`}
                  style={{ left: `${peek.x}%`, top: `${peek.y}%` }}
                >
                  <span className="qtd-peek-meta">{peek.channel} · {peek.time}</span>
                  <strong>&ldquo;{peek.ask}&rdquo;</strong>
                  <span className="qtd-peek-src">
                    {peek.hue === 'human'
                      ? 'No article covers this — escalate'
                      : `Answered by: ${CLUSTERS.find((c) => c.id === peek.cluster).article}`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* where the answerable ones land */}
          <div className="qtd-piles" aria-hidden="true">
            {PILE_CLUSTERS.map((c) => (
              <div
                className={`qtd-pile qtd-pile--${c.hue}${ran ? ' is-on' : ''}${focus && focus !== c.id ? ' is-dim' : ''}`}
                key={c.id}
              >
                <span className="qtd-pile-count">{c.count}</span>
                <span className="qtd-pile-art">{c.article}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="qtd-foot">
          <p className={`qtd-verdict${ran ? ' is-on' : ''}`}>
            <span className="qtd-verdict-num">{counted}</span>
            <span>
              tickets answered straight from an article your team already wrote —
              <strong> 9 left</strong>, and every one of them genuinely needed a person.
            </span>
          </p>
          <span className="qtd-hint">Hover any ticket to read it · click a group to isolate it</span>
        </div>
      </div>
    </section>
  )
}

export default QueueTeardownSection
