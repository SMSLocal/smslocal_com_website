import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from './home/SocialIcons.jsx'
import NightBackdrop from './home/NightBackdrop.jsx'
import {
  PRODUCT_CATEGORIES,
  SOLUTION_CATEGORIES,
  PLATFORM,
  RESOURCES_LEFT,
  RESOURCES_RIGHT,
} from './Navbar.jsx'

// Mirrors the header's own nav data (imported from Navbar.jsx, not
// duplicated) so the footer never drifts out of sync with what the header
// mega-menus actually contain. Each column links to a category's "view all"
// page rather than every individual item — the header holds the full list.
const COLUMNS = [
  {
    title: 'Products',
    links: PRODUCT_CATEGORIES.map((c) => ({ t: c.label, href: c.viewAllHref })),
  },
  {
    title: 'Platform',
    links: PLATFORM.slice(0, 4).map((i) => ({ t: i.t, href: i.href })),
  },
  {
    title: 'Solutions',
    links: SOLUTION_CATEGORIES.map((c) => ({ t: c.label, href: c.viewAllHref })),
  },
  {
    title: 'Resources',
    links: [...RESOURCES_LEFT, ...RESOURCES_RIGHT].map((i) => ({ t: i.t, href: i.href })),
  },
  {
    title: 'Company',
    links: [
      { t: 'About Us', href: '/about-us' },
      { t: 'Careers', href: '/careers' },
      { t: 'Partners', href: '/partnerships' },
    ],
  },
]

const SOCIALS = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
  { label: 'LinkedIn', Icon: LinkedinIcon },
]

function Footer() {
  return (
    // home-tw scopes the Tailwind element reset (styles/home-tailwind.css) to
    // this subtree. The footer renders on every page, including the plain-CSS
    // inner pages, so the reset must not escape it.
    <footer className="home-tw relative overflow-hidden border-t border-border bg-foreground text-white">
      <NightBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(5,1fr)]">
          <div>
            {/* Knocked out to solid white. The logo's own indigo drops to 1.67
                contrast on this background — parts of it would disappear. */}
            <Link to="/" className="flex items-center">
              <img
                src="/smslocal-logo-v2.svg"
                alt="SMSLocal"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Launch SMS campaigns, alerts, and promotions in seconds — no apps,
              no coding, no integration needed.
            </p>
            {/* h-11 w-11 hit areas with -m-2.5 so the icons sit where they did */}
            <div className="mt-5 flex items-center gap-8">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="-m-2.5 flex h-11 w-11 items-center justify-center text-white/60 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              {/* inline-block + py-1 lifts each link from an 18px tap target to
                  26px, clearing the 24px WCAG 2.5.8 minimum. The row spacing
                  tightens to compensate, so the column height barely moves. */}
              <ul className="mt-3 space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.t}>
                    <Link
                      to={l.href}
                      className="inline-block py-1 text-sm text-white/60 hover:text-primary"
                    >
                      {l.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SMSLocal. All rights reserved.</p>
          {/* py-1 clears the 24px WCAG 2.5.8 tap minimum */}
          <div className="flex gap-6">
            <Link to="/terms-and-conditions" className="inline-block py-1 hover:text-primary">
              Terms and Conditions
            </Link>
            <Link to="/privacy-policy" className="inline-block py-1 hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
