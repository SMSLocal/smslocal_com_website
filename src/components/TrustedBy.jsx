import './TrustedBy.css'

const COMPANIES = [
  'NimbusRetail', 'Fintary', 'Cartwheel', 'Loopline', 'Vantra',
  'Pinecrest', 'Northline', 'Brightpath', 'Kindred Labs', 'Marlowe',
]

const LOOPED = [...COMPANIES, ...COMPANIES, ...COMPANIES]

function TrustedBy() {
  return (
    <section className="trusted-by">
      <div className="container">
        <span className="trusted-by-label">Trusted by 12,000+ fast-growing teams</span>
        <h2 className="trusted-by-title">
          Trusted by businesses. Built for scale.
        </h2>
      </div>

      <div className="trusted-by-marquee">
        <div className="trusted-by-track">
          {LOOPED.map((name, idx) => (
            <span className="trusted-by-logo" key={`${name}-${idx}`}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
