"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.ErrorHandler = exports.config = void 0;
require("dotenv/config");
const envalid_1 = require("envalid");
exports.config = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_URI: (0, envalid_1.str)(),
    MONGO_DB: (0, envalid_1.str)(),
    NODE_ENV: (0, envalid_1.str)({
        choices: ["production", "development"],
        default: "development",
    }),
    PORT: (0, envalid_1.num)({
        default: 8800,
    }),
    JWT_SECRET: (0, envalid_1.str)({
        default: "uhdgufh37y378rhufdjf",
    }),
    CLIENT_URL: (0, envalid_1.str)({}),
    NEXT_PUBLIC_API_URL: (0, envalid_1.str)({}),
    ADMIN_CLIENT_URL: (0, envalid_1.str)({}),
    NODEMAILER_USER: (0, envalid_1.str)({}),
    NODEMAILER_PASS: (0, envalid_1.str)({}),
    NODEMAILER_FROM: (0, envalid_1.str)({}),
    GOOGLE_CLIENT_ID: (0, envalid_1.str)({}),
    GOOGLE_CLIENT_SECRET: (0, envalid_1.str)({}),
    GOOGLE_CALLBACK_URL: (0, envalid_1.str)({}),
    SESSION_SECRET: (0, envalid_1.str)({}),
    CLOUDINARY_NAME: (0, envalid_1.str)({}),
    CLOUDINARY_API_KEY: (0, envalid_1.str)({}),
    CLOUDINARY_API_SECRET: (0, envalid_1.str)({}),
    STRIPE_PUBLIC_KEY: (0, envalid_1.str)({}),
    STRIPE_SECRET: (0, envalid_1.str)({}),
    STRIPE_WEBHOOK_SECRET: (0, envalid_1.str)({}),
});
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.ErrorHandler = ErrorHandler;
exports.cookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: exports.config.NODE_ENV === "development" ? false : true,
};
