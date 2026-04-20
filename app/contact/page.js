"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

const ContactOrbit = () => (
    <div className="relative w-full aspect-square max-w-[550px] mx-auto flex justify-center items-center group">
        
        {/* Core Glow */}
        <div className="absolute w-[60%] h-[60%] bg-blue-500/10 blur-[100px] rounded-full animate-pulse transition-all duration-1000 group-hover:bg-blue-600/20" />

        {/* Elaborate SVG Orbits */}
        <svg viewBox="0 0 600 600" className="absolute w-full h-full overflow-visible pointer-events-none drop-shadow-xl" strokeLinejoin="round" strokeLinecap="round">
            <defs>
                <linearGradient id="primaryOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#002366" stopOpacity="0.0"/>
                    <stop offset="50%" stopColor="#002366" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#002366" stopOpacity="0.0"/>
                </linearGradient>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Static Inner Rings */}
            <circle cx="300" cy="300" r="140" fill="none" stroke="#002366" strokeOpacity="0.05" strokeWidth="1" />
            <circle cx="300" cy="300" r="90" fill="none" stroke="#002366" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 8" />
            
            {/* Animated Outer Orbit 1 */}
            <g className="animate-[spin_40s_linear_infinite] origin-center">
                <circle cx="300" cy="300" r="240" fill="none" stroke="url(#primaryOrbit)" strokeWidth="1" />
                <circle cx="300" cy="60" r="3" fill="#002366" />
                <line x1="300" y1="50" x2="300" y2="70" stroke="#002366" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="290" y1="60" x2="310" y2="60" stroke="#002366" strokeWidth="1" strokeOpacity="0.5" />
            </g>

            {/* Animated Middle Orbit 2 */}
            <g className="animate-[spin_25s_linear_infinite_reverse] origin-center">
                <circle cx="300" cy="300" r="190" fill="none" stroke="#002366" strokeWidth="1.5" strokeOpacity="0.1" strokeDasharray="15 30" />
                <circle cx="490" cy="300" r="5" fill="#3B82F6" className="animate-pulse" />
                <circle cx="490" cy="300" r="20" fill="url(#nodeGlow)" opacity="0.4" />
            </g>

            {/* Random tech lines */}
            <path d="M 300 160 L 300 120" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
            <path d="M 160 300 L 120 300" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
            <path d="M 440 300 L 480 300" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
            <path d="M 300 440 L 300 480" stroke="#002366" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
        </svg>

        {/* Central Core Element */}
        <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white shadow-[0_20px_50px_-10px_rgba(0,35,102,0.1)] rounded-full flex flex-col items-center justify-center p-6 group-hover:scale-105 transition-all duration-700 z-10">
                <div className="absolute inset-2 border-[1px] border-dashed border-[#002366]/10 rounded-full animate-[spin_60s_linear_infinite]"></div>
                
                <div className="w-20 h-20 rounded-[1.2rem] bg-gradient-to-br from-[#002366] to-blue-800 text-white flex items-center justify-center mb-4 shadow-xl group-hover:-translate-y-1 transition-transform duration-500">
                    <span className="material-symbols-outlined text-4xl font-light">language</span>
                </div>
                
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#002366]/40 mb-1 mt-2">Global</span>
                <span className="text-xl font-black text-[#002366] tracking-tight">Nexus</span>
                
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full border border-dark/5 shadow-sm flex items-center gap-2 text-xs font-bold text-dark whitespace-nowrap">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Sync
                </div>
            </div>
        </div>

        {/* Floating Modules */}
        <div className="absolute top-[15%] left-[8%] z-20 hover:scale-110 transition-transform cursor-pointer">
            <div className="w-16 h-16 bg-white border border-[#002366]/10 shadow-[0_15px_35px_rgba(0,35,102,0.08)] rounded-2xl flex flex-col items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined text-blue-600 mb-1">call</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-dark/40">Voice</span>
            </div>
        </div>

        <div className="absolute bottom-[20%] right-[5%] z-20 hover:scale-110 transition-transform cursor-pointer">
            <div className="w-16 h-16 bg-white border border-[#002366]/10 shadow-[0_15px_35px_rgba(0,35,102,0.08)] rounded-2xl flex flex-col items-center justify-center backdrop-blur-md">
                <span className="material-symbols-outlined text-[#002366] mb-1">support_agent</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-dark/40">Desk</span>
            </div>
        </div>

        <div className="absolute top-[30%] right-[10%] w-10 h-10 bg-[#002366] rounded-xl flex items-center justify-center shadow-xl animate-bounce z-20" style={{ animationDuration: '4s' }}>
             <span className="material-symbols-outlined text-white text-sm">mail</span>
        </div>

        <div className="absolute bottom-[30%] left-[10%] w-12 h-12 bg-white border border-dark/5 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-20">
             <span className="material-symbols-outlined text-emerald-500 text-lg">public</span>
        </div>
    </div>
);

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const ContactCard = ({ title, email, phone, logo, refLabel, accent }) => (
    <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        className="relative p-10 bg-white border border-dark/5 rounded-[40px] hover:border-[#002366]/20 hover:shadow-[0_45px_90px_-20px_rgba(0,35,102,0.08)] transition-all duration-700 group overflow-hidden"
    >
        {/* Subtle Entity Accent Glow */}
        <div className={`absolute -top-10 -right-10 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${accent}`} />

        <div className="relative z-10">
            <div className="flex items-start mb-10">
                <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center group-hover:-translate-y-1 transition-all duration-500 overflow-hidden border border-dark/5">
                    {logo && <Image src={logo} alt={title} width={40} height={40} className="object-contain" unoptimized={true} />}
                </div>
            </div>
            <div className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.45em] text-dark/30 mb-2">{refLabel}</p>
                <h3 className={`text-2xl font-black ${accent.replace('bg-', 'text-')} tracking-tighter`}>{title}</h3>
            </div>
            <div className="space-y-3">
                <a href={`mailto:${email}`} className="block text-sm font-bold text-dark/70 hover:text-dark transition-colors">{email}</a>
                {phone && (
                    <p className={`text-[10px] font-black uppercase tracking-widest ${accent.replace('bg-', 'text-')} flex items-center gap-2`}>
                        <span className={`w-1 h-1 rounded-full ${accent} animate-pulse`}></span>
                        {phone}
                    </p>
                )}
            </div>
        </div>
    </motion.div>
);

export default function Contact() {
    return (
        <div className="bg-[#FAF9F6] min-h-screen selection:bg-[#002366] selection:text-white overflow-x-hidden">
            <Navbar />

            <main className="pt-24">
                {/* HERO */}
                <section className="relative py-24 md:py-40 px-6 md:px-24 overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-12 opacity-[0.03] pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-dark h-full"></div>
                        ))}
                    </div>

                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left: Text Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="w-12 h-[1px] bg-[#002366]/30"></span>
                                    <span className="text-xs font-black uppercase tracking-[0.6em] text-[#002366]">Initialize Connection</span>
                                </div>

                                <h1 className="text-6xl md:text-[8rem] font-black leading-[0.8] text-dark tracking-tighter mb-16">
                                    Nexus <br />
                                    <span className="text-[#002366] italic font-serif font-normal">Collective.</span>
                                </h1>

                                <div className="max-w-xl border-l-[3px] border-[#002366] pl-12 py-4">
                                    <p className="text-xl md:text-2xl text-dark/40 font-secondary leading-tight italic">
                                        Bridge the gap between institutional expertise and your sovereign growth. Our global operations are active across all regional hubs.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right: Orbit Animation */}
                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="relative hidden lg:flex items-center justify-center"
                            >
                                {/* Decorative glow */}
                                <div className="absolute inset-0 bg-[#002366]/5 blur-[100px] rounded-full pointer-events-none" />
                                <ContactOrbit />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ENTITY MATRIX */}
                <section className="py-24 px-6 md:px-24 bg-white relative">
                    <div className="max-w-screen-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <ContactCard
                                title="BWorth Support"
                                email="info@bworth.co.in"
                                phone="+91 8826668050"
                                logo="/BWORTH.jpg"
                                refLabel="Industrial Synthesis"
                                accent="bg-cyan-600"
                            />
                            <ContactCard
                                title="Vega Vrudhi"
                                email="saurabh@vegavruddhi.com"
                                phone="+91 91166 16636"
                                logo="/VEGA.png"
                                refLabel="Execution Framework"
                                accent="bg-green-600"
                            />
                            <ContactCard
                                title="RYM Grenergy"
                                email="contact@rym-grenergy.com"
                                phone="+91 82000 55645"
                                logo="https://rymgrenergy.com/images/logo.png"
                                refLabel="Energy Sovereignty"
                                accent="bg-gold"
                            />
                            <ContactCard
                                title="Synchronous"
                                email="biz@synchronousbuilddigital.com"
                                phone="Global Access"
                                logo="/sync.jpg"
                                refLabel="Digital Architecture"
                                accent="bg-orange-500"
                            />
                        </div>
                    </div>
                </section>

                {/* HUB INFRASTRUCTURE */}
                <section className="py-32 bg-[#f8faff] px-6 md:px-24 relative overflow-hidden">
                    <div className="max-w-screen-2xl mx-auto relative z-10">
                        <motion.div
                            variants={fadeInUp}
                            initial="initial"
                            whileInView="whileInView"
                            className="flex flex-col md:flex-row justify-between items-end mb-32"
                        >
                            <div className="max-w-xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#002366] mb-6 block">Physical Infrastructure</span>
                                <h2 className="text-4xl md:text-8xl font-black text-dark tracking-tighter leading-none">Global <br /> Hubs.</h2>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 mt-12 md:mt-0 italic">Operational Ref: HQ_SYNC_2026</p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {[
                                {
                                    type: "Global Headquarters",
                                    label: "Institutional NCR",
                                    city: "Gurugram",
                                    address: "7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69.",
                                    ref: "HQ_SYNC_2026",
                                    code: "NCR"
                                },
                                {
                                    type: "Main Hub Operations",
                                    label: "Royal Heritage Hub",
                                    city: "Jaipur",
                                    address: "Vinayak Enclave, Jagatpura.",
                                    ref: "Satellite Office Strategy Hub",
                                    code: "RJ"
                                }
                            ].map((hub, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="whileInView"
                                    className="group relative p-16 bg-white rounded-[64px] border border-[#002366]/5 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.02)]"
                                >
                                    <div className="absolute top-0 right-0 p-16 text-[150px] font-black text-[#002366]/[0.02] leading-none pointer-events-none group-hover:text-[#002366]/[0.05] transition-all duration-1000">
                                        {hub.code}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-10">
                                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#002366] bg-[#002366]/5 px-5 py-2.5 rounded-full">{hub.type}</span>
                                        </div>
                                        <h4 className="text-4xl font-black text-dark mb-2 tracking-tighter">{hub.label}</h4>
                                        <p className="text-2xl font-black text-[#002366] mb-10">{hub.city}</p>
                                        <div className="h-[1px] w-full bg-dark/5 mb-10" />
                                        <p className="text-2xl text-dark/40 font-secondary leading-tight max-w-sm mb-16">
                                            {hub.address}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-[#002366]"></div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/20 uppercase tracking-[0.4em]">
                                                {hub.ref}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* MANDATE PORTAL */}
                <section className="py-40 bg-[#001233] text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

                    <div className="container-wide relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                            <motion.div
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="whileInView"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[1em] text-[#002366] bg-white px-5 py-2.5 rounded-full mb-12 inline-block">Secure Protocol</span>
                                <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.9]">Ready to <br /><span className="text-white/40 italic font-serif font-normal">Initialize?</span></h2>
                                <p className="text-xl md:text-2xl text-white/40 font-secondary leading-tight max-w-lg mb-16 italic">
                                    Submit your institutional mandate. Our board reviews all strategic partnership profiles within 48 operational cycles.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="whileInView"
                                className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-12 md:p-20 rounded-[80px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.5)]"
                            >
                                <form className="space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 block ml-2">Full Identity</label>
                                            <input type="text" className="w-full bg-white/[0.03] border-b border-white/10 rounded-none px-2 py-5 text-white focus:border-white outline-none transition-all placeholder:text-white/10" placeholder="LEAD NAME" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 block ml-2">Corporate Email</label>
                                            <input type="email" className="w-full bg-white/[0.03] border-b border-white/10 rounded-none px-2 py-5 text-white focus:border-white outline-none transition-all placeholder:text-white/10" placeholder="EXEC@ENTITY.COM" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 block ml-2">Mandate Specification</label>
                                        <textarea rows="4" className="w-full bg-white/[0.03] border-b border-white/10 rounded-none px-2 py-5 text-white focus:border-white outline-none transition-all placeholder:text-white/10" placeholder="Strategic objectives and vertical focus..."></textarea>
                                    </div>

                                    <div className="pt-8">
                                        <button className="group relative w-full h-24 overflow-hidden rounded-full transition-all duration-700">
                                            <div className="absolute inset-0 bg-white transition-transform duration-700 group-hover:scale-95"></div>
                                            <div className="absolute inset-0 bg-[#002366] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
                                            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.8em] text-dark group-hover:text-white transition-colors duration-700">
                                                Transmit Mandate
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
