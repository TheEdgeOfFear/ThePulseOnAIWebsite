"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { loadNews, type NewsArticle } from "@/lib/dataStore";

export default function NewsPage() {
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    // Load from localStorage first (instant)
    const localNews = loadNews();
    setAllNews(localNews);

    // Then fetch from D1 API and merge
    fetch("/api/news")
      .then(r => r.json())
      .then(data => {
        if (data.articles && Array.isArray(data.articles)) {
          const dbArticles: NewsArticle[] = data.articles;
          // Merge: combine both sources, deduplicate by ID
          const localIds = new Set(localNews.map(n => n.id));
          const merged = [...localNews];
          for (const article of dbArticles) {
            if (!localIds.has(article.id)) {
              merged.push(article);
            }
          }
          // Sort by date descending
          merged.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
          setAllNews(merged);
        }
      })
      .catch(() => {
        // D1 not available, just use localStorage — that's fine
      });
  }, []);

  const featured = allNews[0];
  const rest = allNews.slice(1);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="py-20 px-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <span className="font-headline text-xs uppercase tracking-[0.3em] text-primary font-bold">Live Stream</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter mt-2 mb-4">Neural Network News</h1>
            <p className="text-on-surface-variant max-w-xl font-body text-lg">Real-time intelligence from across the AI and Robotics frontier.</p>
          </div>
        </section>

        {/* Featured Article */}
        {featured && (
          <section className="px-8 max-w-7xl mx-auto mb-12">
            <div className="group relative overflow-hidden rounded-xl bg-surface-container aspect-video md:aspect-[21/8]">
              {featured.imageUrl && (
                <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" src={featured.imageUrl} alt={featured.title} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
              <div className="absolute bottom-0 p-8 md:p-12">
                <span className="bg-primary-container text-on-primary-container font-headline text-[10px] font-extrabold px-2 py-1 uppercase tracking-tighter mb-4 inline-block">{featured.category}</span>
                <h2 className="font-headline text-2xl md:text-4xl font-bold leading-tight mb-3 max-w-3xl">{featured.title}</h2>
                <p className="text-on-surface-variant line-clamp-2 max-w-2xl mb-4 font-body">{featured.summary}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-headline font-bold uppercase tracking-widest text-primary">{featured.source}</span>
                  <span className="h-[1px] w-8 bg-primary/30" />
                  <span className="text-xs text-on-surface-variant font-body">{featured.createdAt}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="px-8 max-w-7xl mx-auto pb-24">
          {rest.length === 0 && !featured ? (
            <div className="text-center py-20 text-on-surface-variant font-body">No news articles yet. Create one from the admin panel.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rest.map(item => (
                <div key={item.id} className="p-6 bg-surface-container-low rounded-xl border-l-4 border-primary hover:bg-surface-container transition-colors group cursor-pointer">
                  <span className="font-headline text-[10px] text-primary uppercase tracking-widest mb-2 block font-bold">{item.category}</span>
                  <h3 className="font-headline text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-on-surface-variant text-sm font-body line-clamp-2 mb-3">{item.summary}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-on-surface-variant">{item.createdAt}</span>
                    <span className="text-outline-variant">·</span>
                    <span className="text-xs text-primary font-headline">{item.source}</span>
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
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/blogs">Blogs</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/training">Training</Link>
          </div>
          <div className="font-body text-sm text-[#f9f9f9]/60">© 2026 THE PULSE ON AI.</div>
        </div>
      </footer>
    </>
  );
}
