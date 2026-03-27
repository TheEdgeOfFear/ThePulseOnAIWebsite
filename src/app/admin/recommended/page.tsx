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

interface Recommendation {
  id: string;
  title: string;
  url: string;
  description: string;
  useCase: string;
  difficulty: "green" | "yellow" | "red";
  createdAt: string;
}

const difficultyLabels = { green: "Easy to Use", yellow: "Medium Learning", red: "Advanced" };
const difficultyColors = {
  green: "bg-green-500/20 text-green-400 border-green-500/30",
  yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  red: "bg-red-500/20 text-red-400 border-red-500/30",
};
const dotColors = { green: "bg-green-500", yellow: "bg-yellow-500", red: "bg-red-500" };

export default function AdminRecommended() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [useCase, setUseCase] = useState("");
  const [difficulty, setDifficulty] = useState<"green" | "yellow" | "red">("green");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function fetchRecs() {
    setLoading(true);
    fetch("/api/recommendations")
      .then(res => res.json())
      .then(data => { if (data.recommendations) setRecs(data.recommendations); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchRecs(); }, []);

  function resetForm() {
    setTitle(""); setUrl(""); setDescription(""); setUseCase(""); setDifficulty("green");
    setShowForm(false); setSaved(false); setError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url, description, useCase, difficulty }),
      });
      if (res.ok) {
        setSaved(true);
        fetchRecs();
        setTimeout(() => resetForm(), 800);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save.");
      }
    } catch { setError("Error saving. Check database connection."); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this recommendation?")) return;
    try {
      const res = await fetch(`/api/recommendations?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchRecs();
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
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.href === '/admin/recommended' ? 'text-primary bg-surface-container' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}>
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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Recommended Apps & Sites</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Curate AI tools and resources with difficulty ratings</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-5 py-3 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Recommendation
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-surface-container-low rounded-xl p-6 border border-primary/20 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">recommend</span>
              <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">New Recommendation</h2>
            </div>
            <form onSubmit={handleSave} className="space-y-4 max-w-xl">
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Title *</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="App or website name..." required />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Website URL *</label>
                <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="https://..." required />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Description *</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all resize-y" placeholder="What is this app/site?" required />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Use Case *</label>
                <textarea value={useCase} onChange={e => setUseCase(e.target.value)} rows={2} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all resize-y" placeholder="Best use case scenario..." required />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-3">Ease of Use</label>
                <div className="flex gap-3">
                  {(["green", "yellow", "red"] as const).map(level => (
                    <button key={level} type="button" onClick={() => setDifficulty(level)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all font-headline text-xs uppercase tracking-widest ${
                        difficulty === level ? difficultyColors[level] : "border-outline-variant/20 text-on-surface-variant hover:border-outline-variant/40"
                      }`}>
                      <span className={`w-3 h-3 rounded-full ${dotColors[level]}`} />
                      {difficultyLabels[level]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">save</span> Save
                </button>
                <button type="button" onClick={resetForm} className="px-8 py-4 bg-surface-container-highest text-on-surface-variant font-headline font-bold text-xs uppercase tracking-wider rounded-md hover:bg-surface-container transition-all">Cancel</button>
                {saved && <span className="text-primary font-headline text-xs uppercase tracking-widest">✓ Saved</span>}
                {error && <span className="text-error font-headline text-xs uppercase tracking-widest">{error}</span>}
              </div>
            </form>
          </div>
        )}

        {/* Recommendations Table */}
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/10">
            <div className="col-span-3 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Title</div>
            <div className="col-span-3 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Description</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Use Case</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Difficulty</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Actions</div>
          </div>
          {loading ? (
            <div className="px-6 py-12 text-center text-on-surface-variant font-body text-sm">Loading...</div>
          ) : recs.length === 0 ? (
            <div className="px-6 py-12 text-center text-on-surface-variant font-body text-sm">No recommendations yet. Click &quot;Add Recommendation&quot; to get started.</div>
          ) : (
            recs.map((rec, i) => (
              <div key={rec.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-surface-container transition-colors ${i < recs.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
                <div className="col-span-3">
                  <a href={rec.url} target="_blank" rel="noopener noreferrer" className="font-headline text-sm font-medium text-primary hover:underline">{rec.title}</a>
                </div>
                <div className="col-span-3 font-body text-xs text-on-surface-variant line-clamp-2">{rec.description}</div>
                <div className="col-span-2 font-body text-xs text-on-surface-variant line-clamp-2">{rec.useCase}</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded font-headline text-[10px] uppercase tracking-widest ${difficultyColors[rec.difficulty]}`}>
                    <span className={`w-2 h-2 rounded-full ${dotColors[rec.difficulty]}`} />
                    {difficultyLabels[rec.difficulty]}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <button onClick={() => handleDelete(rec.id)} className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-error transition-colors">delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
