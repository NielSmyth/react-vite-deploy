"use client";

import { useState, useEffect } from "react";
import DeviceCard from "@/components/dashboard/DeviceCard";
import { fetchDevices } from "@/lib/api/devices";
import { Device } from "@/lib/types";
import ThemeToggle from "@/components/dashboard/ThemeToggle";

export default function DashboardPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => {
          // Randomly toggle some device states
          if (Math.random() > 0.9) {
            return {
              ...device,
              status: device.status === "on" ? "off" : "on",
              ...(device.type === "thermostat"
                ? {
                    temperature:
                      (typeof device.temperature === "number"
                        ? device.temperature
                        : parseFloat(device.temperature ?? "20")) +
                      (Math.random() > 0.5 ? 1 : -1),
                  }
                : {}),
            };
          }
          return device;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredDevices = devices.filter((device) => {
    if (activeTab === "all") return true;
    return device.type === activeTab;
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold justify-center text-gray-900 dark:text-white">
          Smart Home Dashboard
        </h1>
        <ThemeToggle />
      </div>

      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        {["all", "light", "thermostat", "camera", "lock"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium capitalize ${
              activeTab === tab
                ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDevices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}