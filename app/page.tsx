"use client";

import { useMemo, useState } from "react";

type Tab = "login" | "register";

export default function Home() {
  const [tab, setTab] = useState<Tab>("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => {
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

    let label = "Weak";
    if (score === 5) label = "Strong";
    else if (score >= 3) label = "Medium";

    return {
      label,
      score,
      hasLowercase,
      hasUppercase,
      hasDigit,
      hasSymbol,
      hasMinLength,
    };
  }, [password]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = tab === "login" ? "/api/login" : "/api/register";

      const body =
        tab === "login"
          ? { username, password }
          : { username, password, confirmPassword };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setMessage(data.message || "Done.");

      if (data.success) {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-left">
        <div>
          <h2 className="brand">SeaForge</h2>
          <p className="subtitle">Seaweed Production System</p>
        </div>

        <div className="hero-text">
          <h1>
            Unlock Your Team <span>Performance</span>
          </h1>
          <p>Secure staff access for your seaweed production operations.</p>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} SeaForge. All rights reserved.
        </p>
      </section>

      <section className="auth-right">
        <div className="auth-card">
          <h2>{tab === "login" ? "Staff Login" : "Create Account"}</h2>

          <p className="card-subtitle">
            {tab === "login"
              ? "Enter your credentials to access the dashboard."
              : "Register a new staff account for SeaForge."}
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </div>

            {tab === "register" && (
              <>
                <div className="meter">
                  <div className="meter-bar">
                    <div
                      className="meter-fill"
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                  </div>

                  <p>
                    Password Strength: <b>{strength.label}</b>
                  </p>

                  <ul>
                    <li>{strength.hasLowercase ? "✓" : "○"} Lowercase letter</li>
                    <li>{strength.hasUppercase ? "✓" : "○"} Uppercase letter</li>
                    <li>{strength.hasDigit ? "✓" : "○"} Number</li>
                    <li>{strength.hasSymbol ? "✓" : "○"} Symbol</li>
                    <li>{strength.hasMinLength ? "✓" : "○"} Minimum 12 characters</li>
                  </ul>
                </div>

                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm password"
                  />
                </div>
              </>
            )}

            {message && <p className="message">{message}</p>}

            <button type="submit" disabled={loading}>
              {loading
                ? tab === "login"
                  ? "Logging in..."
                  : "Registering..."
                : tab === "login"
                ? "Login"
                : "Register"}
            </button>
          </form>

          <p className="switch-text">
            {tab === "login" ? "No account yet?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setTab(tab === "login" ? "register" : "login");
              }}
            >
              {tab === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
