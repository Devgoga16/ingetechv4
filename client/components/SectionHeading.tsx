import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCentered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
            tone === "dark"
              ? "bg-white/10 text-white/80"
              : "bg-brand-50 text-primary",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "text-balance text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            isCentered && "mx-auto",
            tone === "dark" ? "text-white/70" : "text-foreground/65",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
