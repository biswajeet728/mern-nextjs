import * as z from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email({
      message: "Invalid email address.",
    })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters long"),
});

export const signUpSchema = signinSchema.extend({
  username: z
    .string()
    .min(1, "Username is required.")
    .max(8, "Username must be less than 8 characters."),
});

export type SignInInput = z.infer<typeof signinSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
