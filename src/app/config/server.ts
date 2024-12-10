import "dotenv";
import { serverConfigurationSchema } from "./schema";

serverConfigurationSchema.parse({
  dbUrl: process.env.DATABASE_URL,
  kvUrl: process.env.KV_URL,
});

export const dbUrl = process.env.DATABASE_URL;
export const kvUrl = process.env.KV_URL ?? "";
