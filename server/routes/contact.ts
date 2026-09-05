import { Request, Response } from "express";
import nodemailer from "nodemailer";

/** Sin estas variables no se puede enviar nada. */
const REQUIRED_ENV = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const;

/** El mensaje del visitante acaba dentro de un correo HTML: hay que escaparlo. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Las cabeceras de un correo son de una sola línea: un \n permite inyectar otras. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleContact(req: Request, res: Response) {
  const { name, email, phone, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(
      `[contacto] Faltan variables de entorno: ${missing.join(", ")}.\n` +
        "  Sin SMTP_HOST, nodemailer se conecta a localhost:587 y falla con ECONNREFUSED.\n" +
        "  Defínelas en .env.local (desarrollo) o en Environment Variables de Vercel (producción).",
    );
    return res.status(503).json({
      error: "El envío de correo no está configurado en el servidor.",
    });
  }

  try {
    // El 465 usa TLS desde el primer byte; el 587 empieza en claro y sube a TLS
    // con STARTTLS. Fijar `secure: false` siempre rompe el 465.
    const port = Number(process.env.SMTP_PORT) || 587;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const cleanName = singleLine(String(name));
    const cleanPhone = phone ? singleLine(String(phone)) : "No especificado";
    const cleanEmail = singleLine(String(email));
    const bodyText = String(message);

    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      // Responder al correo contesta directamente al visitante.
      replyTo: EMAIL_PATTERN.test(cleanEmail) ? cleanEmail : undefined,
      subject: `Nuevo mensaje de contacto de ${cleanName}`,
      text: [
        "Nuevo mensaje de contacto",
        "",
        `Nombre: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Teléfono: ${cleanPhone}`,
        "",
        "Mensaje:",
        bodyText,
      ].join("\n"),
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(cleanPhone)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(bodyText).replace(/\n/g, "<br />")}</p>
      `,
    });

    console.log("Email enviado correctamente");
    return res.status(200).json({ message: "Mensaje recibido correctamente" });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException)?.code;

    if (
      code === "ECONNREFUSED" ||
      code === "ETIMEDOUT" ||
      code === "ESOCKET" ||
      code === "EDNS"
    ) {
      console.error(
        `[contacto] No se pudo conectar a ${process.env.SMTP_HOST}:${process.env.SMTP_PORT || 587} (${code}).\n` +
          "  Revisa el host y el puerto, y que el proveedor permita conexiones salientes.",
        error,
      );
    } else if (code === "EAUTH") {
      console.error(
        "[contacto] El servidor SMTP rechazó las credenciales (EAUTH).\n" +
          "  Con Gmail hace falta una contraseña de aplicación, no la del correo.",
        error,
      );
    } else {
      console.error("Error al enviar email:", error);
    }

    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}
