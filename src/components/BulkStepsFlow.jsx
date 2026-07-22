import { useEffect, useState } from 'react'
import './BulkStepsFlow.css'

/**
 * How-it-works section for the Bulk SMS page — a vertical connected rail
 * (top to bottom) instead of the old horizontal 01→02→03 line, and each
 * step carries a small live widget doing the actual thing rather than
 * just a static title/description.
 */

const NAMES = ['Priya', 'Marcus', 'Aisha']

function UploadWidget() {
  const [count, setCount] = useState(1180)
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 9) + 3), 700)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="bsf-flow-widget">
      <span className="bsf-flow-file">contacts.csv</span>
      <div className="bsf-flow-bar"><span /></div>
      <span className="bsf-flow-note">{count.toLocaleString()} contacts imported</span>
    </div>
  )
}

function PersonaliseWidget() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % NAMES.length), 1400)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="bsf-flow-widget">
      <p className="bsf-flow-merge">Hi <b>{NAMES[i]}</b>, your 20% code is ready 🎉</p>
    </div>
  )
}

function SendWidget() {
  const [pct, setPct] = useState(97.8)
  useEffect(() => {
    const id = setInterval(() => setPct(98 + Math.random() * 1.5), 900)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="bsf-flow-widget">
      <span className="bsf-flow-stat">{pct.toFixed(1)}<small>% delivered</small></span>
    </div>
  )
}

const WIDGETS = [UploadWidget, PersonaliseWidget, SendWidget]

function BulkStepsFlow({ eyebrow, title, steps, alt }) {
  return (
    <section className={alt ? 'section section-alt' : 'section'}>
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}

        <div className="bsf-flow">
          <span className="bsf-flow-line" aria-hidden="true" />
          {steps.map((s, i) => {
            const Widget = WIDGETS[i % WIDGETS.length]
            return (
              <div className="bsf-flow-step" key={s.title}>
                <span className="bsf-flow-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="bsf-flow-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <Widget />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BulkStepsFlow
