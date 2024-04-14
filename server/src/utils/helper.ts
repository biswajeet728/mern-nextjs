import "dotenv/config";
import { cleanEnv, str, num } from "envalid";
import nodemailer from "nodemailer";

export const config = cleanEnv(process.env, {
  MONGO_URI: str(),
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
  NEXT_PUBLIC_API_URL: str({}),
  NODEMAILER_USER: str({}),
  NODEMAILER_PASS: str({}),
  NODEMAILER_FROM: str({}),
});

export class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
