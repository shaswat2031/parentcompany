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
    <div className="bg-dark text-glacier min-h-screen selection:bg-gold selection:text-dark overflow-x-hidden">
      <div className="grain-overlay" />
      <div className="cursor-dot hidden md:block" />
      <div className="cursor-outline hidden md:block" />

      <Navbar />

      <main className="animate-page-in">
        {/* Portfolio Hero */}
        <section className="min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center px-6 md:px-24 pt-32 relative overflow-hidden">
            <div className="max-w-7xl relative z-10">
                <span className="font-industrial text-[10px] md:text-xs tracking-[0.5em] text-gold mb-6 block uppercase">Global Assets</span>
                <h1 className="font-headline italic text-[11vw] sm:text-6xl md:text-9xl leading-[0.9] mb-8 md:mb-12">
                   The <span className="text-gold">Sovereign</span> <br /> Portfolio.
                </h1>
                <div className="gold-rule w-1/4 mb-12 !justify-start" />
                <p className="font-body text-lg md:text-xl text-glacier/60 max-w-xl leading-relaxed italic">
                    Four distinct empires, unified by a singular vision of industrial immortality.
                </p>
            </div>
            {/* Background Graphic */}
            <div className="absolute top-1/2 right-[-10vw] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] border-[0.5px] border-gold/10 rounded-full -translate-y-1/2 pointer-events-none" />
        </section>

        {/* 1. BWORTH - Finance & Luxury RE */}
        <section ref={bworthSect.ref} className="py-24 md:py-48 px-6 md:px-24 relative overflow-hidden">
            <div className={`flex flex-col lg:flex-row gap-12 md:gap-24 items-center transition-all duration-1000 ${bworthSect.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="w-full lg:w-3/5 relative">
                    <div className="aspect-[16/9] bg-white/5 rounded-sm overflow-hidden relative editorial-shadow group">
                        <Image 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtxrEVCmUJ7NwDHa2iq9GCOCZ5AGo3VPEAbt7i1K35fjKmIGkwqR5Cq99tI2mtOHtxXxE2yi6VvN5suldeMg1fjRKo3lnIRw7EApGKIRPPnnaPXOcxJIezLzslc6vdEks-NvrXl223yS2l7TXCqUXjFMfizKLg9jThT1ehKsIP5h-zZSKJxHpBZvoBFXpEMLMJ8ArCZPfRBIiE-DZVge75NNL-auViFT29QzrLaOq1mpPFF1XPu97mkxNYlowQ_cL_JA7Iz18MGav2" 
                            fill 
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                            alt="Luxury Real Estate" 
                        />
                        <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/10 transition-colors" />
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                    <span className="font-industrial text-gold tracking-widest text-base md:text-lg mb-4 block uppercase">01 · BWORTH</span>
                    <h2 className="font-headline italic text-5xl md:text-7xl mb-8 leading-tight">The Modern <br /> Apparel.</h2>
                    <p className="font-body text-[15px] md:text-lg text-glacier/60 leading-relaxed mb-12 italic">
                        Bworth is the lifestyle arm of RISEMATE VENTURE. We create clothing that stands at the intersection of high-fashion and industrial utility.
                    </p>
                    <div className="flex flex-col gap-6 font-industrial text-[10px] md:text-xs tracking-[0.3em]">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-px bg-gold" />
                            <span>PREMIUM SUSTAINABLE FABRICS</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-px bg-gold/30" />
                            <span>GLOBAL SUPPLY CHAIN EXCELLENCE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 2. VEGAVRUDHI - Ag / Sustainability */}
        <section ref={vegaSect.ref} className="py-24 md:py-48 px-6 md:px-24 bg-gold/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5JFQ6lKeCHRwYVk-nmGmrzVERwoR8koV4BMK1m7pQTE5itXG19jU_DxtJtv0WbF3YNxN_WLGDmqHSihmhOf5QthZ0EulUlopyyhZ28vn-5VoCD6l5qpCxgnX6MIcv6m97KjEMguarFfrqPxLrb4DfDKtS-OazBT75JEgls8jRJz4mXlTWke0oCnkXzjFw5wFZSIh15ibK9LgLHKncbMSdkFxDVbDP4J6WHZfXvGeMhZZksSuQek2i-npV1E0tiTUnd_GwldlHKCo" fill sizes="100vw" className="object-cover" alt="pattern" />
             </div>
             
             <div className={`flex flex-col lg:flex-row-reverse gap-12 md:gap-24 items-center transition-all duration-1000 ${vegaSect.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 md:translate-x-40'}`}>
                <div className="w-full lg:w-3/5 relative">
                    <div className="aspect-[4/5] w-full md:w-3/4 mx-auto bg-white/5 rounded-sm overflow-hidden relative editorial-shadow group">
                        <Image 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy1bFBbWTz_9m28FHzGbj0siJiWG-lc7cM3QT2Gsjf62KQ43PI8SdKgl0cDZqo9LeCqts0sRuOJSUDCzSter_U9l0YrWIDM1qcvTKfAtTo-jSd_ZXxeQU3zTo1Yv6hDlloIVmyVdYt88J4O5LqGvOGU-Yk-3t6BAqJKDwLlYaDeBajL07YfR6tj0lw0MPXzAFEKgEMpUO_HFWpFXMA_kgUSgf68XyFQINU-Y9bJH4kl6WBHc71X0-bu3eR_guofTJEbgT5oiFJ1krG" 
                            fill 
                            sizes="(max-width: 768px) 100vw, 75vw"
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                            alt="Sustainability" 
                        />
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                    <span className="font-industrial text-gold tracking-widest text-base md:text-lg mb-4 block uppercase">02 · VEGAVRUDHI</span>
                    <h2 className="font-headline italic text-5xl md:text-7xl mb-8 leading-tight">Real <br /> Growth.</h2>
                    <p className="font-body text-[15px] md:text-lg text-glacier/60 leading-relaxed mb-12 italic">
                        End-to-end sales, expert staffing, and high-velocity customer engagement solutions that build sovereign revenue streams.
                    </p>
                    <button className="w-full md:w-auto border border-gold/30 px-10 py-4 text-[10px] md:text-xs font-industrial tracking-[0.4em] hover:bg-gold hover:text-dark transition-all uppercase">
                        Scale Your Team
                    </button>
                </div>
            </div>
        </section>

        {/* 3. RYM - Tech / SaaS */}
        <section ref={rymSect.ref} className="py-24 md:py-48 px-6 md:px-24 bg-dark relative">
             <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 transition-all duration-1000 ${rymSect.isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="md:col-span-12 mb-16 md:mb-24">
                     <span className="font-industrial text-gold tracking-widest text-base md:text-lg mb-4 block uppercase">03 · RYM TECH</span>
                     <h2 className="font-headline italic text-4xl md:text-8xl lg:text-[10rem] leading-none text-glacier/10 lg:text-right">NEURAL & ENERGY INFRA</h2>
                </div>
                
                <div className="md:col-span-5 flex flex-col justify-center">
                    <h3 className="font-headline italic text-4xl md:text-5xl mb-8">AI & Green <br /> Energy.</h3>
                    <p className="font-body text-[15px] md:text-lg text-glacier/60 leading-relaxed italic">
                        The intersection of deep-learning AI and sovereign green energy infrastructure. We build the power and the brains for the next century.
                    </p>
                </div>
                <div className="md:col-span-7">
                    <div className="aspect-[16/10] bg-gold/10 p-1 border border-gold/20 rounded-sm relative group overflow-hidden mt-12 md:mt-0">
                        <Image 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5JFQ6lKeCHRwYVk-nmGmrzVERwoR8koV4BMK1m7pQTE5itXG19jU_DxtJtv0WbF3YNxN_WLGDmqHSihmhOf5QthZ0EulUlopyyhZ28vn-5VoCD6l5qpCxgnX6MIcv6m97KjEMguarFfrqPxLrb4DfDKtS-OazBT75JEgls8jRJz4mXlTWke0oCnkXzjFw5wFZSIh15ibK9LgLHKncbMSdkFxDVbDP4J6WHZfXvGeMhZZksSuQek2i-npV1E0tiTUnd_GwldlHKCo" 
                            fill 
                            sizes="(max-width: 768px) 100vw, 58vw"
                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000" 
                            alt="Tech" 
                        />
                    </div>
                </div>
             </div>
        </section>

        {/* 4. Synchronous - Digital Build */}
        <section ref={syncSect.ref} className="py-24 md:py-48 px-6 md:px-24 bg-gold text-dark relative -mb-32 md:-mb-64">
            <div className={`transition-all duration-1000 ${syncSect.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-24">
                    <div className="w-full lg:w-1/2">
                         <span className="font-industrial tracking-widest text-base md:text-lg mb-4 block uppercase font-bold">04 · SYNCHRONOUS</span>
                         <h2 className="font-headline italic text-5xl md:text-9xl mb-8 leading-none">Digital <br /> Expansion.</h2>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col justify-end">
                         <p className="font-body text-lg md:text-xl leading-relaxed mb-12 italic">
                            Websites, Marketing, Strategy. We help you stand out with a professional brand look and a strategy that helps you grow for years to come.
                         </p>
                         <div className="h-px bg-dark/20 w-full mb-12" />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-industrial text-[10px] md:text-xs tracking-widest uppercase font-bold">
                             <div className="flex flex-col gap-2">
                                <span className="text-dark/40">Service 01</span>
                                <span>Build Your Brand</span>
                             </div>
                             <div className="flex flex-col gap-2">
                                <span className="text-dark/40">Service 02</span>
                                <span>Digital Shop & Apps</span>
                             </div>
                             <div className="flex flex-col gap-2">
                                <span className="text-dark/40">Service 03</span>
                                <span>Grow Your Sales</span>
                             </div>
                             <div className="flex flex-col gap-2">
                                <span className="text-dark/40">Service 04</span>
                                <span>Smart AI Tools</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Global Footer / CTA */}
        <section className="py-48 md:py-64 px-6 md:px-24 bg-dark border-t border-white/5">
             <div className="max-w-4xl mx-auto text-center">
                 <h2 className="font-headline italic text-5xl md:text-8xl text-glacier mb-12 italic">Join the Kingdom.</h2>
                 <Link href="/#contact" className="w-full md:w-auto bg-gold text-dark font-industrial text-lg md:text-xl tracking-[0.4em] px-16 py-6 inline-block hover:scale-105 transition-all uppercase">
                     Acquire Details →
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
