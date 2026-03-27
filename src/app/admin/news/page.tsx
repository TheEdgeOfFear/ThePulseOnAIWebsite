"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "group" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Recommended", href: "/admin/recommended", icon: "recommend" },
  { label: "Bio", href: "/admin/bio", icon: "person" },
  { label: "Tutorials", href: "/admin/tutorials", icon: "school" },
  { label: "View Site", href: "/", icon: "open_in_new" },
];

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  imageUrl: string;
  createdAt: string;
}

export default function AdminNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchNews() {
    setLoading(true);
    fetch("/api/news")
      .then(res => res.json())
      .then(data => { if (data.articles) setNews(data.articles); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchNews(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this news article?")) return;
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchNews();
      else alert("Failed to delete.");
    } catch { alert("Error deleting."); }
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/15 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-outline-variant/15">
          <div className="text-sm font-bold tracking-tighter text-primary font-headline">THE PULSE ON AI</div>
          <div className="text-[10px] text-on-surface-variant font-headline uppercase tracking-widest mt-1">Admin Console</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.href === '/admin/news' ? 'text-primary bg-surface-container' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}>
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="font-headline text-xs uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-outline-variant/15">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error-container/10 transition-all">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="font-headline text-xs uppercase tracking-widest">Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-headline text-[10px] uppercase tracking-widest text-primary font-bold">Live Feed</span>
            </div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">News Articles</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Manage manually or via Activepieces webhook</p>
          </div>
          <Link href="/admin/news/new" className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-5 py-3 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add News
          </Link>
        </div>

        {/* Webhook reminder */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">webhook</span>
            <p className="font-headline text-xs font-bold text-primary uppercase tracking-widest">Webhook API — Auto-Publish News</p>
          </div>
          <div className="text-on-surface-variant text-xs font-body space-y-2 ml-9">
            <p><strong className="text-on-surface">Endpoint:</strong> <span className="text-primary font-mono">POST /api/webhooks/news</span></p>
            <p><strong className="text-on-surface">JSON body:</strong> <span className="text-primary font-mono">{`{ "title", "content", "source", "image_url", "category" }`}</span></p>
            <p className="text-on-surface font-bold mt-2">Auth (pick one):</p>
            <p>• <strong>Bearer token:</strong> <span className="text-primary font-mono">Authorization: Bearer YOUR_SECRET</span> — set <span className="text-primary">ACTIVEPIECES_WEBHOOK_SECRET</span> in Cloudflare env vars</p>
            <p>• <strong>Basic Auth:</strong> <span className="text-primary font-mono">Authorization: Basic base64(email:password)</span> — set <span className="text-primary">WEBHOOK_AUTH_EMAIL</span> + <span className="text-primary">WEBHOOK_AUTH_PASSWORD</span> in Cloudflare env vars (use same creds as an admin account)</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/10">
            <div className="col-span-6 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Title</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Source</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Date</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Actions</div>
          </div>
          {loading ? (
            <div className="px-6 py-8 text-center text-on-surface-variant font-body text-sm">Loading...</div>
          ) : news.length === 0 ? (
            <div className="px-6 py-8 text-center text-on-surface-variant font-body text-sm">No news articles yet.</div>
          ) : (
            news.map((item, i) => (
              <div key={item.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-surface-container transition-colors ${i < news.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
                <div className="col-span-6 font-headline text-sm font-medium text-on-surface">{item.title}</div>
                <div className="col-span-2 font-headline text-xs text-primary">{item.source}</div>
                <div className="col-span-2 font-headline text-xs text-on-surface-variant">{item.createdAt}</div>
                <div className="col-span-2 flex items-center gap-2">
                  <button onClick={() => handleDelete(item.id)} className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-error transition-colors">delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
