import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { CONTACT, PHONES, WHATSAPP_URL, telHref } from "@/lib/contact";

/** Lo que el formulario adjunta al navegar hasta aquí. */
export interface ContactSummary {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Solución sobre la que se preguntó, si venía de una página de detalle */
  context?: string;
}

export default function ThankYou() {
  const location = useLocation();
  const summary = (location.state as { summary?: ContactSummary } | null)
    ?.summary;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const previous = document.title;
    document.title = "Mensaje enviado | Ingetech Ascensores";
    return () => {
      document.title = previous;
    };
  }, []);

  const rows = summary
    ? [
        { label: "Nombre", value: summary.name },
        { label: "Email", value: summary.email },
        { label: "Teléfono", value: summary.phone || "No indicado" },
        ...(summary.context
          ? [{ label: "Solución de interés", value: summary.context }]
          : []),
      ]
    : [];

  return (
    <Layout>
      <section className="bg-surface-subtle py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <span className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={34} strokeWidth={2.2} />
              </span>

              <h1 className="text-balance text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                ¡Gracias por escribirnos!
              </h1>

              <p className="mx-auto mt-5 max-w-prose text-base leading-relaxed text-foreground/65 sm:text-lg">
                Hemos recibido tu mensaje y nuestro equipo se pondrá en contacto
                contigo a la brevedad. Si tu consulta es urgente, puedes
                escribirnos directamente por WhatsApp.
              </p>
            </div>
          </Reveal>

          {/* Resumen de lo enviado */}
          {summary && (
            <Reveal delay={100}>
              <div className="mt-12 overflow-hidden rounded-3xl border border-hairline bg-white shadow-card">
                <h2 className="border-b border-hairline bg-surface-subtle px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
                  Resumen de tu envío
                </h2>

                <dl className="divide-y divide-hairline">
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
                    >
                      <dt className="text-xs font-bold uppercase tracking-wider text-foreground/45">
                        {row.label}
                      </dt>
                      <dd className="break-words text-sm text-foreground/80">
                        {row.value}
                      </dd>
                    </div>
                  ))}

                  <div className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-foreground/45">
                      Mensaje
                    </dt>
                    <dd className="whitespace-pre-line break-words text-sm leading-relaxed text-foreground/80">
                      {summary.message}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          )}

          {/* Vías directas mientras esperan respuesta */}
          <Reveal delay={160}>
            <div className="mt-10 rounded-3xl border border-hairline bg-white p-6 sm:p-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
                ¿Prefieres hablar ahora?
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-emerald-600"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>
                <a
                  href={telHref(PHONES[0])}
                  className="flex items-center justify-center gap-2 rounded-xl border border-hairline px-5 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Phone size={17} className="text-primary" />
                  {PHONES[0].display}
                </a>
              </div>

              <a
                href={CONTACT.emailHref}
                className="mt-3 flex items-center justify-center gap-2 text-xs text-foreground/55 transition-colors hover:text-primary"
              >
                <Mail size={14} />
                {CONTACT.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-xs font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-600 hover:shadow-brand-glow"
              >
                Volver al inicio
                <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
