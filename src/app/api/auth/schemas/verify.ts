import { z } from "zod";

export const verifySchama = z.object({
  email: z.string().email(),
  otp: z.string(),
});
