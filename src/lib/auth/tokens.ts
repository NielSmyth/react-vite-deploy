import { db } from "./db";
import crypto from "crypto";
import { addHours } from "date-fns";

export async function generatePasswordResetToken(userId: string) {
  // 1. Delete any existing tokens for this user
  await db.passwordResetToken.deleteMany({
    where: { userId },
  });

  // 2. Generate new token
  const token = crypto.randomBytes(32).toString("hex");
  const expires = addHours(new Date(), 1); // 1 hour expiration

  // 3. Save token to database
  await db.passwordResetToken.create({
    data: {
      token,
      userId,
      expires,
    },
  });

  return token;
}

export async function verifyPasswordResetToken(token: string) {
  // 1. Find token in database
  const resetToken = await db.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) return null;

  // 2. Check if token is expired
  if (new Date() > resetToken.expires) {
    await db.passwordResetToken.delete({
      where: { id: resetToken.id },
    });
    return null;
  }

  return {
    userId: resetToken.userId,
    token: resetToken.token,
  };
}