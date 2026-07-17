import './FinWhyUsManifesto.css'

function FinWhyUsManifesto({ eyebrow, title, subtitle, items, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="fwm-headline">
          <p>
            {items.map((item, i) => {
              const isLast = i === items.length - 1
              const isSecondLast = i === items.length - 2
              return (
                <span key={item.title}>
                  <mark className={`fwm-mark fwm-mark--${i % 4}`}>{item.title}</mark>
                  {isLast ? '.' : isSecondLast ? ' and ' : ', '}
                </span>
              )
            })}
          </p>
        </div>

        <div className="fwm-notes">
          {items.map((item, i) => (
            <div className="fwm-note" key={item.title}>
              <span className="fwm-note-num">{String(i + 1).padStart(2, '0')}</span>
              <p><strong>{item.title}.</strong> {item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FinWhyUsManifesto
