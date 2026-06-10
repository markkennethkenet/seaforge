import mysql from "mysql2/promise";

const globalForMysql = globalThis as typeof globalThis & {
  __secureAuthPool?: mysql.Pool;
  __secureAuthDbReady?: Promise<void>;
};

interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

function getDbConfig(): DbConfig {
  const url = process.env.DATABASE_URL;
  if (url) {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: Number(parsed.port || 3306),
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace(/^\//, ""),
    };
  }

  return {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "secure_auth",
  };
}

function createPool(): mysql.Pool {
  const config = getDbConfig();
  return mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
  });
}

export function getPool(): mysql.Pool {
  if (!globalForMysql.__secureAuthPool) {
    globalForMysql.__secureAuthPool = createPool();
  }
  return globalForMysql.__secureAuthPool;
}

/** Ensures the users table exists before any query runs. */
export async function ensureDbReady(): Promise<void> {
  if (!globalForMysql.__secureAuthDbReady) {
    globalForMysql.__secureAuthDbReady = (async () => {
      const pool = getPool();
      await pool.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password_hash CHAR(64) NOT NULL,
          salt CHAR(32) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY uq_users_username (username)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
    })();
  }
  await globalForMysql.__secureAuthDbReady;
}
