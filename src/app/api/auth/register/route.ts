import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/api/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      return NextResponse.json(
        { message: "Already authenticated" },
        { status: 400 }
      );
    }

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // In a real app, you would check against your database here
    const existingUser = false; // Check if user exists in DB

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // In a real app, you would save the user to your database here
    // Example:
    // const user = await createUser({ name, email, password: hashedPassword });
    // For now, just log the hashed password to avoid the unused variable error
    console.log("Hashed password:", hashedPassword);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}