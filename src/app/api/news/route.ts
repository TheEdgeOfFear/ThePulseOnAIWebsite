import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
      bind: (...values: unknown[]) => {
        all: () => Promise<D1Result>;
        run: () => Promise<{ success: boolean }>;
      };
    };
  };
}

function getDB(): Env["DB"] | null {
  try {
    const { env } = getCloudflareContext();
    return (env as unknown as Env).DB;
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

export async function POST(request: Request) {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: "Database not available" }, { status: 503 });

    const body = await request.json();
    const { title, content, source, imageUrl, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const publishedAt = Math.floor(Date.now() / 1000);

    await db.prepare("INSERT INTO news (id, title, content, source, category, image_url, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(id, title, content, source || "", category || "General", imageUrl || "", publishedAt).run();

    return NextResponse.json({
      article: { id, title, summary: content, category: category || "General", source: source || "", imageUrl: imageUrl || "", createdAt: new Date(publishedAt * 1000).toISOString().split("T")[0] }
    }, { status: 201 });
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

    await db.prepare("DELETE FROM news WHERE id = ?").bind(id).run();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
