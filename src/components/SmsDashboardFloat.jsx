import './SmsDashboardFloat.css'

const TICKER = [
  { value: '1,318', label: 'total subscribers', trend: 'up' },
  { value: '120/min', label: 'messaging speed', spark: true },
  { value: '9,500', label: 'credits · refills Aug 5', trend: 'flat' },
  { value: '3 / 3', label: 'delivered & responded', trend: 'up' },
]

function SmsDashboardFloat() {
  return (
    <div className="sdf" role="img" aria-label="A live SMS automation ticker: subscriber count, messaging speed, credits remaining and delivery stats">
      <div className="sdf-head">
        <span className="sdf-live"><i />LIVE</span>
        <span className="sdf-head-title">SMS automation</span>
      </div>

      <div className="sdf-ticker">
        {TICKER.map((t) => (
          <div className="sdf-row" key={t.label}>
            <span className="sdf-row-value">{t.value}</span>
            <span className="sdf-row-label">{t.label}</span>
            {t.spark ? (
              <svg className="sdf-spark" viewBox="0 0 60 20" preserveAspectRatio="none" aria-hidden="true">
                <polyline points="0,16 10,10 20,13 30,6 40,9 50,3 60,7" />
              </svg>
            ) : (
              <span className={`sdf-trend sdf-trend--${t.trend}`}>
                {t.trend === 'up' ? '▲' : '—'}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="sdf-baseline"><span /></div>
    </div>
  )
}

export default SmsDashboardFloat
