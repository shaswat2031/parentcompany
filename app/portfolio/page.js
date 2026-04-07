"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";

const entities = [
    {
        id: "01",
        name: "BWorth",
        tagline: "Sustainable Fashion Innovation Leader",
        tag: "Circular Luxury",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
        desc: "Revolutionizing the fashion industry through a unique circular luxury ecosystem. Buy, sell, and recycle fashion while earning rewards through our unique buyback program that preserves the planet's beauty.",
        pillars: ["BWorth Coins (1:1 Value)", "Landfill Elimination", "Live CO₂ Monitoring"],
        metrics: ["10,000+ Items Recycled", "25,000+ total Items Saved"],
        color: "text-green-600",
        link: "https://bworth.co.in"
    },
    {
        id: "02",
        name: "Vega Vrudhi",
        tagline: "Precision Execution & Growth Architecture",
        tag: "Managed Sales",
        img: "https://images.unsplash.com/photo-1600880212340-0234403d18ff?q=80&w=2670&auto=format&fit=crop",
        desc: "Precision execution architecture bridging the gap between digital leads and on-ground reality. We deploy trained field teams to accelerate market presence for national growth engines.",
        pillars: ["Digital Lead Fulfillment", "Activation Programs", "Merchant Onboarding"],
        sectors: ["FinTech", "FMCG", "E-Commerce", "GovTech"],
        color: "text-blue-600",
        link: "https://vegavruddhi.com"
    },
    {
        id: "03",
        name: "RYM Grenergy",
        tagline: "Intelligent Systems & Deep-Tech Engineering",
        tag: "Clean Energy",
        img: "https://images.unsplash.com/photo-1509391366360-fe5bb6058826?q=80&w=2670&auto=format&fit=crop",
        desc: "Enabling a carbon-neutral future by developing the world’s greenest battery cell and intelligent green-tech infrastructure through AI, IoT, and Smart Automation.",
        pillars: ["ULTRON Energy Platform", "INTELLEXA AI", "Weighbridge AI", "REEWS Earthquake Warning"],
        color: "text-emerald-500",
        link: "https://rym-grenergy.com"
    },
    {
        id: "04",
        name: "Synchronous",
        tagline: "High-Performance Digital Marketing Group",
        tag: "Autonomous AI",
        img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop",
        desc: "Architecting high-velocity digital ecosystems for high-growth elite brands. We build vertically integrated brand identities and compound ROI via algorithmic process automation.",
        pillars: ["Brand Identity Architecture", "Autonomous AI Agents", "Data-Backed Growth", "Predictive Modeling"],
        color: "text-purple-600",
        link: "https://synchronous.digital"
    }
];

export default function Portfolio() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <main className="pt-24">
                {/* HERO */}
                <section className="py-16 md:py-24 px-6 md:px-24">
                    <div className="max-w-screen-2xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-xs font-black uppercase tracking-[0.6em] text-blue-600 mb-8 block">Sovereign Registry</span>
                            <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] text-dark tracking-tighter mb-12">
                                Institutional <br />
                                <span className="text-dark/20 italic">Portfolio.</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-dark/60 font-secondary max-w-4xl border-l-[4px] border-gold pl-12 py-4">
                                A legacy of strategic allocation across four high-velocity sectors. Each entity operates as a sovereign architectural unit under the RiseMate banner.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* SHOWCASE */}
                <div className="space-y-24 pb-24">
                    {entities.map((entity, idx) => (
                        <EntitySection key={entity.id} entity={entity} index={idx} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function EntitySection({ entity, index }) {
    const isEven = index % 2 === 0;
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={sectionRef} className="container-wide">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center`}>
                {/* Image side */}
                <div className={`lg:col-span-1 border-r border-dark/5 hidden lg:block`}>
                    <p className="text-[10vw] font-black text-dark/[0.03] rotate-180 [writing-mode:vertical-lr] select-none">
                        0{entity.id}
                    </p>
                </div>
                
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden group">
                        <Image
                            src={entity.img}
                            alt={entity.name}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-1000" />
                    </div>
                </div>

                {/* Content side */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div 
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isEven ? 50 : -50 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1 }}
                        style={{ y }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="px-4 py-1 bg-dark text-white text-[10px] font-black uppercase tracking-widest rounded-full">{entity.tag}</span>
                            <div className="h-[1px] flex-grow bg-dark/5"></div>
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black text-dark mb-6 tracking-tighter">
                            {entity.name}
                        </h2>
                        
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-gold mb-8 italic">
                            {entity.tagline}
                        </p>

                        <p className="text-lg text-dark/60 font-secondary leading-relaxed mb-12 italic border-l-2 border-dark/10 pl-8">
                            {entity.desc}
                        </p>

                        <div className="space-y-8 mb-12">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4">Core Pillars</h4>
                                <div className="flex flex-wrap gap-3">
                                    {entity.pillars.map((pillar, i) => (
                                        <span key={i} className="px-4 py-2 border border-dark/10 text-xs font-bold text-dark/60 rounded-xl hover:bg-dark hover:text-white transition-all cursor-default">
                                            {pillar}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {entity.metrics && (
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4">Impact Metrics</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {entity.metrics.map((m, i) => (
                                            <div key={i} className="p-4 bg-[#f8f9fa] rounded-2xl border border-dark/5">
                                                <p className="text-xs font-bold text-dark">{m}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {entity.sectors && (
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-dark/30 mb-4">Sector Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {entity.sectors.map((s, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href={entity.link} className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.3em] text-dark group/link">
                            <span className="relative">
                                Explore Website
                                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gold transition-all duration-500 group-hover/link:w-full"></span>
                            </span>
                            <span className="material-symbols-outlined text-lg group-hover/link:rotate-45 transition-transform duration-500">north_east</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
