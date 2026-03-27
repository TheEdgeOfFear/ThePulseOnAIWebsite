"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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

interface BioEntry {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageData: string;
  createdAt: string;
}

export default function AdminBio() {
  const [bios, setBios] = useState<BioEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [imageData, setImageData] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function fetchBios() {
    setLoading(true);
    fetch("/api/bios")
      .then(res => res.json())
      .then(data => { if (data.bios) setBios(data.bios); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchBios(); }, []);

  function resetForm() {
    setName(""); setRole(""); setBio(""); setImageData("");
    setShowForm(false); setSaved(false); setError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/bios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, bio, imageData }),
      });
      if (res.ok) {
        setSaved(true);
        fetchBios();
        setTimeout(() => resetForm(), 800);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save.");
      }
    } catch { setError("Error saving. Check database connection."); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this bio entry?")) return;
    try {
      const res = await fetch(`/api/bios?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchBios();
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
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.href === '/admin/bio' ? 'text-primary bg-surface-container' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}>
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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Bio Entries</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Manage team bios with photos</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-5 py-3 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Bio
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-surface-container-low rounded-xl p-6 border border-primary/20 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">person</span>
              <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">New Bio Entry</h2>
            </div>
            <form onSubmit={handleSave} className="space-y-4 max-w-xl">
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Name *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="Full name..." required />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Role / Title *</label>
                <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all" placeholder="e.g. Lead Analyst, Founder..." required />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Bio *</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all resize-y" placeholder="Tell us about this person..." required />
              </div>
              <div>
                <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">Photo</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/20 file:text-primary file:font-headline file:text-xs file:uppercase file:tracking-wider file:cursor-pointer" />
                {imageData && (
                  <div className="mt-3 relative inline-block">
                    <img src={imageData} alt="Preview" className="w-24 h-24 rounded-lg object-cover border border-outline-variant/20" />
                    <button type="button" onClick={() => { setImageData(""); if (fileRef.current) fileRef.current.value = ""; }} className="absolute -top-2 -right-2 w-6 h-6 bg-error text-on-primary-container rounded-full flex items-center justify-center text-xs hover:scale-110 transition-transform">×</button>
                  </div>
                )}
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

        {/* Bios Table */}
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/10">
            <div className="col-span-1 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Photo</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Name</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Role</div>
            <div className="col-span-5 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Bio</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Actions</div>
          </div>
          {loading ? (
            <div className="px-6 py-12 text-center text-on-surface-variant font-body text-sm">Loading...</div>
          ) : bios.length === 0 ? (
            <div className="px-6 py-12 text-center text-on-surface-variant font-body text-sm">No bio entries yet. Click &quot;Add Bio&quot; to get started.</div>
          ) : (
            bios.map((entry, i) => (
              <div key={entry.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-surface-container transition-colors ${i < bios.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
                <div className="col-span-1">
                  {entry.imageData ? (
                    <img src={entry.imageData} alt={entry.name} className="w-10 h-10 rounded-full object-cover border border-outline-variant/20" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                    </div>
                  )}
                </div>
                <div className="col-span-2 font-headline text-sm font-medium text-on-surface">{entry.name}</div>
                <div className="col-span-2 font-body text-xs text-primary">{entry.role}</div>
                <div className="col-span-5 font-body text-xs text-on-surface-variant line-clamp-2">{entry.bio}</div>
                <div className="col-span-2 flex items-center gap-2">
                  <button onClick={() => handleDelete(entry.id)} className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-error transition-colors">delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
