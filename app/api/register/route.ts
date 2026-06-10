/**
 * app/api/register/route.ts
 * ─────────────────────────────────────────────────────────
 * POST /api/register
 *
 * Registration process:
 *   1. Validate input fields
 *   2. Check password strength (must be Strong)
 *   3. Generate a unique random salt
 *   4. Compute hash = SHA-256(password + salt + pepper)
 *   5. Store { username, passwordHash, salt } in the DB
 *      (plain password and pepper are NEVER stored)
 * ─────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import { generateSalt, hashPassword, checkPasswordStrength } from "../../../lib/crypto";
import { createUser, userExists } from "@/lib/db";
import { evaluatePassword } from "@/lib/passwordStrength";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, confirmPassword } = body as {
    username: string;
    password: string;
    confirmPassword: string;
  };

  // ── Input validation ──────────────────────────────────
  if (!username || !password || !confirmPassword) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }

  if (username.trim().length < 3) {
    return NextResponse.json(
      { success: false, message: "Username must be at least 3 characters." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { success: false, message: "Passwords do not match." },
      { status: 400 }
    );
  }

  // ── Password strength check ───────────────────────────
  const { label } = evaluatePassword(password);
  if (label !== "Strong") {
    return NextResponse.json(
      {
        success: false,
        message: `Password is too ${label.toLowerCase()}. All 5 criteria must be met.`,
      },
      { status: 400 }
    );
  }

  try {
    // ── Duplicate username check ──────────────────────────
    if (await userExists(username)) {
      return NextResponse.json(
        { success: false, message: "Username is already taken." },
        { status: 409 }
      );
    }

    // ── Security: Salt + Hash + Pepper ───────────────────
    const salt = generateSalt();                      // Step 1: random salt
    const passwordHash = hashPassword(password, salt); // Step 2: hash(pw + salt + pepper)

    // Step 3: Store only username, hash, and salt — NOT the password or pepper
    await createUser({ username: username.trim(), passwordHash, salt });

    return NextResponse.json(
      { success: true, message: `Account created! Welcome, ${username}.` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { success: false, message: "Database error. Check MySQL connection and .env.local." },
      { status: 500 }
    );
  }
}
