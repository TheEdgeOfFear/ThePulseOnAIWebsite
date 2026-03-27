"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => {
        if (data.blogs) setBlogs(data.blogs);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-20 px-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto relative">
            <span className="font-headline text-xs uppercase tracking-[0.3em] text-primary font-bold">Core Research</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter mt-2 mb-4">Research &amp; Synthesis</h1>
            <p className="text-on-surface-variant max-w-xl font-body text-lg">Deep analysis at the frontier of AI, Robotics, and emerging technology.</p>
          </div>
        </section>

        <section className="py-8 px-8 max-w-7xl mx-auto pb-24">
          {loading ? (
            <div className="text-center py-20 text-on-surface-variant font-body">Loading blog posts...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant font-body">No blog posts yet. Create one from the admin panel.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {blogs.map((blog, i) => (
                <div key={blog.id} className={`flex flex-col gap-6 group ${i === 1 ? 'md:translate-y-12' : ''}`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container">
                    {blog.imageUrl && (
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" src={blog.imageUrl} alt={blog.title} />
                    )}
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors" />
                  </div>
                  <div>
                    {blog.category && <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{blog.category}</span>}
                    <h2 className="font-headline text-xl font-bold mt-2 leading-tight group-hover:text-primary transition-colors">{blog.title}</h2>
                    <p className="mt-4 text-on-surface-variant text-sm leading-relaxed font-body">{blog.content?.substring(0, 150)}...</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Link href={`/blogs/${blog.slug}`} className="text-xs font-headline font-bold uppercase tracking-widest text-primary hover:underline">Read More</Link>
                      <span className="h-[1px] w-8 bg-primary/30" />
                      <span className="text-xs text-on-surface-variant font-body">{blog.createdAt}</span>
                    </div>
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
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/training">Training</Link>
          </div>
          <div className="font-body text-sm text-[#f9f9f9]/60">© 2026 THE PULSE ON AI.</div>
        </div>
      </footer>
    </>
  );
}
