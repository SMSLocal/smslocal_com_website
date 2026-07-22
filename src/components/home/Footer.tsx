import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./SocialIcons";
import Image from "next/image";
import NightBackdrop from "./NightBackdrop";

const COLUMNS = [
  {
    title: "Product",
    links: [
      "Mass texting",
      "SMS marketing",
      "Two-way messaging",
      "API & Developers",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Sales & Marketing",
      "Appointment reminders",
      "School & campus",
      "Alerts & notifications",
    ],
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
    <footer className="relative overflow-hidden border-t border-border bg-foreground text-white">
      <NightBackdrop />
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            {/* Knocked out to solid white. The logo's own indigo drops to 1.67
                contrast on this background — parts of it would disappear. */}
            <a href="#" className="flex items-center">
              <Image
                src="/smslocal-logo-v2.svg"
                alt="SMSLocal"
                width={4536}
                height={900}
                className="h-8 w-auto brightness-0 invert"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Launch SMS campaigns, alerts, and promotions in seconds — no apps,
              no coding, no integration needed.
            </p>
            {/* h-11 w-11 hit areas with -m-2.5 so the icons sit where they did */}
            <div className="mt-5 flex items-center gap-8">
              <a
                href="#"
                aria-label="Facebook"
                className="-m-2.5 flex h-11 w-11 items-center justify-center text-white/60 hover:text-primary"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="-m-2.5 flex h-11 w-11 items-center justify-center text-white/60 hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="-m-2.5 flex h-11 w-11 items-center justify-center text-white/60 hover:text-primary"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="-m-2.5 flex h-11 w-11 items-center justify-center text-white/60 hover:text-primary"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              {/* inline-block + py-1 lifts each link from an 18px tap target to
                  26px, clearing the 24px WCAG 2.5.8 minimum. The row spacing
                  tightens to compensate, so the column height barely moves. */}
              <ul className="mt-3 space-y-0.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-block py-1 text-sm text-white/60 hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} SMSLocal. All rights reserved.
          </p>
          {/* py-1 clears the 24px WCAG 2.5.8 tap minimum */}
          <div className="flex gap-6">
            <a href="#" className="inline-block py-1 hover:text-primary">
              Terms
            </a>
            <a href="#" className="inline-block py-1 hover:text-primary">
              Privacy
            </a>
            <a href="#" className="inline-block py-1 hover:text-primary">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
