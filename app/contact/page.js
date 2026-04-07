"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";



const ContactForm = ({ type }) => {
    const isInvestor = type === "investor";
    return (
        <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <label className="text-[10px] text-gold uppercase tracking-[0.4em] font-black block">Full Name / Entity</label>
                    <input
                        type="text"
                        className="w-full bg-white border-b border-dark/10 py-4 text-dark font-secondary font-bold focus:border-gold outline-none transition-all duration-700 uppercase tracking-widest text-sm placeholder:text-dark/10"
                        placeholder="IDENTIFIER"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] text-gold uppercase tracking-[0.4em] font-black block">Email Protocol</label>
                    <input
                        type="email"
                        className="w-full bg-white border-b border-dark/10 py-4 text-dark font-secondary font-bold focus:border-gold outline-none transition-all duration-700 text-sm placeholder:text-dark/10"
                        placeholder="PROTOCOL@SOCIETY.COM"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] text-gold uppercase tracking-[0.4em] font-black block">
                    {isInvestor ? "Investment Class / Capital Pool" : "Innovation Summary / Venture Vector"}
                </label>
                <input
                    type="text"
                    className="w-full bg-white border-b border-dark/10 py-4 text-dark font-secondary font-bold focus:border-gold outline-none transition-all duration-700 uppercase tracking-widest text-sm placeholder:text-dark/10"
                    placeholder={isInvestor ? "INSTITUTIONAL / HNW" : "AI / SUSTAINABILITY / LOGISTICS"}
                />
            </div>

            <div className="space-y-4">
                <label className="text-[10px] text-gold uppercase tracking-[0.4em] font-black block">Manifesto / Strategy</label>
                <textarea
                    rows="4"
                    className="w-full bg-white border-l-2 border-dark/10 pl-10 py-6 text-dark font-secondary font-bold focus:border-gold outline-none transition-all duration-700 uppercase tracking-widest text-sm placeholder:text-dark/10"
                    placeholder="DESCRIBE THE IMPACT..."
                />
            </div>

            <button type="submit" className="w-full bg-dark text-white py-8 font-black text-xs tracking-[0.6em] uppercase transition-all duration-700 hover:bg-gold hover:text-dark shadow-2xl">
                Initialize Induction Sequence
            </button>
            <p className="text-[9px] text-dark/30 tracking-[0.4em] uppercase text-center mt-8 font-black">Secure 256-bit industrial encryption active.</p>
        </form>
    );
}

export default function Contact() {
    const [activePath, setActivePath] = useState("investor");

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
                            <span className="text-gold font-black tracking-[0.6em] text-[10px] uppercase mb-8 block">Strategic Initiation</span>
                            <h1 className="text-6xl md:text-[9rem] leading-[0.8] text-dark mb-12 tracking-tighter font-black">
                                Enter The <br />
                                <span className="text-dark/20 italic text-5xl md:text-[7rem]">Global Registry.</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-dark/60 font-secondary border-l-4 border-gold pl-12 max-w-4xl italic">
                                Synchronizing capital and innovation into a singular operative nexus. Choose your path to institutional integration.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="px-6 md:px-24 pb-24">
                    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32">
                        {/* SELECTOR */}
                        <div className="lg:col-span-5 space-y-12">
                            <div
                                onClick={() => setActivePath("investor")}
                                className={`p-16 border-2 transition-all duration-700 cursor-pointer group relative overflow-hidden rounded-[40px] ${activePath === "investor" ? 'border-gold bg-[#f8f9fa] shadow-2xl' : 'border-dark/5 hover:border-gold/30 bg-white'}`}
                            >
                                <span className={`text-[10px] uppercase tracking-[0.4em] font-black mb-6 block ${activePath === "investor" ? 'text-gold' : 'text-dark/20'}`}>Pathway A</span>
                                <h3 className={`text-4xl md:text-5xl font-black tracking-tighter mb-8 ${activePath === "investor" ? 'text-dark' : 'text-dark/30 group-hover:text-dark/50'}`}>Institutional <br /> Investors</h3>
                                <p className={`text-xs font-bold uppercase tracking-widest leading-relaxed italic ${activePath === "investor" ? 'text-dark/50' : 'text-dark/20'}`}>
                                    LPs, Family Offices, and Private Equity partners looking to synchronize capital with growth.
                                </p>
                            </div>

                            <div
                                onClick={() => setActivePath("idea")}
                                className={`p-16 border-2 transition-all duration-700 cursor-pointer group relative overflow-hidden rounded-[40px] ${activePath === "idea" ? 'border-gold bg-[#f8f9fa] shadow-2xl' : 'border-dark/5 hover:border-gold/30 bg-white'}`}
                            >
                                <span className={`text-[10px] uppercase tracking-[0.4em] font-black mb-6 block ${activePath === "idea" ? 'text-gold' : 'text-dark/20'}`}>Pathway B</span>
                                <h3 className={`text-4xl md:text-5xl font-black tracking-tighter mb-8 ${activePath === "idea" ? 'text-dark' : 'text-dark/30 group-hover:text-dark/50'}`}>Engines of <br /> Innovation</h3>
                                <p className={`text-xs font-bold uppercase tracking-widest leading-relaxed italic ${activePath === "idea" ? 'text-dark/50' : 'text-dark/20'}`}>
                                    Founders and Visionaries with scalable ideas in circular luxury or high-impact operations.
                                </p>
                            </div>
                        </div>

                        {/* FORM */}
                        <div className="lg:col-span-7 bg-[#f8f9fa] p-12 md:p-24 rounded-[60px] border border-dark/5 shadow-2xl">
                            <div className="mb-20">
                                <h4 className="text-gold text-[12px] tracking-[1em] uppercase font-black mb-8 italic">Process Initiation</h4>
                                <div className="w-12 h-1 bg-gold/10 mb-10" />
                                <p className="text-sm text-dark/40 font-secondary italic leading-relaxed">
                                    Please provide the necessary identifiers for induction into the Sovereign Registry.
                                </p>
                            </div>

                            <ContactForm type={activePath} />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
