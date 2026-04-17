"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import Magnetic from "./components/Magnetic";
import Counter from "./components/Counter";

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
            <span className="absolute inset-0 bg-[#002366]/20 blur-md rounded-full animate-pulse"></span>
            <span className="relative w-2 h-2 bg-[#002366] rounded-full block"></span>
        </div>
        <span className="text-xs font-black uppercase tracking-[0.5em] text-[#002366]/90 leading-none">{children}</span>
    </motion.div>
);

const RevealText = ({ text, className = "", delay = 0 }) => {
    const letters = text.split("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <span ref={ref} className={`inline-block whitespace-nowrap ${className}`}>
            {letters.map((letter, i) => (
                <span key={i} className="inline-block overflow-hidden pb-4 -mb-4">
                    <motion.span
                        initial={{ y: "100%", opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                            delay: delay + (i * 0.02)
                        }}
                        className="inline-block whitespace-pre"
                    >
                        {letter}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};

const ScrollReveal = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div ref={ref} style={{ opacity }}>
            {children}
        </motion.div>
    );
};


const HeroContent = ({ theme }) => {
    const isDark = theme === "dark";
    const primaryColor = isDark ? "text-white" : "text-[#001233]";
    const secondaryColor = isDark ? "text-white/90" : "text-[#002366]";
    const mutedColor = isDark ? "text-white/30" : "text-dark/30";
    const descriptionColor = isDark ? "text-white/80" : "text-dark/70";

    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="relative py-20"
        >
            {/* Top Accent */}
            <motion.div variants={fadeInUp} className="mb-8 lg:mb-12 flex items-center gap-6">
                <span className="h-[1px] w-20 bg-[#002366]" />
                <span className={`text-[10px] font-black uppercase tracking-[0.8em] ${mutedColor}`}>
                    Institutional Governance Alpha
                </span>
            </motion.div>

            {/* Main Heading */}
            <div className="relative mb-16 lg:mb-24">
                <h1 className={`text-6xl md:text-[110px] lg:text-[180px] font-black leading-[0.85] tracking-tight ${primaryColor}`}>
                    <div className="flex flex-col">
                        <motion.span variants={fadeInUp} className="relative inline-block">
                            Architecting
                        </motion.span>
                        <motion.span
                            variants={fadeInUp}
                            className={`relative inline-block italic font-serif font-normal text-[0.8em] lg:text-[0.9em] -mt-2 lg:-mt-4 lg:ml-[15%] ${secondaryColor}`}
                        >
                            Sovereign
                        </motion.span>
                        <motion.span variants={fadeInUp} className="relative inline-block self-end md:self-auto md:ml-auto lg:mr-[10%]">
                            Futures.
                        </motion.span>
                    </div>
                </h1>
            </div>

            {/* Bottom Info Arc */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                <motion.div variants={fadeInUp} className="lg:col-span-5">
                    <p className={`text-xl md:text-2xl ${descriptionColor} font-medium leading-relaxed font-secondary`}>
                        We operate at the nexus of <span className="font-bold underline decoration-[#002366]/40 underline-offset-8">institutional stability</span> and regional opportunity, bridging global capital with high-growth entities.
                    </p>

                    <div className="mt-10 lg:mt-14 flex flex-col sm:flex-row items-center gap-12">
                        <Magnetic>
                            <Link href="/contact" className="group relative py-2">
                                <span className={`text-[11px] font-black uppercase tracking-[0.5em] ${primaryColor}`}>Initialize Partnership</span>
                                <div className={`h-[1px] w-full ${isDark ? 'bg-white/10' : 'bg-dark/10'} mt-3 relative overflow-hidden`}>
                                    <motion.div
                                        className="absolute inset-0 bg-[#002366]"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "0%" }}
                                        transition={{ duration: 0.6 }}
                                    />
                                </div>
                            </Link>
                        </Magnetic>

                        <Link href="/portfolio" className="group flex items-center gap-6">
                            <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${mutedColor} group-hover:${primaryColor} transition-colors`}>Explore Dossier</span>
                            <div className={`w-10 h-10 rounded-full border ${isDark ? 'border-white/10' : 'border-dark/10'} flex items-center justify-center group-hover:bg-[#002366] group-hover:text-white group-hover:border-none transition-all duration-500`}>
                                <span className="material-symbols-outlined text-sm">north_east</span>
                            </div>
                        </Link>
                    </div>
                </motion.div>

                <motion.div variants={staggerContainer} className={`lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t lg:border-t-0 lg:border-l ${isDark ? 'border-white/5' : 'border-dark/5'} lg:pl-16 pt-12 lg:pt-0`}>
                    {[
                        { val: 4, suffix: "+", label: "Sovereign Entities", desc: "Governance structures" },
                        { val: 10000, suffix: "+", label: "Growth Optimization", desc: "Operational cycles" },
                        { val: 1.2, suffix: "B+", label: "Capital Allocation", desc: "Institutional impact" }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeInUp} className="flex flex-col gap-2">
                            <h4 className={`text-4xl lg:text-5xl font-black ${primaryColor} tracking-tighter`}>
                                <Counter value={stat.val} />{stat.suffix}
                            </h4>
                            <div>
                                <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/70' : 'text-dark/70'} mb-1`}>{stat.label}</p>
                                <p className={`text-[8px] font-medium uppercase tracking-[0.1em] ${isDark ? 'text-white/20' : 'text-dark/20'}`}>{stat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

const ParallaxMarquee = ({ text, direction = "left" }) => {
    const { scrollYProgress } = useScroll();

    // Base scroll parallax
    const scrollX = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "left" ? [0, -200] : [-200, 0]
    );

    return (
        <div className="overflow-hidden whitespace-nowrap py-8 md:py-16 opacity-[0.2] border-y border-dark/5 bg-dark/[0.02] pointer-events-none select-none">
            <motion.div
                animate={{
                    x: direction === "left" ? [0, -1000] : [-1000, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex gap-20 items-center"
                style={{ translateX: scrollX }}
            >
                {[...Array(12)].map((_, i) => (
                    <span key={i} className="text-[100px] md:text-[180px] font-[900] uppercase tracking-tighter text-[#001a4d]">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

const PortfolioItem = ({ item, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            variants={fadeInUp}
            whileHover={{ y: -12, scale: 1.01 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col bg-[#fdfdfd] rounded-[24px] md:rounded-[40px] border border-dark/5 p-6 md:p-8 hover:border-[#002366]/20 hover:shadow-[0_40px_80px_-20px_rgba(0,18,51,0.08)] transition-all duration-1000 overflow-hidden"
        >
            <div className="absolute -top-6 -right-6 pointer-events-none opacity-[0.03] transition-all duration-1000 group-hover:opacity-[0.08] group-hover:scale-110 group-hover:text-[#002366]">
                <span className="text-[140px] font-black leading-none">0{index + 1}</span>
            </div>

            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#f0f7ff] text-[#003380] text-[8px] font-black uppercase tracking-[0.2em] rounded-md">{item.tag}</span>
                    <div className="h-[1px] w-12 bg-dark/10 group-hover:w-20 group-hover:bg-[#002366] transition-all duration-700"></div>
                </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] mb-8 shadow-xl transition-all duration-1000">
                <motion.div
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                >
                    <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-[#002366]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                {item.logo && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 1 }}
                        className={`absolute bottom-6 right-6 w-16 h-16 ${item.logoBg || 'bg-white'} flex items-center justify-center rounded-2xl shadow-2xl p-3 border border-dark/5 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3`}
                    >
                        <img src={item.logo} alt={item.title} className="w-10 h-10 object-contain" />
                    </motion.div>
                )}
            </div>

            <div className="flex flex-col relative z-10 flex-grow">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#002366] mb-2 opacity-60 italic">{item.tagline}</p>
                <h3 className="text-2xl md:text-3xl font-black text-dark mb-4 tracking-tighter leading-none group-hover:text-[#002366] transition-colors duration-500 uppercase">{item.title}</h3>

                <p className="text-sm text-dark/50 font-secondary leading-relaxed mb-8 line-clamp-3">
                    {item.desc}
                </p>

                <div className="mt-auto pt-8 border-t border-dark/5">
                    <Magnetic>
                        <Link href="/portfolio" className="inline-flex items-center gap-4 group/link">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-dark border-b-2 border-transparent group-hover/link:border-[#002366] transition-all duration-500">View Sovereign Entity</span>
                            <div className="w-10 h-10 rounded-full border border-dark/10 flex items-center justify-center group-hover/link:bg-dark group-hover/link:text-white transition-all duration-700">
                                <span className="material-symbols-outlined text-sm">north_east</span>
                            </div>
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </motion.div>
    );
};

const FounderCard = ({ founder, isSmall }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative bg-[#FAF9F6] rounded-[32px] overflow-hidden flex flex-col h-full border border-dark/5 shadow-[0_10px_40px_-15px_rgba(0,18,51,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,18,51,0.12)] transition-all duration-700 ${isSmall ? 'scale-[0.95] origin-top' : ''}`}
        >
            {/* ── Image Section ── */}
            <div className={`relative ${isSmall ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden`}>
                <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                    unoptimized={true}
                />
                
                {/* Overlays */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
                
                {/* Executive Tier Badge */}
                <div className="absolute top-6 left-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/90">
                            {founder.tier}
                        </span>
                    </div>
                </div>

                {/* Name & Role Overlay */}
                <div className="absolute bottom-6 left-8 right-8 z-10 transition-transform duration-700 group-hover:-translate-y-2">
                    <h3 className={`${isSmall ? 'text-2xl' : 'text-3xl md:text-4xl'} font-black text-white tracking-tighter leading-none mb-1`}>
                        {founder.name}
                    </h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 italic">
                        {founder.role.split('·')[0]} · <span className="text-white/60">{founder.role.split('·')[1]}</span>
                    </p>
                </div>

                {/* Logo Badge */}
                {founder.logo && (
                    <div className={`absolute ${isSmall ? 'bottom-4 right-4' : 'bottom-6 right-6'} z-20`}>
                        <div className={`${isSmall ? 'w-8 h-8' : 'w-10 h-10'} ${founder.logoBg || "bg-white"} rounded-xl shadow-xl p-2 border border-dark/5 flex items-center justify-center group-hover:rotate-12 transition-all duration-700`}>
                            <Image src={founder.logo} alt="Company Logo" width={isSmall ? 20 : 28} height={isSmall ? 20 : 28} className="object-contain" unoptimized={true} />
                        </div>
                    </div>
                )}
            </div>

            {/* ── Content Section ── */}
            <div className={`${isSmall ? 'p-6' : 'p-8 md:p-10'} flex flex-col flex-grow`}>
                {/* Operational Mandate */}
                <div className={`${isSmall ? 'mb-4' : 'mb-8'}`}>
                    <h5 className="text-[8px] font-black uppercase tracking-[0.35em] text-dark/25 mb-4 uppercase">Operational Mandate</h5>
                    <div className="border-l-2 border-blue-600/30 pl-5">
                        <p className={`${isSmall ? 'text-xs' : 'text-sm md:text-[15px]'} text-dark/70 font-medium leading-relaxed italic`}>
                            "{founder.philosophy}"
                        </p>
                    </div>
                </div>

                <div className={`mt-auto pt-8 border-t border-dark/5 grid ${isSmall ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
                    <div>
                        <h5 className="text-[8px] font-black uppercase tracking-[0.35em] text-dark/25 mb-3 uppercase">Strategic Vision</h5>
                        <p className={`text-[11px] text-dark/45 leading-relaxed ${isSmall ? 'line-clamp-2' : 'line-clamp-3'}`}>{founder.vision}</p>
                    </div>
                    <div>
                        <h5 className="text-[8px] font-black uppercase tracking-[0.35em] text-dark/25 mb-3 uppercase">Core Focus</h5>
                        <p className={`text-[11px] text-dark/45 leading-relaxed ${isSmall ? 'line-clamp-2' : 'line-clamp-3'}`}>{founder.focus}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const founders = [
    {
        tier: "Executive Tier 001",
        name: "Saurabh Jain",
        role: "Founder & CEO · Vega Vrudhi",
        philosophy: "Building on-ground execution intelligence via precision managed sales infrastructure.",
        vision: "Architecting high-performance field-force efficiency through algorithmic sales fulfillment for national growth engines.",
        focus: "Strategic Retail Expansion & End-to-End Lead conversion fulfillment across India's Tier 1 and 2 cities.",
        logo: "/VEGA.png",
        image: "/saurab jain sir .jpeg"
    },
    {
        tier: "Executive Tier 002",
        name: "Dheeraj Anand",
        role: "Founder & CEO · BWorth",
        philosophy: "Redefining the value of waste through industrial-scale circular luxury fashion architecture.",
        vision: "Re-imagining luxury fashion as a circular asset, creating a global movement towards zero-landfill conscious consumerism.",
        focus: "Circular Luxury Fashion, Ethical Upcycling Ecosystems & Sustainable Global Value Chain Integration.",
        logo: "/BWORTH.jpg",
        image: "/dheeraj sir.jpeg"
    },
    {
        tier: "Executive Tier 003",
        name: "Yograj Rundhanker",
        role: "Founder & CEO · RYM Grenergy",
        philosophy: "Harnessing deep-tech intelligence to solve the world's most critical energy challenges.",
        vision: "Enabling a carbon-neutral future by developing the world’s greenest battery cell and intelligent green-tech infrastructure.",
        focus: "Clean Energy, AI/ML-driven IoT Innovations & Smart Energy Automation Systems.",
        logo: "https://rymgrenergy.com/images/logo.png",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop"
    },
    {
        tier: "Executive Tier 004",
        name: "Devam Srivastava",
        role: "Founder & CEO · Synchronous",
        philosophy: "Scaling institutional legacies through the convergence of high-conversion engineering and supreme aesthetics.",
        vision: "Architecting high-velocity digital ecosystems for high-growth elite brands via algorithmic process automation.",
        focus: "Brand Identity Architecture, Autonomous AI Agents & Predictive Growth Modeling.",
        logo: "/sync.jpg",
        image: "/devam .jpeg"
    },
    {
        tier: "Executive Tier 005",
        name: "Aryan",
        role: "Strategic Partner · Global Growth",
        philosophy: "Expanding industrial footprints through collaborative strategic alliance and market intelligence.",
        vision: "Integrating emerging market opportunities with core institutional values for sustained expansion.",
        focus: "Strategic Alliances, Market Expansion & Operational Scalability.",
        logo: "/logo.png",
        image: "/aryan.png"
    }
];

const portfolioItems = [
    {
        title: "BWorth",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
        desc: "Orchestrating a systemic shift in the industrial value chain through a proprietary circular luxury ecosystem. We integrate end-to-end lifecycle management to preserve capital and environmental equity.",
        tag: "Circular Luxury",
        tagline: "Sovereign Industrial Value Chain",
        logo: "/BWORTH.jpg"
    },
    {
        title: "Vega Vrudhi",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2670&auto=format&fit=crop",
        desc: "Deploying high-precision execution frameworks that bridge the divide between global strategic mandates and regional operational reality. We architect the backbone of national scale logistics.",
        tag: "Managed Sales",
        tagline: "Regional Execution Infrastructure",
        logo: "/VEGA.png"
    },
    {
        title: "RYM Grenergy",
        img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2670&auto=format&fit=crop",
        desc: "Pioneering the next generation of energy sovereignty through advanced electrochemical storage solutions. Our vertically integrated AI-driven infrastructure ensures energy security for high-growth sectors.",
        tag: "Clean Energy",
        tagline: "Sovereign Energy Infrastructure",
        logo: "https://rymgrenergy.com/images/logo.png"
    },
    {
        title: "Synchronous",
        img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop",
        desc: "Synthesizing brand identity with autonomous agent intelligence to create compound ROI for institutional-grade brands. We build the digital nexus where aesthetics meet algorithmic precision.",
        tag: "Autonomous AI",
        tagline: "Institutional Brand Architecture",
        logo: "/sync.jpg"
    },
];

export default function Home() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen bg-white selection:bg-[#002366] selection:text-white">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#002366] origin-left z-[110] shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                style={{ scaleX }}
            />
            <Navbar />

            <main>
                {/* 1. HERO SECTION - REFINED WITH USER IMAGE */}
                <section className="relative min-h-screen bg-[#FAF9F6] pt-36 pb-20 overflow-hidden">
                    <div className="container-wide relative z-10">
                        {/* Top Content Row: Designing for Impact */}
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">

                            {/* Left: Massive Typography - Architecture of Scale */}
                            <div className="lg:max-w-[900px]">
                                <motion.h1
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[64px] md:text-[110px] lg:text-[160px] font-black text-[#1A1A1A] leading-[0.8] tracking-[-0.04em]"
                                >
                                    Architecting <br />
                                    <span className="text-[#002366]">Sovereign</span> <br />
                                    Futures<span className="text-[#002366]">.</span>
                                </motion.h1>
                            </div>

                            {/* Right: Institutional Intelligence Box */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="lg:max-w-[360px] pt-8"
                            >
                                <div className="flex gap-10 mb-14 hidden md:flex border-b border-dark/5 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-dark">Institutional Pulse</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/20 hover:text-dark transition-all cursor-pointer">Live Metrics</span>
                                </div>

                                <div className="space-y-8">
                                    {/* Partner Avatars & Social Proof */}
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center -space-x-4">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-14 h-14 rounded-full border-4 border-[#FAF9F6] overflow-hidden bg-gray-100 shadow-2xl relative">
                                                    <Image src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Partner" fill className="object-cover" />
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-[#FAF9F6] bg-dark text-white text-[12px] font-black shadow-2xl z-10">
                                                +4
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-dark tracking-tighter leading-none">+1.2B</p>
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-dark/40 mt-1">Capital Managed</p>
                                        </div>
                                    </div>

                                    <p className="text-[15px] text-dark/70 font-medium leading-relaxed max-w-sm">
                                        Operating at the nexus of <span className="text-dark font-bold underline decoration-[#002366]/30 underline-offset-4">institutional stability</span> and regional opportunity, bridging global capital with high-growth entities.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Immersive Landscape Reveal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            className="relative w-full aspect-[21/9] md:aspect-[16/7] rounded-[48px] lg:rounded-[100px] overflow-hidden shadow-[0_120px_200px_-60px_rgba(37,99,235,0.12)] group"
                        >
                            <Image
                                src="/beautiful-city-landscape-with-tall-buildings.jpg"
                                alt="Sovereign Industrial Cityscape"
                                fill
                                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[8s] ease-out"
                                priority
                            />

                            {/* Cinematic Design Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[48px] lg:rounded-[100px]" />

                            {/* High-Impact Metric Strip */}
                            <div className="absolute bottom-12 left-0 right-0 px-12 flex flex-wrap justify-between items-center gap-10">
                                {[
                                    { val: 4, suffix: "+", label: "Sovereign Partners" },
                                    { val: 1.2, suffix: "B+", label: "Capital Allocated" },
                                    { val: 100, suffix: "%", label: "Industrial Integrity" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center gap-5 bg-white/5 backdrop-blur-2xl px-8 py-5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-colors duration-500">
                                        <span className="text-4xl font-black text-white tracking-tighter">
                                            <Counter value={stat.val} />{stat.suffix}
                                        </span>
                                        <div className="h-8 w-[1px] bg-white/20" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 leading-none">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Architectural Ambient Blur */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#002366]/5 blur-[200px] -translate-y-1/2 rounded-full pointer-events-none" />
                </section>

                {/* 2. ABOUT SECTION - SCROLL LIQUIDITY */}
                <ScrollReveal>
                    <section id="about" className="py-8 md:py-16 bg-white relative overflow-hidden">
                        {/* Background Orbs with subtle movement */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.6, 0.4],
                                x: [0, 50, 0],
                                y: [0, -30, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f0f7ff]/50 blur-[120px] rounded-full pointer-events-none"
                        />

                        <div className="container-wide relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                <motion.div
                                    variants={sectionAnimation}
                                    initial="initial"
                                    whileInView="whileInView"
                                    className="lg:col-span-12 mb-8"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-end">
                                        <div className="md:w-3/5">
                                            <SectionLabel>Strategic Nexus: NCR & Jaipur</SectionLabel>
                                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-dark leading-[1.1] tracking-tight">
                                                Architectural <br /><span className="text-[#002366]">Precision</span> <br /> In Growth
                                            </h2>
                                        </div>
                                        <div className="md:w-2/5 space-y-4">
                                            <p className="text-xl text-dark/60 font-secondary leading-tight italic border-l-4 border-[#002366]/30 pl-8 py-2">
                                                Operating from our institutional hubs in <span className="text-dark font-black underline decoration-blue-500/40 underline-offset-8">Gurugram</span> and <span className="text-dark font-black underline decoration-blue-500/40 underline-offset-8">Jaipur</span>.
                                            </p>
                                            <motion.div
                                                initial={{ opacity: 0, x: 50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 }}
                                                className="bg-dark p-8 rounded-[32px] text-white shadow-2xl"
                                            >
                                                <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-2 text-white/30">Vertical Synergy</p>
                                                <p className="text-base font-medium leading-relaxed opacity-90 italic">
                                                    "We bridge the gap between global institutional expertise and high-velocity regional execution through proprietary technology."
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
                                    <motion.div
                                        variants={fadeInUp}
                                        initial="initial"
                                        whileInView="animate"
                                        className="lg:col-span-8 relative group"
                                    >
                                        <div className="relative aspect-[16/9] rounded-[32px] md:rounded-[60px] overflow-hidden shadow-[0_80px_160px_-40px_rgba(37,99,235,0.2)]">
                                            <Image
                                                src="/corporate-interior.png"
                                                alt="Modern Gurgaon HQ"
                                                fill
                                                sizes="(max-width: 1200px) 100vw, 60vw"
                                                className="object-cover transition-transform duration-[5000ms] group-hover:scale-110 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-transparent pointer-events-none" />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={staggerContainer}
                                        initial="initial"
                                        whileInView="animate"
                                        className="lg:col-span-4 space-y-8"
                                    >
                                        <div className="space-y-4">
                                            <motion.h4 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-dark tracking-tighter">
                                                <Counter value={4} />
                                            </motion.h4>
                                            <motion.p variants={fadeInUp} className="text-[10px] font-black text-dark/30 uppercase tracking-[0.5em]">Sovereign Entities Integrated</motion.p>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-5xl md:text-7xl font-black text-dark tracking-tighter">
                                                <Counter value={10000} />+
                                            </h4>
                                            <p className="text-[10px] font-black text-dark/30 uppercase tracking-[0.5em]">Growth Optimization Cycles</p>
                                        </div>
                                        <motion.div variants={fadeInUp}>
                                            <Link href="/about" className="inline-flex items-center gap-4 group">
                                                <span className="text-xs font-black uppercase tracking-[0.4em] text-dark border-b-2 border-[#002366]/20 py-2 group-hover:border-[#002366] transition-all duration-700">Deep Dive Into HQ</span>
                                                <span className="w-10 h-10 rounded-full border border-dark/10 flex items-center justify-center group-hover:bg-dark group-hover:text-white transition-all duration-700">
                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                </span>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* 3. CORE VALUES - ARCHITECTURAL REDESIGN */}
                <section id="values" className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
                    {/* Background Infrastructure */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-dark/5" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-dark/5" />

                    <div className="container-wide relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-end mb-24">
                            <div className="lg:col-span-8">
                                <SectionLabel>Institutional Foundation</SectionLabel>
                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-dark leading-[0.95] tracking-tight">
                                    elevating <br />
                                    <span className="text-[#002366]">global</span> standards<span className="text-[#002366]">.</span>
                                </h2>
                            </div>
                            <div className="lg:col-span-4 pb-4">
                                <p className="text-xl md:text-2xl text-dark/70 font-semibold leading-relaxed border-l-4 border-[#002366] pl-10 italic">
                                    "We combine deep market expertise with a commitment to sustainable value creation."
                                </p>
                            </div>
                        </div>



                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {[
                                {
                                    title: "Our Vision",
                                    subtitle: "The Definitive Bridge",
                                    icon: "token",
                                    num: "01",
                                    desc: "To be the definitive bridge between global investors and India's dynamic growth sectors, setting new benchmarks for transparency and institutional performance."
                                },
                                {
                                    title: "Our Mission",
                                    subtitle: "Ethical Empowerment",
                                    icon: "account_tree",
                                    num: "02",
                                    desc: "Empowering businesses through ethical investment practices, autonomous vertical integration, and a relentless focus on long-term capital appreciation."
                                }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    variants={sectionAnimation}
                                    initial="initial"
                                    whileInView="whileInView"
                                    whileHover={{ y: -10 }}
                                    className="group relative p-12 lg:p-16 bg-white rounded-[40px] md:rounded-[60px] border border-dark/5 hover:border-[#002366]/30 hover:shadow-[0_80px_120px_-30px_rgba(232,126,67,0.08)] transition-all duration-1000 overflow-hidden"
                                >
                                    {/* Card Background Number */}
                                    <div className="absolute top-10 right-10 text-[120px] md:text-[200px] font-black text-dark/[0.03] leading-none transition-all duration-1000 group-hover:text-[#002366]/[0.05] group-hover:scale-110 pointer-events-none">
                                        {card.num}
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full gap-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-dark text-white flex items-center justify-center group-hover:bg-[#002366] transition-colors duration-700">
                                                <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#002366] mb-1">{card.subtitle}</h3>
                                                <p className="text-3xl font-black text-dark tracking-tighter">{card.title}</p>
                                            </div>
                                        </div>

                                        <div className="max-w-md">
                                            <p className="text-xl md:text-2xl text-dark/30 font-semibold font-secondary leading-snug group-hover:text-dark/80 transition-colors duration-700">
                                                "{card.desc}"
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-10 border-t border-dark/5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-[2px] w-12 bg-dark/10 group-hover:bg-[#002366] group-hover:w-20 transition-all duration-1000" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-dark/40 group-hover:text-dark transition-colors">Institutional Mandate</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-dark/5 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                                                <span className="material-symbols-outlined text-sm">north_east</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* 4. LEADERSHIP - ARCHITECTS STAGGER */}
                <ScrollReveal>
                    <section className="py-20 md:py-32 bg-white overflow-hidden">
                        <div className="container-wide">
                            <motion.div
                                variants={sectionAnimation}
                                initial="initial"
                                whileInView="whileInView"
                                className="flex flex-col md:flex-row justify-between items-end mb-8 lg:mb-16"
                            >
                                <div className="max-w-4xl">
                                    <SectionLabel>Registry Governance</SectionLabel>
                                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-dark leading-[1.1] tracking-tight">
                                        Institutional <br /><span className="text-[#002366] font-normal italic font-serif">Architects</span>.
                                    </h2>
                                </div>
                                <p className="text-xl text-dark/30 font-secondary mt-8 md:mt-0 max-w-sm md:text-right italic">
                                    The executive governance behind RiseMate Venture. Each leader operates at the nexus of institutional stability and regional opportunity.
                                </p>
                            </motion.div>

                            <div className="space-y-12">
                                {/* First Row: Top Leadership (Large) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-7xl mx-auto">
                                    {founders.slice(0, 2).map((founder, idx) => (
                                        <FounderCard key={idx} founder={founder} />
                                    ))}
                                </div>

                                {/* Second Row: Executive Team (Compact) */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                    {founders.slice(2).map((founder, idx) => (
                                        <FounderCard key={idx + 2} founder={founder} isSmall={true} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* 5. PORTFOLIO - CINEMATIC IMMERSION */}
                <ScrollReveal>
                    <section id="portfolio" className="py-8 md:py-16 bg-[#fdfdfd] overflow-hidden relative">
                        {/* Background Grids */}
                        <div className="absolute inset-0 grid grid-cols-12 opacity-[0.03] pointer-events-none">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="border-r border-dark h-full" />
                            ))}
                        </div>

                        <div className="container-wide relative z-10">
                            {/* Section Header */}
                            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-end mb-8 md:mb-12">
                                <div className="lg:col-span-9 w-full">
                                    <motion.div variants={sectionAnimation} initial="initial" whileInView="whileInView">
                                        <SectionLabel>Portfolio Spotlight</SectionLabel>
                                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-dark leading-[1.1] tracking-tight">
                                            <RevealText text="A Legacy of" delay={0.2} /> <br />
                                            <span className="text-[#002366] italic font-serif font-normal pr-6">Strategic</span> <br />
                                            <RevealText text="Allocation" delay={0.6} />
                                        </h2>
                                    </motion.div>
                                </div>
                            </div>



                            {/* Portfolio List with extreme scroll depth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
                                {portfolioItems.map((item, idx) => (
                                    <PortfolioItem key={idx} item={item} index={idx} />
                                ))}
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                <ParallaxMarquee text="Institutional Excellence · Strategic Allocation · Sovereign Growth · " direction="left" />

                {/* 6. NEXUS COLLECTIVE - INSTITUTIONAL CONNECTION */}
                <section className="py-24 bg-white overflow-hidden relative border-t border-dark/5">
                    <div className="container-wide relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
                            <div className="max-w-3xl">
                                <SectionLabel>Initialize Connection</SectionLabel>
                                <h2 className="text-5xl md:text-8xl font-black text-dark tracking-tighter leading-[0.9] mb-8">
                                    Nexus <br /><span className="text-[#002366] italic font-serif font-normal">Collective.</span>
                                </h2>
                                <p className="text-xl md:text-2xl text-dark/40 font-secondary leading-tight italic border-l-3 border-[#002366] pl-8">
                                    Bridge the gap between institutional expertise and your sovereign growth. Our global operations are active across all regional hubs.
                                </p>
                            </div>
                        </div>

                        {/* Entity Matrix */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                            {[
                                {
                                    name: "BWorth Support", icon: "eco",
                                    email: "info@bworth.co.in", phone: "+91 8826668050",
                                    ref: "Industrial Synthesis"
                                },
                                {
                                    name: "Vega Vrudhi", icon: "precision_manufacturing",
                                    email: "saurabh@vegavruddhi.com", phone: "+91 91166 16636",
                                    ref: "Execution Framework"
                                },
                                {
                                    name: "RYM Grenergy", icon: "bolt",
                                    email: "contact@rym-grenergy.com", phone: "+91 82000 55645",
                                    ref: "Energy Sovereignty"
                                },
                                {
                                    name: "Synchronous", icon: "hub",
                                    email: "ops@synchronous.digital", phone: "Global",
                                    ref: "Digital Architecture"
                                }
                            ].map((entity, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10 }}
                                    className="group p-10 bg-[#f8faff] rounded-[40px] border border-[#002366]/5 hover:border-[#002366]/20 transition-all duration-700"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-10 group-hover:bg-[#002366] group-hover:text-white transition-all duration-700">
                                        <span className="material-symbols-outlined text-2xl">{entity.icon}</span>
                                    </div>
                                    <div className="mb-8">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#002366]/40 mb-2">{entity.ref}</p>
                                        <h3 className="text-2xl font-black text-dark tracking-tight">{entity.name}</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-dark/60 hover:text-[#002366] transition-colors">{entity.email}</p>
                                        <p className="text-xs font-black uppercase tracking-widest text-[#002366]">{entity.phone}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Hub Infrastructure */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {[
                                {
                                    type: "Global Headquarters",
                                    label: "Institutional NCR",
                                    city: "Gurugram",
                                    address: "7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69.",
                                    ref: "Operational Ref: HQ_SYNC_2026"
                                },
                                {
                                    type: "Main Hub Operations",
                                    label: "Royal Heritage Hub",
                                    city: "Jaipur",
                                    address: "Vinayak Enclave, Jagatpura.",
                                    ref: "Satellite Office Strategy Hub"
                                }
                            ].map((hub, i) => (
                                <div key={i} className="relative p-12 bg-white rounded-[56px] border border-dark/5 overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 text-[100px] font-black text-dark/[0.02] leading-none pointer-events-none group-hover:text-[#002366]/[0.05] transition-all duration-1000">
                                        {hub.city === "Gurugram" ? "NCR" : "RP"}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#002366] bg-[#002366]/5 px-4 py-2 rounded-full">{hub.type}</span>
                                        </div>
                                        <h4 className="text-4xl font-black text-dark mb-2 tracking-tighter">{hub.label}</h4>
                                        <p className="text-2xl font-black text-[#002366] mb-8">{hub.city}</p>
                                        <div className="h-[1px] w-full bg-dark/5 mb-8" />
                                        <p className="text-xl text-dark/50 font-secondary leading-relaxed max-w-sm mb-12">
                                            {hub.address}
                                        </p>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 italic">
                                            {hub.ref}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
