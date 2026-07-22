import './AnalyticsPipeline.css'

const STAGES = [
  { name: 'Event captured', cap: 'SMS sent · WhatsApp read · link click' },
  { name: 'Attributed', cap: 'Tied to a campaign and a customer' },
  { name: 'Segmented', cap: 'Cohort, channel, region, journey' },
  { name: 'Report', cap: 'Live dashboard, alert or export' },
]

function AnalyticsPipeline() {
  return (
    <section className="section section-alt apl-section">
      <div className="container">
        <span className="section-kicker">From event to insight</span>
        <h2 className="section-title">One flow, from the first tap to the final report</h2>
        <p className="section-subtitle">
          Every interaction streams down the same pipeline in real time — captured, attributed, segmented and surfaced,
          with no gap for data to fall through.
        </p>

        <div className="apl reveal" role="img" aria-label="Analytics pipeline: events are captured, attributed, segmented, then turned into a report, flowing continuously left to right">
          <div className="apl-track">
            <span className="apl-rail" aria-hidden="true" />
            <span className="apl-flow" aria-hidden="true" />
            <span className="apl-particle" aria-hidden="true" />

            <div className="apl-stages">
              {STAGES.map((s, i) => (
                <div className="apl-stage" key={s.name} style={{ '--i': i }}>
                  <span className="apl-node" aria-hidden="true">
                    <span className="apl-node-core" />
                  </span>
                  <span className="apl-stage-name">{s.name}</span>
                  <span className="apl-stage-cap">{s.cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsPipeline
