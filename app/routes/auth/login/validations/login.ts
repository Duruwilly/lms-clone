import z from "zod";

export const email = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address.");

export const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character.",
  });

export const LoginSchema = z.object({
  email,
  password,
});

export type TLogin = z.infer<typeof LoginSchema>;
