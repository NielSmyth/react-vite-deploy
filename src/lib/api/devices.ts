import { Device } from "@/lib/types";

// Mock data for devices
const mockDevices: Device[] = [
  {
    id: "1",
    name: "Living Room Light",
    type: "light",
    status: "off",
    room: "Living Room",
  },
  {
    id: "2",
    name: "Kitchen Light",
    type: "light",
    status: "on",
    room: "Kitchen",
  },
  {
    id: "3",
    name: "Bedroom Thermostat",
    type: "thermostat",
    status: "on",
    room: "Bedroom",
    temperature: 22,
  },
  {
    id: "4",
    name: "Front Door Camera",
    type: "camera",
    status: "on",
    room: "Entrance",
  },
  {
    id: "5",
    name: "Front Door Lock",
    type: "lock",
    status: "on",
    room: "Entrance",
  },
  {
    id: "6",
    name: "Bathroom Light",
    type: "light",
    status: "off",
    room: "Bathroom",
  },
];

// Simulate API calls
export async function fetchDevices(): Promise<Device[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDevices]);
    }, 500);
  });
}

export async function toggleDevice(id: string): Promise<Device> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deviceIndex = mockDevices.findIndex((device) => device.id === id);
      if (deviceIndex === -1) {
        reject(new Error("Device not found"));
        return;
      }

      const device = mockDevices[deviceIndex];
      const updatedDevice = {
        ...device,
        status: device.status === "on" ? "off" : "on",
        ...(device.type === "thermostat" && device.status === "off"
          ? { temperature: 18 }
          : {}),
      };

      mockDevices[deviceIndex] = updatedDevice;
      resolve(updatedDevice);
    }, 300);
  });
}