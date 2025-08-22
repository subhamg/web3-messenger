type LogLevel = "info" | "error" | "warn" | "debug";

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const ts = new Date().toISOString();
  const base = `[${ts}] [${level.toUpperCase()}] ${message}`;
  // Keep it simple; pluggable later
  if (meta) {
    console.log(base, meta);
  } else {
    console.log(base);
  }
}

export const logger = {
  info: (msg: string, meta?: Record<string, unknown>) => log("info", msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) =>
    log("error", msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => log("warn", msg, meta),
  debug: (msg: string, meta?: Record<string, unknown>) =>
    log("debug", msg, meta),
};
