import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const password = await bcrypt.hash("admin123", 10);
  
  await db.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password,
      role: "ADMIN",
    },
  });

  const userPassword = await bcrypt.hash("user123", 10);
  await db.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Standard User",
      password: userPassword,
      role: "USER",
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });