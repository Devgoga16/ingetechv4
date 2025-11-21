import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import {
  Building2,
  Wrench,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle2,
  Award,
  Building,
  Handshake,
  Eye,
  Users,
} from "lucide-react";

export default function Index() {
  const services = [
    {
      icon: <Building2 size={48} />,
      title: "Ascensores Equipos Nuevos",
    },
    {
      icon: <Wrench size={48} />,
      title: "Modernización de Ascensores",
    },
    {
      icon: <Shield size={48} />,
      title: "Equipos de Accesibilidad",
    },
    {
      icon: <Zap size={48} />,
      title: "Servicio de Mantenimiento",
    },
    {
      icon: <TrendingUp size={48} />,
      title: "Venta de Repuestos",
    },
  ];

  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop",
      title: "Ascensores Residenciales, Comerciales y de Oficinas",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1565733833556-8b6efb616050?w=400&h=400&fit=crop",
      title: "Montacargas (Isolo Carga y Carga Acompañada)",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
      title: "Escaleras, Rampas y Pasarelas Mecánicas",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503387762519-52582b1d6aa3?w=400&h=400&fit=crop",
      title: "Salida Alturas y Salva Escaleras",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1485579149c01123123?w=400&h=400&fit=crop",
      title: "Monta Vehículos Hidráulicos",
      description: "",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3af3abd8?w=400&h=400&fit=crop",
      title: "Salas Técnicas",
      description: "",
    },
  ];

  const brands = [
    {
      name: "XIZI",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop",
    },
    {
      name: "MP",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop",
    },
    {
      name: "HIDAL",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop",
    },
  ];

  const features = [
    { icon: <CheckCircle2 size={48} />, title: "Seguridad" },
    { icon: <Award size={48} />, title: "Calidad" },
    { icon: <Building size={48} />, title: "Innovación" },
    { icon: <Handshake size={48} />, title: "Compromiso" },
    { icon: <Eye size={48} />, title: "Transparencia" },
    { icon: <Users size={48} />, title: "Trabajo en Equipo" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-foreground/80 to-foreground/60 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
          alt="Elevadores"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            ELEVAMOS TU COMODIDAD,<br />
            OPTIMIZAMOS TUS ESPACIOS.
          </h1>
          <button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded font-bold text-sm transition-colors">
            VER CATALOGO
          </button>
        </div>
      </section>

      {/* TE OFRECEMOS Section */}
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-secondary mb-12">
            TE OFRECEMOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NUESTROS PRODUCTOS Section */}
      <section className="py-16 md:py-24 bg-muted px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-secondary mb-3">
            NUESTROS PRODUCTOS
          </h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
            Donde la excelencia y la funcionalidad se encuentran en cada nivel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* REPRESENTANTES Y DISTRIBUIDOR DE Section */}
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-secondary mb-12">
            REPRESENTANTES Y DISTRIBUIDOR DE:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-white rounded-lg p-6 text-center border border-muted">
                  <p className="font-bold text-lg text-secondary">{brand.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Company section */}
          <div className="bg-muted rounded-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1565733833556-8b6efb616050?w=400&h=300&fit=crop"
                  alt="EPJ"
                  className="rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  EMPRESAS PERUANAS DE ELEVACIÓN
                </h3>
                <p className="text-foreground/80 text-sm mb-4">
                  Empresa Peruana de Equipos Verticales Elevación y Equipos
                  Verticales, S.A.C. Somos especialistas en transporte vertical,
                  ofreciendo equipos modernos, seguros y confortables que garantizan
                  confiabilidad en cada proyecto
                </p>
                <p className="text-foreground/80 text-sm mb-6">
                  Con amplia experiencia, nos enfocamos en la venta, instalación,
                  modernización y mantenimiento de ascensores, montacargas, escaleras
                  mecánicas, salva escaleras y monta vehículos.
                </p>
                <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded font-bold text-sm w-fit transition-colors">
                  CONOCE MAS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿POR QUE ELEGIRNOS? Section */}
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-secondary mb-12">
            ¿POR QUE ELEGIRNOS?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
              />
            ))}
          </div>
          <div className="text-center bg-muted rounded-lg p-8">
            <p className="text-secondary font-bold text-sm mb-6 italic max-w-3xl mx-auto">
              "TU SOCIO ESTRATEGICO PARA PROYECTOS QUE BUSCAN CALIDAD, INNOVACION Y
              RESPALDO EN CADA ETAPA."
            </p>
            <button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-2 rounded font-bold text-sm transition-colors">
              CUENTANOS TU PROYECTO
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
