"use client";

import { useState, useEffect } from "react";
import { fetchDevices } from "@/lib/api/devices";
import { Device } from "@/lib/types";

export default function RoomsPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const data = await fetchDevices();
        setDevices(data);
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  // Group devices by room
  const rooms = devices.reduce((acc, device) => {
    if (!acc[device.room]) {
      acc[device.room] = [];
    }
    acc[device.room].push(device);
    return acc;
  }, {} as Record<string, Device[]>);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rooms</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(rooms).map(([roomName, roomDevices]) => (
          <div
            key={roomName}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {roomName}
            </h2>
            <div className="space-y-3">
              {roomDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {device.name}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      device.status === "on"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {device.status === "on" ? "ON" : "OFF"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}