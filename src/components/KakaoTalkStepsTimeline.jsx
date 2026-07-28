import './KakaoTalkStepsTimeline.css'

/**
 * "How it works" for /channels/kakaotalk — the same notice shown at three
 * stages of being sent: a verified Kakao Channel sender, then the AlimTalk
 * notice itself, then the reply landing in the shared inbox. Each stage's
 * newest piece drops in on its own beat (9s loop, CSS only). Mirrors
 * ViberStepsTimeline's shape — no cards, no numbered tiles, the message
 * itself is the visual.
 */

function Sender({ muted }) {
  return (
    <span className={muted ? 'ktst-sender ktst-sender--muted' : 'ktst-sender'}>
      <i className="ktst-sender-av" />
      SMSLocal
      <b>✓</b>
    </span>
  )
}

function KakaoTalkStepsTimeline({ eyebrow, title, subtitle, steps, alt }) {
  const stages = [
    <>
      <Sender />
      <span className="ktst-note ktst-piece" style={{ '--d': 0 }}>Verified Kakao Channel</span>
    </>,
    <>
      <Sender muted />
      <span className="ktst-bubble ktst-piece" style={{ '--d': 0 }}>
        Order #7734 confirmed — arriving Thursday.
        <span className="ktst-cta">Track order</span>
      </span>
    </>,
    <>
      <span className="ktst-bubble ktst-bubble--sm">Order #7734 confirmed…</span>
      <span className="ktst-reply ktst-piece" style={{ '--d': 0 }}>Can I add a gift note?</span>
      <span className="ktst-note ktst-piece" style={{ '--d': 1 }}>Lands in your shared inbox</span>
    </>,
  ]

  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        <div className="ktst-head">
          {eyebrow && <span className="section-kicker">{eyebrow}</span>}
          {title && <h2 className="ktst-title">{title}</h2>}
          {subtitle && <p className="ktst-sub">{subtitle}</p>}
        </div>

        <div className="ktst-build">
          {steps.map((step, i) => (
            <div className="ktst-stage" key={step.title} style={{ '--i': i }}>
              <div className="ktst-visual" aria-hidden="true">{stages[i]}</div>

              <span className="ktst-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>

              {i < steps.length - 1 && <span className="ktst-arrow" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KakaoTalkStepsTimeline
