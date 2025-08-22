import type { ErrorRequestHandler } from "express";
import { env } from "../utils/env";
import { logger } from "../utils/logger";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error("Unhandled error", err);
  const message =
    env.NODE_ENV === "production"
      ? "Internal server error"
      : String(err?.message ?? err);
  res.status(500).json({ error: message });
};
