import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/contact";

interface ContactFormProps {
  /**
   * Name of the solution the visitor is enquiring about. Appended to the
   * message so the sales team knows where the lead came from.
   */
  context?: string;
  className?: string;
}

const inputClasses =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 transition-colors focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

const labelClasses =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground/60";

export function ContactForm({ context, className }: ContactFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        body: JSON.stringify({
          ...formData,
          message: context
            ? `${formData.message}\n\nSolución de interés: ${context}`
            : formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSent(true);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-hairline bg-white p-6 shadow-card sm:p-8",
        className,
      )}
    >
      {isSent && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900"
        >
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0 text-emerald-600"
          />
          <p>
            Recibimos tu mensaje. Nuestro equipo te contactará a la brevedad.
          </p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              Nombre
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClasses}>
              Teléfono
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="+51 999 999 999"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Mensaje
          </label>
          <textarea
            id="contact-message"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={cn(inputClasses, "resize-y")}
            placeholder="Cuéntanos sobre tu proyecto..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-brand-glow transition-all hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar mensaje
              <Send
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>

        <p className="text-center text-xs text-foreground/50">
          ¿Prefieres una respuesta inmediata?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            <MessageCircle size={13} />
            Escríbenos por WhatsApp
          </a>
        </p>
      </form>
    </div>
  );
}
