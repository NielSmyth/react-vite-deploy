import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function updateUser(
  userId: string,
  data: { name?: string; email?: string }
) {
  return db.user.update({
    where: { id: userId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  // 1. Get user with password
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  // 2. Verify current password
  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) throw new Error("Current password is incorrect");

  // 3. Hash and update password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}