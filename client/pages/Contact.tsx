import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

      setFormData({ name: "", email: "", message: "" });
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

  return (
    <Layout>
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12">
            Contáctanos
          </h1>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-muted rounded-lg p-8 text-center border-t-4 border-primary">
              <Phone size={32} className="mx-auto text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Teléfono</h3>
              <p className="text-foreground/70">+51 929 970 920</p>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center border-t-4 border-primary">
              <Mail size={32} className="mx-auto text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-foreground/70">ventas@ingetech-elevators.com</p>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center border-t-4 border-primary">
              <MapPin size={32} className="mx-auto text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Ubicación</h3>
              <p className="text-foreground/70 text-sm">
                Urb. Las Delicias de Villa, Mz. G9, Lt.6, Chorrillos, Lima.
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8 border-l-4 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Envíanos un mensaje
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-foreground font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu email"
                />
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu mensaje"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded font-bold transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
