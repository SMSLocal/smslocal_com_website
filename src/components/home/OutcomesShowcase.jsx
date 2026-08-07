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
  Check,
  BarChart2,
  Grip,
} from "lucide-react";
import Reveal from "./Reveal";

// tight zigzag cluster with 2 large anchors; several overlap the card edge
const BADGES = [
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
  { label: "Delivered", widths: ["w-full", "w-[94%]", "w-[86%]", "w-[68%]"] },
  { label: "Clicked", widths: ["w-full", "w-[90%]", "w-[74%]"] },
  { label: "Replied", widths: ["w-full", "w-[80%]"] },
];

// Quiet proof points instead of the buttons this section used to end on —
// informational, not an ask.
const STATS = [
  { value: "99.7%", label: "Delivery rate" },
  { value: "42ms", label: "Avg. send time" },
  { value: "24/7", label: "Live monitoring" },
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
      {/* Revealed as one unit — the badge cluster and card are positioned
          relative to each other, so staggering them would pull the
          composition apart. The scale stays on the inner div; Reveal only
          animates the wrapper, so the two transforms don't fight. */}
      <Reveal className="min-w-0">
        {/* Below sm the stage is pinned to 560px and scaled down, exactly as the
            hero scenes are. The badges are placed by percentage but sized in
            fixed pixels, and the card is w-[72%]: in a 327px column that left a
            235px card whose inner two-column grid collapsed, while the 44-80px
            badges swamped it and the composition ran 36px off-screen. Laying
            out at 560px keeps the badge-to-card proportions the design assumes.
            sm+ is untouched, including the lg 1.11x header alignment.
            470px specifically: the card's inner grid keeps shrinking with the
            stage down to about there, then its right panel hits an 87px content
            floor and the layout distorts. 470 is the narrowest faithful width,
            so it buys the largest legible text (12.5px vs 10.5px at 560).
            -my compensates the layout height a transform does not shrink.
            -translate-x centres the artwork rather than its box: inside the
            470px stage the ink runs 47->470, since the leftmost badge sits at
            left-[10%] while the card ends flush at 100%. That 47px of dead
            space on the left alone pushed the composition 17px right of the
            column centre. Translate resolves in parent coordinates, so the
            17px is not multiplied by the scale. */}
        <div className="relative -my-[69px] min-h-[460px] w-[470px] origin-left -translate-x-[17px] scale-[0.7] sm:my-0 sm:w-full sm:translate-x-0 sm:origin-center sm:scale-100 lg:origin-right lg:scale-[1.11]">
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
            {/* header — a status badge, not an action button: this card
                reports on campaigns already sent, it doesn't send one */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Grip className="h-5 w-5 text-slate-400" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    SMSLocal Analytics
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Global • All Channels • Real-time
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            {/* body */}
            <div className="grid grid-cols-[1.5fr_1fr] gap-5 p-5">
              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    Campaign Performance
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
                {/* a number and a rate, not a form and a submit button —
                    this panel is reporting what already happened */}
                <div className="rounded-xl border border-border p-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-white">
                    <BarChart2 className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    This week
                  </p>
                  <p className="mt-0.5 text-xl font-bold leading-none text-heading">
                    12,480
                  </p>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">
                    messages sent
                  </p>
                  <span className="mt-4 flex h-7 w-full items-center justify-center gap-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                    99.7% delivered
                  </span>
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
      </Reveal>

      {/* RIGHT — heading + proof points. Was a heading and two CTAs pitching
          "send a campaign", which duplicated the Mass Texting / SMS
          Marketing cards already in the feature slider above. Retold as
          reporting instead: it's the one thing this page didn't already say,
          and it reads as information rather than an ask, so no buttons. */}
      <div className="min-w-0">
        <Reveal delay={120}>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
            <BarChart2 className="h-4 w-4" />
            Real-Time Insights
          </span>
        </Reveal>
        <Reveal delay={200}>
          <h3 className="mt-4 text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Every message,{" "}
            <span className="grad-word">tracked as it lands.</span>
          </h3>
        </Reveal>
        <Reveal delay={280}>
          <p className="mt-5 max-w-md text-muted-foreground">
            Delivery, clicks and replies broken down by campaign, channel and
            carrier — updated in real time, not the next morning.
          </p>
        </Reveal>
        <Reveal delay={360} className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold leading-none text-heading">
                {value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
