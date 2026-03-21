"use client";
import Link from "next/link";
import { useState } from "react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Tutorials", href: "/admin/tutorials", icon: "school" },
  { label: "View Site", href: "/", icon: "open_in_new" },
];

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function generateSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // TODO: call API route to persist to D1
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
          <Link href="/admin/blogs" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_back</Link>
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">New Blog Post</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Write and publish a new article</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="max-w-3xl space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 space-y-6">
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Title *</label>
              <input
                value={title}
                onChange={e => { setTitle(e.target.value); setSlug(generateSlug(e.target.value)); }}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                placeholder="Article headline..."
                required
              />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Slug</label>
              <input
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all text-primary"
                placeholder="auto-generated-from-title"
              />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Cover Image URL</label>
              <input
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Content *</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={12}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all resize-y"
                placeholder="Write your article content here... (Markdown supported)"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">{saving ? "hourglass_empty" : "save"}</span>
              {saving ? "Saving..." : "Publish Post"}
            </button>
            <Link href="/admin/blogs" className="px-8 py-4 bg-surface-container-highest text-on-surface-variant font-headline font-bold text-xs uppercase tracking-wider rounded-md hover:bg-surface-container transition-all">
              Cancel
            </Link>
            {saved && <span className="text-primary font-headline text-xs uppercase tracking-widest">✓ Saved successfully</span>}
          </div>
        </form>
      </main>
    </div>
  );
}
