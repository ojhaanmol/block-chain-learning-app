import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(), //.min(1).max(20),
  username: z.string(), //.min(3).max(10),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string(),
});
