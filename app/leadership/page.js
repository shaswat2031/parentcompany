"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Custom Hook for Scroll Reveal
function useReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function Leadership() {
  const introSect = useReveal();
  const boardSect = useReveal();

  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");
    const moveCursor = (e) => {
      if (dot && outline) {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        outline.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="bg-dark text-glacier min-h-screen selection:bg-gold selection:text-dark">
      <div className="grain-overlay" />
      <div className="cursor-dot hidden md:block" />
      <div className="cursor-outline hidden md:block" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-sm bg-dark/20">
          <Link href="/" className="font-industrial text-2xl tracking-[0.2em] text-gold">ELYSIAN</Link>
          <div className="flex gap-12 font-body text-[10px] uppercase tracking-[0.4em] font-semibold">
              <Link href="/companies" className="hover:text-gold transition-colors">Portfolios</Link>
              <Link href="/operations" className="hover:text-gold transition-colors">Presence</Link>
              <Link href="/leadership" className="text-gold border-b border-gold/40 pb-1">Governance</Link>
          </div>
          <Link href="/invest" className="border border-gold/40 px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-dark transition-all duration-300">
              Investor Portal
          </Link>
      </nav>

      <main className="animate-page-in text-glacier min-h-screen">
        {/* Leadership Hero */}
        <section className="min-h-[70vh] flex flex-col justify-center px-8 md:px-24 pt-32 relative overflow-hidden">
            <div className="max-w-7xl relative z-10">
                <span className="font-industrial text-xs tracking-[0.5em] text-gold mb-6 block underline decoration-gold/30 underline-offset-8 decoration-2">Corporate Structure</span>
                <h1 className="font-headline italic text-6xl md:text-[8rem] leading-[0.9] mb-12">
                   The <span className="text-gold">Minds</span> Behind <br /> the Legacy.
                </h1>
                <div className="gold-rule w-1/4 mb-12 !justify-start" />
                <p className="font-body text-xl text-glacier/60 max-w-xl leading-relaxed italic border-l border-gold/20 pl-8">
                    Architecting the future through disciplined stewardship and a relentless pursuit of industrial excellence.
                </p>
            </div>
            {/* Background Graphic */}
            <div className="absolute top-1/2 right-[-5vw] w-[40vw] h-[40vw] border-[0.2px] border-gold/5 rotate-45 pointer-events-none" />
        </section>

        {/* Executive Board Grid (Asymmetric) */}
        <section ref={introSect.ref} className="py-48 px-8 md:px-24 bg-dark relative">
             <div className="max-w-screen-2xl mx-auto">
                 <div className="flex flex-col md:flex-row gap-32">
                     {/* Julian Thorne */}
                     <div className={`md:w-1/3 transition-all duration-1000 ${introSect.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
                         <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-12 editorial-shadow group">
                             <Image 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7i6dBAXpca1hYgt0M0PmONofEd-DdBlkcOA4Z6AWJlBtgjG9KV75wfl1SjcUOh1EJA6oI_ib7pRx0ikt_igVBvLj3y5mS-23ovMpk3Rf8mIz5jeDQxoOVzHhxMeAnXiARWzKr8M1lK0WDtT1ikp72yfDBwucu2kj8lCQkFoDEAEHz8luwr8_ArqpaqyYz915mniOwdIIBr_Tr09rwTHbN0u8PO38Gy1c1rSCUywgxuUGPvd1SHzXm_W6Rtu6JnJhjAqgn4VvXNvMa" 
                                fill 
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110" 
                                alt="Julian Thorne" 
                             />
                             <div className="absolute inset-0 bg-dark/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <h3 className="font-headline italic text-4xl mb-2 text-gold">Julian Thorne</h3>
                         <p className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/40 mb-8 font-bold">CHAIRMAN & FOUNDER</p>
                         <p className="font-body text-sm text-glacier/60 leading-relaxed italic border-l border-gold/20 pl-4">
                             "Founding strategist with four decades in heavy industry. We build for immortality, not quarterly cycles."
                         </p>
                     </div>

                     {/* Elena Moretti */}
                     <div className={`md:w-1/3 mt-24 transition-all duration-1000 delay-300 ${introSect.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
                         <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-12 editorial-shadow group">
                             <Image 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy1bFBbWTz_9m28FHzGbj0siJiWG-lc7cM3QT2Gsjf62KQ43PI8SdKgl0cDZqo9LeCqts0sRuOJSUDCzSter_U9l0YrWIDM1qcvTKfAtTo-jSd_ZXxeQU3zTo1Yv6hDlloIVmyVdYt88J4O5LqGvOGU-Yk-3t6BAqJKDwLlYaDeBajL07YfR6tj0lw0MPXzAFEKgEMpUO_HFWpFXMA_kgUSgf68XyFQINU-Y9bJH4kl6WBHc71X0-bu3eR_guofTJEbgT5oiFJ1krG" 
                                fill 
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                                alt="Elena Moretti" 
                             />
                              <div className="absolute inset-0 bg-dark/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <h3 className="font-headline italic text-4xl mb-2 text-gold">Elena Moretti</h3>
                         <p className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/40 mb-8 font-bold">CHIEF EXECUTIVE OFFICER</p>
                         <p className="font-body text-sm text-glacier/60 leading-relaxed italic border-l border-gold/20 pl-4">
                             "Overseeing the conglomerate's transition into renewable energy and high-frequency biotechnologies."
                         </p>
                     </div>

                     {/* Alistair Vaughn */}
                     <div className={`md:w-1/3 mt-48 transition-all duration-1000 delay-500 ${introSect.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
                         <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-12 editorial-shadow group">
                             <Image 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYFf4WeYmKuhLqQiN8MiDfD6gnM0LeDS0T8X-pHX1X00GDBeRSo60Sh5crwO0K7iWdvdSPQkTHv7GCz297H4I6N36o8nCcNZ_q5tpNqViiVGoFQqZtmmRnXNpz8nyyrzHeJYE0bz9boRtvrbwIA98YHqe3MnMLruLJlCZdKQNu8uKrV8Ky4CUfkWsrP6WM3DZH4wWrP7r8eIgjTh0HBplLq7nUBftAZfx-S4iU9CMRiOMjMynaUdvMNs0nxoRC4rgENy8wLpigmAz5" 
                                fill 
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                                alt="Alistair Vaughn" 
                             />
                              <div className="absolute inset-0 bg-dark/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                         <h3 className="font-headline italic text-4xl mb-2 text-gold">Alistair Vaughn</h3>
                         <p className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/40 mb-8 font-bold">CHIEF VISIONARY OFFICER</p>
                          <p className="font-body text-sm text-glacier/60 leading-relaxed italic border-l border-gold/20 pl-4">
                             "Directing the Innovation Labs and scouting the next frontier of human-centric technologies."
                         </p>
                     </div>
                 </div>
             </div>
        </section>

        {/* Board of Directors Section */}
        <section ref={boardSect.ref} className="py-48 px-8 md:px-24 bg-gold text-dark relative overflow-hidden">
             <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-24 items-start">
                  <div className="md:col-span-5">
                      <h2 className="font-headline italic text-7xl md:text-9xl mb-12 leading-tight">Board of <br />Directors.</h2>
                      <div className="h-0.5 bg-dark w-1/3 mb-12" />
                      <p className="font-body text-xl max-w-sm leading-relaxed mb-12">
                          A diverse panel of world-class experts steering international oversight and strategic compliance.
                      </p>
                  </div>
                  <div className="md:col-span-7 space-y-16">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                            <div className="border-l border-dark/20 pl-8 transition-all hover:translate-x-2">
                                <h4 className="font-headline text-3xl italic mb-4">Dr. Marcus Chen</h4>
                                <p className="font-body text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-4">INDEPENDENT DIRECTOR</p>
                                <p className="font-body text-sm opacity-60">Former CTO of Global Energetics. Expert in deep-tech compliance.</p>
                            </div>
                            <div className="border-l border-dark/20 pl-8 transition-all hover:translate-x-2">
                                <h4 className="font-headline text-3xl italic mb-4">Sophia Laurent</h4>
                                <p className="font-body text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-4">AUDIT CHAIR</p>
                                <p className="font-body text-sm opacity-60">International Corporate Law and Cross-border Merger Regulation.</p>
                            </div>
                            <div className="border-l border-dark/20 pl-8 transition-all hover:translate-x-2">
                                <h4 className="font-headline text-3xl italic mb-4">Jameson Burke</h4>
                                <p className="font-body text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-4">ESG OFFICER</p>
                                <p className="font-body text-sm opacity-60">Dedicated to implementing ethical frameworks across global hubs.</p>
                            </div>
                            <div className="border-l border-dark/20 pl-8 transition-all hover:translate-x-2">
                                <h4 className="font-headline text-3xl italic mb-4">Amara Okafor</h4>
                                <p className="font-body text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-4">RISK ADVISOR</p>
                                <p className="font-body text-sm opacity-60">Geopolitical market shifts and emerging infrastructure specialist.</p>
                            </div>
                       </div>
                  </div>
             </div>
        </section>

        {/* Closing Footer CTA */}
        <section className="py-64 px-8 md:px-24 bg-dark">
             <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
                  <h2 className="font-headline italic text-5xl md:text-[8rem] text-glacier/20 mb-12 italic text-center">INTEGRITY. LEGACY.</h2>
                  <Link href="/#contact" className="text-gold font-industrial text-xl tracking-[0.6em] border-b border-gold/40 pb-2 hover:border-gold transition-all uppercase">
                      Contact Board →
                  </Link>
             </div>
        </section>

        <footer className="bg-dark py-12 px-8 md:px-24 border-t border-white/5">
             <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                   <div className="font-industrial text-gold tracking-[0.6em] text-3xl uppercase">ELYSIAN</div>
                   <p className="font-body text-[10px] uppercase tracking-widest opacity-20">© 2024 ELYSIAN SOVEREIGN GROUP. ARCHITECTS OF LEGACY.</p>
             </div>
        </footer>
      </main>
    </div>
  );
}
