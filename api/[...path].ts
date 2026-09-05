import type { IncomingMessage, ServerResponse } from "http";

/**
 * Vercel serverless entry point for the Express API.
 *
 * Counterpart of netlify/functions/api.ts: both wrap the same createServer()
 * app so /api/* behaves identically on either host.
 *
 * `[...path]` is Vercel's documented catch-all for Functions, so every
 * /api/<something> reaches this file with its original URL intact — no rewrite
 * needed, and Express sees the path it registered its routes under.
 *
 * The app is built lazily and cached: if construction throws, the error is
 * reported as a normal 500 with a logged stack instead of an opaque
 * FUNCTION_INVOCATION_FAILED with nothing to go on.
 */
type NodeHandler = (req: IncomingMessage, res: ServerResponse) => void;

let app: NodeHandler | undefined;

async function getApp(): Promise<NodeHandler> {
  if (!app) {
    const { createServer } = await import("../server/index.js");
    app = createServer() as unknown as NodeHandler;
  }
  return app;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    // Depending on how the request was routed, the function can receive the
    // path with or without its /api prefix. Express registers its routes under
    // /api, so normalise before delegating.
    if (req.url && !req.url.startsWith("/api")) {
      req.url = req.url === "/" ? "/api" : `/api${req.url}`;
    }

    const express = await getApp();
    express(req, res);
  } catch (error) {
    console.error("[api] La función falló al arrancar:", error);

    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          error: "Error interno del servidor",
          detail: error instanceof Error ? error.message : String(error),
        }),
      );
    }
  }
}
