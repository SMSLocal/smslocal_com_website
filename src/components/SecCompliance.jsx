import './SecCompliance.css'

const CERTS = [
  { name: 'SOC 2', tag: 'Type II' },
  { name: 'ISO 27001', tag: 'Certified' },
  { name: 'GDPR', tag: 'Compliant' },
  { name: 'HIPAA', tag: 'Compliant' },
  { name: 'CCPA', tag: 'Compliant' },
]

function SecCompliance() {
  return (
    <section className="section sec-comp">
      <div className="container">
        <span className="section-kicker">Certifications</span>
        <h2 className="section-title">Compliant by <span className="grad-word">design</span></h2>
        <p className="section-subtitle">
          Independently audited against the standards enterprise buyers and their legal teams
          already require — so security review is a formality, not a blocker.
        </p>

        <div className="sec-comp-row reveal">
          {CERTS.map((c) => (
            <div className="sec-comp-seal" key={c.name}>
              <span className="sec-comp-medal" aria-hidden="true">
                <span className="sec-comp-medal-ring" />
                <span className="sec-comp-medal-tick">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span className="sec-comp-name">{c.name}</span>
              <span className="sec-comp-tag">{c.tag}</span>
            </div>
          ))}
        </div>

        <p className="sec-comp-caption">
          Reports and certificates are available under NDA — renewed and re-audited every year.
        </p>
      </div>
    </section>
  )
}

export default SecCompliance
