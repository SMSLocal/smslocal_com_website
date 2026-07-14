import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./SocialIcons";

const COLUMNS = [
  {
    title: "Product",
    links: ["Mass texting", "SMS marketing", "Two-way messaging", "API & Developers"],
  },
  {
    title: "Solutions",
    links: ["Sales & Marketing", "Appointment reminders", "School & campus", "Alerts & notifications"],
  },
  {
    title: "Resources",
    links: ["Blog", "Help Center", "Pricing", "Support"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Privacy Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <a href="#" className="flex items-center gap-2 text-xl font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                S
              </span>
              SMSLocal
            </a>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Launch SMS campaigns, alerts, and promotions in seconds — no
              apps, no coding, no integration needed.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="text-white/60 hover:text-primary">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white/60 hover:text-primary">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="text-white/60 hover:text-primary">
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/60 hover:text-primary">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/60 hover:text-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SMSLocal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
