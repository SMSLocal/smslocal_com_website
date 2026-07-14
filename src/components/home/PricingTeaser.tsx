import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";

const PLANS = [
  {
    name: "Starter",
    price: "$15",
    description: "Perfect for individuals or small teams",
    features: [
      "1,000 SMS credits / month",
      "Unlimited contacts & groups",
      "Basic campaign scheduling",
      "Delivery reports",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$49",
    description: "Perfect for growing businesses",
    features: [
      "10,000 SMS credits / month",
      "Two-way messaging inbox",
      "Automation & drip campaigns",
      "Country-specific SMS routing",
      "Priority support",
      "API & integrations access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Perfect for high-volume senders",
    features: [
      "Custom SMS volume & pricing",
      "Dedicated account manager",
      "Advanced compliance tools",
      "Custom integrations",
      "24/7 priority support",
      "SLA-backed uptime",
    ],
    popular: false,
  },
];

export default function PricingTeaser() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        badge="Affordable Plans"
        title="Choose The Plan"
        highlight="That Fits You"
        description="Transparent, flexible pricing designed for freelancers, growing businesses, and high-volume senders — no hidden costs."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.popular
                ? "relative rounded-2xl border-2 border-primary bg-white p-8 shadow-xl shadow-primary/10 lg:-translate-y-3"
                : "rounded-2xl border border-border bg-white p-8"
            }
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary-dark">
                {plan.name}
              </span>
              {plan.popular && (
                <span className="rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {plan.description}
            </p>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-semibold text-foreground">
                {plan.price}
              </span>
              {plan.price !== "Custom" && (
                <span className="text-sm text-muted-foreground">/month</span>
              )}
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground">
                Features include:
              </p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {plan.popular ? (
              <a
                href="#signup"
                className="mt-8 block rounded-full bg-gradient-brand px-6 py-3 text-center text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:opacity-90"
              >
                Choose This Plan
              </a>
            ) : (
              <a
                href="#signup"
                className="mt-8 block rounded-full border-2 border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Choose This Plan
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Create free trial account · No credit card required
      </p>
    </section>
  );
}
