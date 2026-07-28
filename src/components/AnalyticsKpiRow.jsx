import './AnalyticsKpiRow.css'

const KPIS = [
  {
    value: '98.6%',
    label: 'Delivery rate',
    delta: '1.2 pts',
    dir: 'up',
    spark: 'M0 22 L14 18 L28 20 L42 12 L56 14 L70 6',
  },
  {
    value: '71.4%',
    label: 'Open rate',
    delta: '3.8 pts',
    dir: 'up',
    spark: 'M0 20 L14 21 L28 15 L42 16 L56 9 L70 5',
  },
  {
    value: '12.4%',
    label: 'Click-through',
    delta: '0.9 pts',
    dir: 'up',
    spark: 'M0 21 L14 16 L28 18 L42 11 L56 12 L70 6',
  },
  {
    value: '4.7%',
    label: 'Conversion',
    delta: '0.6 pts',
    dir: 'up',
    spark: 'M0 23 L14 20 L28 16 L42 17 L56 10 L70 7',
  },
  {
    value: '$1.42',
    label: 'Cost / conversion',
    delta: '0.18',
    dir: 'down',
    spark: 'M0 5 L14 8 L28 7 L42 13 L56 12 L70 18',
  },
]

function ArrowUp() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
  )
}

function AnalyticsKpiRow() {
  return (
    <section className="section akr-section">
      <div className="container">
        <span className="section-kicker">Metrics that matter</span>
        <h2 className="section-title">The numbers you actually report on</h2>
        <p className="section-subtitle">
          Every channel rolled into one live scorecard — no exports to stitch together, no silos to reconcile.
        </p>

        <div className="akr-list">
          <div className="akr-list-top">
            <span className="akr-live-dot" />
            <span>Analytics · Live</span>
            <span className="akr-range">Last 30 days</span>
          </div>

          <div className="akr-rows">
            {KPIS.map((k, i) => (
              <div className={`akr-row-item akr-row-item--${k.dir}`} key={k.label} style={{ '--i': i }}>
                <span className="akr-accent" aria-hidden="true" />
                <span className="akr-label">{k.label}</span>

                <svg className="akr-spark" viewBox="0 0 70 28" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    className="akr-spark-line"
                    d={k.spark}
                    pathLength="1"
                    style={{ animationDelay: `${0.15 + i * 0.14}s` }}
                  />
                </svg>

                <span className="akr-value">{k.value}</span>

                <span className={`akr-delta akr-delta--${k.dir}`}>
                  {k.dir === 'up' ? <ArrowUp /> : <ArrowDown />}
                  {k.delta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsKpiRow
