import './InboxRoutingRules.css'

const RULES = [
  {
    conds: [{ k: 'channel', v: 'WhatsApp' }, { k: 'topic', v: 'Billing' }],
    dest: 'Billing team',
    sla: 'SLA 15m',
  },
  {
    conds: [{ k: 'channel', v: 'Voice' }, { k: 'time', v: 'After hours' }],
    dest: 'On-call + callback',
    sla: 'SLA 5m',
  },
  {
    conds: [{ k: 'keyword', v: '“refund”' }, { k: 'order', op: '>', v: '$500' }],
    dest: 'Tier 2 · notify manager',
    sla: 'Priority',
  },
  {
    conds: [{ k: 'reply', v: 'none in 10m' }],
    dest: 'Escalate · round-robin',
    sla: 'Auto',
  },
]

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

function InboxRoutingRules() {
  return (
    <section className="section irules">
      <div className="container">
        <span className="section-kicker">Routing &amp; SLAs</span>
        <h2 className="section-title">Routing that runs itself</h2>
        <p className="section-subtitle">
          Write plain-language rules that read like a sentence. Conversations land with the right
          person the moment they arrive — no manual triage.
        </p>

        <div className="irules-ladder">
          {RULES.map((r, i) => (
            <div className="irules-rule" key={i}>
              <span className="irules-index">{String(i + 1).padStart(2, '0')}</span>

              <div className="irules-logic">
                <span className="irules-kw">When</span>
                {r.conds.map((c, ci) => (
                  <span className="irules-frag" key={c.k}>
                    {ci > 0 && <span className="irules-plus">and</span>}
                    <span className="irules-cond">
                      <span className="irules-ck">{c.k}</span>
                      <span className="irules-op">{c.op || '='}</span>
                      <span className="irules-cv">{c.v}</span>
                    </span>
                  </span>
                ))}

                <span className="irules-arrow"><Arrow /></span>

                <span className="irules-kw irules-kw-then">Then</span>
                <span className="irules-dest">{r.dest}</span>
                <span className="irules-sla">{r.sla}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InboxRoutingRules
