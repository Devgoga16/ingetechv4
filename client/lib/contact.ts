export interface Phone {
  /** Cómo se escribe en pantalla, con los espacios que quieras */
  display: string;
  /**
   * El mismo número en formato internacional, solo dígitos: sin "+", sin
   * espacios y sin guiones. Es lo que usan los enlaces `tel:` y `wa.me`.
   */
  digits: string;
  /** Marca false si este número NO tiene WhatsApp. Por defecto sí lo tiene. */
  whatsapp?: boolean;
}

/**
 * Teléfonos de la empresa. Añade los que quieras a la lista.
 *
 * El PRIMERO es el principal: es el que sale en la barra superior, en el botón
 * de llamar del móvil y en el botón flotante de WhatsApp, donde solo cabe uno.
 * La sección de contacto y el pie muestran todos.
 *
 * Ejemplo con tres números, uno de ellos sin WhatsApp:
 *
 *   export const PHONES: Phone[] = [
 *     { display: "+51 929 970 920", digits: "51929970920" },
 *     { display: "+51 999 888 777", digits: "51999888777" },
 *     { display: "(01) 555 1234", digits: "5115551234", whatsapp: false },
 *   ];
 */
export const PHONES: Phone[] = [
  { display: "+51 929 970 920", digits: "51929970920" },
  { display: "+51 932 722 076", digits: "51932722076" },
];

/** Enlace para llamar. */
export const telHref = (phone: Phone) => `tel:+${phone.digits}`;

/** Enlace para abrir el chat de WhatsApp. */
export const waHref = (phone: Phone) => `https://wa.me/${phone.digits}`;

/** Número principal, para los sitios donde solo cabe uno. */
export const PRIMARY_PHONE = PHONES[0];

/** Solo los números que tienen WhatsApp. */
export const WHATSAPP_PHONES = PHONES.filter(
  (phone) => phone.whatsapp !== false,
);

/** Company contact details, shared across the header, footer and contact blocks. */
export const CONTACT = {
  address: "Urb. Las Delicias de Villa, Mz. G9, Lt.6, Chorrillos, Lima",
  phone: PRIMARY_PHONE.display,
  phoneHref: telHref(PRIMARY_PHONE),
  email: "ventas@ingetech-elevators.com",
  emailHref: "mailto:ventas@ingetech-elevators.com",
  instagram: "https://www.instagram.com/ingetech_ascensores",
  linkedin: "https://www.linkedin.com/company/ingetech-ascensores",
  facebook: "https://www.facebook.com/ingetech.elevators",
} as const;

/** WhatsApp principal, para el botón flotante y los CTA sueltos. */
export const WHATSAPP_URL = waHref(WHATSAPP_PHONES[0] ?? PRIMARY_PHONE);
