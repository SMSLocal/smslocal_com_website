import { useEffect, useState } from 'react'
import './MergeReveal.css'

/**
 * Bespoke section for /channels/whatsapp-broadcasting. A calm, familiar
 * "what you write / what they see" split: a static template snippet on the
 * left, a single WhatsApp-style bubble on the right that cross-fades
 * between recipients. Deliberately restrained after several busier
 * attempts — one quiet transition, no stacked cards, no counters.
 */
const RECIPIENTS = [
  { initial: 'P', name: 'Priya', order: '4821' },
  { initial: 'S', name: 'Sam', order: '4822' },
  { initial: 'M', name: 'Maya', order: '4826' },
  { initial: 'A', name: 'Aria', order: '4830' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const CYCLE_MS = 2400

function MergeReveal() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setI((v) => (v + 1) % RECIPIENTS.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const r = RECIPIENTS[i]

  return (
    <section className="section section-alt mrv-section">
      <div className="container">
        <h2 className="section-title">One send. Every contact gets a message that sounds like it&rsquo;s just for them.</h2>
        <p className="section-subtitle">
          You write it once with a merge field. WhatsApp delivers it to each opted-in contact in their own private
          1:1 thread — personalized with their name.
        </p>

        <div className="mrg-split">
          <div className="mrg-write">
            <span className="mrg-write-label">What you write</span>
            <pre className="mrg-write-code">
              Hi <span className="mrg-write-tag">{'{{first_name}}'}</span> — your order{'\n'}#<span className="mrg-write-tag">{'{{order_id}}'}</span> is on its way 🚚
            </pre>
          </div>

          <div className="mrg-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </div>

          <div
            className="mrg-see"
            role="img"
            aria-label={`What each contact sees, currently showing the personalized message for ${r.name}`}
          >
            <span className="mrg-write-label">What they see</span>
            <div className="mrg-see-row" key={i}>
              <span className="mrg-see-avatar">{r.initial}</span>
              <div className="mrg-see-bubble">
                Hi {r.name} — your order #{r.order} is on its way 🚚
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MergeReveal
