import type { Video } from "@/data/videos";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  /** Position in the gallery, used only for the accessible name */
  index: number;
}

export function VideoCard({ video, index }: VideoCardProps) {
  const isPortrait = video.orientation === "portrait";

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
      {/*
        Native controls, no autoplay: nothing moves until the visitor asks.
        `preload="metadata"` fetches only the header, so the page stays light
        while the browser can still show the first frame and the duration.
      */}
      <video
        className={cn("w-full", isPortrait ? "aspect-[9/16]" : "aspect-video")}
        controls
        preload="metadata"
        playsInline
        aria-label={`Vídeo ${index + 1}`}
      >
        <source src={video.src} type="video/mp4" />
        Tu navegador no puede reproducir este vídeo.{" "}
        <a href={video.src} className="underline">
          Descárgalo aquí
        </a>
        .
      </video>
    </div>
  );
}
