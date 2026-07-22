"use client";

import { useEffect, useRef, useState } from "react";
import {
  Send,
  Megaphone,
  MessagesSquare,
  Users,
  Headset,
  BarChart2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import DropText from "./DropText";
import Reveal from "./Reveal";
import OutcomesShowcase from "./OutcomesShowcase";

type Feature = {
  icon: LucideIcon;
  tag: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    icon: Send,
    tag: "Most used",
    eyebrow: "Bulk SMS",
    title: "Mass texting",
    subtitle: "Send to thousands in one click",
    desc: "Reach your whole audience instantly with bulk SMS delivered in seconds — no setup required.",
  },
  {
    icon: Megaphone,
    tag: "Best for growth",
    eyebrow: "Campaigns",
    title: "SMS marketing",
    subtitle: "Promotions, offers & campaigns",
    desc: "Build, schedule, and track targeted promotional campaigns from a single dashboard.",
  },
  {
    icon: MessagesSquare,
    tag: "Customer favorite",
    eyebrow: "Conversations",
    title: "Two-way messaging",
    subtitle: "Real conversations, not blasts",
    desc: "Let customers reply and manage every chat in one shared, real-time team inbox.",
  },
  {
    icon: Users,
    tag: "Stay organized",
    eyebrow: "Audience",
    title: "Contacts",
    subtitle: "Organize and segment with ease",
    desc: "Import, group, and segment contacts so the right message reaches the right people.",
  },
  {
    icon: Headset,
    tag: "Support ready",
    eyebrow: "Support",
    title: "Helpdesk",
    subtitle: "Support that lives in SMS",
    desc: "Resolve customer queries over text with ticketing and fast response tracking.",
  },
  {
    icon: BarChart2,
    tag: "Data driven",
    eyebrow: "Analytics",
    title: "Reporting",
    subtitle: "Know exactly what's working",
    desc: "Monitor delivery, clicks, and replies in real time with carrier-level analytics.",
  },
];

const SLIDE_MS = 700;

// Disabled arrows fade out and drop their hover styling, so a dead end reads as
// dead rather than as a button that silently does nothing.
const ARROW =
  "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-foreground transition-all duration-300 " +
  "hover:border-brand-start/30 hover:bg-brand-start/10 hover:text-brand-start " +
  "disabled:pointer-events-none disabled:opacity-30";

function FeatureCard({
  feature,
  highlighted,
}: {
  feature: Feature;
  highlighted: boolean;
}) {
  const { icon: Icon, tag, eyebrow, title, subtitle, desc } = feature;
  return (
    <div
      className={`relative h-full transition-transform duration-500 ${
        highlighted ? "lg:-translate-y-3" : ""
      }`}
    >
      {highlighted && (
        <span className="absolute -top-5 right-5 z-20 whitespace-nowrap rounded-full rounded-bl-none bg-white px-5 py-2 text-xs font-semibold text-foreground shadow-lg shadow-primary/15 ring-1 ring-black/[0.04]">
          {tag}
        </span>
      )}

      <div
        className={`h-full overflow-hidden rounded-2xl ${
          highlighted
            ? "p-1 shadow-2xl shadow-primary/20"
            : "border border-border"
        }`}
        style={
          highlighted
            ? {
                border: "1.5px solid transparent",
                background:
                  "linear-gradient(#fff,#fff) padding-box, linear-gradient(128deg,#4f5bd5 3%,#ec4899 52%,rgba(236,72,153,0) 90%) border-box",
              }
            : undefined
        }
      >
        <div
          className={`flex h-full flex-col overflow-hidden bg-white ${
            highlighted ? "rounded-[10.5px]" : "rounded-[15px]"
          }`}
        >
          {/* header */}
          <div
            className={`p-4 sm:p-6 ${
              highlighted
                ? "bg-gradient-to-br from-brand-start/[0.07] to-brand-end/[0.07]"
                : "bg-muted/40"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-11 sm:w-11 sm:rounded-xl">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:mt-4 sm:text-xs">
              {eyebrow}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground sm:text-xl">
              {title}
            </p>
            <p className="mt-1.5 text-[13px] text-muted-foreground sm:mt-2 sm:text-sm">
              {subtitle}
            </p>
          </div>

          {/* short description */}
          <div className="flex-1 p-4 sm:p-6">
            <p className="text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureSlider() {
  const N = FEATURES.length;
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  // Cards are full-width below sm, half at sm, a third at lg — read that from
  // the breakpoints rather than inferring it from measured widths, which races
  // the first layout.
  const [perView, setPerView] = useState(1);
  const last = Math.max(0, N - perView);
  const atStart = index === 0;
  const atEnd = index >= last;

  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const apply = () => setPerView(lg.matches ? 3 : sm.matches ? 2 : 1);
    apply();
    sm.addEventListener("change", apply);
    lg.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    return () => {
      sm.removeEventListener("change", apply);
      lg.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  // Clamp if a wider breakpoint shrinks the reachable range.
  useEffect(() => {
    setIndex((i) => Math.min(i, last));
  }, [last]);

  useEffect(() => {
    const card = cardRef.current;
    const track = trackRef.current;
    if (!card || !track) return;
    const measure = () => {
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      // ignore 0-width reads (track/cards not laid out yet)
      if (card.offsetWidth > 0) setStep(card.offsetWidth + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(card);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Auto-advance rewinds to the first slide at the end, so the reel keeps
  // cycling — but the arrows still clamp, so they can show a real disabled
  // state at each end rather than pretending the range is endless.
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i >= last ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [last]);

  const next = () => setIndex((i) => Math.min(last, i + 1));
  const prev = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <div
      className="mt-4"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* arrows below the text, aligned to where the description text starts */}
      <div className="ml-auto flex max-w-md gap-2 sm:gap-3">
        <button
          type="button"
          onClick={prev}
          disabled={atStart}
          aria-label="Previous feature"
          className={ARROW}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          aria-label="Next feature"
          className={ARROW}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        className="relative mt-4 px-1 pt-6 pb-8 sm:mt-6 sm:pt-10"
        style={{ overflowX: "clip", overflowY: "visible" }}
      >
        {/* radial glow behind the center card */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(40% 62% at 50% 50%, rgba(21,73,137,0.09), rgba(255,61,138,0.06) 48%, transparent 74%)",
          }}
        />
        <div
          ref={trackRef}
          className="relative flex gap-6"
          style={{
            transform: `translate3d(-${index * step}px, 0, 0)`,
            transition: `transform ${SLIDE_MS}ms ease`,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              ref={i === 0 ? cardRef : undefined}
              className="w-full shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              {/* Reveal sits inside the sized cell, not around it — the track
                  measures this cell's width via cardRef to compute the slide
                  step, and Reveal doesn't forward refs. */}
              <Reveal delay={i * 90}>
                {/* highlight the middle card of whatever is in view */}
                <FeatureCard
                  feature={f}
                  highlighted={i === index + Math.floor((perView - 1) / 2)}
                />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PlatformFeatures() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* heading left, description bottom-right */}
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Complete SMS Platform
            </span>
            <DropText
              as="h2"
              className="mt-5 text-[1.8rem] font-medium tracking-tight text-heading sm:text-4xl lg:text-[2.75rem]"
              segments={[
                { text: "Explore The Features That Make" },
                {
                  text: "Messaging Seamless",
                  className: "text-gradient-brand",
                },
              ]}
            />
          </div>
          <p className="max-w-md text-muted-foreground lg:ml-auto lg:pb-2">
            Everything you need to reach customers — bulk sending, two-way
            conversations, automation, and analytics, all in one place with no
            technical setup.
          </p>
        </div>

        <FeatureSlider />

        <OutcomesShowcase />
      </div>
    </section>
  );
}
