"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

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
            transform: `translateY(0)`
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
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="relative selection:bg-gold selection:text-dark overflow-x-hidden">
      {/* Visual Enhancements */}
      <div className="grain-overlay" />
      <div className="cursor-dot hidden md:block" />
      <div className="cursor-outline hidden md:block" />

      {/* Navigation */}
      <Navbar />

      <main className="animate-page-in">
        {/* 1. HERO */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-gold/5 via-gold/0 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl">
              <span className="inline-block font-body text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold mb-8 opacity-0 animate-in fade-in slide-in-from-left duration-1000 fill-mode-forwards">
                  Est. 1952 · Global Conglomerate
              </span>
              <h1 className="font-headline italic text-[11vw] sm:text-6xl md:text-8xl lg:text-[10rem] leading-[1.1] text-glacier flex flex-col items-start gap-2 mb-12 drop-shadow-2xl">
                  <span className="flex overflow-hidden">
                    <SplitText text="One Vision." startDelay={200} />
                  </span>
                  <span className="flex overflow-hidden pl-[15vw]">
                    <SplitText text="Four Kingdoms." startDelay={800} />
                  </span>
              </h1>
              <p className="font-body text-base md:text-xl lg:text-2xl text-glacier/60 max-w-xl pl-[15vw] leading-relaxed italic border-l-2 border-gold/30 md:ml-[15vw] animate-in fade-in duration-1000 delay-1000 fill-mode-forwards opacity-0">
                  Architecting the future through disciplined stewardship and a relentless pursuit of industrial excellence.
              </p>
          </div>

          <div className="absolute bottom-12 left-0 w-full md:left-24 md:w-auto text-center md:text-left font-industrial text-[14vw] md:text-[8rem] lg:text-[15rem] leading-none opacity-10 text-gold-premium select-none pointer-events-none uppercase">
              RISEMATE VENTURE
          </div>

          <div className="absolute bottom-12 right-6 md:right-12 hidden md:flex flex-col items-center gap-4">
              <div className="w-px h-24 bg-gradient-to-b from-gold via-gold to-transparent opacity-50 animate-pulse" />
              <span className="font-industrial text-xs tracking-widest text-gold rotate-90 translate-y-8 uppercase">Scroll</span>
          </div>
        </section>

        {/* 2. ABOUT THE GROUP */}
        <section ref={aboutSection.ref} className="py-24 md:py-64 px-6 md:px-24 flex flex-col lg:flex-row items-center gap-24 relative overflow-visible">
            <div className={`w-full lg:w-3/5 transition-all duration-1000 ease-out ${aboutSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
                <h2 className="font-headline font-light italic text-4xl md:text-7xl mb-12 leading-tight">
                    A singular standard of excellence across the global industrial landscape.
                </h2>
                <div className="gold-rule w-1/3 mb-12 !justify-start" />
                <p className="font-body text-lg md:text-xl text-glacier/80 leading-relaxed max-w-2xl">
                    We integrate design excellence with operational efficiency in every sector we touch. 
                    From high-frequency biotech and renewable energy grids to the structural integrity 
                    of the world's most ambitious megaprojects, our mission is to build what lasts. 
                </p>
            </div>
            
            <div className={`w-full lg:w-2/5 grid grid-cols-2 lg:flex lg:flex-col gap-12 lg:border-l lg:border-gold/10 lg:pl-12 transition-all duration-1000 delay-500 ease-out ${aboutSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                <div className="group">
                    <span className="font-industrial text-4xl md:text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        {useCounter(4, 0, 2000, aboutSection.isVisible)}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Companies</span>
                </div>
                <div className="group">
                    <span className="font-industrial text-4xl md:text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        {useCounter(18, 0, 2000, aboutSection.isVisible)}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Countries</span>
                </div>
                <div className="group">
                    <span className="font-industrial text-4xl md:text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        $2.4B+
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Asset Value</span>
                </div>
                <div className="group">
                    <span className="font-industrial text-4xl md:text-6xl text-gold block mb-2 transition-transform duration-500 group-hover:scale-110">
                        {useCounter(1200, 0, 2000, aboutSection.isVisible)}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-[0.4em] text-glacier/50">Team</span>
                </div>
            </div>
        </section>

        {/* 3. OUR COMPANIES */}
        <section ref={companiesSection.ref} className="py-24 md:py-32 px-6 md:px-24 bg-dark/40 relative">
            <h3 className="font-industrial text-xs tracking-[0.5em] text-gold mb-16 md:mb-32 uppercase text-center md:text-left">The Portfolio Spread</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-32 relative lg:min-h-[1700px]">
                {/* Bworth */}
                <div className={`md:col-span-12 lg:absolute lg:top-0 lg:left-0 lg:w-1/2 perspective-card transition-all duration-1000 ${companiesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="perspective-card-inner group p-8 md:p-12 bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/[0.08] transition-all rounded-sm flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <div className="font-industrial text-sm md:text-lg tracking-widest text-glacier/30">APPAREL / LIFESTYLE</div>
                        </div>
                        <h4 className="font-headline text-4xl md:text-5xl italic text-gold">Bworth</h4>
                        <p className="font-body text-glacier/60 italic text-base md:text-lg leading-relaxed">
                            Distinctive apparel for the modern visionary. Crafting premium garments that embody the RiseMate aesthetic of industrial elegance.
                        </p>
                        <Link href="/companies" className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500">
                           Explore Asset → 
                        </Link>
                    </div>
                </div>

                {/* Synchronous */}
                <div className={`md:col-span-12 lg:absolute lg:top-[250px] lg:right-0 lg:w-5/12 perspective-card transition-all duration-1000 delay-700 ${companiesSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-40'}`}>
                    <div className="perspective-card-inner group p-8 md:p-12 h-full bg-gold/10 border border-gold/40 hover:bg-gold/20 transition-all rounded-sm flex flex-col gap-8 lg:justify-center backdrop-blur-md">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/30 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">campaign</span>
                            </div>
                            <div className="font-industrial text-sm md:text-lg tracking-widest text-glacier/30">DIGITAL MARKETING</div>
                        </div>
                        <div>
                            <h4 className="font-headline text-4xl md:text-5xl italic text-glacier leading-tight mb-4">Synchronous</h4>
                            <p className="font-body text-glacier/80 italic text-base md:text-lg leading-relaxed">
                                Strategy. Websites. Growth. We build your brand through high-speed digital tools and expert marketing.
                            </p>
                        </div>
                         <Link href="/companies" className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500 lg:mt-auto">
                           Explore Growth → 
                        </Link>
                    </div>
                </div>

                {/* VegaVrudhi */}
                <div className={`md:col-span-12 lg:absolute lg:top-[650px] lg:left-[5%] lg:w-5/12 perspective-card transition-all duration-1000 delay-300 ${companiesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="perspective-card-inner group p-8 md:p-12 bg-[#0A0E0A] border border-gold/10 hover:border-gold/60 hover:shadow-[0_0_50px_rgba(201,168,76,0.1)] transition-all rounded-sm flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/20 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">nature</span>
                            </div>
                            <div className="font-industrial text-sm md:text-lg tracking-widest text-glacier/30">SALES & STAFFING</div>
                        </div>
                        <h4 className="font-headline text-4xl md:text-5xl italic text-glacier">VegaVrudhi</h4>
                        <p className="font-body text-glacier/60 italic text-base md:text-lg leading-relaxed">
                            Real Growth. End-to-end sales, expert staffing, and high-velocity customer engagement solutions for the modern enterprise.
                        </p>
                         <Link href="/companies" className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500">
                           Explore Growth → 
                        </Link>
                    </div>
                </div>

                {/* RYM */}
                <div className={`md:col-span-12 lg:absolute lg:top-[1100px] lg:right-[5%] lg:w-5/12 perspective-card transition-all duration-1000 delay-500 ${companiesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="perspective-card-inner group p-8 md:p-12 bg-white/5 border border-white/5 hover:border-gold/30 transition-all rounded-sm flex flex-col gap-8">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 rounded-sm flex items-center justify-center text-gold">
                                <span className="material-symbols-outlined">developer_mode</span>
                            </div>
                            <div className="font-industrial text-sm md:text-lg tracking-widest text-glacier/30">AI SAAS / DEEP LEARNING</div>
                        </div>
                        <h4 className="font-headline text-4xl md:text-5xl italic text-glacier">RYM</h4>
                        <p className="font-body text-glacier/60 italic text-base md:text-lg leading-relaxed">
                            Neural infrastructure for the 21st century. Building sovereign AI SaaS and deep learning systems that redefine computation.
                        </p>
                         <Link href="/companies" className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-gold font-body text-xs uppercase tracking-[0.4em] transition-all duration-500">
                           Explore Core → 
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
                    {/* Founder 1 - Dheeraj Anand */}
                    <div className="snap-center shrink-0 w-80 perspective-card group cursor-pointer">
                        <Link href="https://bworth.co.in/" target="_blank" className="perspective-card-inner block relative p-10 bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:-translate-y-4 rounded-sm transition-all duration-700">
                             <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1 mb-8">
                                 <div className="w-full h-full rounded-full bg-gold/10 overflow-hidden relative flex items-center justify-center">
                                     <span className="material-symbols-outlined text-gold/40 text-4xl">person</span>
                                 </div>
                              </div>
                             <h5 className="font-headline text-3xl italic text-glacier mb-2 group-hover:text-gold transition-colors">Dheeraj Anand</h5>
                             <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">FOUNDER · Bworth</p>
                             <p className="font-body text-xs italic text-glacier/40 group-hover:text-glacier/80 transition-opacity translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                "DEFINING THE INDUSTRIAL AESTHETIC."
                             </p>
                        </Link>
                    </div>

                    {/* Founder 2 - Devam Srivastava */}
                    <div className="snap-center shrink-0 w-80 perspective-card group cursor-pointer mt-12">
                        <Link href="https://www.synchronousbuilddigital.com/" target="_blank" className="perspective-card-inner block relative p-10 bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:-translate-y-4 rounded-sm transition-all duration-700">
                             <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1 mb-8">
                                 <div className="w-full h-full rounded-full bg-gold/10 overflow-hidden relative flex items-center justify-center">
                                     <span className="material-symbols-outlined text-gold/40 text-4xl">person</span>
                                 </div>
                              </div>
                             <h5 className="font-headline text-3xl italic text-glacier mb-2 group-hover:text-gold transition-colors">Devam Srivastava</h5>
                             <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">FOUNDER & CEO · Synchronous</p>
                             <p className="font-body text-xs italic text-glacier/40 group-hover:text-glacier/80 transition-opacity translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                "DIGITAL EXPANSION AT SCALE."
                             </p>
                        </Link>
                    </div>

                    {/* Founder 3 - Saurabh Jain */}
                    <div className="snap-center shrink-0 w-80 perspective-card group cursor-pointer mt-24">
                        <Link href="https://www.vegavruddhi.com/" target="_blank" className="perspective-card-inner block relative p-10 bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:-translate-y-4 rounded-sm transition-all duration-700">
                             <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1 mb-8">
                                 <div className="w-full h-full rounded-full bg-gold/10 overflow-hidden relative flex items-center justify-center">
                                     <span className="material-symbols-outlined text-gold/40 text-4xl">person</span>
                                 </div>
                              </div>
                             <h5 className="font-headline text-3xl italic text-glacier mb-2 group-hover:text-gold transition-colors">Saurabh Jain</h5>
                             <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">FOUNDER · VegaVrudhi</p>
                             <p className="font-body text-xs italic text-glacier/40 group-hover:text-glacier/80 transition-opacity translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                "SALES IS THE CORE OF SOVEREIGN GROWTH."
                             </p>
                        </Link>
                    </div>

                    {/* Founder 4 - Yograj Rundhanker */}
                    <div className="snap-center shrink-0 w-80 perspective-card group cursor-pointer mt-36">
                        <Link href="https://rymgrenergy.com/" target="_blank" className="perspective-card-inner block relative p-10 bg-white/5 border border-white/5 group-hover:border-gold/30 group-hover:-translate-y-4 rounded-sm transition-all duration-700">
                             <div className="w-24 h-24 rounded-full border-2 border-gold/30 p-1 mb-8">
                                 <div className="w-full h-full rounded-full bg-gold/10 overflow-hidden relative flex items-center justify-center">
                                     <span className="material-symbols-outlined text-gold/40 text-4xl">person</span>
                                 </div>
                              </div>
                             <h5 className="font-headline text-3xl italic text-glacier mb-2 group-hover:text-gold transition-colors">Yograj Rundhanker</h5>
                             <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-8">FOUNDER & CEO · RYM</p>
                             <p className="font-body text-xs italic text-glacier/40 group-hover:text-glacier/80 transition-opacity translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                                "AI AND ENERGY: THE TWIN PILLARS OF LEGACY."
                             </p>
                        </Link>
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
        <section id="contact" className="pt-32 pb-48 md:py-48 px-8 md:px-24 bg-gold text-dark diagonal-wipe relative -mt-32">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-24 items-center">
                <div className="md:w-1/2">
                    <h2 className="font-headline text-5xl md:text-9xl mb-8 leading-none italic">Build Something <br /> That Lasts.</h2>
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
                        <button className="w-full py-8 border border-dark/20 font-industrial text-lg md:text-2xl tracking-[0.2em] md:tracking-[0.4em] hover:bg-dark hover:text-gold transition-all duration-700 uppercase group flex items-center justify-center gap-4">
                            <span>Reach Out to Us</span>
                            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">mail</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>

        <footer className="bg-dark py-12 px-8 md:px-24 border-t border-white/5">
             <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                   <div className="font-industrial text-gold-premium tracking-[0.6em] text-2xl md:text-3xl">RISEMATE VENTURE</div>
                   <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-body text-[8px] uppercase tracking-[0.3em] opacity-40">
                       <span>Bworth</span>
                       <span>VegaVrudhi</span>
                       <span>RYM</span>
                       <span>Synchronous</span>
                   </div>
                   <p className="font-body text-[10px] uppercase tracking-widest opacity-20 text-center md:text-left">© 2024 RISEMATE VENTURE. ARCHITECTS OF LEGACY.</p>
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
