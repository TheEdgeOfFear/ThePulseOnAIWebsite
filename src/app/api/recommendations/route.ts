import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface RecRow {
  id: string;
  title: string;
  url: string;
  description: string;
  use_case: string;
  difficulty: string;
  createdAt: number;
}

interface D1Result { results: RecRow[]; success: boolean; }
interface Env {
  DB: {
    prepare: (query: string) => {
      all: () => Promise<D1Result>;
      bind: (...values: unknown[]) => { all: () => Promise<D1Result>; run: () => Promise<{ success: boolean }>; };
    };
  };
}

function getDB(): Env["DB"] | null {
  try {
    const { env } = getRequestContext();
    return env.DB;
  } catch { return null; }
}

export async function GET() {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: "Database not available" }, { status: 503 });
    const result = await db.prepare("SELECT * FROM recommendations ORDER BY createdAt DESC LIMIT 100").all();
    const recommendations = result.results.map((row: RecRow) => ({
      id: row.id, title: row.title, url: row.url, description: row.description,
      useCase: row.use_case, difficulty: row.difficulty,
      createdAt: new Date(row.createdAt * 1000).toISOString().split("T")[0],
    }));
    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: "Database not available" }, { status: 503 });
    const body = await request.json();
    const { title, url, description, useCase, difficulty } = body;
    if (!title || !url || !description || !useCase) {
      return NextResponse.json({ error: "Title, URL, description, and use case are required" }, { status: 400 });
    }
    const id = crypto.randomUUID();
    const createdAt = Math.floor(Date.now() / 1000);
    await db.prepare("INSERT INTO recommendations (id, title, url, description, use_case, difficulty, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(id, title, url, description, useCase, difficulty || "green", createdAt).run();
    return NextResponse.json({ recommendation: { id, title, url, description, useCase, difficulty: difficulty || "green", createdAt: new Date(createdAt * 1000).toISOString().split("T")[0] } }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: "Database not available" }, { status: 503 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
    await db.prepare("DELETE FROM recommendations WHERE id = ?").bind(id).run();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
