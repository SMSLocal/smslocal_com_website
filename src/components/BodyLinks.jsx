import { Link } from 'react-router-dom'
import './BodyLinks.css'

/**
 * Contextual links for body copy. Each page carries two internal links and one
 * external link, at most one per section, and none in a hero, a call to action
 * or an FAQ.
 */
export function InLink({ to, children }) {
  return <Link className="body-link" to={to}>{children}</Link>
}

export function OutLink({ href, children }) {
  return <a className="body-link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}
