import './TrustBar.css'

const LOGOS = ['NimbusRetail', 'Fintary', 'Cartwheel', 'Loopline', 'Vantra', 'Pinecrest']

function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="container trust-bar-inner">
        <span className="trust-label">Trusted by growing teams at</span>
        <div className="trust-logos">
          {LOGOS.map((name) => (
            <span className="trust-logo" key={name}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustBar
