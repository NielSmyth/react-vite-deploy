import { toggleDevice } from "./devices";

// Define scene configurations
const scenes = {
  away: [
    { deviceId: "1", status: "on" }, // Living Room Light
    { deviceId: "2", status: "on" }, // Kitchen Light
    { deviceId: "3", status: "on", temperature: 16 }, // Thermostat
    { deviceId: "4", status: "off" }, // Camera
    { deviceId: "5", status: "off" }, // Lock
    { deviceId: "6", status: "on"},
  ],
  welcome: [
    { deviceId: "1", status: "off" },
    { deviceId: "2", status: "off" },
    { deviceId: "3", status: "off", temperature: 22 },
     { deviceId: "4", status: "off" }, // Camera
    { deviceId: "5", status: "off" }, // Lock
    { deviceId: "6", status: "on"},
  ],
  sleep: [
    { deviceId: "1", status: "on" },
    { deviceId: "2", status: "on" },
    { deviceId: "3", status: "on", temperature: 18 },
     { deviceId: "4", status: "off" }, // Camera
    { deviceId: "5", status: "off" }, // Lock
    { deviceId: "6", status: "on"},
    
  ],
  entertain: [
    { deviceId: "1", status: "on" },
    { deviceId: "2", status: "on" },
    { deviceId: "3", status: "off", temperature: 20 },
     { deviceId: "4", status: "off" }, // Camera
    { deviceId: "5", status: "off" }, // Lock
    { deviceId: "6", status: "on"},
  ],
};

export async function activateScene(sceneId: keyof typeof scenes): Promise<void> {
  const sceneActions = scenes[sceneId];
  
  // Execute all scene actions in parallel
  await Promise.all(
    sceneActions.map(async (action) => {
      // First set the device to the desired state
      await toggleDevice(action.deviceId);
      
      // If we need to set a specific temperature (for thermostats)
      if (action.temperature !== undefined) {
        // In a real app, we would have a separate API call for temperature
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    })
  );
}

export async function getAvailableScenes() {
  return Object.keys(scenes);
}