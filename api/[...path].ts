import type { IncomingMessage, ServerResponse } from "http";
import { createServer } from "../server";

/**
 * Vercel serverless entry point for the Express API.
 *
 * This is the Vercel counterpart of netlify/functions/api.ts: both wrap the
 * same createServer() app so /api/* behaves identically on either host.
 *
 * The app is created once, outside the handler, so warm invocations reuse it.
 */
const app = createServer();

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // Depending on how the request was routed, the function can receive the path
  // with or without its /api prefix. Express registers its routes under /api,
  // so normalise before delegating.
  if (req.url && !req.url.startsWith("/api")) {
    req.url = req.url === "/" ? "/api" : `/api${req.url}`;
  }

  return (app as unknown as (a: IncomingMessage, b: ServerResponse) => void)(
    req,
    res,
  );
}
