import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { news } from "@/db/schema";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.ACTIVEPIECES_WEBHOOK_SECRET || 'secret'}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, source, image_url } = body;

    // In Cloudflare Pages, we access D1 through process.env in Next.js Edge Runtime 
    // when using @cloudflare/next-on-pages, or via getRequestContext().
    // For simplicity, assuming process.env.DB is populated.
    const db = getDb(process.env);
    
    await db.insert(news).values({
      title,
      content,
      source,
      image_url,
      publishedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "News published." }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
