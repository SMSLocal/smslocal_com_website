import {
  Zap,
  Star,
  Send,
  MessagesSquare,
  Users,
  BarChart3,
  Bell,
  LayoutGrid,
} from "lucide-react";
import PowerhousePills from "./PowerhousePills";
import ScrollGlobe from "./ScrollGlobe";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const AVATARS = [
  { grad: "from-[#154989] to-[#7c6ee0]", initials: "JM" },
  { grad: "from-[#7c6ee0] to-[#ff3d8a]", initials: "SC" },
  { grad: "from-[#ff3d8a] to-[#fb923c]", initials: "ER" },
  { grad: "from-[#00b4d8] to-[#154989]", initials: "DL" },
];

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

        {/* Row 1 — center: statement */}
        <Reveal delay={80} className="h-full min-w-0">
          <div className="flex h-full flex-col justify-center rounded-3xl bg-[#f6f0fb] p-8">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" />
              <span className="h-3 w-3 rounded-full bg-secondary" />
              <span className="h-3 w-3 rounded-full bg-orange-300" />
              <span className="h-3 w-3 rounded-full bg-slate-300" />
            </div>
            <p className="mt-6 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              <span className="grad-word">
                SMSLocal is a blazing-fast, top-rated SMS platform
              </span>{" "}
              <span className="text-foreground">
                redefining business messaging, and innovation in every
                conversation.
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
                <span className="grad-word">Multilingual</span> &amp;
                Global
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                SMSLocal&apos;s multi-language support lets you create and
                connect globally.
              </p>
            </div>

            {/* rating / social proof — compact */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-[#fdf3ee] p-7 text-center">
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="grad-word">4.9</span>
              </p>
              <div className="mt-2 flex justify-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">
                Trusted by <span className="grad-word">20,000+</span>{" "}
                global businesses.
              </p>
              <div className="mt-4 flex justify-center -space-x-2.5">
                {AVATARS.map((a, i) => (
                  <span
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${a.grad} text-[10px] font-semibold text-white ring-2 ring-white`}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
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
