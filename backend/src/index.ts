import { createApp } from "./app";
import { env } from "./utils/env";
import { logger } from "./utils/logger";

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(`Backend listening on http://localhost:${env.PORT}`);
});
