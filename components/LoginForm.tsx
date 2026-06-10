"use client";

import { useState } from "react";

interface LoginAttempt {
  username: string;
  success: boolean;
  time: string;
}

interface Props {
  onSwitchToRegister?: () => void;
}

const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sea-ink text-sm placeholder-gray-400 focus:outline-none focus:border-sea-teal focus:ring-2 focus:ring-sea-teal/20 transition";

export default function LoginForm({ onSwitchToRegister }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [history, setHistory] = useState<LoginAttempt[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      setAlert({
        type: data.success ? "success" : "error",
        msg: data.message,
      });

      setHistory((prev) => [
        { username, success: data.success, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 4),
      ]);

      if (data.success) {
        setPassword("");
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
        <label className="block text-sm text-sea-muted mb-1.5">Username / Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          autoComplete="username"
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
            placeholder="Enter password"
            autoComplete="current-password"
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
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-sea-teal hover:bg-sea-teal-dark text-white font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          "Signing In…"
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Sign In
          </>
        )}
      </button>

      {onSwitchToRegister && (
        <p className="text-center text-sm text-sea-muted pt-1">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-sea-teal font-semibold hover:text-sea-teal-dark transition"
          >
            Register
          </button>
        </p>
      )}

      {history.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs font-medium text-sea-muted mb-2">Recent login attempts</p>
          <div className="space-y-1.5">
            {history.map((attempt, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span
                  className={`font-semibold px-2 py-0.5 rounded-full ${
                    attempt.success
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {attempt.success ? "OK" : "FAIL"}
                </span>
                <span className="text-sea-ink flex-1">{attempt.username}</span>
                <span className="text-gray-400">{attempt.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
