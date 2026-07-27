import { useCallback, useEffect, useRef, useState } from 'react'
import './TeamLoadSection.css'

/* Why deflection works, shown as the thing it actually changes: your team's
   day. Six real shifts, blocked out hour by hour. Drag the deflection dial and
   the repeat-question blocks physically disappear from everyone's day — and the
   seventh row, the hire you were about to make, stops being necessary. */

const SHIFT_MINS = 480
const HOURS = ['9am', '11am', '1pm', '3pm', '5pm']

const TEAM = [
  { name: 'Maya', role: 'Tier one', blocks: [['t1', 210], ['real', 150], ['admin', 60], ['t1', 60]] },
  { name: 'Jonas', role: 'Tier one', blocks: [['t1', 240], ['real', 120], ['admin', 45], ['t1', 75]] },
  { name: 'Priya', role: 'Escalations', blocks: [['t1', 180], ['real', 180], ['admin', 60], ['t1', 60]] },
  { name: 'Tom', role: 'Tier one', blocks: [['t1', 255], ['real', 105], ['admin', 45], ['t1', 75]] },
  { name: 'Lena', role: 'Escalations', blocks: [['t1', 195], ['real', 165], ['admin', 60], ['t1', 60]] },
  { name: 'Omar', role: 'Tier one', blocks: [['t1', 225], ['real', 135], ['admin', 45], ['t1', 75]] },
]

const T1_TOTAL = TEAM.reduce(
  (n, a) => n + a.blocks.filter((b) => b[0] === 't1').reduce((m, b) => m + b[1], 0),
  0,
)

const STOPS = [0, 40, 70, 90]

function hrs(mins) {
  const h = Math.floor(mins / 60)
  const m = Math.round(mins % 60)
  if (h === 0) return `${m}m`
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function TeamLoadSection() {
  const [pct, setPct] = useState(0)
  const touched = useRef(false)
  const reduced = prefersReducedMotion()

  // Runs itself up to 70% once — the default deflection rate — so the point
  // lands before anyone touches it. Any interaction takes over for good.
  useEffect(() => {
    if (reduced) { setPct(70); return undefined }
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        if (touched.current) return clearInterval(tick)
        setPct((p) => {
          if (p >= 70) { clearInterval(tick); return 70 }
          return p + 2
        })
      }, 26)
    }, 900)
    return () => clearTimeout(start)
  }, [reduced])

  const take = useCallback(() => { touched.current = true }, [])

  const d = pct / 100
  const freed = T1_TOTAL * d
  const perAgent = freed / TEAM.length
  const peak = Math.round(38 - 32 * d)
  const firstReply = d > 0.55 ? 'instant' : `${Math.max(1, Math.round(14 * (1 - d)))} min`
  const needSeventh = pct < 35

  return (
    <section className="tld">
      <div className="container">
        <div className="tld-head">
          <div>
            <span className="tld-eyebrow">Why it works</span>
            <h2 className="tld-title">
              A shorter queue, <em>not a bigger team</em>
            </h2>
          </div>
          <p className="tld-sub">
            Here is the same six-person support team&apos;s Tuesday, blocked out hour by hour.
            Pull the dial and watch the repeat-question blocks leave their day — that reclaimed
            time is the entire argument.
          </p>
        </div>

        {/* the dial */}
        <div className="tld-dial">
          <div className="tld-dial-label">
            <span>Tier-one deflection</span>
            <strong>{pct}%</strong>
          </div>
          <div className="tld-slider">
            <span className="tld-slider-fill" style={{ width: `${pct}%` }} />
            <input
              type="range"
              min="0"
              max="90"
              step="1"
              value={pct}
              aria-label="Tier-one deflection rate"
              onChange={(e) => { take(); setPct(Number(e.target.value)) }}
              onMouseDown={take}
              onTouchStart={take}
              onKeyDown={take}
            />
            <div className="tld-stops" aria-hidden="true">
              {STOPS.map((s) => (
                <button
                  type="button"
                  key={s}
                  tabIndex={-1}
                  className={`tld-stop${pct >= s ? ' is-past' : ''}`}
                  style={{ left: `${(s / 90) * 100}%` }}
                  onClick={() => { take(); setPct(s) }}
                >
                  <i />
                  <em>{s}%</em>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* the artifact — the team's actual day */}
        <div className="tld-board">
          <div className="tld-ruler" aria-hidden="true">
            {HOURS.map((h) => <span key={h}>{h}</span>)}
          </div>

          {TEAM.map((a) => {
            const gone = a.blocks
              .filter((b) => b[0] === 't1')
              .reduce((m, b) => m + b[1], 0) * d
            return (
              <div className="tld-row" key={a.name}>
                <span className="tld-who">
                  <i className="tld-av">{a.name.charAt(0)}</i>
                  <span className="tld-who-txt">
                    <b>{a.name}</b>
                    <em>{a.role}</em>
                  </span>
                </span>

                <span className="tld-track">
                  {a.blocks.map((b, i) => {
                    const [type, mins] = b
                    const w = (type === 't1' ? mins * (1 - d) : mins) / SHIFT_MINS * 100
                    return (
                      <span
                        key={`${a.name}-${i}`}
                        className={`tld-blk tld-blk--${type}`}
                        style={{ width: `${w}%` }}
                        title={type === 't1' ? 'Answering repeat questions' : type === 'real' ? 'Cases that need a person' : 'Admin & wrap-up'}
                      />
                    )
                  })}
                  <span
                    className={`tld-blk tld-blk--free${gone > 6 ? ' is-on' : ''}`}
                    style={{ width: `${(gone / SHIFT_MINS) * 100}%` }}
                  >
                    <em>+{hrs(gone)}</em>
                  </span>
                </span>
              </div>
            )
          })}

          {/* the hire that stops being necessary */}
          <div className={`tld-row tld-row--ghost${needSeventh ? '' : ' is-gone'}`}>
            <span className="tld-who">
              <i className="tld-av tld-av--ghost">+1</i>
              <span className="tld-who-txt">
                <b>The seventh hire</b>
                <em>{needSeventh ? 'needed to keep up' : 'no longer needed'}</em>
              </span>
            </span>
            <span className="tld-track tld-track--ghost">
              <span className="tld-ghost-txt">
                {needSeventh
                  ? 'At this deflection rate the queue still outruns six people.'
                  : 'The queue fits the team you already have.'}
              </span>
            </span>
          </div>
        </div>

        {/* what that buys, read live off the dial */}
        <div className="tld-out">
          <div className="tld-out-main">
            <span className="tld-out-num">{hrs(freed)}</span>
            <span className="tld-out-txt">
              of your team&apos;s day handed back — <strong>{hrs(perAgent)} each</strong>, every day,
              spent on cases that actually need judgement.
            </span>
          </div>
          <div className="tld-out-side">
            <span className="tld-stat">
              <b>{peak}</b>
              <em>peak tickets waiting</em>
            </span>
            <span className="tld-stat">
              <b>{firstReply}</b>
              <em>first reply</em>
            </span>
            <span className="tld-stat">
              <b>{needSeventh ? 7 : 6}</b>
              <em>people needed</em>
            </span>
          </div>
        </div>

        <div className="tld-legend">
          <span className="tld-lg tld-lg--t1">Repeat questions</span>
          <span className="tld-lg tld-lg--real">Cases that need a person</span>
          <span className="tld-lg tld-lg--admin">Admin &amp; wrap-up</span>
          <span className="tld-lg tld-lg--free">Handed back by the agent</span>
        </div>
      </div>
    </section>
  )
}

export default TeamLoadSection
