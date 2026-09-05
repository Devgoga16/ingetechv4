import dotenv from "dotenv";

// .env.local primero. dotenv no sobrescribe lo que ya está definido, así que lo
// que esté aquí gana sobre .env. Es donde deben vivir las credenciales: el
// .gitignore ignora *.local, mientras que .env SÍ está versionado en este repo.
dotenv.config({ path: ".env.local" });
dotenv.config();

import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { handleContact } from "./routes/contact.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);

  return app;
}
