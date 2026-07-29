import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { FeatureGrid, FAQ, CTABanner } from '../components/sections/Sections.jsx'
import { CompareLogo, SmsLocalMark } from '../components/CompareLogo.jsx'
import { COMPETITOR_LIST, COMPARE_MATRIX, HUB_REASONS, HUB_FAQS, HUB_CHOOSE } from '../data/compareData.jsx'
import './Compare.css'

const Check = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6" /></svg>
)

function MatrixCell({ value }) {
  if (value === true) {
    return <span className="cmp-mx-mark cmp-mx-yes" title="Yes"><Check /></span>
  }
  if (value === false) {
    return <span className="cmp-mx-mark cmp-mx-no" title="No">—</span>
  }
  if (typeof value === 'object' && value !== null) {
    return <span className="cmp-mx-partial cmp-mx-cell-text" title="Partial">{value.label}</span>
  }
  return <span className="cmp-mx-cell-text">{value}</span>
}

function CompareHub() {
  const columns = [{ slug: 'smslocal', name: 'SMSLocal', us: true }, ...COMPETITOR_LIST]

  return (
    <>
      <Seo
        title="Compare SMSLocal vs Twilio, Infobip, Bird & Plivo"
        description="See how SMSLocal's all-in-one messaging, no-code chatbots and agentic AI compare with Twilio, Infobip, Bird and Plivo — feature by feature in one table."
        keywords={['SMSLocal alternatives', 'business messaging comparison', 'CPaaS comparison', 'Twilio alternative', 'Infobip alternative', 'Bird alternative', 'Plivo alternative']}
      />

      {/* Hub hero with logo orbit */}
      <section className="cmp-hub-hero">
        <div className="container">
          <span className="cmp-hero-eyebrow">Compare</span>
          <h1>How does <span className="cmp-grad">SMSLocal</span> compare?</h1>
          <p className="cmp-hub-hero-sub">
            One platform for every messaging channel, no-code chatbots and agentic AI — versus the tools
            teams usually weigh it against. Here's the honest, side-by-side breakdown.
          </p>
          <div className="cmp-hero-actions">
            <Link to="/contact-us" className="btn btn-primary">Get Started Free</Link>
            <Link to="/contact-us" className="btn btn-ghost">Talk to sales</Link>
          </div>

          <div className="cmp-orbit" aria-hidden="true">
            <div className="cmp-orbit-logos">
              <CompareLogo name="Bird" domain="bird.com" />
              <CompareLogo name="Twilio" domain="twilio.com" />
            </div>
            <span className="cmp-orbit-dash" />
            <SmsLocalMark />
            <span className="cmp-orbit-dash" />
            <div className="cmp-orbit-logos">
              <CompareLogo name="Plivo" domain="plivo.com" />
              <CompareLogo name="Infobip" domain="infobip.com" />
            </div>
          </div>
        </div>
      </section>

      {/* The compare-all matrix */}
      <section className="section section-alt">
        <div className="container">
          <span className="section-kicker">The full picture</span>
          <h2 className="section-title">SMSLocal vs the field, feature by feature</h2>
          <p className="section-subtitle">
            Green means it's built in. A dash means it isn't a focus of that platform. Scroll sideways on mobile.
          </p>

          <div className="cmp-matrix-wrap">
            <table className="cmp-matrix">
              <thead>
                <tr>
                  <th className="cmp-mx-feature" scope="col"><span className="visually-hidden">Capability</span></th>
                  {columns.map((col) => (
                    <th key={col.slug} scope="col" className={col.us ? 'cmp-mx-us' : ''}>
                      <span className="cmp-mx-colhead">
                        {col.us ? <SmsLocalMark /> : <CompareLogo name={col.name} domain={col.domain} />}
                        <span className="cmp-mx-colname">{col.name}</span>
                        {col.us && <span className="cmp-mx-tag">You are here</span>}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_MATRIX.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    {columns.map((col) => (
                      <td key={col.slug} className={col.us ? 'cmp-mx-us' : ''}>
                        <MatrixCell value={row.cells[col.slug]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Honest decision guide — the added section */}
      <section className="section cmp-choose-sec">
        <div className="container">
          <span className="section-kicker">Honest take</span>
          <h2 className="section-title">Which platform should you choose?</h2>
          <p className="section-subtitle">We’d rather you pick the right fit than the biggest logo — so here’s the honest guide.</p>
          <div className="cmp-choose">
            <div className="cmp-choose-col us">
              <div className="cmp-choose-head">
                <SmsLocalMark />
                <span>{HUB_CHOOSE.us.label}</span>
              </div>
              <ul>
                {HUB_CHOOSE.us.points.map((p) => (
                  <li key={p}><i className="cmp-choose-check" aria-hidden="true"><Check /></i>{p}</li>
                ))}
              </ul>
            </div>
            <div className="cmp-choose-col them">
              <div className="cmp-choose-head">
                <span className="cmp-choose-badge">Enterprise</span>
                <span>{HUB_CHOOSE.them.label}</span>
              </div>
              <ul>
                {HUB_CHOOSE.them.points.map((p) => (
                  <li key={p}><i className="cmp-choose-dot" aria-hidden="true" />{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* One card per head-to-head comparison */}
      <section className="section">
        <div className="container">
          <span className="section-kicker">Head to head</span>
          <h2 className="section-title">Read the full comparison</h2>
          <p className="section-subtitle">A deeper, fair breakdown of SMSLocal against each platform.</p>
          <div className="cmp-vs-cards">
            {COMPETITOR_LIST.map((c) => (
              <Link className="cmp-vs-card" to={`/compare/${c.slug}`} key={c.slug}>
                <div className="cmp-vs-card-top">
                  <SmsLocalMark />
                  <span className="cmp-vs-card-vs">vs</span>
                  <CompareLogo name={c.name} domain={c.domain} />
                </div>
                <h3>SMSLocal vs {c.name}</h3>
                <p>{c.cardBlurb}</p>
                <span className="cmp-vs-card-link">Read comparison →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why teams choose SMSLocal */}
      <FeatureGrid
        variant="panel"
        eyebrow="Why SMSLocal"
        title={<>What you get with SMSLocal</>}
        subtitle="The reasons growing teams consolidate onto one platform instead of stitching several together."
        items={HUB_REASONS}
        alt
      />

      <CTABanner
        title="See SMSLocal for yourself"
        subtitle="Every channel, no-code chatbots and agentic AI — in one platform, live in days."
        cta={{ label: 'Get Started Free', href: '/contact-us' }}
        secondaryCta={{ label: 'Talk to sales', href: '/contact-us' }}
      />

      <FAQ title={<>Comparing SMSLocal — frequently asked questions</>} items={HUB_FAQS} />
    </>
  )
}

export default CompareHub
