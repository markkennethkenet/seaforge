/**
 * lib/db.ts
 * ─────────────────────────────────────────────────────────
 * MySQL user store.
 * Stored fields per user:
 *   - username      (string)
 *   - password_hash (SHA-256 hex string)
 *   - salt          (32-char hex, generated per user)
 *
 * NOTE: Pepper is NOT stored here — it lives only in lib/crypto.ts
 * ─────────────────────────────────────────────────────────
 */

import type { RowDataPacket } from "mysql2";
import { ensureDbReady, getPool } from "./mysql";

export interface UserRecord {
  username: string;
  passwordHash: string;
  salt: string;
}

interface UserRow extends RowDataPacket {
  username: string;
  password_hash: string;
  salt: string;
}

interface CountRow extends RowDataPacket {
  count: number;
}

function mapRow(row: UserRow): UserRecord {
  return {
    username: row.username,
    passwordHash: row.password_hash,
    salt: row.salt,
  };
}

/** Insert a new user record */
export async function createUser(record: UserRecord): Promise<void> {
  await ensureDbReady();
  const pool = getPool();
  await pool.execute(
    `INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)`,
    [record.username, record.passwordHash, record.salt]
  );
}

/** Look up a user by username (case-insensitive) */
export async function findUser(username: string): Promise<UserRecord | undefined> {
  await ensureDbReady();
  const pool = getPool();
  const [rows] = await pool.execute<UserRow[]>(
    `SELECT username, password_hash, salt
     FROM users
     WHERE LOWER(username) = LOWER(?)
     LIMIT 1`,
    [username.trim()]
  );
  const row = rows[0];
  return row ? mapRow(row) : undefined;
}

/** Return all user records (for the DB viewer — passwords are hashed) */
export async function getAllUsers(): Promise<UserRecord[]> {
  await ensureDbReady();
  const pool = getPool();
  const [rows] = await pool.execute<UserRow[]>(
    `SELECT username, password_hash, salt
     FROM users
     ORDER BY created_at ASC`
  );
  return rows.map(mapRow);
}

/** Check if a username is already taken */
export async function userExists(username: string): Promise<boolean> {
  await ensureDbReady();
  const pool = getPool();
  const [rows] = await pool.execute<CountRow[]>(
    `SELECT COUNT(*) AS count
     FROM users
     WHERE LOWER(username) = LOWER(?)`,
    [username.trim()]
  );
  return Number(rows[0]?.count ?? 0) > 0;
}
