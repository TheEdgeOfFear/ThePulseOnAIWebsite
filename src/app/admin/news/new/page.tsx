"use client";
import Link from "next/link";
import { useState } from "react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "group" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Tutorials", href: "/admin/tutorials", icon: "school" },
  { label: "View Site", href: "/", icon: "open_in_new" },
];

export default function NewNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
    setSaving(false);
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
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all">
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="font-headline text-xs uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/news" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_back</Link>
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Add News Article</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Manually publish a news item</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="max-w-3xl space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 space-y-6">
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Headline *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="News headline..." required />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Source / Publication</label>
              <input value={source} onChange={e => setSource(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="e.g. Data Pulse, Tech Desk..." />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Image URL</label>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="https://..." />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Content *</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all resize-y" placeholder="News article body..." required />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">{saving ? "hourglass_empty" : "publish"}</span>
              {saving ? "Publishing..." : "Publish News"}
            </button>
            <Link href="/admin/news" className="px-8 py-4 bg-surface-container-highest text-on-surface-variant font-headline font-bold text-xs uppercase tracking-wider rounded-md hover:bg-surface-container transition-all">Cancel</Link>
            {saved && <span className="text-primary font-headline text-xs uppercase tracking-widest">✓ Published</span>}
          </div>
        </form>
      </main>
    </div>
  );
}
