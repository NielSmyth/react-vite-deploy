"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const energyData = [
  { name: "12AM", usage: 0.2 },
  { name: "3AM", usage: 0.1 },
  { name: "6AM", usage: 0.5 },
  { name: "9AM", usage: 1.2 },
  { name: "12PM", usage: 1.5 },
  { name: "3PM", usage: 1.3 },
  { name: "6PM", usage: 2.1 },
  { name: "9PM", usage: 1.8 },
  { name: "12PM", usage: 0.7 },
];

const deviceEnergyData = [
  { name: "Living Room Light", usage: 45 },
  { name: "Kitchen Light", usage: 30 },
  { name: "Thermostat", usage: 120 },
  { name: "Refrigerator", usage: 90 },
  { name: "TV", usage: 60 },
];

export default function EnergyPage() {
  const [timeRange, setTimeRange] = useState("day");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Energy Usage
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange("day")}
            className={`rounded-md px-3 py-1 text-sm ${
              timeRange === "day"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeRange("week")}
            className={`rounded-md px-3 py-1 text-sm ${
              timeRange === "week"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`rounded-md px-3 py-1 text-sm ${
              timeRange === "month"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Hourly Consumption (kWh)
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Device Usage (Watt-hours)
          </h2>
          <div className="space-y-3">
            {deviceEnergyData.map((device) => (
              <div key={device.name} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {device.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {device.usage} Wh
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{
                      width: `${Math.min(100, (device.usage / 150) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}