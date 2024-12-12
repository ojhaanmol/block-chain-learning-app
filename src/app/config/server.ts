import "dotenv";
import { serverConfigurationSchema } from "./schema";

serverConfigurationSchema.parse({
  dbUrl: (''+process.env.DATABASE_URL),
  kvUrl: (''+process.env.KV_URL),
  smtpHost: process.env.SMTP_HOST,
  smtpPort: +(''+process.env.SMTP_PORT),
  smtpAuthUser: (''+process.env.SMTP_AUTH_USER),
  smtpAuthPassword: (''+process.env.SMTP_AUTH_PASS),
  smtpSecure: (''+process.env.SMTP_SET_SECURE),
});

export const dbUrl = process.env.DATABASE_URL;
export const kvUrl = process.env.KV_URL ?? "";
export const smtpHost = process.env.SMTP_HOST;
export const smtpPort = +(''+process.env.SMTP_PORT);
export const smtpAuthUser = process.env.SMTP_AUTH_USER;
export const smtpAuthPassword = process.env.SMTP_AUTH_PASS;
export const smtpSecure = process.env.SMTP_SET_SECURE;
export const smtpOwner = process.env.SMTP_OWNER;