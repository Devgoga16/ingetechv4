import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectLightboxProps {
  project: Project;
  /** Index of the photo to open on */
  startIndex?: number;
  onClose: () => void;
}

export function ProjectLightbox({
  project,
  startIndex = 0,
  onClose,
}: ProjectLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = project.images.length;
  const hasMultiple = total > 1;

  const go = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total],
  );

  /* Lock the page behind the overlay. */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  /* Move focus in on open and hand it back to the page on close. */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  /* Keyboard: Escape closes, arrows navigate, Tab stays inside the dialog. */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (hasMultiple && e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => (i - 1 + total) % total);
        return;
      }

      if (hasMultiple && e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i + 1) % total);
        return;
      }

      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasMultiple, total, onClose]);

  /* Warm the neighbouring photos so stepping through feels instant. */
  useEffect(() => {
    if (!hasMultiple) return;
    [(index + 1) % total, (index - 1 + total) % total].forEach((i) => {
      const img = new Image();
      img.src = project.images[i];
    });
  }, [index, total, hasMultiple, project.images]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? index + 1 : index - 1);
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-ink-900/[0.97] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos de ${project.name}`}
      ref={dialogRef}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0 max-w-2xl">
          <p className="truncate text-sm font-bold text-white sm:text-base">
            {project.name}
          </p>
          {project.location && (
            <p className="mt-0.5 truncate text-xs text-white/50">
              {project.location}
            </p>
          )}
          {project.description && (
            <p className="mt-2 hidden text-xs leading-relaxed text-white/60 sm:block">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {hasMultiple && (
            <span className="text-xs font-semibold tabular-nums text-white/60">
              {index + 1}
              <span className="mx-1 text-white/30">/</span>
              {total}
            </span>
          )}
          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Stage. The backdrop closes on click; the photo itself does not. */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-6"
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={project.images[index]}
          src={project.images[index]}
          alt={`${project.name} — foto ${index + 1} de ${total}`}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(index - 1);
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink-900/60 text-white transition-colors hover:border-white/60 hover:bg-ink-900/90 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(index + 1);
              }}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink-900/60 text-white transition-colors hover:border-white/60 hover:bg-ink-900/90 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="shrink-0 overflow-x-auto px-4 pb-6 sm:px-6">
          <div className="mx-auto flex w-fit gap-2">
            {project.images.map((image, i) => (
              <button
                key={image + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                  i === index
                    ? "border-primary"
                    : "border-transparent opacity-50 hover:opacity-100",
                )}
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
