import nodemailer from "nodemailer";
import { config } from "./helper";

export const sendEmail = async (to: string, link: string) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: config.NODEMAILER_USER,
      pass: config.NODEMAILER_PASS,
    },
  });

  transport.sendMail({
    from: config.NODEMAILER_FROM,
    to,
    subject: "Email Verification | SazzyStore",
    html: `<!DOCTYPE html>
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
    </html>`,
  });
};
