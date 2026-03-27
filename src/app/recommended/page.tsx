"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Recommendation {
  id: string;
  title: string;
  url: string;
  description: string;
  useCase: string;
  difficulty: "green" | "yellow" | "red";
  createdAt: string;
}

const difficultyLabels = { green: "Easy to Use", yellow: "Medium Learning", red: "Advanced Learning" };
const difficultyColors = {
  green: "bg-green-500/15 text-green-400 border-green-500/30",
  yellow: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  red: "bg-red-500/15 text-red-400 border-red-500/30",
};
const dotColors = { green: "bg-green-500", yellow: "bg-yellow-500", red: "bg-red-500" };
const glowColors = { green: "shadow-green-500/20", yellow: "shadow-yellow-500/20", red: "shadow-red-500/20" };

export default function RecommendedPage() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recommendations")
      .then(r => r.json())
      .then(data => { if (data.recommendations) setRecs(data.recommendations); })
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
            <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary blur-[120px] rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <span className="font-headline text-xs uppercase tracking-[0.3em] text-primary font-bold">Curated by The Pulse</span>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter mt-2 mb-4">Recommended Apps & Sites</h1>
            <p className="text-on-surface-variant max-w-xl font-body text-lg">Hand-picked AI tools, platforms, and resources rated by ease of use.</p>
          </div>
        </section>

        {/* Traffic Light Legend */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-6 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <span className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Difficulty Key:</span>
            {(["green", "yellow", "red"] as const).map(level => (
              <div key={level} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${dotColors[level]}`} />
                <span className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">{difficultyLabels[level]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations Grid */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24">
          {loading ? (
            <div className="text-center py-20 text-on-surface-variant font-body">Loading recommendations...</div>
          ) : recs.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant font-body">No recommendations yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recs.map(rec => (
                <a
                  key={rec.id}
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col p-6 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all hover:shadow-lg ${glowColors[rec.difficulty]}`}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">open_in_new</span>
                      <h3 className="font-headline text-lg font-bold group-hover:text-primary transition-colors">{rec.title}</h3>
                    </div>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-headline text-[10px] uppercase tracking-widest flex-shrink-0 ${difficultyColors[rec.difficulty]}`}>
                      <span className={`w-2 h-2 rounded-full ${dotColors[rec.difficulty]}`} />
                      {difficultyLabels[rec.difficulty]}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-4 flex-1">{rec.description}</p>

                  {/* Use Case */}
                  <div className="bg-surface-container rounded-lg p-3 border border-outline-variant/10">
                    <p className="font-headline text-[10px] uppercase tracking-widest text-primary mb-1 font-bold">Use Case</p>
                    <p className="text-on-surface-variant text-xs font-body leading-relaxed">{rec.useCase}</p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-primary font-headline uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                    Visit Site
                  </div>
                </a>
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
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/bio">Bio</Link>
          </div>
          <div className="font-body text-sm text-[#f9f9f9]/60">© 2026 THE PULSE ON AI.</div>
        </div>
      </footer>
    </>
  );
}
