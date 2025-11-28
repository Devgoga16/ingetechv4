import { Request, Response } from "express";
import nodemailer from "nodemailer";

export async function handleContact(req: Request, res: Response) {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // Configuración del transporter (debes configurar estas variables de entorno)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Contenido del email
        const mailOptions = {
            from: `"Formulario Web" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // A quién se le envía el correo
            subject: `Nuevo mensaje de contacto de ${name}`,
            html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No especificado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
        };

        // Enviar el email
        await transporter.sendMail(mailOptions);
        console.log("Email enviado correctamente");

        return res.status(200).json({ message: "Mensaje recibido correctamente" });
    } catch (error) {
        console.error("Error al enviar email:", error);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
}
