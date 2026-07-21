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
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          SMS Powerhouse
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Powered by carrier-grade delivery, optimized for blazing speed,
          privacy-first design, and reliable global reach.
        </p>
      </div>

      <div className="mt-auto flex w-full flex-col -space-y-2 pt-8">
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
  );
}
