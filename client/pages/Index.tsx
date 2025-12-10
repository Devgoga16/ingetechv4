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
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroImages = [
    "/imgs/ascensores nuevos.jpg",
    "/imgs/persona-en-ascensor.jpg",
    "/imgs/chica en ascensor.png",
  ];

  const services = [
    {
      icon: <Zap size={48} />,
      title: "Servicio de Mantenimiento",
    },
    {
      icon: <Wrench size={48} />,
      title: "Modernización de Ascensores",
    },
    {
      icon: <Shield size={48} />,
      title: "Servicios de consultoría e inspección",
    },
    {
      icon: <Building2 size={48} />,
      title: "Ascensores Equipos Nuevos",
    },
    {
      icon: <TrendingUp size={48} />,
      title: "Venta de Repuestos Originales y Alternativos",
    }
  ];

  const products = [
    {
      image:
        "/imgs/ascensores nuevos 2.jpg",
      title: "Ascensores, Montacargas, Rampas y Escaleras Eléctricas",
      description:
        "Soluciones completas de transporte vertical y movilidad para todo tipo de edificaciones",
    },
    {
      image:
        "/imgs/modernizacion-de-ascensores.jpg",
      title: "Modernización",
      description:
        "Actualización y renovación de sistemas de elevación existentes con tecnología moderna",
    },
    {
      image:
        "/imgs/ducto de ascensor - mantenimiento.jpg",
      title: "Servicios de Mantenimiento",
      description:
        "Mantenimiento preventivo y correctivo para garantizar el óptimo funcionamiento",
    },
    {
      image:
        "/imgs/puertas de hall - mantenimiento.jpg",
      title: "Consultoría e Inspección",
      description:
        "Asesoramiento técnico y evaluaciones profesionales para tus proyectos de elevación",
    },
    {
      image:
        "/imgs/botones.jpg",
      title: "Venta de Repuestos",
      description:
        "Repuestos originales y de calidad para todos los sistemas de elevación",
    },
    {
      image:
        "/imgs/en ascensores nuevos.jpg",
      title: "Equipos de Accesibilidad",
      description:
        "Salva escaleras, plataformas y soluciones para movilidad reducida",
    },
  ];

  const brands = [
    {
      name: "SWORD",
      logo: "/brands/sword-logov3.jpeg",
    },
    {
      name: "XIZI",
      logo: "/brands/xizi-logo.png",
    },
    {
      name: "MP",
      logo: "/brands/mp-logo.png",
    },
    {
      name: "HIDAL",
      logo: "/brands/hidral-logo.png",
    }
  ];

  const features = [
    { icon: <CheckCircle2 size={48} />, title: "Seguridad" },
    { icon: <Award size={48} />, title: "Calidad" },
    { icon: <Building size={48} />, title: "Innovación" },
    { icon: <Handshake size={48} />, title: "Compromiso" },
    { icon: <Eye size={48} />, title: "Transparencia" },
    { icon: <Users size={48} />, title: "Trabajo en Equipo" },
  ];

  const heroTitles = [
    "TU SEGURIDAD Y COMODIDAD ES NUESTRA PRIORIDAD",
    "MÁS DE 20 AÑOS DE EXPERIENCIA EN ELEVACIÓN",
    "INNOVAMOS Y ELEVAMOS TU CONFORT DE VIAJE",
  ];

  const handleCatalogClick = () => {
    const element = document.querySelector("#catalogo");
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleContactClick = () => {
    const element = document.querySelector("#contacto");
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <section id="inicio">
        <HeroCarousel
          images={heroImages}
          titles={heroTitles}
          buttonText="VER CATALOGO"
          onButtonClick={handleCatalogClick}
        />
      </section>

      {/* TE OFRECEMOS Section */}
      <section id="servicios" className="relative py-24 md:py-40 bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">
                Nuestras soluciones
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Te Ofrecemos
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Servicios innovadores y de calidad, manteniendo el mismo estándar de las marcas de clase mundial,
              para maximizar tu confort de viaje, elevando el valor de tus edificios.
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
      <section id="catalogo" className="relative py-24 md:py-40 bg-gradient-to-b from-white via-slate-50 to-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">
                GRUPO INGETECH
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Catálogo de Soluciones
            </h2>
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-primary" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-primary" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="nosotros" className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t-4 border-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-primary mb-12">
            REPRESENTANTES Y DISTRIBUIDOR DE:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow min-h-[140px] flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`${index === 0 ? 'max-h-32' : 'max-h-24'} w-auto object-contain`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Company section */}
          <div className="bg-muted rounded-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src="/brands/ingelogogrande.jpg"
                  alt="Grupo Ingetech"
                  className="rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  GRUPO INGETECH
                </h3>
                <p className="text-foreground/80 text-sm mb-6 leading-relaxed">
                  Nacemos de los años de experiencia de un equipo de técnicos especialistas en transporte vertical, unidos por el firme propósito de elevar el estándar de seguridad, eficiencia y transparencia en el sector. Comprendemos que un ascensor es más que una máquina; es el corazón de su edificio y una promesa de confianza para quienes lo usan cada día. Por eso, ofrecemos servicios y equipos que cumplen los más altos estándares a nivel mundial, que le brinda total tranquilidad y elevará el valor de su edificio.
                </p>
                <button
                  onClick={handleCatalogClick}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded font-bold text-sm w-fit transition-colors"
                >
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
            <button
              onClick={handleContactClick}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded font-bold text-sm transition-colors"
            >
              CUENTANOS TU PROYECTO
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTO Section */}
      <section id="contacto" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">
                Contáctanos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Hablemos de tu Proyecto
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Estamos listos para llevar tu proyecto al siguiente nivel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Ubicación</h3>
                  <p className="text-foreground/70 text-sm">
                    Urb. Las Delicias de Villa, Mz. G9, Lt.6, Chorrillos, Lima
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Teléfono</h3>
                  <p className="text-foreground/70 text-sm">+51 929 970 920</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <p className="text-foreground/70 text-sm">ventas@ingetech-elevators.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MessageCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">WhatsApp</h3>
                  <p className="text-foreground/70 text-sm">+51 929 970 920</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+51 999 999 999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
