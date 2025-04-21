import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, "Please enter a password").trim(),
});

export type UserSession = {
  token?: string;
  user_id?: number;
  regno?: number;
  error?: string;
};
