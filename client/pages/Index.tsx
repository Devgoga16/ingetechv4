import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Award,
  Building,
  CheckCircle2,
  Eye,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SolutionCard } from "@/components/SolutionCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { scrollToId } from "@/lib/scroll";
import { CONTACT, WHATSAPP_URL } from "@/lib/contact";

const heroImages = [
  "/imgs/ascensores nuevos.jpg",
  "/imgs/persona-en-ascensor.jpg",
  "/imgs/chica en ascensor.png",
];

const heroTitles = [
  "TU SEGURIDAD Y COMODIDAD ES NUESTRA PRIORIDAD",
  "MÁS DE 20 AÑOS DE EXPERIENCIA EN ELEVACIÓN",
  "INNOVAMOS Y ELEVAMOS TU CONFORT DE VIAJE",
];

const brands = [
  { name: "SWORD", logo: "/brands/sword-logov3.jpeg" },
  { name: "XIZI", logo: "/brands/xizi-logo.png" },
  { name: "TENAU", logo: "/brands/tenau.jpeg" },
  { name: "HIDRAL", logo: "/brands/hidral-logo.png" },
];

const features = [
  { icon: <CheckCircle2 size={26} />, title: "Seguridad" },
  { icon: <Award size={26} />, title: "Calidad" },
  { icon: <Building size={26} />, title: "Innovación" },
  { icon: <Handshake size={26} />, title: "Compromiso" },
  { icon: <Eye size={26} />, title: "Transparencia" },
  { icon: <Users size={26} />, title: "Trabajo en Equipo" },
];

const contactChannels = [
  {
    icon: MapPin,
    label: "Ubicación",
    value: CONTACT.address,
    href: undefined,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: CONTACT.emailHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.phone,
    href: WHATSAPP_URL,
  },
];

export default function Index() {
  const location = useLocation();
  const [openProject, setOpenProject] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.slug === openProject);

  /*
   * Arriving from another route as /#contacto should land on that section.
   *
   * Two things make this harder than it looks: `behavior: "auto"` inherits the
   * `scroll-behavior: smooth` we set globally, and that smooth scroll gets
   * cancelled by the layout shifts of images loading in above the target. So we
   * jump instantly and re-assert while the document is still growing, bailing
   * out as soon as the visitor takes over the scroll themselves.
   */
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    let cancelled = false;
    let lastHeight = -1;
    let attempts = 0;
    let timer = 0;

    const stop = () => {
      cancelled = true;
      window.clearTimeout(timer);
    };

    const jump = () => {
      if (cancelled) return;

      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "instant", block: "start" });

      const height = document.documentElement.scrollHeight;
      attempts += 1;

      if (height !== lastHeight && attempts < 20) {
        lastHeight = height;
        timer = window.setTimeout(jump, 100);
      }
    };

    jump();

    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    window.addEventListener("keydown", stop, { once: true });

    return () => {
      stop();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [location.hash]);

  return (
    <Layout>
      {/* ================================ HERO ============================== */}
      <section id="inicio">
        <HeroCarousel
          images={heroImages}
          titles={heroTitles}
          eyebrow="INGETECH Ascensores"
          buttonText="Ver soluciones"
          onButtonClick={() => scrollToId("#servicios")}
          secondaryButtonText="Cuéntanos tu proyecto"
          onSecondaryButtonClick={() => scrollToId("#contacto")}
        />
      </section>

      {/* =============================== PROYECTOS ========================== */}
      <section id="proyectos" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Nuestro trabajo"
              title="Proyectos"
              description="Equipos instalados, modernizados y mantenidos por nuestro equipo."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70} className="h-full">
                <ProjectCard
                  project={project}
                  onOpen={() => setOpenProject(project.slug)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== TRUST BAR =========================== */}
      <section
        aria-label="Marcas que representamos"
        className="border-y border-hairline bg-surface-subtle"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <p className="shrink-0 text-center text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-foreground/45 lg:max-w-[11rem] lg:text-left">
              Representantes y distribuidor de:
            </p>

            <div className="hidden h-12 w-px bg-hairline lg:block" />

            <div className="grid w-full grid-cols-2 items-center gap-6 sm:grid-cols-4 lg:gap-10">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex h-14 items-center justify-center"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-10 w-auto max-w-[8rem] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SOLUCIONES (unified) ======================== */}
      <section
        id="servicios"
        className="relative overflow-hidden bg-white py-20 md:py-28"
      >
        {/* Legacy anchor: keeps older /#catalogo links working. */}
        <span id="catalogo" aria-hidden="true" className="sr-only" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-ink-800/[0.05] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Nuestras soluciones"
              title="Catálogo de Soluciones"
              description="Servicios innovadores y de calidad, manteniendo el mismo estándar de las marcas de clase mundial, para maximizar tu confort de viaje, elevando el valor de tus edificios."
            />
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Reveal key={solution.slug} delay={index * 70} className="h-full">
                <SolutionCard solution={solution} eager={index < 3} newTab />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== NOSOTROS =========================== */}
      <section id="nosotros" className="bg-surface-subtle py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -left-4 -top-4 hidden h-full w-full rounded-3xl border-2 border-primary/20 lg:block"
                />
                <img
                  src="/brands/ingetechnuevaafoto.jpeg"
                  alt="Grupo Ingetech"
                  loading="lazy"
                  width={1148}
                  height={1280}
                  className="relative h-auto w-full rounded-3xl object-cover shadow-card"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <SectionHeading
                align="left"
                eyebrow="Nosotros"
                title="Grupo Ingetech"
                className="max-w-none"
              />

              <p className="mt-6 text-sm leading-relaxed text-foreground/70 sm:text-base">
                Nacemos de los años de experiencia de un equipo de técnicos
                especialistas en transporte vertical, unidos por el firme
                propósito de elevar el estándar de seguridad, eficiencia y
                transparencia en el sector. Comprendemos que un ascensor es más
                que una máquina; es el corazón de su edificio y una promesa de
                confianza para quienes lo usan cada día. Por eso, ofrecemos
                servicios y equipos que cumplen los más altos estándares a nivel
                mundial, que le brinda total tranquilidad y elevará el valor de
                su edificio.
              </p>

              <button
                type="button"
                onClick={() => scrollToId("#servicios")}
                className="mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-600 hover:shadow-brand-glow"
              >
                Conoce más
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================= ¿POR QUÉ ELEGIRNOS? ====================== */}
      <section className="bg-ink-900 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Nuestros valores"
              title="¿Por qué elegirnos?"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 60}>
                <FeatureCard icon={feature.icon} title={feature.title} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-10 text-center sm:px-12">
              <p className="mx-auto max-w-3xl text-lg font-semibold leading-relaxed text-white sm:text-xl">
                “Tu socio estratégico para proyectos que buscan calidad,
                innovación y respaldo en cada etapa.”
              </p>
              <button
                type="button"
                onClick={() => scrollToId("#contacto")}
                className="mt-8 inline-flex items-center rounded-xl bg-primary px-7 py-4 text-xs font-bold uppercase tracking-wide text-white shadow-brand-glow transition-colors hover:bg-brand-600"
              >
                Cuéntanos tu proyecto
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============================== CONTACTO =========================== */}
      <section id="contacto" className="bg-surface-subtle py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Contáctanos"
              title="Hablemos de tu Proyecto"
              description="Estamos listos para llevar tu proyecto al siguiente nivel"
            />
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            {/* Channels */}
            <Reveal className="space-y-3">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-primary">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-foreground/50">
                        {channel.label}
                      </span>
                      <span className="mt-1 block text-sm text-foreground/80">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );

                const classes =
                  "flex items-start gap-4 rounded-2xl border border-hairline bg-white p-5 transition-all";

                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={
                      channel.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      channel.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`${classes} hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-card`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={channel.label} className={classes}>
                    {content}
                  </div>
                );
              })}
            </Reveal>

            {/* Form */}
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectLightbox
          project={activeProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </Layout>
  );
}
