import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface D1Result {
  results: unknown[];
  success: boolean;
  meta: unknown;
}

interface CloudflareEnv {
  DB: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        run: () => Promise<D1Result>;
      };
    };
  };
  ACTIVEPIECES_WEBHOOK_SECRET?: string;
  WEBHOOK_AUTH_EMAIL?: string;
  WEBHOOK_AUTH_PASSWORD?: string;
}

function getCfEnv(): CloudflareEnv | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getRequestContext } = require("@cloudflare/next-on-pages");
    const { env } = getRequestContext();
    return env as CloudflareEnv;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const cfEnv = getCfEnv();
    if (!cfEnv) {
      return NextResponse.json(
        { error: "Cloudflare environment not available" },
        { status: 503 }
      );
    }

    // Auth check — supports both Bearer token and Basic Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing Authorization header" },
        { status: 401 }
      );
    }

    let authorized = false;

    // Option 1: Bearer token — matches ACTIVEPIECES_WEBHOOK_SECRET env var
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const secret = cfEnv.ACTIVEPIECES_WEBHOOK_SECRET;
      if (secret && token === secret) {
        authorized = true;
      }
    }

    // Option 2: Basic Auth — matches WEBHOOK_AUTH_EMAIL + WEBHOOK_AUTH_PASSWORD env vars
    if (!authorized && authHeader.startsWith("Basic ")) {
      try {
        const decoded = atob(authHeader.slice(6));
        const [email, password] = decoded.split(":");
        const envEmail = cfEnv.WEBHOOK_AUTH_EMAIL;
        const envPassword = cfEnv.WEBHOOK_AUTH_PASSWORD;
        if (envEmail && envPassword && email === envEmail && password === envPassword) {
          authorized = true;
        }
      } catch {
        // Invalid base64
      }
    }

    if (!authorized) {
      return NextResponse.json(
        { error: "Unauthorized — invalid credentials" },
        { status: 401 }
      );
    }

    // Parse JSON body
    const body = await req.json();
    const { title, content, source, image_url, category } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, content" },
        { status: 400 }
      );
    }

    const db = cfEnv.DB;
    if (!db) {
      return NextResponse.json(
        { error: "Database binding not available" },
        { status: 503 }
      );
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
