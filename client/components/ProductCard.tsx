interface ProductCardProps {
  image: string;
  title: string;
  description?: string;
}

export function ProductCard({ image, title, description }: ProductCardProps) {
  return (
    <div className="group relative h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
      {/* Image container */}
      <div className="relative w-full h-56 overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h3 className="text-center text-sm font-bold text-foreground uppercase tracking-wide leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          {description && (
            <p className="text-center text-xs text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4" />
      </div>
    </div>
  );
}
