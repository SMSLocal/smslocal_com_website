import './OverviewBento.css'
import { hl } from '../utils/hl.jsx'

const AVATARS = ['JM', 'SC', 'ER', 'DL']

function OverviewBento() {
  return (
    <section className="section section-alt overview-section">
      <div className="container">
        <span className="section-kicker">Overview</span>
        <h2 className="section-title">{hl('Everything You Need To Reach Customers')}</h2>
        <p className="section-subtitle">
          SMSLocal brings bulk sending, two-way conversations, and automation into one seamless
          workspace designed to boost engagement and simplify every campaign.
        </p>

        <div className="overview-bento">
          <div className="overview-card overview-card--wide">
            <h3>All-in-One SMS Toolkit</h3>
            <p>
              Unleash your outreach with SMSLocal&rsquo;s complete suite of messaging tools.
              SMSLocal is a blazing-fast, top-rated SMS platform redefining business messaging,
              and innovation in every conversation.
            </p>
          </div>

          <div className="overview-card">
            <h3>Multilingual &amp; Global</h3>
            <p>SMSLocal&rsquo;s multi-language support lets you create and connect globally.</p>
          </div>

          <div className="overview-card overview-card--stat">
            <span className="overview-rating">4.9</span>
            <p>Trusted by 20,000+ global businesses.</p>
            <div className="overview-avatars">
              {AVATARS.map((a, i) => (
                <span className={`overview-avatar tint-${i}`} key={a}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OverviewBento
