"use client";

import { evaluatePassword } from "@/lib/passwordStrength";

interface Props {
  password: string;
}

const CRITERIA = [
  { key: "lowercase" as const, label: "At least one lowercase letter" },
  { key: "uppercase" as const, label: "At least one uppercase letter" },
  { key: "digit" as const, label: "At least one digit (0–9)" },
  { key: "symbol" as const, label: "At least one special character (!@#$%…)" },
  { key: "minLength" as const, label: "Minimum 12 characters" },
];

export default function PasswordMeter({ password }: Props) {
  if (!password) return null;

  const { score, label, checks } = evaluatePassword(password);

  const barColor =
    label === "Strong" ? "#1db9a5" : label === "Medium" ? "#f59e0b" : "#ef4444";

  const labelColor =
    label === "Strong"
      ? "text-sea-teal"
      : label === "Medium"
        ? "text-amber-600"
        : "text-red-500";

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background:
                (step === 1 && score >= 1) ||
                (step === 2 && score >= 3) ||
                (step === 3 && score >= 5)
                  ? barColor
                  : "#e5e7eb",
            }}
          />
        ))}
      </div>

      <p className={`text-xs font-semibold ${labelColor}`}>
        Password Strength: {label}
      </p>

      <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 space-y-1">
        {CRITERIA.map(({ key, label: text }) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                checks[key] ? "bg-sea-teal" : "bg-gray-300"
              }`}
            >
              {checks[key] && (
                <svg
                  viewBox="0 0 10 10"
                  className="w-2 h-2"
                  stroke="white"
                  fill="none"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="1.5,5 4,7.5 8.5,2" />
                </svg>
              )}
            </span>
            <span
              className={`text-xs transition-colors duration-200 ${
                checks[key] ? "text-sea-teal-dark" : "text-gray-400"
              }`}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
