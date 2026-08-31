import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Solution } from "@/data/solutions";

interface SolutionCardProps {
  solution: Solution;
  /** Skip lazy-loading for the cards that are likely above the fold */
  eager?: boolean;
  /**
   * Open the detail page in a new tab. Used only by the landing grid, so the
   * visitor keeps the home page open while exploring. Everywhere else (menu,
   * footer, cross-sell) navigates in place, which keeps the back button useful.
   */
  newTab?: boolean;
}

export function SolutionCard({
  solution,
  eager = false,
  newTab = false,
}: SolutionCardProps) {
  const Icon = solution.icon;

  return (
    <Link
      to={`/soluciones/${solution.slug}`}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        <img
          src={solution.image}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />

        {/* Category chip */}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-800 backdrop-blur-sm">
          {solution.category}
        </span>

        {/* Icon badge straddling the image edge */}
        <div className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-brand-glow transition-transform duration-500 group-hover:scale-110">
          <Icon size={22} strokeWidth={2.2} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-10">
        <h3 className="text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
          {solution.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/65">
          {solution.summary}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          Ver solución
          {newTab ? (
            <>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </>
          ) : (
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </span>
      </div>
    </Link>
  );
}
