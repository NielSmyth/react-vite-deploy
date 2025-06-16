export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

export type Device = {
  id: string;
  name: string;
  type: "light" | "thermostat" | "camera" | "lock";
  status: "on" | "off";
  room: string;
  temperature?: number;
};

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }
  interface Session {
    user?: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}