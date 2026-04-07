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

const CompanySection = ({ id, name, tagline, description, impact, leader, mission, details, website, reverse, delay = 0, isVisible }) => (
    <section className={`py-24 md:py-32 px-6 md:px-24 border-b border-dark/5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${delay}ms` }}>
        <div className={`max-w-screen-2xl mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 md:gap-24 items-start`}>
            <div className="w-full lg:w-1/2">
                <span className="font-industrial text-gold tracking-[0.6em] text-[10px] uppercase font-bold mb-8 block underline decoration-gold/20 underline-offset-8">Entity {id} / ASSET OPS</span>
                <h2 className="font-headline italic text-6xl md:text-8xl text-dark leading-[0.9] mb-12">{name}</h2>
                <div className="gold-rule w-32 mb-12 !justify-start" />
                <p className="font-body text-xl md:text-2xl text-dark mb-12 border-l-2 border-gold/40 pl-8 leading-relaxed italic">
                    {tagline}
                </p>
                <div className="space-y-8 mb-16">
                    <div className="flex items-start gap-6">
                        <span className="font-industrial text-gold text-xs font-bold pt-1 min-w-[70px]">MISSION</span>
                        <p className="font-body text-dark/80 leading-relaxed uppercase tracking-wider text-[12px] font-bold">{mission}</p>
                    </div>
                    <div className="flex items-start gap-6">
                        <span className="font-industrial text-gold text-xs font-bold pt-1 min-w-[70px]">LEADERSHIP</span>
                        <div>
                            <p className="font-headline italic text-3xl text-dark mb-1">{leader.name}</p>
                            <p className="font-industrial text-[10px] tracking-[0.4em] text-dark/60 font-bold uppercase">{leader.role}</p>
                        </div>
                    </div>
                </div>
                <a href={website} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-5 bg-dark text-glacier font-industrial text-[11px] tracking-[0.5em] font-bold uppercase transition-all hover:bg-gold hover:text-dark shadow-xl hover:-translate-y-1">
                    Explore Ecosystem
                </a>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {impact.map((stat, idx) => (
                    <div key={idx} className="bg-white p-10 border border-dark/5 hover:border-gold/20 transition-colors">
                        <h4 className="font-headline italic text-4xl text-dark mb-2">{stat.value}</h4>
                        <p className="font-industrial text-[9px] tracking-widest text-dark/40 font-bold uppercase">{stat.label}</p>
                    </div>
                ))}
                <div className="md:col-span-2 bg-dark p-12 text-glacier">
                    <h5 className="font-industrial text-gold tracking-widest text-[11px] font-bold uppercase mb-8 underline decoration-gold/10 underline-offset-8">Process Architecture</h5>
                    <div className="space-y-8">
                        {details.map((item, idx) => (
                            <div key={idx} className="flex gap-6">
                                <span className="font-headline italic text-3xl text-gold/60">{String(idx + 1).padStart(2, '0')}</span>
                                <p className="font-body text-[14px] text-white/50 leading-relaxed italic">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default function Companies() {
    const bworth = useReveal();
    const vega = useReveal();
    const rym = useReveal();
    const sync = useReveal();

    return (
        <div className="bg-glacier min-h-screen selection:bg-gold selection:text-dark">
            <Navbar />

            <main className="pt-40 md:pt-64">
                <section className="py-24 px-6 md:px-24 bg-white border-b border-dark/5">
                    <div className="max-w-screen-2xl mx-auto">
                        <span className="font-industrial text-gold tracking-[0.5em] text-[10px] uppercase font-bold mb-8 block">Global Portfolio</span>
                        <h1 className="font-headline italic text-6xl md:text-8xl lg:text-[10rem] text-dark leading-none italic mb-12">The Sovereign Digital <br /> Legacy.</h1>
                    </div>
                </section>

                <div ref={bworth.ref}>
                    <CompanySection
                        id="01"
                        name="BWorth"
                        tagline="Sustainable Fashion Innovation Leader."
                        mission="Revolutionizing the fashion industry through a unique buyback program that preserves the planet's beauty."
                        leader={{ name: "Dheeraj Anand", role: "Founder & CEO" }}
                        website="https://bworth.co.in/"
                        impact={[
                            { value: "10,000+", label: "Items Recycled" },
                            { value: "5,000+", label: "Users Joined" },
                            { value: "25,000+", label: "Total Items Saved" },
                            { value: "CO₂ TRACK", label: "Live Monitoring" }
                        ]}
                        details={[
                            "Easily upload pictures of garments you no longer wear.",
                            "Earn BWorth Coins instantly where 1 Coin = ₹1 value.",
                            "Use coins as cash for new styles or contribute to global circularity."
                        ]}
                        isVisible={bworth.isVisible}
                    />
                </div>

                <div ref={vega.ref}>
                    <CompanySection
                        id="02"
                        name="Vega Vrudhi"
                        tagline="Precision Execution & Growth Architecture."
                        mission="To be the trusted growth engine for brands, enabling them to engage meaningfully and scale sustainably."
                        leader={{ name: "Saurabh Jain", role: "Founder & CEO" }}
                        website="https://www.vegavruddhi.com/"
                        impact={[
                            { value: "PAN-INDIA", label: "Execution Reach" },
                            { value: "AI/ML", label: "Tech Core" },
                            { value: "99.8%", label: "Client Satisfaction" },
                            { value: "ETHICAL", label: "Value System" }
                        ]}
                        details={[
                            "Digital Lead Fulfillment bridging the gap to verified customers.",
                            "Managed Sales engines deploying trained field teams nationwide.",
                            "On-ground Activation logistics handling full market presence."
                        ]}
                        reverse
                        isVisible={vega.isVisible}
                    />
                </div>

                <div ref={rym.ref}>
                    <CompanySection
                        id="03"
                        name="RYM Grenergy"
                        tagline="Intelligent Systems & Deep-Tech Engineering."
                        mission="Building intelligent, AI-powered solutions that optimize efficiency and reduce carbon footprint."
                        leader={{ name: "Yograj Rundhanker", role: "Founder & CEO" }}
                        website="https://rymgrenergy.com/"
                        impact={[
                            { value: "ULTRON", label: "Flagship Energy Platform" },
                            { value: "REEWS", label: "Early Detection Warning" },
                            { value: "IOT/AI", label: "Embedded Systems" },
                            { value: "GKM ENERGY", label: "Key Deployment" }
                        ]}
                        details={[
                            "ULTRON: Deployed with GKM Energy for real-time monitoring.",
                            "INTELLEXA AI: Universal document intelligence for large enterprises.",
                            "Weighbridge AI: Intelligent traffic-optimization and routing systems."
                        ]}
                        isVisible={rym.isVisible}
                    />
                </div>

                <div ref={sync.ref}>
                    <CompanySection
                        id="04"
                        name="Synchronous"
                        tagline="High-Performance Digital Marketing Group."
                        mission="Architecting high-velocity digital ecosystems for high-growth elite brands."
                        leader={{ name: "Devam Srivastava", role: "Founder & CEO" }}
                        website="https://www.synchronousbuilddigital.com/"
                        impact={[
                            { value: "METHOD 4.0", label: "Proprietary Framework" },
                            { value: "NEURAL", label: "Ad Arbitrage" },
                            { value: "SCALE", label: "Equity Scaling" },
                            { value: "ELITE", label: "Digital Monitoring" }
                        ]}
                        details={[
                            "Neural Audit mapping search arbitrage vectors across markets.",
                            "Performance-obsessed retention logic and ROAS optimization.",
                            "Neural conversion loops and algorithmic market dominance."
                        ]}
                        reverse
                        isVisible={sync.isVisible}
                    />
                </div>

                {/* 3. CTA */}
                <section className="py-24 md:py-32 px-6 md:px-24 bg-white text-center border-t border-dark/5">
                    <div className="max-w-4xl mx-auto">
                        <span className="font-industrial text-gold tracking-[1em] text-[11px] uppercase font-bold mb-10 block italic opacity-60">Initialize Strategic Partnership</span>
                        <h2 className="font-headline italic text-4xl md:text-7xl leading-tight text-dark mb-16 italic tracking-tighter">Induct Your Brand <br /> Into the Legacy.</h2>
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
