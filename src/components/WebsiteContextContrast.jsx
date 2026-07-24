import { useEffect, useRef, useState } from 'react'
import './WebsiteContextContrast.css'

// New topic, new layout: instead of racing a single question, this plays
// out a two-turn exchange on each side. The follow-up question ("does it
// include...") only makes sense if the bot remembers turn one — exposing
// the real difference (memory) rather than just reply speed.

const TURNS = [
  { q: 'Do you offer a free trial?', bad: "Sorry, please fill out our contact form.", good: 'Yes! 14 days free, no card needed.' },
  { q: 'Does it include the Pro features?', bad: "I didn't understand that. Please fill out our contact form.", good: 'Yes — your 14-day trial includes every Pro feature, so you can test all of it before deciding.' },
]

const TYPE_MS = 18
const GAP_MS = 700

function useTranscript(side, runId) {
  const [log, setLog] = useState([])
  const [typing, setTyping] = useState(null)
  const [tag, setTag] = useState(null)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setLog([])
    setTyping(null)
    setTag(null)

    const schedule = (fn, ms) => timers.current.push(window.setTimeout(fn, ms))

    const playTurn = (turnIndex, delay) => {
      schedule(() => {
        const turn = TURNS[turnIndex]
        setLog((l) => [...l, { type: 'q', text: turn.q }])
        schedule(() => {
          const full = turn[side]
          let i = 0
          setTyping('')
          const step = () => {
            i += 1
            setTyping(full.slice(0, i))
            if (i < full.length) {
              schedule(step, TYPE_MS)
            } else {
              schedule(() => {
                setLog((l) => [...l, { type: 'a', text: full }])
                setTyping(null)
                if (turnIndex === TURNS.length - 1) {
                  setTag(side === 'bad' ? 'lost' : 'kept')
                } else {
                  playTurn(turnIndex + 1, GAP_MS)
                }
              }, 300)
            }
          }
          schedule(step, TYPE_MS)
        }, 500)
      }, delay)
    }

    playTurn(0, 500)
    return () => timers.current.forEach((t) => window.clearTimeout(t))
  }, [runId, side])

  return { log, typing, tag }
}

function Lane({ side, label, items, runId }) {
  const { log, typing, tag } = useTranscript(side, runId)
  return (
    <div className={`wcc-lane wcc-lane--${side}`}>
      <span className="wcc-lane-label">{label}</span>
      <div className="wcc-console">
        {log.map((entry, i) => (
          <div className={`wcc-row wcc-row--${entry.type}`} key={i}>
            <span className={`wcc-bubble wcc-bubble--${entry.type}${entry.type === 'a' ? `-${side}` : ''}`}>{entry.text}</span>
          </div>
        ))}
        {typing !== null && (
          <div className="wcc-row wcc-row--a">
            <span className={`wcc-bubble wcc-bubble--a-${side}`}>{typing}<span className="wcc-caret" /></span>
          </div>
        )}
        {tag === 'lost' && <span className="wcc-tag wcc-tag--lost">⟲ Lost the context from turn one</span>}
        {tag === 'kept' && <span className="wcc-tag wcc-tag--kept">🧠 Remembered turn one</span>}
      </div>
      <ul className={`wcc-list wcc-list--${side}`}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}

function WebsiteContextContrast({ eyebrow, heading, paragraphs, leftLabel, leftItems, rightLabel, rightItems, alt }) {
  const [runId, setRunId] = useState(0)

  return (
    <section className={`wcc-section ${alt ? 'section section-alt' : 'section'}`}>
      <div className="container">
        <div className="wcc-header">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {heading && <h2>{heading}</h2>}
          {paragraphs && paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="wcc-grid">
          <Lane side="bad" label={leftLabel} items={leftItems} runId={runId} />
          <Lane side="good" label={rightLabel} items={rightItems} runId={runId} />
        </div>

        <button type="button" className="wcc-replay" onClick={() => setRunId((r) => r + 1)}>
          ↻ Replay the conversation
        </button>
      </div>
    </section>
  )
}

export default WebsiteContextContrast
