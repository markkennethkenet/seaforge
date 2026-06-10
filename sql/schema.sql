-- SecureAuth MySQL schema
-- Run once in MySQL Workbench or: mysql -u root -p < sql/schema.sql

CREATE DATABASE IF NOT EXISTS secure_auth
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE secure_auth;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_hash CHAR(64) NOT NULL COMMENT 'SHA-256 hex digest',
  salt CHAR(32) NOT NULL COMMENT 'Per-user random salt (hex)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
