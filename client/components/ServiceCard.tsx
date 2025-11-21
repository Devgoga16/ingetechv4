import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
}

export function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div className="group relative h-full">
      {/* Background blur effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />

      {/* Main card */}
      <div className="relative h-full flex flex-col items-center gap-6 p-8 rounded-2xl bg-white overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent" />

        {/* Icon container with background */}
        <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-500">
          <div className="text-primary text-5xl group-hover:scale-125 transition-transform duration-500 group-hover:drop-shadow-xl">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-center text-sm font-bold text-foreground uppercase tracking-wider leading-snug px-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Animated bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent group-hover:translate-x-full" style={{animation: 'none'}} />
      </div>
    </div>
  );
}
