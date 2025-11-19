import z from "zod";
import { email } from "../../login/validations/login";

export const ForgotPasswordSchema = z.object({
  email,
});

export type TForgotpasword = z.infer<typeof ForgotPasswordSchema>;
