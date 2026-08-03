import { Link } from 'react-router-dom'
import './CampaignShowcase.css'
import { hl } from '../utils/hl.jsx'

function CampaignShowcase() {
  return (
    <section className="section campaign-showcase-section">
      <div className="container campaign-showcase-inner">
        <div className="campaign-mock">
          <div className="campaign-mock-head">
            <div>
              <strong>SMSLocal Campaigns</strong>
              <span>Global • Bulk SMS • Instant</span>
            </div>
            <span className="campaign-mock-btn">Send Now</span>
          </div>

          <div className="campaign-mock-title">Flash Sale Blast</div>

          <div className="campaign-mock-tabs">
            <span className="active">Message</span>
            <span>Audience</span>
            <span>Schedule</span>
          </div>

          <div className="campaign-mock-sender">
            <span className="campaign-mock-avatar">N</span>
            Northside Coffee
          </div>
        </div>

        <div className="campaign-showcase-copy">
          <span className="section-kicker" style={{ margin: 0 }}>Driving Business Outcomes</span>
          <h2>{hl('Reach more customers with a single click.')}</h2>
          <p>Send your campaign to every carrier and region through SMSLocal&rsquo;s messaging platform — without the manual work.</p>
          <div className="hero-actions">
            <Link to="/contact-us/" className="btn btn-primary">Start sending</Link>
            <Link to="/pricing/" className="btn btn-ghost">See how it works</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CampaignShowcase
