import { ArrowRight, Sparkles } from "lucide-react";
import DropText from "./DropText";
import NightBackdrop from "./NightBackdrop";
import Reveal from "./Reveal";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#0f172a]">
      <NightBackdrop />

      {/* Brand glow pooled behind the headline — this is the page's only dark
          block, so it carries the closing emphasis on its own rather than
          relying on scattered floating chips. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(42% 55% at 50% 0%, rgba(79,91,213,0.35), transparent 70%), radial-gradient(38% 50% at 50% 100%, rgba(236,72,153,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          {/* The heading animates itself, word by word, via DropText — the
              badge leads it in and the copy and buttons follow, so the stagger
              reads as one entrance rather than four separate ones. */}
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Get Started
            </span>
          </Reveal>

          <DropText
            as="h2"
            className="mt-6 text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl"
            segments={[
              { text: "Join thousands of businesses" },
              { br: true },
              { text: "building with SMSLocal" },
            ]}
          />

          <Reveal delay={320}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              One platform. Endless communication possibilities. Start today —
              it&apos;s free.
            </p>
          </Reveal>

          <Reveal
            delay={460}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <a
              href="#signup"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Create Free Trial Account
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              Book a demo
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
