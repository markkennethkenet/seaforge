import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SeaForge — Seaweed Production System",
  description:
    "Secure staff registration and login for SeaForge with SHA-256 hashing, salt, and pepper.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
