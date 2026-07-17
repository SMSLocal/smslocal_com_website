import './ReviewBadges.css'

function Stars({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    const fillPct = Math.max(0, Math.min(1, rating - (i - 1))) * 100
    stars.push(
      <span className="star-wrap" key={i}>
        <span className="star star-empty">★</span>
        <span className="star star-filled" style={{ width: `${fillPct}%` }}>★</span>
      </span>
    )
  }
  return <div className="stars">{stars}</div>
}

const REVIEWS = [
  { name: 'G2', rating: 4.9, count: '342 reviews', logo: '/logos/g2.png' },
  { name: 'Capterra', rating: 4.8, count: '342 reviews', logo: '/logos/capterra.png' },
  { name: 'TrustPilot', rating: 4.9, count: '342 reviews', logo: '/logos/trustpilot.svg' },
]

function ReviewBadges() {
  return (
    <div className="review-badges">
      <div className="container review-badges-row">
        {REVIEWS.map((r) => (
          <div className="review-card" key={r.name}>
            <span className="review-logo"><img src={r.logo} alt={`${r.name} logo`} width="26" height="26" /></span>
            <span className="review-name">{r.name}</span>
            <Stars rating={r.rating} />
            <span className="review-score">{r.rating}/5 ({r.count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewBadges
