import { useState, useEffect } from 'react'
import './BookingCalendarMock.css'

const DAYS = [
  { d: 'Mon', n: 24 },
  { d: 'Tue', n: 25 },
  { d: 'Wed', n: 26 },
  { d: 'Thu', n: 27 },
  { d: 'Fri', n: 28 },
]

// Order in which the agent books slots across the week (loops).
const BOOKINGS = [
  { col: 0, t: '9:00', l: 'Consult' },
  { col: 2, t: '10:30', l: 'Demo' },
  { col: 1, t: '1:00', l: 'Follow-up' },
  { col: 3, t: '11:15', l: 'Review' },
  { col: 4, t: '2:00', l: 'Discovery' },
  { col: 0, t: '3:30', l: 'Onboarding' },
  { col: 2, t: '4:00', l: 'Check-in' },
]

function BookingCalendarMock() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= BOOKINGS.length ? 0 : c + 1))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="bcm"
      role="img"
      aria-label="A booking AI agent filling a week's calendar — appointments appear across Monday to Friday as slots are confirmed in real time"
    >
      <div className="bcm-top">
        <span className="bcm-title">This week</span>
        <span className="bcm-live"><i className="bcm-live-dot" />Booking live</span>
        <span className="bcm-count">{count} booked</span>
      </div>

      <div className="bcm-grid">
        {DAYS.map((day, ci) => {
          const pills = BOOKINGS
            .map((b, bi) => ({ ...b, bi }))
            .filter((b) => b.col === ci && b.bi < count)
          return (
            <div className="bcm-col" key={day.d}>
              <div className="bcm-day">
                <span className="bcm-day-name">{day.d}</span>
                <span className="bcm-day-num">{day.n}</span>
              </div>
              <div className="bcm-slots">
                {pills.map((p) => (
                  <div
                    className={`bcm-pill bcm-pill--${p.bi % 4}${p.bi === count - 1 ? ' is-new' : ''}`}
                    key={p.bi}
                  >
                    <span className="bcm-pill-t">{p.t}</span>
                    <span className="bcm-pill-l">{p.l}</span>
                    <span className="bcm-pill-check" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingCalendarMock
