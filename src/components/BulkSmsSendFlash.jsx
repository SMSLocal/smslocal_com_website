import { useEffect, useState } from "react"
import "./BulkSmsSendFlash.css"

/**
 * Hero visual for the Bulk SMS page — the actual, literal use case: a
 * business writes ONE update once, hits send, and it lands as the exact
 * same text message on a wave of real customers' phones. Everything lives
 * inside a single panel (one compose block + one plain recipient list,
 * hairline-divided) rather than a grid of separate boxed cards.
 */

const MESSAGE = "Open till 9pm every night this week!"

const CUSTOMERS = [
  { name: "Priya", initials: "P", tint: "a" },
  { name: "Marcus", initials: "M", tint: "b" },
  { name: "Aisha", initials: "A", tint: "c" },
  { name: "Daniel", initials: "D", tint: "d" },
]

const REDUCED =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Matches the 4s CSS loop below — a fresh count lands right as the send
// button "clicks" each cycle, so the label never shows a stale number.
const CYCLE_MS = 4000
const randomSent = () => 900 + Math.floor(Math.random() * 500)

function BulkSmsSendFlash() {
  const [count, setCount] = useState(randomSent)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setCount(randomSent()), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bsf" role="img" aria-label="A business composing one SMS update that broadcasts out and is delivered down a list of individual customers">
      <div className="bsf-panel">
        <div className="bsf-compose">
          <span className="bsf-compose-live">
            <span className="bsf-dot" aria-hidden="true" />
            Live broadcast
          </span>

          <div className="bsf-compose-head">
            <span className="bsf-compose-avatar">N</span>
            <div className="bsf-compose-id">
              <strong>Northside Coffee</strong>
              <span>New broadcast to customer list</span>
            </div>
          </div>

          <p className="bsf-compose-text">&ldquo;{MESSAGE}&rdquo;</p>

          <span className="bsf-compose-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
            </svg>
            Send to all
          </span>
        </div>

        <div className="bsf-divider">
          <span>Sending to your customer list</span>
        </div>

        <div className="bsf-rows">
          {CUSTOMERS.map((c, i) => (
            <div className="bsf-row" style={{ "--d": `${0.35 + i * 0.16}s` }} key={c.name}>
              <span className={`bsf-row-avatar tint-${c.tint}`}>{c.initials}</span>
              <span className="bsf-row-name">{c.name}</span>
              <span className="bsf-row-status">
                <svg className="bsf-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4 4L19 6" />
                </svg>
                Delivered
              </span>
            </div>
          ))}
        </div>
      </div>

      <span className="bsf-to">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4 4L19 6" />
        </svg>
        Sent to <b>{count.toLocaleString()}</b> users
      </span>
    </div>
  )
}

export default BulkSmsSendFlash
