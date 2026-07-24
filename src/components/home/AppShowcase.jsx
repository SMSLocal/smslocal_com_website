import {
  Zap,
  Send,
  MessagesSquare,
  MessageSquare,
  Users,
  BarChart3,
  Bell,
  LayoutGrid,
  Phone,
  Plug,
  MessageCircle,
  Radio,
  Inbox,
  Mail,
} from "lucide-react";
import PowerhousePills from "./PowerhousePills";
import ScrollGlobe from "./ScrollGlobe";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TILES = [
  { icon: Send, label: "Campaigns", tint: "bg-primary/10 text-primary" },
  {
    icon: MessagesSquare,
    label: "Two-Way",
    tint: "bg-secondary/10 text-secondary",
  },
  { icon: Users, label: "Contacts", tint: "bg-accent/15 text-emerald-600" },
  { icon: BarChart3, label: "Reports", tint: "bg-amber-100 text-amber-600" },
];

export default function AppShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        badge="Overview"
        title="Everything You Need To"
        highlight="Reach Customers"
        description="SMSLocal brings bulk sending, two-way conversations, and automation into one seamless workspace designed to boost engagement and simplify every campaign."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.7fr_1fr]">
        {/* Each cell fades up on its own. h-full on both the Reveal wrapper and
            the card keeps the cards filling their grid row — the wrapper is now
            the grid item, so without it the cards would collapse to content. */}
        {/* Row 1 — left: toolkit */}
        <Reveal className="h-full min-w-0">
          <div className="flex h-full flex-col rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-primary/25">
              <Zap className="h-6 w-6 fill-white" />
            </span>
            <p className="mt-8 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              All-in-One{" "}
              <span className="grad-word">SMS Toolkit</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Unleash your outreach with SMSLocal&apos;s complete suite of
              messaging tools.
            </p>
          </div>
        </Reveal>

        {/* Row 1 — center: Voice & Integrations — one statement */}
        <Reveal delay={80} className="h-full min-w-0">
          <div className="flex h-full flex-col rounded-3xl bg-[#f6f0fb] p-8">
            <div className="flex items-center gap-2">
              <span
                className="animate-typing-dot h-3 w-3 rounded-full bg-primary"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="animate-typing-dot h-3 w-3 rounded-full bg-secondary"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="animate-typing-dot h-3 w-3 rounded-full bg-orange-300"
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className="animate-typing-dot h-3 w-3 rounded-full bg-slate-300"
                style={{ animationDelay: "0.45s" }}
              />
            </div>
            <p className="mt-6 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              <span className="grad-word">
                Voice calls, IVR, and voice bots
              </span>{" "}
              <span className="text-foreground">
                sync with your CRM and every other integration you rely on.
              </span>
            </p>
          </div>
        </Reveal>

        {/* Right column — spans both rows: tall map card + short rating card */}
        <Reveal delay={160} className="h-full min-w-0 lg:row-span-2">
          <div className="flex h-full flex-col gap-4">
            {/* multilingual & global (dotted map) — grows tall */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm">
              <ScrollGlobe />
              <p className="mt-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                <span className="grad-word">Multilingual</span>{" "}
                &amp; Global
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                SMSLocal&apos;s multi-language support lets you create and
                connect globally.
              </p>
            </div>

            {/* Omnichannel — statement */}
            <div className="flex flex-col overflow-hidden rounded-3xl bg-[#fdf3ee] p-5">
              <div className="relative mx-auto h-[108px] w-[180px]">
                {/* faint 5x5 grid (4 vertical + 4 horizontal lines), fading toward the edges */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_95%)]"
                  viewBox="0 0 300 168"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <line x1="60" y1="0" x2="60" y2="168" stroke="rgba(21,73,137,0.12)" />
                  <line x1="120" y1="0" x2="120" y2="168" stroke="rgba(21,73,137,0.12)" />
                  <line x1="180" y1="0" x2="180" y2="168" stroke="rgba(21,73,137,0.12)" />
                  <line x1="240" y1="0" x2="240" y2="168" stroke="rgba(21,73,137,0.12)" />
                  <line x1="0" y1="33.6" x2="300" y2="33.6" stroke="rgba(21,73,137,0.12)" />
                  <line x1="0" y1="67.2" x2="300" y2="67.2" stroke="rgba(21,73,137,0.12)" />
                  <line x1="0" y1="100.8" x2="300" y2="100.8" stroke="rgba(21,73,137,0.12)" />
                  <line x1="0" y1="134.4" x2="300" y2="134.4" stroke="rgba(21,73,137,0.12)" />
                </svg>

                {/* channel tiles — sit one grid cell out from the hub, on the intersections */}
                {[
                  {
                    icon: MessageCircle,
                    tint: "bg-emerald-50 text-emerald-500",
                    left: "30%",
                    top: "30%",
                  },
                  {
                    icon: MessageSquare,
                    tint: "bg-primary/10 text-primary",
                    left: "70%",
                    top: "30%",
                  },
                  {
                    icon: Radio,
                    tint: "bg-purple-50 text-purple-500",
                    left: "10%",
                    top: "50%",
                  },
                  {
                    icon: Phone,
                    tint: "bg-secondary/10 text-secondary",
                    left: "90%",
                    top: "50%",
                  },
                  {
                    icon: Mail,
                    tint: "bg-slate-100 text-slate-500",
                    left: "30%",
                    top: "70%",
                  },
                  {
                    icon: Plug,
                    tint: "bg-amber-100 text-amber-600",
                    left: "70%",
                    top: "70%",
                  },
                ].map(({ icon: Icon, tint, left, top }, i) => (
                  <span
                    key={i}
                    className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-black/[0.05] bg-white shadow-sm"
                    style={{ left, top }}
                  >
                    <span
                      className={`flex h-[22px] w-[22px] items-center justify-center rounded-md ${tint}`}
                    >
                      <Icon className="h-3 w-3" />
                    </span>
                  </span>
                ))}

                {/* the shared inbox — the hub every channel connects to */}
                <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-900 text-white shadow-lg">
                  <Inbox className="h-4 w-4" />
                  <span className="animate-pulse-soft absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white shadow-sm">
                    <Bell className="h-2 w-2" />
                  </span>
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                Omnichannel Inbox
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                WhatsApp, Bulk SMS, RCS, and more channels in one shared
                inbox.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Row 2 — left: phone mockup */}
        <Reveal delay={240} className="h-full min-w-0">
          <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-[#eceefb] p-6 text-center">
            <div
              className="mx-auto flex w-44 flex-1 flex-col rounded-t-[2rem] border-[3px] border-b-0 border-slate-900 bg-slate-900 p-1 pb-0 shadow-xl"
              style={{
                maskImage:
                  "linear-gradient(to bottom, #000 55%, transparent 97%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 55%, transparent 97%)",
              }}
            >
              <div className="relative flex-1 overflow-hidden rounded-t-[1.6rem] bg-white pt-4">
                {/* notch */}
                <span className="absolute left-1/2 top-1.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-slate-900" />
                <div className="flex items-center justify-between px-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-primary">
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-white">
                    <Bell className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="px-3 pt-3 text-left">
                  <p className="text-[13px] font-bold leading-tight text-foreground">
                    EXPLORE ALL BEST SMS TOOLS
                  </p>
                  <p className="mt-0.5 text-[8px] text-muted-foreground">
                    Explore the best SMS actions
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                  {TILES.map(({ icon: Icon, label, tint }) => (
                    <div
                      key={label}
                      className="rounded-xl bg-muted/60 p-2 text-left"
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${tint}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <p className="mt-2 text-[9px] font-semibold text-foreground">
                        {label}
                      </p>
                      <p className="text-[7px] leading-tight text-muted-foreground">
                        Tap to open
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-5 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              SMS Generator
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              All your messaging tools in one sleek mobile experience.
            </p>
          </div>
        </Reveal>

        {/* Row 2 — center: pills fall & stack (title kept) */}
        <Reveal delay={320} className="h-full min-w-0">
          <PowerhousePills />
        </Reveal>
      </div>
    </section>
  );
}
