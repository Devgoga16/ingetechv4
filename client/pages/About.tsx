import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            Quiénes Somos
          </h1>
          <div className="bg-muted rounded-lg p-8 text-center">
            <p className="text-foreground/70 text-lg mb-4">
              Esta página está en desarrollo.
            </p>
            <p className="text-foreground/70">
              Continúa explorando nuestro sitio o contáctanos para más
              información sobre nuestra empresa.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
