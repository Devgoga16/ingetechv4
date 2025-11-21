import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
}

export function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col items-center gap-4 p-8 rounded-xl bg-white border border-muted/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      {/* Gradient background on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className="relative text-primary text-6xl group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-lg">
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative text-center text-sm font-semibold text-foreground uppercase tracking-wide leading-tight px-2">
        {title}
      </h3>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
