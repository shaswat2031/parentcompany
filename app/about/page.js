"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <main className="pt-20">
                {/* 1. HERO SECTION */}
                <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-dark/5 bg-[#fafafa]">
                    {/* Architectural Mesh Background */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

                    {/* Massive Outline Text Background */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-[15vw] font-black text-transparent uppercase tracking-tighter" style={{ WebkitTextStroke: "2px rgba(0,35,102,0.05)" }}>
                            RISEMATE
                        </motion.h2>
                    </div>

                    <div className="max-w-screen-2xl mx-auto relative z-10 w-full">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 lg:gap-24 w-full">
                            
                            {/* Left Text Block */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-1"
                            >
                                <div className="inline-flex items-center gap-6 mb-12">
                                    <div className="h-[1px] w-20 bg-blue-600/30 relative overflow-hidden">
                                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-full bg-blue-600" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600">About the Portal</span>
                                </div>
                                
                                <h1 className="text-6xl md:text-[6.5rem] xl:text-[8.5rem] font-black leading-[0.85] text-dark tracking-tighter mb-8">
                                    The Sovereign<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-900 to-dark opacity-90 pr-4">Legacy.</span>
                                </h1>
                            </motion.div>

                            {/* Right Descriptor Block */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-1 lg:max-w-xl pb-6 border-l-[2px] border-blue-600/20 pl-8 lg:pl-16 relative"
                            >
                                {/* Vertical Animated Line Overlay */}
                                <motion.div 
                                    initial={{ height: 0 }} 
                                    animate={{ height: "100%" }} 
                                    transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }} 
                                    className="absolute top-0 -left-[2px] w-[2px] bg-blue-600" 
                                />

                                <div className="hidden lg:flex w-14 h-14 mb-10 rounded-full border border-dark/10 items-center justify-center bg-white shadow-md">
                                    <span className="material-symbols-outlined text-dark text-2xl font-light">language</span>
                                </div>

                                <p className="text-xl md:text-3xl text-dark/60 font-secondary leading-snug">
                                    RiseMate Venture catalysts economic development by connecting global institutional expertise with high-growth entities across <span className="font-bold text-dark">fashion, tech, energy,</span> and <span className="font-bold text-dark">digital sectors.</span>
                                </p>
                                
                                <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-6">
                                    <div className="flex -space-x-4">
                                        <div className="w-12 h-12 rounded-full border-[3px] border-[#fafafa] bg-emerald-50 text-emerald-600 shadow-lg flex items-center justify-center z-[1]">
                                            <span className="material-symbols-outlined text-base">eco</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-[3px] border-[#fafafa] bg-dark text-white shadow-lg flex items-center justify-center z-[2]">
                                            <span className="material-symbols-outlined text-base">precision_manufacturing</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-[3px] border-[#fafafa] bg-blue-600 text-white shadow-lg flex items-center justify-center z-[3]">
                                            <span className="material-symbols-outlined text-base">data_object</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-dark">Multi-Sector Integration</span>
                                        <span className="text-[9px] font-bold text-dark/40 uppercase tracking-widest mt-1">Cross-Industry Expertise</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* 2. MISSION & VISION */}
                <section className="py-16 md:py-24 bg-dark text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 mix-blend-overlay" />
                    <div className="container-wide relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 1 }}
                                className="lg:col-span-12"
                            >
                                <h2 className="text-4xl md:text-8xl font-black mb-16 leading-tight tracking-tighter text-center">
                                    Architecting <span className="text-gold">Sovereign</span> <br />Industrial Success
                                </h2>
                            </motion.div>
                            <div className="lg:col-span-6 space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.8 }}
                                    className="p-10 border border-white/10 rounded-[40px] hover:border-gold/30 transition-all group"
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-gold group-hover:tracking-widest transition-all">Our Philosophy</h3>
                                    <p className="text-lg text-white/50 font-secondary leading-relaxed italic">
                                        "Stewardship defined by the fusion of industrial intelligence and sovereign legacy. Leading the next generation of global impact through precision execution."
                                    </p>
                                </motion.div>
                            </div>
                            <div className="lg:col-span-6 space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.8 }}
                                    className="p-10 border border-white/10 rounded-[40px] hover:border-blue-500/30 transition-all group"
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-blue-500 group-hover:tracking-widest transition-all">Institutional Impact</h3>
                                    <p className="text-lg text-white/50 font-secondary leading-relaxed italic">
                                        We operate as a central repository for verified institutional content, ensuring that every entity under the RISEMATE banner adheres to supreme market authority.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. FOUR ENTITIES OVERVIEW */}
                <section className="py-16 bg-white">
                    <div className="container-wide">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-dark/10 pb-12"
                        >
                            <h2 className="text-4xl md:text-7xl font-bold text-dark tracking-tighter">The Registry</h2>
                            <p className="text-dark/40 font-black uppercase tracking-[0.3em] text-xs mt-4 md:mt-0">Ref: CONTENT_MANIFESTO_2026</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    name: "BWorth",
                                    sector: "Sustainable Fashion",
                                    desc: "Revolutionizing the fashion industry through a unique circular luxury ecosystem. Buy, sell, and recycle fashion while earning rewards through our unique buyback program that preserves the planet's beauty.",
                                    logo: "/BWORTH.jpg"
                                },
                                {
                                    name: "Vega Vrudhi",
                                    sector: "Execution Architecture",
                                    desc: "Precision execution architecture bridging the gap between digital leads and on-ground reality. We deploy trained field teams to accelerate market presence for national growth engines.",
                                    logo: "/VEGA.png"
                                },
                                {
                                    name: "RYM Grenergy",
                                    sector: "Deep-Tech",
                                    desc: "Enabling a carbon-neutral future by developing the world’s greenest battery cell and intelligent green-tech infrastructure through AI, IoT, and Smart Automation.",
                                    logo: "https://rymgrenergy.com/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75"
                                },
                                {
                                    name: "Synchronous",
                                    sector: "Digital Marketing",
                                    desc: "Architecting high-velocity digital ecosystems for high-growth elite brands. We build vertically integrated brand identities and compound ROI via algorithmic process automation.",
                                    logo: "/sync.jpg"
                                }
                            ].map((entity, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group p-12 bg-[#f8f9fa] border border-transparent hover:border-dark/5 hover:bg-white hover:shadow-2xl transition-all duration-700 rounded-[40px]"
                                >
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600/50 block">Entity 0{idx + 1}</span>
                                        {entity.logo && (
                                            <div className={`w-12 h-12 ${entity.name === 'Synchronous' ? 'bg-zinc-950' : 'bg-white'} rounded-lg p-2 border border-dark/5 shadow-sm overflow-hidden flex items-center justify-center`}>
                                                <Image src={entity.logo} alt={entity.name} width={32} height={32} className="object-contain" unoptimized={true} />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="text-3xl font-black text-dark mb-4">{entity.name}</h4>
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-8">{entity.sector}</p>
                                    <p className="text-[11px] text-dark/60 font-secondary leading-relaxed border-t border-dark/5 pt-8">{entity.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. GLOBAL REACH */}
                <section className="py-16 md:py-24 bg-[#f8f9fa]">
                    <div className="container-wide text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="max-w-4xl mx-auto mb-24"
                        >
                            <h2 className="text-5xl md:text-8xl font-black text-dark tracking-tighter mb-12">Global <br className="md:hidden" /><span className="text-dark/20 text-4xl md:text-7xl italic">Headquarters.</span></h2>
                            <p className="text-xl text-dark/40 font-secondary italic">Our physical presence operating at high-velocity across the continental registry.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="p-12 md:p-20 bg-white shadow-2xl rounded-[60px] relative overflow-hidden group border border-dark/5"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <span className="block text-xs font-black uppercase tracking-[0.8em] text-gold mb-10">Institutional NCR</span>
                                <h3 className="text-3xl md:text-5xl font-black text-dark mb-6">Gurugram</h3>
                                <p className="text-lg text-dark/60 font-secondary leading-relaxed">
                                    7th Floor, Spaze Plazo, <br />
                                    Golf Course Ext. Road Sector – 69.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="p-12 md:p-20 bg-white shadow-2xl rounded-[60px] relative overflow-hidden group border border-dark/5"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <span className="block text-xs font-black uppercase tracking-[0.8em] text-blue-600 mb-10">Royal Heritage Hub</span>
                                <h3 className="text-3xl md:text-5xl font-black text-dark mb-6">Jaipur</h3>
                                <p className="text-lg text-dark/60 font-secondary leading-relaxed">
                                    Vinayak Enclave, <br />
                                    Jagatpura.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

