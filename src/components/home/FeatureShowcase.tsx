"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessagesSquare,
  Send,
  Bell,
  Users,
  BarChart3,
  LayoutGrid,
  Home,
  Settings,
  Sun,
  Gauge,
  Flame,
  Leaf,
  Triangle,
  Infinity as InfinityIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

// 6 nodes in a hexagon around a glowing center hub (%, viewBox 0-100)
const NODES = [
  { icon: Sun, color: "text-orange-500", x: 28, y: 22 },
  { icon: Gauge, color: "text-blue-500", x: 72, y: 22 },
  { icon: InfinityIcon, color: "text-sky-500", x: 13, y: 50 },
  { icon: Flame, color: "text-red-500", x: 87, y: 50 },
  { icon: Leaf, color: "text-green-500", x: 28, y: 78 },
  { icon: Settings, color: "text-slate-800", x: 72, y: 78 },
];

// orthogonal, circuit-style dashed connectors
const CONNECTORS = [
  { x1: 13, y1: 50, x2: 87, y2: 50, stroke: "rgba(21,73,137,0.3)" }, // horizontal spine
  { x1: 28, y1: 22, x2: 28, y2: 50, stroke: "rgba(255,61,138,0.28)" }, // top-left down
  { x1: 72, y1: 22, x2: 72, y2: 50, stroke: "rgba(21,73,137,0.3)" }, // top-right down
  { x1: 28, y1: 50, x2: 28, y2: 78, stroke: "rgba(255,61,138,0.28)" }, // bottom-left up
  { x1: 72, y1: 50, x2: 72, y2: 78, stroke: "rgba(21,73,137,0.3)" }, // bottom-right up
];

const PILL_TONES: Record<string, string> = {
  rose: "bg-rose-100 text-rose-600 border-rose-200",
  blue: "bg-blue-100 text-blue-600 border-blue-200",
  purple: "bg-purple-100 text-purple-600 border-purple-200",
};

// packed bottom stack — 3 rows x 4, tightly overlapping, falls in cascade then stays
const PILL_ROWS = [
  [
    { label: "Bulk SMS", tone: "rose", rot: "-5deg", delay: "0s" },
    { label: "SMS Marketing", tone: "purple", rot: "3deg", delay: "0.15s" },
    { label: "Campaigns", tone: "blue", rot: "-2deg", delay: "0.3s" },
    { label: "Scheduling", tone: "purple", rot: "6deg", delay: "0.45s" },
  ],
  [
    { label: "OTP", tone: "rose", rot: "4deg", delay: "0.2s" },
    { label: "Alerts", tone: "purple", rot: "-4deg", delay: "0.35s" },
    { label: "Two-Way", tone: "blue", rot: "2deg", delay: "0.5s" },
    { label: "Automation", tone: "blue", rot: "-3deg", delay: "0.65s" },
  ],
  [
    { label: "Reminders", tone: "blue", rot: "-3deg", delay: "0.4s" },
    { label: "API", tone: "purple", rot: "5deg", delay: "0.55s" },
    { label: "Contacts", tone: "rose", rot: "-4deg", delay: "0.7s" },
    { label: "Reports", tone: "purple", rot: "3deg", delay: "0.85s" },
  ],
];

const FLAGS = [
  { flag: "🇺🇸", pos: "left-[18%] top-[20%]" },
  { flag: "🇬🇧", pos: "left-[8%] top-[52%]" },
  { flag: "🇩🇪", pos: "left-[30%] top-[70%]" },
  { flag: "🇫🇷", pos: "left-[46%] top-[40%]" },
  { flag: "🇮🇳", pos: "right-[22%] top-[24%]" },
  { flag: "🇦🇺", pos: "right-[10%] top-[62%]" },
  { flag: "🇧🇷", pos: "right-[34%] top-[68%]" },
  { flag: "🇨🇦", pos: "right-[8%] top-[18%]" },
];

export default function FeatureShowcase() {
  const pillsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // start once the card is meaningfully in view
      if (r.top < vh * 0.85 && r.bottom > vh * 0.15) {
        setStarted(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        badge="Overview"
        title="Everything You Need To"
        highlight="Reach Customers"
        description="SMSLocal brings bulk sending, two-way conversations, and automation into one seamless workspace designed to boost engagement and simplify every campaign."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.55fr_1fr]">
        {/* Row 1 — left: two-way chat visual */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-white p-8 text-center">
          <div className="relative flex h-28 w-full items-center justify-center">
            <div className="animate-pulse-soft absolute h-24 w-24 rounded-full bg-gradient-brand opacity-10 blur-2xl" />
            <div className="relative w-full max-w-[190px] space-y-2.5">
              <div className="flex items-end gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <MessagesSquare className="h-3 w-3" />
                </span>
                <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-1.5 text-left text-[11px] text-slate-600 shadow-sm">
                  Is my order shipped?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-sm bg-blue-100 px-3 py-1.5 text-left text-[11px] text-blue-600 shadow-sm">
                  Yes! Arriving today 🚚
                </div>
              </div>
            </div>
          </div>
          <h3 className="mt-5 text-lg font-semibold text-foreground">
            Two-Way Inbox
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Natural conversations — customers just reply to your texts.
          </p>
        </div>

        {/* Row 1 — center: statement (minimal animation: dots) */}
        <div className="flex flex-col justify-center rounded-3xl border border-border bg-white p-8">
          <div className="flex items-center gap-2">
            <span className="animate-typing-dot h-3 w-3 rounded-full bg-primary" />
            <span
              className="animate-typing-dot h-3 w-3 rounded-full bg-muted-foreground/40"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="animate-typing-dot h-3 w-3 rounded-full bg-secondary"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
          <p className="mt-6 text-xl font-medium leading-relaxed text-foreground">
            <span className="text-gradient-brand">
              Smarter campaigns, instant delivery,
            </span>{" "}
            and real conversations — all powered by one platform.
          </p>
        </div>

        {/* Row 1 — right: automation node diagram (minimal animation: hub pulse) */}
        <div className="rounded-3xl border border-border bg-white p-6">
          <h3 className="font-semibold text-foreground">SMS Automation</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Turn ideas into intelligent action with powerful triggered
            workflows.
          </p>

          <div className="relative mx-auto mt-5 aspect-square w-full max-w-[240px]">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {CONNECTORS.map((c, i) => (
                <line
                  key={i}
                  x1={c.x1}
                  y1={c.y1}
                  x2={c.x2}
                  y2={c.y2}
                  stroke={c.stroke}
                  strokeWidth="0.7"
                  strokeDasharray="2.5 2.5"
                  className="animate-dash-flow"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </svg>

            {/* soft glow behind the hub */}
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand opacity-30 blur-2xl" />

            {NODES.map(({ icon: Icon, color, x, y }, i) => (
              <span
                key={i}
                className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5 ${color}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <Icon className="h-5 w-5" />
              </span>
            ))}

            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-brand text-white shadow-lg shadow-primary/30">
              <Triangle className="h-5 w-5 fill-white" />
            </span>
          </div>
        </div>

        {/* Row 2 — left: app mockup */}
        <div className="overflow-hidden rounded-3xl border border-border bg-white p-6 text-center">
          <h3 className="font-semibold text-foreground">SMSLocal App</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage campaigns on the go with reliable delivery, anywhere.
          </p>

          <div
            className="mx-auto mt-6 w-48 rounded-t-[2rem] border-2 border-b-0 border-foreground bg-foreground p-1 pb-0 shadow-xl"
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 62%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 62%, transparent 100%)",
            }}
          >
            <div className="overflow-hidden rounded-t-[1.5rem] bg-white">
              {/* header */}
              <div className="flex items-center justify-between px-3 pt-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-primary">
                  <LayoutGrid className="h-3.5 w-3.5" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-white">
                  <Bell className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* heading */}
              <div className="px-3 pt-3 text-left">
                <p className="text-[12px] font-bold text-foreground">
                  SMS Tools
                </p>
                <p className="text-[8px] text-muted-foreground">
                  Explore your campaign tools
                </p>
              </div>

              {/* feature tiles */}
              <div className="grid grid-cols-2 gap-2 p-3">
                <div className="rounded-xl bg-primary/10 p-2 text-left">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                    <Send className="h-3.5 w-3.5" />
                  </span>
                  <p className="mt-2 text-[9px] font-semibold text-foreground">
                    Campaigns
                  </p>
                  <p className="text-[7px] leading-tight text-muted-foreground">
                    Send bulk SMS fast
                  </p>
                </div>
                <div className="rounded-xl bg-secondary/10 p-2 text-left">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-secondary shadow-sm">
                    <MessagesSquare className="h-3.5 w-3.5" />
                  </span>
                  <p className="mt-2 text-[9px] font-semibold text-foreground">
                    Two-Way
                  </p>
                  <p className="text-[7px] leading-tight text-muted-foreground">
                    Reply in real time
                  </p>
                </div>
              </div>

              {/* bottom nav */}
              <div className="flex items-center justify-around border-t border-border px-3 py-2.5">
                <Home className="h-3.5 w-3.5 text-primary" />
                <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — center: pills fall in and stack, spread across full width */}
        <div
          ref={pillsRef}
          className="bg-wave relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-white px-6 py-6"
        >
          <div className="flex w-full flex-col -space-y-2">
            {PILL_ROWS.map((row, ri) => (
              <div key={ri} className="flex w-full justify-between">
                {row.map((pill) => (
                  <span
                    key={pill.label}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium shadow-sm ${
                      PILL_TONES[pill.tone]
                    } ${started ? "animate-pill-fall" : "opacity-0"}`}
                    style={
                      {
                        "--rot": pill.rot,
                        animationDelay: pill.delay,
                      } as React.CSSProperties
                    }
                  >
                    {pill.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right: global community with flags */}
        <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white p-6">
          <h3 className="font-semibold text-foreground">
            Built For The Global Community
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            SMSLocal connects businesses across 200+ countries with local
            routing.
          </p>
          <div className="relative -mx-6 -mb-6 mt-4 min-h-[12rem] flex-1 overflow-hidden rounded-b-3xl">
            {/* full world map — svg used as a mask over the brand gradient */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #154989, #7c6ee0 55%, #ff3d8a)",
                maskImage: "url('/world-map-full.svg')",
                WebkitMaskImage: "url('/world-map-full.svg')",
                maskSize: "108% auto",
                WebkitMaskSize: "108% auto",
                maskPosition: "center bottom",
                WebkitMaskPosition: "center bottom",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
            {/* soft top fade into the card */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
            {FLAGS.map(({ flag, pos }, i) => (
              <span
                key={flag}
                className={`animate-float-slow absolute flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-base shadow-sm ${pos}`}
                style={{ animationDelay: `${(i % 4) * 0.5}s` }}
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
