import './EmailSetupConsole.css'

/**
 * Bespoke "how it works" for /email-api.
 * A light developer console that "runs" the three setup steps — verify, build,
 * send — each returning a success output. Thematic (it's an API), proves the
 * setup is quick, and is a form used nowhere else on the site.
 */
const CMD = [
  'smslocal domains verify example.com',
  'smslocal templates build order-confirmation',
  'smslocal send --fallback sms',
]
const OUT = [
  <>
    <b>✓</b> SPF&nbsp;&nbsp;<b>✓</b> DKIM&nbsp;&nbsp;<b>✓</b> DMARC <span className="esc-mut">— domain verified</span>
  </>,
  <>
    <b>✓</b> template rendered <span className="esc-mut">· tested across 12 inboxes</span>
  </>,
  <>
    <b>✓</b> live <span className="esc-mut">· bounces auto-retry over SMS</span>
  </>,
]

function EmailSetupConsole({ eyebrow, title, steps = [] }) {
  return (
    <section className="section section-alt esc-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="esc">
          <div className="esc-bar" aria-hidden="true">
            <span className="esc-dot" /><span className="esc-dot" /><span className="esc-dot" />
            <span className="esc-bar-label">setup — email in 3 steps</span>
          </div>
          <div className="esc-body">
            {steps.slice(0, 3).map((s, i) => (
              <div className="esc-block" key={s.title}>
                <span className="esc-comment"># 0{i + 1} · {s.title}</span>
                <span className="esc-cmd"><i className="esc-prompt">$</i> {CMD[i]}</span>
                <span className="esc-out">{OUT[i]}</span>
              </div>
            ))}
            <span className="esc-cursor" aria-hidden="true"><i className="esc-prompt">$</i> <span className="esc-blink" /></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailSetupConsole
