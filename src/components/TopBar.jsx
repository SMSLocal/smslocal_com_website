import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { SOCIAL_LINKS } from './home/SocialIcons.jsx'

// Promo strip above the navbar. Deliberately a plain block with no sticky /
// fixed positioning: it scrolls away with the page while .navbar (position:
// sticky, top: 0) pins itself once this has passed. That is stock sticky
// behaviour — a sticky element sticks to the viewport top only after its
// normal-flow position reaches it, so no scroll listener is needed.
//
// home-tw scopes the Tailwind element reset to this subtree; the strip renders
// on every page, including the plain-CSS inner pages.
function TopBar() {
  return (
    <div className="home-tw hidden border-b border-border bg-primary/10 sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm text-foreground">
        <p>
          Create a Trial Account and Enjoy Free SMS —{' '}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Sign Up Now!
          </Link>
        </p>
        <div className="flex items-center gap-5">
          <a href="tel:+15595495149" className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4" />
            +1 559 549 5149
          </a>
          <div className="flex items-center gap-3 text-muted-foreground">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
