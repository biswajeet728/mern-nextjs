"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const helper_1 = require("./helper");
const sendEmail = async (to, link, type = "user-registration") => {
    var transport = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: helper_1.config.NODEMAILER_USER,
            pass: helper_1.config.NODEMAILER_PASS,
        },
    });
    transport.sendMail({
        from: helper_1.config.NODEMAILER_FROM,
        to,
        subject: "Email Verification | SazzyStore",
        html: type === "user-registration"
            ? `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Company - Welcome</title>
        <style>
            /* Add your custom CSS styles here */
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #333;
            }
            .content {
                margin-bottom: 20px;
            }
            .footer {
                color: #666;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to SazzyStore</h1>
            </div>
            <div class="content">
                <p>Dear User,</p>
                <p>Thank you for signing up with Your Company. We are excited to have you on board!</p>
                <p>If you have any questions or need assistance, please feel free to contact us.</p>
                <p>Best regards,<br>Your Company Team</p>
            </div>
            <div class="footer">
                <p>Please click this link to verify your account</p>
                <a href="${link}" target="_blank">Verify Here</a>
            </div>
        </div>
    </body>
    </html>`
            : type === "forgot-password"
                ? `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Company - Reset Password</title>
        <style>
            /* Add your custom CSS styles here */
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #333;
            }
            .content {
                margin-bottom: 20px;
            }
            .footer {
                color: #666;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Reset Your Password</h1>
            </div>
            <div class="content">
                <p>Dear User,</p>
                <p>We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
                <p>Best regards,<br>Your Company Team</p>
            </div>
            <div class="footer">
                <p>Please click this link to reset your password</p>
                <a href="${link}" target="_blank">Reset Password</a>
            </div>
        </div>
    </body>
    </html>`
                : "",
    });
};
exports.sendEmail = sendEmail;
