import { Layout } from "@/components/Layout";
import { Building2, Store, Zap, Home, Briefcase } from "lucide-react";

export default function Clients() {
  const clients = [
    {
      name: "Desarrollos Inmobiliarios Premium",
      category: "Residencial",
      icon: Home,
      description: "Proyectos de viviendas de alta gama en Lima metropolitana",
    },
    {
      name: "Centro Comercial Metropolitano",
      category: "Comercial",
      icon: ShoppingCenter,
      description: "Centros de compras y espacios retail de gran envergadura",
    },
    {
      name: "Torre Financiera Internacional",
      category: "Corporativo",
      icon: Building2,
      description: "Edificios de oficinas y corporativos en zonas Premium",
    },
    {
      name: "Industria & Logística S.A.",
      category: "Industrial",
      icon: Zap,
      description: "Almacenes, centros de distribución y plantas industriales",
    },
    {
      name: "Grupo Empresarial Andino",
      category: "Mixto",
      icon: Briefcase,
      description: "Proyectos multidisciplinarios y mixtos en diferentes regiones",
    },
    {
      name: "Cadena Hospitalaria Nacional",
      category: "Salud",
      icon: Building2,
      description: "Hospitales, clínicas y centros médicos especializados",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-r from-primary to-primary/80 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Nuestros Clientes
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Empresas líderes confían en nuestras soluciones de elevación y movilidad
            </p>
          </div>
        </div>
      </section>

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
              Desde proyectos residenciales hasta complejos industriales, nuestros sistemas de elevación son la solución elegida por empresas líderes
            </p>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => {
              const IconComponent = client.icon;
              return (
                <div
                  key={index}
                  className="group relative h-full"
                >
                  {/* Blur background on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />

                  {/* Card */}
                  <div className="relative h-full flex flex-col p-8 rounded-2xl bg-white border border-muted/30 group-hover:border-primary/50 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-t-2xl" />

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-500">
                        <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        {client.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                        {client.name}
                      </h3>
                      <p className="text-sm text-foreground/70 group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                        {client.description}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-6 pt-6 border-t border-muted/20 group-hover:border-primary/30 transition-colors duration-300">
                      <p className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Asociado estratégico ↗
                      </p>
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
