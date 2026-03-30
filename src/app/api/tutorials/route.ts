import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface TutRow {
  id: string;
  title: string;
  description: string;
  youtube_link: string;
  pdf_url: string;
  isSecured: number;
  createdAt: number;
}

interface D1Result { results: TutRow[]; success: boolean; }
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
    const result = await db.prepare("SELECT * FROM tutorials ORDER BY createdAt DESC LIMIT 100").all();
    const tutorials = result.results.map((row: TutRow) => ({
      id: row.id, title: row.title, description: row.description,
      type: row.youtube_link ? "youtube" : "pdf",
      url: row.youtube_link || row.pdf_url || "",
      isSecured: Boolean(row.isSecured),
      createdAt: new Date(row.createdAt * 1000).toISOString().split("T")[0],
    }));
    return NextResponse.json({ tutorials }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: "Database not available" }, { status: 503 });
    const body = await request.json();
    const { title, description, youtubeLink, pdfUrl, isSecured } = body;
    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }
    const id = crypto.randomUUID();
    const createdAt = Math.floor(Date.now() / 1000);
    await db.prepare("INSERT INTO tutorials (id, title, description, youtube_link, pdf_url, isSecured, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(id, title, description, youtubeLink || "", pdfUrl || "", isSecured ? 1 : 0, createdAt).run();
    return NextResponse.json({ tutorial: { id, title, description, type: youtubeLink ? "youtube" : "pdf", url: youtubeLink || pdfUrl || "", isSecured: Boolean(isSecured), createdAt: new Date(createdAt * 1000).toISOString().split("T")[0] } }, { status: 201 });
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
    await db.prepare("DELETE FROM tutorials WHERE id = ?").bind(id).run();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
