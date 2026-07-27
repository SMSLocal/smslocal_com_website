import { useEffect, useRef, useState } from 'react'
import './TicketResolutionSection.css'

const LEFT_NOTES = [
  { n: '01', t: 'Reads the exact question', d: 'No paraphrasing — it works from what the customer actually typed.' },
  { n: '02', t: 'Searches your real help centre', d: 'Matched against your published articles, never a generic guess.' },
]

const RIGHT_NOTES = [
  { n: '03', t: 'Answers only on a match', d: 'If nothing in your help centre covers it, it won’t invent one.' },
  { n: '04', t: 'Hands off with context', d: 'A person picks it up mid-thread — the customer never repeats themselves.' },
]

function TicketResolutionSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return undefined }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } })
    }, { threshold: 0.25 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <section className="tr">
      <div className="container">
        <div className="tr-head">
          <div>
            <span className="tr-eyebrow">How it decides</span>
            <h2 className="tr-title">
              It answers when your help centre has the answer.{' '}
              <em>Otherwise, it hands you the thread.</em>
            </h2>
          </div>
          <p className="tr-sub">
            No guessing, no generic replies. Every response is checked against your real
            articles first — and escalated with full context the moment it isn&apos;t there.
          </p>
        </div>

        <div className={`tr-stage${visible ? ' is-in' : ''}`} ref={ref}>
          <div className="tr-notes tr-notes--left">
            {LEFT_NOTES.map((note) => (
              <div className="tr-note" key={note.n}>
                <span className="tr-note-n">{note.n}</span>
                <b>{note.t}</b>
                <span>{note.d}</span>
              </div>
            ))}
          </div>

          <div className="tr-phone">
            <div className="tr-phone-head">
              <span className="tr-dot" aria-hidden="true" />
              WhatsApp · Order support
            </div>

            <div className="tr-msg tr-msg--in">Order #48219 still says processing?</div>
            <div className="tr-think">Reading help centre → <b>Tracking your delivery</b></div>
            <div className="tr-msg tr-msg--out">
              It&apos;s out for delivery — arriving today before 6&nbsp;PM. Here&apos;s your live
              tracking link.
            </div>
            <span className="tr-tag">Sourced from &ldquo;Tracking your delivery&rdquo;</span>

            <div className="tr-msg tr-msg--in">
              Driver left it with a stranger, I want a refund and a call.
            </div>
            <div className="tr-think">Reading help centre → <b>no match found</b></div>
            <div className="tr-msg tr-msg--out tr-msg--human">
              I couldn&apos;t find a policy that covers this — I&apos;ve flagged it for our team
              with your message attached. They&apos;ll call you shortly.
            </div>
            <span className="tr-tag tr-tag--human">Escalated to a person · full thread attached</span>
          </div>

          <div className="tr-notes tr-notes--right">
            {RIGHT_NOTES.map((note) => (
              <div className="tr-note" key={note.n}>
                <span className="tr-note-n">{note.n}</span>
                <b>{note.t}</b>
                <span>{note.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketResolutionSection
