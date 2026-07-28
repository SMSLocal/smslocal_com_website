import './ViberStepsTimeline.css'

/**
 * "How it works" for /viber-business-messages.
 * The same broadcast, shown at three stages of being built: a verified sender,
 * then the message itself, then the reply landing in the shared inbox. Each
 * stage's newest piece drops in on its own beat (9s loop, CSS only).
 * No panel, no card, no timeline — the message is the visual.
 */

function Sender({ muted }) {
  return (
    <span className={muted ? 'vst-sender vst-sender--muted' : 'vst-sender'}>
      <i className="vst-sender-av" />
      SMSLocal
      <b>✓</b>
    </span>
  )
}

function ViberStepsTimeline({ eyebrow, title, subtitle, steps, alt }) {
  const stages = [
    <>
      <Sender />
      <span className="vst-note vst-piece" style={{ '--d': 0 }}>Verified business sender</span>
    </>,
    <>
      <Sender muted />
      <span className="vst-bubble vst-piece" style={{ '--d': 0 }}>
        Order #4821 has shipped — track it here.
        <span className="vst-cta">Track order</span>
      </span>
    </>,
    <>
      <span className="vst-bubble vst-bubble--sm">Order #4821 has shipped…</span>
      <span className="vst-reply vst-piece" style={{ '--d': 0 }}>Can I change the address?</span>
      <span className="vst-note vst-piece" style={{ '--d': 1 }}>Lands in your shared inbox</span>
    </>,
  ]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="vst-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="vst-title">{title}</h2>}
          {subtitle && <p className="vst-sub">{subtitle}</p>}
        </div>

        <div className="vst-build">
          {steps.map((step, i) => (
            <div className="vst-stage" key={step.title} style={{ '--i': i }}>
              <div className="vst-visual" aria-hidden="true">{stages[i]}</div>

              <span className="vst-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>

              {i < steps.length - 1 && <span className="vst-arrow" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ViberStepsTimeline
