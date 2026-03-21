"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d0e12]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(129,236,255,0.08)]">
      <div className="flex justify-between items-center px-4 md:px-8 h-16 w-full">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tighter text-[#81ecff] font-headline">
          THE PULSE ON AI
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#81ecff] border-b-2 border-[#81ecff] pb-1" href="/">Feed</Link>
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#f9f9f9] hover:text-[#81ecff] transition-colors" href="/training">Training</Link>
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#f9f9f9] hover:text-[#81ecff] transition-colors" href="/blogs">Blogs</Link>
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#f9f9f9] hover:text-[#81ecff] transition-colors" href="/news">News</Link>
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden md:block material-symbols-outlined text-[#81ecff] hover:scale-105 transition-transform">search</button>
          <button className="hidden md:block bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-5 py-2 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform duration-200 active:scale-95">
            Connect Core
          </button>
          
          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-primary p-2 material-symbols-outlined"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#0d0e12]/95 backdrop-blur-3xl border-b border-white/10 flex flex-col p-6 space-y-6 shadow-2xl">
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#81ecff]" href="#">Feed</Link>
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#f9f9f9]" href="#">Training</Link>
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#f9f9f9]" href="#">Robotics</Link>
          <Link className="font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold text-[#f9f9f9]" href="#">News</Link>
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
            <button className="flex items-center gap-2 text-[#81ecff] font-headline uppercase font-bold text-xs">
               <span className="material-symbols-outlined text-sm">search</span> Search
            </button>
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-5 py-3 rounded-md font-headline font-bold text-xs uppercase tracking-wider">
              Connect Core
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
