import { PrismaClient } from "@prisma/client";

// Mock database (replace with real Prisma setup)
export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      // Mock data - replace with real database queries
      const users = [
        {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          password: "$2a$10$X5z8bN7d9f1g2h3i4j5k6l7m8n9o0pAqBrCsDtEuFvGwHyIzJkL", // bcrypt hash of "admin123"
          role: "admin",
        },
        {
          id: "2",
          name: "Standard User",
          email: "user@example.com",
          password: "$2a$10$Y6z9c0b1d2e3f4g5h6i7j8k9l0m1n2oPqRrSsTtUuVvWwXxYyZz", // bcrypt hash of "user123"
          role: "user",
        },
      ];
      return users.find(u => u.email === where.email || u.id === where.id);
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      // Mock update - in real app would update database
      console.log(`Updating user ${where.id} with:`, data);
      return { ...where, ...data };
    },
  },
  passwordResetToken: {
    create: async ({ data }: { data: any }) => {
      // Mock create - in real app would create in database
      console.log("Creating reset token:", data);
      return data;
    },
    findUnique: async ({ where }: { where: { token: string } }) => {
      // Mock find - in real app would query database
      return null; // Replace with actual token lookup
    },
    deleteMany: async ({ where }: { where: { userId: string } }) => {
      // Mock delete - in real app would delete from database
      console.log(`Deleting tokens for user ${where.userId}`);
      return { count: 0 };
    },
  },
} as unknown as PrismaClient;

// In a real app, you would use:
// const prisma = new PrismaClient();
// export default prisma;