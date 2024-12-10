import crypto from "node:crypto";

export function hashString(text: string, salt?: string): string {
  const saltToUse = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .createHmac("sha256", saltToUse)
    .update(text)
    .digest("hex");
  return hash;
}
