"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Blocks,
  Building2,
  Camera,
  CalendarClock,
  ChartColumn,
  ChevronDown,
  Clapperboard,
  Compass,
  Globe,
  GraduationCap,
  Handshake,
  Hash,
  Headset,
  Inbox,
  Landmark,
  LayoutGrid,
  LifeBuoy,
  Megaphone,
  Menu,
  MessageCircle,
  MessageSquareText,
  MessagesSquare,
  MonitorSmartphone,
  Phone,
  PhoneCall,
  Plane,
  Plug,
  Radio,
  RadioTower,
  Send,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Umbrella,
  WandSparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** second line of the row */
  description?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
  /** the category card (rail) and its right-hand pane */
  icon?: LucideIcon;
  subtitle?: string;
  blurb?: string;
  viewAll?: { label: string; href: string };
  /** overrides the item grid's column count for this group */
  grid?: string;
};

type NavSection = {
  label: string;
  href?: string;
  /**
   * Caps the panel's width. Every panel centres on the same axis regardless,
   * so menus never shift position relative to one another.
   */
  width?: string;
  /** more than one group adds the category rail; one group runs full width */
  groups?: NavGroup[];
};

/**
 * Every entry is a real URL from the 45-page site plan. The plan's "Nav
 * Location" column carries the grouping (`Products > AI Agents`, `Solutions`,
 * `Why SMSLocal > Compare`, …); its `Why SMSLocal` bucket lives under
 * `Resources` here so the top level matches the five-item reference nav.
 */
const NAV_LINKS: NavSection[] = [
  {
    label: "Products",
    width: "max-w-[58rem]",
    groups: [
      {
        title: "AI Agents & Platform",
        subtitle: "Agentic AI platform",
        icon: Sparkles,
        blurb: "One agentic platform — agents, copilot, voice and the inbox.",
        viewAll: { label: "View all AI Agents", href: "/agentic-ai" },
        items: [
          {
            label: "Agentic AI",
            description: "Takes action, not just answers",
            href: "/agentic-ai",
            icon: Sparkles,
          },
          {
            label: "AI Agent Builder",
            description: "Design agents without code",
            href: "/ai-agents/agent-builder",
            icon: Blocks,
          },
          {
            label: "AI Customer Service",
            description: "Resolve tickets automatically",
            href: "/ai-agents/customer-service",
            icon: Headset,
          },
          {
            label: "AI Sales Agent",
            description: "Guide shoppers to checkout",
            href: "/ai-agents/sales",
            icon: ShoppingBag,
          },
          {
            label: "AI Support Agent",
            description: "Deflect tier-one questions",
            href: "/ai-agents/support",
            icon: LifeBuoy,
          },
          {
            label: "AI Booking Agent",
            description: "Book appointments in chat",
            href: "/ai-agents/booking",
            icon: CalendarClock,
          },
          {
            label: "Voice AI Agent",
            description: "AI that answers the phone",
            href: "/voice-ai-agents",
            icon: PhoneCall,
          },
          {
            label: "Agent Copilot",
            description: "Drafts replies for your team",
            href: "/products/agent-copilot",
            icon: WandSparkles,
          },
          {
            label: "Omnichannel Inbox",
            description: "Every conversation in one place",
            href: "/products/omnichannel-inbox",
            icon: Inbox,
          },
          {
            label: "Integrations",
            description: "200+ apps, API and webhooks",
            href: "/integrations",
            icon: Plug,
          },
        ],
      },
      {
        title: "Channels & Broadcasting",
        subtitle: "Messaging surfaces",
        icon: Globe,
        blurb: "Every channel your customers use, from one number and one API.",
        viewAll: { label: "See the whole platform", href: "/why-smslocal" },
        items: [
          {
            label: "Bulk SMS",
            description: "High-volume SMS campaigns",
            href: "/channels/sms-broadcasting",
            icon: Send,
          },
          {
            label: "WhatsApp Business API",
            description: "Official WhatsApp messaging",
            href: "/channels/whatsapp",
            icon: MessageCircle,
          },
          {
            label: "WhatsApp Broadcasting",
            description: "Campaigns to opted-in lists",
            href: "/channels/whatsapp-broadcasting",
            icon: Megaphone,
          },
          {
            label: "RCS",
            description: "Rich cards & suggested replies",
            href: "/channels/rcs",
            icon: MessageSquareText,
          },
          {
            label: "RCS Broadcasting",
            description: "Branded cards, SMS fallback",
            href: "/channels/rcs-broadcasting",
            icon: Radio,
          },
          {
            label: "Voice",
            description: "Calls inside your inbox",
            href: "/channels/voice",
            icon: Phone,
          },
          {
            label: "Virtual Numbers",
            description: "Local, toll-free & short codes",
            href: "/numbers/did",
            icon: Hash,
          },
          {
            label: "Instagram",
            description: "DMs answered instantly",
            href: "/channels/instagram",
            icon: Camera,
          },
          {
            label: "Messenger",
            description: "Facebook Messenger, 24/7",
            href: "/channels/messenger",
            icon: MessagesSquare,
          },
          {
            label: "Web Chat",
            description: "Live chat widget with AI",
            href: "/channels/web-chat",
            icon: MonitorSmartphone,
          },
          {
            label: "Social",
            description: "All social DMs in one place",
            href: "/channels/social",
            icon: Share2,
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    width: "max-w-[54rem]",
    // one group -> ExplorePanel drops the category rail and runs full width
    groups: [
      {
        title: "By Industry",
        blurb: "Agentic AI tuned to the way your industry actually talks to people.",
        viewAll: { label: "Talk to sales", href: "/contact-us" },
        items: [
          {
            label: "Retail & eCommerce",
            description: "Order updates & cart recovery",
            href: "/industry/retail",
            icon: ShoppingBag,
          },
          {
            label: "Travel & Hospitality",
            description: "Bookings and itinerary changes",
            href: "/industry/travel-and-hospitality",
            icon: Plane,
          },
          {
            label: "Fintech",
            description: "Onboarding, alerts & support",
            href: "/industry/fintech",
            icon: Landmark,
          },
          {
            label: "Education",
            description: "Admissions to enrolment",
            href: "/industry/education",
            icon: GraduationCap,
          },
          {
            label: "Media & Entertainment",
            description: "Ticketing & subscriber care",
            href: "/industry/media-entertainment",
            icon: Clapperboard,
          },
          {
            label: "Healthcare",
            description: "Appointments & patient care",
            href: "/industry/healthcare",
            icon: Stethoscope,
          },
          {
            label: "Insurance",
            description: "Quotes, claims & renewals",
            href: "/industry/insurance",
            icon: Umbrella,
          },
          {
            label: "Mortgage",
            description: "Pre-qualification to close",
            href: "/industry/mortgage",
            icon: Banknote,
          },
          {
            label: "Telecom",
            description: "Support, billing & outages",
            href: "/industry/telecom",
            icon: RadioTower,
          },
          {
            label: "Real Estate",
            description: "Lead capture and viewings",
            href: "/industry/real-estate",
            icon: Building2,
          },
        ],
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    width: "max-w-[26rem]",
    groups: [
      {
        title: "Why SMSLocal",
        blurb: "Why teams pick SMSLocal — and how it stacks up against the rest.",
        // the /compare/* child pages are reachable from the hub, not from here
        grid: "grid-cols-1",
        items: [
          {
            label: "Why SMSLocal",
            description: "One platform, every channel",
            href: "/why-smslocal",
            icon: Star,
          },
          {
            label: "Comparison Hub",
            description: "SMSLocal vs Twilio, Infobip, Bird & Plivo",
            href: "/compare",
            icon: LayoutGrid,
          },
          {
            label: "Analytics",
            description: "CSAT, delivery & engagement",
            href: "/products/analytics",
            icon: ChartColumn,
          },
          {
            label: "Security",
            description: "SSO, audit logs & access control",
            href: "/platform/security",
            icon: ShieldCheck,
          },
          {
            label: "AI Consulting",
            description: "From pilot to production",
            href: "/services/ai-consulting",
            icon: Compass,
          },
        ],
      },
    ],
  },
  {
    label: "Company",
    width: "max-w-[24rem]",
    groups: [
      {
        title: "Company",
        blurb: "The team behind the platform — and how to reach us.",
        viewAll: { label: "Book a demo", href: "/contact-us" },
        grid: "grid-cols-1",
        items: [
          {
            label: "About Us",
            description: "Who we are and why",
            href: "/about-us",
            icon: Building2,
          },
          {
            label: "Contact Us",
            description: "Book a demo or ask pricing",
            href: "/contact-us",
            icon: Headset,
          },
          {
            label: "Partnerships",
            description: "Resell, refer and integrate",
            href: "/partnerships",
            icon: Handshake,
          },
        ],
      },
    ],
  },
];

/**
 * Two-pane panel: category cards on the left switch the item grid on the
 * right. Categories are hover/click targets rather than links — the pane's
 * own "View all" link is the way through to the category's hub page.
 *
 * A single group needs no switching, so the rail is dropped and the item grid
 * runs the full width in three columns instead of two.
 */
function ExplorePanel({
  groups,
  onNavigate,
}: {
  groups: NavGroup[];
  onNavigate: () => void;
}) {
  const [activeTitle, setActiveTitle] = useState(groups[0].title);
  const active = groups.find((g) => g.title === activeTitle) ?? groups[0];
  const hasRail = groups.length > 1;

  const viewAll = active.viewAll && (
    <Link
      href={active.viewAll.href}
      onClick={onNavigate}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
    >
      {active.viewAll.label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );

  return (
    <>
      {/* the gradient hairline that caps the panel */}
      <div className="h-1 bg-gradient-brand" />
      <div className={hasRail ? "grid lg:grid-cols-[17rem_minmax(0,1fr)]" : ""}>
        {hasRail && (
          <div className="flex flex-col gap-1 border-r border-border bg-muted/50 p-4">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Explore
            </p>
            {groups.map((group) => {
              const isActive = group.title === active.title;
              return (
                <button
                  key={group.title}
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveTitle(group.title)}
                  onFocus={() => setActiveTitle(group.title)}
                  onClick={() => setActiveTitle(group.title)}
                  className={`flex items-start gap-3 rounded-xl p-3 text-left transition ${
                    isActive ? "bg-white shadow-sm" : "hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                      isActive
                        ? "bg-gradient-brand text-white"
                        : "bg-white text-primary"
                    }`}
                  >
                    {group.icon && <group.icon className="h-4.5 w-4.5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-heading">
                      {group.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {group.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}

            <div className="mt-auto px-3 pt-6">{viewAll}</div>
          </div>
        )}

        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-start">
            {active.title}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{active.blurb}</p>
          <div
            className={`mt-5 grid gap-x-6 gap-y-1 ${
              active.grid ??
              (hasRail ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")
            }`}
          >
            {active.items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-muted"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-primary transition group-hover:bg-gradient-brand group-hover:text-white">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-heading">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {!hasRail && viewAll && (
            <div className="mt-4 border-t border-border pt-4">{viewAll}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Escape closes whatever is open; a pointer press outside the header closes
  // the desktop panel (hover-out alone misses taps and keyboard tab-aways).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setOpen(false);
      }
    }
    function onPointerDown(e: PointerEvent) {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  /**
   * The trigger's hover box stops short of the panel, so a pointer travelling
   * between them crosses ~15px of nav that belongs to neither. Closing on that
   * gap would snatch the panel away mid-reach, so the close waits — any
   * re-entry (trigger or panel) cancels it.
   */
  function openNow(label: string) {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }

  function closeSoon() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 180);
  }

  function closeNow() {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-white"
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* The supplied logo is a wordmark, so it replaces the old icon plus
            text lockup — alt carries the name now that no text sits beside it. */}
        <Link href="/" className="flex items-center">
          <Image
            src="/smslocal-logo-v2.svg"
            alt="SMSLocal"
            width={4536}
            height={900}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.groups ? (
              // The panel is a DOM child of this wrapper, so entering it counts
              // as entering the wrapper and cancels a pending close.
              <div
                key={link.label}
                onMouseEnter={() => openNow(link.label)}
                onMouseLeave={closeSoon}
              >
                <button
                  type="button"
                  aria-expanded={openMenu === link.label}
                  onClick={() =>
                    openMenu === link.label ? closeNow() : openNow(link.label)
                  }
                  className={`flex items-center gap-1.5 py-2 text-[15px] font-medium transition ${
                    openMenu === link.label
                      ? "text-primary"
                      : "text-foreground/75 hover:text-primary"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                      openMenu === link.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu === link.label && (
                  // Every panel spans the nav container and centres its card on
                  // the same axis, so switching menus never shifts the panel.
                  // pt-2 clears the header's own bottom border by a hair —
                  // less than that and the panel's gradient cap sits on it.
                  <div className="absolute left-0 right-0 top-full px-6 pt-2">
                    <div
                      className={`animate-menu-in mx-auto w-full overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-foreground/5 ${
                        link.width ?? ""
                      }`}
                    >
                      <ExplorePanel
                        groups={link.groups}
                        onNavigate={closeNow}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href ?? "#"}
                onMouseEnter={closeNow}
                className="flex items-center py-2 text-[15px] font-medium text-foreground/75 transition hover:text-primary"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {/* same outline pill as the hero's "Book a demo" */}
          <a
            href="#login"
            className="rounded-full border-2 border-border bg-white px-5 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Login
          </a>
          <a
            href="#signup"
            className="group rounded-full bg-gradient-brand p-[1.5px] shadow-sm shadow-primary/20 transition hover:shadow-md hover:shadow-secondary/25"
          >
            {/* stays white on hover — the shadow carries the hover state */}
            <span className="block rounded-full bg-white px-4 py-2 text-sm font-semibold">
              <span className="text-gradient-brand">Sign Up</span>
            </span>
          </a>
        </div>

        {/* -mr-2.5 keeps the icon aligned to the container edge while the
            button itself carries a full 44px touch target. */}
        <button
          type="button"
          className="-mr-2.5 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-white px-6 py-4 lg:hidden"
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((link) =>
              link.groups ? (
                <div key={link.label} className="border-b border-border/70">
                  <button
                    type="button"
                    aria-expanded={openMobileMenu === link.label}
                    onClick={() =>
                      setOpenMobileMenu((v) =>
                        v === link.label ? null : link.label,
                      )
                    }
                    className={`flex w-full items-center justify-between py-4 text-[15px] font-semibold transition ${
                      openMobileMenu === link.label
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 opacity-60 transition-transform duration-200 ${
                        openMobileMenu === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileMenu === link.label && (
                    <div className="pb-3">
                      {link.groups.map((group) => (
                        <div key={group.title} className="pt-1">
                          {/* the desktop rail's category card, flattened into
                              a section header — the eyebrow doubles as it when
                              a menu has only one group */}
                          <div className="flex items-center gap-2.5 px-1 pb-1 pt-2">
                            {group.icon && (
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-white">
                                <group.icon className="h-4 w-4" />
                              </span>
                            )}
                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-start">
                              {group.title}
                            </p>
                          </div>
                          {group.items.map((item) => (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex items-start gap-3 rounded-xl px-1 py-2.5 active:bg-muted"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                                <item.icon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-heading">
                                  {item.label}
                                </span>
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          ))}
                          {group.viewAll && (
                            <Link
                              href={group.viewAll.href}
                              onClick={() => setOpen(false)}
                              className="mt-1 inline-flex items-center gap-1.5 px-1 py-2 text-sm font-medium text-primary"
                            >
                              {group.viewAll.label}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href ?? "#"}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/70 py-4 text-[15px] font-semibold text-foreground"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
          {/* sticks to the foot of the sheet so the CTAs stay reachable while
              a long group (Channels) scrolls above them */}
          <div className="sticky bottom-0 -mx-6 mt-4 flex flex-col gap-2 border-t border-border bg-white px-6 pb-2 pt-4">
            <a
              href="#login"
              className="rounded-full border-2 border-border bg-white px-5 py-2.5 text-center text-sm font-semibold text-foreground"
            >
              Login
            </a>
            <a
              href="#signup"
              className="group block rounded-full bg-gradient-brand p-[1.5px]"
            >
              <span className="block rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold">
                <span className="text-gradient-brand">Sign Up</span>
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
