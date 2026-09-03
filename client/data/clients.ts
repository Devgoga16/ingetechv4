export interface Client {
  /**
   * Nombre del cliente. Si hay logo se usa como texto alternativo (invisible,
   * solo para lectores de pantalla y buscadores). Si NO hay logo, se dibuja
   * tal cual en la franja, así que cuida las mayúsculas y la ortografía.
   */
  name: string;
  /**
   * Ruta bajo /public, p. ej. "/clientes/marcona.png".
   * Opcional: sin logo (o si el archivo falla al cargar) se muestra el nombre
   * como texto, sin el icono de imagen rota del navegador.
   */
  logo?: string;
}

/**
 * Logos de la franja "Nuestros clientes", debajo del formulario de contacto.
 *
 * Archivos: déjalos en /public/clientes/ y referéncialos desde la raíz.
 *
 * Formato: PNG con fondo transparente siempre que puedas, o SVG. Un JPG con
 * fondo blanco se nota sobre la franja y rompe la fila.
 *
 * ¿Sin logo? Omite `logo` (o déjalo vacío) y se dibujará el nombre como texto:
 *
 *   { name: "Constructora Carbajal" },
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
  { name: "cristosalvador", logo: "/clientes/cristosalvador.jpeg" },
  { name: "CONTRUCTORA CARBAJAL", logo: "" },
  { name: "CONTRUCTORA COPAO", logo: "" },
  { name: "VER & CAN CONTRATISTAS GENERALES S.R.L.", logo: "" },
];
