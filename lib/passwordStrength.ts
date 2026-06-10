/**
 * lib/passwordStrength.ts
 * ─────────────────────────────────────────────────────────
 * Password Strength Meter
 * Validates 5 criteria as required by the project spec:
 *   1. At least one lowercase letter
 *   2. At least one uppercase letter
 *   3. At least one digit
 *   4. At least one special symbol
 *   5. Minimum 12 characters
 *
 * Strength levels:
 *   0–2 criteria met → Weak
 *   3–4 criteria met → Medium
 *   5   criteria met → Strong
 * ─────────────────────────────────────────────────────────
 */

export interface StrengthResult {
  score: number;              // 0–5
  label: "Weak" | "Medium" | "Strong";
  checks: {
    lowercase: boolean;
    uppercase: boolean;
    digit: boolean;
    symbol: boolean;
    minLength: boolean;
  };
}

export function evaluatePassword(password: string): StrengthResult {
  const checks = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit:     /[0-9]/.test(password),
    symbol:    /[^A-Za-z0-9]/.test(password),
    minLength: password.length >= 12,
  };

  const score = Object.values(checks).filter(Boolean).length;

  let label: StrengthResult["label"];
  if (score === 5)      label = "Strong";
  else if (score >= 3)  label = "Medium";
  else                  label = "Weak";

  return { score, label, checks };
}
