import { Sparkles } from "lucide-react";
import DropText from "./DropText";

export default function SectionHeading({
  icon: Icon = Sparkles,
  badge,
  title,
  highlight,
  description,
  align = "center",
}) {
  const wrap = align === "center" ? "mx-auto max-w-2xl text-center" : "";

  return (
    <div className={wrap}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark shadow-sm">
        <Icon className="h-3.5 w-3.5" />
        {badge}
      </span>
      <DropText
        as="h2"
        className="mt-4 text-[1.8rem] font-semibold tracking-tight text-heading sm:text-4xl"
        segments={
          highlight
            ? [
                { text: title },
                { text: highlight, className: "grad-word" },
              ]
            : [{ text: title }]
        }
      />
      {description && (
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
