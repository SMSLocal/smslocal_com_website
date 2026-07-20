import {
  MessageSquare,
  MessagesSquare,
  Zap,
  Bell,
  Send,
  Smartphone,
  Megaphone,
  Mail,
  Sparkles,
  ArrowRight,
  Clock,
  Grip,
  type LucideIcon,
} from "lucide-react";

type Badge = {
  icon: LucideIcon;
  cls: string;
  size: string;
  pos: string;
  /** defaults to z-20 (in front of the card); use z-0 to tuck behind it */
  z?: string;
};

// tight zigzag cluster with 2 large anchors; several overlap the card edge
const BADGES: Badge[] = [
  // green — top edge of the card, right of the indigo
  {
    icon: Sparkles,
    cls: "bg-emerald-500 text-white",
    size: "h-11 w-11",
    pos: "-top-8 left-[32%]",
  },
  // indigo (large) — tucks BEHIND the card's top-left corner
  {
    icon: MessageSquare,
    cls: "bg-indigo-600 text-white",
    size: "h-20 w-20",
    pos: "-top-6 left-[18%]",
    z: "z-0",
  },
  // orange — on the card's left edge, upper
  {
    icon: Bell,
    cls: "bg-orange-500 text-white",
    size: "h-12 w-12",
    pos: "left-[20%] top-[15%]",
  },
  // white zap — far left, upper
  {
    icon: Zap,
    cls: "border border-border bg-white text-violet-500",
    size: "h-11 w-11",
    pos: "left-[10%] top-[18%]",
  },
  // black send — on the card's left edge, middle
  {
    icon: Send,
    cls: "bg-slate-900 text-white",
    size: "h-14 w-14",
    pos: "left-[26%] top-[28%]",
  },
  // pink (large) — left, middle; sits just clear of the card edge
  {
    icon: Smartphone,
    cls: "bg-pink-500 text-white",
    size: "h-20 w-20",
    pos: "left-[13%] top-[34%]",
  },
  // white chat — fully on the card, below the pink
  {
    icon: MessagesSquare,
    cls: "border border-border bg-white text-violet-500",
    size: "h-10 w-10",
    pos: "left-[29%] top-[49%]",
  },
  // amber — below-left of the chat, straddling the card's left edge
  {
    icon: Megaphone,
    cls: "bg-amber-400 text-white",
    size: "h-12 w-12",
    pos: "left-[22%] top-[56%]",
  },
  // white mail — below-left of the amber, clear of the card
  {
    icon: Mail,
    cls: "border border-border bg-white text-slate-900",
    size: "h-11 w-11",
    pos: "left-[14%] top-[66%]",
  },
];

const CARD_SECTIONS = [
  { label: "Message", widths: ["w-full", "w-[94%]", "w-[86%]", "w-[68%]"] },
  { label: "Audience", widths: ["w-full", "w-[90%]", "w-[74%]"] },
  { label: "Schedule", widths: ["w-full", "w-[80%]"] },
];

export default function OutcomesShowcase() {
  return (
    <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
      {/* LEFT — campaign mockup with a tight badge cluster.
          Shifted left on desktop so the cluster's leading edge lines up with the
          container edge. The card is ml-auto w-[72%] and the badges start at
          left-[10%], which left the whole composition sitting 58px inside the
          container while the right column stayed flush — so the block read as
          narrower than the header. A translate moves it as a unit, preserving
          every badge/card relationship. */}
      <div className="relative min-h-[460px] lg:origin-right lg:scale-[1.11]">
        {BADGES.map(({ icon: Icon, cls, size, pos, z = "z-20" }, i) => (
          <span
            key={i}
            className={`absolute ${z} flex items-center justify-center rounded-full shadow-lg ${size} ${cls} ${pos}`}
          >
            <Icon className="h-[45%] w-[45%]" strokeWidth={2} />
          </span>
        ))}

        {/* campaign card */}
        <div className="relative z-0 ml-auto w-[72%] overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
          {/* header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Grip className="h-5 w-5 text-slate-400" />
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight text-foreground">
                  SMSLocal Campaigns
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Global • Bulk SMS • Instant
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white"
            >
              Send Now <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* body */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-5 p-5">
            <div className="space-y-6">
              <div>
                <p className="text-xl font-semibold tracking-tight text-foreground">
                  Flash Sale Blast
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="h-2 w-16 rounded-full bg-slate-200" />
                  <span className="h-2 w-10 rounded-full bg-slate-200" />
                  <span className="h-2 w-12 rounded-full bg-slate-200" />
                </div>
              </div>

              {CARD_SECTIONS.map(({ label, widths }) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                  <div className="mt-2.5 space-y-2">
                    {widths.map((w, i) => (
                      <span
                        key={i}
                        className={`block h-2 rounded-full bg-slate-200 ${w}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-border p-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-white">
                  <Send className="h-4 w-4" />
                </span>
                <p className="mt-3 text-xs font-semibold text-foreground">
                  Northside Coffee
                </p>
                <div className="mt-2.5 space-y-1.5">
                  <span className="block h-1.5 w-full rounded-full bg-slate-200" />
                  <span className="block h-1.5 w-2/3 rounded-full bg-slate-200" />
                </div>
                <button
                  type="button"
                  aria-label="Deliver"
                  className="mt-4 h-7 w-full rounded-full bg-primary"
                />
              </div>

              <div>
                <div className="flex -space-x-1.5">
                  {[0, 1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="h-6 w-6 rounded-full border-2 border-white bg-slate-300"
                    />
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  <span className="block h-1.5 w-full rounded-full bg-slate-200" />
                  <span className="block h-1.5 w-3/4 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — heading + CTAs */}
      <div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
          <Clock className="h-4 w-4" />
          Driving Business Outcomes
        </span>
        <h3 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          Reach more customers{" "}
          <span className="text-gradient-brand">with a single click.</span>
        </h3>
        <p className="mt-5 max-w-md text-muted-foreground">
          Send your campaign to every carrier and region through SMSLocal&apos;s
          messaging platform — without the manual work.
        </p>
        <div className="mt-8 flex items-center gap-5">
          <a
            href="#signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Start sending <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#how"
            className="text-sm font-semibold text-foreground transition hover:text-primary"
          >
            See how it works
          </a>
        </div>
      </div>
    </div>
  );
}
