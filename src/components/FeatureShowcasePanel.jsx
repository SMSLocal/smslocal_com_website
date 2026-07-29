import { useEffect, useRef, useState } from 'react'
import './FeatureShowcasePanel.css'
import { IconCalendar, IconGlobe, IconUsers, IconBell } from './icons.jsx'

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
      <path d="M10.5 20l1.5-6 6.5-4.5c1-.7.3-2.3-.9-2L10 9.5 5 6l-1.5 1L7 10l-3 2-2-1-1 1 3 3.5L5.5 20l1-1 1-3 2.5 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function HotelIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
      <path d="M4 21V8l8-4 8 4v13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
      <path d="M4 16V12l2-5h12l2 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 16h16v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7.5" cy="16" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="16" r="1.2" fill="currentColor" />
    </svg>
  )
}

const CALENDAR_DAYS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
const CALENDAR_BOOKED = [18, 19, 20]

function CalendarMock() {
  return (
    <div className="fsw-calendar">
      <div className="fsw-calendar-grid">
        {CALENDAR_DAYS.map((d) => (
          <span className={`fsw-calendar-day${CALENDAR_BOOKED.includes(d) ? ' is-booked' : ''}`} key={d}>{d}</span>
        ))}
      </div>
      <span className="fsw-calendar-range">Aug 14 – Aug 18 · Deluxe Sea View</span>
    </div>
  )
}

function ItineraryMock() {
  return (
    <div className="fsw-itinerary">
      <div className="fsw-itinerary-route">
        <span className="fsw-itinerary-code">JFK</span>
        <span className="fsw-itinerary-line">
          <span className="fsw-itinerary-plane"><PlaneIcon /></span>
        </span>
        <span className="fsw-itinerary-code">CUN</span>
      </div>
      <span className="fsw-itinerary-flight">Flight AA204 · Departs 7:40 AM</span>

      <div className="fsw-itinerary-rows">
        <div className="fsw-itinerary-row">
          <span className="fsw-pill-ic fsw-pill-ic--teal"><HotelIcon /></span>
          <span>Palm Bay Resort · Rm 214</span>
        </div>
        <div className="fsw-itinerary-row">
          <span className="fsw-pill-ic fsw-pill-ic--coral"><CarIcon /></span>
          <span>Airport transfer · 6:50 AM</span>
        </div>
      </div>
    </div>
  )
}

function ChatMock() {
  return (
    <div className="fsw-chatcard">
      <div className="fsw-chatcard-head">
        <span className="fsw-chatcard-dot" />
        Guest chat · Live
        <span className="fsw-chatcard-lang"><IconGlobe />ES</span>
      </div>
      <div className="fsw-chatcard-body">
        <span className="fsw-chat-bubble fsw-chat-bubble--in">¿A qué hora es el check-in?</span>
        <span className="fsw-chat-bubble fsw-chat-bubble--out">Check-in is at 3:00 PM — see you soon!</span>
        <span className="fsw-typing" aria-hidden="true"><span /><span /><span /></span>
      </div>
    </div>
  )
}

function ReminderMock() {
  return (
    <div className="fsw-notif-stack">
      <div className="fsw-notif fsw-notif--1">
        <span className="fsw-notif-ic"><PlaneIcon /></span>
        <div className="fsw-notif-t">
          <div className="fsw-notif-row"><strong>Departure alert</strong><span className="fsw-notif-time">5:30 AM</span></div>
          <span>Gate assigned · B12</span>
        </div>
      </div>
      <div className="fsw-notif fsw-notif--0">
        <span className="fsw-notif-ic"><IconBell /></span>
        <div className="fsw-notif-t">
          <div className="fsw-notif-row"><strong>Check-in tomorrow</strong><span className="fsw-notif-time">now</span></div>
          <span>3:00 PM · reply CONFIRM</span>
        </div>
      </div>
    </div>
  )
}

const ITEMS = [
  {
    icon: <IconCalendar />,
    title: 'Booking automation',
    desc: 'Handle reservations, changes and cancellations conversationally.',
    render: () => <CalendarMock />,
  },
  {
    icon: <IconGlobe />,
    title: 'Itinerary updates',
    desc: 'Share flight, hotel or trip details right inside the chat.',
    render: () => <ItineraryMock />,
  },
  {
    icon: <IconUsers />,
    title: 'Guest support',
    desc: 'Answer common guest questions 24/7, in any language.',
    render: () => <ChatMock />,
  },
  {
    icon: <IconBell />,
    title: 'Trip reminders',
    desc: 'Send check-in, departure and reminder alerts automatically.',
    render: () => <ReminderMock />,
  },
]

function FeatureShowcasePanel({ eyebrow, title }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)
  const n = ITEMS.length

  useEffect(() => {
    if (paused) return undefined
    timer.current = setTimeout(() => setActive((a) => (a + 1) % n), 3600)
    return () => clearTimeout(timer.current)
  }, [active, paused, n])

  const current = ITEMS[active]

  return (
    <section className="section fsw-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div
          className="fsw-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="fsw-list">
            {ITEMS.map((item, i) => (
              <button
                type="button"
                key={item.title}
                className={i === active ? 'fsw-row is-active' : 'fsw-row'}
                onClick={() => setActive(i)}
              >
                <span className={`fsw-row-ic fsw-row-ic--${i}`}>{item.icon}</span>
                <span className="fsw-row-t">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </span>
                {i === active && <span className="fsw-row-dash" />}
              </button>
            ))}
          </div>

          <div className="fsw-panel">
            <span className={`fsw-glow fsw-glow--${active}`} aria-hidden="true" />
            <div className="fsw-panel-inner" key={active}>
              <span className={`fsw-panel-icon fsw-panel-icon--${active}`}>{current.icon}</span>
              <span className={`fsw-panel-label fsw-panel-label--${active}`}>{current.title}</span>
              {current.render()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureShowcasePanel
