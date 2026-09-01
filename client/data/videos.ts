export interface Video {
  /** Ruta bajo /public, p. ej. "/videos/video1.mp4" */
  src: string;
  /**
   * Forma del vídeo, que decide el hueco que se le reserva en la galería:
   * "portrait" (9:16, grabado con el móvil en vertical) o "landscape" (16:9,
   * por defecto). Si te equivocas no se rompe nada — el vídeo se sigue viendo
   * entero, solo aparecen franjas negras a los lados o arriba y abajo.
   */
  orientation?: "landscape" | "portrait";
}

/**
 * Galería de vídeos de la portada. Sin título ni descripción por vídeo.
 *
 * Archivos: déjalos en /public/videos/ y referéncialos desde la raíz,
 * p. ej. "/videos/instalacion-marcona.mp4".
 *
 * Formato: MP4 (H.264 + AAC). Es el único que reproducen todos los navegadores
 * sin excepciones — un .mov de iPhone no funciona en Chrome sobre Windows ni
 * en Android, hay que convertirlo antes.
 *
 * Peso: mantenlos por debajo de ~10 MB. Se sirven desde tu propio dominio y no
 * tienen calidad adaptativa, así que un archivo grande se descarga entero
 * también en móvil.
 *
 * Para añadir o quitar vídeos, edita esta lista. La sección no se dibuja si
 * queda vacía.
 */
export const videos: Video[] = [
  // Ambos archivos miden 464x832, así que son verticales.
  { src: "/videos/video1.mp4", orientation: "portrait" },
  { src: "/videos/video2.mp4", orientation: "portrait" },
  { src: "/videos/video3.mp4", orientation: "portrait" },
  { src: "/videos/video4.mp4", orientation: "portrait" },
];
