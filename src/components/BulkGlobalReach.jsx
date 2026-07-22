import { useEffect, useState } from 'react'
import BulkWorldMap from './BulkWorldMap.jsx'
import './BulkGlobalReach.css'

/**
 * "Worldwide" backup section for the Bulk SMS page — the hero promises
 * global delivery but nothing on the page proves it. A flat, static
 * dot-matrix world map with labeled hub markers sits beside a plain live
 * text feed of "Delivered to <city>" lines cycling through real cities —
 * no card, no border, no background block on the right side.
 */

// Named cities the live feed cycles through.
const CITY_POOL = [
  { city: 'Mexico City', country: 'Mexico', location: [19.4326, -99.1332] },
  { city: 'Buenos Aires', country: 'Argentina', location: [-34.6037, -58.3816] },
  { city: 'Moscow', country: 'Russia', location: [55.7558, 37.6173] },
  { city: 'New Delhi', country: 'India', location: [28.6139, 77.209] },
  { city: 'Shanghai', country: 'China', location: [31.2304, 121.4737] },
  { city: 'Jakarta', country: 'Indonesia', location: [-6.2088, 106.8456] },
  { city: 'Manila', country: 'Philippines', location: [14.5995, 120.9842] },
  { city: 'Lagos', country: 'Nigeria', location: [6.5244, 3.3792] },
  { city: 'Cairo', country: 'Egypt', location: [30.0444, 31.2357] },
  { city: 'Istanbul', country: 'Turkey', location: [41.0082, 28.9784] },
  { city: 'Berlin', country: 'Germany', location: [52.52, 13.405] },
  { city: 'Paris', country: 'France', location: [48.8566, 2.3522] },
  { city: 'Tokyo', country: 'Japan', location: [35.6762, 139.6503] },
  { city: 'Singapore', country: 'Singapore', location: [1.3521, 103.8198] },
  { city: 'Sydney', country: 'Australia', location: [-33.8688, 151.2093] },
  { city: 'Mumbai', country: 'India', location: [19.076, 72.8777] },
  { city: 'Dubai', country: 'UAE', location: [25.2048, 55.2708] },
  { city: 'São Paulo', country: 'Brazil', location: [-23.5505, -46.6333] },
  { city: 'Stockholm', country: 'Sweden', location: [59.3293, 18.0686] },
  { city: 'Seoul', country: 'South Korea', location: [37.5665, 126.978] },
]

const BEAM_COUNT = 5

function pickCities() {
  const shuffled = [...CITY_POOL].sort(() => Math.random() - 0.5)
  const stamp = Date.now()
  return shuffled.slice(0, BEAM_COUNT).map((c, i) => ({
    ...c,
    id: `${stamp}-${i}`,
    ms: 90 + Math.floor(Math.random() * 260),
  }))
}

const STATS = [
  { value: '190+', label: 'Countries reached' },
  { value: '800+', label: 'Direct carrier routes' },
  { value: '99.5%', label: 'Average delivery rate' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function BulkGlobalReach({ eyebrow, title, subtitle }) {
  const [active, setActive] = useState(pickCities)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setActive(pickCities()), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="section section-alt bgr-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="bgr-layout">
          <div className="bgr-map-stage">
            <BulkWorldMap />
          </div>

          <div className="bgr-scene">
            <div className="bgr-scene-stats" aria-hidden="true">
              {STATS.map((s) => (
                <div className="bgr-scene-stat" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div
              className="bgr-feed"
              role="img"
              aria-label="A live text feed showing SMS being delivered to real cities around the world right now"
            >
              {active.map((c) => (
                <div className="bgr-feed-line" key={c.id}>
                  <span className="bgr-feed-tick" aria-hidden="true" />
                  <span className="bgr-feed-text">
                    Delivered to <strong>{c.city}</strong>, {c.country}
                  </span>
                  <span className="bgr-feed-ms">{c.ms}ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BulkGlobalReach
