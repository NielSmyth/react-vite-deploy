"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { 
  HomeIcon, 
  MoonIcon, 
  TvIcon, 
  BookOpenIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import { activateScene } from '@/lib/api/scenes';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSceneActivation = async (sceneId: "away" | "welcome" | "sleep" | "entertain") => {
    try {
      await activateScene(sceneId);
      alert(`Activated Scene: ${sceneId} Mode`);
    } catch (error) {
      console.error("Failed to activate scene:", error);
      alert("Failed to activate scene");
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white lg:hidden"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg dark:bg-gray-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Smart Home
            </h1>
          </div>
          
          {/* User Profile Section */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <UserCircleIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {session?.user?.email || "user@example.com"}
                </p>
                <p className="text-xs capitalize text-indigo-600 dark:text-indigo-400">
                  {session?.user?.role || "user"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <h2 className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSceneActivation("away")}
                className="flex flex-col items-center justify-center space-y-1 rounded-lg p-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BookOpenIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className='text-gray-700 dark:text-gray-300'>Away Mode</span>
              </button>
              <button
                onClick={() => handleSceneActivation("welcome")}
                className="flex flex-col items-center justify-center space-y-1 rounded-lg p-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <HomeIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className='text-gray-700 dark:text-gray-300'>Welcome</span>
              </button>
              <button
                onClick={() => handleSceneActivation("sleep")}
                className="flex flex-col items-center justify-center space-y-1 rounded-lg p-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span  className='text-gray-700 dark:text-gray-300'>Sleep</span>
              </button>
              <button
                onClick={() => handleSceneActivation("entertain")}
                className="flex flex-col items-center justify-center space-y-1 rounded-lg p-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TvIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className='text-gray-700 dark:text-gray-300'>Movie Night</span>
              </button>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/dashboard"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === "/dashboard"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/rooms"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === "/dashboard/rooms"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Rooms</span>
            </Link>
            <Link
              href="/dashboard/scenes"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === "/dashboard/scenes"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Scenes</span>
            </Link>
            <Link
              href="/dashboard/automations"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === "/dashboard/automatios"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Automation</span>
            </Link>
            <Link
              href="/dashboard/energy"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === "/dashboard/energy"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Energy Usuage</span>
            </Link>
            <Link
              href="/settings/account"
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                pathname === "/settings/account"
                  ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Profile</span>
            </Link>
            {session?.user?.role === "admin" && (
              <Link
                href="/dashboard/admin"
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                  pathname === "/dashboard/admin"
                    ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* System Status */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                System Status
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}