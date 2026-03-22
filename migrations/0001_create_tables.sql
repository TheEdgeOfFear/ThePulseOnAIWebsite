-- Migration: Create tables for content management
-- Run against D1 with: npx wrangler d1 execute pulse-web-db --remote --file=./migrations/0001_create_tables.sql

CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  category TEXT DEFAULT 'General',
  image_url TEXT,
  publishedAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  createdAt INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tutorials (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  youtube_link TEXT,
  pdf_url TEXT,
  isSecured INTEGER NOT NULL DEFAULT 0,
  createdAt INTEGER NOT NULL
);
