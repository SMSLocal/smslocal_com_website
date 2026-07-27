import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './QueueReplayConsole.css'

/* Yesterday's support queue, replayed. Tickets arrive on the channel and at the
   minute they actually arrived, stream toward the agent, and are either matched
   to the help-centre article that already answered them — or handed to your team.
   The whole working day runs in about twenty seconds. */

const CLUSTERS = [
  {
    id: 'orders',
    hue: 'a',
    label: "Where's my order?",
    article: 'Tracking your delivery',
    count: 34,
    samples: [
      'Order #48219 still says processing?',
      'Has my parcel shipped yet',
      'Tracking link is not updating',
      'When will #51044 arrive?',
      'Says delivered but nothing here',
      'Can I get a new tracking number',
    ],
  },
  {
    id: 'plan',
    hue: 'b',
    label: 'How do I change my plan?',
    article: 'Upgrading & downgrading',
    count: 21,
    samples: [
      'Can I move to the Growth plan?',
      'How do I downgrade mid-month',
      'Do you pro-rate an upgrade?',
      'Where is the billing page',
      'Can I pay yearly instead',
      'What happens to my credits if I switch',
    ],
  },
  {
    id: 'ship',
    hue: 'c',
    label: 'Do you ship to…?',
    article: 'International shipping',
    count: 18,
    samples: [
      'Do you deliver to Germany?',
      'Shipping cost to Ireland',
      'Any customs fee for Canada?',
      'How long to Australia',
      'Do you ship to a PO box',
      'Can I change the delivery country',
    ],
  },
  {
    id: 'login',
    hue: 'd',
    label: 'I can’t sign in',
    article: 'Resetting your password',
    count: 15,
    samples: [
      'Reset email never arrived',
      'Locked out after 3 tries',
      'Two-factor code not working',
      'Forgot which email I used',
      'Says account not found',
      'New phone, lost my authenticator',
    ],
  },
  {
    id: 'return',
    hue: 'e',
    label: 'Can I return this?',
    article: 'Returns & refunds',
    count: 12,
    samples: [
      'Return window on a gift?',
      'Item arrived in the wrong size',
      'Do I pay return postage',
      'Refund still not showing',
      'Can I swap instead of refund',
      'Opened the box — still returnable?',
    ],
  },
  {
    id: 'human',
    hue: 'human',
    label: 'Needs a person',
    article: null,
    count: 9,
    samples: [
      'Charged twice, need it reversed',
      'Wrong address on a live order',
      'Damaged on arrival — want a call',
      'Cancel my contract early',
      'Your driver left it with a neighbour I don’t know',
      'Invoice needs a different company name',
      'Threatening to go to my bank over this',
      'Bulk order for 400 units — who do I speak to',
      'Account was set up by someone who left',
    ],
  },
]

const BINS = CLUSTERS.filter((c) => c.article)
const CHANNELS = ['Web chat', 'WhatsApp', 'SMS', 'Email']
const HOURS = ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6']
const DAY = 600 // 8:00am → 6:00pm in minutes
const TOTAL = CLUSTERS.reduce((n, c) => n + c.count, 0)
const HUMAN = 9
const DEFLECTED = TOTAL - HUMAN

const FLIGHT = 2300 // ms a ticket spends on screen
const STEP_MS = 90
const STEP_MIN = 3.4

/* Deterministic — the same day, every visit. */
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const TICKETS = (() => {
  const rand = seeded(20260727)
  const out = []
  CLUSTERS.forEach((c) => {
    for (let i = 0; i < c.count; i += 1) {
      const bias = (rand() + rand() + rand()) / 3 // volume leans to midday
      const at = Math.round(bias * DAY)
      const lane = Math.floor(rand() * CHANNELS.length)
      out.push({
        id: `${c.id}-${i}`,
        cluster: c.id,
        hue: c.hue,
        lane,
        at,
        text: c.samples[i % c.samples.length],
        channel: CHANNELS[lane],
        time: '',
      })
    }
  })
  out.sort((a, b) => a.at - b.at)
  // Stretch the day so the first ticket lands the moment you hit play and the
  // last one lands just before 6pm — no dead air at either end.
  const lo = out[0].at
  const hi = out[out.length - 1].at
  out.forEach((k) => {
    k.at = Math.round(((k.at - lo) / (hi - lo)) * (DAY - 12))
    const h24 = 8 + Math.floor(k.at / 60)
    const mins = k.at % 60
    k.time = `${((h24 + 11) % 12) + 1}:${String(mins).padStart(2, '0')}${h24 < 12 ? 'am' : 'pm'}`
  })
  return out
})()

const BIN_X = BINS.map((_, i) => 26 + i * 17.2)
const clusterOf = (id) => CLUSTERS.find((c) => c.id === id)
const emptyCounts = () => ({ orders: 0, plan: 0, ship: 0, login: 0, return: 0 })

function clock(min) {
  const h24 = 8 + Math.floor(min / 60)
  const m = Math.floor(min % 60)
  if (h24 >= 18) return '6:00 pm'
  return `${((h24 + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h24 < 12 ? 'am' : 'pm'}`
}

function reducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function QueueReplayConsole() {
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [chips, setChips] = useState([])
  const [counts, setCounts] = useState(emptyCounts)
  const [pen, setPen] = useState([])
  const [reading, setReading] = useState(null)
  const [pulse, setPulse] = useState(null)
  const [hover, setHover] = useState(null)
  const [started, setStarted] = useState(false)

  const cursor = useRef(0)
  const stage = useRef(null)
  const uid = useRef(0)
  const gen = useRef(0)
  const landed = useRef(new Set())
  const timers = useRef([])
  const reduced = useMemo(reducedMotion, [])

  const resolved = counts.orders + counts.plan + counts.ship + counts.login + counts.return
  const done = t >= DAY && chips.length === 0
  const progress = Math.min(100, (t / DAY) * 100)

  /* Start when the section is actually looked at, not before. */
  useEffect(() => {
    if (reduced) {
      setT(DAY)
      setCounts({ orders: 34, plan: 21, ship: 18, login: 15, return: 12 })
      setPen(TICKETS.filter((k) => k.hue === 'human').slice().reverse())
      cursor.current = TICKETS.length
      setStarted(true)
      return undefined
    }
    const node = stage.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setPlaying(true)
      setStarted(true)
      return undefined
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setStarted((s) => {
            if (!s) setPlaying(true)
            return true
          })
          io.disconnect()
        }
      })
    }, { threshold: 0.35 })
    io.observe(node)
    return () => io.disconnect()
  }, [reduced])

  /* The clock. Everything else follows from it. */
  useEffect(() => {
    if (!playing) return undefined
    const tick = setInterval(() => {
      setT((prev) => {
        const next = prev + STEP_MIN
        const spawn = []
        while (cursor.current < TICKETS.length && TICKETS[cursor.current].at <= next) {
          spawn.push(TICKETS[cursor.current])
          cursor.current += 1
        }
        if (spawn.length) {
          const fresh = spawn.map((k) => {
            uid.current += 1
            return { ...k, key: `${k.id}-${uid.current}`, gen: gen.current }
          })
          fresh.forEach((k) => { timers.current.push(setTimeout(() => land(k), FLIGHT + 260)) })
          setChips((live) => live.concat(fresh))
          setReading(spawn[spawn.length - 1])
        }
        if (next >= DAY) {
          setT(DAY)
          return DAY
        }
        return next
      })
    }, STEP_MS)
    return () => clearInterval(tick)
  }, [playing])

  useEffect(() => {
    if (t >= DAY && cursor.current >= TICKETS.length) setPlaying(false)
  }, [t])

  /* A chip lands when its flight animation ends — but a backgrounded tab can
     suspend animations, so a timer lands it either way. Never twice, and never
     into a run that has since been replayed or scrubbed away. */
  const land = useCallback((chip) => {
    if (chip.gen !== gen.current || landed.current.has(chip.key)) return
    landed.current.add(chip.key)
    setChips((live) => live.filter((c) => c.key !== chip.key))
    if (chip.hue === 'human') {
      setPen((p) => [chip, ...p])
    } else {
      setCounts((c) => ({ ...c, [chip.cluster]: c[chip.cluster] + 1 }))
      setPulse({ id: chip.cluster, key: chip.key })
    }
  }, [])

  const reset = useCallback(() => {
    gen.current += 1
    landed.current.clear()
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPulse(null)
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Let the shelf-nudge animation retrigger on the next hit.
  useEffect(() => {
    if (!pulse) return undefined
    const clear = setTimeout(() => setPulse(null), 360)
    return () => clearTimeout(clear)
  }, [pulse])

  const replay = () => {
    reset()
    cursor.current = 0
    uid.current = 0
    setChips([])
    setCounts(emptyCounts())
    setPen([])
    setReading(null)
    setT(0)
    setStarted(true)
    setPlaying(true)
  }

  /* Scrub: jump the day to a point and settle everything that had happened by then. */
  const scrubTo = (ratio) => {
    reset()
    const to = Math.max(0, Math.min(DAY, Math.round(ratio * DAY)))
    const past = TICKETS.filter((k) => k.at <= to)
    cursor.current = past.length
    const c = emptyCounts()
    past.forEach((k) => { if (k.hue !== 'human') c[k.cluster] += 1 })
    setCounts(c)
    setPen(past.filter((k) => k.hue === 'human').reverse())
    setChips([])
    setReading(past[past.length - 1] || null)
    setT(to)
    setStarted(true)
    setPlaying(to < DAY)
  }

  const onScrub = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    scrubTo((e.clientX - box.left) / box.width)
  }

  return (
    <section className="qrc">
      <div className="container">
        <div className="qrc-head">
          <div>
            <span className="qrc-eyebrow">The problem</span>
            <h2 className="qrc-title">
              Watch yesterday&apos;s queue{' '}
              <em>answer itself.</em>
            </h2>
          </div>
          <p className="qrc-sub">
            {TOTAL} real tickets, arriving on the channel and at the minute they actually
            arrived. The agent reads each one against your help centre as it lands. Ten
            hours of support, replayed in twenty seconds.
          </p>
        </div>

        {/* ---------- the console ---------- */}
        <div className={`qrc-console${done ? ' is-done' : ''}${playing ? ' is-live' : ''}`}>
          <div className="qrc-topbar">
            <button
              type="button"
              className={`qrc-play${playing ? ' is-playing' : ''}`}
              onClick={() => (done ? replay() : setPlaying((p) => !p))}
              aria-label={done ? 'Replay the day' : playing ? 'Pause' : 'Play'}
            >
              <span className="qrc-play-ico" aria-hidden="true" />
              {done ? 'Replay the day' : playing ? 'Pause' : started ? 'Resume' : 'Run the day'}
            </button>

            <div className="qrc-clock">
              <span className={`qrc-dot-live${playing ? ' is-on' : ''}`} />
              <b>{clock(t)}</b>
              <span>Tue · yesterday</span>
            </div>

            <div className="qrc-ticker" aria-live="off">
              {reading ? (
                <>
                  <span className={`qrc-ticker-chan qrc-c--${reading.hue}`}>{reading.channel}</span>
                  <span className="qrc-ticker-txt">&ldquo;{reading.text}&rdquo;</span>
                  <span className="qrc-ticker-arrow" aria-hidden="true">→</span>
                  <span className="qrc-ticker-out">
                    {reading.hue === 'human'
                      ? 'no article covers this'
                      : clusterOf(reading.cluster).article}
                  </span>
                </>
              ) : (
                <span className="qrc-ticker-idle">waiting for the first ticket of the day…</span>
              )}
            </div>

            <div className="qrc-tally">
              <span className="qrc-tally-n">{resolved}</span>
              <span className="qrc-tally-l">answered</span>
              <span className="qrc-tally-sep" />
              <span className="qrc-tally-n is-human">{pen.length}</span>
              <span className="qrc-tally-l">for your team</span>
            </div>
          </div>

          <div className="qrc-stage" ref={stage}>
            {/* channel lanes the tickets fly in on */}
            <div className="qrc-lanes" aria-hidden="true">
              {CHANNELS.map((ch, i) => (
                <div className="qrc-lane" key={ch} style={{ top: `${9 + i * 15}%` }}>
                  <span className="qrc-lane-name">{ch}</span>
                  <span className="qrc-lane-rule" />
                </div>
              ))}
            </div>

            {/* the agent */}
            <div className={`qrc-gate${playing ? ' is-on' : ''}`} aria-hidden="true">
              <span className="qrc-gate-ring" />
              <span className="qrc-gate-ring qrc-gate-ring--2" />
              <span className="qrc-gate-core" />
              <span className="qrc-gate-label">agent</span>
            </div>

            {/* tickets in flight */}
            {chips.map((c) => {
              const human = c.hue === 'human'
              const bi = BINS.findIndex((b) => b.id === c.cluster)
              const style = {
                '--y0': `${9 + c.lane * 15}%`,
                '--x1': human ? '5%' : `${BIN_X[bi]}%`,
                '--y1': human ? '30%' : '86%',
                animationDuration: `${FLIGHT}ms`,
              }
              return (
                <span
                  key={c.key}
                  className={`qrc-chip qrc-c--${c.hue}${hover && hover !== c.cluster ? ' is-dim' : ''}`}
                  style={style}
                  onAnimationEnd={() => land(c)}
                >
                  <i />
                  {c.text}
                </span>
              )
            })}

            {/* what the agent handed to a human */}
            <div className={`qrc-pen${pen.length ? ' is-filling' : ''}`}>
              <span className="qrc-pen-head">
                For your team
                <b>{pen.length}</b>
              </span>
              <div className="qrc-pen-stack">
                {pen.map((k) => (
                  <div className="qrc-pen-card" key={k.id}>
                    <span className="qrc-pen-meta">{k.channel} · {k.time}</span>
                    <strong>{k.text}</strong>
                  </div>
                ))}
                {!pen.length && <span className="qrc-pen-empty">nothing yet</span>}
              </div>
            </div>

            {/* where the answerable ones land */}
            <div className="qrc-bins">
              {BINS.map((b) => {
                const n = counts[b.id]
                const pct = (n / b.count) * 100
                return (
                  <button
                    type="button"
                    key={b.id}
                    className={`qrc-bin qrc-c--${b.hue}${pulse && pulse.id === b.id ? ' is-hit' : ''}${hover === b.id ? ' is-focus' : ''}${hover && hover !== b.id ? ' is-dim' : ''}`}
                    style={{ left: `${BIN_X[BINS.indexOf(b)]}%` }}
                    onMouseEnter={() => setHover(b.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(b.id)}
                    onBlur={() => setHover(null)}
                  >
                    <span className="qrc-bin-fill" style={{ height: `${pct}%` }} />
                    <span className="qrc-bin-body">
                      <span className="qrc-bin-n">{n}</span>
                      <span className="qrc-bin-q">{b.label}</span>
                      <span className="qrc-bin-art">{b.article}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className={`qrc-verdict${done ? ' is-on' : ''}`}>
              <span className="qrc-verdict-n">{DEFLECTED}</span>
              <span className="qrc-verdict-txt">
                answered from articles your team had already written.
                <b> {HUMAN} needed a person</b> — and got one, with the whole thread attached.
              </span>
              <button type="button" className="qrc-verdict-btn" onClick={replay}>Run it again</button>
            </div>
          </div>

          {/* scrub the day */}
          <div className="qrc-timeline">
            <div className="qrc-track" onClick={onScrub} role="presentation">
              <span className="qrc-track-fill" style={{ width: `${progress}%` }} />
              <span className="qrc-track-head" style={{ left: `${progress}%` }} />
              {TICKETS.map((k) => (
                <span
                  key={`t-${k.id}`}
                  className={`qrc-tick qrc-c--${k.hue}${k.at <= t ? ' is-past' : ''}`}
                  style={{ left: `${(k.at / DAY) * 100}%` }}
                />
              ))}
            </div>
            <div className="qrc-hours" aria-hidden="true">
              {HOURS.map((h) => <span key={h}>{h}</span>)}
            </div>
          </div>
        </div>

        <p className="qrc-note">Drag-free: click anywhere on the day to jump there · hover a shelf to isolate its tickets</p>
      </div>
    </section>
  )
}

export default QueueReplayConsole
