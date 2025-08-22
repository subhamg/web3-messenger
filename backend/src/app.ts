import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { verifyRouter } from "./routes/verify.route";
import { env } from "./utils/env";
import { errorHandler } from "./middleware/error";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/", verifyRouter);

  app.use(errorHandler);
  return app;
}
