"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const searchableContent = [
  { title: "DeepMind's New Model Achieves 99% Logical Reasoning", category: "News", tag: "Breaking", href: "/news" },
  { title: "Robotics Stocks Surge as Factory Automation Hits Record Highs", category: "News", tag: "Market Alert", href: "/news" },
  { title: "Nvidia Blackwell Chips Integration Begins at Major Data Hubs", category: "News", tag: "Hardware", href: "/news" },
  { title: "Global AI Safety Accord Signed by 14 Leading Research Labs", category: "News", tag: "Policy", href: "/news" },
  { title: "Mimicking the Human Synapse: The End of Von Neumann Architecture", category: "Blog", tag: "Neuromorphic Computing", href: "/blogs" },
  { title: "The Alignment Problem: Who Codes the Morality of Autonomous Systems?", category: "Blog", tag: "Robotic Ethics", href: "/blogs" },
  { title: "Qubits and Cognition: Can Quantum Supremacy solve AGI?", category: "Blog", tag: "Quantum AI", href: "/blogs" },
  { title: "Prompt Engineering 2.0", category: "Training", tag: "Free", href: "/training" },
  { title: "Robotics Kinematics Deep Dive", category: "Training", tag: "Members Only", href: "/training" },
  { title: "LLM Fine-Tuning Workshop", category: "Training", tag: "Members Only", href: "/training" },
  { title: "Introduction to AI Agents", category: "Training", tag: "Free", href: "/training" },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim().length > 0
    ? searchableContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.tag.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const categoryIcon: Record<string, string> = {
    News: "newspaper",
    Blog: "article",
    Training: "school",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0d0e12]/90 backdrop-blur-xl" onClick={onClose} />

      {/* Search Panel */}
      <div className="relative w-full max-w-2xl bg-surface-container-low border border-outline-variant/20 rounded-2xl shadow-[0_0_80px_rgba(129,236,255,0.1)] overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-4 p-5 border-b border-outline-variant/15">
          <span className="material-symbols-outlined text-primary text-xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search news, blogs, training..."
            className="flex-1 bg-transparent text-on-surface text-lg font-body placeholder:text-on-surface-variant/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors font-headline text-xs uppercase tracking-widest flex items-center gap-1"
          >
            <span className="hidden sm:inline">ESC</span>
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length === 0 ? (
            <div className="p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3 block">manage_search</span>
              <p className="text-on-surface-variant text-sm font-body">Start typing to search across all content</p>
              <div className="flex justify-center gap-4 mt-4">
                <span className="text-[10px] font-headline uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-1 rounded">News</span>
                <span className="text-[10px] font-headline uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-1 rounded">Blogs</span>
                <span className="text-[10px] font-headline uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-1 rounded">Training</span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3 block">search_off</span>
              <p className="text-on-surface-variant text-sm font-body">No results for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="p-2">
              {filtered.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container transition-colors group"
                >
                  <span className="material-symbols-outlined text-primary/70 group-hover:text-primary transition-colors">
                    {categoryIcon[item.category] || "article"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline text-sm font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-headline uppercase tracking-widest text-primary">{item.category}</span>
                      <span className="text-on-surface-variant/30">·</span>
                      <span className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">{item.tag}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant/30 group-hover:text-primary transition-colors">arrow_forward</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-outline-variant/10 flex items-center justify-between">
          <span className="text-[10px] font-headline text-on-surface-variant/40 uppercase tracking-widest">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <span className="text-[10px] font-headline text-on-surface-variant/40 uppercase tracking-widest">
            Powered by The Pulse On AI
          </span>
        </div>
      </div>
    </div>
  );
}
