"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateUser } from "@/lib/auth/account";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!session?.user?.id) throw new Error("User not authenticated");
      
      await updateUser(session.user.id, { name, email });
      
      // Optionally, refresh the page or session here if needed
      setMessage("Account updated successfully");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 text-black dark:text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Account Settings
        </h1>
        <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
          Update your account information
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {message && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-600">{message}</p>
        </div>
      )}

      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}