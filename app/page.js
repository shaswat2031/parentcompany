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
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const smoothY = useSpring(y, { stiffness: 40, damping: 20 });

    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.9, 1, 1, 0.9]);

    return (
        <div ref={ref} className="group relative py-20 md:py-40 lg:py-64">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center`}>
                {/* Image Side */}
                <motion.div
                    style={{ opacity, scale }}
                    className={`lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] md:rounded-[64px] bg-dark/5 shadow-[0_60px_120px_-20px_rgba(0,18,51,0.2)]">
                        <motion.div style={{ y: smoothY, scale: 1.3 }} className="absolute inset-0">
                            <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                className="object-cover transition-opacity duration-1000 group-hover:opacity-90"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                    {/* Index Floating */}
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className={`absolute -top-12 ${isEven ? '-right-12' : '-left-12'} w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center z-20 md:flex hidden border border-dark/5 group-hover:bg-blue-600 transition-all duration-700 ease-in-out`}
                    >
                        <span className="text-4xl font-black text-dark/10 group-hover:text-white transition-colors duration-700">0{index + 1}</span>
                    </motion.div>
                </motion.div>

                {/* Content Side */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div
                        variants={sectionAnimation}
                        initial="initial"
                        whileInView="whileInView"
                        exit="exit"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <span className="px-5 py-2 bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-[0.2em] rounded-full">{item.tag}</span>
                            <div className="h-[1px] flex-grow bg-dark/5"></div>
                        </div>
                        {item.tagline && (
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6 italic flex items-center gap-3">
                                <span className="w-6 h-[1px] bg-blue-600/30"></span>
                                {item.tagline}
                            </p>
                        )}
                        <h3 className="text-4xl md:text-7xl font-black text-dark mb-8 leading-[1.1] tracking-tighter">
                            {item.title}
                        </h3>
                        <p className="text-xl text-dark/40 font-secondary leading-relaxed mb-12 max-w-md">
                            {item.desc}
                        </p>
                        <Link href="/portfolio" className="inline-flex items-center gap-8 text-sm font-black uppercase tracking-[0.4em] text-dark group/link">
                            <span className="relative">
                                View Case Study
                                <span className="absolute -bottom-3 left-0 w-8 h-[2px] bg-blue-600 transition-all duration-700 group-hover/link:w-full"></span>
                            </span>
                            <div className="w-16 h-16 border border-dark/10 rounded-full flex items-center justify-center group-hover/link:bg-dark group-hover/link:text-white transition-all duration-700 group-hover/link:translate-x-4">
                                <span className="material-symbols-outlined text-2xl group-hover/link:rotate-45 transition-transform">north_east</span>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
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
                <div className="flex flex-col gap-10">
                    <div>
                        <motion.h4
                            className="text-2xl md:text-3xl font-black text-dark mb-2 transition-colors group-hover:text-blue-600"
                        >
                            {founder.name}
                        </motion.h4>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600/80">{founder.role}</p>
                    </div>

                    <p className="text-xl text-dark/50 font-secondary leading-tight italic border-l-4 border-gold/20 pl-6 group-hover:border-blue-600 transition-all duration-1000 ease-in-out">
                        "{founder.philosophy || founder.vision}"
                    </p>

                    <div className="pt-12 border-t border-dark/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-dark/20 mb-4">Institutional Focus</p>
                        <p className="text-base font-bold text-dark/70 uppercase tracking-widest group-hover:text-dark transition-colors duration-700">{founder.focus}</p>
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
        desc: "Revolutionizing the fashion industry through a unique circular luxury ecosystem. Buy, sell, and recycle fashion while earning rewards.",
        tag: "Sustainable Fashion",
        tagline: "Circular Economy Mastery"
    },
    {
        title: "Vega Vrudhi",
        img: "https://images.unsplash.com/photo-1600880212340-0234403d18ff?q=80&w=2670&auto=format&fit=crop",
        desc: "Precision execution architecture bridging the gap between digital leads and on-ground reality through managed sales and activation.",
        tag: "Growth Architecture",
        tagline: "Execution Intelligence"
    },
    {
        title: "RYM Grenergy",
        img: "https://images.unsplash.com/photo-1509391366360-fe5bb6058826?q=80&w=2670&auto=format&fit=crop",
        desc: "Enabling a carbon-neutral future through intelligent energy management, AI-driven document intelligence, and smart automation.",
        tag: "Inelligent Systems",
        tagline: "Sustainable Infrastructure"
    },
    {
        title: "Synchronous",
        img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop",
        desc: "Architecting high-velocity digital ecosystems for elite brands using autonomous AI agents and data-backed growth strategies.",
        tag: "Digital Marketing",
        tagline: "Autonomous Growth Engines"
    },
];

const founders = [
    {
        name: "Saurabh Jain",
        role: "Founder & CEO · Vega Vrudhi",
        vision: "Scaling on-ground execution through AI/ML-driven precision.",
        focus: "Managed sales & growth engines.",
        philosophy: "Numbers don't lie, but passion drives them."
    },
    {
        name: "Dheeraj Anand",
        role: "Founder & CEO · BWorth",
        focus: "Circular luxury & sustainable upcycling.",
        philosophy: "BWorth is more than just a company; it is a movement towards conscious consumerism."
    },
    {
        name: "Yograj Rundhanker",
        role: "Founder & CEO · RYM Grenergy",
        focus: "AI/ML, IoT & Clean-Tech infrastructure.",
        philosophy: "Enabling the future of energy by developing the world’s greenest battery cell."
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                            {/* LEFT: IMAGE REVEAL & PARALLAX */}
                            <motion.div
                                variants={imageReveal}
                                initial="initial"
                                animate="animate"
                                className="relative flex justify-center py-2"
                            >
                                <div className="relative w-full max-w-[700px] aspect-[4/5] max-h-[55vh] md:max-h-[65vh] rounded-[48px] md:rounded-[80px] overflow-hidden shadow-[0_60px_100px_-30px_rgba(0,18,51,0.2)] bg-dark group">
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
                                            className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                                            priority
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

                                    {/* Floating Stats or Labels */}
                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-2xl px-6 py-4 rounded-[24px] flex justify-between items-center shadow-2xl border border-white/20"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                                                <span className="text-[12px] font-black text-white uppercase tracking-[0.5em]">Live Integration</span>
                                            </div>
                                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-[0.2em] ml-5">Ref: NEXUS_HUB_01</p>
                                        </div>
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center overflow-hidden">
                                                    <span className="material-symbols-outlined text-white text-sm">hub</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* RIGHT: TYPOGRAPHY PERFECTION */}
                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="relative w-full py-2"
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
                                        <RevealText text="Building your next" /> <br />

                                        <RevealText text="Legacy." />
                                    </h1>

                                    <motion.p
                                        variants={fadeInUp}
                                        className="text-sm md:text-base text-dark/40 font-medium leading-relaxed font-secondary max-w-md mb-6"
                                    >
                                        RiseMate Venture operates at the nexus of institutional stability and regional opportunity, connecting global capital with high-growth entities.
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
                <section id="about" className="py-40 md:py-64 bg-white relative overflow-hidden">
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
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
                            <motion.div
                                variants={sectionAnimation}
                                initial="initial"
                                whileInView="whileInView"
                                className="lg:col-span-12 mb-40"
                            >
                                <div className="flex flex-col md:flex-row gap-24 items-end">
                                    <div className="md:w-3/5">
                                        <SectionLabel>Strategic Nexus: NCR & Jaipur</SectionLabel>
                                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-dark leading-[1.1] tracking-tight">
                                            Architectural <br /><span className="text-blue-600">Precision</span> <br /> In Growth
                                        </h2>
                                    </div>
                                    <div className="md:w-2/5 space-y-12">
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
                                    className="lg:col-span-4 space-y-20"
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
                <section className="py-40 md:py-64 bg-[#f8f9fa] relative overflow-hidden">
                    <div className="container-wide relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-start">
                            <motion.div
                                variants={sectionAnimation}
                                initial="initial"
                                whileInView="whileInView"
                                className="lg:col-span-5 lg:sticky lg:top-40"
                            >
                                <SectionLabel>Core Principles</SectionLabel>
                                <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-dark mb-10 leading-[1.1] tracking-tight">
                                    Elevating <br />
                                    <span className="text-blue-600 font-normal italic font-serif tracking-tight pr-4">Global</span> <br />
                                    Standards
                                </h2>
                                <p className="text-2xl text-dark/40 font-secondary leading-tight max-w-sm mb-16">
                                    We combine deep market expertise with a commitment to sustainable value creation.
                                </p>
                                <div className="hidden lg:block w-32 h-32 rounded-full border-4 border-dashed border-dark/5 animate-spin-slow" />
                            </motion.div>

                            <div className="lg:col-span-7 space-y-16">
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
                                        className={`group p-16 md:p-24 bg-white rounded-[64px] border border-dark/5 transition-all duration-1000 ease-in-out hover:shadow-[0_80px_160px_-40px_rgba(0,18,51,0.1)]`}
                                    >
                                        <div className="flex flex-col gap-12">
                                            <div className={`w-28 h-28 rounded-[40px] flex items-center justify-center transition-all duration-700 bg-dark text-white group-hover:scale-110 group-hover:rotate-6`}>
                                                <span className="material-symbols-outlined text-5xl">{card.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-4xl font-black text-dark mb-8 tracking-tighter">{card.title}</h3>
                                                <p className="text-3xl md:text-4xl text-dark/30 font-secondary leading-[1.1] italic transition-colors duration-700 group-hover:text-dark/80">
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
                <section className="py-40 md:py-64 bg-white overflow-hidden">
                    <div className="container-wide">
                        <motion.div
                            variants={sectionAnimation}
                            initial="initial"
                            whileInView="whileInView"
                            className="flex flex-col md:flex-row justify-between items-end mb-40 lg:mb-56"
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
                            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
                        >
                            {founders.map((founder, idx) => (
                                <FounderCard key={idx} founder={founder} />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 5. PORTFOLIO - CINEMATIC IMMERSION */}
                <section id="portfolio" className="py-40 md:py-64 bg-[#fdfdfd] overflow-hidden relative">
                    {/* Background Grids */}
                    <div className="absolute inset-0 grid grid-cols-12 opacity-[0.03] pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-r border-dark h-full" />
                        ))}
                    </div>

                    <div className="container-wide relative z-10">
                        {/* Section Header */}
                        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-end mb-40 md:mb-80">
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
                            <div className="lg:col-span-3 lg:text-right w-full">
                                <motion.div variants={fadeInUp}>
                                    <Link href="/portfolio" className="group relative inline-flex items-center gap-6 bg-dark text-white px-12 py-7 rounded-[32px] text-[12px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all duration-700 hover:scale-105">
                                        <span className="relative z-10">Full Directory</span>
                                        <div className="absolute inset-0 bg-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Portfolio List with extreme scroll depth */}
                        <div className="flex flex-col gap-40 md:gap-80">
                            {portfolioItems.map((item, idx) => (
                                <PortfolioItem key={idx} item={item} index={idx} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. CTA SECTION - PERSPECTIVE SHIFT */}
                <section className="py-64 md:py-96 bg-dark text-white overflow-hidden relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb44,transparent_70%)] pointer-events-none"
                    />

                    {/* Floating elements for depth */}
                    <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white/5 rounded-full animate-spin-slow" />
                    <div className="absolute bottom-40 left-10 w-64 h-64 border border-white/5 rounded-full animate-pulse" />

                    <div className="container-wide relative z-10 text-center">
                        <motion.div
                            variants={sectionAnimation}
                            initial="initial"
                            whileInView="whileInView"
                        >
                            <SectionLabel>Nexus Collective</SectionLabel>
                            <h2 className="text-4xl md:text-7xl lg:text-9xl font-black mb-16 tracking-tight leading-[1.1]">
                                Ready to build <br /> the <span className="text-blue-500 font-normal italic font-serif">Nexus?</span>
                            </h2>
                            <p className="text-2xl md:text-3xl text-white/40 font-secondary max-w-3xl mx-auto mb-24 px-6 leading-tight">
                                Join a circle of institutional excellence and high-velocity growth in India's leading economic hubs.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                                <Link href="/contact" className="group relative bg-blue-600 text-white px-20 py-8 rounded-[40px] text-xs font-black uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:scale-110 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.4)]">
                                    <span className="relative z-10">Initialize Partnership</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                                    <div className="absolute inset-0 bg-dark scale-0 group-hover:scale-100 transition-transform duration-700 delay-100 rounded-full" />
                                </Link>
                                <Link href="/about" className="group bg-white/5 backdrop-blur-xl border border-white/10 text-white px-20 py-8 rounded-[40px] text-xs font-black uppercase tracking-[0.5em] hover:bg-white hover:text-dark transition-all duration-1000">
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
