import { useEffect, useState } from 'react'
import './BulkCapabilitiesConsole.css'

/**
 * Capabilities section for the Bulk SMS page — not a list of described
 * points. One console panel where each capability runs as a tiny live
 * widget doing the actual thing (merging a name, ticking a delivery stat,
 * counting link clicks) rather than a title + paragraph explaining it.
 */

const NAMES = ['Priya', 'Marcus', 'Aisha', 'Daniel']

function BulkCapabilitiesConsole({ eyebrow, title, subtitle }) {
  const [nameIdx, setNameIdx] = useState(0)
  const [delivered, setDelivered] = useState(98.1)
  const [clicks, setClicks] = useState(238)

  useEffect(() => {
    const nameId = setInterval(() => setNameIdx((i) => (i + 1) % NAMES.length), 2200)
    const statId = setInterval(() => {
      setDelivered(98 + Math.random() * 1.2)
      setClicks((c) => c + Math.floor(Math.random() * 4) + 1)
    }, 1400)
    return () => { clearInterval(nameId); clearInterval(statId) }
  }, [])

  return (
    <section className="section section-alt">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="bcc-panel">
          <div className="bcc-head">
            <span className="bcc-dot" aria-hidden="true" />
            Every broadcast includes
          </div>

          <div className="bcc-grid">
            <div className="bcc-cell">
              <span className="bcc-label">Personalisation</span>
              <p className="bcc-demo">Hi <b className="bcc-merge">{NAMES[nameIdx]}</b>, your order&rsquo;s on the way!</p>
            </div>

            <div className="bcc-cell">
              <span className="bcc-label">Scheduling</span>
              <p className="bcc-demo bcc-mono">Sends Mon · 9:00am local</p>
            </div>

            <div className="bcc-cell">
              <span className="bcc-label">Two-way replies</span>
              <div className="bcc-chat">
                <span className="bcc-bubble user">Can I reschedule?</span>
                <span className="bcc-bubble bot">Sure — pick a new time →</span>
              </div>
            </div>

            <div className="bcc-cell">
              <span className="bcc-label">Delivery &amp; analytics</span>
              <p className="bcc-demo bcc-stat">{delivered.toFixed(1)}<span>% delivered</span></p>
            </div>

            <div className="bcc-cell">
              <span className="bcc-label">Opt-out &amp; compliance</span>
              <span className="bcc-toggle">
                <span className="bcc-toggle-track"><span className="bcc-toggle-knob" /></span>
                STOP handling on
              </span>
            </div>

            <div className="bcc-cell">
              <span className="bcc-label">Link tracking</span>
              <p className="bcc-demo bcc-stat">{clicks.toLocaleString()}<span>clicks tracked</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BulkCapabilitiesConsole
