import { z, ZodError } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce
    .number({
      message: "PORT must be a number",
    })
    .default(3000),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"], {
      message:
        "LOG_LEVEL must be one of 'trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'",
    })
    .default("debug"),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error: any) {
  const e = error as ZodError;
  console.error(e.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export { env };
