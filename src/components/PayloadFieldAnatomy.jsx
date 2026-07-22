import './PayloadFieldAnatomy.css'

/**
 * Docs hero visual — an annotated "specimen" of one delivery-status webhook
 * payload. Each field of the response object sends a gradient leader line out
 * to a floating type-pill (its wire type) and a plain-language note. The
 * status value runs one queued -> sent -> delivered beat and holds; errorcode
 * stays 0. Frameless: only the small chips carry shadow, nothing wraps it.
 * Genre (leader-line callouts to type labels) is used on no other page.
 */
const FIELDS = [
  { k: 'msgid', v: '"0f3e-8ac1-77d0"', cls: 'str', type: 'string · UUID', desc: 'unique per message' },
  { k: 'to', v: '"+14155550142"', cls: 'str', type: 'E.164', desc: 'recipient MSISDN' },
  { k: 'direction', v: '"mt"', cls: 'str', type: 'enum', desc: 'mt = mobile-terminated' },
  { k: 'status', v: null, cls: 'str', type: 'enum', desc: null },
  { k: 'errorcode', v: '0', cls: 'int', type: 'int', desc: '0 = no error' },
  { k: 'ts', v: '"2026-07-18T09:14:02Z"', cls: 'str', type: 'ISO 8601', desc: 'delivery timestamp' },
]

function PayloadFieldAnatomy() {
  return (
    <figure className="pfa" aria-hidden="true">
      <span className="pfa-source">
        <span className="pfa-source-key" />
        200 · webhook payload · Token auth
      </span>

      <span className="pfa-brace pfa-brace--open">{'{'}</span>
      <span className="pfa-brace pfa-brace--close">{'}'}</span>

      <div className="pfa-grid">
        {FIELDS.map((f, i) => (
          <div className="pfa-row" style={{ '--i': i }} key={f.k}>
            <div className="pfa-field">
              <span className="pfa-k">&quot;{f.k}&quot;</span>
              <span className="pfa-p">:</span>
              {f.k === 'status' ? (
                <span className="pfa-v pfa-v--live">
                  &quot;<span className="pfa-words">
                    <span className="pfa-word pfa-word--q">queued</span>
                    <span className="pfa-word pfa-word--s">sent</span>
                    <span className="pfa-word pfa-word--d">delivered</span>
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
              {f.k === 'status' ? (
                <span className="pfa-desc">queued · sent · <b>delivered</b></span>
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
