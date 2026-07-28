import './InboxRoutingRules.css'

const RULES = [
  {
    conds: [{ k: 'channel', v: 'WhatsApp' }, { k: 'topic', v: 'Billing' }],
    dest: 'Billing team',
    sla: '15m',
  },
  {
    conds: [{ k: 'channel', v: 'Voice' }, { k: 'time', v: 'After hours' }],
    dest: 'On-call + callback',
    sla: '5m',
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

        <div className="irules-table">
          <span className="irules-count">{RULES.length} rules active</span>

          <div className="irules-head-row">
            <span className="irules-h-handle" />
            <span className="irules-h-toggle" />
            <span className="irules-h-if">If</span>
            <span className="irules-h-then">Then route to</span>
            <span className="irules-h-sla">SLA</span>
          </div>

          <div className="irules-rows">
            {RULES.map((r, i) => (
              <div className="irules-row" key={i}>
                <span className="irules-accent" aria-hidden="true" />

                <span className="irules-handle" aria-hidden="true">
                  <i /><i /><i /><i /><i /><i />
                </span>

                <span className="irules-toggle" aria-hidden="true">
                  <span className="irules-toggle-knob" />
                </span>

                <p className="irules-if-cell">
                  {r.conds.map((c, ci) => (
                    <span className="irules-cond" key={c.k}>
                      {ci > 0 && <span className="irules-and">and</span>}
                      <span className="irules-ck">{c.k}</span>
                      <span className="irules-op">{c.op || '='}</span>
                      <span className="irules-cv">{c.v}</span>
                    </span>
                  ))}
                </p>

                <span className="irules-dest">{r.dest}</span>
                <span className="irules-sla">{r.sla}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InboxRoutingRules
