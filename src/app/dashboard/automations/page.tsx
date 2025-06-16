"use client";

import { useState } from "react";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState([
    {
      id: "1",
      name: "Good Morning",
      description: "Turn on lights and adjust thermostat at 7:00 AM",
      enabled: true,
    },
    {
      id: "2",
      name: "Away Mode",
      description: "Turn off all lights and lower thermostat when no one is home",
      enabled: true,
    },
    {
      id: "3",
      name: "Energy Saver",
      description: "Reduce energy usage during peak hours",
      enabled: false,
    },
  ]);

  const toggleAutomation = (id: string) => {
    setAutomations(
      automations.map((auto) =>
        auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Automations
        </h1>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add Automation
        </button>
      </div>

      <div className="space-y-4">
        {automations.map((automation) => (
          <div
            key={automation.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {automation.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {automation.description}
                </p>
              </div>
              <button
                onClick={() => toggleAutomation(automation.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  automation.enabled
                    ? "bg-indigo-600"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    automation.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}