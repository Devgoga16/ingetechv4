export function LogosCarousel() {
  const logos = [
    {
      name: "Desarrollos Inmobiliarios",
      image:
        "https://images.pexels.com/photos/6342786/pexels-photo-6342786.jpeg",
    },
    {
      name: "Centro Comercial",
      image:
        "https://images.pexels.com/photos/291539/pexels-photo-291539.jpeg",
    },
    {
      name: "Torre Financiera",
      image:
        "https://images.pexels.com/photos/9279740/pexels-photo-9279740.jpeg",
    },
    {
      name: "Industria & Logística",
      image:
        "https://images.pexels.com/photos/11284324/pexels-photo-11284324.jpeg",
    },
    {
      name: "Grupo Empresarial",
      image:
        "https://images.pexels.com/photos/6317765/pexels-photo-6317765.jpeg",
    },
    {
      name: "Cadena Hospitalaria",
      image:
        "https://images.pexels.com/photos/6320167/pexels-photo-6320167.jpeg",
    },
  ];

  // Duplicate logos for seamless loop
  const repeatedLogos = [...logos, ...logos];

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">
            Nuestros Clientes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Empresas que confían en nosotros
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Carousel wrapper */}
          <div className="overflow-hidden">
            <div className="flex gap-8 md:gap-12 animate-scroll">
              {repeatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-110"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-muted rounded-xl overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-muted/30 hover:border-primary/50">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center text-xs font-semibold text-foreground/70 mt-3 group-hover:text-primary transition-colors duration-300">
                    {logo.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
