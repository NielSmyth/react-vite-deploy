"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { changePassword } from "@/lib/auth/account";

export default function PasswordSettingsPage() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!session?.user?.id) throw new Error("User not authenticated");
      
      await changePassword(session.user.id, currentPassword, newPassword);
      setMessage("Password updated successfully");
      
      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Change Password
        </h1>
        <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
          Update your account password
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
            htmlFor="currentPassword"
            className="block mb-1 text-sm font-medium"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block mb-1 text-sm font-medium"
          >
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-sm font-medium"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}