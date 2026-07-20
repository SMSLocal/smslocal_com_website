import { UserPlus, Upload, Rocket, BarChart3, Check, Send } from "lucide-react";
import DropText from "./DropText";
import NightBackdrop from "./NightBackdrop";

const STEPS = [
  {
    icon: UserPlus,
    title: "Sign up free",
    desc: "Account ready in 2 minutes — no credit card required.",
  },
  {
    icon: Upload,
    title: "Import your contacts",
    desc: "Upload a CSV or sync your CRM in seconds.",
  },
  {
    icon: Rocket,
    title: "Send your first campaign",
    desc: "Upload, pick a template, and launch in seconds.",
  },
  {
    icon: BarChart3,
    title: "Measure & optimise",
    desc: "Live delivery, clicks and carrier-level breakdown.",
  },
];

const SCENE_META = [
  { icon: UserPlus, title: "Sign up free" },
  { icon: Upload, title: "Import your contacts" },
  { icon: Rocket, title: "Send first campaign" },
  { icon: BarChart3, title: "Measure & optimise" },
];

const WAVE_COUNT = 20;

function waveColor(t: number) {
  const a = [21, 73, 137];
  const b = [255, 61, 138];
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function Pill({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "accent";
}) {
  const cls =
    tone === "accent"
      ? "bg-accent/15 text-accent"
      : "bg-white/10 text-white/75 backdrop-blur";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium ${cls}`}
    >
      {children}
    </span>
  );
}

function SceneBody({ id }: { id: number }) {
  if (id === 0) {
    return (
      <div className="mt-5 flex flex-col items-center gap-2">
        <Pill>
          you@company.com
          <span className="animate-blink font-semibold text-primary">|</span>
        </Pill>
        <Pill tone="accent">
          <Check className="h-3 w-3" strokeWidth={3} /> Free trial credit added
        </Pill>
      </div>
    );
  }

  if (id === 1) {
    return (
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {["CSV uploaded", "CRM synced", "Groups created"].map(
          (t, i) => (
            <span
              key={t}
              className="animate-float-slow"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <Pill tone="accent">
                <Check className="h-3 w-3" strokeWidth={3} /> {t}
              </Pill>
            </span>
          ),
        )}
      </div>
    );
  }

  if (id === 2) {
    return (
      <div className="mt-5 flex flex-col items-center gap-2.5">
        <Pill>
          <Send className="h-3 w-3" /> Sending to 2,418 recipients
        </Pill>
        <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div className="animate-send-progress h-full rounded-full bg-gradient-brand" />
        </div>
        <Pill tone="accent">
          <Check className="h-3 w-3" strokeWidth={3} /> campaign launched
        </Pill>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <div className="flex h-12 items-end gap-[3px]">
        {Array.from({ length: WAVE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="animate-wave-bar h-full w-1.5 rounded-full"
            style={{
              backgroundColor: waveColor(i / (WAVE_COUNT - 1)),
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
      <Pill tone="accent">
        <Check className="h-3 w-3" strokeWidth={3} /> 98.4% delivered
      </Pill>
    </div>
  );
}

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0f172a] px-6 py-12 shadow-2xl shadow-[#154989]/20 sm:px-10 lg:px-14 lg:py-16">
        <NightBackdrop />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT — floating live step scenes, no box */}
          <div className="relative flex min-h-[400px] items-center justify-center">
            {/* pulsing core glow */}
            <div className="pointer-events-none absolute h-64 w-64 opacity-30">
              <div className="animate-pulse-soft h-full w-full rounded-full bg-gradient-brand blur-3xl" />
            </div>

            {/* orbiting dashed rings */}
            <div className="animate-spin-slow pointer-events-none absolute h-[25rem] w-[25rem]">
              <div className="absolute inset-0 rounded-full border border-dashed border-white/30" />
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/50" />
            </div>
            <div className="animate-spin-slow-rev pointer-events-none absolute h-72 w-72">
              <div className="absolute inset-0 rounded-full border border-dashed border-white/20" />
              <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-secondary shadow-lg shadow-secondary/50" />
            </div>

            {/* scenes cross-fading one by one */}
            {SCENE_META.map(({ icon: Icon, title }, i) => (
              <div
                key={title}
                className="animate-scene absolute inset-0 flex flex-col items-center justify-center text-center"
                style={{ animationDelay: `${i * 3}s` }}
              >
                {/* glowing gradient icon */}
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-brand opacity-70 blur-2xl" />
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-brand text-white shadow-2xl shadow-primary/40">
                    <Icon className="h-9 w-9" strokeWidth={1.75} />
                  </span>
                </div>

                <p className="mt-6 text-2xl font-semibold text-white">{title}</p>

                <SceneBody id={i} />
              </div>
            ))}
          </div>

          {/* RIGHT — heading + step points + CTA */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Get Started
            </p>
            <DropText
              as="h2"
              className="mt-4 text-3xl font-medium leading-tight text-white sm:text-4xl"
              segments={[
                { text: "It's Easy To" },
                { text: "Get Started", className: "text-gradient-brand" },
              ]}
            />
            <p className="mt-4 max-w-md text-white/60">
              From sign-up to your first delivered campaign, SMSLocal gets you
              live in minutes — secure and fully compliant.
            </p>

            <div className="mt-8 space-y-5">
              {STEPS.map(({ title, desc }, i) => (
                <div
                  key={title}
                  className={i > 0 ? "border-t border-white/10 pt-5" : ""}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    <p className="font-semibold text-white">{title}</p>
                  </div>
                  <p className="mt-1 text-sm text-white/55">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
