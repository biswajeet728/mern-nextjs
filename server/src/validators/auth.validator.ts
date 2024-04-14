import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string({ required_error: "Please add username" })
    .min(7, {
      message: "Username must be at least 7 characters",
    })
    .max(255),
  email: z
    .string({ required_error: "Please add email" })
    .email({
      message: "Please add a valid email",
    })
    .trim()
    .min(7)
    .max(255)
    .toLowerCase(),
  password: z
    .string({ required_error: "Please add password" })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255),
  role: z.enum(["user", "admin"]).default("user"),
  avatar: z
    .object({
      url: z.string(),
      public_id: z.string(),
    })
    .optional(),
  bio: z.string().optional(),
  isSocialLogin: z.boolean().default(false),
  verified: z.boolean().default(false),
  googleId: z.string().optional(),
});

export const authVerifySchema = z.object({
  id: z.string().refine((value) => isValidObjectId(value), {
    message: "Invalid user id",
    path: ["id"],
  }),
  token: z.string({
    required_error: "Please add token",
  }),
});
