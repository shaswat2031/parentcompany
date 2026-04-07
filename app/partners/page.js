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
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

const NexusSector = ({ id, title, subtitle, items, isVisible, delay = 0 }) => (
    <div className={`transition-all duration-1000 border-b border-dark/10 py-24 md:py-32 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${delay}ms` }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
            <div className="lg:col-span-4">
                <span className="font-industrial text-gold tracking-[0.8em] text-[11px] uppercase font-bold mb-6 block">Sector {id} · Nexus Access</span>
                <h2 className="font-headline italic text-5xl md:text-7xl text-dark leading-tight mb-4">{title}</h2>
                <div className="gold-rule w-24 mb-10 !justify-start" />
                <p className="font-body text-[13px] tracking-[0.4em] text-dark/40 font-bold uppercase">{subtitle}</p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                {items.map((item, idx) => (
                    <div key={idx} className="bg-white/40 border border-dark/5 p-12 hover:border-gold/20 transition-all hover:bg-white group cursor-default shadow-sm h-full flex flex-col justify-between">
                        <div>
                            <h4 className="font-headline italic text-3xl md:text-4xl text-dark group-hover:text-gold transition-colors mb-6">{item.name}</h4>
                            <p className="font-industrial text-[11px] tracking-[0.5em] text-dark/50 font-bold uppercase mb-8">{item.category}</p>
                            <p className="font-body text-dark/70 text-base leading-relaxed italic border-l border-gold/20 pl-6 mb-8">{item.description}</p>
                        </div>
                        <div className="flex justify-between items-end border-t border-dark/5 pt-8">
                            <span className="font-industrial text-[10px] tracking-[0.4em] text-dark/30 font-bold uppercase">{item.status}</span>
                            <span className="material-symbols-outlined text-dark/10 text-xl group-hover:text-gold/40 transition-colors">hub</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default function Partners() {
    const introReveal = useReveal();
    const instReveal = useReveal();
    const techReveal = useReveal();
    const indReveal = useReveal();
    const impactReveal = useReveal();

    return (
        <div className="bg-glacier min-h-screen selection:bg-gold selection:text-dark">
            <Navbar />

            <main className="pt-32">
                {/* 1. HERO */}
                <section ref={introReveal.ref} className="py-24 md:py-48 px-6 md:px-24 bg-white relative overflow-hidden border-b border-dark/5">
                    <div className="max-w-screen-2xl mx-auto">
                        <span className="font-industrial text-gold tracking-[0.8em] text-[11px] uppercase font-bold mb-8 block underline decoration-gold/20 underline-offset-8">Strategic Registry</span>
                        <h1 className="font-headline italic text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] text-dark mb-12 tracking-tighter">The Global <br className="hidden md:block" /> Strategic Nexus.</h1>
                        <p className="font-body text-xl md:text-3xl text-dark leading-relaxed italic border-l-2 border-gold/40 pl-12 max-w-5xl opacity-80 uppercase tracking-tight">
                            Integrating world-class institutional capital, deep-tech research labs, and hyper-velocity industrial nodes into a sovereign operational kernel.
                        </p>
                    </div>
                    {/* Background Texture */}
                    <div className="absolute top-0 right-0 font-industrial text-[30vw] text-dark/[0.01] leading-none select-none pointer-events-none translate-x-1/4 -translate-y-1/4 uppercase">Nexus</div>
                </section>

                {/* 2. THE NEXUS SECTORS */}
                <section className="px-6 md:px-24 bg-glacier border-t border-dark/5">
                    <div className="max-w-screen-2xl mx-auto">

                        {/* SECTOR 01: INSTITUTIONAL */}
                        <div ref={instReveal.ref}>
                            <NexusSector
                                id="01"
                                title="Institutional Alliances"
                                subtitle="Venture Alliances · Equity Pool A"
                                isVisible={instReveal.isVisible}
                                items={[
                                    {
                                        name: "Anchor Capital",
                                        category: "Series A / Equity Pool",
                                        description: "Primary institutional backing specializing in deep-tech and digital commerce expansion across the Indian subcontinent.",
                                        status: "ACTIVE REGISTRY · 2026"
                                    },
                                    {
                                        name: "Sovereign Strategic",
                                        category: "Private Placement Registry",
                                        description: "Diversified industrial capital focused on the fusion of luxury circularity and national supply-chain nodes.",
                                        status: "ACTIVE REGISTRY · 2026"
                                    }
                                ]}
                            />
                        </div>

                        {/* SECTOR 02: TECHNOLOGY */}
                        <div ref={techReveal.ref}>
                            <NexusSector
                                id="02"
                                title="Digital Backbone"
                                subtitle="Neural Engines · AI Research Labs"
                                isVisible={techReveal.isVisible}
                                delay={100}
                                items={[
                                    {
                                        name: "Compute Alpha",
                                        category: "AI/ML Infrastructure",
                                        description: "Providing the high-density neural processing power for Vega Vrudhi's national lead fulfillment engine.",
                                        status: "LIVE OPS · 2h LATENCY"
                                    },
                                    {
                                        name: "Cloud Horizon",
                                        category: "Sovereign Data Storage",
                                        description: "Secure, decentralized industrial data management architecture ensuring zero-leak digital asset tracking.",
                                        status: "STRICTLY SECURE · 2026"
                                    }
                                ]}
                            />
                        </div>

                        {/* SECTOR 03: INDUSTRIAL */}
                        <div ref={indReveal.ref}>
                            <NexusSector
                                id="03"
                                title="Industrial Nodes"
                                subtitle="Supply Chain · Retail Alliances"
                                isVisible={indReveal.isVisible}
                                delay={200}
                                items={[
                                    {
                                        name: "National Retail",
                                        category: "Enterprise Distribution",
                                        description: "Direct access nodes across Tier-1 and Tier-2 Indian markets, enabling hyper-velocity on-ground execution.",
                                        status: "CONTINENTAL OPS · NCR"
                                    },
                                    {
                                        name: "Logistics Pro",
                                        category: "Supply Chain Engineering",
                                        description: "Specialized logistics partnership for the circular luxury garment collection and redistribution cycle.",
                                        status: "ACTIVE LOGISTICS · GLOBAL"
                                    }
                                ]}
                            />
                        </div>

                        {/* SECTOR 04: IMPACT */}
                        <div ref={impactReveal.ref}>
                            <NexusSector
                                id="04"
                                title="Impact Integrity"
                                subtitle="Circular Economy · Global Standards"
                                isVisible={impactReveal.isVisible}
                                delay={300}
                                items={[
                                    {
                                        name: "Sustainability Board",
                                        category: "Global Circular Audit",
                                        description: "International auditing group verifying BWorth's carbon-credit generation and upcycling integrity labels.",
                                        status: "CERTIFIED 2026 · RANK A"
                                    },
                                    {
                                        name: "Circular Alliances",
                                        category: "Technical Fashion Lab",
                                        description: "R&D group developing the next generation of recycled textile polymers and ethical luxury filaments.",
                                        status: "RESEARCH · ACTIVE"
                                    }
                                ]}
                            />
                        </div>

                    </div>
                </section>

                {/* 3. CTA */}
                <section className="py-24 md:py-32 px-6 md:px-24 bg-white text-center border-t border-dark/5">
                    <div className="max-w-4xl mx-auto">
                        <span className="font-industrial text-gold tracking-[1em] text-[11px] uppercase font-bold mb-10 block italic opacity-60">Initialize Strategic Nexus</span>
                        <h2 className="font-headline italic text-4xl md:text-7xl leading-tight text-dark mb-16 italic tracking-tighter">Enter The Global <br /> Registry.</h2>
                        <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-5 bg-dark text-glacier font-industrial text-[11px] tracking-[0.5em] font-bold uppercase transition-all hover:bg-gold hover:text-dark shadow-2xl hover:-translate-y-1 group">
                            Become A Partner
                            <span className="material-symbols-outlined text-sm transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">open_in_new</span>
                        </Link>
                    </div>
                </section>

                <footer className="bg-dark py-12 md:py-20 px-8 md:px-24 border-t border-white/5 relative overflow-hidden">
                    <div className="max-w-screen-2xl mx-auto">
                        {/* BRAND ARCHITECTURE - COMPACT */}
                        <div className="mb-12">
                            <div className="font-industrial text-dark bg-gold px-6 py-3 text-4xl md:text-5xl font-bold uppercase inline-block tracking-[0.4em] mb-6 shadow-2xl">
                                RISE MATE
                                <span className="block text-[10px] tracking-[0.8em] mt-1 opacity-80">SOVEREIGN INDUSTRIAL GROUP</span>
                            </div>
                            <p className="font-body text-[13px] md:text-[14px] text-glacier/70 max-w-2xl leading-relaxed italic border-l-2 border-gold/40 pl-8 uppercase tracking-[0.1em] font-medium mb-12">
                                The leading technology partner for circular luxury and sustainable industrial innovation. <br className="hidden md:block" /> Architecting the sovereign future of high-velocity operations and digital capital.
                            </p>
                        </div>

                        {/* DATA REGISTRY - COMPACT GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 border-t border-white/10 pt-12">
                            <div className="md:col-span-3">
                                <h6 className="font-industrial text-gold text-[11px] font-bold uppercase tracking-[0.8em] mb-6 flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span> Index
                                </h6>
                                <div className="flex flex-col gap-3 font-body text-[11px] text-glacier/50 uppercase tracking-[0.3em] font-bold">
                                    <Link href="/" className="hover:text-gold transition-all duration-500 hover:translate-x-1">Digital Home</Link>
                                    <Link href="/companies" className="hover:text-gold transition-all duration-500 hover:translate-x-1">Portfolio Assets</Link>
                                    <Link href="/leadership" className="hover:text-gold transition-all duration-500 hover:translate-x-1">Executive Suite</Link>
                                    <Link href="/partners" className="hover:text-gold transition-all duration-500 hover:translate-x-1">Strategic Nexus</Link>
                                    <Link href="/contact" className="hover:text-gold transition-all duration-500 hover:translate-x-1">Strategic Induction</Link>
                                </div>
                            </div>
                            <div className="md:col-span-4">
                                <h6 className="font-industrial text-gold text-[11px] font-bold uppercase tracking-[0.8em] mb-6 flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span> Registry
                                </h6>
                                <div className="font-body text-[11px] text-glacier/50 leading-[2.2] tracking-[0.3em] font-bold uppercase">
                                    info@bworth.co.in<br />
                                    saurabh@vegavruddhi.com<br />
                                    +91 91166 16636
                                </div>
                            </div>
                            <div className="md:col-span-5">
                                <h6 className="font-industrial text-gold text-[11px] font-bold uppercase tracking-[0.8em] mb-6 flex items-center gap-4">
                                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></span> Headquarters
                                </h6>
                                <div className="font-body text-[11px] text-glacier/50 leading-[2.2] tracking-[0.3em] font-bold uppercase">
                                    Sector – 69, HR / Jagatpura, RJ<br />
                                    Institutional NCR / ACTIVE STATUS<br />
                                    ESTABLISHED 2026 SOVEREIGN REGISTRY
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM COPYRIGHT - COMPACT */}
                        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <span className="font-industrial text-[9px] text-glacier/30 tracking-[1em] uppercase font-bold">© 2026 RISEMATE VENTURE ALL RIGHTS RESERVED.</span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
