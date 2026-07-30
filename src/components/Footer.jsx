import { Link } from 'react-router-dom'
import { SOCIAL_LINKS } from './home/SocialIcons.jsx'
import NightBackdrop from './home/NightBackdrop.jsx'
import { PLATFORM, RESOURCES_LEFT, RESOURCES_RIGHT } from './Navbar.jsx'

// A compact footer: the important pages from each header section, not every
// single one (that made the footer too tall — see the git history for the
// full-expansion version this replaced). Individual page hrefs are pulled
// from Navbar.jsx's own data where practical (Platform, Resources) so those
// two columns can't drift from the header; Products/Solutions highlights are
// hand-picked distinct pages rather than category names, because two
// category pairs in the header share one "view all" hub href each
// (Channels & Broadcasting / Social & Apps -> /channels, By industry / By
// team & services -> /solutions) — using the category label would duplicate
// that href twice in the same column. No href repeats anywhere below.
const COLUMNS = [
  {
    title: 'Products',
    links: [
      { t: 'AI Agents', href: '/ai-agents' },
      { t: 'WhatsApp Business API', href: '/channels/whatsapp' },
      { t: 'SMS Broadcasting', href: '/channels/sms-broadcasting' },
      { t: 'Voice', href: '/channels/voice' },
    ],
  },
  {
    title: 'Platform',
    links: PLATFORM.slice(0, 4).map((i) => ({ t: i.t, href: i.href })),
  },
  {
    title: 'Solutions',
    links: [
      { t: 'All Solutions', href: '/solutions' },
      { t: 'Retail & eCommerce', href: '/industry/retail' },
      { t: 'Customer Support', href: '/ai-agents/customer-service' },
      { t: 'Booking & Scheduling', href: '/ai-agents/booking' },
    ],
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

function Footer() {
  return (
    // home-tw scopes the Tailwind element reset (styles/home-tailwind.css) to
    // this subtree. The footer renders on every page, including the plain-CSS
    // inner pages, so the reset must not escape it.
    <footer className="home-tw relative overflow-hidden border-t border-border bg-foreground text-white">
      <NightBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
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
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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

        {/* Registered office, full width directly under the link columns rather
            than in the brand column — it reads as one line here instead of
            wrapping to three inside a max-w-xs column. */}
        <address className="mt-1 max-w-xs text-sm not-italic leading-relaxed text-white/60">
          8 Temasek Boulevard, #32-01 Suntec Tower Three, Singapore
        </address>

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
