import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from './home/SocialIcons.jsx'
import NightBackdrop from './home/NightBackdrop.jsx'

// Ported from the reference site's footer. The reference hard-codes href="#" on
// every link; the real routes from this project's own footer are kept instead,
// so the footer stays navigable on all pages.
const COLUMNS = [
  {
    title: 'Product',
    links: [
      { t: 'Mass texting', href: '/bulk-sms' },
      { t: 'SMS marketing', href: '/promotional-sms' },
      { t: 'Two-way messaging', href: '/channels/social' },
      { t: 'API & Developers', href: '/sms-api' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { t: 'Sales & Marketing', href: '/promotional-sms' },
      { t: 'Appointment reminders', href: '/transactional-sms' },
      { t: 'School & campus', href: '/resources/case-studies' },
      { t: 'Alerts & notifications', href: '/otp-sms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { t: 'Blog', href: '/blog' },
      { t: 'Help Center', href: '/resources/docs' },
      { t: 'Pricing', href: '/pricing' },
      { t: 'Support', href: '/contact-us' },
    ],
  },
  {
    title: 'Company',
    links: [
      { t: 'About Us', href: '/about-us' },
      { t: 'Careers', href: '/careers' },
      { t: 'Contact', href: '/contact-us' },
      { t: 'Privacy Policy', href: '/privacy-policy' },
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
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
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
            <Link to="/terms" className="inline-block py-1 hover:text-primary">
              Terms
            </Link>
            <Link to="/privacy-policy" className="inline-block py-1 hover:text-primary">
              Privacy
            </Link>
            <Link to="/privacy-policy" className="inline-block py-1 hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
