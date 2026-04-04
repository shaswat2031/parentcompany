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

// Global Custom Select Component
function CustomDropdown({ options, selected, onSelect, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full border-b border-gold/20 pb-4 transition-colors duration-500 focus-within:border-gold" ref={dropdownRef}>
      <div 
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-body text-sm uppercase tracking-widest text-gold ${!selected ? "opacity-30" : "opacity-100"}`}>
          {selected || placeholder}
        </span>
        <span className={`material-symbols-outlined text-gold/40 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </div>
      
      {/* Dropdown Menu */}
      <div className={`absolute top-full left-0 w-full mt-2 bg-[#0C0C0C] border border-gold/10 z-50 transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {options.map((option, i) => (
          <div 
            key={i}
            className="px-6 py-4 hover:bg-gold hover:text-dark transition-all cursor-pointer font-body text-xs uppercase tracking-widest"
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Investment() {
  const [interestType, setInterestType] = useState("");
  const institutionalSect = useReveal();
  const incubationSect = useReveal();

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

      <Navbar />

      <main className="animate-page-in">
        {/* Investor Hero */}
        <section className="min-h-[80vh] flex flex-col justify-center px-8 md:px-24 pt-32 relative overflow-hidden">
             <div className="max-w-7xl relative z-10">
                <span className="font-industrial text-xs tracking-[0.5em] text-gold mb-6 block underline decoration-gold/30 underline-offset-8 decoration-2 uppercase">Capital Markets</span>
                <h1 className="font-headline italic text-7xl md:text-[9.5rem] leading-[0.85] mb-12">
                   Unified <span className="text-gold">Wealth.</span> <br /> Radical <span className="italic font-light opacity-40">Growth.</span>
                </h1>
                <p className="font-body text-xl text-glacier/60 max-w-2xl leading-relaxed italic border-l border-gold/20 pl-8 ml-[10vw]">
                    Investing in RISEMATE VENTURE is a commitment to the structural longevity of modern industry. We don't just allocate capital; we engineer growth.
                </p>
            </div>
            <div className="absolute top-1/2 right-0 w-[50vw] h-[50vw] border-[0.2px] border-gold/5 rounded-full blur-3xl opacity-20 transform -translate-y-1/2 pointer-events-none" />
        </section>

        {/* Dual Path Section */}
        <section className="py-24 px-8 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border-y border-white/5">
            <div ref={institutionalSect.ref} className={`p-12 md:p-24 border-r border-white/5 transition-all duration-1000 ${institutionalSect.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <span className="font-industrial text-gold tracking-[0.4em] text-xs mb-8 block uppercase">Institutional Investment</span>
                <h2 className="font-headline italic text-5xl md:text-7xl mb-8 leading-tight">Join the <br /> Sovereign Core.</h2>
                <p className="font-body text-glacier/60 leading-relaxed mb-12 italic">
                    Acquire stake in the most disciplined conglomerate on the global stage. We provide Institutional Partners with direct pipeline access to our Real Estate, AgriTech, and Saas portfolios.
                </p>
                <button className="w-full md:w-auto px-12 py-6 border border-gold/40 text-xs font-industrial tracking-[0.5em] hover:bg-gold hover:text-dark transition-all uppercase">
                    Institutional Prospectus →
                </button>
            </div>

            <div ref={incubationSect.ref} className={`p-12 md:p-24 transition-all duration-1000 delay-300 ${incubationSect.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                 <span className="font-industrial text-gold tracking-[0.4em] text-xs mb-8 block uppercase">Incubation & Ventures</span>
                <h2 className="font-headline italic text-5xl md:text-7xl mb-8 leading-tight">Have an Idea? <br /> Get Funded.</h2>
                <p className="font-body text-glacier/60 leading-relaxed mb-12 italic">
                    The next great empire starts with a single calculation. If you are building the 'Digital Build' or 'Green Tech' of 2030, our venture arm provides the infrastructure and capital to scale.
                </p>
                <button className="w-full md:w-auto px-12 py-6 bg-gold text-dark text-xs font-industrial tracking-[0.5em] hover:scale-105 transition-all uppercase">
                    Submit Proposal →
                </button>
            </div>
        </section>

        {/* Global Stats Bar */}
        <section className="py-12 bg-dark flex flex-wrap justify-between items-center px-8 md:px-24 gap-12 font-industrial text-3xl md:text-5xl text-glacier/10 select-none uppercase">
            <span>22.4% CAGR</span>
            <span>$4B LIQUIDITY</span>
            <span>Global A+ Rating</span>
            <span>Est. 1952</span>
        </section>

        {/* Contact/Apply Form */}
        <section className="py-48 px-8 md:px-24 bg-dark">
             <div className="max-w-4xl mx-auto border border-gold/10 p-12 md:p-24 bg-gold/5 rounded-sm editorial-shadow">
                  <h3 className="font-headline italic text-5xl mb-12 text-center">Submission of Intent.</h3>
                  <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                        <div className="border-b border-gold/20 pb-4 transition-colors duration-500 focus-within:border-gold">
                            <input type="text" placeholder="FULL NAME / ORGANISATION" className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gold/20 font-body text-sm uppercase tracking-widest text-gold" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-12">
                             <div className="flex-1 border-b border-gold/20 pb-4 transition-colors duration-500 focus-within:border-gold">
                                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gold/20 font-body text-sm uppercase tracking-widest text-gold" />
                             </div>
                             <div className="flex-1">
                                <CustomDropdown 
                                    options={["INSTITUTIONAL INVESTOR", "VENTURE FOUNDER", "PARTNER", "GENERAL ENQUIRY"]} 
                                    selected={interestType} 
                                    onSelect={setInterestType}
                                    placeholder="SELECTION CATEGORY"
                                />
                             </div>
                        </div>
                        <div className="border-b border-gold/20 pb-4 transition-colors duration-500 focus-within:border-gold">
                            <textarea placeholder="PROPOSAL OR INVESTMENT SUMMARY" className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gold/20 font-body text-sm uppercase tracking-widest text-gold h-32 resize-none" />
                        </div>
                        <button className="w-full py-8 bg-gold text-dark font-industrial text-2xl tracking-[0.4em] hover:scale-[1.02] transition-all uppercase flex items-center justify-center gap-4">
                            <span>Reach Out to the Group</span>
                            <span className="material-symbols-outlined">mail</span>
                        </button>
                  </form>
             </div>
        </section>

        <footer className="bg-dark py-12 px-8 md:px-24 border-t border-white/5">
             <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                   <div className="font-industrial text-gold-premium tracking-[0.6em] text-3xl uppercase">RISEMATE VENTURE</div>
                   <p className="font-body text-[10px] uppercase tracking-widest opacity-20">© 2024 RISEMATE VENTURE. CAPITAL SECURED.</p>
             </div>
        </footer>
      </main>
    </div>
  );
}
