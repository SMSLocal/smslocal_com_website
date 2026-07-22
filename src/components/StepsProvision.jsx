import './StepsProvision.css'

/**
 * Bespoke "How it works" section for the DID / virtual numbers page.
 * Provisioning is drawn as a single horizontal bar split into four segments
 * that fill with the brand gradient left-to-right. Above each segment a longer
 * fragment of the phone number materializes, so the number literally builds up
 * as the four stages complete. Base (no-motion) state shows every segment filled
 * and every fragment in place; motion only sequences the fill.
 */
function StepsProvision({ eyebrow, title, subtitle, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt spv-section' : 'section spv-section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="spv-track">
          {steps.map((step, i) => (
            <div
              className={`spv-step spv-step--${i}`}
              style={{ '--spv-i': i }}
              key={step.title}
            >
              <span className="spv-frag" aria-hidden="true">{step.frag}</span>
              <span className="spv-seg" aria-hidden="true">
                <span className="spv-fill" />
              </span>
              <span className="spv-num">Step {i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsProvision
