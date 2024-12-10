import { z } from "zod";

export const clientConfigurationSchema = z.object({
  dbUrl: z.string().url(),
  kvUrl: z.string().url(),
});

export const serverConfigurationSchema = z.object({});
