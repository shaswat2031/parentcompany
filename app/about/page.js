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
                <section className="py-16 md:py-24 px-6 md:px-24 relative overflow-hidden">
                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.6em] mb-8 block">About the Portal</span>
                            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] text-dark tracking-tighter mb-12">
                                The Sovereign <br />
                                <span className="text-dark/20 italic">Digital</span> Legacy.
                            </h1>
                            <p className="text-xl md:text-3xl text-dark/60 font-secondary leading-relaxed max-w-4xl border-l-[3px] border-blue-600 pl-10 md:pl-20 py-4 italic">
                                RiseMate Venture catalysts economic development by connecting global institutional expertise with high-growth entities across fashion, tech, energy, and digital markets.
                            </p>
                        </motion.div>
                    </div>

                    {/* Decorative Background Text */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[30vw] font-black text-dark/[0.02] select-none pointer-events-none uppercase leading-none">
                        Legacy
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
                                { name: "BWorth", sector: "Sustainable Fashion", desc: "Circular luxury & technical upcycling." },
                                { name: "Vega Vrudhi", sector: "Execution Architecture", desc: "Managed sales & national growth." },
                                { name: "RYM Grenergy", sector: "Deep-Tech", desc: "Clean energy & AI infrastructure." },
                                { name: "Synchronous", sector: "Digital Marketing", desc: "High-velocity brand identities." }
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
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600/50 block mb-6">Entity 0{idx + 1}</span>
                                    <h4 className="text-3xl font-black text-dark mb-4">{entity.name}</h4>
                                    <p className="text-xs font-bold text-gold uppercase tracking-widest mb-8">{entity.sector}</p>
                                    <p className="text-sm text-dark/40 font-secondary leading-relaxed italic border-t border-dark/5 pt-8">{entity.desc}</p>
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

