import { useState, useEffect } from 'react'
import './IntgHandshake.css'
import AppLogo, { colorFor } from './AppLogo.jsx'
import { IconPlug, IconCheck } from './icons.jsx'

const APPS = ['Salesforce', 'Shopify', 'Zendesk', 'HubSpot']

const WIRES = [
  { label: 'Contacts', dir: 'both', glyph: '⇄' },
  { label: 'Events', dir: 'right', glyph: '→' },
  { label: 'Messages', dir: 'right', glyph: '→' },
  { label: 'Delivery status', dir: 'left', glyph: '←' },
]

function IntgHandshake() {
  const [authed, setAuthed] = useState(true)
  const [ai, setAi] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduced) return undefined
    const a = setInterval(() => setAuthed((v) => !v), 3400)
    const b = setInterval(() => setAi((i) => (i + 1) % APPS.length), 2600)
    return () => {
      clearInterval(a)
      clearInterval(b)
    }
  }, [reduced])

  return (
    <section className="section intg-shake">
      <div className="container">
        <span className="section-kicker">How a connection works</span>
        <h2 className="section-title">A two-way handshake, not a one-way export</h2>
        <p className="section-subtitle">
          Authorize once and both systems keep talking. Records and events flow in, messages go out,
          and delivery comes straight back &mdash; kept in sync automatically.
        </p>

        <div className="intg-shake-stage reveal">
          <div className="intg-shake-node">
            <span className="intg-shake-badge" key={APPS[ai]}>
              <AppLogo name={APPS[ai]} color={colorFor(ai)} size={40} />
            </span>
            <span className="intg-shake-node-name">Your app</span>
            <span className="intg-shake-node-sub">e.g. {APPS[ai]}</span>
          </div>

          <div className="intg-shake-mid">
            <div className="intg-shake-auth">
              <span className={`intg-shake-switch${authed ? ' is-on' : ''}`}>
                <span className="intg-shake-switch-track" aria-hidden="true">
                  <span className="intg-shake-switch-knob" />
                </span>
                {authed ? 'OAuth authorized' : 'Authorize access'}
                {authed && (
                  <span className="intg-shake-switch-tick" aria-hidden="true"><IconCheck /></span>
                )}
              </span>
            </div>

            <div className={`intg-shake-wires${authed ? '' : ' is-idle'}`}>
              {WIRES.map((w, i) => (
                <div className={`intg-shake-wire dir-${w.dir}`} key={w.label}>
                  <span className="intg-shake-tag">
                    <span>{w.label}<i aria-hidden="true">{w.glyph}</i></span>
                  </span>
                  <span className="intg-shake-track" aria-hidden="true">
                    <span className="intg-shake-flow" style={{ animationDelay: `${i * 0.55}s` }} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="intg-shake-node">
            <span className="intg-shake-badge intg-shake-badge--sms">
              <IconPlug />
            </span>
            <span className="intg-shake-node-name">SMSLocal</span>
            <span className="intg-shake-node-sub">One connected account</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntgHandshake
