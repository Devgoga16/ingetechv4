export interface Client {
  /** Nombre del cliente. Se usa como texto alternativo del logo. */
  name: string;
  /** Ruta bajo /public, p. ej. "/clientes/municipalidad-marcona.png" */
  logo: string;
}

/**
 * Logos de la franja "Nuestros clientes", debajo del formulario de contacto.
 *
 * Archivos: déjalos en /public/clientes/ y referéncialos desde la raíz.
 *
 * Formato: PNG con fondo transparente siempre que puedas, o SVG. Un JPG con
 * fondo blanco se nota sobre la franja y rompe la fila.
 *
 * Los logos se escalan por altura (máximo 40 px), así que no hace falta que
 * midan todos lo mismo: uno alargado y otro cuadrado quedan equilibrados solos.
 *
 * Ejemplo:
 *
 *   { name: "Municipalidad de Marcona", logo: "/clientes/marcona.png" },
 *
 * La franja no se dibuja mientras esta lista esté vacía.
 */
export const clients: Client[] = [
  { name: "icpna", logo: "/clientes/icpna.png" },
  { name: "farmaciauniversal", logo: "/clientes/farmaciauniversal.png" },
  { name: "losolivos", logo: "/clientes/losolivos.png" },
  { name: "municallao", logo: "/clientes/municallao.png" },
  { name: "muninazca", logo: "/clientes/muninazca.png" },
  { name: "renzocosta", logo: "/clientes/renzocosta.jpg" },
];
