"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const stats = [
  { label: "Total Blogs", value: "0", icon: "article" },
  { label: "News Articles", value: "0", icon: "newspaper" },
  { label: "Tutorials", value: "0", icon: "school" },
  { label: "Subscribers", value: "0", icon: "group" },
];

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Users", href: "/admin/users", icon: "group" },
  { label: "Blogs", href: "/admin/blogs", icon: "article" },
  { label: "News", href: "/admin/news", icon: "newspaper" },
  { label: "Tutorials", href: "/admin/tutorials", icon: "school" },
  { label: "View Site", href: "/", icon: "open_in_new" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant/15 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-outline-variant/15">
          <div className="text-sm font-bold tracking-tighter text-primary font-headline">THE PULSE ON AI</div>
          <div className="text-[10px] text-on-surface-variant font-headline uppercase tracking-widest mt-1">Admin Console</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">{item.icon}</span>
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-on-surface-variant text-sm mt-1 font-body">Welcome back. Here is your site overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-primary">{stat.icon}</span>
                <span className="font-headline text-2xl font-bold text-on-surface">{stat.value}</span>
              </div>
              <div className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 mb-8">
          <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/admin/blogs/new" className="flex items-center gap-3 p-4 bg-surface-container rounded-lg hover:bg-surface-container-high transition-all group">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add_circle</span>
              <div>
                <div className="font-headline text-xs font-bold uppercase tracking-wide">New Blog Post</div>
                <div className="text-[10px] text-on-surface-variant font-body">Write and publish</div>
              </div>
            </Link>
            <Link href="/admin/news/new" className="flex items-center gap-3 p-4 bg-surface-container rounded-lg hover:bg-surface-container-high transition-all group">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add_circle</span>
              <div>
                <div className="font-headline text-xs font-bold uppercase tracking-wide">Add News</div>
                <div className="text-[10px] text-on-surface-variant font-body">Manual entry</div>
              </div>
            </Link>
            <Link href="/admin/tutorials/new" className="flex items-center gap-3 p-4 bg-surface-container rounded-lg hover:bg-surface-container-high transition-all group">
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add_circle</span>
              <div>
                <div className="font-headline text-xs font-bold uppercase tracking-wide">New Tutorial</div>
                <div className="text-[10px] text-on-surface-variant font-body">PDF or YouTube</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Webhook Info */}
        <div className="bg-surface-container-low rounded-xl p-6 border border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">Activepieces Webhook</h2>
          </div>
          <p className="text-on-surface-variant text-sm font-body mb-3">Point your Activepieces automation to this endpoint to auto-publish news:</p>
          <div className="bg-surface-container rounded-lg px-4 py-3 font-headline text-xs text-primary border border-outline-variant/20">
            POST /api/webhooks/news
          </div>
          <p className="text-on-surface-variant/60 text-[10px] font-headline uppercase tracking-widest mt-2">Authorization: Bearer YOUR_ACTIVEPIECES_WEBHOOK_SECRET</p>
        </div>
      </main>
    </div>
  );
}
