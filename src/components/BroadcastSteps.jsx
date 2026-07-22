import './BroadcastSteps.css'

/**
 * Bespoke "how it works" section for /channels/whatsapp-broadcasting.
 * A compact horizontal stepper: numbered gradient discs on a straight connecting
 * line, content directly beneath each — no floating wave, no empty space.
 * De-boxed, light.
 */
function BroadcastSteps({ eyebrow, title, subtitle, steps = [] }) {
  return (
    <section className="section section-alt bstep-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="bstep">
          <span className="bstep-line" aria-hidden="true" />
          {steps.map((s, i) => (
            <div className="bstep-item" key={s.title}>
              <span className="bstep-num">{i + 1}</span>
              <h3 className="bstep-title">{s.title}</h3>
              <p className="bstep-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BroadcastSteps
