import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface D1Result {
  results: unknown[];
  success: boolean;
  meta: unknown;
}

interface Env {
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        run: () => Promise<D1Result>;
      };
    };
  };
}

function getDB(): Env["DB"] | null {
  try {
    // On Cloudflare Pages with @cloudflare/next-on-pages, 
    // the D1 binding is available via getRequestContext
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getRequestContext } = require("@cloudflare/next-on-pages");
    const { env } = getRequestContext();
    return env.DB;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    const secret = process.env.ACTIVEPIECES_WEBHOOK_SECRET || "secret";
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse JSON body
    const body = await req.json();
    const { title, content, source, image_url, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Missing required fields: title, content" }, { status: 400 });
    }

    const db = getDB();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const id = crypto.randomUUID();
    const publishedAt = Math.floor(Date.now() / 1000);

    await db
      .prepare("INSERT INTO news (id, title, content, source, category, image_url, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(id, title, content, source || "", category || "General", image_url || "", publishedAt)
      .run();

    return NextResponse.json(
      { success: true, message: "News published.", id, publishedAt },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
