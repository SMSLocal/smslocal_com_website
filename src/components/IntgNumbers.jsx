import './IntgNumbers.css'

const STATS = [
  { value: '300+', label: 'Apps ready to connect', sub: 'CRM, e-commerce, helpdesk, finance & more' },
  { value: '16', label: 'Categories to browse', sub: 'Every tool your team runs on, in one place' },
  { value: '1-click', label: 'OAuth to authorize', sub: 'No API keys to copy, no dev work needed' },
]

function IntgNumbers() {
  return (
    <section className="section intg-nums">
      <div className="container">
        <span className="section-kicker">By the numbers</span>
        <p className="intg-nums-lead">Plug SMSLocal into the stack you already run &mdash; in a single click.</p>
        <div className="intg-nums-row reveal">
          {STATS.map((s) => (
            <div className="intg-nums-item" key={s.label}>
              <span className="intg-nums-value">{s.value}</span>
              <span className="intg-nums-label">{s.label}</span>
              <span className="intg-nums-sub">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IntgNumbers
