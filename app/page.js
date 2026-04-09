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
        <span className="text-xs font-black uppercase tracking-[0.5em] text-[#002366]/60 leading-none">{children}</span>
    </motion.div>
);

const RevealText = ({ text, className = "", delay = 0 }) => {
    const letters = text.split("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <span ref={ref} className={`inline-block ${className}`}>
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
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <motion.div ref={ref} style={{ opacity, scale }}>
            {children}
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

const FounderCard = ({ founder }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            whileHover={{ y: -15 }}
            className="group relative p-10 md:p-14 rounded-[40px] bg-white border border-dark/5 hover:border-[#002366]/30 hover:shadow-[0_60px_100px_-30px_rgba(37,99,235,0.1)] transition-all duration-1000 overflow-hidden"
        >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-96 h-96 bg-[#002366]/[0.03] rounded-full -translate-y-48 translate-x-48 blur-[100px] transition-all duration-1000 ${isInView ? 'scale-150' : 'scale-50 opacity-0'}`} />

            <div className="relative z-10 flex flex-col h-full gap-12">
                {/* Header Section */}
                <div className="flex justify-between items-start gap-8">
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-1.5 bg-[#002366] rounded-full" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#002366]/60">Executive Lead</p>
                        </div>
                        <motion.h4 className="text-3xl md:text-5xl font-black text-dark mb-2 tracking-tighter transition-colors group-hover:text-[#002366] leading-none">
                            {founder.name}
                        </motion.h4>
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-dark/30 italic">{founder.role}</p>
                    </div>

                    {founder.logo && (
                        <div className="w-16 h-16 bg-white rounded-2xl p-3 border border-dark/5 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                            <Image src={founder.logo} alt={founder.name} width={40} height={40} className="object-contain" unoptimized={true} />
                        </div>
                    )}
                </div>

                {/* Primary Philosophy Quote */}
                <div className="relative pt-4">
                    <span className="absolute -top-4 -left-4 text-8xl font-serif text-[#002366]/5 select-none font-black italic group-hover:text-[#002366]/10 transition-colors">“</span>
                    <p className="text-lg md:text-xl font-medium text-dark/80 font-secondary leading-snug pl-6 border-l-2 border-[#002366]/20 group-hover:border-[#002366] transition-all duration-1000 ease-in-out py-2 italic">
                        {founder.philosophy}
                    </p>
                </div>

                {/* Institutional Mandate Section */}
                <div className="mt-auto pt-10 border-t border-dark/5">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="h-[2px] w-14 bg-dark/10 group-hover:bg-[#002366]/40 group-hover:w-20 transition-all duration-1000" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-dark/20 group-hover:text-[#002366]/40 transition-colors whitespace-nowrap">Institutional Mandate</p>
                    </div>
                    <p className="text-sm font-black text-dark/40 uppercase tracking-[0.2em] leading-relaxed group-hover:text-dark transition-colors duration-700">
                        {founder.focus}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const founders = [
    {
        name: "Saurabh Jain",
        role: "Founder & CEO · Vega Vrudhi",
        philosophy: "Building on-ground execution intelligence via precision managed sales infrastructure.",
        focus: "Strategic Retail Expansion & End-to-End Lead conversion fulfillment across India's Tier 1 and 2 cities.",
        logo: "/VEGA.png"
    },
    {
        name: "Dheeraj Anand",
        role: "Founder & CEO · BWorth",
        philosophy: "Redefining the value of waste through industrial-scale circular luxury fashion architecture.",
        focus: "Circular Luxury Fashion, Ethical Upcycling Ecosystems & Sustainable Global Value Chain Integration.",
        logo: "/BWORTH.jpg"
    },
    {
        name: "Yograj Rundhanker",
        role: "Founder & CEO · RYM Grenergy",
        philosophy: "Harnessing deep-tech intelligence to solve critical energy challenges.",
        focus: "Clean Energy, AI/ML-driven IoT Innovations & Smart Energy Automation Systems.",
        logo: "https://rymgrenergy.com/images/logo.png"
    },
    {
        name: "Devam Srivastava",
        role: "Founder & CEO · Synchronous",
        philosophy: "Scaling institutional legacies through the convergence of high-conversion engineering and aesthetics.",
        focus: "Brand Identity Architecture, Autonomous AI Agents & Predictive Growth Modeling.",
        logo: "/sync.jpg"
    }
];

const portfolioItems = [
    {
        title: "BWorth",
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
        desc: "Revolutionizing the fashion industry through a unique circular luxury ecosystem. Buy, sell, and recycle fashion while earning rewards through our unique buyback program that preserves the planet's beauty.",
        tag: "Circular Luxury",
        tagline: "Sustainable Fashion Innovation Leader",
        logo: "/BWORTH.jpg"
    },
    {
        title: "Vega Vrudhi",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2670&auto=format&fit=crop",
        desc: "Precision execution architecture bridging the gap between digital leads and on-ground reality. We deploy trained field teams to accelerate market presence for national growth engines.",
        tag: "Managed Sales",
        tagline: "Precision Execution & Growth Architecture",
        logo: "/VEGA.png"
    },
    {
        title: "RYM Grenergy",
        img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2670&auto=format&fit=crop",
        desc: "Enabling a carbon-neutral future by developing the world’s greenest battery cell and intelligent green-tech infrastructure through AI, IoT, and Smart Automation.",
        tag: "Clean Energy",
        tagline: "Intelligent Systems & Deep-Tech Engineering",
        logo: "https://rymgrenergy.com/images/logo.png"
    },
    {
        title: "Synchronous",
        img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop",
        desc: "Architecting high-velocity digital ecosystems for high-growth elite brands. We build vertically integrated brand identities and compound ROI via algorithmic process automation.",
        tag: "Autonomous AI",
        tagline: "High-Performance Digital Marketing Group",
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
                {/* 1. HERO SECTION - CINEMATIC ENTRANCE */}
                <section className="relative h-screen flex items-center bg-[#fdfdfd] pt-16 overflow-hidden">
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.05, 1],
                            rotate: [0, 1, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,#e0ebf5cc,transparent_50%)] pointer-events-none"
                    />

                    <div className="max-w-[1700px] mx-auto px-6 md:px-14 w-full relative z-10 h-full flex flex-col justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                            {/* LEFT: IMAGE REVEAL & PARALLAX */}
                            <motion.div
                                variants={imageReveal}
                                initial="initial"
                                animate="animate"
                                className="lg:col-span-7 relative flex justify-center py-2 perspective-1000"
                            >
                                <motion.div
                                    whileHover={{ rotateY: 5, rotateX: -5 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-full max-w-[850px] aspect-[4/5] max-h-[50vh] md:max-h-[65vh] rounded-[32px] md:rounded-[60px] overflow-hidden shadow-[0_60px_100px_-30px_rgba(0,18,51,0.2)] bg-dark group preserve-3d"
                                >
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
                                </motion.div>
                            </motion.div>

                            {/* RIGHT: TYPOGRAPHY PERFECTION */}
                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="lg:col-span-5 relative w-full py-2"
                            >
                                <motion.div variants={fadeInUp} className="mb-4">
                                    <div className="flex items-center gap-4 mb-4 overflow-hidden">
                                        <motion.div
                                            initial={{ x: -100 }}
                                            animate={{ x: 0 }}
                                            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            className="h-[2px] w-12 bg-[#002366]"
                                        />
                                        <RevealText
                                            text="Sovereign Industrial Brand"
                                            className="text-xs font-black uppercase tracking-[0.6em] text-[#002366]/80"
                                            delay={0.4}
                                        />
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-[100px] font-black text-dark mb-6 leading-[0.95] tracking-tighter">
                                        <RevealText text="Building our" delay={0.5} /> <br />
                                        <RevealText text="Legacy." delay={0.8} />
                                    </h1>

                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-sm md:text-base text-dark/40 font-medium leading-relaxed font-secondary max-w-lg mb-6"
                                    >
                                        We operate at the nexus of <span className="text-[#002366]">institutional stability</span> and regional opportunity, bridging global capital with high-growth entities to secure your <span className="text-dark font-black">sovereign industrial future</span>.
                                    </motion.p>

                                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 items-center">
                                        <Magnetic>
                                            <Link href="/contact" className="group relative inline-flex items-center bg-[#002366] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-700 hover:scale-105 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]">
                                                <span className="relative z-10">Become A Partner</span>
                                                <div className="absolute inset-0 bg-dark translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                                            </Link>
                                        </Magnetic>
                                        <Link href="/portfolio" className="group text-[10px] font-black uppercase tracking-[0.3em] text-dark flex items-center gap-2 hover:gap-4 transition-all duration-500">
                                            <span>Explore</span>
                                            <div className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center group-hover:bg-[#002366] group-hover:text-white transition-all duration-500">
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                </motion.div>

                                {/* STAGGERED STATS */}
                                <motion.div
                                    variants={staggerContainer}
                                    className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-dark/5"
                                >
                                    {[
                                        { val: 4, suffix: "+", label: "Sovereign Entities", color: "bg-[#e0ebf5]", text: "text-[#003380]" },
                                        { val: 10000, suffix: "+", label: "Growth Impact", color: "bg-[#fde8d8]", text: "text-dark" }
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            variants={fadeInUp}
                                            className={`p-4 ${stat.color} rounded-[20px] border border-white/50 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 group`}
                                        >
                                            <h4 className={`text-xl md:text-2xl font-black ${stat.text} mb-1 tracking-tighter`}>
                                                <Counter value={stat.val} />{stat.suffix}
                                            </h4>
                                            <p className="text-[8px] font-black text-dark/30 uppercase tracking-[0.2em] leading-none group-hover:text-dark/60 transition-colors">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
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
                                            <motion.h4 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-dark tracking-tighter">
                                                <Counter value={10000} />+
                                            </motion.h4>
                                            <motion.p variants={fadeInUp} className="text-[10px] font-black text-dark/30 uppercase tracking-[0.5em]">Growth Optimization Cycles</motion.p>
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

                {/* 3. CORE VALUES - REFINED STACKS */}
                <ScrollReveal>
                    <section className="py-8 md:py-16 bg-[#f8f9fa] relative overflow-hidden">
                        <div className="container-wide relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                                <motion.div
                                    variants={sectionAnimation}
                                    initial="initial"
                                    whileInView="whileInView"
                                    className="lg:col-span-12"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-end mb-8">
                                        <div className="md:w-3/5">
                                            <SectionLabel>Core Principles</SectionLabel>
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark leading-[1.1] tracking-tight">
                                                Elevating <span className="text-[#002366] font-normal italic font-serif">Global</span> Standards
                                            </h2>
                                        </div>
                                        <div className="md:w-2/5">
                                            <p className="text-lg text-dark/40 font-secondary leading-tight italic border-l-4 border-[#002366]/30 pl-6">
                                                "We combine deep market expertise with a commitment to sustainable value creation."
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    {[
                                        {
                                            title: "Our Vision",
                                            icon: "token",
                                            color: "text-[#002366]",
                                            bg: "bg-[#f0f7ff]/50 hover:bg-[#002366] hover:text-white",
                                            desc: "To be the definitive bridge between global investors and India's dynamic growth sectors, setting new benchmarks for transparency and institutional performance."
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
                                            className={`group p-8 md:p-10 bg-white rounded-[32px] border border-dark/5 transition-all duration-1000 ease-in-out hover:shadow-[0_40px_80px_-20px_rgba(0,18,51,0.05)]`}
                                        >
                                            <div className="flex flex-col gap-6">
                                                <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-700 bg-dark text-white group-hover:scale-110 group-hover:rotate-6`}>
                                                    <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-dark mb-2 tracking-tighter">{card.title}</h3>
                                                    <p className="text-base text-dark/30 font-secondary leading-tight italic transition-colors duration-700 group-hover:text-dark/80">
                                                        "{card.desc}"
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-x-10 group-hover:translate-x-0">
                                                    <div className="h-[2px] w-10 bg-[#002366]" />
                                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#002366]">Institutional Mandate</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </ScrollReveal>

                {/* 4. LEADERSHIP - ARCHITECTS STAGGER */}
                <ScrollReveal>
                    <section className="py-8 md:py-16 bg-white overflow-hidden">
                        <div className="container-wide">
                            <motion.div
                                variants={sectionAnimation}
                                initial="initial"
                                whileInView="whileInView"
                                className="flex flex-col md:flex-row justify-between items-end mb-8 lg:mb-12"
                            >
                                <div className="max-w-4xl">
                                    <SectionLabel>Executive Governance</SectionLabel>
                                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-dark leading-[1.1] tracking-tight">
                                        Architects <br />of the <span className="text-[#002366] font-normal italic font-serif">Future</span>
                                    </h2>
                                </div>
                                <p className="text-xl text-dark/30 font-secondary mt-8 md:mt-0 max-w-xs md:text-right italic">
                                    Driving institutional excellence through visionary leadership across four sovereign entities.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="animate"
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto"
                            >
                                {founders.map((founder, idx) => (
                                    <FounderCard key={idx} founder={founder} />
                                ))}
                            </motion.div>
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

                            {/* Sovereign Brand Banner */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-white border border-dark/5 p-6 md:p-10 rounded-[32px] md:rounded-[48px] mb-12 shadow-[0_40px_100px_-20px_rgba(0,18,51,0.08)] flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/[0.03] to-transparent pointer-events-none" />
                                <div className="flex items-center gap-8 relative z-10">
                                    <Link href="/" className="relative w-40 h-10 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                        <Image src="/logo.png" alt="RiseMate Venture" fill className="object-contain object-left" />
                                    </Link>
                                    <div className="h-8 w-[1px] bg-dark/10 hidden md:block" />
                                    <div className="flex flex-col">
                                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#002366] leading-tight mb-1">RiseMate Venture</p>
                                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-dark/30 leading-tight">Overarching Sovereign Entity</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 relative z-10">
                                    <div className="hidden lg:flex gap-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-1.5 h-1.5 bg-[#002366] rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                                        ))}
                                    </div>
                                    <Magnetic>
                                        <Link href="/portfolio" className="text-[9px] font-black uppercase tracking-[0.4em] text-[#002366] bg-[#f0f7ff] px-8 py-4 rounded-full hover:bg-dark hover:text-white transition-all duration-700">
                                            Sovereign Directory
                                        </Link>
                                    </Magnetic>
                                </div>
                            </motion.div>

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

                {/* 6. CTA SECTION - LIGHT INTEGRATION */}
                <section className="py-8 md:py-16 bg-white text-dark overflow-hidden relative border-t border-dark/5">
                    <div className="container-wide relative z-10 text-center">
                        <motion.div
                            variants={sectionAnimation}
                            initial="initial"
                            whileInView="whileInView"
                        >
                            <SectionLabel>Nexus Collective</SectionLabel>
                            <h2 className="text-4xl md:text-7xl lg:text-[100px] font-black mb-12 tracking-tight leading-[1.1]">
                                Ready to build <br /> the <span className="text-[#002366] font-normal italic font-serif">Nexus?</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-dark/30 font-secondary max-w-2xl mx-auto mb-16 px-6 leading-tight">
                                Join a circle of institutional excellence and high-velocity growth in India's leading economic hubs.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                                <Link href="/contact" className="group relative bg-dark text-white px-16 py-6 rounded-[32px] text-xs font-black uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:scale-110 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
                                    <span className="relative z-10">Initialize Partnership</span>
                                    <div className="absolute inset-0 bg-[#002366] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                                </Link>
                                <Link href="/about" className="group bg-dark/5 backdrop-blur-xl border border-dark/10 text-dark px-16 py-6 rounded-[32px] text-xs font-black uppercase tracking-[0.5em] hover:bg-dark hover:text-white transition-all duration-1000">
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
