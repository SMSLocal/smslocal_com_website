"use client";

import { useState } from "react";
import { MessageCircleQuestion, Plus, Minus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "What features does SMSLocal offer for business communication?",
    a: "SMSLocal offers bulk SMS, two-way messaging, campaign automation, contact management, a helpdesk, and detailed reporting — all from one dashboard, no coding required.",
  },
  {
    q: "How can SMSLocal help me run SMS marketing campaigns?",
    a: "Build, schedule, and send targeted SMS campaigns in minutes with our drag-and-drop campaign builder, then track opens, clicks, and conversions in real time.",
  },
  {
    q: "Can I send bulk SMS with SMSLocal?",
    a: "Yes. Upload a contact list or connect your CRM, personalize your message, and send to thousands of recipients instantly with delivery tracking.",
  },
  {
    q: "Is it possible to integrate SMSLocal with other business apps?",
    a: "SMSLocal offers a robust REST API and pre-built integrations so you can connect your CRM, e-commerce platform, or marketing stack for a unified workflow.",
  },
  {
    q: "How does SMSLocal help with team communication?",
    a: "Use SMSLocal for shift reminders, urgent updates, and internal announcements — keeping your whole team informed without relying on phone calls.",
  },
  {
    q: "How secure is SMSLocal's messaging service?",
    a: "All messages are transmitted over encrypted connections, and your account data is protected with industry-standard security practices and compliance controls.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        badge="Answers To Your Questions"
        title="Get Clear Answers On"
        highlight="Bulk SMS"
        description="Explore answers about features, integrations, pricing, and getting started with SMSLocal."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Tinted, not near-white: the page behind this sits at 248,250,252,
            so a muted fill composited to within ~2 per channel of it and the
            card vanished. This carries a real lavender→pink wash.
            Revealed as one unit — it's a single visual block, so staggering
            its innards would fight the list's stagger beside it. */}
        <Reveal className="hidden lg:block">
          <div
            className="relative flex h-full overflow-hidden rounded-3xl border border-brand-start/20 p-8 flex-col justify-between"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(79,91,213,0.16), rgba(236,72,153,0.11))",
            }}
          >
            {/* The dot grid is dark ink, so on a light card it carries at full
              strength — it was dialled down to 20% only to survive the
              gradient it used to sit on. */}
            <div className="bg-dot-grid mask-radial-fade pointer-events-none absolute inset-0 opacity-70" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-start shadow-sm">
              <MessageCircleQuestion className="h-6 w-6" />
            </span>
            <div className="relative">
              <p className="text-2xl leading-snug font-semibold text-heading">
                Still have questions about SMSLocal?
              </p>
              {/* Darker than muted-foreground: the tinted card lifts the
                background luminance, which drops muted text under AA. */}
              <p className="mt-3 text-sm text-foreground/70">
                Our support team responds within minutes — every day of the
                week.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-start/25 transition hover:shadow-xl hover:shadow-brand-start/35"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Reveal>

        <div className="space-y-3">
          {/* Each row fades up on its own, 70ms apart, so the list assembles
              top-to-bottom instead of appearing all at once. */}
          {FAQS.map(({ q, a }, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={q} delay={i * 70}>
                <div
                  className={
                    open
                      ? "rounded-2xl border border-primary/30 bg-muted/60 px-6 py-5"
                      : "rounded-2xl border border-border bg-white px-6 py-5"
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 text-left font-medium text-foreground"
                  >
                    {q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary">
                      {open ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                  {open && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {a}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
