import { useEffect, useRef, useState } from 'react'
import './BookingTimelineHeroMock.css'

// Different metaphor from the calendar-grid hero mock used elsewhere: a
// single day's timeline with busy blocks and one slot the agent locks in,
// then a reminder — closer to how a customer actually experiences booking.
const STAGES = ['blank', 'request', 'scan', 'pick', 'confirmed']
const HOLD_MS = { blank: 400, request: 700, scan: 1100, pick: 700, confirmed: 2600 }

const SCENES = [
  {
    request: '"Table for 4, tomorrow evening?"',
    channel: 'WhatsApp',
    slots: [
      { time: '5:00 PM', busy: true },
      { time: '6:00 PM', busy: true },
      { time: '7:00 PM', busy: false },
      { time: '8:00 PM', busy: true },
      { time: '9:00 PM', busy: false },
    ],
    pickIndex: 2,
    confirmLabel: 'Table for 4 confirmed · 7:00 PM',
    reminder: 'Reminder set for 6:30 PM',
  },
  {
    request: '"Any haircut slot this Friday?"',
    channel: 'Web chat',
    slots: [
      { time: '10:00 AM', busy: true },
      { time: '11:30 AM', busy: false },
      { time: '1:00 PM', busy: true },
      { time: '2:30 PM', busy: true },
      { time: '4:00 PM', busy: false },
    ],
    pickIndex: 1,
    confirmLabel: 'Haircut confirmed · 11:30 AM',
    reminder: 'Reminder set for 11:00 AM',
  },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none">
      <path d="M4 12l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BookingTimelineHeroMock() {
  const [stageIndex, setStageIndex] = useState(REDUCED ? STAGES.length - 1 : 0)
  const [sceneIndex, setSceneIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (REDUCED) return undefined
    const stage = STAGES[stageIndex]
    timer.current = setTimeout(() => {
      setStageIndex((i) => {
        const next = (i + 1) % STAGES.length
        if (next === 0) setSceneIndex((s) => (s + 1) % SCENES.length)
        return next
      })
    }, HOLD_MS[stage])
    return () => clearTimeout(timer.current)
  }, [stageIndex])

  const at = (stage) => stageIndex >= STAGES.indexOf(stage)
  const scene = SCENES[sceneIndex]
  const scanning = at('scan') && !at('pick')
  const picked = at('pick')

  return (
    <div className="bth-window" role="img" aria-label="An AI booking agent scanning a day's availability, locking in an open slot, and confirming with a reminder">
      <div className="bth-topbar">
        <span className="bth-pill">Booking Agent · Live</span>
      </div>

      <div className={`bth-request bth-in${at('request') ? ' is-visible' : ''}`}>
        <span className="bth-request-channel">{scene.channel}</span>
        <strong>{scene.request}</strong>
      </div>

      <div className="bth-timeline">
        {scene.slots.map((slot, i) => {
          const isPickedSlot = picked && i === scene.pickIndex
          const isScanningSlot = scanning && i === scene.pickIndex
          return (
            <div
              className={`bth-slot${slot.busy ? ' is-busy' : ''}${isPickedSlot ? ' is-picked' : ''}${isScanningSlot ? ' is-scanning' : ''}`}
              key={slot.time}
            >
              <span className="bth-slot-time">{slot.time}</span>
              <span className="bth-slot-bar" />
              {isPickedSlot && <span className="bth-slot-check"><CheckIcon /></span>}
            </div>
          )
        })}
      </div>

      <div className={`bth-confirmed bth-in${at('confirmed') ? ' is-visible' : ''}`}>
        <span className="bth-confirmed-row"><CheckIcon />{scene.confirmLabel}</span>
        <span className="bth-confirmed-row bth-confirmed-row--muted"><BellIcon />{scene.reminder}</span>
      </div>
    </div>
  )
}

export default BookingTimelineHeroMock
