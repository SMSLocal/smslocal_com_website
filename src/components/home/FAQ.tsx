"use client";

import { useState } from "react";
import { MessageCircleQuestion, Plus, Minus } from "lucide-react";
import SectionHeading from "./SectionHeading";

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
        <div className="relative hidden overflow-hidden rounded-3xl bg-gradient-brand p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="bg-dot-grid mask-radial-fade pointer-events-none absolute inset-0 opacity-20" />
          <MessageCircleQuestion className="h-10 w-10" />
          <div className="relative">
            <p className="text-2xl font-semibold leading-snug">
              Still have questions about SMSLocal?
            </p>
            <p className="mt-3 text-sm text-white/80">
              Our support team responds within minutes — every day of the
              week.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary-dark transition hover:bg-muted"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => {
            const open = openIndex === i;
            return (
              <div
                key={q}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
