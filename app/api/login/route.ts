/**
 * app/api/login/route.ts
 * ─────────────────────────────────────────────────────────
 * POST /api/login
 *
 * Login verification process:
 *   1. Accept username + password from the request
 *   2. Look up the user in the database
 *   3. Retrieve the stored salt for that user
 *   4. Recompute hash = SHA-256(inputPassword + storedSalt + pepper)
 *   5. Compare computed hash with the stored hash
 *   6. Grant or deny access
 * ─────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../../../lib/crypto";
import { findUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body as { username: string; password: string };

  // ── Input validation ──────────────────────────────────
  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Username and password are required." },
      { status: 400 }
    );
  }

  try {
    // ── Look up user ──────────────────────────────────────
    const user = await findUser(username);

    // If user doesn't exist, return generic error (don't reveal which field is wrong)
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }

    // ── Recompute hash using stored salt ──────────────────
    // Formula: SHA-256(inputPassword + storedSalt + pepper)
    const computedHash = hashPassword(password, user.salt);

    // ── Compare hashes ────────────────────────────────────
    if (computedHash !== user.passwordHash) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }

    // ── Success ───────────────────────────────────────────
    return NextResponse.json(
      { success: true, message: `Login Successful! Welcome back, ${user.username}.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json(
      { success: false, message: "Database error. Check MySQL connection and .env.local." },
      { status: 500 }
    );
  }
}
