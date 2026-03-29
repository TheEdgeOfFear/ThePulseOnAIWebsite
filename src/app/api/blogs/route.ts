import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  category: string;
  createdAt: number;
}

interface D1Result {
  results: BlogRow[];
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
      .prepare("SELECT * FROM blogs ORDER BY createdAt DESC LIMIT 100")
      .all();

    const blogs = result.results.map((row: BlogRow) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      imageUrl: row.image_url || "",
      category: row.category || "",
      createdAt: new Date(row.createdAt * 1000).toISOString().split("T")[0],
    }));

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDB();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const body = await request.json();
    const { title, slug, content, imageUrl, category } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const createdAt = Math.floor(Date.now() / 1000);

    await db
      .prepare("INSERT INTO blogs (id, title, slug, content, image_url, category, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(id, title, slug, content, imageUrl || "", category || "", createdAt)
      .run();

    return NextResponse.json({
      blog: { id, title, slug, content, imageUrl: imageUrl || "", category: category || "", createdAt: new Date(createdAt * 1000).toISOString().split("T")[0] }
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const db = getDB();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog id is required" }, { status: 400 });
    }

    await db
      .prepare("DELETE FROM blogs WHERE id = ?")
      .bind(id)
      .run();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
