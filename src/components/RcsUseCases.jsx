import './RcsUseCases.css'

/**
 * Use-cases section for /channels/rcs — replaces the earlier 3-step
 * "how it works" process with a different topic entirely: a horizontally
 * scrollable filmstrip of real scenarios, each a literal RCS message
 * mockup. No numbered steps, no process framing.
 */
const CASES = [
  {
    label: 'E-commerce',
    title: 'Order confirmed',
    text: 'Your order #4821 is confirmed — arriving Thursday.',
    action: 'Track order',
  },
  {
    label: 'Appointments',
    title: 'Reminder',
    text: 'Your appointment is tomorrow at 3:00 PM.',
    action: 'Confirm',
    action2: 'Reschedule',
  },
  {
    label: 'Logistics',
    title: 'Out for delivery',
    text: 'Your package is out for delivery — arriving by 6 PM.',
    action: 'Live tracking',
  },
  {
    label: 'Promotions',
    title: 'Flash sale',
    text: '50% off everything — ends tonight only.',
    action: 'Shop now',
    carousel: true,
  },
  {
    label: 'Support',
    title: "We're here to help",
    thread: [
      { from: 'in', text: 'Can I change my delivery address?' },
      { from: 'out', text: "Sure — reply with the new address and I'll update it now." },
    ],
  },
]

function RcsUseCases() {
  return (
    <section className="section section-alt rcu-section">
      <div className="container">
        <span className="section-kicker">Use cases</span>
        <h2 className="section-title">One rich message format, every kind of send</h2>
        <p className="section-subtitle">From order confirmations to flash sales, the same branded RCS card format carries every message your business sends.</p>

        <div className="rcu-strip" role="list" aria-label="RCS use case examples">
          {CASES.map((c) => (
            <article className="rcu-card" role="listitem" key={c.title}>
              <span className="rcu-label">{c.label}</span>

              <div className="rcu-mock">
                <div className="rcu-mock-top">
                  <span className="rcu-av">SL</span>
                  <strong>SMSLocal</strong>
                  <span className="rcu-tick">✓</span>
                </div>

                {c.thread ? (
                  <div className="rcu-thread">
                    {c.thread.map((m, i) => (
                      <p className={`rcu-bubble rcu-bubble--${m.from}`} key={i}>{m.text}</p>
                    ))}
                  </div>
                ) : (
                  <>
                    {c.carousel && (
                      <div className="rcu-carousel-hint">
                        <span /><span /><span />
                      </div>
                    )}
                    <p className="rcu-title">{c.title}</p>
                    <p className="rcu-text">{c.text}</p>
                    <div className="rcu-actions">
                      <span className="rcu-btn rcu-btn--solid">{c.action}</span>
                      {c.action2 && <span className="rcu-btn">{c.action2}</span>}
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RcsUseCases
