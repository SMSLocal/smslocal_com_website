import './WhyUsAgenda.css'

// Bespoke "why us" laid out like a day planner: a time gutter with a running
// timeline, each reason an "event" chip on the schedule. Individual chips only,
// no single wrapping container.
const TIMES = ['8:00', '9:30', '11:00', '1:30', '3:00', '4:30']

function WhyUsAgenda({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="wag">
          <span className="wag-line" aria-hidden="true" />
          {items.map((item, i) => (
            <div className={`wag-row wag-row--${i % 3}`} key={item.title}>
              <span className="wag-time">{TIMES[i % TIMES.length]}</span>
              <span className="wag-node" aria-hidden="true" />
              <div className="wag-event">
                <span className="wag-ic">{item.icon}</span>
                <div className="wag-event-t">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUsAgenda
