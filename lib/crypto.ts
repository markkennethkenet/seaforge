/**
 * lib/crypto.ts
 * ─────────────────────────────────────────────────────────
 * Cybersecurity utility functions:
 *   - generateSalt()   → random 32-char hex string (16 bytes)
 *   - hashPassword()   → SHA-256(password + salt + pepper)
 *   - PEPPER           → secret constant, NEVER stored in DB
 * ─────────────────────────────────────────────────────────
 */

import { createHash, randomBytes } from "crypto";

/**
 * PEPPER — a secret server-side constant mixed into every hash.
 * In production, store this in an environment variable (e.g. process.env.PEPPER).
 * It is NEVER stored in the database.
 */
export const PEPPER = process.env.PEPPER ?? "Cy8#rP3pp3r!2026$X@SecureAuth";

/**
 * generateSalt
 * Generates a cryptographically random 16-byte salt encoded as a 32-char hex string.
 * A unique salt is created for every new user to prevent rainbow-table attacks.
 */
export function generateSalt(): string {
  return randomBytes(16).toString("hex"); // 16 bytes → 32 hex chars
}

/**
 * hashPassword
 * Combines password + salt + pepper, then applies SHA-256.
 * Formula: SHA-256(password || salt || pepper)
 *
 * @param password  The plain-text password (never stored)
 * @param salt      The per-user random salt (stored in DB)
 * @returns         The hex-encoded SHA-256 hash (stored in DB)
 */
export function hashPassword(password: string, salt: string): string {
  const combined = password + salt + PEPPER;
  return createHash("sha256").update(combined, "utf8").digest("hex");
}
