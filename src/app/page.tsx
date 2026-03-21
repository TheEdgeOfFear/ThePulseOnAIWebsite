import Image from "next/image";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center justify-center overflow-hidden px-8">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-container blur-[120px] rounded-full"></div>
          </div>
          <div className="relative z-10 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/15 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-primary">System Online: v4.2.0</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.9] text-on-surface">
              OWN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-primary-dim">FUTURE</span><br/>BEFORE IT ARRIVES
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface-variant font-light mb-10 leading-relaxed">
              The Pulse delivers precision-engineered intelligence across the AI and Robotics frontier. Real-time data, neural insights, and the blueprints of tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary-container font-headline font-bold uppercase tracking-widest rounded-md hover:scale-105 transition-all shadow-[0_0_20px_rgba(129,236,255,0.3)]">
                Initialize Feed
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-surface-container-highest text-primary font-headline font-bold uppercase tracking-widest rounded-md border border-primary/10 hover:bg-surface-container transition-all">
                View Training
              </button>
            </div>
          </div>
        </section>

        {/* Latest News Grid */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
            <div>
              <span className="font-headline text-xs uppercase tracking-[0.3em] text-primary font-bold">Live Stream</span>
              <h2 className="font-headline text-4xl font-bold tracking-tight mt-2">Neural Network News</h2>
            </div>
            <button className="flex items-center gap-2 text-primary font-headline text-xs font-bold uppercase tracking-widest hover:translate-x-1 transition-transform">
              All Updates <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container aspect-video">
              {/* Using native img for external unconfigured domains but keeping Next Image import for future usage if needed */}
              <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Futuristic robotic arm and digital interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXkCl__vuNYVz2f9KGCtW3oer2Q8jSFBAIUct-6IWN0dk8x9DJ3KgyRYyTimo7hcr7SsYdcf9mmaSdW4I5WTTHH6PCHSct37VeXIzccvts91o3ERjqIULFODSNvr0V-5ZoVVygGr3StpSYODQEBWhxsqgsljfNfMnbpGSxEMqHbTIBIxLjlFCDNvCGr8olsiJYIzlav0uPRzBEZQGf6zUAHh6tgJrtOED_GhbPAzDUetlzSPgV346-6m1tj-RcspVWiG3sSM6sDppg" crossOrigin="anonymous"/>
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <span className="bg-primary-container text-on-primary-container font-headline text-[10px] font-extrabold px-2 py-1 uppercase tracking-tighter mb-4 inline-block">Breaking</span>
                <h3 className="font-headline text-3xl font-bold leading-none mb-4 max-w-xl">DeepMind's New Model Achieves 99% Logical Reasoning</h3>
                <p className="text-on-surface-variant line-clamp-2 max-w-lg mb-6">The latest architecture demonstrates near-human cognitive flexibility in abstract problem-solving environments.</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-headline font-bold uppercase tracking-widest text-primary">Read More</span>
                  <span className="h-[1px] w-12 bg-primary/30"></span>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="p-6 bg-surface-container-low rounded-xl border-l-4 border-primary">
                <span className="font-headline text-[10px] text-primary-dim uppercase tracking-widest mb-2 block font-bold">Market Alert</span>
                <h4 className="font-headline text-lg font-bold leading-tight mb-2">Robotics Stocks Surge as Factory Automation Hits Record Highs</h4>
                <span className="text-xs text-on-surface-variant font-medium">14m ago · Data Pulse</span>
              </div>
              <div className="p-6 bg-surface-container-low rounded-xl">
                <span className="font-headline text-[10px] text-primary-dim uppercase tracking-widest mb-2 block font-bold">Hardware</span>
                <h4 className="font-headline text-lg font-bold leading-tight mb-2">Nvidia Blackwell Chips Integration Begins at Major Data Hubs</h4>
                <span className="text-xs text-on-surface-variant font-medium">42m ago · Tech Desk</span>
              </div>
              <div className="p-6 bg-surface-container-low rounded-xl">
                <span className="font-headline text-[10px] text-primary-dim uppercase tracking-widest mb-2 block font-bold">Policy</span>
                <h4 className="font-headline text-lg font-bold leading-tight mb-2">Global AI Safety Accord Signed by 14 Leading Research Labs</h4>
                <span className="text-xs text-on-surface-variant font-medium">2h ago · Policy Wire</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blog Posts */}
        <section className="py-24 bg-surface-container-low relative">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-headline text-4xl font-bold tracking-tight mb-16 text-center">Core Research &amp; Synthesis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-6 group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" alt="Abstract neural network visualization nodes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJORNdtnF3THbRecpbifPe5CJyK_23sQss1oAT1heETn5Eg9YI0b3lORujUN67Ol4IjjGune9tl0VIjEnCPACm5R4yd4RCDVToeraxdV2rlUj9F7picfyrLj0coGzZOBL7pCQoWJ7xaYSAF-kLmp4gbuPCYoOfWc7TfF4HiVnrGfBeu1MspzvgcOunaBkxi_2lejNvTMPV7OUzew-YtX7Baib3d7nXKZbjVPQgTe3k8pKpHjH9cSoCX9doUow4_qF4o-Um-SNdU50i" crossOrigin="anonymous"/>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors"></div>
                </div>
                <div>
                  <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Neuromorphic Computing</span>
                  <h3 className="font-headline text-xl font-bold mt-2 leading-tight group-hover:text-primary transition-colors">Mimicking the Human Synapse: The End of Von Neumann Architecture</h3>
                  <p className="mt-4 text-on-surface-variant text-sm leading-relaxed">How carbon-based biological patterns are inspiring the next generation of silicon hardware.</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 group md:translate-y-12">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" alt="Sleek white humanoid robot head side profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRf0Bth6fwiY7guIvH49jZrNlYQH48zGvBI5vj7XEZ526P0FVtue4C3QtLAVVMopIU5aqCk2FyrETsHFxgek1T9R7CPukwOXmSQDfsGsQz-Av39bcfET8DGKUh1umgOolxF-I4bzYPLFVQX9KWpJQIs5pnKcXJSjMorkoHlnsZ7Cqrm79w-EB39ZAqwwtSkVpjs3XqtLoaTLXi-UVyT4RuSVppYZJ0wNGOx8z0rXlRItCE9TeXGBjx1lDiDOkhdznwMVgIJ7wsj-wm" crossOrigin="anonymous"/>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors"></div>
                </div>
                <div>
                  <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Robotic Ethics</span>
                  <h3 className="font-headline text-xl font-bold mt-2 leading-tight group-hover:text-primary transition-colors">The Alignment Problem: Who Codes the Morality of Autonomous Systems?</h3>
                  <p className="mt-4 text-on-surface-variant text-sm leading-relaxed">Exploring the philosophical frameworks being embedded into large-scale decision models.</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" alt="Close up of digital human eye with fiber optic patterns" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeSGpER9aT15icSB-fo-xQkpDTy-EJkf8SvrLJeVkcSRyTzJUlqEGoDxe8h8j3874qanE2wXhjJrCipXGerQdFjQLYtkC3wnG0w50zmV2PH2AYP-XeYrK4e868uKdytyNNfQwRbwPQFLVr5D7LIgzyKVht4_y6cKY1m8p1AFN8MJRAggDTcr4F37AHlZg2Q3-BKY3Deozy1PqzJrbsBH9N7hle2kkmyvx_0rsRPoTyOGkesrtOdOM3zyViEop470wlD0f8GloMkW9O" crossOrigin="anonymous"/>
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors"></div>
                </div>
                <div>
                  <span className="font-headline text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Quantum AI</span>
                  <h3 className="font-headline text-xl font-bold mt-2 leading-tight group-hover:text-primary transition-colors">Qubits and Cognition: Can Quantum Supremacy solve Artificial General Intelligence?</h3>
                  <p className="mt-4 text-on-surface-variant text-sm leading-relaxed">Mapping the intersection of quantum processing and neural scaling laws.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Preview Section */}
        <section className="py-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <span className="inline-block px-4 py-1 rounded-sm bg-primary/10 border border-primary/20 text-primary font-headline text-[10px] font-bold uppercase tracking-[0.4em]">Academy Core</span>
              <h2 className="font-headline text-5xl font-bold tracking-tighter leading-none">UPGRADE YOUR <br/><span className="text-primary-dim">NEURAL WIRING</span></h2>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                Our proprietary curriculum isn't just theory. Gain hands-on mastery of Large Language Models, Multi-Modal Agents, and Humanoid Control Systems.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-high border-l-2 border-primary">
                  <span className="material-symbols-outlined text-primary">terminal</span>
                  <div>
                    <h4 className="font-headline font-bold text-sm">Active Module: Prompt Engineering 2.0</h4>
                    <p className="text-xs text-on-surface-variant">Mastering the logic behind stochastic resonance.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container opacity-60">
                  <span className="material-symbols-outlined">memory</span>
                  <div>
                    <h4 className="font-headline font-bold text-sm">Next: Robotics Kinematics</h4>
                    <p className="text-xs text-on-surface-variant">Unlocks at Level 3 Clearance</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 px-10 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_30px_rgba(129,236,255,0.4)] transition-all">
                Enter Academy
              </button>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative glass-card border border-outline-variant/20 rounded-2xl p-1 overflow-hidden">
                <img className="rounded-xl w-full h-[500px] object-cover" alt="High tech dark server room with blue lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaxdffxHbBEyDOjDsJ5uaU73GQIIw34BgrCQd6JuZH8B7MJw5eRlabweiFzlYA5YcEXLlq_V2fmhywzGN6Ln4sI1VHKrNQnYZlXaqW7T67bNzcuGgqIqPRr1sYs5Ngd9EVPnAfDLafOyA2-jj_wDnLNf0C751N9tRg1hlRCAF6Rra6KekynF8vSNNbhUDCpJRaHL1oFxpUHjmzy6UOmfBHbRfehryOnaH-UjvZqvarZtqA0Kdm4oDK7gUHcKnZz40EFem_iR87Vst2" crossOrigin="anonymous"/>
                <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-transparent"></div>
                <div className="absolute top-10 right-10 flex flex-col gap-2">
                  <div className="flex gap-1">
                    <span className="h-1 w-8 bg-primary"></span>
                    <span className="h-1 w-2 bg-primary/30"></span>
                    <span className="h-1 w-2 bg-primary/30"></span>
                  </div>
                  <span className="font-headline text-[10px] font-bold text-primary tracking-widest text-right">SECURE FEED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 px-8 mb-12">
          <div className="max-w-4xl mx-auto bg-primary-container/10 border border-primary/20 rounded-3xl p-12 relative overflow-hidden text-center">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-dim/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl text-primary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <h2 className="font-headline text-4xl font-bold tracking-tight mb-4">JOIN THE PULSE</h2>
              <p className="text-on-surface-variant mb-10 max-w-lg mx-auto">
                Get weekly technical synthesis, hidden data points, and exclusive early access to the AI frontier. 
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input className="flex-grow bg-surface-container-highest border-0 border-b-2 border-outline-variant text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 focus:border-primary px-6 py-4 font-headline font-bold text-xs transition-all" placeholder="NEURAL_IDENTIFIER@DOMAIN.COM" type="email"/>
                <button className="bg-primary text-on-primary-container px-8 py-4 font-headline font-bold uppercase tracking-widest rounded-md hover:scale-105 active:scale-95 transition-all" type="button">
                  Connect
                </button>
              </form>
              <p className="mt-6 text-[10px] font-headline font-bold text-on-surface-variant/60 uppercase tracking-widest">
                Zero Spam. Pure Intelligence. 100% Secure.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0d0e12] border-t border-[#47484c]/15 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto py-12 px-8">
          <div className="font-headline text-[#81ecff] font-bold text-xl">THE PULSE ON AI</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="#">Neural Network</a>
            <a className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="#">Documentation</a>
            <a className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="#">API Access</a>
            <a className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="#">Security</a>
            <a className="font-body text-sm text-[#f9f9f9]/60 hover:text-[#81ecff] transition-all" href="#">Privacy</a>
          </div>
          <div className="font-body text-sm text-[#f9f9f9]/60">© 2026 THE PULSE ON AI. SYSTEMS ACTIVE.</div>
        </div>
      </footer>
    </>
  );
}
