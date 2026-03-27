import { NextResponse } from "next/server";

export const runtime = "edge";

interface BioRow {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_data: string;
  createdAt: number;
}

interface D1Result { results: BioRow[]; success: boolean; }
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getRequestContext } = require("@cloudflare/next-on-pages");
    const { env } = getRequestContext();
    return env.DB;
  } catch { return null; }
}

export async function GET() {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: "Database not available" }, { status: 503 });
    const result = await db.prepare("SELECT * FROM bios ORDER BY createdAt DESC LIMIT 50").all();
    const bios = result.results.map((row: BioRow) => ({
      id: row.id, name: row.name, role: row.role, bio: row.bio,
      imageData: row.image_data || "",
      createdAt: new Date(row.createdAt * 1000).toISOString().split("T")[0],
    }));
    return NextResponse.json({ bios }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: "Database not available" }, { status: 503 });
    const body = await request.json();
    const { name, role, bio, imageData } = body;
    if (!name || !role || !bio) {
      return NextResponse.json({ error: "Name, role, and bio are required" }, { status: 400 });
    }
    const id = crypto.randomUUID();
    const createdAt = Math.floor(Date.now() / 1000);
    await db.prepare("INSERT INTO bios (id, name, role, bio, image_data, createdAt) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(id, name, role, bio, imageData || "", createdAt).run();
    return NextResponse.json({ bio: { id, name, role, bio, imageData: imageData || "", createdAt: new Date(createdAt * 1000).toISOString().split("T")[0] } }, { status: 201 });
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
    await db.prepare("DELETE FROM bios WHERE id = ?").bind(id).run();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
