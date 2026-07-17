import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

function ComingSoon() {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <Seo title="Page Coming Soon" description="This page is being built." />
      <h1 style={{ color: 'var(--navy)', marginBottom: '1rem' }}>This page is coming soon</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        We&rsquo;re still building this part of the site. Check back soon, or head back home.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}

export default ComingSoon
