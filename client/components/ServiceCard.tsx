import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
}

export function ServiceCard({ icon, title }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 border border-muted rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="text-primary text-5xl">{icon}</div>
      <h3 className="text-center text-sm font-bold text-foreground uppercase">
        {title}
      </h3>
    </div>
  );
}
