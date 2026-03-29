"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type BioEntry = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageData: string;
};

export default function BioPreview() {
  const [bios, setBios] = useState<BioEntry[]>([]);
  useEffect(() => {
    fetch("/api/bios")
      .then(res => res.json())
      .then(data => {
        if (data.bios) setBios(data.bios);
      })
      .catch(console.error);
  }, []);

  if (bios.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-surface-container-low relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-outline-variant/10 pb-6 gap-4">
          <div>
            <span className="font-headline text-xs uppercase tracking-[0.3em] text-primary font-bold">The Team</span>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mt-2">Behind The Pulse</h2>
          </div>
          <Link href="/bio" className="flex items-center gap-2 text-primary font-headline text-xs font-bold uppercase tracking-widest hover:translate-x-1 transition-transform">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bios.slice(0, 3).map(entry => (
            <Link href="/bio" key={entry.id} className="group flex flex-col bg-surface-container rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[4/3] bg-surface-container-high overflow-hidden">
                {entry.imageData ? (
                  <img src={entry.imageData} alt={entry.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary-container/10">
                    <span className="material-symbols-outlined text-primary text-6xl opacity-30" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{entry.role}</span>
                <h3 className="font-headline text-lg font-bold mt-1 mb-2 group-hover:text-primary transition-colors">{entry.name}</h3>
                <p className="text-on-surface-variant text-sm font-body leading-relaxed line-clamp-3">{entry.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
