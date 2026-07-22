import './MessengerUseCases.css'

/**
 * Bespoke "see it in action" section for /facebook-messenger-api.
 * Real Messenger exchanges — a customer message and the automated reply — for
 * the everyday jobs teams hand off. Thematic (chat), demonstrates the product.
 */
const CASES = [
  {
    tag: 'Order tracking',
    ask: 'Where’s my order? 📦',
    reply: 'Hi Sam! Order #4021 shipped today — arriving Fri. Track it here →',
    meta: 'Replied in 4s',
  },
  {
    tag: 'Product questions',
    ask: 'Is the blue jacket in stock?',
    reply: 'Yes — 3 left in size M. Want me to hold one for you?',
    meta: 'Replied in 3s',
  },
  {
    tag: 'Appointment booking',
    ask: 'Can I move my appointment?',
    reply: 'Of course! Friday 2pm or 4pm work? Tap to confirm →',
    meta: 'Replied in 5s',
  },
]

function MessengerUseCases({ eyebrow, title, subtitle }) {
  return (
    <section className="section muc-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="muc">
          {CASES.map((c) => (
            <div className="muc-thread" key={c.tag}>
              <span className="muc-tag">{c.tag}</span>
              <span className="muc-bubble muc-bubble--ask">{c.ask}</span>
              <span className="muc-bubble muc-bubble--reply">{c.reply}</span>
              <span className="muc-meta">
                <span className="muc-dot" aria-hidden="true" /> Auto-answered &middot; {c.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MessengerUseCases
