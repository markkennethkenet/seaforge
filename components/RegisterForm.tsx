"use client";

import { useState } from "react";
import PasswordMeter from "./PasswordMeter";

interface Props {
  onSwitchToLogin?: () => void;
}

const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sea-ink text-sm placeholder-gray-400 focus:outline-none focus:border-sea-teal focus:ring-2 focus:ring-sea-teal/20 transition";

export default function RegisterForm({ onSwitchToLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword: confirm }),
      });
      const data = await res.json();

      if (data.success) {
        setAlert({ type: "success", msg: data.message });
        setUsername("");
        setPassword("");
        setConfirm("");
      } else {
        setAlert({ type: "error", msg: data.message });
      }
    } catch {
      setAlert({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {alert && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            alert.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {alert.msg}
        </div>
      )}

      <div>
        <label className="block text-sm text-sea-muted mb-1.5">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          autoComplete="off"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-sea-muted mb-1.5">Password</label>
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            autoComplete="new-password"
            className={`${inputClass} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sea-teal transition"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {showPwd ? (
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>
        <PasswordMeter password={password} />
      </div>

      <div>
        <label className="block text-sm text-sea-muted mb-1.5">Confirm Password</label>
        <div className="relative">
          <input
            type={showConf ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            autoComplete="new-password"
            className={`${inputClass} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowConf(!showConf)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sea-teal transition"
            aria-label={showConf ? "Hide password" : "Show password"}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {showConf ? (
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        </div>
        {confirm && password && (
          <p className={`text-xs mt-1.5 ${confirm === password ? "text-emerald-600" : "text-red-500"}`}>
            {confirm === password ? "✓ Passwords match" : "✕ Passwords do not match"}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-sea-teal hover:bg-sea-teal-dark text-white font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          "Creating Account…"
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
            Create Account
          </>
        )}
      </button>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-sea-muted pt-1">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sea-teal font-semibold hover:text-sea-teal-dark transition"
          >
            Login
          </button>
        </p>
      )}
    </form>
  );
}
