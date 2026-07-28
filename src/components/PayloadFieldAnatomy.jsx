import './PayloadFieldAnatomy.css'

/**
 * Docs hero visual — an annotated "specimen" of the real send-response
 * message object (msgid, from, to, datacoding, direction, errorcode — the
 * same fields documented in the message-object section further down the
 * page). Each field sends a gradient leader line out to a floating
 * type-pill and a plain-language note. The direction value alternates
 * mt/mo — both real, documented values — and errorcode stays 0. Frameless:
 * only the small chips carry shadow, nothing wraps it. Genre (leader-line
 * callouts to type labels) is used on no other page.
 */
const FIELDS = [
  { k: 'msgid', v: '"0f3e-8ac1-77d0"', cls: 'str', type: 'uuid', desc: 'minted on creation' },
  { k: 'from', v: '"SMSLOCAL"', cls: 'str', type: '≤ 11 chars', desc: 'sender ID or number' },
  { k: 'to', v: '"+14155550142"', cls: 'str', type: 'string', desc: 'recipient number' },
  { k: 'datacoding', v: '0', cls: 'int', type: 'GSM7 / Unicode', desc: '0 = GSM7, 160 chars' },
  { k: 'direction', v: null, cls: 'str', type: 'enum', desc: null },
  { k: 'errorcode', v: '0', cls: 'int', type: 'int', desc: '0 = accepted' },
]

function PayloadFieldAnatomy() {
  return (
    <figure className="pfa" aria-hidden="true">
      <span className="pfa-source">
        <span className="pfa-source-key" />
        201 · send response · Token auth
      </span>

      <span className="pfa-brace pfa-brace--open">{'{'}</span>
      <span className="pfa-brace pfa-brace--close">{'}'}</span>

      <div className="pfa-grid">
        {FIELDS.map((f, i) => (
          <div className="pfa-row" style={{ '--i': i }} key={f.k}>
            <div className="pfa-field">
              <span className="pfa-k">&quot;{f.k}&quot;</span>
              <span className="pfa-p">:</span>
              {f.k === 'direction' ? (
                <span className="pfa-v pfa-v--live">
                  &quot;<span className="pfa-words">
                    <span className="pfa-word pfa-word--q">mt</span>
                    <span className="pfa-word pfa-word--d">mo</span>
                  </span>&quot;
                </span>
              ) : (
                <span className={`pfa-v pfa-v--${f.cls}`}>{f.v}</span>
              )}
              {i < FIELDS.length - 1 && <span className="pfa-p">,</span>}
              <span className="pfa-dot" />
            </div>

            <span className="pfa-lead" />

            <div className="pfa-annot">
              <span className="pfa-type">{f.type}</span>
              {f.k === 'direction' ? (
                <span className="pfa-desc">mt = sent · <b>mo</b> = received</span>
              ) : (
                <span className="pfa-desc">{f.desc}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

export default PayloadFieldAnatomy
