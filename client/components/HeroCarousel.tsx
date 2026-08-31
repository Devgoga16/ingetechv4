import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  images: string[];
  titles: string[];
  eyebrow?: string;
  buttonText: string;
  onButtonClick?: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
}

const SLIDE_DURATION = 6000;

export function HeroCarousel({
  images,
  titles,
  eyebrow,
  buttonText,
  onButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex((index + images.length) % images.length);
    },
    [images.length],
  );

  const goToPrev = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide],
  );
  const goToNext = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide],
  );

  /* Autoplay, paused on hover/focus, when the tab is hidden, or when the
     visitor has asked for reduced motion. */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (paused || prefersReducedMotion || images.length <= 1) return;

    const timer = setInterval(() => {
      if (document.hidden) return;
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [paused, images.length]);

  /* Arrow keys move between slides while the hero has focus. */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[36rem] items-center overflow-hidden bg-ink-900 md:min-h-[42rem] lg:min-h-[min(88svh,48rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      aria-roledescription="carrusel"
      aria-label="Presentación de INGETECH"
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-10">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              index === currentIndex ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={index !== currentIndex}
          >
            <img
              src={image}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              // @ts-expect-error fetchpriority is valid HTML, not yet in React 18 types
              fetchpriority={index === 0 ? "high" : "low"}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Scrim. On phones the copy spans the full width, so it needs a flat
            veil; from md up the gradient leans left and lets the photo breathe. */}
        <div className="absolute inset-0 bg-ink-900/70 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink-900/92 via-ink-900/70 to-ink-900/35 md:block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900/80 to-transparent" />
      </div>

      {/* Copy */}
      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
          )}

          {/* The three headlines are different lengths; without a reserved
              height the buttons below would jump on every slide change. */}
          <h1
            aria-live="polite"
            className="min-h-[6.5rem] text-balance text-3xl font-extrabold leading-[1.1] text-white sm:min-h-[10rem] sm:text-5xl lg:min-h-[12.5rem] lg:text-6xl"
          >
            {titles[currentIndex]}
          </h1>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onButtonClick}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-brand-glow transition-all hover:bg-brand-600"
            >
              {buttonText}
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                onClick={onSecondaryButtonClick}
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/15"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 pb-8 sm:px-6 lg:px-8">
          {/* Progress indicators */}
          <div className="flex items-center gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Ir a la diapositiva ${index + 1}`}
                aria-current={index === currentIndex}
                className="group flex h-11 items-center px-1"
              >
                <span
                  className={cn(
                    "block h-1 rounded-full transition-all duration-500",
                    index === currentIndex
                      ? "w-12 bg-primary"
                      : "w-6 bg-white/40 group-hover:bg-white/70",
                  )}
                />
              </button>
            ))}
            <span className="ml-2 text-xs font-semibold tabular-nums text-white/60">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="mx-1 text-white/30">/</span>
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          {/* Arrows — desktop only; mobile users swipe past them anyway and
              they crowd the CTA on small screens. */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={goToPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/60 hover:bg-white/15"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/60 hover:bg-white/15"
              aria-label="Diapositiva siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
