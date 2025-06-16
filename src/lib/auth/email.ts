// Mock email sender (replace with real email service like SendGrid, Mailgun, etc.)
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  console.log(`Sending email to ${to} with subject: ${subject}`);
  console.log(`Email content:\n${html}`);

  // In production, you would use a real email service here
  // Example with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  await sgMail.send({
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  });
  */

  return Promise.resolve();
}