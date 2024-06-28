"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerifySchema = exports.signUpSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: "Please add username" })
        .min(7, {
        message: "Username must be at least 7 characters",
    })
        .max(255),
    email: zod_1.z
        .string({ required_error: "Please add email" })
        .email({
        message: "Please add a valid email",
    })
        .trim()
        .min(7)
        .max(255)
        .toLowerCase(),
    password: zod_1.z
        .string({ required_error: "Please add password" })
        .min(6, {
        message: "Password must be at least 6 characters",
    })
        .max(255)
        .optional(),
    role: zod_1.z.enum(["user", "admin"]).default("user"),
    avatar: zod_1.z
        .object({
        url: zod_1.z.string(),
        public_id: zod_1.z.string(),
    })
        .optional(),
    bio: zod_1.z.string().optional(),
    isSocialLogin: zod_1.z.boolean().default(false),
    verified: zod_1.z.boolean().default(false),
    googleId: zod_1.z.string().optional(),
});
exports.authVerifySchema = zod_1.z.object({
    id: zod_1.z.string().refine((value) => (0, mongoose_1.isValidObjectId)(value), {
        message: "Invalid user id",
        path: ["id"],
    }),
    token: zod_1.z.string({
        required_error: "Please add token",
    }),
});
