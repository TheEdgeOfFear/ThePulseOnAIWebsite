"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { loadTutorials, type Tutorial } from "@/lib/dataStore";

export default function TrainingPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  useEffect(() => { setTutorials(loadTutorials()); }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-32 px-8 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary blur-[120px] rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <span className="inline-block px-4 py-1 rounded-sm bg-primary/10 border border-primary/20 text-primary font-headline text-[10px] font-bold uppercase tracking-[0.4em]">Academy Core</span>
              <h1 className="font-headline text-5xl font-bold tracking-tighter leading-none">UPGRADE YOUR <br /><span className="text-primary-dim">NEURAL WIRING</span></h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl font-body">
                Gain hands-on mastery of Large Language Models, Multi-Modal Agents, and Humanoid Control Systems. Some courses require login to access.
              </p>
              <Link href="/login" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_30px_rgba(129,236,255,0.4)] transition-all">
                <span className="material-symbols-outlined text-[18px]">lock_open</span>
                Login to Unlock All Content
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative glass-card border border-outline-variant/20 rounded-2xl p-1 overflow-hidden">
                <img className="rounded-xl w-full h-[400px] object-cover" alt="Server room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaxdffxHbBEyDOjDsJ5uaU73GQIIw34BgrCQd6JuZH8B7MJw5eRlabweiFzlYA5YcEXLlq_V2fmhywzGN6Ln4sI1VHKrNQnYZlXaqW7T67bNzcuGgqIqPRr1sYs5Ngd9EVPnAfDLafOyA2-jj_wDnLNf0C751N9tRg1hlRCAF6Rra6KekynF8vSNNbhUDCpJRaHL1oFxpUHjmzy6UOmfBHbRfehryOnaH-UjvZqvarZtqA0Kdm4oDK7gUHcKnZz40EFem_iR87Vst2" />
              </div>
            </div>
          </div>
        </section>

        {/* Tutorials Grid */}
        <section className="py-16 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-10">All Modules</h2>
            {tutorials.length === 0 ? (
              <div className="text-center py-20 text-on-surface-variant font-body">No tutorials yet. Create one from the admin panel.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map(tut => (
                  <div key={tut.id} className="flex flex-col gap-4 p-6 bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">{tut.type === "youtube" ? "play_circle" : "picture_as_pdf"}</span>
                        <h3 className="font-headline text-lg font-bold group-hover:text-primary transition-colors">{tut.title}</h3>
                      </div>
                      {tut.isSecured ? (
                        <span className="flex items-center gap-1 text-[10px] font-headline uppercase tracking-widest text-on-error-container bg-error-container/20 px-2 py-1 rounded flex-shrink-0">
                          <span className="material-symbols-outlined text-[12px]">lock</span> Members Only
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-headline uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded flex-shrink-0">
                          <span className="material-symbols-outlined text-[12px]">lock_open</span> Free
                        </span>
                      )}
                    </div>
                    <p className="text-on-surface-variant text-sm font-body leading-relaxed">{tut.description}</p>
                    <div className="flex items-center gap-3 pt-2">
                      {tut.isSecured ? (
                        <Link href="/login" className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary hover:underline">
                          <span className="material-symbols-outlined text-[14px]">login</span> Login to Access
                        </Link>
                      ) : (
                        <a href={tut.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary hover:underline">
                          <span className="material-symbols-outlined text-[14px]">{tut.type === "youtube" ? "play_circle" : "picture_as_pdf"}</span>
                          {tut.type === "youtube" ? "Watch" : "Download PDF"}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#0d0e12] border-t border-[#47484c]/15">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto py-12 px-8">
          <div className="font-headline text-[#81ecff] font-bold text-xl">THE PULSE ON AI</div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/">Home</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/news">News</Link>
            <Link className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="/blogs">Blogs</Link>
          </div>
          <div className="font-body text-sm text-[#f9f9f9]/60">© 2026 THE PULSE ON AI.</div>
        </div>
      </footer>
    </>
  );
}
