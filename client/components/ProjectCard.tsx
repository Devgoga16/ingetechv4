import { Images, Maximize2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const count = project.images.length;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${project.name} — ver ${count} ${count === 1 ? "foto" : "fotos"}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white text-left shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-surface-muted">
        <img
          src={project.images[0]}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {project.location && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-800 backdrop-blur-sm">
            {project.location}
          </span>
        )}

        {count > 1 && (
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-ink-900/70 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            <Images size={13} />
            {count}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
          {project.name}
        </h3>

        {project.description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/65">
            {project.description}
          </p>
        )}

        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          {count === 1 ? "Ver foto" : "Ver fotos"}
          <Maximize2
            size={14}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </span>
      </div>
    </button>
  );
}
