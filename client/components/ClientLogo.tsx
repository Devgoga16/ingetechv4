import { useState } from "react";
import type { Client } from "@/data/clients";

interface ClientLogoProps {
  client: Client;
}

/**
 * A client's logo, with the name set as a wordmark when there is no image.
 *
 * Two cases fall back to text: no `logo` in the data at all, and a `logo` whose
 * file fails to load. Rendering an <img> in either case would leave the browser
 * showing its broken-image icon, which is worse than no logo.
 *
 * The wordmark is deliberately heavier and tighter than body copy: sitting in a
 * row of real logos, ordinary text reads as a gap rather than as an entry.
 */
export function ClientLogo({ client }: ClientLogoProps) {
  const [failed, setFailed] = useState(false);

  if (!client.logo || failed) {
    return (
      <span className="flex max-w-[10rem] flex-col items-center gap-1.5 text-center">
        <span className="text-balance text-sm font-black uppercase leading-[1.15] tracking-tight text-ink-800">
          {client.name}
        </span>
        <span
          aria-hidden="true"
          className="h-0.5 w-6 rounded-full bg-primary/70"
        />
      </span>
    );
  }

  return (
    <img
      src={client.logo}
      alt={client.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="max-h-10 w-auto max-w-[8rem] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
    />
  );
}
