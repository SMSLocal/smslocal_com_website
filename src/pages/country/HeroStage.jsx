import { useEffect, useMemo, useState } from 'react'
import DottedMap from 'dotted-map'
import styles from './HeroStage.module.css'

/**
 * The hub's hero visual: three moments on a loop.
 *
 *   1. url      — a country page URL typing itself out
 *   2. map      — the dotted world map, with a cursor visiting three markets
 *   3. delivery — a message landing, with its sender ID and receipt
 *
 * The whole stage is inert: pointer-events are off and nothing responds to
 * input, so the sequence plays the same for everyone and a stray hover can't
 * desync it. It is aria-hidden for the same reason — the table below the hero
 * is the accessible version of this data.
 *
 * Motion is state + CSS transitions rather than rAF or SMIL: it has to render
 * predictably in the prerender pass, and every moment starts in a complete
 * state so the static HTML is never a half-drawn frame.
 */

const CURSOR_STOPS = [
  { code: 'IN', name: 'India', dial: '+91', lat: 20.5937, lng: 78.9629, note: 'DLT template registration' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', lat: 24.4539, lng: 54.3773, note: 'TDRA sender ID approval' },
  { code: 'SG', name: 'Singapore', dial: '+65', lat: 1.3521, lng: 103.8198, note: 'SSIR registered sender' },
]

const MOMENT_MS = { url: 7000, map: 11000, delivery: 5500 }
const ORDER = ['url', 'map', 'delivery']

/* ---------------------------------------------------------------- moment 1 */
function UrlMoment({ countries }) {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(() => countries[0].slug.length)
  const country = countries[i]
  const slug = country.slug

  useEffect(() => {
    if (shown < slug.length) {
      const t = setTimeout(() => setShown((n) => n + 1), 50)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setI((n) => (n + 1) % countries.length)
      setShown(0)
    }, 1500)
    return () => clearTimeout(t)
  }, [shown, slug.length, countries.length])

  return (
    <div className={styles.moment}>
      <div className={styles.momentLabel}>A page per country</div>
      <div className={styles.urlBar}>
        <svg className={styles.lock} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span className={styles.urlText}>
          smslocal.com/country-code/
          <span className={styles.urlSlug}>{slug.slice(0, shown)}</span>
          {shown === slug.length && '/'}
          <span className={styles.caret} />
        </span>
      </div>
      <div className={styles.urlMeta}>
        <span className={styles.urlCountry}>{country.name}</span>
        <span className={styles.urlDial}>{country.dial}</span>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- moment 2 */
function MapMoment() {
  const { svg, width, height, stops } = useMemo(() => {
    const map = new DottedMap({ height: 46, grid: 'diagonal' })
    CURSOR_STOPS.forEach((s) =>
      map.addPin({ lat: s.lat, lng: s.lng, svgOptions: { color: '#4f5bd5', radius: 0.6 }, data: { code: s.code } }),
    )
    const svgString = map.getSVG({ radius: 0.22, color: '#c7cbd8', shape: 'circle', backgroundColor: 'transparent' })
    const vb = svgString.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
    const pts = map.getPoints()
    return {
      svg: svgString,
      width: vb ? parseFloat(vb[1]) : 800,
      height: vb ? parseFloat(vb[2]) : 400,
      stops: CURSOR_STOPS.map((s) => {
        const p = pts.find((pt) => pt.data?.code === s.code)
        return { ...s, x: p ? p.x : 0, y: p ? p.y : 0 }
      }),
    }
  }, [])

  // travel -> click -> read, then on to the next stop.
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState('travel')

  useEffect(() => {
    const next = { travel: ['click', 850], click: ['read', 260], read: ['travel', 2100] }[phase]
    const t = setTimeout(() => {
      if (phase === 'read') setStep((s) => (s + 1) % stops.length)
      setPhase(next[0])
    }, next[1])
    return () => clearTimeout(t)
  }, [phase, stops.length])

  const stop = stops[step]
  const pct = (v, total) => `${(v / total) * 100}%`

  return (
    <div className={styles.moment}>
      <div className={styles.momentLabel}>Researched markets</div>
      <div className={styles.mapWrap}>
        <div className={styles.mapDots} dangerouslySetInnerHTML={{ __html: svg }} />

        <svg className={styles.mapOverlay} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          {stops.map((s, i) => (
            <g key={s.code}>
              <circle cx={s.x} cy={s.y} r={i === step ? 2.6 : 1.6} className={i === step ? styles.pinOn : styles.pin} />
              {i === step && phase !== 'travel' && <circle cx={s.x} cy={s.y} r="2.6" className={styles.ripple} />}
            </g>
          ))}
        </svg>

        {/* Cursor rides on percentages so it tracks the map at any width. */}
        <span
          className={`${styles.cursor} ${phase === 'click' ? styles.cursorClick : ''}`}
          style={{ left: pct(stop.x, width), top: pct(stop.y, height) }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0f172a" stroke="#fff" strokeWidth="1.4">
            <path d="M5 3l14 8-6.2 1.6L9.6 19z" />
          </svg>
        </span>

        <div
          className={`${styles.tip} ${phase === 'read' ? styles.tipOn : ''}`}
          style={{ left: pct(stop.x, width), top: pct(stop.y, height) }}
        >
          <span className={styles.tipDial}>{stop.dial}</span>
          <span className={styles.tipName}>{stop.name}</span>
          <span className={styles.tipNote}>{stop.note}</span>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- moment 3 */
function DeliveryMoment() {
  const [lit, setLit] = useState(0)
  useEffect(() => {
    if (lit >= 3) return
    const t = setTimeout(() => setLit((n) => n + 1), 700)
    return () => clearTimeout(t)
  }, [lit])

  const steps = ['Queued', 'Sent to operator', 'Delivered']

  return (
    <div className={styles.moment}>
      <div className={styles.momentLabel}>What lands on the handset</div>
      <div className={styles.sms}>
        <div className={styles.smsFrom}>SMSLOCAL</div>
        <div className={styles.smsBody}>Your verification code is 4172. It expires in 10 minutes.</div>
      </div>
      <ul className={styles.receipt}>
        {steps.map((s, i) => (
          <li key={s} className={i < lit ? styles.receiptOn : ''}>
            <span className={styles.tick} aria-hidden="true">✓</span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ stage */
function HeroStage({ countries }) {
  const [n, setN] = useState(0)
  const moment = ORDER[n % ORDER.length]

  useEffect(() => {
    const t = setTimeout(() => setN((v) => v + 1), MOMENT_MS[moment])
    return () => clearTimeout(t)
  }, [n, moment])

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.chrome}>
        <span />
        <span />
        <span />
      </div>

      {/* Remounted per moment (key), so each one restarts from its first frame
          instead of resuming wherever it was left. */}
      <div className={styles.screen} key={`${moment}-${n}`}>
        {moment === 'url' && <UrlMoment countries={countries} />}
        {moment === 'map' && <MapMoment />}
        {moment === 'delivery' && <DeliveryMoment />}
      </div>

      <div className={styles.dots}>
        {ORDER.map((m, i) => (
          <span key={m} className={i === n % ORDER.length ? styles.dotOn : styles.dot} />
        ))}
      </div>
    </div>
  )
}

export default HeroStage
