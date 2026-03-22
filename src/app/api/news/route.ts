import { NextResponse } from "next/server";

export const runtime = "edge";

interface NewsRow {
  id: string;
  title: string;
  content: string;
  source: string;
  category: string;
  image_url: string;
  publishedAt: number;
}

interface D1Result {
  results: NewsRow[];
  success: boolean;
}

interface Env {
  DB: {
    prepare: (query: string) => {
      all: () => Promise<D1Result>;
    };
  };
}

function getDB(): Env["DB"] | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getRequestContext } = require("@cloudflare/next-on-pages");
    const { env } = getRequestContext();
    return env.DB;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const db = getDB();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const result = await db
      .prepare("SELECT * FROM news ORDER BY publishedAt DESC LIMIT 50")
      .all();

    // Convert publishedAt timestamp to date string for frontend
    const articles = result.results.map((row: NewsRow) => ({
      id: row.id,
      title: row.title,
      summary: row.content,
      category: row.category || "General",
      source: row.source || "",
      imageUrl: row.image_url || "",
      createdAt: new Date(row.publishedAt * 1000).toISOString().split("T")[0],
    }));

    return NextResponse.json({ articles }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
