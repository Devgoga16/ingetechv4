import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Envía una vista de página a Google en cada cambio de ruta.
 *
 * Va dentro del <BrowserRouter> para poder usar useLocation. No dibuja nada.
 */
export function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // El título lo fijan las páginas en su propio efecto; un tick de margen
    // evita mandar el título de la pantalla anterior.
    const timer = window.setTimeout(
      () => trackPageView(location.pathname + location.search),
      0,
    );
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}
