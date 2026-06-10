"use client";

/**
 * components/DatabaseViewer.tsx
 * ─────────────────────────────────────────────────────────
 * Shows the contents of the in-memory users table.
 * Displays: username, password_hash (truncated), salt (truncated)
 * Pepper is deliberately NOT shown — it is never stored in the DB.
 * ─────────────────────────────────────────────────────────
 */

import { useEffect, useState, useCallback } from "react";

interface UserRecord {
  username: string;
  passwordHash: string;
  salt: string;
}

interface Props {
  refreshKey: number; // increment this to trigger a refetch
}

export default function DatabaseViewer({ refreshKey }: Props) {
  const [users, setUsers] = useState<UserRecord[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data.users);
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [refreshKey, fetchUsers]);

  return (
    <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 border-b border-slate-700/50">
        <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Database · <span className="text-emerald-400">users</span> table
        </span>
        <span className="ml-auto text-xs text-slate-600 font-normal normal-case tracking-normal">
          Pepper is NOT stored here
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left px-4 py-2 text-slate-500 font-medium w-28">username</th>
              <th className="text-left px-4 py-2 text-slate-500 font-medium">password_hash (SHA-256)</th>
              <th className="text-left px-4 py-2 text-slate-500 font-medium w-44">salt</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-slate-600 py-6">
                  No users registered yet.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.username} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-4 py-2 text-slate-200 font-medium">{user.username}</td>
                  <td
                    className="px-4 py-2 font-mono text-indigo-400 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                    title={user.passwordHash}
                  >
                    {user.passwordHash.substring(0, 20)}…
                  </td>
                  <td
                    className="px-4 py-2 font-mono text-violet-400 overflow-hidden text-ellipsis whitespace-nowrap"
                    title={user.salt}
                  >
                    {user.salt.substring(0, 14)}…
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
