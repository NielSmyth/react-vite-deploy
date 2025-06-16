import { db } from "@/lib/db";
import { emailTemplates, sendEmail } from "@/lib/email";
import { v4 as uuidv4 } from "uuid";
import { addHours } from "date-fns";
import bcrypt from "bcryptjs";

export async function sendPasswordResetEmail(email: string) {
  // 1. Find user
  const user = await db.user.findUnique({ where: { email } });

  // Don't reveal if user doesn't exist
  if (!user) return;

  // 2. Create reset token
  const token = uuidv4();
  const expires = addHours(new Date(), 1);

  // 3. Delete any existing tokens and create new one
  await db.$transaction([
    db.passwordResetToken.deleteMany({ where: { userId: user.id } }),
    db.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    }),
  ]);

  // 4. Send email
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  await sendEmail({
    to: user.email,
    ...emailTemplates.resetPassword(user.name, resetLink),
  });
}

export async function resetPassword(token: string, newPassword: string) {
  // 1. Find the token
  const resetToken = await db.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken) throw new Error("Invalid token");
  if (new Date() > resetToken.expires) {
    await db.passwordResetToken.delete({ where: { id: resetToken.id } });
    throw new Error("Token expired");
  }

  // 2. Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 3. Update user password and delete token
  await db.$transaction([
    db.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    }),
    db.passwordResetToken.delete({ where: { id: resetToken.id } }),
  ]);

  // 4. Send confirmation email
  await sendEmail({
    to: resetToken.user.email,
    ...emailTemplates.passwordChanged(resetToken.user.name),
  });
}