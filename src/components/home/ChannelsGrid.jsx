import { Link } from "react-router-dom";
import { ArrowUpRight, Hash, Mail, MessageCircle, MessageSquareText, Phone, Smartphone, Layers } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const CHANNELS = [
  { icon: MessageSquareText, name: "SMS", text: "Bulk campaigns, alerts and promotions, sent in seconds.", href: "/products/channels/sms-broadcasting/", tint: "bg-indigo-50 text-indigo-600" },
  { icon: MessageCircle, name: "WhatsApp", text: "Reach customers on the app they already use every day.", href: "/products/channels/whatsapp/", tint: "bg-emerald-50 text-emerald-600" },
  { icon: Smartphone, name: "RCS", text: "Rich, branded messages that go beyond plain text.", href: "/products/channels/rcs/", tint: "bg-sky-50 text-sky-600" },
  { icon: Phone, name: "Voice", text: "Programmable calls alongside your messages.", href: "/products/channels/voice/", tint: "bg-rose-50 text-rose-600" },
  { icon: Mail, name: "Email", text: "Transactional and bulk email, combined with SMS in one API.", href: "/products/channels/email/", tint: "bg-amber-50 text-amber-600" },
  { icon: Hash, name: "Virtual numbers", text: "Local, national, toll-free and mobile numbers in 100+ countries.", href: "/products/channels/did/", tint: "bg-violet-50 text-violet-600" },
];

export default function ChannelsGrid() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          icon={Layers}
          badge="One Platform"
          title="Every channel, from"
          highlight="one account"
          description="Start with SMS and add WhatsApp, RCS, voice, email and numbers whenever you need them, all on the same platform."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <Link
                to={c.href}
                className="group flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[0.08]"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.tint}`}>
                  <c.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-heading">{c.name}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-slate-600">{c.text}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">
                  Explore
                  <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
