import { Layout } from "@/components/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroCarousel } from "@/components/HeroCarousel";
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
  const heroImages = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565733833556-8b6efb616050?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
  ];

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
        "https://images.pexels.com/photos/16383996/pexels-photo-16383996.jpeg",
      title: "Ascensores Residenciales, Comerciales y de Oficinas",
      description: "Sistemas modernos de elevación para espacios residenciales y comerciales",
    },
    {
      image:
        "https://images.pexels.com/photos/29224552/pexels-photo-29224552.jpeg",
      title: "Montacargas (Isolo Carga y Carga Acompañada)",
      description: "Soluciones robustas para transporte de carga en almacenes e industria",
    },
    {
      image:
        "https://images.pexels.com/photos/3084315/pexels-photo-3084315.jpeg",
      title: "Escaleras, Rampas y Pasarelas Mecánicas",
      description: "Movilidad segura y eficiente en espacios públicos y comerciales",
    },
    {
      image:
        "https://images.pexels.com/photos/1838112/pexels-photo-1838112.jpeg",
      title: "Salida Alturas y Salva Escaleras",
      description: "Accesibilidad y seguridad para personas con movilidad reducida",
    },
    {
      image:
        "https://images.pexels.com/photos/1849115/pexels-photo-1849115.jpeg",
      title: "Monta Vehículos Hidráulicos",
      description: "Sistemas de elevación para estacionamientos y talleres automotrices",
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
      {/* Hero Section with Carousel */}
      <HeroCarousel
        images={heroImages}
        title="ELEVAMOS TU COMODIDAD,
OPTIMIZAMOS TUS ESPACIOS."
        buttonText="VER CATALOGO"
      />

      {/* TE OFRECEMOS Section */}
      <section className="relative py-24 md:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Nuestras soluciones</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Te Ofrecemos
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Servicios innovadores y de clase mundial diseñados para maximizar tu comodidad y optimizar tus espacios
            </p>
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-primary" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-primary" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} icon={service.icon} title={service.title} />
            ))}
          </div>
        </div>
      </section>

      {/* NUESTROS PRODUCTOS Section */}
      <section className="py-16 md:py-24 bg-muted px-4 sm:px-6 lg:px-8 border-t-4 border-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-3">
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
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t-4 border-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-12">
            REPRESENTANTES Y DISTRIBUIDOR DE:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-white rounded-lg p-6 text-center border-2 border-primary hover:shadow-lg transition-shadow">
                  <p className="font-bold text-lg text-primary">{brand.name}</p>
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
                <h3 className="text-2xl font-bold text-primary mb-4">
                  EMPRESAS PERUANAS DE ELEVACIÓN
                </h3>
                <p className="text-foreground/80 text-sm mb-4">
                  Empresa Peruana de Equipos Verticales Elevación y Equipos
                  Verticales, S.A.C. Somos especialistas en transporte vertical,
                  ofreciendo equipos modernos, seguros y confortables que
                  garantizan confiabilidad en cada proyecto
                </p>
                <p className="text-foreground/80 text-sm mb-6">
                  Con amplia experiencia, nos enfocamos en la venta,
                  instalación, modernización y mantenimiento de ascensores,
                  montacargas, escaleras mecánicas, salva escaleras y monta
                  vehículos.
                </p>
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded font-bold text-sm w-fit transition-colors">
                  CONOCE MAS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿POR QUE ELEGIRNOS? Section */}
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t-4 border-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-12">
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
          <div className="text-center bg-muted rounded-lg p-8 border-l-4 border-primary">
            <p className="text-primary font-bold text-sm mb-6 italic max-w-3xl mx-auto">
              "TU SOCIO ESTRATEGICO PARA PROYECTOS QUE BUSCAN CALIDAD,
              INNOVACION Y RESPALDO EN CADA ETAPA."
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded font-bold text-sm transition-colors">
              CUENTANOS TU PROYECTO
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
