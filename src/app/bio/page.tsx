"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

interface BioEntry {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageData: string;
  createdAt: string;
}

export default function BioPage() {
  const [bios, setBios] = useState<BioEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bios")
      .then(r => r.json())
      .then(data => { if (data.bios) setBios(data.bios); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="py-20 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary blur-[120px] rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <span className="font-headline text-xs uppercase tracking-[0.3em] text-primary font-bold">The Team</span>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter mt-2 mb-4">Bio</h1>
            <p className="text-on-surface-variant max-w-xl font-body text-lg">Meet the minds behind The Pulse On AI.</p>
          </div>
        </section>

        {/* Bio Cards */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24">
          {loading ? (
            <div className="text-center py-20 text-on-surface-variant font-body">Loading...</div>
          ) : bios.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant font-body">No bio entries yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bios.map(entry => (
                <div
                  key={entry.id}
                  className="group flex flex-col bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-surface-container overflow-hidden">
                    {entry.imageData ? (
                      <img src={entry.imageData} alt={entry.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary-container/10">
                        <span className="material-symbols-outlined text-primary text-7xl opacity-30" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{entry.role}</span>
                    <h3 className="font-headline text-xl font-bold mt-1 mb-3 group-hover:text-primary transition-colors">{entry.name}</h3>
                    <p className="text-on-surface-variant text-sm font-body leading-relaxed flex-1">{entry.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-[#0d0e12] border-t border-[#47484c]/15">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto py-12 px-8">
          <div className="font-headline text-[#81ecff] font-bold text-xl">THE PULSE ON AI</div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/">Home</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/news">News</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/blogs">Blogs</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/training">Training</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/recommended">Recommended</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/bio">Bio</Link>
          </div>
          <div className="font-body text-sm text-[#f9f9f9]/60">© 2026 THE PULSE ON AI.</div>
        </div>
      </footer>
    </>
  );
}
