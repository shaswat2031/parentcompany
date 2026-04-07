"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";

// --- Animation Variants ---
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.4
        }
    }
};

const letterAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

const sectionAnimation = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    viewport: { once: false, amount: 0.2, margin: "-10%" },
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
};

const imageReveal = {
    initial: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0, scale: 1.2 },
    animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, scale: 1 },
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
};

// --- Components ---

const SectionLabel = ({ children }) => (
    <motion.div
        variants={fadeInUp}
        className="flex items-center gap-3 mb-8"
    >
        <div className="relative">
            <span className="absolute inset-0 bg-blue-600/20 blur-md rounded-full animate-pulse"></span>
            <span className="relative w-2 h-2 bg-blue-600 rounded-full block"></span>
        </div>
        <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-600/60 leading-none">{children}</span>
    </motion.div>
);

const RevealText = ({ text, className = "" }) => {
    const words = text.split(" ");
    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-2 -mb-2">
                    <motion.span
                        variants={letterAnimation}
                        className="inline-block whitespace-nowrap"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};

const PortfolioItem = ({ item, index }) => {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col bg-[#fdfdfd] rounded-[24px] md:rounded-[32px] border border-dark/5 p-5 md:p-6 hover:border-blue-600/20 hover:shadow-[0_40px_80px_-20px_rgba(0,18,51,0.06)] transition-all duration-1000 overflow-hidden"
        >
            {/* Registry Numbering */}
            <div className="absolute -top-4 -right-4 pointer-events-none opacity-[0.02] transition-all duration-1000 group-hover:opacity-[0.05] group-hover:scale-105 group-hover:text-blue-600">
                <span className="text-[120px] font-black leading-none">0{index + 1}</span>
            </div>

            {/* Header Label and Entity ID */}
            <div className="flex items-center justify-between gap-4 mb-5 relative z-10">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[7px] font-black uppercase tracking-[0.2em] rounded-md">{item.tag}</span>
                    <div className="h-[1px] w-8 bg-dark/5"></div>
                </div>
                <p className="text-[7px] font-black uppercase tracking-[0.4em] text-dark/20 italic">Entity 0{index + 1}</p>
            </div>

            {/* Immersive Image with Logo Overlay */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-[16px] mb-5 shadow-lg transition-all duration-1000">
                <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                {/* Logo Integration */}
                {item.logo ? (
                    <div className={`absolute bottom-4 right-4 w-12 h-12 ${item.logoBg || 'bg-white'} flex items-center justify-center rounded-lg shadow-xl overflow-hidden border border-dark/5 p-2 transition-all duration-700 group-hover:scale-110`}>
                        <img src={item.logo} alt={item.title} className="w-8 h-8 object-contain" />
                    </div>
                ) : (
                    <div className="absolute bottom-4 right-4 w-12 h-12 bg-white flex items-center justify-center rounded-lg shadow-xl overflow-hidden border border-dark/5">
                        <span className="text-[8px] font-black text-dark/20 tracking-tighter italic">NEXUS</span>
                    </div>
                )}
            </div>

            {/* Registry Content */}
            <div className="flex flex-col relative z-10 flex-grow">
                <p className="text-[7px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2 opacity-60 italic">{item.tagline}</p>
                <h3 className="text-xl md:text-2xl font-black text-dark mb-4 tracking-tighter leading-none hover:text-blue-600 transition-colors duration-500 uppercase">{item.title}</h3>

                <p className="text-xs md:text-sm text-dark/60 font-secondary leading-normal mb-8">
                    {item.desc}
                </p>

                {/* High-Density Pillars */}
                <div className="mb-8 p-4 bg-dark/[0.02] rounded-2xl border border-dark/5">
                    <p className="text-[7px] font-black uppercase tracking-[0.3em] text-dark/30 mb-3">Core Pillars</p>
                    <div className="flex flex-wrap gap-2">
                        {item.pillars?.map((pillar, i) => (
                            <span key={i} className="px-2 py-1 bg-white border border-dark/5 rounded text-[8px] font-black text-dark/60 uppercase tracking-wider">{pillar}</span>
                        ))}
                    </div>
                </div>

                {/* Impact Metrics / Expertise */}
                {(item.metrics || item.expertise) && (
                    <div className="mb-10 flex gap-6">
                        {item.metrics && (
                            <div className="flex-1">
                                <p className="text-[7px] font-black uppercase tracking-[0.3em] text-dark/30 mb-2 text-blue-600/60">Impact</p>
                                <ul className="space-y-1">
                                    {item.metrics.map((m, i) => (
                                        <li key={i} className="text-[9px] font-black text-dark truncate uppercase tracking-tight">{m}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {item.expertise && (
                            <div className="flex-1">
                                <p className="text-[7px] font-black uppercase tracking-[0.3em] text-dark/30 mb-2">Expertise</p>
                                <div className="flex flex-wrap gap-1">
                                    {item.expertise.map((e, i) => (
                                        <span key={i} className="text-[9px] font-black text-dark/40 uppercase">{e} {i < item.expertise.length - 1 ? '·' : ''}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <Link href="/portfolio" className="mt-auto inline-flex items-center gap-3 group/link">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-dark border-b-[1px] border-blue-600/20 py-1 group-hover/link:border-blue-600 transition-all duration-500">Explore Website</span>
                    <div className="w-7 h-7 rounded-full border border-dark/10 flex items-center justify-center group-hover/link:bg-dark group-hover/link:text-white transition-all duration-700">
                        <span className="material-symbols-outlined text-[8px] group-hover/link:rotate-45 transition-transform">north_east</span>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

const FounderCard = ({ founder }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            whileHover={{ y: -15, scale: 1.02 }}
            className="group relative p-8 md:p-12 rounded-[32px] bg-white border border-dark/5 hover:border-blue-600/30 hover:shadow-[0_40px_80px_-20px_rgba(0,18,51,0.15)] transition-all duration-1000 overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full -translate-y-40 translate-x-40 blur-[100px] transition-all duration-1000 ${isInView ? 'scale-150' : 'scale-50 opacity-0'}`} />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex flex-col gap-10 h-full">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600/60 mb-2">Executive Lead</p>
                            <motion.h4
                                className="text-3xl md:text-4xl font-black text-dark mb-1 transition-colors group-hover:text-blue-600"
                            >
                                {founder.name}
                            </motion.h4>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-dark/40">{founder.role}</p>
                        </div>
                        {founder.logo && (
                            <div className="w-12 h-12 bg-white rounded-lg p-2 border border-dark/5 shadow-sm overflow-hidden flex items-center justify-center">
                                <Image src={founder.logo} alt={founder.name} width={32} height={32} className="object-contain" unoptimized={true} />
                            </div>
                        )}
                        {!founder.logo && (
                            <div className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                            </div>
                        )}
                    </div>

                    <p className="text-[14px] md:text-[15px] font-medium text-dark/70 font-secondary leading-relaxed border-l-2 border-blue-600/20 pl-8 group-hover:border-blue-600 transition-all duration-1000 ease-in-out py-2 italic">
                        "{founder.philosophy || founder.vision}"
                    </p>

                    <div className="pt-10 mt-auto border-t border-dark/5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[1px] w-8 bg-blue-600/20" />
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-dark/20 text-nowrap">Institutional Mandate</p>
                            <div className="h-[1px] flex-grow bg-dark/5" />
                        </div>
                        <p className="text-xs font-black text-dark/80 uppercase tracking-[0.2em] leading-relaxed group-hover:text-blue-600 transition-colors duration-700">
                            {founder.focus}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const portfolioItems = [
    {
        title: "BWorth",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
        desc: "Revolutionizing the fashion industry through a unique circular luxury ecosystem. Buy, sell, and recycle fashion while earning rewards through our unique buyback program that preserves the planet's beauty.",
        tag: "Circular Luxury",
        tagline: "Sustainable Fashion Innovation Leader",
        logo: "/BWORTH.jpg",
        pillars: ["BWorth Coins (1:1 Value)", "Landfill Elimination", "Live CO₂ Monitoring"],
        metrics: ["10,000+ Items Recycled", "25,000+ total Items Saved"]
    },
    {
        title: "Vega Vrudhi",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2670&auto=format&fit=crop",
        desc: "Precision execution architecture bridging the gap between digital leads and on-ground reality. We deploy trained field teams to accelerate market presence for national growth engines.",
        tag: "Managed Sales",
        tagline: "Precision Execution & Growth Architecture",
        logo: "/VEGA.png",
        pillars: ["Digital Lead Fulfillment", "Activation Programs", "Merchant Onboarding"],
        expertise: ["FinTech", "FMCG", "E-Commerce", "GovTech"]
    },
    {
        title: "RYM Grenergy",
        img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2670&auto=format&fit=crop",
        desc: "Enabling a carbon-neutral future by developing the world’s greenest battery cell and intelligent green-tech infrastructure through AI, IoT, and Smart Automation.",
        tag: "Clean Energy",
        tagline: "Intelligent Systems & Deep-Tech Engineering",
        logo: "https://rymgrenergy.com/images/logo.png",
        pillars: ["ULTRON Energy Platform", "INTELLEXA AI", "Weighbridge AI", "REEWS Earthquake Warning"]
    },
    {
        title: "Synchronous",
        img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop",
        desc: "Architecting high-velocity digital ecosystems for high-growth elite brands. We build vertically integrated brand identities and compound ROI via algorithmic process automation.",
        tag: "Autonomous AI",
        tagline: "High-Performance Digital Marketing Group",
        logo: "/sync.jpg",
        logoBg: "bg-white",
        pillars: ["Brand Identity Architecture", "Autonomous AI Agents", "Data-Backed Growth", "Predictive Modeling"]
    },
];

const founders = [
    {
        name: "Saurabh Jain",
        role: "Founder & CEO · Vega Vrudhi",
        vision: "Architecting high-performance field-force efficiency through algorithmic sales fulfillment for national growth engines.",
        focus: "Strategic Retail Expansion & End-to-End Lead conversion fulfillment across India's Tier 1 and 2 cities.",
        philosophy: "Building on-ground execution intelligence via precision managed sales infrastructure.",
        logo: "/VEGA.png"
    },
    {
        name: "Dheeraj Anand",
        role: "Founder & CEO · BWorth",
        vision: "Re-imagining luxury fashion as a circular asset, creating a global movement towards zero-landfill conscious consumerism.",
        focus: "Circular Luxury Fashion, Ethical Upcycling Ecosystems & Sustainable Global Value Chain Integration.",
        philosophy: "Redefining the value of waste through industrial-scale circular luxury fashion architecture.",
        logo: "/BWORTH.jpg"
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
            <Navbar />

            <main>
                {/* 1. HERO SECTION - CINEMATIC ENTRANCE */}
                <section className="relative h-screen flex items-center bg-[#fdfdfd] pt-24 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,#e0ebf577,transparent_50%)] pointer-events-none" />

                    <div className="max-w-[1700px] mx-auto px-6 md:px-14 w-full relative z-10 h-full flex flex-col justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                            {/* LEFT: IMAGE REVEAL & PARALLAX */}
                            <motion.div
                                variants={imageReveal}
                                initial="initial"
                                animate="animate"
                                className="lg:col-span-7 relative flex justify-center py-2"
                            >
                                <div className="relative w-full max-w-[850px] aspect-[4/5] max-h-[60vh] md:max-h-[75vh] rounded-[48px] md:rounded-[80px] overflow-hidden shadow-[0_60px_100px_-30px_rgba(0,18,51,0.2)] bg-dark group">
                                    <motion.div
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src="/hero-cityscape-v2.png"
                                            alt="RiseMate Institutional HQ Design"
                                            fill
                                            sizes="(max-width: 1200px) 100vw, 50vw"
                                            className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                                            priority
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />


                                </div>
                            </motion.div>

                            {/* RIGHT: TYPOGRAPHY PERFECTION */}
                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="lg:col-span-5 relative w-full py-2"
                            >
                                <motion.div variants={fadeInUp} className="mb-6">
                                    <div className="flex items-center gap-4 mb-6 overflow-hidden">
                                        <motion.div
                                            initial={{ x: -100 }}
                                            animate={{ x: 0 }}
                                            transition={{ duration: 1, delay: 1 }}
                                            className="h-[2px] w-12 bg-blue-600"
                                        />
                                        <span className="text-xs font-black uppercase tracking-[0.6em] text-blue-600/80">Sovereign Industrial Brand</span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-[110px] font-black text-dark mb-10 leading-[0.95] tracking-tighter">
                                        <RevealText text="Building our" /> <br />

                                        <RevealText text="Legacy." />
                                    </h1>

                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-sm md:text-base text-dark/40 font-medium leading-relaxed font-secondary max-w-lg mb-10"
                                    >
                                        We operate at the nexus of institutional stability and regional opportunity, bridging global capital with high-growth entities to secure your sovereign industrial future.
                                    </motion.p>

                                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center">
                                        <Link href="/contact" className="group relative inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-700 hover:scale-105 shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)]">
                                            <span className="relative z-10">Become A Partner</span>
                                            <div className="absolute inset-0 bg-dark translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                                        </Link>
                                        <Link href="/portfolio" className="group text-[9px] font-black uppercase tracking-[0.3em] text-dark flex items-center gap-2 hover:gap-4 transition-all duration-500">
                                            <span>Explore</span>
                                            <span className="material-symbols-outlined text-blue-600 text-sm">arrow_forward</span>
                                        </Link>
                                    </motion.div>
                                </motion.div>

                                {/* STAGGERED STATS */}
                                <motion.div
                                    variants={staggerContainer}
                                    className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-dark/5"
                                >
                                    {[
                                        { val: "04+", label: "Sovereign Entities", color: "bg-[#e0ebf5]", text: "text-blue-700" },
                                        { val: "10k+", label: "Growth Impact", color: "bg-[#fde8d8]", text: "text-dark" }
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            variants={fadeInUp}
                                            className={`p-6 ${stat.color} rounded-[24px] border border-white/50 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700`}
                                        >
                                            <h4 className={`text-2xl md:text-3xl font-black ${stat.text} mb-1 tracking-tighter`}>{stat.val}</h4>
                                            <p className="text-[9px] font-black text-dark/30 uppercase tracking-[0.2em] leading-none">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 2. ABOUT SECTION - SCROLL LIQUIDITY */}
                <section id="about" className="py-12 md:py-28 bg-white relative overflow-hidden">
                    {/* Background Orbs with subtle movement */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.6, 0.4],
                            x: [0, 50, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 blur-[150px] rounded-full pointer-events-none"
                    />

                    <div className="container-wide relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                            <motion.div
                                variants={sectionAnimation}
                                initial="initial"
                                whileInView="whileInView"
                                className="lg:col-span-12 mb-12"
                            >
                                <div className="flex flex-col md:flex-row gap-12 items-end">
                                    <div className="md:w-3/5">
                                        <SectionLabel>Strategic Nexus: NCR & Jaipur</SectionLabel>
                                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-dark leading-[1.1] tracking-tight">
                                            Architectural <br /><span className="text-blue-600">Precision</span> <br /> In Growth
                                        </h2>
                                    </div>
                                    <div className="md:w-2/5 space-y-8">
                                        <p className="text-2xl text-dark/60 font-secondary leading-tight italic border-l-4 border-blue-600/30 pl-10 py-4">
                                            Operating from our institutional hubs in <span className="text-dark font-black underline decoration-blue-500/40 underline-offset-8">Gurugram</span> and <span className="text-dark font-black underline decoration-blue-500/40 underline-offset-8">Jaipur</span>.
                                        </p>
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="bg-dark p-12 rounded-[48px] text-white shadow-2xl"
                                        >
                                            <p className="text-[11px] font-black uppercase tracking-[0.5em] mb-4 text-white/30">Vertical Synergy</p>
                                            <p className="text-lg font-medium leading-relaxed opacity-90 italic">
                                                "We bridge the gap between global institutional expertise and high-velocity regional execution through proprietary technology."
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
                                <motion.div
                                    variants={fadeInUp}
                                    initial="initial"
                                    whileInView="animate"
                                    className="lg:col-span-8 relative group"
                                >
                                    <div className="relative aspect-[16/9] rounded-[48px] md:rounded-[80px] overflow-hidden shadow-[0_100px_200px_-40px_rgba(37,99,235,0.2)]">
                                        <Image
                                            src="/corporate-interior.png"
                                            alt="Modern Gurgaon HQ"
                                            fill
                                            sizes="(max-width: 1200px) 100vw, 60vw"
                                            className="object-cover transition-transform duration-[5000ms] group-hover:scale-110 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                    {/* Rotating Call to Action or Detail */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-16 -right-16 w-64 h-64 border border-blue-600/10 rounded-full flex items-center justify-center group-hover:border-blue-600/30 transition-colors duration-1000"
                                    >
                                        <div className="w-[85%] h-[85%] border-2 border-dashed border-blue-600/20 rounded-full flex items-center justify-center p-8 text-center">
                                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600 opacity-50">Operational Excellence Ref: HQ_GUR_01</p>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    variants={staggerContainer}
                                    initial="initial"
                                    whileInView="animate"
                                    className="lg:col-span-4 space-y-10"
                                >
                                    <div className="space-y-6">
                                        <motion.h4 variants={fadeInUp} className="text-6xl md:text-8xl font-black text-dark tracking-tighter">04</motion.h4>
                                        <motion.p variants={fadeInUp} className="text-xs font-black text-dark/30 uppercase tracking-[0.5em]">Sovereign Entities Integrated</motion.p>
                                    </div>
                                    <div className="space-y-6">
                                        <motion.h4 variants={fadeInUp} className="text-6xl md:text-8xl font-black text-dark tracking-tighter">10k+</motion.h4>
                                        <motion.p variants={fadeInUp} className="text-xs font-black text-dark/30 uppercase tracking-[0.5em]">Growth Optimization Cycles</motion.p>
                                    </div>
                                    <motion.div variants={fadeInUp}>
                                        <Link href="/about" className="inline-flex items-center gap-6 group">
                                            <span className="text-sm font-black uppercase tracking-[0.4em] text-dark border-b-2 border-blue-600/20 py-2 group-hover:border-blue-600 transition-all duration-700">Deep Dive Into HQ</span>
                                            <span className="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center group-hover:bg-dark group-hover:text-white transition-all duration-700">
                                                <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            </span>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. CORE VALUES - REFINED STACKS */}
                <section className="py-12 md:py-28 bg-[#f8f9fa] relative overflow-hidden">
                    <div className="container-wide relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
                            <motion.div
                                variants={sectionAnimation}
                                initial="initial"
                                whileInView="whileInView"
                                className="lg:col-span-12"
                            >
                                <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
                                    <div className="md:w-3/5">
                                        <SectionLabel>Core Principles</SectionLabel>
                                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-dark leading-[1.1] tracking-tight">
                                            Elevating <span className="text-blue-600 font-normal italic font-serif">Global</span> Standards
                                        </h2>
                                    </div>
                                    <div className="md:w-2/5">
                                        <p className="text-xl text-dark/40 font-secondary leading-tight italic border-l-4 border-blue-600/30 pl-8">
                                            "We combine deep market expertise with a commitment to sustainable value creation."
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                {[
                                    {
                                        title: "Our Vision",
                                        icon: "token",
                                        color: "text-blue-600",
                                        bg: "bg-blue-50/50 hover:bg-blue-600 hover:text-white",
                                        desc: "To be the definitive bridge between global investors and India's dynamic growth sectors, setting new benchmarks for transparency and industrial performance."
                                    },
                                    {
                                        title: "Our Mission",
                                        icon: "account_tree",
                                        color: "text-gold",
                                        bg: "bg-[#fde8d8]/50 hover:bg-dark hover:text-white",
                                        desc: "Empowering businesses through ethical investment practices, autonomous vertical integration, and a relentless focus on long-term capital appreciation."
                                    }
                                ].map((card, i) => (
                                    <motion.div
                                        key={i}
                                        variants={sectionAnimation}
                                        initial="initial"
                                        whileInView="whileInView"
                                        viewport={{ amount: 0.5 }}
                                        className={`group p-10 md:p-14 bg-white rounded-[48px] border border-dark/5 transition-all duration-1000 ease-in-out hover:shadow-[0_40px_80px_-20px_rgba(0,18,51,0.05)]`}
                                    >
                                        <div className="flex flex-col gap-8">
                                            <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-700 bg-dark text-white group-hover:scale-110 group-hover:rotate-6`}>
                                                <span className="material-symbols-outlined text-4xl">{card.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-dark mb-4 tracking-tighter">{card.title}</h3>
                                                <p className="text-lg md:text-xl text-dark/30 font-secondary leading-tight italic transition-colors duration-700 group-hover:text-dark/80">
                                                    "{card.desc}"
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-x-10 group-hover:translate-x-0">
                                                <div className="h-[2px] w-12 bg-blue-600" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Institutional Mandate</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. LEADERSHIP - ARCHITECTS STAGGER */}
                <section className="py-12 md:py-28 bg-white overflow-hidden">
                    <div className="container-wide">
                        <motion.div
                            variants={sectionAnimation}
                            initial="initial"
                            whileInView="whileInView"
                            className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-20"
                        >
                            <div className="max-w-4xl">
                                <SectionLabel>Executive Governance</SectionLabel>
                                <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-dark leading-[1.1] tracking-tight">
                                    Architects <br />of the <span className="text-blue-600 font-normal italic font-serif">Future</span>
                                </h2>
                            </div>
                            <p className="text-2xl text-dark/30 font-secondary mt-16 md:mt-0 max-w-sm md:text-right italic">
                                Driving institutional excellence through visionary leadership across four sovereign entities.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto"
                        >
                            {founders.map((founder, idx) => (
                                <FounderCard key={idx} founder={founder} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 5. PORTFOLIO - CINEMATIC IMMERSION */}
                <section id="portfolio" className="py-12 md:py-28 bg-[#fdfdfd] overflow-hidden relative">
                    {/* Background Grids */}
                    <div className="absolute inset-0 grid grid-cols-12 opacity-[0.03] pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-dark h-full" />
                        ))}
                    </div>

                    <div className="container-wide relative z-10">
                        {/* Section Header */}
                        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-end mb-16 md:mb-24">
                            <div className="lg:col-span-9 w-full">
                                <motion.div variants={sectionAnimation} initial="initial" whileInView="whileInView">
                                    <SectionLabel>Portfolio Spotlight</SectionLabel>
                                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-dark leading-[1.1] tracking-tight">
                                        A Legacy of <br />
                                        <span className="text-dark/5 italic font-serif font-normal pr-8">Strategic</span> <br />
                                        Allocation
                                    </h2>
                                </motion.div>
                            </div>
                        </div>

                        {/* Sovereign Brand Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white border border-dark/5 p-10 md:p-14 rounded-[40px] md:rounded-[60px] mb-20 shadow-[0_40px_100px_-20px_rgba(0,18,51,0.08)] flex flex-col md:flex-row items-center justify-between gap-12 group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/[0.03] to-transparent pointer-events-none" />
                            <div className="flex items-center gap-10 relative z-10">
                                <Link href="/" className="relative w-48 h-12 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                    <Image src="/logo.png" alt="RiseMate Venture" fill className="object-contain object-left" />
                                </Link>
                                <div className="h-10 w-[1px] bg-dark/10 hidden md:block" />
                                <p className="text-[11px] font-black uppercase tracking-[0.5em] text-dark/30 leading-tight">
                                    Overarching <br /> Sovereign Entity
                                </p>
                            </div>
                            <div className="flex items-center gap-10 relative z-10">
                                <div className="hidden lg:flex gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                                    ))}
                                </div>
                                <Link href="/portfolio" className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 bg-blue-50 px-8 py-4 rounded-full hover:bg-dark hover:text-white transition-all duration-700">
                                    Sovereign Directory
                                </Link>
                            </div>
                        </motion.div>

                        {/* Portfolio List with extreme scroll depth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                            {portfolioItems.map((item, idx) => (
                                <PortfolioItem key={idx} item={item} index={idx} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. CTA SECTION - LIGHT INTEGRATION */}
                <section className="py-12 md:py-28 bg-white text-dark overflow-hidden relative border-t border-dark/5">
                    <div className="container-wide relative z-10 text-center">
                        <motion.div
                            variants={sectionAnimation}
                            initial="initial"
                            whileInView="whileInView"
                        >
                            <SectionLabel>Nexus Collective</SectionLabel>
                            <h2 className="text-4xl md:text-7xl lg:text-9xl font-black mb-16 tracking-tight leading-[1.1]">
                                Ready to build <br /> the <span className="text-blue-600 font-normal italic font-serif">Nexus?</span>
                            </h2>
                            <p className="text-2xl md:text-3xl text-dark/30 font-secondary max-w-3xl mx-auto mb-24 px-6 leading-tight">
                                Join a circle of institutional excellence and high-velocity growth in India's leading economic hubs.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                                <Link href="/contact" className="group relative bg-dark text-white px-20 py-8 rounded-[40px] text-xs font-black uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:scale-110 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                                    <span className="relative z-10">Initialize Partnership</span>
                                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                                </Link>
                                <Link href="/about" className="group bg-dark/5 backdrop-blur-xl border border-dark/10 text-dark px-20 py-8 rounded-[40px] text-xs font-black uppercase tracking-[0.5em] hover:bg-dark hover:text-white transition-all duration-1000">
                                    Institutional Dossier
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
