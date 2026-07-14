import { type LucideIcon, Sparkles } from "lucide-react";

export default function SectionHeading({
  icon: Icon = Sparkles,
  badge,
  title,
  highlight,
  description,
  align = "center",
}: {
  icon?: LucideIcon;
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
}) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "";

  return (
    <div className={wrap}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark shadow-sm">
        <Icon className="h-3.5 w-3.5" />
        {badge}
      </span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title} {highlight && <span className="text-gradient-brand">{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
