import Navbar from "@/components/Navbar";
import Link from "next/link";

const sampleBlogs = [
  {
    id: "1",
    title: "Mimicking the Human Synapse: The End of Von Neumann Architecture",
    slug: "human-synapse",
    content: "How carbon-based biological patterns are inspiring the next generation of silicon hardware.",
    category: "Neuromorphic Computing",
    createdAt: "2026-03-18",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJORNdtnF3THbRecpbifPe5CJyK_23sQss1oAT1heETn5Eg9YI0b3lORujUN67Ol4IjjGune9tl0VIjEnCPACm5R4yd4RCDVToeraxdV2rlUj9F7picfyrLj0coGzZOBL7pCQoWJ7xaYSAF-kLmp4gbuPCYoOfWc7TfF4HiVnrGfBeu1MspzvgcOunaBkxi_2lejNvTMPV7OUzew-YtX7Baib3d7nXKZbjVPQgTe3k8pKpHjH9cSoCX9doUow4_qF4o-Um-SNdU50i",
  },
  {
    id: "2",
    title: "The Alignment Problem: Who Codes the Morality of Autonomous Systems?",
    slug: "alignment-problem",
    content: "Exploring the philosophical frameworks being embedded into large-scale decision models.",
    category: "Robotic Ethics",
    createdAt: "2026-03-15",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRf0Bth6fwiY7guIvH49jZrNlYQH48zGvBI5vj7XEZ526P0FVtue4C3QtLAVVMopIU5aqCk2FyrETsHFxgek1T9R7CPukwOXmSQDfsGsQz-Av39bcfET8DGKUh1umgOolxF-I4bzYPLFVQX9KWpJQIs5pnKcXJSjMorkoHlnsZ7Cqrm79w-EB39ZAqwwtSkVpjs3XqtLoaTLXi-UVyT4RuSVppYZJ0wNGOx8z0rXlRItCE9TeXGBjx1lDiDOkhdznwMVgIJ7wsj-wm",
  },
  {
    id: "3",
    title: "Qubits and Cognition: Can Quantum Supremacy solve AGI?",
    slug: "qubits-cognition",
    content: "Mapping the intersection of quantum processing and neural scaling laws.",
    category: "Quantum AI",
    createdAt: "2026-03-10",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeSGpER9aT15icSB-fo-xQkpDTy-EJkf8SvrLJeVkcSRyTzJUlqEGoDxe8h8j3874qanE2wXhjJrCipXGerQdFjQLYtkC3wnG0w50zmV2PH2AYP-XeYrK4e868uKdytyNNfQwRbwPQFLVr5D7LIgzyKVht4_y6cKY1m8p1AFN8MJRAggDTcr4F37AHlZg2Q3-BKY3Deozy1PqzJrbsBH9N7hle2kkmyvx_0rsRPoTyOGkesrtOdOM3zyViEop470wlD0f8GloMkW9O",
  },
];

export default function BlogsPage() {
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
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter mt-2 mb-4">Research & Synthesis</h1>
            <p className="text-on-surface-variant max-w-xl font-body text-lg">Deep analysis at the frontier of AI, Robotics, and emerging technology.</p>
          </div>
        </section>

        <section className="py-8 px-8 max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {sampleBlogs.map((blog, i) => (
              <div key={blog.id} className={`flex flex-col gap-6 group ${i === 1 ? 'md:translate-y-12' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container">
                  {blog.imageUrl && (
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" src={blog.imageUrl} alt={blog.title} />
                  )}
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors" />
                </div>
                <div>
                  <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{blog.category}</span>
                  <h2 className="font-headline text-xl font-bold mt-2 leading-tight group-hover:text-primary transition-colors">{blog.title}</h2>
                  <p className="mt-4 text-on-surface-variant text-sm leading-relaxed font-body">{blog.content}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Link href={`/blogs/${blog.slug}`} className="text-xs font-headline font-bold uppercase tracking-widest text-primary hover:underline">Read More</Link>
                    <span className="h-[1px] w-8 bg-primary/30" />
                    <span className="text-xs text-on-surface-variant font-body">{blog.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
