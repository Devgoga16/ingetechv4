import { Request, Response } from "express";

/** Sin estas variables no se puede enviar nada. */
const REQUIRED_ENV = ["EMAIL_API_KEY", "CONTACT_EMAIL"] as const;

const DEFAULT_API_URL = "https://bot-template.unify-tc.com/api/email/send";

/** El mensaje del visitante acaba dentro de un correo HTML: hay que escaparlo. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** El asunto es una cabecera de una sola línea: un \n permite inyectar otras. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function handleContact(req: Request, res: Response) {
  const { name, email, phone, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(
      `[contacto] Faltan variables de entorno: ${missing.join(", ")}.\n` +
        "  Defínelas en .env.local (desarrollo) o en Environment Variables de Vercel (producción).",
    );
    return res.status(503).json({
      error: "El envío de correo no está configurado en el servidor.",
    });
  }

  const cleanName = singleLine(String(name));
  const cleanEmail = singleLine(String(email));
  const cleanPhone = phone ? singleLine(String(phone)) : "No especificado";
  const bodyText = String(message);

  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(cleanName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(cleanPhone)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(bodyText).replace(/\n/g, "<br />")}</p>
    <hr />
    <p style="color:#888;font-size:12px">
      Enviado desde el formulario de ingetech-elevators.com
    </p>
  `;

  try {
    // La API tarda lo que tarde en su lado; sin límite propio la función
    // serverless se quedaría colgada hasta que la mate la plataforma.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    const response = await fetch(process.env.EMAIL_API_URL || DEFAULT_API_URL, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        "x-api-key": process.env.EMAIL_API_KEY as string,
      },
      body: JSON.stringify({
        to: process.env.CONTACT_EMAIL,
        subject: `Nuevo mensaje de contacto de ${cleanName}`,
        html,
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      // El cuerpo de la respuesta suele explicar el motivo (clave inválida,
      // destinatario rechazado…). Va al log, nunca al visitante.
      const detail = await response.text().catch(() => "");
      console.error(
        `[contacto] La API de correo respondió ${response.status}: ${detail.slice(0, 500)}`,
      );
      return res.status(502).json({ error: "Error al procesar la solicitud" });
    }

    console.log(`[contacto] Correo enviado a ${process.env.CONTACT_EMAIL}`);
    return res.status(200).json({ message: "Mensaje recibido correctamente" });
  } catch (error) {
    if ((error as Error)?.name === "AbortError") {
      console.error("[contacto] La API de correo no respondió en 15 s.");
    } else {
      console.error("[contacto] No se pudo llamar a la API de correo:", error);
    }
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}
