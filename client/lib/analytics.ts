/**
 * Etiqueta de Google (Google Ads) para una SPA.
 *
 * El snippet de index.html carga gtag.js con `send_page_view: false`. En una
 * web normal cada clic recarga la página y gtag cuenta una vista por sí solo,
 * pero aquí React Router cambia la URL sin recargar nada: sin esto, gtag vería
 * una única vista por sesión y nunca registraría /gracias.
 */

export const GOOGLE_TAG_ID = "AW-18431196592";

/**
 * Etiqueta de la acción de conversión de Google Ads.
 *
 * OJO: no es el ID de arriba. Es el ID + "/" + un código que Google genera al
 * crear la acción de conversión en el panel, con esta forma:
 *
 *   "AW-18431196592/AbC-D_efGhIjKlM"
 *
 * Dónde encontrarlo: Google Ads -> Objetivos -> Conversiones -> tu acción ->
 * "Configurar etiqueta" -> "Instalar la etiqueta manualmente". En el fragmento
 * que muestra, es el valor de `send_to`.
 *
 * Mientras esté vacío no se envía ninguna conversión.
 */
export const GOOGLE_ADS_CONVERSION_LABEL = "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Avisa a Google de que el visitante está viendo esta ruta. */
export function trackPageView(path: string) {
  // No existe si el script está bloqueado (adblock) o aún no ha cargado.
  // dataLayer se rellena igualmente y gtag.js lo procesa al arrancar.
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    send_to: GOOGLE_TAG_ID,
  });
}

/**
 * Registra una conversión de Google Ads.
 *
 * `label` es la etiqueta de la acción de conversión, que Google entrega al
 * crearla en el panel. Tiene la forma "AW-18431196592/AbC-D_efGhIjKlM".
 * Sin ese valor la conversión no se puede enviar, así que la llamada se
 * ignora en silencio mientras no esté configurada.
 */
export function trackConversion(label?: string) {
  if (!label) return;
  window.gtag?.("event", "conversion", { send_to: label });
}
