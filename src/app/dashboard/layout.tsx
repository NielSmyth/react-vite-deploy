import Sidebar from "@/components/dashboard/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">
      <Sidebar user={session.user} />
      <div className="flex-1 overflow-auto p-6 lg:ml-64">{children}</div>
    </div>
  );
}