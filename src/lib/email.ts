import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
    console.warn("Email service not configured - running in demo mode");
    console.log(`Would send email to ${to} with subject: ${subject}`);
    console.log(`Email content:\n${html}`);
    return;
  }

  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    text: text || html.replace(/<[^>]*>/g, ""),
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

export const emailTemplates = {
  resetPassword: (name: string, resetLink: string) => ({
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Smart Home Automation</h1>
        <p>Hello ${name},</p>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <div style="margin: 20px 0;">
          <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} Smart Home Automation. All rights reserved.
        </p>
      </div>
    `,
  }),
  passwordChanged: (name: string) => ({
    subject: "Your password has been changed",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Smart Home Automation</h1>
        <p>Hello ${name},</p>
        <p>This is a confirmation that the password for your account has been changed.</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} Smart Home Automation. All rights reserved.
        </p>
      </div>
    `,
  }),
};