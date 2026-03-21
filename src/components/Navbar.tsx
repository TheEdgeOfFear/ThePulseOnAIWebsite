"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
  { label: "Feed", href: "/" },
  { label: "Training", href: "/training" },
  { label: "Blogs", href: "/blogs" },
  { label: "News", href: "/news" },
  { label: "Recommended", href: "/recommended" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0d0e12]/70 backdrop-blur-xl shadow-[0_0_40px_rgba(129,236,255,0.08)]">
        <div className="flex justify-between items-center px-4 md:px-8 h-16 w-full">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter text-[#81ecff] font-headline">
            THE PULSE ON AI
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline uppercase tracking-[0.1em] text-[0.75rem] font-bold transition-colors ${
                  isActive(link.href)
                    ? "text-[#81ecff] border-b-2 border-[#81ecff] pb-1"
                    : "text-[#f9f9f9] hover:text-[#81ecff]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:block material-symbols-outlined text-[#81ecff] hover:scale-105 transition-transform cursor-pointer"
            >
              search
            </button>
            <Link href="/login" className="hidden md:block bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-5 py-2 rounded-md font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform duration-200 active:scale-95">
              Connect Core
            </Link>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden text-primary p-2 material-symbols-outlined z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? "close" : "menu"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu - slides in from right */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[55] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#0d0e12] border-l border-[#81ecff]/10 z-[58] md:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <span className="font-headline text-sm font-bold text-[#81ecff] tracking-tighter">NAVIGATION</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="material-symbols-outlined text-[#81ecff] text-xl"
          >
            close
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col p-4 gap-1 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-4 rounded-lg font-headline uppercase tracking-[0.15em] text-[0.75rem] font-bold transition-all ${
                isActive(link.href)
                  ? "text-[#81ecff] bg-[#81ecff]/10 border-l-2 border-[#81ecff]"
                  : "text-[#f9f9f9]/80 hover:text-[#81ecff] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {link.label === "Feed" ? "dynamic_feed" : link.label === "Training" ? "school" : link.label === "Blogs" ? "article" : "newspaper"}
              </span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <button
            onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[#81ecff] font-headline uppercase font-bold text-xs tracking-widest hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-lg">search</span> Search
          </button>
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-5 py-3 rounded-md font-headline font-bold text-xs uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            Connect Core
          </Link>
        </div>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
