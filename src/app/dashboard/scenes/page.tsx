"use client";

import { useState, useEffect } from "react";
import { getAvailableScenes, activateScene } from "@/lib/api/scenes";
import { BoltIcon, HomeIcon, TvIcon } from "@heroicons/react/24/solid";
import { FaDoorOpen, FaBed } from "react-icons/fa";

export default function ScenesPage() {
  const [scenes, setScenes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeScene, setActiveScene] = useState<string | null>(null);

  useEffect(() => {
    const loadScenes = async () => {
      try {
        const data = await getAvailableScenes();
        setScenes(data as string[]);
      } catch (error) {
        console.error("Failed to fetch scenes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadScenes();
  }, []);

  const handleActivateScene = async (sceneId: string) => {
    setActiveScene(sceneId);
    try {
      await activateScene(sceneId as never);
      // Reset active scene after 2 seconds
      setTimeout(() => setActiveScene(null), 2000);
    } catch (error) {
      console.error("Failed to activate scene:", error);
      setActiveScene(null);
    }
  };

  const getSceneIcon = (sceneId: string) => {
    switch (sceneId) {
      case "away":
        return <FaDoorOpen size={24} />;
      case "welcome":
        return <HomeIcon className="h-6 w-6" />;
      case "sleep":
        return <FaBed size={24} />;
      case "entertain":
        return <TvIcon className="h-6 w-6" />;
      default:
        return <BoltIcon className="h-6 w-6" />;
    }
  };

  const getSceneName = (sceneId: string) => {
    switch (sceneId) {
      case "away":
        return "Away Mode";
      case "welcome":
        return "Welcome Home";
      case "sleep":
        return "Good Night";
      case "entertain":
        return "Movie Night";
      default:
        return sceneId;
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Scenes</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {scenes.map((sceneId) => (
          <button
            key={sceneId}
            onClick={() => handleActivateScene(sceneId)}
            disabled={activeScene === sceneId}
            className={`flex flex-col items-center justify-center space-y-3 rounded-lg border p-6 transition-all ${
              activeScene === sceneId
                ? "border-indigo-500 bg-indigo-50 dark:bg-gray-700"
                : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                activeScene === sceneId
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {getSceneIcon(sceneId)}
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {getSceneName(sceneId)}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeScene === sceneId
                ? "Activating..."
                : "Click to activate"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}