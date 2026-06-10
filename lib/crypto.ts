/**
 * lib/crypto.ts
 * Cybersecurity utility functions:
 * - generateSalt()
 * - hashPassword()
 * - checkPasswordStrength()
 */

import { createHash, randomBytes } from "crypto";

export const PEPPER = process.env.PEPPER ?? "Cy8#rP3pp3r!2026$X@SecureAuth";

export function generateSalt(): string {
  return randomBytes(16).toString("hex");
}

export function hashPassword(password: string, salt: string): string {
  const combined = password + salt + PEPPER;

  return createHash("sha256")
    .update(combined, "utf8")
    .digest("hex");
}

export function checkPasswordStrength(password: string) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 12;

  const score = [
    hasLowercase,
    hasUppercase,
    hasDigit,
    hasSymbol,
    hasMinLength,
  ].filter(Boolean).length;

  let strength: "Weak" | "Medium" | "Strong" = "Weak";

  if (score === 5) {
    strength = "Strong";
  } else if (score >= 3) {
    strength = "Medium";
  }

  return {
    strength,
    hasLowercase,
    hasUppercase,
    hasDigit,
    hasSymbol,
    hasMinLength,
    isStrong: score === 5,
  };
}
