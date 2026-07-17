import { useState } from 'react'
import './CodeTabs.css'

function CodeTabs({ title, subtitle, note, samples, alt }) {
  const [active, setActive] = useState(samples[0].label)
  const current = samples.find((s) => s.label === active) ?? samples[0]

  return (
    <section className={alt ? 'section section-alt code-tabs-section' : 'section code-tabs-section'}>
      <div className="container">
        {(title || subtitle) && (
          <div className="code-tabs-header">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        <div className="code-tabs-window">
          <div className="code-tabs-bar" role="tablist">
            {samples.map((s) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={s.label === active}
                className={s.label === active ? 'code-tab active' : 'code-tab'}
                onClick={() => setActive(s.label)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <pre className="code-tabs-body">
            <code>{current.code}</code>
          </pre>
        </div>

        {note && <p className="code-tabs-note">{note}</p>}
      </div>
    </section>
  )
}

export default CodeTabs
