"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    signIn,
    signOut,
  };
};

export const useUserRole = () => {
  const { user } = useAuth();
  return user?.role || null;
};

export const protectPage = (allowedRoles: string[] = []) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return { allowed: false, isLoading: true };

  if (!isAuthenticated) return { allowed: false, redirect: "/login" };

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || "")) {
    return { allowed: false, redirect: "/dashboard" };
  }

  return { allowed: true };
};