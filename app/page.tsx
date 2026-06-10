"use client";

import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

type Tab = "register" | "login";

export default function Home() {
  const [tab, setTab] = useState<Tab>("login");

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

          {tab === "register" ? (
            <RegisterForm onSwitchToLogin={() => setTab("login")} />
          ) : (
            <LoginForm onSwitchToRegister={() => setTab("register")} />
          )}
        </div>
      </section>
    </main>
  );
}
