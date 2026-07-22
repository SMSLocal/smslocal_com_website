"use client";

import { useEffect, useRef, useState } from "react";

const PILL_TONES: Record<string, string> = {
  rose: "bg-rose-100 text-rose-600 border-rose-200",
  blue: "bg-blue-100 text-blue-600 border-blue-200",
  purple: "bg-purple-100 text-purple-600 border-purple-200",
};

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

export default function PowerhousePills() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    let io: IntersectionObserver | null = null;

    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.85 && r.bottom > vh * 0.1;
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };
    const start = () => {
      if (done) return;
      done = true;
      setStarted(true);
      cleanup();
    };
    function onScroll() {
      if (inView()) start();
    }

    if (inView()) {
      setStarted(true);
      return;
    }
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) start();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(el);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      className="bg-wave relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-border bg-white p-8"
    >
      <div>
        <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          SMS Powerhouse
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Powered by carrier-grade delivery, optimized for blazing speed,
          privacy-first design, and reliable global reach.
        </p>
      </div>

      {/* Four pills per row spread with justify-between need ~400px; the
          mobile card is 263px inside its padding, so the last pill in each row
          overflowed by up to 108px. Below sm the rows wrap and centre instead,
          and the pills tighten. The negative row overlap only applies once the
          rows are single-line again. */}
      <div className="mt-auto flex w-full flex-wrap justify-center gap-1.5 pt-8 sm:flex-col sm:flex-nowrap sm:gap-0 sm:-space-y-2">
        {PILL_ROWS.map((row, ri) => (
          // display:contents below sm, so all twelve pills wrap as one group and
          // no row strands a single pill on its own line. The row boxes come
          // back at sm+, where four across fits and the overlap reads right.
          <div
            key={ri}
            className="contents sm:flex sm:w-full sm:justify-between"
          >
            {row.map((pill) => (
              <span
                key={pill.label}
                className={`whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[11px] font-medium shadow-sm sm:px-4 sm:py-2 sm:text-[13px] ${
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
  );
}
