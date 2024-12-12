import { z } from "zod";

export const clientConfigurationSchema = z.object({
  dbUrl: z.string().url(),
  kvUrl: z.string().url(),
  smtpHost: z.string(),
  smtpPort: z.number(),
  smtpAuthUser: z.string().email(),
  smtpAuthPassword: z.string(),
  smtpSecure: z.boolean()
});

export const serverConfigurationSchema = z.object({});
