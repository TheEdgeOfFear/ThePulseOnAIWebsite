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

// Sample data - will be replaced with DB calls
const sampleBlogs = [
  { id: "1", title: "Mimicking the Human Synapse", slug: "human-synapse", createdAt: "2026-03-18" },
  { id: "2", title: "The Alignment Problem", slug: "alignment-problem", createdAt: "2026-03-15" },
  { id: "3", title: "Qubits and Cognition", slug: "qubits-cognition", createdAt: "2026-03-10" },
];

export default function AdminBlogs() {
  const [blogs] = useState(sampleBlogs);

  return (
    <div className="min-h-screen bg-surface flex">
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/15 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-outline-variant/15">
          <div className="text-sm font-bold tracking-tighter text-primary font-headline">THE PULSE ON AI</div>
          <div className="text-[10px] text-on-surface-variant font-headline uppercase tracking-widest mt-1">Admin Console</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${item.href === '/admin/blogs' ? 'text-primary bg-surface-container' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}>
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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Blog Posts</h1>
            <p className="text-on-surface-variant text-sm mt-1 font-body">Manage your published articles</p>
          </div>
          <Link href="/admin/blogs/new" className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-5 py-3 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Post
          </Link>
        </div>

        <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/10">
            <div className="col-span-6 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Title</div>
            <div className="col-span-3 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Slug</div>
            <div className="col-span-2 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Date</div>
            <div className="col-span-1 font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">Actions</div>
          </div>
          {blogs.map((blog, i) => (
            <div key={blog.id} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-surface-container transition-colors ${i < blogs.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
              <div className="col-span-6 font-headline text-sm font-medium text-on-surface">{blog.title}</div>
              <div className="col-span-3 font-headline text-xs text-on-surface-variant">{blog.slug}</div>
              <div className="col-span-2 font-headline text-xs text-on-surface-variant">{blog.createdAt}</div>
              <div className="col-span-1 flex items-center gap-2">
                <Link href={`/admin/blogs/${blog.id}/edit`} className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-primary transition-colors">edit</Link>
                <button className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-error transition-colors">delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
