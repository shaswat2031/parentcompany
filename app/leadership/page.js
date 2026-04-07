"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

// Custom Hook for Scroll Reveal


const ExecutiveMember = ({ id, name, role, vision, focus, philosophy, experience, bios, delay = 0 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay: delay / 1000 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start py-16 md:py-24 border-b border-dark/10 transition-all duration-1000"
    >
        <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative group">
                <div className="aspect-[3/4] bg-dark/5 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border border-dark/5 shadow-2xl flex items-center justify-center p-12">
                    <span className="material-symbols-outlined text-[10rem] text-dark/5 group-hover:text-gold/10 transition-colors duration-700">person</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 border-r-2 border-b-2 border-gold/40 pointer-events-none" />
                <div className="absolute -top-4 -left-4 font-industrial text-[10px] tracking-[0.8em] font-bold text-gold/30 uppercase">Sovereign Intel {id}</div>
            </div>
            <div className="mt-16">
                <h3 className="font-headline italic text-5xl md:text-7xl text-dark leading-tight mb-4">{name}</h3>
                <p className="font-industrial text-[11px] tracking-[0.4em] text-gold font-bold uppercase mb-8">{role}</p>
                <div className="flex gap-4 items-center">
                    <span className="px-3 py-1 border border-dark/10 text-[9px] font-industrial tracking-[0.2em] font-bold uppercase opacity-40">Active Status</span>
                    <span className="px-3 py-1 border border-dark/10 text-[9px] font-industrial tracking-[0.2em] font-bold uppercase opacity-40">{experience} Years Exp</span>
                </div>
            </div>
        </div>
        <div className="lg:col-span-7 pt-8">
            <div className="space-y-16">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                    className="border-l-2 border-gold/30 pl-12"
                >
                    <h5 className="font-industrial text-[11px] text-gold uppercase tracking-[0.6em] font-bold mb-6 italic underline decoration-gold/10 underline-offset-8">The Core Vision</h5>
                    <p className="font-body text-dark text-xl md:text-3xl leading-relaxed italic opacity-90">{vision}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/40 p-10 border border-dark/5 hover:border-gold/10 transition-all group"
                    >
                        <h6 className="font-industrial text-[10px] text-gold uppercase tracking-[0.4em] font-bold mb-6">Strategic Focus</h6>
                        <p className="font-body text-dark/70 text-sm leading-relaxed uppercase tracking-widest font-bold">{focus}</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/40 p-10 border border-dark/5 hover:border-gold/10 transition-all group"
                    >
                        <h6 className="font-industrial text-[10px] text-gold uppercase tracking-[0.4em] font-bold mb-6">Industrial Narrative</h6>
                        <p className="font-body text-dark/60 text-xs leading-relaxed italic">{bios}</p>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5 }}
                    className="bg-dark p-12 text-white relative overflow-hidden group"
                >
                    <p className="font-headline italic text-3xl md:text-5xl opacity-40 text-gold/40 group-hover:opacity-100 transition-opacity duration-1000 leading-[1.1] mb-8 select-none">"{philosophy}"</p>
                    <div className="flex justify-between items-end border-t border-white/5 pt-8">
                        <span className="font-industrial text-[9px] tracking-[0.5em] text-white/20 font-bold uppercase">Executive Intelligence Kernel</span>
                        <span className="font-industrial text-[9px] tracking-[0.5em] text-gold/40 font-bold uppercase cursor-pointer hover:text-gold transition-colors">IND-REQ-0{id}</span>
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.div>
);

export default function Leadership() {
    return (
        <div className="bg-[#fcfcfc] min-h-screen selection:bg-gold selection:text-dark">
            <Navbar />

            <main className="pt-32">
                {/* 1. HERO */}
                <section className="py-16 md:py-24 px-6 md:px-24 bg-white relative overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-screen-2xl mx-auto"
                    >
                        <span className="font-industrial text-gold tracking-[0.8em] text-[10px] uppercase font-bold mb-8 block underline decoration-gold/20 underline-offset-8">Executive Registry</span>
                        <h1 className="font-headline italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] text-dark mb-12 tracking-tighter">The Architects <br className="hidden md:block" /> of The Future.</h1>
                        <p className="font-body text-xl md:text-3xl text-dark leading-relaxed italic border-l-2 border-gold/40 pl-12 max-w-5xl opacity-80">
                            Stewardship defined by the fusion of industrial intelligence and sovereign legacy. Leading the next generation of global impact through precision execution.
                        </p>
                    </motion.div>
                    {/* Background Texture */}
                    <div className="absolute top-0 right-0 font-industrial text-[30vw] text-dark/[0.01] leading-none select-none pointer-events-none translate-x-1/4 -translate-y-1/4 uppercase">Regal</div>
                </section>

                {/* 2. THE MAIN ARCHITECTS */}
                <section className="py-16 md:py-24 px-6 md:px-24 bg-[#fcfcfc] border-t border-dark/5">
                    <div className="max-w-screen-2xl mx-auto flex flex-col">
                        <ExecutiveMember
                            id="01"
                            name="Saurabh Jain"
                            role="Founder & CEO · Vega Vrudhi"
                            experience="15+"
                            vision="Scaling on-ground execution through AI/ML-driven precision across the continental registry."
                            focus="Managed sales, specialized staffing, and national growth engines operating at high-velocity."
                            bios="Architecting the digital-to-physical execution layer for elite brands. Specializing in pan-India market dominance and neural lead fulfillment architecture."
                            philosophy="Numbers don't lie, but passion drives them."
                            delay={100}
                        />
                        <ExecutiveMember
                            id="02"
                            name="Dheeraj Anand"
                            role="Founder & CEO · BWorth"
                            experience="18+"
                            vision="Redefining the luxury industry through sovereign circularity and technical upcycling dominance."
                            focus="Business engineering, strategic asset management, and global scale-up architecture."
                            bios="Transforming the consumption narrative through 18 years of business building. Engineering sustainable luxury ecosystems that preserve cultural and industrial capital."
                            philosophy="BWorth is more than just a company; it is a movement towards conscious consumerism."
                            delay={200}
                        />
                        <ExecutiveMember
                            id="03"
                            name="Yograj Rundhanker"
                            role="Founder & CEO · RYM Grenergy"
                            experience="10+"
                            vision="Enabling the future of energy by developing the world's greenest battery cell and intelligent green-tech infrastructure."
                            focus="AI/ML, IoT, and deep-tech engineering for sustainable energy ecosystems."
                            bios="Specializing in the intersection of artificial intelligence and hardware innovation. Leading a specialized team to architect universal document intelligence and clean energy management systems."
                            philosophy="Specializing in AI/ML and IoT innovations for sustainability."
                            delay={300}
                        />
                    </div>
                </section>

                {/* 3. CTA */}
                <section className="py-16 md:py-24 px-6 md:px-24 bg-white text-center border-t border-dark/5">
                    <div className="max-w-4xl mx-auto">
                        <span className="font-industrial text-gold tracking-[1em] text-[11px] uppercase font-bold mb-10 block italic opacity-60">Initialize Strategic Dialogue</span>
                        <h2 className="text-4xl md:text-7xl leading-tight text-dark mb-16 italic tracking-tighter">Consult With The <br /> Architects.</h2>
                        <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-5 bg-dark text-white font-secondary text-[11px] tracking-[0.5em] font-bold uppercase transition-all hover:bg-gold hover:text-dark shadow-2xl hover:-translate-y-1 group">
                            Become A Partner
                            <span className="material-symbols-outlined text-sm transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">open_in_new</span>
                        </Link>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
