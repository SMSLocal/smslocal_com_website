import './VoiceShift.css'
import { IconPhone, IconCheck } from './icons.jsx'

/**
 * Bespoke "the shift" contrast for /channels/voice.
 * Leads with a visual: Legacy voice as an isolated island vs SMSLocal Voice as a
 * connected channel network, with the supporting points beneath each. De-boxed,
 * not two bullet columns.
 */
const CHANNELS = ['Voice', 'SMS', 'WhatsApp', 'RCS']

function VoiceShift({ eyebrow, heading, paragraphs = [], leftLabel, leftItems = [], rightLabel, rightItems = [] }) {
  return (
    <section className="section section-alt vsh-section">
      <div className="container">
        {eyebrow && <span className="section-kicker">{eyebrow}</span>}
        {heading && <h2 className="section-title">{heading}</h2>}
        {paragraphs.map((p, i) => <p className="section-subtitle vsh-lead" key={i}>{p}</p>)}

        <div className="vsh">
          <div className="vsh-col vsh-col--old">
            <div className="vsh-island" aria-hidden="true">
              <span className="vsh-island-node"><IconPhone /></span>
            </div>
            <span className="vsh-label">{leftLabel}</span>
            <ul className="vsh-points">
              {leftItems.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>

          <div className="vsh-col vsh-col--new">
            <div className="vsh-net" aria-hidden="true">
              <span className="vsh-net-line" />
              {CHANNELS.map((c) => (
                <span className="vsh-chan" key={c}>
                  <span className="vsh-chan-dot" />
                  {c}
                </span>
              ))}
            </div>
            <span className="vsh-label vsh-label--new">{rightLabel}</span>
            <ul className="vsh-points vsh-points--new">
              {rightItems.map((it) => (
                <li key={it}><span className="vsh-check" aria-hidden="true"><IconCheck /></span>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VoiceShift
