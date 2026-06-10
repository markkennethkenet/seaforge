/**
 * app/api/users/route.ts
 * ─────────────────────────────────────────────────────────
 * GET /api/users
 * Returns all users for the database viewer panel.
 * Shows: username, passwordHash, salt
 * Does NOT show: plaintext password or pepper
 * ─────────────────────────────────────────────────────────
 */

import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/db";

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Failed to load users:", error);
    return NextResponse.json(
      { users: [], message: "Database error. Check MySQL connection and .env.local." },
      { status: 500 }
    );
  }
}
