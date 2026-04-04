"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const LOCATIONS = [
  { id: "mumbai", name: "MUMBAI", type: "BWORTH APPAREL", focus: "Premium Lifestyle & Fashion HQ", coords: { x: "21.6%", y: "60.2%" } },
  { id: "bangalore", name: "BENGALURU", type: "RYM TECH", focus: "Neural Innovation / AI SaaS Hub", coords: { x: "41.2%", y: "81.5%" } },
  { id: "delhi", name: "NEW DELHI", type: "RISEMATE HQ", focus: "Corporate Governance / Venture Policy", coords: { x: "36.8%", y: "27.8%" } },
  { id: "hyderabad", name: "HYDERABAD", type: "SYNCHRONOUS DIGITAL", focus: "Marketing Strategy / Web Presence", coords: { x: "44.9%", y: "66.4%" } },
  { id: "kolkata", name: "KOLKATA", type: "VEGAVRUDHI", focus: "Sales & Staffing Excellence", coords: { x: "78.4%", y: "48.2%" } },
];

export default function Operations() {
  const [activeLoc, setActiveLoc] = useState(null);

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

      <main className="animate-page-in pt-32 px-8 md:px-24">
        {/* Footprint Hero */}
        <div className="max-w-7xl relative z-10 mb-24">
            <span className="font-industrial text-xs tracking-[0.5em] text-gold mb-6 block uppercase underline decoration-gold/20 underline-offset-8 decoration-2 font-bold">Operational Presence</span>
            <h1 className="font-headline italic text-[11vw] sm:text-6xl md:text-[8rem] leading-[0.9] mb-12">
               The <span className="text-gold">Empire</span> in <br /> <span className="italic font-light opacity-60">Bharat.</span>
            </h1>
            <p className="font-body text-xl text-glacier/40 max-w-xl leading-relaxed italic border-l border-gold/20 pl-8">
                Establishing the industrial backbone of a rising sovereign. Utilizing the high-precision <span className="text-gold">National Spatial Index</span> for geometric operational planning.
            </p>
        </div>

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start mb-48">
            {/* Interactive SVG Container */}
            <div className="lg:col-span-12 relative flex justify-center items-center bg-[#0a0a0a] border border-white/5 rounded-sm p-12 md:p-32 editorial-shadow overflow-hidden group min-h-[600px]">
                
                {/* Architectural Blueprint Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                
                {/* Reference Map Container */}
                <div className="relative w-full max-w-[900px] aspect-square flex items-center justify-center">
                    
                    {/* Official SVG Integration with Specialized Glow Filter */}
                    <img 
                      src="/india_map.svg" 
                      alt="Sovereign Territory"
                      className="w-full h-full object-contain opacity-40 group-hover:opacity-60 transition-all duration-1000 pointer-events-none"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(201, 168, 76, 0.3)) invert(84%) sepia(21%) saturate(986%) hue-rotate(5deg) brightness(110%) contrast(90%)'
                      }}
                    />

                    {/* PULSING MARKERS - Precision Coordinated */}
                    {LOCATIONS.map((loc) => (
                        <div 
                            key={loc.id}
                            className="absolute cursor-pointer transition-all duration-500 hover:scale-150 z-40"
                            style={{ left: loc.coords.x, top: loc.coords.y }}
                            onMouseEnter={() => setActiveLoc(loc)}
                            onMouseLeave={() => setActiveLoc(null)}
                        >
                            <div className="relative flex items-center justify-center">
                                {/* Outer Glow */}
                                <div className={`absolute w-8 h-8 rounded-full ${activeLoc?.id === loc.id ? 'bg-gold animate-ping opacity-20' : 'opacity-0'}`} />
                                
                                {/* Main Pulsing Dot */}
                                <div className={`w-4 h-4 rounded-full border border-gold/40 flex items-center justify-center ${activeLoc?.id === loc.id ? 'bg-gold' : 'bg-gold/20 animate-pulse'}`}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_#C9A84C]" />
                                </div>
                                
                                {/* Label (Desktop) */}
                                <span className={`absolute left-8 font-industrial text-[11px] tracking-[0.3em] transition-all duration-500 whitespace-nowrap hidden md:block ${activeLoc?.id === loc.id ? 'text-gold translate-x-2' : 'text-gold/20'}`}>
                                    {loc.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* INFO CARD (Top Right Fixed Overlay) */}
                <div className={`absolute top-12 right-12 md:top-24 md:right-24 w-80 p-10 bg-[#0C0C0C]/90 backdrop-blur-md border border-gold/20 editorial-shadow transition-all duration-700 ${activeLoc ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
                     {activeLoc && (
                        <div className="flex flex-col gap-6">
                             <div className="flex justify-between items-start">
                                <span className="font-industrial text-gold tracking-widest text-xs uppercase underline decoration-gold/20">{activeLoc.type}</span>
                                <span className="material-symbols-outlined text-gold/20 text-sm">hub</span>
                             </div>
                             <h3 className="font-headline italic text-4xl text-glacier">{activeLoc.name}</h3>
                             <p className="font-body text-xs text-glacier/60 italic leading-relaxed">
                                {activeLoc.focus}
                             </p>
                             <div className="h-px bg-gold/10 w-full" />
                             <Link href="/companies" className="font-industrial text-[9px] tracking-[0.4em] text-gold/60 hover:text-gold transition-all uppercase">
                                Explore Subsidiary →
                             </Link>
                        </div>
                     )}
                </div>

                {/* Background Help Text */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-industrial text-[10px] tracking-[0.5em] text-glacier/10 uppercase pointer-events-none">
                    Select a core nexus to explore regional impact
                </div>
            </div>
            
            {/* Context Sidebar */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
                <div className="p-10 border border-white/5 bg-white/[0.01]">
                    <h4 className="font-industrial text-gold tracking-[0.4em] text-[10px] mb-4 uppercase">Economic Hubs</h4>
                    <p className="font-body text-xs text-glacier/40 italic">Targeting strategic corridors between Mumbai and Delhi to ensure seamless cargo and capital flow.</p>
                </div>
                <div className="p-10 border border-white/5 bg-white/[0.01]">
                    <h4 className="font-industrial text-gold tracking-[0.4em] text-[10px] mb-4 uppercase">Innovation Nodes</h4>
                    <p className="font-body text-xs text-glacier/40 italic">Centralizing our Neural OS development in Bengaluru to tap into the world's most elite-tier engineering talent.</p>
                </div>
                 <div className="p-10 border border-white/5 bg-white/[0.01]">
                    <h4 className="font-industrial text-gold tracking-[0.4em] text-[10px] mb-4 uppercase">Agri-Spheres</h4>
                    <p className="font-body text-xs text-glacier/40 italic">Expanding VegaVrudhi's regenerative biospheres across the eastern coastal belts of Kolkata.</p>
                </div>
            </div>
        </div>

        {/* Closing Contact CTA */}
        <section className="py-64 md:pt-32 text-center">
             <h2 className="font-headline italic text-7xl md:text-[10rem] text-glacier/10 leading-none">Scale with us.</h2>
             <Link href="/invest" className="text-gold font-industrial text-xl tracking-[0.4em] border-b border-gold/40 pb-2 hover:border-gold transition-all uppercase mt-12 inline-block">
                Expand Territory →
             </Link>
        </section>

        <footer className="bg-dark py-12 border-t border-white/5">
             <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 px-8 md:px-0">
                   <div className="font-industrial text-gold-premium tracking-[0.6em] text-3xl uppercase">RISEMATE VENTURE</div>
                   <p className="font-body text-[10px] uppercase tracking-widest opacity-20">© 2024 RISEMATE VENTURE. OPERATIONAL FOOTPRINT.</p>
             </div>
        </footer>
      </main>
    </div>
  );
}
