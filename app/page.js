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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Split Text Component for Hero
function SplitText({ text, startDelay = 0 }) {
  return (
    <span className="inline-flex overflow-hidden pb-4 -mb-4">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`split-letter inline-block ${i === 0 ? "mr-1" : ""} visible transition-all`}
          style={{ 
            transitionDelay: `${startDelay + i * 60}ms`,
            transform: `translateY(0)` // In a real production file, I'd use CSS classes for the entry, but I'll implement the entry state in the component
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// Counter Hook
function useCounter(end, start = 0, duration = 2000, isVisible = false) {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isVisible, end, start, duration]);

  return count;
}

export default function Home() {
  const aboutSection = useReveal();
  const visionSection = useReveal();
  const companiesSection = useReveal();
  
  // Custom Cursor State
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
    <div className="relative selection:bg-gold selection:text-dark">
      {/* Visual Enhancements */}
      <div className="grain-overlay" />
      <div className="cursor-dot hidden md:block" />
      <div className="cursor-outline hidden md:block" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-sm bg-dark/20 transition-all duration-500 hover:bg-dark/40">
          <div className="font-industrial text-2xl tracking-[0.2em] text-gold pointer-events-none">ELYSIAN</div>
          <div className="flex gap-12 font-body text-[10px] uppercase tracking-[0.4em] font-semibold">
              <Link href="/companies" className="hover:text-gold transition-colors">Portfolios</Link>
              <Link href="/operations" className="hover:text-gold transition-colors">Presence</Link>
              <Link href="/leadership" className="hover:text-gold transition-colors">Governance</Link>
          </div>
          <Link href="/invest" className="border border-gold/40 px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-dark transition-all duration-300">
              Investor Portal
          </Link>
      </nav>

      <main className="animate-page-in">
        {/* 1. HERO */}
        <section className="h-screen flex flex-col justify-center px-8 md:px-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 via-gold/0 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl">
              <span className="inline-block font-body text-xs uppercase tracking-[0.5em] text-gold mb-8 opacity-0 animate-in fade-in slide-in-from-left duration-1000 fill-mode-forwards">
                  Est. 1952 · Global Conglomerate
              </span>
              <h1 className="font-headline italic text-7xl md:text-[10rem] leading-[1.1] text-glacier flex flex-col items-start gap-0 mb-12 drop-shadow-2xl">
                  <span className="flex overflow-hidden">
                    <SplitText text="One Vision." startDelay={200} />
                  </span>
                  <span className="flex overflow-hidden md:pl-[20vw]">
                    <SplitText text="Four Kingdoms." startDelay={800} />
                  </span>
              </h1>
              <p className="font-body text-lg md:text-2xl text-glacier/60 max-w-xl md:pl-[20vw] leading-relaxed italic border-l-2 border-gold/30 pl-8 ml-[20vw] animate-in fade-in duration-1000 delay-1000 fill-mode-forwards opacity-0">
                  Architecting the future through disciplined stewardship and a relentless pursuit of industrial excellence.
              </p>
          </div>

          <div className="absolute bottom-12 left-8 md:left-24 font-industrial text-[5rem] md:text-[15rem] leading-none opacity-5 text-gold select-none pointer-events-none uppercase">
              ELYSIAN GROUP
          </div>

          <div className="absolute bottom-12 right-12 flex flex-col items-center gap-4">
              <div className="w-px h-24 bg-gradient-to-b from-gold via-gold to-transparent opacity-50 animate-pulse" />
              <span className="font-industrial text-xs tracking-widest text-gold rotate-90 translate-y-8 uppercase">Scroll</span>
          </div>
        </section>

        {/* 2. ABOUT THE GROUP (Asymmetric split) */}
        <section ref={aboutSection.ref} className="py-32 md:py-64 px-8 md:px-24 flex flex-col md:flex-row items-center gap-24 relative overflow-visible">
            <div className={`md:w-3/5 transition-all duration-1000 ease-out ${aboutSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <h2 className="font-headline font-light italic text-4xl md:text-7xl mb-12 leading-tight">
                    A singular standard of excellence across the global industrial landscape.
                </h2>
                <div className="gold-rule w-1/3 mb-12 !justify-start" />
                <p className="font-body text-xl text-glacier/80 leading-relaxed max-w-2xl">
                    We integrate design excellence with operational efficiency in every sector we touch. 
                    From high-frequency biotech and renewable energy grids to the structural integrity 
                    of the world's most ambitious megaprojects, our mission is to build what lasts. 
                    Our legacy is forged in the synergy between innovation and traditional craftsmanship.
                </p>
            </div>
            
            <div className={`md:w-2/5 flex flex-col gap-12 border-l border-gold/10 pl-12 transition-all duration-1000 delay-500 ease-out ${aboutSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                <div className="group">
                    <span className="font-industrial text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        {useCounter(4, 0, 2000, aboutSection.isVisible)}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Companies</span>
                </div>
                <div className="group">
                    <span className="font-industrial text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        {useCounter(18, 0, 2000, aboutSection.isVisible)}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Countries</span>
                </div>
                 <div className="group">
                    <span className="font-industrial text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        $2.4B+
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Asset Value</span>
                </div>
                 <div className="group">
                    <span className="font-industrial text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        {useCounter(1200, 0, 2000, aboutSection.isVisible)}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Team</span>
                </div>
            </div>
        </section>

        {/* 3. OUR COMPANIES (Non-grid layout) */}
        <section ref={companiesSection.ref} className="py-32 px-8 md:px-24 bg-dark/40 relative">
            <h3 className="font-industrial text-xs tracking-[0.5em] text-gold mb-32 uppercase text-center md:text-left">The Portfolio Spread</h3>
            
            <div className="relative min-h-[1200px] md:min-h-[1600px] w-full">
                {/* Bworth - Top Left */}
                <div className={`absolute top-0 left-0 md:w-1/2 perspective-card transition-all duration-1000 ${companiesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="perspective-card-inner group p-12 bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/[0.08] transition-all rounded-sm flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <div className="font-industrial text-lg tracking-widest text-glacier/30">FINANCE / REAL ESTATE</div>
                        </div>
                        <h4 className="font-headline text-5xl italic text-gold">Bworth</h4>
                        <p className="font-body text-glacier/60 italic text-lg leading-relaxed">
                            Pioneering luxury residential and commercial spaces that blend high-concept architecture with tactical finance.
                        </p>
                        <Link href="/companies" className="opacity-0 group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500">
                           Explore Asset → 
                        </Link>
                    </div>
                </div>

                {/* VegaVrudhi - Center Right */}
                <div className={`absolute top-[400px] md:top-[300px] right-0 md:w-5/12 perspective-card transition-all duration-1000 delay-300 ${companiesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="perspective-card-inner group p-12 bg-[#0A0E0A] border border-gold/10 hover:border-gold/60 hover:shadow-[0_0_50px_rgba(201,168,76,0.1)] transition-all rounded-sm flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/20 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">nature</span>
                            </div>
                            <div className="font-industrial text-lg tracking-widest text-glacier/30 text-emerald-900/40">SUSTAINABILITY</div>
                        </div>
                        <h4 className="font-headline text-5xl italic text-glacier">VegaVrudhi</h4>
                        <p className="font-body text-glacier/60 italic text-lg leading-relaxed">
                            Bridging the gap between primitive growth and industrial scaling through regenerative biospheres.
                        </p>
                         <Link href="/companies" className="opacity-0 group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500">
                           Explore Growth → 
                        </Link>
                    </div>
                </div>

                {/* RYM - Bottom Left */}
                <div className={`absolute top-[800px] md:top-[700px] left-[5%] md:w-4/12 perspective-card transition-all duration-1000 delay-500 ${companiesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="perspective-card-inner group p-12 bg-white/5 border border-white/5 hover:border-gold/30 transition-all rounded-sm flex flex-col gap-8">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">developer_mode</span>
                            </div>
                            <div className="font-industrial text-lg tracking-widest text-glacier/30">SaaS / TECH</div>
                        </div>
                        <h4 className="font-headline text-5xl italic text-glacier">RYM</h4>
                        <p className="font-body text-glacier/60 italic text-lg leading-relaxed">
                            Developing next-generation infrastructure and enterprise-grade software systems for global markets.
                        </p>
                         <Link href="/companies" className="opacity-0 group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500">
                           Explore Core → 
                        </Link>
                    </div>
                </div>

                {/* Synchronous - Far Right Tall */}
                <div className={`absolute top-[1000px] md:top-[200px] right-[10%] md:right-[-5%] md:w-3/12 h-[600px] perspective-card transition-all duration-1000 delay-700 ${companiesSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-40'}`}>
                    <div className="perspective-card-inner group p-12 h-full bg-gold/10 border border-gold/40 hover:bg-gold/20 transition-all rounded-sm flex flex-col gap-12 justify-center backdrop-blur-md">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/30 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">architecture</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-headline text-5xl italic text-glacier leading-tight mb-4">Synchronous Digital Build</h4>
                            <p className="font-body text-glacier/80 italic text-lg leading-relaxed">
                                Construction at the speed of computation. Where architecture meets digital twinning.
                            </p>
                        </div>
                         <Link href="/companies" className="opacity-0 group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500 mt-auto">
                           Explore Site → 
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. LEADERSHIP — CEO & FOUNDERS */}
        <section className="py-32 px-8 md:px-24 bg-dark overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                    <h3 className="font-headline italic text-5xl md:text-8xl text-glacier/20 leading-none">The Minds Behind <br /> the Movement.</h3>
                    <div className="gold-rule md:w-1/4 mb-4" />
                </div>
                
                <div className="flex gap-12 md:gap-24 overflow-x-auto pb-12 snap-x scrollbar-none px-4">
                    {/* Founder 1 */}
                    <div className="snap-center shrink-0 w-80 perspective-card group cursor-pointer">
                        <div className="perspective-card-inner relative p-10 bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:-translate-y-4 rounded-sm transition-all duration-700">
                             <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1 mb-8">
                                 <div className="w-full h-full rounded-full bg-gold/10 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                     <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7i6dBAXpca1hYgt0M0PmONofEd-DdBlkcOA4Z6AWJlBtgjG9KV75wfl1SjcUOh1EJA6oI_ib7pRx0ikt_igVBvLj3y5mS-23ovMpk3Rf8mIz5jeDQxoOVzHhxMeAnXiARWzKr8M1lK0WDtT1ikp72yfDBwucu2kj8lCQkFoDEAEHz8luwr8_ArqpaqyYz915mniOwdIIBr_Tr09rwTHbN0u8PO38Gy1c1rSCUywgxuUGPvd1SHzXm_W6Rtu6JnJhjAqgn4VvXNvMa" fill className="object-cover" alt="CEO" />
                                 </div>
                             </div>
                             <h5 className="font-headline text-3xl italic text-glacier mb-2 group-hover:text-gold transition-colors">Julian Thorne</h5>
                             <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">CHAIRMAN · ELYSIAN</p>
                             <p className="font-body text-xs italic text-glacier/40 group-hover:text-glacier/80 transition-opacity translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                "INTEGRITY IN EVERY BEAM, VALUE IN EVERY LEDGER."
                             </p>
                        </div>
                    </div>
                     {/* Founder 2 */}
                    <div className="snap-center shrink-0 w-80 perspective-card group cursor-pointer mt-12">
                        <div className="perspective-card-inner relative p-10 bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:-translate-y-4 rounded-sm transition-all duration-700">
                             <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1 mb-8">
                                 <div className="w-full h-full rounded-full bg-gold/10 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                     <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy1bFBbWTz_9m28FHzGbj0siJiWG-lc7cM3QT2Gsjf62KQ43PI8SdKgl0cDZqo9LeCqts0sRuOJSUDCzSter_U9l0YrWIDM1qcvTKfAtTo-jSd_ZXxeQU3zTo1Yv6hDlloIVmyVdYt88J4O5LqGvOGU-Yk-3t6BAqJKDwLlYaDeBajL07YfR6tj0lw0MPXzAFEKgEMpUO_HFWpFXMA_kgUSgf68XyFQINU-Y9bJH4kl6WBHc71X0-bu3eR_guofTJEbgT5oiFJ1krG" fill className="object-cover" alt="CEO" />
                                 </div>
                             </div>
                             <h5 className="font-headline text-3xl italic text-glacier mb-2 group-hover:text-gold transition-colors">Elena Moretti</h5>
                             <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">CEO · VEGAVRUDHI</p>
                             <p className="font-body text-xs italic text-glacier/40 group-hover:text-glacier/80 transition-opacity translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                "NATURE DOESN'T COMPROMISE. NEITHER DO WE."
                             </p>
                        </div>
                    </div>
                     {/* Founder 3 */}
                    <div className="snap-center shrink-0 w-80 perspective-card group cursor-pointer mt-24">
                        <div className="perspective-card-inner relative p-10 bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:-translate-y-4 rounded-sm transition-all duration-700">
                             <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1 mb-8">
                                 <div className="w-full h-full rounded-full bg-gold/10 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                     <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYFf4WeYmKuhLqQiN8MiDfD6gnM0LeDS0T8X-pHX1X00GDBeRSo60Sh5crwO0K7iWdvdSPQkTHv7GCz297H4I6N36o8nCcNZ_q5tpNqViiVGoFQqZtmmRnXNpz8nyyrzHeJYE0bz9boRtvrbwIA98YHqe3MnMLruLJlCZdKQNu8uKrV8Ky4CUfkWsrP6WM3DZH4wWrP7r8eIgjTh0HBplLq7nUBftAZfx-S4iU9CMRiOMjMynaUdvMNs0nxoRC4rgENy8wLpigmAz5" fill className="object-cover" alt="CEO" />
                                 </div>
                             </div>
                             <h5 className="font-headline text-3xl italic text-glacier mb-2 group-hover:text-gold transition-colors">Alistair Vaughn</h5>
                             <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">CHIEF OFFICER · RYM TECH</p>
                             <p className="font-body text-xs italic text-glacier/40 group-hover:text-glacier/80 transition-opacity translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                "THE BEST WAY TO PREDICT THE FUTURE IS TO BUILD IT."
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 5. VISION MANIFESTO */}
        <section ref={visionSection.ref} className="py-64 px-8 md:px-24 bg-dark relative overflow-hidden">
            <div className={`transition-all duration-[2000ms] ${visionSection.isVisible ? 'opacity-10 scale-100 revolve' : 'opacity-0 scale-110'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border-[0.5px] border-gold rounded-full opacity-20" />
                    <div className="absolute w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] border-[0.5px] border-gold rounded-full opacity-10" />
                </div>
            </div>
            
            <div className={`relative z-10 max-w-5xl translate-y-0 transition-opacity duration-1000 delay-500 ${visionSection.isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}>
                <span className="font-headline text-9xl text-gold/10 absolute -top-24 -left-12 leading-none">“</span>
                <blockquote className="font-headline italic text-5xl md:text-8xl leading-tight text-glacier/90 text-right">
                    We do not build for the <span className="text-gold">moment.</span> <br /> 
                    We craft the infrastructure of <br />
                    <span className="text-shadow-gold">generations.</span>
                </blockquote>
            </div>
        </section>

        {/* 6. CONTACT / FOOTER CTA */}
        <section id="contact" className="py-32 md:py-48 px-8 md:px-24 bg-gold text-dark diagonal-wipe relative -mt-32">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-24 items-center">
                <div className="md:w-1/2">
                    <h2 className="font-headline text-7xl md:text-9xl mb-8 leading-none italic">Build Something <br /> That Lasts.</h2>
                    <div className="flex gap-12 mt-16 font-body text-[10px] uppercase tracking-[0.5em] font-bold">
                        <div>
                             <span className="block opacity-40 mb-2">London HQ</span>
                             <span>Mayfair, W1K</span>
                        </div>
                        <div>
                             <span className="block opacity-40 mb-2">Zurich</span>
                             <span>Seefeldstrasse</span>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full">
                    <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                        <div className="border-b border-dark/20 pb-4 transition-colors duration-500 focus-within:border-dark">
                            <input type="text" placeholder="IDENTITY / GROUP" className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-dark/30 font-body text-sm uppercase tracking-widest" />
                        </div>
                        <div className="border-b border-dark/20 pb-4 transition-colors duration-500 focus-within:border-dark">
                            <input type="email" placeholder="SECURE CHANNEL" className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-dark/30 font-body text-sm uppercase tracking-widest" />
                        </div>
                         <div className="border-b border-dark/20 pb-4 transition-colors duration-500 focus-within:border-dark">
                            <textarea placeholder="PROPOSAL SUMMARY" className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-dark/30 font-body text-sm uppercase tracking-widest h-32 resize-none" />
                        </div>
                        <button className="w-full py-8 border border-dark/20 font-industrial text-2xl tracking-[0.4em] hover:bg-dark hover:text-gold transition-all duration-700 uppercase group flex items-center justify-center gap-4">
                            <span>Reach Out to Us</span>
                            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">mail</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>

        <footer className="bg-dark py-12 px-8 md:px-24 border-t border-white/5">
             <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                   <div className="font-industrial text-gold tracking-[0.6em] text-3xl">ELYSIAN</div>
                   <div className="flex flex-wrap justify-center gap-8 font-body text-[8px] uppercase tracking-[0.3em] opacity-40">
                       <span>Bworth</span>
                       <span>VegaVrudhi</span>
                       <span>RYM</span>
                       <span>Synchronous</span>
                   </div>
                   <p className="font-body text-[10px] uppercase tracking-widest opacity-20">© 2024 ELYSIAN SOVEREIGN GROUP. ARCHITECTS OF LEGACY.</p>
             </div>
        </footer>
      </main>
      
      <style jsx>{`
        @keyframes revolve {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .revolve {
            animation: revolve 120s linear infinite;
        }
      `}</style>
    </div>
  );
}
