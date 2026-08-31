import { useEffect, useState } from "react";

/**
 * Tracks which anchored section is currently in view so the navigation can
 * highlight it. Returns the id of the active section (without the leading `#`).
 */
export function useActiveSection(ids: string[], enabled = true) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry closest to the top of the viewport among those visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Band across the upper-middle of the viewport: a section counts as
        // active once its top passes the header and before it scrolls away.
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids.join("|"), enabled]);

  return activeId;
}
