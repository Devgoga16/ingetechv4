import { Layout } from "@/components/Layout";
import { LogosCarousel } from "@/components/LogosCarousel";
import { Building2, Store, Zap, Home, Briefcase } from "lucide-react";

export default function Clients() {
  const clients = [
    {
      name: "Desarrollos Inmobiliarios Premium",
      category: "Residencial",
      icon: Home,
      description: "Proyectos de viviendas de alta gama en Lima metropolitana",
      image:
        "https://images.pexels.com/photos/5691494/pexels-photo-5691494.jpeg",
      logo: "https://images.pexels.com/photos/6342786/pexels-photo-6342786.jpeg",
    },
    {
      name: "Centro Comercial Metropolitano",
      category: "Comercial",
      icon: Store,
      description: "Centros de compras y espacios retail de gran envergadura",
      image:
        "https://images.pexels.com/photos/2861656/pexels-photo-2861656.jpeg",
      logo: "https://images.pexels.com/photos/291539/pexels-photo-291539.jpeg",
    },
    {
      name: "Torre Financiera Internacional",
      category: "Corporativo",
      icon: Building2,
      description: "Edificios de oficinas y corporativos en zonas Premium",
      image: "https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg",
      logo: "https://images.pexels.com/photos/9279740/pexels-photo-9279740.jpeg",
    },
    {
      name: "Industria & Logística S.A.",
      category: "Industrial",
      icon: Zap,
      description: "Almacenes, centros de distribución y plantas industriales",
      image: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
      logo: "https://images.pexels.com/photos/11284324/pexels-photo-11284324.jpeg",
    },
    {
      name: "Grupo Empresarial Andino",
      category: "Mixto",
      icon: Briefcase,
      description:
        "Proyectos multidisciplinarios y mixtos en diferentes regiones",
      image: "https://images.pexels.com/photos/448828/pexels-photo-448828.jpeg",
      logo: "https://images.pexels.com/photos/6317765/pexels-photo-6317765.jpeg",
    },
    {
      name: "Cadena Hospitalaria Nacional",
      category: "Salud",
      icon: Building2,
      description: "Hospitales, clínicas y centros médicos especializados",
      image:
        "https://images.pexels.com/photos/19921278/pexels-photo-19921278.jpeg",
      logo: "https://images.pexels.com/photos/6320167/pexels-photo-6320167.jpeg",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/75 to-black/60 -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-start">
            {/* Decorative line and label */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
              <div className="h-1 w-10 sm:w-12 bg-gradient-to-r from-primary to-primary/40 rounded-full" />
              <span
                className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary drop-shadow-lg"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                Nuestros Asociados
              </span>
            </div>

            {/* Main title */}
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight max-w-3xl drop-shadow-2xl"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}
            >
              Empresas que confían en nosotros
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg md:text-xl text-white max-w-2xl leading-relaxed drop-shadow-lg"
              style={{ textShadow: "0 3px 8px rgba(0,0,0,0.5)" }}
            >
              Desde proyectos residenciales hasta complejos industriales,
              nuestras soluciones de elevación y movilidad son elegidas por
              empresas líderes en toda la región.
            </p>
          </div>
        </div>
      </section>

      {/* Logos Carousel */}
      <LogosCarousel />

      {/* Main Clients Section */}
      <section className="relative py-24 md:py-40 bg-gradient-to-b from-white via-slate-50 to-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">
              Confían en Nosotros
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Empresas que nos respaldan
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Desde proyectos residenciales hasta complejos industriales,
              nuestros sistemas de elevación son la solución elegida por
              empresas líderes
            </p>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => {
              const IconComponent = client.icon;
              return (
                <div key={index} className="group relative h-full">
                  {/* Blur background on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />

                  {/* Card */}
                  <div className="relative h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-muted/30 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    {/* Image background */}
                    <div className="relative h-40 overflow-hidden bg-muted">
                      <img
                        src={client.image}
                        alt={client.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

                      {/* Logo circle - Top right */}
                      <div className="absolute top-3 right-3 w-20 h-20 rounded-full bg-white border-4 border-primary shadow-lg overflow-hidden flex items-center justify-center">
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      {/* Category badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                          {client.category}
                        </span>
                      </div>

                      {/* Title and description */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                          {client.name}
                        </h3>
                        <p className="text-sm text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                          {client.description}
                        </p>
                      </div>

                      {/* Bottom accent */}
                      <div className="mt-4 pt-4 border-t border-muted/20 group-hover:border-primary/30 transition-colors duration-300">
                        <p className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Asociado estratégico ↗
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary/95 to-primary px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold">50+</div>
              <p className="text-lg text-white/90">Clientes Satisfechos</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold">200+</div>
              <p className="text-lg text-white/90">Proyectos Completados</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold">15+</div>
              <p className="text-lg text-white/90">Años de Experiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Listo para asociarte con nosotros?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
            Descubre cómo nuestras soluciones pueden transformar tu proyecto
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
            Solicitar Información
          </button>
        </div>
      </section>
    </Layout>
  );
}
