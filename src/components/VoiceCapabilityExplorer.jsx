import { useState } from 'react'
import './VoiceCapabilityExplorer.css'

/**
 * Bespoke capabilities section for /channels/voice.
 * An interactive explorer: a left name-rail selects a capability, a right panel
 * reveals its detail + highlight specs. Hover or click to browse. No numbering,
 * no static row list, no cards — deliberately different from the compare
 * columns, the NUMBERED steps and the stat bars elsewhere on the page.
 */

const CAPABILITIES = [
  {
    key: 'api',
    name: 'Programmable voice API',
    desc: 'Place and receive calls straight from your app with a REST Voice API and a webhook fired for every call event, from ringing to hangup.',
    specs: ['REST API for calls', 'Webhook per call event', 'Inbound & outbound'],
  },
  {
    key: 'ivr',
    name: 'IVR & auto-attendant',
    desc: 'Build multi-level menus that greet callers and send them down the right path — no code, no telecom expertise required.',
    specs: ['Multi-level menus', 'Visual builder, no code', 'Greet & route callers'],
  },
  {
    key: 'routing',
    name: 'Routing, queues & failover',
    desc: 'Route by skill, time of day or region, with queues, overflow and instant failover, so a call never drops into dead silence when the first destination is busy.',
    specs: ['Skill / time / region routing', 'Queues & overflow', 'Instant failover'],
  },
  {
    key: 'recording',
    name: 'Recording & transcripts',
    desc: 'Record calls for quality and compliance, with searchable transcripts attached to every conversation and stored recording.',
    specs: ['Call recording', 'Searchable transcripts', 'Quality & compliance'],
  },
  {
    key: 'masking',
    name: 'Number masking',
    desc: 'Connect two people through a temporary proxy number so their personal digits stay private on both sides of the call, right up until it ends.',
    specs: ['Proxy numbers', 'Private on both sides', 'Two-party connect'],
  },
  {
    key: 'sip',
    name: 'Global numbers & SIP',
    desc: 'Provision local, toll-free and mobile phone numbers in 60+ countries, or bring your own carrier over SIP trunking and keep the numbers you already have.',
    specs: ['60+ countries', 'Local / toll-free / mobile', 'SIP trunking & BYOC'],
  },
]

function VoiceCapabilityExplorer() {
  const [active, setActive] = useState(0)
  const cap = CAPABILITIES[active]

  return (
    <section className="section vcx-section">
      <div className="container">
        <span className="section-kicker">Capabilities</span>
        <h2 className="section-title">Everything you need to run voice in the cloud</h2>
        <p className="section-subtitle">
          A full telephony stack — numbers, menus, routing, recording and an API. Pick a capability to see what it does.
        </p>

        <div className="vcx">
          <div className="vcx-rail" role="tablist" aria-label="Voice capabilities">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.key}
                role="tab"
                type="button"
                aria-selected={active === i}
                className={active === i ? 'vcx-name is-active' : 'vcx-name'}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="vcx-panel" role="tabpanel" key={cap.key}>
            <h3 className="vcx-panel-title">{cap.name}</h3>
            <p className="vcx-panel-desc">{cap.desc}</p>
            <ul className="vcx-specs">
              {cap.specs.map((s) => (
                <li className="vcx-spec" key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VoiceCapabilityExplorer
