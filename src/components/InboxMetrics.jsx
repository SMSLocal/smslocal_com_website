import './InboxMetrics.css'

const METRICS = [
  { label: 'Avg. first response', value: '48s', bars: [30, 45, 35, 60, 50, 70, 40], trend: '−18% this week' },
  { label: 'SLA compliance', value: '96%', bars: [70, 75, 72, 80, 85, 88, 96], trend: '+4pts this week' },
  { label: 'Avg. CSAT', value: '4.8/5', bars: [55, 60, 58, 65, 70, 68, 75], trend: '+0.3 this week' },
  { label: 'Duplicate tickets', value: '0', bars: [20, 15, 10, 8, 5, 2, 0], trend: 'since routing went on' },
]

const OUTCOMES = [
  'Every rule you write becomes an SLA the inbox enforces on its own.',
  'Escalations fire automatically the moment a timer lapses.',
  'One thread per customer means the numbers never double-count.',
]

function InboxMetrics() {
  return (
    <section className="section imetrics">
      <div className="container imetrics-inner">
        <div className="imetrics-copy reveal">
          <span className="section-kicker">Performance</span>
          <h2>The inbox, held to a standard</h2>
          <p>
            Every rule you set is a promise to a customer. This is the dashboard your team actually
            watches once routing and SLAs are switched on.
          </p>
          <ul className="imetrics-outcomes">
            {OUTCOMES.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>

        <div className="imetrics-panel reveal">
          <div className="imetrics-panel-head">
            <span className="imetrics-live">
              <span className="imetrics-live-dot" />
              Live — last 7 days
            </span>
            <span className="imetrics-updated">Updated 2m ago</span>
          </div>

          <div className="imetrics-grid">
            {METRICS.map((m) => (
              <div className="imetrics-cell" key={m.label}>
                <span className="imetrics-label">{m.label}</span>
                <strong className="imetrics-value">{m.value}</strong>
                <div className="imetrics-spark" aria-hidden="true">
                  {m.bars.map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <span className="imetrics-trend">{m.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InboxMetrics
