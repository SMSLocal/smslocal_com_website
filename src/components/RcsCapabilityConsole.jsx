import { useEffect, useState } from 'react'
import './RcsCapabilityConsole.css'

/**
 * Capabilities section for /channels/rcs-broadcasting — tabbed showcase:
 * one live visual on the right that changes as you move through capability
 * tabs on the left, instead of a grid or a bordered panel of six cells.
 */

const CAPS = [
  { title: 'Verified brand sender', desc: 'Your Google-verified name and logo sit on every message, so recipients know it is really you.' },
  { title: 'Rich cards & carousels', desc: 'Images, carousels, suggested replies and action buttons — built from templates or your own assets.' },
  { title: 'Automatic SMS fallback', desc: 'Every recipient without RCS quietly receives the same campaign as a plain SMS instead.' },
  { title: 'High-throughput delivery', desc: 'Push large campaigns quickly with managed sending rates tuned to protect your sender reputation.' },
  { title: 'Segmentation & scheduling', desc: 'Target the right segment and schedule each broadcast down to the minute across time zones.' },
  { title: 'Unified RCS + SMS reporting', desc: 'Delivered, read and fallback numbers for RCS and SMS sit side by side in one report.' },
]

const REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function VerifiedVisual() {
  return (
    <div className="rcv-frame">
      <div className="rcv-sender">
        <span className="rcv-avatar">N</span>
        <div>
          <strong>Northside Coffee</strong>
          <span className="rcv-badge">✓ Google-verified</span>
        </div>
      </div>
      <div className="rcv-bubble">Flash sale — 30% off today only!</div>
      <span className="rcv-frame-foot">Name, logo and sender ID reviewed once — then reused on every send</span>
    </div>
  )
}

const SLIDES = [
  { label: 'Product shot', tag: 'Image' },
  { label: 'Buy now', tag: 'Button' },
  { label: '"Love it!"', tag: 'Review' },
]

function CarouselVisual() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setI((v) => (v + 1) % 3), 1400)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="rcv-frame">
      <div className="rcv-carousel">
        {SLIDES.map((s, idx) => (
          <span key={s.label} className={idx === i ? 'rcv-slide active' : 'rcv-slide'}>
            <i>{s.tag}</i>
          </span>
        ))}
      </div>
      <strong className="rcv-carousel-caption">{SLIDES[i].label}</strong>
      <span className="rcv-frame-foot">3 cards · built from a template or your own images</span>
    </div>
  )
}

function FallbackVisual() {
  return (
    <div className="rcv-frame">
      <div className="rcv-fallback">
        <span className="rcv-pill muted">No RCS</span>
        <span className="rcv-fallback-arrow">→</span>
        <span className="rcv-pill">Sent as SMS</span>
      </div>
      <div className="rcv-bar"><span style={{ width: '9%' }} /></div>
      <div className="rcv-bar-labels">
        <span>Typical fallback rate</span>
        <span>~9% of a list</span>
      </div>
      <span className="rcv-frame-foot">Decided per recipient at send time — no separate campaign to build</span>
    </div>
  )
}

function ThroughputVisual() {
  const [n, setN] = useState(1240)
  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setN((v) => v + Math.floor(Math.random() * 40) + 10), 500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="rcv-frame">
      <span className="rcv-stat">{n.toLocaleString()}<small>msgs / min</small></span>
      <span className="rcv-frame-foot">Sustained rate, tuned to protect your sender reputation</span>
    </div>
  )
}

function ScheduleVisual() {
  return (
    <div className="rcv-frame rcv-schedule">
      <span className="rcv-pill">Segment: VIP customers</span>
      <span className="rcv-pill">Sends 9:00am local</span>
      <span className="rcv-pill">Time zone aware</span>
      <span className="rcv-frame-foot">Every recipient gets it at 9am in their own time zone</span>
    </div>
  )
}

function ReportVisual() {
  const [rcs, setRcs] = useState(64)
  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setRcs(58 + Math.floor(Math.random() * 12)), 1200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="rcv-frame">
      <div className="rcv-report-stats">
        <span className="rcv-report-stat"><b>99.7%</b>Delivered</span>
        <span className="rcv-report-stat"><b>82%</b>Read rate</span>
      </div>
      <div className="rcv-bar"><span style={{ width: `${rcs}%` }} /></div>
      <div className="rcv-bar-labels">
        <span>RCS {rcs}%</span>
        <span>SMS fallback {100 - rcs}%</span>
      </div>
      <span className="rcv-frame-foot">Delivered, read and fallback — one report, not two</span>
    </div>
  )
}

const VISUALS = [VerifiedVisual, CarouselVisual, FallbackVisual, ThroughputVisual, ScheduleVisual, ReportVisual]

function RcsCapabilityConsole({ eyebrow, title, subtitle }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (REDUCED) return
    const id = setInterval(() => setActive((i) => (i + 1) % CAPS.length), 3400)
    return () => clearInterval(id)
  }, [])

  const Visual = VISUALS[active]

  return (
    <section className="section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}

        <div className="rcv-stage">
          <div className="rcv-tabs">
            {CAPS.map((c, i) => (
              <button
                type="button"
                className={i === active ? 'rcv-tab active' : 'rcv-tab'}
                onClick={() => setActive(i)}
                key={c.title}
              >
                <span className="rcv-tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="rcv-tab-body">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </span>
              </button>
            ))}
          </div>

          <div className="rcv-visual" key={active}>
            <Visual />
          </div>
        </div>
      </div>
    </section>
  )
}

export default RcsCapabilityConsole
