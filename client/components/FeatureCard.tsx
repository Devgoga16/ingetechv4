import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
}

export function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-8 text-center transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-white/85">
        {title}
      </p>
    </div>
  );
}
