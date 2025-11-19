import { z } from "zod";
import { password } from "../../login/validations/login";

export const resetPasswordSchema = z
  .object({
    password,
    password_confirmation: password,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match.",
    path: ["password_confirmation"],
  });

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
