import {
  Accessibility,
  Building2,
  Shield,
  TrendingUp,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Solution {
  /** URL segment: /soluciones/:slug */
  slug: string;
  /** Short category label shown on the card and as the detail-page eyebrow */
  category: string;
  /** Full commercial name */
  title: string;
  /** One-line summary used on the landing card */
  summary: string;
  icon: LucideIcon;
  image: string;
  /** Opening paragraph of the detail page */
  intro: string;
  /** What the service covers */
  highlights: string[];
}

/**
 * Single source of truth for the unified "Soluciones" section and every
 * /soluciones/:slug detail page.
 *
 * NOTE: `intro` and `highlights` are draft copy — review and adjust the wording
 * to match exactly what INGETECH offers before going live.
 */
export const solutions: Solution[] = [
  {
    slug: "ascensores-equipos-nuevos",
    category: "Equipos nuevos",
    title: "Ascensores, Montacargas, Rampas y Escaleras Eléctricas",
    summary:
      "Soluciones completas de transporte vertical y movilidad para todo tipo de edificaciones",
    icon: Building2,
    image: "/imgs/ascensores nuevos 2.jpg",
    intro:
      "Suministramos e instalamos equipos de transporte vertical y horizontal para proyectos residenciales, comerciales, industriales e institucionales. Cada equipo se dimensiona según el tráfico, la arquitectura y el uso previsto del edificio, con marcas que representamos directamente y respaldo técnico local.",
    highlights: [
      "Ascensores de pasajeros para edificios residenciales, oficinas y hoteles",
      "Montacargas y ascensores de carga para uso industrial y comercial",
      "Escaleras eléctricas y rampas móviles para espacios de alto tránsito",
      "Acompañamiento desde el dimensionamiento del ducto hasta la puesta en marcha",
    ],
  },
  {
    slug: "modernizacion",
    category: "Modernización",
    title: "Modernización de Ascensores",
    summary:
      "Actualización y renovación de sistemas de elevación existentes con tecnología moderna",
    icon: Wrench,
    image: "/imgs/modernizacion-de-ascensores.jpg",
    intro:
      "Renovamos ascensores en servicio para devolverles seguridad, confort y eficiencia sin reemplazar toda la instalación. Evaluamos el equipo existente y proponemos un alcance por etapas, priorizando lo que más impacta en la seguridad del usuario y en el valor del edificio.",
    highlights: [
      "Cambio de maniobra, tracción y variador de frecuencia",
      "Renovación de cabina, puertas y botoneras",
      "Actualización de dispositivos de seguridad a la normativa vigente",
      "Alcance por etapas para reducir el tiempo de equipo fuera de servicio",
    ],
  },
  {
    slug: "mantenimiento",
    category: "Mantenimiento",
    title: "Servicios de Mantenimiento",
    summary:
      "Mantenimiento preventivo y correctivo para garantizar el óptimo funcionamiento",
    icon: Zap,
    image: "/imgs/ducto de ascensor - mantenimiento.jpg",
    intro:
      "Programas de mantenimiento preventivo y correctivo para todo tipo y marca de equipo de elevación. Trabajamos con rutinas planificadas, registro de cada intervención y atención de emergencias, para que el equipo esté disponible cuando los usuarios lo necesitan.",
    highlights: [
      "Rutinas preventivas planificadas con informe de cada visita",
      "Atención de averías y rescate de personas atrapadas",
      "Mantenimiento para equipos de cualquier marca",
      "Diagnóstico del estado del equipo y recomendaciones priorizadas",
    ],
  },
  {
    slug: "consultoria-e-inspeccion",
    category: "Consultoría e inspección",
    title: "Consultoría e Inspección",
    summary:
      "Asesoramiento técnico y evaluaciones profesionales para tus proyectos de elevación",
    icon: Shield,
    image: "/imgs/puertas de hall - mantenimiento.jpg",
    intro:
      "Evaluamos instalaciones existentes y acompañamos proyectos en diseño con criterio técnico independiente. El resultado es un informe claro sobre el estado real del equipo, los riesgos detectados y las acciones recomendadas, con su respectivo orden de prioridad.",
    highlights: [
      "Inspección técnica del estado y la seguridad de la instalación",
      "Informes con hallazgos, riesgos y acciones priorizadas",
      "Asesoría en estudios de tráfico y dimensionamiento en fase de proyecto",
      "Revisión de propuestas técnicas y acompañamiento en la decisión de compra",
    ],
  },
  {
    slug: "repuestos",
    category: "Repuestos",
    title: "Venta de Repuestos",
    summary:
      "Repuestos originales y de calidad para todos los sistemas de elevación",
    icon: TrendingUp,
    image: "/imgs/botones.jpg",
    intro:
      "Suministramos repuestos originales y alternativos para ascensores, montacargas y escaleras eléctricas. Identificamos la pieza a partir del equipo instalado y ofrecemos alternativas compatibles cuando el repuesto original ya no está disponible.",
    highlights: [
      "Repuestos originales de las marcas que representamos",
      "Alternativas compatibles para equipos discontinuados",
      "Componentes de maniobra, tracción, puertas y señalización",
      "Identificación técnica de la pieza a partir del equipo instalado",
    ],
  },
  {
    slug: "accesibilidad",
    category: "Accesibilidad",
    title: "Equipos de Accesibilidad",
    summary:
      "Salva escaleras, plataformas y soluciones para movilidad reducida",
    icon: Accessibility,
    image: "/imgs/en ascensores nuevos.jpg",
    intro:
      "Equipos pensados para que personas con movilidad reducida puedan desplazarse con autonomía y seguridad. Son soluciones que se adaptan a edificaciones existentes, incluso cuando el espacio disponible es limitado o no admite un ascensor convencional.",
    highlights: [
      "Salva escaleras para tramos rectos y curvos",
      "Plataformas elevadoras verticales e inclinadas",
      "Instalación adaptada a edificaciones ya construidas",
      "Soluciones para espacios reducidos sin obra mayor",
    ],
  },
];

export function getSolutionBySlug(slug?: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
