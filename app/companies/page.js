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

export default function Companies() {
  const bworthSect = useReveal();
  const vegaSect = useReveal();
  const rymSect = useReveal();
  const syncSect = useReveal();

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
              <Link href="/companies" className="text-gold border-b border-gold/40 pb-1">Portfolios</Link>
              <Link href="/operations" className="hover:text-gold transition-colors">Presence</Link>
              <Link href="/leadership" className="hover:text-gold transition-colors">Governance</Link>
          </div>
          <Link href="/invest" className="border border-gold/40 px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-dark transition-all duration-300">
              Investor Portal
          </Link>
      </nav>

      <main className="animate-page-in">
        {/* Portfolio Hero */}
        <section className="min-h-[70vh] flex flex-col justify-center px-8 md:px-24 pt-32 relative overflow-hidden">
            <div className="max-w-7xl relative z-10">
                <span className="font-industrial text-xs tracking-[0.5em] text-gold mb-6 block">Global Assets</span>
                <h1 className="font-headline italic text-6xl md:text-9xl leading-[0.9] mb-12">
                   The <span className="text-gold">Sovereign</span> <br /> Portfolio.
                </h1>
                <div className="gold-rule w-1/4 mb-12 !justify-start" />
                <p className="font-body text-xl text-glacier/60 max-w-xl leading-relaxed italic">
                    Four distinct empires, unified by a singular vision of industrial immortality.
                </p>
            </div>
            {/* Background Graphic */}
            <div className="absolute top-1/2 right-[-10vw] w-[60vw] h-[60vw] border-[0.5px] border-gold/10 rounded-full -translate-y-1/2 pointer-events-none" />
        </section>

        {/* 1. BWORTH - Finance & Luxury RE */}
        <section ref={bworthSect.ref} className="py-48 px-8 md:px-24 relative overflow-hidden">
            <div className={`flex flex-col md:flex-row gap-24 items-center transition-all duration-1000 ${bworthSect.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="md:w-3/5 relative">
                    <div className="aspect-[16/9] bg-white/5 rounded-sm overflow-hidden relative editorial-shadow group">
                        <Image 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtxrEVCmUJ7NwDHa2iq9GCOCZ5AGo3VPEAbt7i1K35fjKmIGkwqR5Cq99tI2mtOHtxXxE2yi6VvN5suldeMg1fjRKo3lnIRw7EApGKIRPPnnaPXOcxJIezLzslc6vdEks-NvrXl223yS2l7TXCqUXjFMfizKLg9jThT1ehKsIP5h-zZSKJxHpBZvoBFXpEMLMJ8ArCZPfRBIiE-DZVge75NNL-auViFT29QzrLaOq1mpPFF1XPu97mkxNYlowQ_cL_JA7Iz18MGav2" 
                            fill 
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                            alt="Luxury Real Estate" 
                        />
                        <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/10 transition-colors" />
                    </div>
                </div>
                <div className="md:w-2/5">
                    <span className="font-industrial text-gold tracking-widest text-lg mb-4 block">01 · BWORTH</span>
                    <h2 className="font-headline italic text-5xl md:text-7xl mb-8 leading-tight">Capital in <br /> Motion.</h2>
                    <p className="font-body text-glacier/60 leading-relaxed mb-12">
                        Bworth is the financial heart of the Elysian Group. We specialize in high-yield institutional investments 
                        and the development of 'Architectural Assets'—commercial properties that double as structural art.
                    </p>
                    <div className="flex flex-col gap-6 font-industrial text-xs tracking-[0.3em]">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-px bg-gold" />
                            <span>$1.2B REAL ESTATE AUM</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-px bg-gold/30" />
                            <span>INSTITUTIONAL GRADE COMPLIANCE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 2. VEGAVRUDHI - Ag / Sustainability */}
        <section ref={vegaSect.ref} className="py-48 px-8 md:px-24 bg-gold/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5JFQ6lKeCHRwYVk-nmGmrzVERwoR8koV4BMK1m7pQTE5itXG19jU_DxtJtv0WbF3YNxN_WLGDmqHSihmhOf5QthZ0EulUlopyyhZ28vn-5VoCD6l5qpCxgnX6MIcv6m97KjEMguarFfrqPxLrb4DfDKtS-OazBT75JEgls8jRJz4mXlTWke0oCnkXzjFw5wFZSIh15ibK9LgLHKncbMSdkFxDVbDP4J6WHZfXvGeMhZZksSuQek2i-npV1E0tiTUnd_GwldlHKCo" fill className="object-cover" alt="pattern" />
             </div>
             
             <div className={`flex flex-col md:flex-row-reverse gap-24 items-center transition-all duration-1000 ${vegaSect.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-40'}`}>
                <div className="md:w-3/5 relative">
                    <div className="aspect-[4/5] md:w-3/4 mx-auto bg-white/5 rounded-sm overflow-hidden relative editorial-shadow group">
                        <Image 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy1bFBbWTz_9m28FHzGbj0siJiWG-lc7cM3QT2Gsjf62KQ43PI8SdKgl0cDZqo9LeCqts0sRuOJSUDCzSter_U9l0YrWIDM1qcvTKfAtTo-jSd_ZXxeQU3zTo1Yv6hDlloIVmyVdYt88J4O5LqGvOGU-Yk-3t6BAqJKDwLlYaDeBajL07YfR6tj0lw0MPXzAFEKgEMpUO_HFWpFXMA_kgUSgf68XyFQINU-Y9bJH4kl6WBHc71X0-bu3eR_guofTJEbgT5oiFJ1krG" 
                            fill 
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                            alt="Sustainability" 
                        />
                    </div>
                </div>
                <div className="md:w-2/5">
                    <span className="font-industrial text-gold tracking-widest text-lg mb-4 block">02 · VEGAVRUDHI</span>
                    <h2 className="font-headline italic text-5xl md:text-7xl mb-8 leading-tight">The Growth <br /> Standard.</h2>
                    <p className="font-body text-glacier/60 leading-relaxed mb-12">
                        VegaVrudhi is our commitment to the planet's structural longevity. We engineer regenerative 
                        agricultural biospheres and carbon-capture technology that turns the necessity of 
                        sustainability into a metric of industrial growth.
                    </p>
                    <button className="border border-gold/30 px-10 py-4 text-xs font-industrial tracking-[0.4em] hover:bg-gold hover:text-dark transition-all">
                        VIEW BIOSPHERE OPS
                    </button>
                </div>
            </div>
        </section>

        {/* 3. RYM - Tech / SaaS */}
        <section ref={rymSect.ref} className="py-48 px-8 md:px-24 bg-dark relative">
             <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 transition-all duration-1000 ${rymSect.isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="md:col-span-12 mb-24">
                     <span className="font-industrial text-gold tracking-widest text-lg mb-4 block">03 · RYM TECH</span>
                     <h2 className="font-headline italic text-6xl md:text-[8rem] leading-none text-glacier/10 text-right">NEURAL INFRASTRUCTURE</h2>
                </div>
                
                <div className="md:col-span-5 flex flex-col justify-center">
                    <h3 className="font-headline italic text-5xl mb-8">Computation at <br /> Scale.</h3>
                    <p className="font-body text-glacier/60 leading-relaxed">
                        RYM develops the enterprise software cores that manage complexity for global giants. 
                        Our 'Neural OS' for logistics and financial oversight is used by 4 of the Fortune 10.
                    </p>
                </div>
                <div className="md:col-span-7">
                    <div className="aspect-[16/10] bg-gold/10 p-1 border border-gold/20 rounded-sm relative group overflow-hidden">
                        <Image 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5JFQ6lKeCHRwYVk-nmGmrzVERwoR8koV4BMK1m7pQTE5itXG19jU_DxtJtv0WbF3YNxN_WLGDmqHSihmhOf5QthZ0EulUlopyyhZ28vn-5VoCD6l5qpCxgnX6MIcv6m97KjEMguarFfrqPxLrb4DfDKtS-OazBT75JEgls8jRJz4mXlTWke0oCnkXzjFw5wFZSIh15ibK9LgLHKncbMSdkFxDVbDP4J6WHZfXvGeMhZZksSuQek2i-npV1E0tiTUnd_GwldlHKCo" 
                            fill 
                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000" 
                            alt="Tech" 
                        />
                    </div>
                </div>
             </div>
        </section>

        {/* 4. Synchronous - Digital Build */}
        <section ref={syncSect.ref} className="py-48 px-8 md:px-24 bg-gold text-dark relative -mb-48 md:-mb-64">
            <div className={`transition-all duration-1000 ${syncSect.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
                <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-24">
                    <div className="md:w-1/2">
                         <span className="font-industrial tracking-widest text-lg mb-4 block">04 · SYNCHRONOUS</span>
                         <h2 className="font-headline italic text-7xl md:text-9xl mb-8 leading-none">Modern <br /> Twinning.</h2>
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-end">
                         <p className="font-body text-xl leading-relaxed mb-12">
                            Where physical construction meets digital exactness. Synchronous Build uses LIDAR twinning and 
                            robotic orchestration to deliver megastructures with zero-tolerance precision.
                         </p>
                         <div className="h-px bg-dark/20 w-full mb-12" />
                         <div className="flex gap-12 font-industrial text-sm tracking-widest">
                             <span>PHASE 1: 2024 DONE</span>
                             <span>PHASE 2: LIVE</span>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Global Footer / CTA */}
        <section className="py-64 px-8 md:px-24 bg-dark border-t border-white/5">
             <div className="max-w-4xl mx-auto text-center">
                 <h2 className="font-headline italic text-5xl md:text-8xl text-glacier mb-12 italic">Join the Kingdom.</h2>
                 <Link href="/#contact" className="bg-gold text-dark font-industrial text-xl tracking-[0.4em] px-16 py-6 inline-block hover:scale-105 transition-all uppercase">
                     Acquire Details →
                 </Link>
             </div>
        </section>

        <footer className="bg-dark py-12 px-8 md:px-24 border-t border-white/5">
             <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                   <div className="font-industrial text-gold tracking-[0.6em] text-3xl uppercase">ELYSIAN</div>
                   <p className="font-body text-[10px] uppercase tracking-widest opacity-20">© 2024 ELYSIAN SOVEREIGN GROUP. ASSETS OF EXCELLENCE.</p>
             </div>
        </footer>
      </main>
    </div>
  );
}
