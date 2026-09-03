export interface Project {
  /** Stable key, also used as the lightbox anchor */
  slug: string;
  name: string;
  /** Optional line under the name — district, city, building type… */
  location?: string;
  /**
   * One or two sentences on the work carried out: what was installed,
   * modernised or maintained. Renders only when present.
   */
  description?: string;
  /** First image is the cover shown on the card */
  images: string[];
}

/**
 * Los proyectos que se muestran en la sección "Proyectos" de la portada.
 *
 * Fotos: déjalas en /public/proyecto/ y referéncialas desde la raíz,
 * p. ej. "/proyecto/munimarcona.jpeg". La primera del array es la portada
 * de la tarjeta; el resto solo se ven al abrir el visor.
 *
 * `name` e `images` son obligatorios. `location` y `description` se dibujan
 * solo si existen, así que puedes omitir cualquiera de los dos.
 *
 * `description`: una o dos frases sobre el trabajo realizado. Ejemplo:
 *
 *   {
 *     slug: "municipalidad-marcona",
 *     name: "MUNICIPALIDAD DE MARCONA",
 *     location: "MARCONA",
 *     description:
 *       "Suministro e instalación de ascensor de pasajeros de 4 paradas, " +
 *       "incluida la obra civil del ducto y la puesta en marcha.",
 *     images: ["/proyecto/munimarcona.jpeg"],
 *   }
 */
export const projects: Project[] = [
  {
    slug: "municipalidad-marcona",
    name: "MUNICIPALIDAD DE MARCONA",
    location: "MARCONA",
    images: ["/proyecto/munimarcona.jpeg"],
    description:
      "UN (01) ASCENSOR DE 800 KG - 5 PARADAS"
  },
  {
    slug: "palacio-municipal-changullo",
    name: "PALACIO MUNICIPAL DE CHANGUILLO",
    location: "NAZCA",
    images: ["/proyecto/changuillo.jpeg"],
    description:
      "UN (01) ASCENSOR DE 1000 KG - 3 PARADAS"
  },
  {
    slug: "oficinas-parque-zonal-pachacutec",
    name: "CASA DE LA JUVENTUD Y LA CULTURA",
    location: "VENTANILLA, LIMA",
    images: ["/proyecto/ventanilla2.jpeg", "/proyecto/ventanilla.jpeg"],
    description:
      "UN (01) ASCENSOR DE 800 KG - 5 PARADAS"
  },
  {
    slug: "teatro-municipal-del-callao",
    name: "TEATRO MUNICIPAL DEL CALLAO",
    location: "CALLAO",
    images: ["/proyecto/municallao.jpeg"],
    description:
      "UN (01) ELEVADOR DE 250 KG - 2 PARADAS Y UNA (01) PLATAFORMA SALVA ALTURA"
  },
  {
    slug: "farmacia-universal",
    name: "FARMACIA UNIVERSAL",
    location: "LIMA",
    images: ["/proyecto/farmaciauniversal.jpeg"],
    description:
      "MODERNIZACIÓN DE ASCENSOR Y SALVA ALTURA"
  },
  {
    slug: "cristo-salvador",
    name: "CRISTO SALVADOR",
    location: "LIMA",
    images: ["/proyecto/cristosalvadorproyecto.jpeg"],
    description:
      "MODERNIZACIÓN DE UN ELEVADOR HIDRAULICO"
  }
];
