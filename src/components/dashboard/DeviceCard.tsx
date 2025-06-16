"use client";

import { Device } from "@/lib/types";
import { toggleDevice } from "@/lib/api/devices";

import { useState } from "react";

export default function DeviceCard({ device }: { device: Device }) {
  const [isLoading, setIsLoading] = useState(false);
  const [localDevice, setLocalDevice] = useState(device);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const updatedDevice = await toggleDevice(localDevice.id);
      setLocalDevice(updatedDevice);
    } catch (error) {
      console.error("Failed to toggle device:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceIcon = () => {
    switch (localDevice.type) {
      case "light":
        return (
          <div
            className={`h-12 w-12 rounded-full ${
              localDevice.status === "on" ? "bg-green-300" : "bg-gray-300"
            }`}
          ></div>
        );
      case "thermostat":
        return (
          <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-center text-2xl">
            {localDevice.temperature}°
          </div>
        );
      case "camera":
        return (
          <div className="h-12 w-12 rounded-full bg-gray-100 p-2 text-center text-2xl">
            📷
          </div>
        );
      case "lock":
        return (
          <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-center text-2xl">
            {localDevice.status === "on" ? "🔒" : "🔓"}
          </div>
        );
      default:
        return (
          <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-center text-2xl">
            ?
          </div>
        );
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {getDeviceIcon()}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {localDevice.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {localDevice.room}
            </p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
            localDevice.status === "on" ? "bg-indigo-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              localDevice.status === "on" ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      <div className="mt-4">
        {localDevice.type === "thermostat" && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Temperature
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {localDevice.temperature}°C
            </span>
          </div>
        )}
        {localDevice.type === "camera" && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Status
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {localDevice.status === "on" ? "Active" : "Inactive"}
            </span>
          </div>
        )}
        {localDevice.type === "lock" && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Status
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {localDevice.status === "on" ? "Locked" : "Unlocked"}
            </span>
          </div>
        )}
        {localDevice.type === "light" && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Status
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {localDevice.status === "on" ? "Switched On" : "Switched Off"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}