import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
            404
          </h1>
          <p className="text-2xl text-foreground font-bold mb-3">
            ¡Oops! Página no encontrada
          </p>
          <p className="text-foreground/70 mb-8">
            La página que buscas no existe. Por favor, regresa a la página
            principal o contáctanos si necesitas ayuda.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded font-bold transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
