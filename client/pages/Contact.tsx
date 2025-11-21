import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
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
              <p className="text-foreground/70">+51 981 311 694</p>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center border-t-4 border-primary">
              <Mail size={32} className="mx-auto text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-foreground/70">tesoreria@epj.com.pe</p>
            </div>
            <div className="bg-muted rounded-lg p-8 text-center border-t-4 border-primary">
              <MapPin size={32} className="mx-auto text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Ubicación</h3>
              <p className="text-foreground/70 text-sm">
                Av. Prolongación Benavides 3583, Oficina 101, Santiago de Surco,
                Lima
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8 border-l-4 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Envíanos un mensaje
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-foreground font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu email"
                />
              </div>
              <div>
                <label className="block text-foreground font-bold mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu mensaje"
                />
              </div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded font-bold transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
