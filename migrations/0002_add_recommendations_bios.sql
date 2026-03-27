-- Migration: Add recommendations and bios tables
-- Run against D1 with: npx wrangler d1 execute pulse-web-db --remote --file=./migrations/0002_add_recommendations_bios.sql

CREATE TABLE IF NOT EXISTS recommendations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  use_case TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'green',
  createdAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bios (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_data TEXT,
  createdAt INTEGER NOT NULL
);
