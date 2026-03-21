"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTutorial } from "@/lib/dataStore";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "group" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Tutorials", href: "/admin/tutorials", icon: "school" },
  { label: "View Site", href: "/", icon: "open_in_new" },
];

export default function NewTutorial() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isSecured, setIsSecured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const type = youtubeLink ? "youtube" : "pdf";
    const url = youtubeLink || pdfUrl;
    addTutorial({ title, description, type, url, isSecured });
    setSaved(true);
    setSaving(false);
    setTimeout(() => router.push("/admin/tutorials"), 800);
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
          <Link href="/admin/tutorials" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_back</Link>
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">New Tutorial</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Add a YouTube video or PDF training resource</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="max-w-3xl space-y-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 space-y-6">
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="Tutorial title..." required />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Description *</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all resize-none" placeholder="Describe this tutorial..." required />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">YouTube Link</label>
              <input value={youtubeLink} onChange={e => setYoutubeLink(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">PDF URL</label>
              <input value={pdfUrl} onChange={e => setPdfUrl(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="https://... (PDF link or upload URL)" />
            </div>

            {/* Access Control Toggle */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-container border border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsSecured(!isSecured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 mt-0.5 ${isSecured ? 'bg-primary' : 'bg-outline-variant'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSecured ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <div>
                <div className="font-headline text-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                  Require Login to Access
                </div>
                <p className="text-on-surface-variant text-xs font-body mt-1">
                  {isSecured
                    ? "Users must register and log in to view this tutorial."
                    : "This tutorial is publicly accessible to all visitors."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">{saving ? "hourglass_empty" : "save"}</span>
              {saving ? "Saving..." : "Save Tutorial"}
            </button>
            <Link href="/admin/tutorials" className="px-8 py-4 bg-surface-container-highest text-on-surface-variant font-headline font-bold text-xs uppercase tracking-wider rounded-md hover:bg-surface-container transition-all">Cancel</Link>
            {saved && <span className="text-primary font-headline text-xs uppercase tracking-widest">✓ Saved</span>}
          </div>
        </form>
      </main>
    </div>
  );
}
