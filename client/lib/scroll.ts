/**
 * Smoothly scrolls an anchored section into view.
 *
 * Sections declare `scroll-margin-top` in global.css, so the sticky header is
 * accounted for without hard-coding a pixel offset at every call site.
 */
export function scrollToId(id: string) {
  const target = document.querySelector(id.startsWith("#") ? id : `#${id}`);
  if (!target) return false;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  return true;
}
