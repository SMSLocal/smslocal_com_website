import './MobileToolsShowcase.css'
import { hl } from '../utils/hl.jsx'

const TAP_CARDS = ['Campaigns', 'Two-Way', 'Contacts', 'Reports']

const TAGS = [
  'Bulk SMS', 'SMS Marketing', 'Campaigns', 'Scheduling', 'OTP', 'Alerts',
  'Two-Way', 'Automation', 'Reminders', 'API', 'Contacts', 'Reports',
]

function MobileToolsShowcase() {
  return (
    <section className="section tools-section">
      <div className="container tools-inner">
        <div className="tools-visual">
          <div className="tools-phone">
            <div className="tools-phone-notch" />
            <span className="tools-phone-title">SMS Generator</span>
            <div className="tools-tap-grid">
              {TAP_CARDS.map((t) => (
                <div className="tools-tap-card" key={t}>
                  <strong>{t}</strong>
                  <span>Tap to open</span>
                </div>
              ))}
            </div>
            <p className="tools-phone-caption">All your messaging tools in one sleek mobile experience.</p>
          </div>
        </div>

        <div className="tools-copy">
          <span className="section-kicker" style={{ margin: 0 }}>Explore All Best SMS Tools</span>
          <h2>{hl('Explore the best SMS actions')}</h2>

          <h3>SMS Powerhouse</h3>
          <p>Powered by carrier-grade delivery, optimized for blazing speed, privacy-first design, and reliable global reach.</p>

          <div className="tools-tags">
            {TAGS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileToolsShowcase
