import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, MessageCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { SolutionCard } from "@/components/SolutionCard";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import NotFound from "@/pages/NotFound";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import { scrollToId } from "@/lib/scroll";
import { WHATSAPP_URL } from "@/lib/contact";

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const solution = getSolutionBySlug(slug);

  /* Land at the top of the page, not wherever the previous route was scrolled. */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    if (!solution) return;
    const previous = document.title;
    document.title = `${solution.title} | Ingetech Ascensores`;
    return () => {
      document.title = previous;
    };
  }, [solution]);

  if (!solution) {
    return <NotFound />;
  }

  const Icon = solution.icon;
  const related = solutions.filter((item) => item.slug !== solution.slug);

  return (
    <Layout>
      {/* ================================ HERO ============================== */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        <div className="absolute inset-0 -z-10">
          <img
            src={solution.image}
            alt=""
            // @ts-expect-error fetchpriority is valid HTML, not yet in React 18 types
            fetchpriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/80 to-ink-900/50" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/55">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Inicio
                </Link>
              </li>
              <ChevronRight size={13} aria-hidden="true" />
              <li>
                <Link
                  to="/#servicios"
                  className="transition-colors hover:text-white"
                >
                  Soluciones
                </Link>
              </li>
              <ChevronRight size={13} aria-hidden="true" />
              <li aria-current="page" className="font-semibold text-white/90">
                {solution.category}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                <Icon size={15} />
              </span>
              {solution.category}
            </span>

            <h1 className="text-balance text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-5xl">
              {solution.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {solution.summary}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToId("#cotizar")}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-brand-glow transition-colors hover:bg-brand-600"
              >
                Solicitar información
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/15"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =============================== DETALLE ============================ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
            <Reveal>
              <SectionHeading
                align="left"
                title="En qué consiste"
                className="max-w-none"
              />
              <p className="mt-6 text-base leading-relaxed text-foreground/70">
                {solution.intro}
              </p>

              <div className="mt-10 rounded-2xl border-l-4 border-primary bg-surface-subtle p-6">
                <p className="text-sm leading-relaxed text-foreground/70">
                  ¿No estás seguro de qué necesita tu edificio? Cuéntanos el
                  caso y te orientamos sin compromiso.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToId("#cotizar")}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                >
                  Escríbenos
                  <ArrowRight size={14} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl border border-hairline bg-surface-subtle p-6 sm:p-8">
                <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
                  Qué incluye
                </h3>
                <ul className="space-y-4">
                  {solution.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/75">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =============================== COTIZAR ============================ */}
      <section id="cotizar" className="bg-surface-subtle py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Contáctanos"
              title="Hablemos de tu Proyecto"
              description={`Cuéntanos qué necesitas y un especialista en ${solution.category.toLowerCase()} te responderá.`}
            />
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <ContactForm context={solution.title} className="mx-auto" />
          </Reveal>
        </div>
      </section>

      {/* ============================ OTRAS SOLUCIONES ====================== */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Seguir explorando"
              title="Otras soluciones"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((item, index) => (
              <Reveal key={item.slug} delay={index * 70} className="h-full">
                <SolutionCard solution={item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/#servicios"
              className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-white px-7 py-4 text-xs font-bold uppercase tracking-wide text-foreground transition-all hover:border-primary/30 hover:text-primary hover:shadow-card"
            >
              Ver todas las soluciones
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
