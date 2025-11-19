import { z } from "zod";

export const emailVerificationSchema = z.object({
  otp: z.string().min(6).max(6),
});

export type EmailVerificationDto = z.infer<typeof emailVerificationSchema>;
