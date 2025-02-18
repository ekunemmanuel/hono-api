import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import now from "performance-now";
import { env } from "./env";

// Polyfill performance API
if (typeof performance === "undefined") {
  (globalThis as any).performance = {
    now: now,
  } as Performance;
}

export function pinoLogger() {
  return logger({
    pino: pino({
      level: env.LOG_LEVEL,
    }),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
