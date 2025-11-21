import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
}

export function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-primary text-5xl">{icon}</div>
      <p className="text-center text-xs font-bold text-foreground uppercase">
        {title}
      </p>
    </div>
  );
}
