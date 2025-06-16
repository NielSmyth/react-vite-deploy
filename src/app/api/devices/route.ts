import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authUtils";
import { Device } from "@/lib/types";

// Mock database
const devices: Device[] = [
  // ... your devices data ...
];

export async function GET() {
  try {
    await requireAuth();
    return NextResponse.json(devices);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    if (user.role !== "admin") {
      throw new Error("Only admins can add devices");
    }

    const newDevice = await request.json();
    devices.push(newDevice);
    return NextResponse.json(newDevice, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: error instanceof Error && error.message === "Only admins can add devices" ? 403 : 401 }
    );
  }
}