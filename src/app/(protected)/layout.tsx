"use client";

import { useRouter } from "next/navigation";
import { protectPage } from "@/lib/authUtils";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { allowed, redirect, isLoading } = protectPage();

  useEffect(() => {
    if (!isLoading && !allowed && redirect) {
      router.push(redirect);
    }
  }, [allowed, isLoading, redirect, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}