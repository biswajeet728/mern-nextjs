import "dotenv/config";
import { cleanEnv, str, num } from "envalid";

export const config = cleanEnv(process.env, {
  MONGO_URI: str(),
  MONGO_DB: str(),
  NODE_ENV: str({
    choices: ["production", "development"],
    default: "development",
  }),
  PORT: num({
    default: 8800,
  }),
  JWT_SECRET: str({
    default: "uhdgufh37y378rhufdjf",
  }),
  CLIENT_URL: str({}),
  CLIENT_DOMAIN: str({}),
  NEXT_PUBLIC_API_URL: str({}),
  ADMIN_CLIENT_URL: str({}),
  NODEMAILER_USER: str({}),
  NODEMAILER_PASS: str({}),
  NODEMAILER_FROM: str({}),

  GOOGLE_CLIENT_ID: str({}),
  GOOGLE_CLIENT_SECRET: str({}),

  GOOGLE_CALLBACK_URL: str({}),

  SESSION_SECRET: str({}),

  CLOUDINARY_NAME: str({}),
  CLOUDINARY_API_KEY: str({}),
  CLOUDINARY_API_SECRET: str({}),

  STRIPE_PUBLIC_KEY: str({}),
  STRIPE_SECRET: str({}),
  STRIPE_WEBHOOK_SECRET: str({}),
});

export class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
