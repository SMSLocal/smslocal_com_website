import {
  Send,
  Clock,
  Check,
  Workflow,
  Code2,
  Wifi,
  Search,
  Users,
  Headset,
  ShoppingBag,
  ChartColumn,
} from "lucide-react";

const SCENES = [
  { title: "Bulk SMS", desc: "Send to thousands in one click" },
  {
    title: "Two-Way Messaging",
    desc: "Customers reply — managed in a shared inbox",
  },
  {
    title: "Campaign Automation",
    desc: "Triggered messages and multi-step flows",
  },
  {
    title: "Reporting & Analytics",
    desc: "Real-time delivery, clicks and carrier data",
  },
  { title: "API & Integrations", desc: "REST API plus pre-built integrations" },
];

/** `scene-pop` and `scene-fade` both share the carousel's 16s clock, so an
 *  element's delay must be its own scene's offset plus a small stagger. Keep
 *  staggers under ~0.4s or the exit lands after the scene has already gone.
 *  Scenes 1-2 pop (scale + opacity); scenes 3+ fade (opacity only). */
const sceneDelay = (sceneId, stagger) => `${sceneId * 3.2 + stagger}s`;

/** Delivery confirmations that pop out around the phone, then retract as
 *  scene 2 takes over. */
const POPUPS = [
  { text: "+1 555 0134", pos: "left-[2%] top-[14%]", stagger: 0.05 },
  { text: "+44 7700 9001", pos: "right-[1%] top-[25%]", stagger: 0.15 },
  { text: "+61 400 12 345", pos: "left-[5%] bottom-[15%]", stagger: 0.25 },
  { text: "+49 151 2345 67", pos: "right-[4%] bottom-[26%]", stagger: 0.35 },
];

/** Scene 2's two-way conversation. Bubbles hug their text, so each is anchored
 *  by its CENTRE — horizontally on a phone edge (34% / 66% of the 560px stage)
 *  to keep the half-on/half-off straddle, and vertically so the group sits
 *  evenly on the handset. Anchoring by top edge instead skewed the group upward,
 *  because the bubbles differ in height (60/45/60/30px). */
const CHATS = [
  {
    id: "shipped",
    text: "Is my order shipped?",
    out: false,
    pos: "left-[34%] top-[23%]",
    stagger: 0.05,
  },
  {
    id: "arriving",
    text: "Yes — arriving today 🚚",
    out: true,
    pos: "left-[66%] top-[42.25%]",
    stagger: 0.17,
  },
  {
    id: "thanks",
    text: "Perfect, thanks!",
    out: false,
    pos: "left-[34%] top-[61.5%]",
    stagger: 0.29,
  },
];

/** Scene 3's automation flow: two triggers feeding one rule, which fans out to
 *  three actions. Positions are centres on the 560x400 stage. */
const FLOW_TRIGGERS = [
  { label: "New sign-up", pos: "left-[16.4%] top-[19%]", stagger: 0.12 },
  { label: "Cart abandoned", pos: "left-[83.6%] top-[19%]", stagger: 0.19 },
];

const FLOW_ACTIONS = [
  {
    icon: Send,
    label: "Send SMS",
    sub: "instantly",
    pos: "left-[19.3%] top-[74%]",
    chip: "bg-brand-start/10 text-brand-start",
    stagger: 0.3,
  },
  {
    icon: Clock,
    label: "Wait 1 hour",
    sub: "then check",
    pos: "left-[50%] top-[74%]",
    chip: "bg-gradient-brand text-white",
    stagger: 0.38,
  },
  {
    icon: Check,
    label: "Follow-up",
    sub: "if no reply",
    pos: "left-[80.7%] top-[74%]",
    chip: "bg-brand-end/10 text-brand-end",
    stagger: 0.46,
  },
];

const CARRIERS = [
  { n: "Verizon", p: 41 },
  { n: "Vodafone", p: 28 },
  { n: "T-Mobile", p: 19 },
];

/** Scene 5's connected apps — one per integration category, and one per ring.
 *  Generic icons rather than third-party logos; we don't ship those marks.
 *  Positions are centres on the 560x400 stage, solved to sit exactly on each
 *  ring while clearing the card stack and each other. */
const INTEGRATION_MARKS = [
  {
    icon: Users,
    label: "CRM",
    pos: "left-[30.5%] top-[21.5%]", // ring R=240 -> (171,86)
    size: "h-[48px] w-[48px]",
    tint: "text-brand-end",
    stagger: 0.1,
  },
  {
    icon: Headset,
    label: "Helpdesk",
    pos: "left-[6.8%] top-[37.2%]", // ring R=285 -> (38,149)
    size: "h-[54px] w-[54px]",
    tint: "text-brand-start",
    stagger: 0.15,
  },
  {
    icon: ShoppingBag,
    label: "E-commerce",
    pos: "left-[22.6%] top-[45%]", // ring R=195 -> (126,180)
    size: "h-[50px] w-[50px]",
    tint: "text-brand-start",
    stagger: 0.2,
  },
  {
    icon: ChartColumn,
    label: "Analytics",
    pos: "left-[38.7%] top-[41%]", // ring R=150 -> (217,164)
    size: "h-[46px] w-[46px]",
    tint: "text-brand-end",
    stagger: 0.25,
  },
];

/** The endpoint stack. Only the first card is live; the two behind it drop to
 *  placeholder bars so the eye lands on the live request. 300px wide and
 *  anchored to run off the right edge of the stage, the way the reference
 *  bleeds them out of frame. The cards behind are flat lavender fills, which
 *  makes them recede without looking washed out, and each carries a brand-tinted
 *  border that fades down the stack (16% -> 12% -> 8%). All three share a left
 *  edge (x=263) so the SVG bracket can serve as their leading edge. */
const API_CARDS = [
  {
    method: "POST",
    path: "/v1/messages",
    pos: "left-[73.75%] top-[19%]", // centre (413,76) -> spans x 263-563
    active: true,
    bar: "",
    shell:
      "bg-white shadow-xl shadow-primary/[0.12] ring-1 ring-brand-start/[0.16]",
    chip: "bg-gradient-brand text-white shadow-md shadow-primary/25",
    stagger: 0.12,
  },
  {
    method: "GET",
    path: "/v1/reports",
    pos: "left-[73.75%] top-[44%]", // centre (413,176) — 12px below card 1
    active: false,
    bar: "w-full",
    shell: "bg-[#eceffb] ring-1 ring-brand-start/[0.12]",
    chip: "bg-white text-brand-start/70",
    stagger: 0.2,
  },
  {
    method: "POST",
    path: "/v1/contacts",
    pos: "left-[73.75%] top-[69%]", // centre (413,276) — tucks behind the request card
    active: false,
    bar: "w-4/5",
    shell: "bg-[#f2f4fc] ring-1 ring-brand-start/[0.08]",
    chip: "bg-white/70 text-brand-start/45",
    stagger: 0.28,
  },
];

/** Inbox rows behind the card. Varied widths so it reads as a real list rather
 *  than a stack of identical bars. */
const INBOX_ROWS = [
  { name: "w-16", preview: "w-24", unread: true },
  { name: "w-12", preview: "w-20", unread: false },
  { name: "w-20", preview: "w-[6.5rem]", unread: true },
  { name: "w-14", preview: "w-24", unread: false },
  { name: "w-16", preview: "w-20", unread: false },
  { name: "w-12", preview: "w-[6.5rem]", unread: false },
  { name: "w-[4.5rem]", preview: "w-24", unread: false },
];

/** The handset. Bezel, dynamic island, status bar and a Messages list — the
 *  list is blurred back because the campaign card is the subject.
 *  Sized to a ~2.1:1 aspect so it reads as a real phone. */
function PhoneMock() {
  return (
    <div className="relative h-[380px] w-[180px] rounded-[2.4rem] bg-slate-900 p-[7px] shadow-2xl shadow-slate-900/30 ring-1 ring-inset ring-white/10">
      {/* side buttons */}
      <span className="absolute -left-[2.5px] top-[78px] h-5 w-[2.5px] rounded-l-sm bg-slate-800" />
      <span className="absolute -left-[2.5px] top-[106px] h-9 w-[2.5px] rounded-l-sm bg-slate-800" />
      <span className="absolute -left-[2.5px] top-[150px] h-9 w-[2.5px] rounded-l-sm bg-slate-800" />
      <span className="absolute -right-[2.5px] top-[120px] h-14 w-[2.5px] rounded-r-sm bg-slate-800" />

      <div className="relative h-full w-full overflow-hidden rounded-[1.95rem] bg-white">
        {/* status bar, wrapping around the island */}
        <div className="flex items-center justify-between px-4 pt-[7px] text-[7px] font-bold text-slate-900">
          <span>9:41</span>
          <span className="flex items-center gap-[3px]">
            <span className="flex items-end gap-[1.5px]">
              {[3, 4.5, 6, 7].map((h) => (
                <span
                  key={h}
                  className="w-[2px] rounded-[1px] bg-slate-900"
                  style={{ height: `${h}px` }}
                />
              ))}
            </span>
            <Wifi className="h-[8px] w-[8px]" strokeWidth={3} />
            <span className="flex h-[7px] w-[13px] items-center rounded-[2px] border border-slate-900/70 p-[1px]">
              <span className="h-full w-[72%] rounded-[1px] bg-slate-900" />
            </span>
          </span>
        </div>

        {/* dynamic island */}
        <span className="absolute left-1/2 top-[6px] h-[17px] w-[52px] -translate-x-1/2 rounded-full bg-slate-900" />

        {/* app chrome */}
        <div className="px-3 pt-3">
          <p className="text-[12px] font-bold tracking-tight text-slate-900">
            Messages
          </p>
          <span className="mt-2 flex h-[19px] items-center gap-1 rounded-md bg-slate-100 px-1.5">
            <Search className="h-2 w-2 text-slate-400" strokeWidth={3} />
            <span className="h-1 w-8 rounded-full bg-slate-300" />
          </span>
        </div>

        {/* the list, pushed out of focus behind the card */}
        <div className="mt-2.5 space-y-[11px] px-3 opacity-60 blur-[1.1px]">
          {INBOX_ROWS.map((r, i) => (
            <span key={i} className="flex items-center gap-2">
              <span
                className={`h-[26px] w-[26px] shrink-0 rounded-full bg-gradient-brand ${
                  r.unread ? "opacity-80" : "opacity-45"
                }`}
              />
              <span className="min-w-0 flex-1">
                <span
                  className={`block h-[5px] rounded-full bg-slate-300 ${r.name}`}
                />
                <span
                  className={`mt-[5px] block h-[5px] rounded-full bg-slate-200 ${r.preview}`}
                />
              </span>
              {r.unread && (
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-primary" />
              )}
            </span>
          ))}
        </div>

        {/* home indicator */}
        <span className="absolute bottom-[7px] left-1/2 h-[3px] w-[62px] -translate-x-1/2 rounded-full bg-slate-900/75" />
      </div>
    </div>
  );
}

/** A 3D-ish speech bubble. Rotation sits on the outer span and the float on the
 *  inner one — an animated `transform` would otherwise clobber the rotation. */
function ChatBubble({ size, className, rotate = 0, delay = 0, slower = false }) {
  return (
    <span
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span
        className={`block ${slower ? "animate-float-slower" : "animate-float-slow"}`}
        style={{ animationDelay: `${delay}s` }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          className="drop-shadow-lg"
          aria-hidden
        >
          <path
            d="M9 4h22a6 6 0 0 1 6 6v13a6 6 0 0 1-6 6H19l-9 7v-7H9a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6z"
            fill="url(#bulkBubbleGrad)"
          />
        </svg>
      </span>
    </span>
  );
}

/** Phone, orbit and bubbles — shared by scenes 1 and 2 and rendered once, above
 *  the carousel, so they hold perfectly still while only the pop-ups and chat
 *  bubbles swap over. Fading these per-scene would cross-fade identical
 *  elements against each other, which reads as a flicker. */
function PhoneStage() {
  return (
    <div className="relative mx-auto h-full w-full max-w-[560px]">
      {/* dashed orbit + the gradient every bubble references */}
      <svg
        viewBox="0 0 585 400"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="bulkBubbleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-start)" />
            <stop offset="100%" stopColor="var(--brand-end)" />
          </linearGradient>
        </defs>
        <ellipse
          cx="292"
          cy="200"
          rx="238"
          ry="152"
          fill="none"
          stroke="var(--brand-start)"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeDasharray="7 9"
          className="animate-dash-flow"
        />
      </svg>

      <ChatBubble size={28} className="left-[13%] top-[2%]" rotate={-12} />
      <ChatBubble
        size={46}
        className="right-[3%] top-[6%]"
        rotate={10}
        delay={0.8}
        slower
      />
      <ChatBubble
        size={24}
        className="left-[1%] top-[44%]"
        rotate={-8}
        delay={1.6}
      />
      <ChatBubble
        size={40}
        className="bottom-[4%] right-[6%]"
        rotate={14}
        delay={0.4}
        slower
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PhoneMock />
      </div>
    </div>
  );
}

/** Every scene: full-width hero element → strip → detail band → closing stat. */
function SceneVisual({ id }) {
  // 1 — Bulk SMS: one message on the phone, multiplying out across the orbit
  if (id === 0) {
    // capped width: the phone is a fixed size but the pop-ups are positioned in
    // %, so their alignment would drift as the column grows
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* delivery confirmations popping out around the phone, then retracting
            as scene 2 arrives */}
        {POPUPS.map(({ text, pos, stagger }) => (
          <span key={text} className={`pointer-events-none absolute ${pos}`}>
            <span
              className="animate-scene-pop flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-3 py-2 shadow-lg shadow-slate-900/10 ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(0, stagger) }}
            >
              <Check
                className="h-3.5 w-3.5 shrink-0 text-emerald-500"
                strokeWidth={3}
              />
              <span className="font-mono text-[12px] text-foreground">
                {text}
              </span>
            </span>
          </span>
        ))}

        {/* the message itself — centring on the wrapper so the pop's scale()
            doesn't fight the -translate-y-1/2 */}
        <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="animate-scene-pop rounded-2xl bg-white p-4 text-left shadow-2xl shadow-slate-900/10 ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(0, 0) }}
          >
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-[13px] font-bold text-white">
                M
              </span>
              <span className="text-[15px] font-semibold text-foreground">
                Maple & Thread
              </span>
              <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <Check className="h-3 w-3" strokeWidth={3} /> Delivered
              </span>
            </span>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              Flash sale — 50% off everything today! Shop now before it ends.{" "}
              <span className="font-medium text-primary">…More</span>
            </p>
            <span className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <Send className="h-3.5 w-3.5 text-primary" />
              <span className="text-[12px] text-muted-foreground">
                Sent to{" "}
                <span className="font-semibold text-heading">12,480</span>{" "}
                contacts in one click
              </span>
              <span className="animate-pulse-soft ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2 — Two-Way: the conversation straddling the (shared, stationary) handset
  if (id === 1) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* the conversation, each bubble half on the handset and half off it */}
        {CHATS.map(({ id: cid, text, out, pos, stagger }) => (
          <span
            key={cid}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${pos}`}
          >
            <span
              className={`animate-scene-pop flex w-max max-w-[260px] items-center gap-2.5 rounded-2xl px-4 py-3 shadow-xl ${
                out
                  ? "rounded-br-md bg-gradient-brand text-white shadow-primary/25"
                  : "rounded-bl-md bg-white text-foreground shadow-slate-900/10 ring-1 ring-black/5"
              }`}
              style={{ animationDelay: sceneDelay(1, stagger) }}
            >
              {!out && (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-[13px] font-bold text-white">
                  S
                </span>
              )}
              <span className="text-[15px] font-medium leading-snug">
                {text}
              </span>
            </span>
          </span>
        ))}

        {/* the reply being typed — same centre-on-the-edge anchoring */}
        <span className="pointer-events-none absolute left-[66%] top-[80.75%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-pop inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-3 shadow-xl shadow-slate-900/10 ring-1 ring-black/5"
            style={{ animationDelay: sceneDelay(1, 0.41) }}
          >
            {[0, 0.2, 0.4].map((d) => (
              <span
                key={d}
                className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </span>
        </span>
      </div>
    );
  }

  // 3 — Automation: triggers feed one rule, which fans out to three actions
  if (id === 2) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* connectors: stem down from the rule, a bus, then three drops.
            Fade-only (no scale) so the lines don't warp on entry. */}
        <svg
          viewBox="0 0 560 400"
          className="animate-scene-fade pointer-events-none absolute inset-0 h-full w-full"
          style={{ animationDelay: sceneDelay(2, 0.24) }}
          aria-hidden
        >
          <g
            fill="none"
            stroke="var(--brand-start)"
            strokeOpacity="0.45"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            {/* trigger pills into the rule */}
            <path d="M150,76 H222" />
            <path d="M410,76 H338" />
            {/* rule down to the bus, with rounded corners out to each side.
                Drops stop at y=210 so the arrowheads (tip y=224) clear the
                action cards, which start at y=236. */}
            <path d="M280,120 V178" />
            <path d="M108,210 V192 Q108,178 122,178 H438 Q452,178 452,192 V210" />
            <path d="M280,178 V210" />
          </g>
          <g fill="var(--brand-start)" fillOpacity="0.55">
            <path d="M100,212 h16 l-8,12 z" />
            <path d="M272,212 h16 l-8,12 z" />
            <path d="M444,212 h16 l-8,12 z" />
          </g>
        </svg>

        {/* the two triggers */}
        {FLOW_TRIGGERS.map(({ label, pos, stagger }) => (
          <span
            key={label}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${pos}`}
          >
            <span
              className="animate-scene-fade block whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-foreground shadow-lg shadow-slate-900/10 ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(2, stagger) }}
            >
              {label}
            </span>
          </span>
        ))}

        {/* the rule at the centre */}
        <span className="pointer-events-none absolute left-1/2 top-[19%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-fade flex h-[88px] w-[88px] flex-col items-center justify-center gap-1 rounded-3xl bg-gradient-brand text-white shadow-xl shadow-primary/25"
            style={{ animationDelay: sceneDelay(2, 0.05) }}
          >
            <Workflow className="h-7 w-7" strokeWidth={2} />
            <span className="text-[11px] font-semibold tracking-tight">
              Flow
            </span>
          </span>
        </span>

        {/* the three actions it fans out to */}
        {FLOW_ACTIONS.map(({ icon: Icon, label, sub, pos, chip, stagger }) => (
          <span
            key={label}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${pos}`}
          >
            <span
              className="animate-scene-fade flex w-[132px] flex-col items-center gap-2 rounded-2xl bg-white px-3 py-4 shadow-xl shadow-slate-900/10 ring-1 ring-black/5"
              style={{ animationDelay: sceneDelay(2, stagger) }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${chip}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-center">
                <span className="block text-[13px] font-semibold text-foreground">
                  {label}
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  {sub}
                </span>
              </span>
            </span>
          </span>
        ))}
      </div>
    );
  }

  // 4 — Analytics. Sparse composition, but with real numbers on it: two cards,
  // a soft panel and a big lens, placed by CENTRE on the 560x400 stage:
  //   dashboard (150,92) · report (168,298) · panel (408,196) · lens (250,190)
  // The lens straddles all three, which is what gives the composition depth.
  if (id === 3) {
    return (
      <div className="relative mx-auto h-full w-full max-w-[560px]">
        {/* thin decorative thread, top-left */}
        <svg
          viewBox="0 0 560 400"
          className="animate-scene-fade pointer-events-none absolute inset-0 h-full w-full"
          style={{ animationDelay: sceneDelay(3, 0.04) }}
          aria-hidden
        >
          <defs>
            <clipPath id="threadReveal">
              <rect
                x="0"
                y="0"
                width="560"
                height="400"
                className="animate-scene-wipe"
                style={{ animationDelay: sceneDelay(3, 0.04) }}
              />
            </clipPath>
          </defs>
          <g clipPath="url(#threadReveal)">
            <path
              d="M-10,64 C40,26 74,96 118,62"
              fill="none"
              stroke="var(--brand-start)"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* soft panel, right */}
        <span className="pointer-events-none absolute left-[72.9%] top-[49%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-fade block"
            style={{ animationDelay: sceneDelay(3, 0.02) }}
          >
            <span className="animate-float-slower relative block h-[232px] w-[252px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-start/[0.09] to-brand-end/[0.09] ring-1 ring-black/[0.04]">
              <span className="absolute left-5 top-5 text-left">
                <span className="block text-[11px] font-medium text-muted-foreground">
                  Clicks this week
                </span>
                <span className="mt-1 block text-[24px] font-bold leading-none text-heading">
                  3,204
                </span>
              </span>
              <span className="absolute right-5 top-5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 shadow-sm">
                +2.4%
              </span>
              <svg
                viewBox="0 0 252 232"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id="wave4" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--brand-start)" />
                    <stop offset="100%" stopColor="var(--brand-end)" />
                  </linearGradient>
                  <clipPath id="wave4Reveal">
                    <rect
                      x="0"
                      y="0"
                      width="252"
                      height="232"
                      className="animate-scene-wipe"
                      style={{ animationDelay: sceneDelay(3, 0.14) }}
                    />
                  </clipPath>
                </defs>
                {/* One path: the rising curve, then the two arrowhead strokes
                    as trailing subpaths. A dash-offset draw walks the path in
                    order, so the head can only appear once the line has
                    finished — no second timer to keep in sync. */}
                <g clipPath="url(#wave4Reveal)">
                  <path
                    d="M10,196 C50,190 68,156 104,144 S168,118 226,76 M226,76 L207,79 M226,76 L217,93"
                    fill="none"
                    stroke="url(#wave4)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </span>
          </span>
        </span>

        {/* dashboard window, top-left */}
        <span className="pointer-events-none absolute left-[26.8%] top-[23%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-fade block"
            style={{ animationDelay: sceneDelay(3, 0.08) }}
          >
            <span className="animate-float-slow block w-[252px] rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-black/5">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
                <span className="h-2 w-2 rounded-full bg-slate-200" />
              </span>

              <span className="mt-3.5 flex items-center gap-3">
                <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-brand opacity-85" />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-[13px] font-semibold text-heading">
                    Delivery report
                  </span>
                  <span className="mt-0.5 block text-[10px] text-muted-foreground">
                    Last 7 days · all campaigns
                  </span>
                </span>
              </span>

              <span className="mt-3.5 flex border-t border-slate-100 pt-3">
                {[
                  { v: "12,480", l: "Sent" },
                  { v: "99.7%", l: "Delivered" },
                  { v: "1.2s", l: "Avg speed" },
                ].map((s) => (
                  <span key={s.l} className="flex-1 text-left">
                    <span className="block text-[13px] font-bold text-heading">
                      {s.v}
                    </span>
                    <span className="block text-[9px] text-muted-foreground">
                      {s.l}
                    </span>
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>

        {/* carrier report, bottom-left */}
        <span className="pointer-events-none absolute left-[30%] top-[74.5%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-fade block"
            style={{ animationDelay: sceneDelay(3, 0.16) }}
          >
            <span className="animate-float-slower block w-[212px] rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/10 ring-1 ring-black/5">
              <span className="block text-left text-[12px] font-semibold text-heading">
                By carrier
              </span>
              <span className="mt-3 block space-y-2.5">
                {CARRIERS.map((c, i) => (
                  <span key={c.n} className="flex items-center gap-2">
                    <span className="w-[52px] text-left text-[10px] text-muted-foreground">
                      {c.n}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <span
                        className="animate-scene-bar block h-full rounded-full bg-gradient-brand"
                        style={{
                          width: `${c.p + 45}%`,
                          animationDelay: sceneDelay(3, 0.22 + i * 0.08),
                        }}
                      />
                    </span>
                    <span className="w-7 text-right text-[10px] font-semibold text-foreground">
                      {c.p}%
                    </span>
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>

        {/* the lens — focal point, straddling all three */}
        <span className="pointer-events-none absolute left-[44.6%] top-[47.5%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="animate-scene-fade block"
            style={{ animationDelay: sceneDelay(3, 0.26) }}
          >
            <span className="animate-float-slow relative block h-[132px] w-[132px]">
              {/* handle: -rotate-45 points down-RIGHT (plain rotate-45 swings it
                  down-left, back under the lens). Behind the rim on purpose. */}
              <span className="absolute left-[103px] top-[106px] h-[58px] w-[14px] origin-top -rotate-45 rounded-full bg-slate-300 shadow-md shadow-slate-900/15" />
              <span className="relative flex h-[132px] w-[132px] items-center justify-center rounded-full bg-white/75 shadow-2xl shadow-slate-900/20 ring-[9px] ring-slate-300 backdrop-blur-[2px]">
                <span className="text-center">
                  <span className="block text-[26px] font-bold leading-none text-heading">
                    99.7%
                  </span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    delivered
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
      </div>
    );
  }

  // 5 — API & Integrations: connected apps on the left, long sweeping arcs into
  // a stack of endpoint cards, and a request card overlapping the stack.
  // Only the top card carries detail; the two behind it fall back to
  // placeholders so the eye lands on the live request.
  return (
    <div className="relative mx-auto h-full w-full max-w-[560px]">
      {/* arcs + the bracket running down the stack and into the request card */}
      <svg
        viewBox="0 0 560 400"
        className="animate-scene-fade pointer-events-none absolute inset-0 h-full w-full"
        style={{ animationDelay: sceneDelay(4, 0.06) }}
        aria-hidden
      >
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--brand-start)" />
            <stop offset="100%" stopColor="var(--brand-end)" />
          </linearGradient>
          <clipPath id="arcReveal">
            <rect
              x="0"
              y="0"
              width="560"
              height="400"
              className="animate-scene-wipe"
              style={{ animationDelay: sceneDelay(4, 0.06) }}
            />
          </clipPath>
        </defs>

        <g
          clipPath="url(#arcReveal)"
          fill="none"
          stroke="var(--brand-start)"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {/* CONCENTRIC rings — quarter arcs sharing one centre (280,300) at
              radii 150/195/240/285, so they nest like ripples. The app tiles
              sit ON these rings. Independent curves read as loose diagonals. */}
          <path d="M130,300 C130,217 197,150 280,150" strokeOpacity="0.18" />
          <path d="M85,300 C85,192 172,105 280,105" strokeOpacity="0.26" />
          <path d="M40,300 C40,167 147,60 280,60" strokeOpacity="0.34" />
          <path d="M-5,300 C-5,143 123,15 280,15" strokeOpacity="0.18" />
        </g>

        <g clipPath="url(#arcReveal)" fill="var(--brand-end)" fillOpacity="0.8">
          <circle cx="129" cy="58" r="3.5" />
          <circle cx="197" cy="124" r="3.5" />
        </g>
      </svg>

      {/* connected apps */}
      {INTEGRATION_MARKS.map(
        ({ icon: Icon, label, pos, size, tint, stagger }) => (
          <span
            key={label}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${pos}`}
          >
            <span
              className="animate-scene-fade block"
              style={{ animationDelay: sceneDelay(4, stagger) }}
            >
              {/* The float wrapper is `relative` and the caption is absolute, so
                the tile itself stays centred on its ring — letting the caption
                affect layout would push every tile off its radius. */}
              <span className="animate-float-slower relative block">
                <span
                  className={`flex items-center justify-center rounded-2xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-brand-start/[0.14] ${size}`}
                >
                  <Icon className={`h-6 w-6 ${tint}`} strokeWidth={2} />
                </span>
                <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-tight text-muted-foreground">
                  {label}
                </span>
              </span>
            </span>
          </span>
        ),
      )}

      {/* endpoint stack — top card live, the two behind it are placeholders */}
      {API_CARDS.map(
        ({ method, path, pos, active, stagger, bar, shell, chip }) => (
          <span
            key={path}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${pos}`}
          >
            <span
              className="animate-scene-fade block"
              style={{ animationDelay: sceneDelay(4, stagger) }}
            >
              <span
                className={`relative flex w-[300px] items-center gap-4 overflow-hidden rounded-2xl px-5 py-5 ${shell} ${
                  active ? "animate-float-slow" : ""
                }`}
              >
                {/* Accent on the LEFT + BOTTOM edges, drawn as ONE path so it
                  follows the 16px corner radius. Two straight bars got clipped
                  by overflow-hidden and left a notch at the corner.
                  Lives inside the card so it floats with it — an SVG outside
                  stayed put while the card bobbed and the border drifted off. */}
                {active && (
                  <svg
                    viewBox="0 0 300 88"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="liveEdge" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="var(--brand-start)" />
                        <stop offset="55%" stopColor="var(--brand-end)" />
                        <stop
                          offset="100%"
                          stopColor="var(--brand-end)"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M2.5,0 V72 A13.5,13.5 0 0 0 16,85.5 H240"
                      fill="none"
                      stroke="url(#liveEdge)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${chip}`}
                >
                  <Code2 className="h-5 w-5" strokeWidth={2.5} />
                </span>

                {active ? (
                  <>
                    <span className="min-w-0 flex-1 text-left font-mono text-[13px] font-semibold leading-snug">
                      <span className="text-brand-end">{method}</span>{" "}
                      <span className="text-heading">{path}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                      200
                    </span>
                  </>
                ) : (
                  /* two bars, like the reference — one long, one short */
                  <span className="min-w-0 flex-1 space-y-2">
                    <span
                      className={`block h-2.5 rounded-full bg-white/75 ${bar}`}
                    />
                    <span className="block h-2.5 w-1/2 rounded-full bg-white/55" />
                  </span>
                )}
              </span>
            </span>
          </span>
        ),
      )}

      {/* The request. Seated at centre y=311 so its top (228) clears card2's
          bottom (220) — it previously overlapped card2 by 12px and ran off the
          bottom of the stage. It still tucks over card3, which is intended. */}
      <span className="pointer-events-none absolute left-[31%] top-[77.75%] -translate-x-1/2 -translate-y-1/2">
        <span
          className="animate-scene-fade block"
          style={{ animationDelay: sceneDelay(4, 0.3) }}
        >
          <span className="animate-float-slower relative block w-[310px] overflow-hidden rounded-2xl bg-white p-4 shadow-2xl shadow-slate-900/10 ring-1 ring-brand-start/[0.14]">
            {/* Accent on the TOP + RIGHT edges, mirroring the live card's
                left+bottom. One path so it follows the 16px corner radius, and
                it fades at both ends. Inside the card so it floats with it. */}
            <svg
              viewBox="0 0 310 164"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="reqEdge" x1="0" y1="0" x2="1" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--brand-start)"
                    stopOpacity="0"
                  />
                  <stop offset="45%" stopColor="var(--brand-start)" />
                  <stop
                    offset="100%"
                    stopColor="var(--brand-end)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path
                d="M70,2.5 H294 A13.5,13.5 0 0 1 307.5,16 V120"
                fill="none"
                stroke="url(#reqEdge)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>

            <span className="block text-left font-mono text-[13px] font-semibold">
              <span className="text-brand-end">POST</span>{" "}
              <span className="text-heading">/v1/messages</span>
            </span>
            <span className="mt-3.5 block space-y-2.5">
              {[
                "Authenticated with API key",
                "Message queued for 12,480 contacts",
                "Delivered in 42ms",
              ].map((t) => (
                <span key={t} className="flex items-center gap-2.5">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <Check
                      className="h-2.5 w-2.5 text-emerald-600"
                      strokeWidth={3.5}
                    />
                  </span>
                  <span className="text-left text-[12px] text-muted-foreground">
                    {t}
                  </span>
                </span>
              ))}
            </span>

            {/* one trailing placeholder — suggests more below without pushing
                the card off the bottom of the stage */}
            <span className="mt-3.5 block h-2.5 w-2/3 rounded-full bg-slate-100" />
          </span>
        </span>
      </span>
    </div>
  );
}

export default function HeroScenes() {
  // A scaled element keeps its full layout height, so the stage still reserved
  // 400px while drawing 232px — the negative margins on it claw that back, and
  // this min-height drops to match.
  //
  // min-w-0: this is a grid item, and min-width:auto would let it stretch to fit
  // the 560px stage inside it — which dragged the caption below out to 560px and
  // off the screen. Pinned to the column, the oversized stage simply overflows
  // it and is scaled back into place.
  return (
    <div className="relative flex min-h-[260px] min-w-0 flex-col items-center justify-center sm:min-h-[520px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 opacity-[0.1]">
        <div className="animate-pulse-soft h-full w-full rounded-full bg-gradient-brand blur-3xl" />
      </div>

      {/* Fixed slot: scenes differ in height, so this keeps the title from
          jumping as the carousel rotates.

          The stage is pinned to 560px — the width these scenes were composed
          against — and scaled to fit the column, rather than being w-full.
          Children are positioned by PERCENTAGE of the stage but sized in fixed
          pixels, so a narrower stage compresses the gaps while the cards keep
          their width: at 327px the three flow cards overlapped by 26px and the
          API cards by 246px. Laying out at 560px and scaling the finished
          composition keeps every gap exactly as designed.

          Scales are set per breakpoint against the narrowest column each one
          can produce:
            base  <640   column 327  -> 560*0.58 = 325
            sm    640+   column 592  -> 560*1.00 = 560
            lg    1024+  column 464  -> 560*0.82 = 459   (two-column grid)
            xl    1280+  column 592  -> 560*1.00 = 560 */}
      <div className="relative mx-auto -my-[84px] flex h-[400px] w-[560px] shrink-0 origin-left scale-[0.58] items-center justify-center sm:my-0 sm:scale-100 lg:-my-[36px] lg:scale-[0.82] xl:my-0 xl:scale-100">
        {/* stationary across scenes 1 and 2 — only the pop-ups and chats change */}
        <div className="animate-stage-1-2 pointer-events-none absolute inset-0 flex items-center justify-center">
          <PhoneStage />
        </div>

        {SCENES.map(({ title }, i) => {
          // Scenes 1-4 are driven entirely by `scene-pop`/`scene-fade` on their
          // own elements, so their wrapper must NOT fade: the wrapper's fade-out
          // finishes at 6.40s while the pops are still retracting until ~6.9s,
          // which clipped the pop-in and left it looking like a plain fade.
          const popDriven = i <= 3;
          return (
            <div
              key={title}
              className={`absolute inset-0 flex items-center justify-center text-center ${
                popDriven ? "pointer-events-none" : "animate-scene-5"
              }`}
              style={popDriven ? undefined : { animationDelay: `${i * 3.2}s` }}
            >
              <SceneVisual id={i} />
            </div>
          );
        })}
      </div>

      {/* the labels cross-fade on their own, below the stage */}
      <div className="relative mt-6 h-[64px] w-full">
        {SCENES.map(({ title, desc }, i) => (
          <div
            key={title}
            className="animate-scene-5 absolute inset-0 text-center"
            style={{ animationDelay: `${i * 3.2}s` }}
          >
            <p className="text-lg font-semibold tracking-tight text-heading sm:text-xl">
              {title}
            </p>
            <p className="mx-auto mt-1 max-w-[16rem] text-xs text-muted-foreground">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
