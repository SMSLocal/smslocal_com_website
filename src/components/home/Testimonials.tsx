import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "SMSLocal has truly transformed the way we connect with our customers. From running SMS marketing campaigns to sending appointment reminders, the platform is incredibly easy to use.",
    name: "John Miller",
    role: "Marketing Manager",
  },
  {
    quote:
      "We've been using SMSLocal to communicate with our customers, and it's been a game changer. The two-way messaging feature allows us to provide instant support and build better relationships.",
    name: "Sarah Cooper",
    role: "Customer Support Specialist",
  },
  {
    quote:
      "SMSLocal has made communication within our team so much smoother. Whether it's shift reminders or urgent updates, it's super convenient to send quick messages.",
    name: "Emily Rodriguez",
    role: "Operations Assistant",
  },
  {
    quote:
      "I love how simple it is to integrate SMS messaging into our sales process. Whether we're sending quick updates or following up with leads, SMSLocal makes it easy and efficient.",
    name: "David Lee",
    role: "Sales Coordinator",
  },
];

const HIGHLIGHTS = [
  { value: "12M+", label: "SMS delivered by teams using SMSLocal monthly." },
  {
    value: "98%",
    label: "Of customers report faster response times with SMSLocal.",
  },
  {
    value: "70%",
    label: "Of support tickets resolved directly over SMS conversations.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          badge="Experience Their Journey"
          title="Why Teams Rely On"
          highlight="SMSLocal"
          description="From solo founders to support teams, businesses trust SMSLocal to keep every conversation moving."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-row gap-4 lg:flex-col">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.value}
                className="flex-1 rounded-2xl border border-border bg-white p-6"
              >
                <p className="text-3xl font-semibold">
                  <span className="text-primary">{item.value.slice(0, -1)}</span>
                  <span className="text-secondary">{item.value.slice(-1)}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map(({ quote, name, role }) => (
              <div
                key={name}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <Quote className="h-6 w-6 text-primary/40" />
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
