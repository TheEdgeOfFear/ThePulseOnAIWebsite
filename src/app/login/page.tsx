"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simple credential check - in production this calls NextAuth signIn
    if (email === "admin@thepulseonai.com" && password === "admin123") {
      // Store session flag
      document.cookie = "admin_session=true; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-2xl font-bold tracking-tighter text-primary font-headline mb-2">
            THE PULSE ON AI
          </div>
          <p className="text-on-surface-variant text-sm font-body">Admin Access Portal</p>
        </div>

        <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
              Secure Login
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                placeholder="admin@thepulseonai.com"
                required
              />
            </div>
            <div>
              <label className="block font-headline text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary px-4 py-3 font-body text-sm transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-error-container/20 border border-error/20 rounded-lg px-4 py-3">
                <p className="text-error text-xs font-headline">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest py-4 rounded-md hover:shadow-[0_0_30px_rgba(129,236,255,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access System"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-outline-variant/15">
            <a href="/" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-xs font-headline uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Public Site
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-[10px] font-headline text-on-surface-variant/40 uppercase tracking-widest">
          © 2026 THE PULSE ON AI. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
