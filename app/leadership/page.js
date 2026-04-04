"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

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
    <div className="bg-dark text-glacier min-h-screen selection:bg-gold selection:text-dark overflow-x-hidden">
      <div className="grain-overlay" />
      <div className="cursor-dot hidden md:block" />
      <div className="cursor-outline hidden md:block" />

      <Navbar />

      <main className="animate-page-in text-glacier min-h-screen">
        {/* Leadership Hero */}
        <section className="min-h-[70vh] flex flex-col justify-center px-8 md:px-24 pt-32 relative overflow-hidden">
            <div className="max-w-7xl relative z-10">
                <span className="font-industrial text-xs tracking-[0.5em] text-gold mb-6 block underline decoration-gold/30 underline-offset-8 decoration-2">Corporate Structure</span>
                <h1 className="font-headline italic text-[11vw] sm:text-6xl md:text-[8rem] leading-[0.9] mb-12">
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

        {/* Executive Board Grid (4 Founders) */}
        <section ref={introSect.ref} className="py-48 px-8 md:px-24 bg-dark relative">
             <div className="max-w-screen-2xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                     
                     {/* Dheeraj Anand - Bworth */}
                     <div className={`transition-all duration-1000 ${introSect.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
                         <Link href="https://bworth.co.in/" target="_blank" className="group">
                             <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-8 editorial-shadow bg-gold/5 border border-gold/10 flex items-center justify-center">
                                 <span className="material-symbols-outlined text-gold/20 text-6xl">person</span>
                                 <div className="absolute inset-0 bg-dark/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <h3 className="font-headline italic text-3xl mb-1 text-gold">Dheeraj Anand</h3>
                             <p className="font-body text-[8px] tracking-[0.4em] text-glacier/40 mb-6 font-bold uppercase">FOUNDER · Bworth</p>
                             <p className="font-body text-[11px] text-glacier/60 leading-relaxed italic border-l border-gold/20 pl-4">
                                 "Defining the industrial aesthetic through distinctive premium apparel and lifestyle garments."
                             </p>
                         </Link>
                     </div>

                     {/* Devam Srivastava - Synchronous */}
                     <div className={`transition-all duration-1000 delay-150 ${introSect.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
                         <Link href="https://www.synchronousbuilddigital.com/" target="_blank" className="group">
                             <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-8 editorial-shadow bg-gold/5 border border-gold/10 flex items-center justify-center">
                                 <span className="material-symbols-outlined text-gold/20 text-6xl">person</span>
                                  <div className="absolute inset-0 bg-dark/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <h3 className="font-headline italic text-3xl mb-1 text-gold">Devam Srivastava</h3>
                             <p className="font-body text-[8px] tracking-[0.4em] text-glacier/40 mb-6 font-bold uppercase">FOUNDER & CEO · Synchronous</p>
                             <p className="font-body text-[11px] text-glacier/60 leading-relaxed italic border-l border-gold/20 pl-4">
                                 "Architecting full-stack digital marketing and brand strategy hubs for global market expansion."
                             </p>
                         </Link>
                     </div>

                     {/* Saurabh Jain - VegaVrudhi */}
                     <div className={`transition-all duration-1000 delay-300 ${introSect.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
                         <Link href="https://www.vegavruddhi.com/" target="_blank" className="group">
                             <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-8 editorial-shadow bg-gold/5 border border-gold/10 flex items-center justify-center">
                                 <span className="material-symbols-outlined text-gold/20 text-6xl">person</span>
                                  <div className="absolute inset-0 bg-dark/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <h3 className="font-headline italic text-3xl mb-1 text-gold">Saurabh Jain</h3>
                             <p className="font-body text-[8px] tracking-[0.4em] text-glacier/40 mb-6 font-bold uppercase">FOUNDER · VegaVrudhi</p>
                              <p className="font-body text-[11px] text-glacier/60 leading-relaxed italic border-l border-gold/20 pl-4">
                                 "Driving exponential growth through sophisticated sales and specialized human capital pods."
                             </p>
                         </Link>
                     </div>

                     {/* Yograj Rundhanker - RYM */}
                     <div className={`transition-all duration-1000 delay-[450ms] ${introSect.isVisible ? 'opacity-100' : 'opacity-0 translate-y-20'}`}>
                         <Link href="https://rymgrenergy.com/" target="_blank" className="group">
                             <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-8 editorial-shadow bg-gold/5 border border-gold/10 flex items-center justify-center">
                                 <span className="material-symbols-outlined text-gold/20 text-6xl">person</span>
                                  <div className="absolute inset-0 bg-dark/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <h3 className="font-headline italic text-3xl mb-1 text-gold">Yograj Rundhanker</h3>
                             <p className="font-body text-[8px] tracking-[0.4em] text-glacier/40 mb-6 font-bold uppercase">FOUNDER & CEO · RYM</p>
                              <p className="font-body text-[11px] text-glacier/60 leading-relaxed italic border-l border-gold/20 pl-4">
                                 "Leading the intersection of deep-learning AI and sovereign green energy infrastructure."
                             </p>
                         </Link>
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
                   <div className="font-industrial text-gold-premium tracking-[0.6em] text-3xl uppercase">RISEMATE VENTURE</div>
                   <p className="font-body text-[10px] uppercase tracking-widest opacity-20">© 2024 RISEMATE VENTURE. ASSETS OF EXCELLENCE.</p>
             </div>
        </footer>
      </main>
    </div>
  );
}
