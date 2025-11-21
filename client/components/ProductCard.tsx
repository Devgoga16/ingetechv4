interface ProductCardProps {
  image: string;
  title: string;
  description?: string;
}

export function ProductCard({ image, title, description }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full aspect-square overflow-hidden rounded-lg bg-muted">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-center text-xs font-bold text-foreground uppercase">
        {title}
      </h3>
      {description && (
        <p className="text-center text-xs text-foreground/70">{description}</p>
      )}
    </div>
  );
}
