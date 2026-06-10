"use client";

import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import SeaForgeLogo from "../components/SeaForgeLogo";
import AuthIllustration from "../components/AuthIllustration";
type Tab = "register" | "login";

export default function Home() {
  const [tab, setTab] = useState<Tab>("login");

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left — branding & illustration */}
      <section className="hidden lg:flex lg:w-1/2 bg-[#f4f8f7] flex-col justify-between p-12 xl:p-16">
        <SeaForgeLogo />
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl xl:text-5xl font-bold text-sea-ink leading-tight max-w-md">
            Unlock Your Team{" "}
            <span className="text-sea-teal">Performance</span>
          </h1>
          <p className="mt-4 text-sea-muted text-lg max-w-sm">
            Secure staff access for your seaweed production operations.
          </p>
          <AuthIllustration />
        </div>
        <p className="text-sm text-sea-muted">© {new Date().getFullYear()} SeaForge. All rights reserved.</p>
      </section>

      {/* Right — auth card */}
      <section className="flex-1 bg-sea-green flex flex-col items-center justify-center px-4 py-10 sm:px-8 min-h-screen">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <SeaForgeLogo variant="light" />
          </div>

          <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-8 py-10 sm:px-10">
            <div className="hidden lg:block mb-8">
              <SeaForgeLogo size="sm" />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-sea-ink">
                {tab === "login" ? "Staff Login" : "Create Account"}
              </h2>
              <p className="text-sm text-sea-muted mt-1">
                {tab === "login"
                  ? "Enter your credentials to access the dashboard."
                  : "Register a new staff account for SeaForge."}
              </p>
            </div>

            {tab === "register" ? (
              <RegisterForm onSwitchToLogin={() => setTab("login")} />
            ) : (
              <LoginForm onSwitchToRegister={() => setTab("register")} />
            )}
          </div>

          <p className="text-center text-xs text-white/50 mt-6 lg:hidden">
            © {new Date().getFullYear()} SeaForge. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
