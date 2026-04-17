"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const leaders = [
    {
        name: "Saurabh Jain",
        role: "Founder & CEO · Vega Vrudhi",
        vision: "Architecting high-performance field-force efficiency through algorithmic sales fulfillment for national growth engines.",
        focus: "Strategic Retail Expansion & End-to-End Lead conversion fulfillment across India's Tier 1 and 2 cities.",
        philosophy: "Building on-ground execution intelligence via precision managed sales infrastructure.",
        logo: "/VEGA.png",
        image: "/saurab jain sir .jpeg",
        id: "01"
    },
    {
        name: "Dheeraj Anand",
        role: "Founder & CEO · BWorth",
        vision: "Re-imagining luxury fashion as a circular asset, creating a global movement towards zero-landfill conscious consumerism.",
        focus: "Circular Luxury Fashion, Ethical Upcycling Ecosystems & Sustainable Global Value Chain Integration.",
        philosophy: "Redefining the value of waste through industrial-scale circular luxury fashion architecture.",
        logo: "/BWORTH.jpg",
        image: "/dheeraj sir.jpeg",
        id: "02"
    },
    {
        name: "Yograj Rundhanker",
        role: "Founder & CEO · RYM Grenergy",
        vision: "Enabling a carbon-neutral future by developing the world's greenest battery cell and intelligent green-tech infrastructure.",
        focus: "Clean Energy, AI/ML-driven IoT Innovations & Smart Energy Automation Systems.",
        philosophy: "Harnessing deep-tech intelligence to solve the world's most critical energy challenges.",
        logo: "https://rymgrenergy.com/images/logo.png",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
        id: "03"
    },
    {
        name: "Devam Srivastava",
        role: "Founder & CEO · Synchronous",
        vision: "Architecting high-velocity digital ecosystems for high-growth elite brands via algorithmic process automation.",
        focus: "Brand Identity Architecture, Autonomous AI Agents & Predictive Growth Modeling.",
        philosophy: "Scaling institutional legacies through the convergence of high-conversion engineering and supreme aesthetics.",
        logo: "/sync.jpg",
        logoBg: "bg-white",
        image: "/devam .jpeg",
        id: "04"
    },
    {
        name: "Aryan",
        role: "Strategic Partner · Global Growth",
        vision: "Integrating emerging market opportunities with core institutional values for sustained expansion.",
        focus: "Strategic Alliances, Market Expansion & Operational Scalability.",
        philosophy: "Expanding industrial footprints through collaborative strategic alliance and market intelligence.",
        logo: "/logo.png",
        image: "/aryan.png",
        id: "05"
    }
];

/* ── Orbital Network Animation ─────────────────────────────────── */
const entities = [
    { label: "Vega Vrudhi", angle: 0, tag: "Managed Sales" },
    { label: "BWorth", angle: 90, tag: "Circular Luxury" },
    { label: "RYM Grenergy", angle: 180, tag: "Clean Energy" },
    { label: "Synchronous", angle: 270, tag: "Autonomous AI" },
];

const OrbitalNetwork = () => {
    const cx = 320, cy = 320, r1 = 110, r2 = 200;
    return (
        <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
            <svg viewBox="0 0 640 640" className="w-full max-w-[680px] h-auto" fill="none">
                {/* Outer ring — slow spin */}
                <motion.circle
                    cx={cx} cy={cy} r={r2}
                    stroke="#001233" strokeWidth="0.6" strokeDasharray="6 10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                {/* Inner ring — reverse spin */}
                <motion.circle
                    cx={cx} cy={cy} r={r1}
                    stroke="#002366" strokeWidth="0.8" strokeDasharray="3 8"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                {/* Faint third ring */}
                <circle cx={cx} cy={cy} r={265} stroke="#001233" strokeWidth="0.3" strokeDasharray="2 14" opacity="0.3" />

                {/* Connecting lines from center to nodes */}
                {entities.map((e, i) => {
                    const rad = (e.angle * Math.PI) / 180;
                    const nx = cx + r2 * Math.cos(rad);
                    const ny = cy + r2 * Math.sin(rad);
                    return (
                        <motion.line
                            key={i} x1={cx} y1={cy} x2={nx} y2={ny}
                            stroke="#002366" strokeWidth="0.5" opacity="0.25"
                            animate={{ opacity: [0.15, 0.4, 0.15] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
                        />
                    );
                })}

                {/* Center hub — pulse rings */}
                <motion.circle cx={cx} cy={cy} r={28}
                    stroke="#002366" strokeWidth="1"
                    animate={{ r: [28, 48], opacity: [0.5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle cx={cx} cy={cy} r={28}
                    stroke="#002366" strokeWidth="1"
                    animate={{ r: [28, 48], opacity: [0.4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1.2, ease: "easeOut" }}
                />
                {/* Hub fill */}
                <circle cx={cx} cy={cy} r={26} fill="#001233" />
                <text x={cx} y={cy - 4} textAnchor="middle" fill="white" fontSize="7" fontFamily="Inter" fontWeight="900" letterSpacing="2">
                    RISE
                </text>
                <text x={cx} y={cy + 7} textAnchor="middle" fill="white" fontSize="7" fontFamily="Inter" fontWeight="900" letterSpacing="2">
                    MATE
                </text>

                {/* Orbiting entity nodes */}
                {entities.map((e, i) => {
                    const rad = (e.angle * Math.PI) / 180;
                    const nx = cx + r2 * Math.cos(rad);
                    const ny = cy + r2 * Math.sin(rad);
                    const lx = nx + (nx > cx ? 18 : -18);
                    const anchor = nx > cx ? "start" : "end";
                    return (
                        <g key={i}>
                            {/* Node outer ring */}
                            <motion.circle cx={nx} cy={ny} r={14}
                                stroke="#002366" strokeWidth="0.8" fill="#FAF9F6"
                                animate={{ scale: [1, 1.12, 1] }}
                                transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
                                style={{ transformOrigin: `${nx}px ${ny}px` }}
                            />
                            {/* Node center dot */}
                            <circle cx={nx} cy={ny} r={5} fill="#002366" opacity="0.7" />
                            {/* Index label */}
                            <text x={nx} y={ny + 1} textAnchor="middle" dominantBaseline="middle"
                                fill="#FAF9F6" fontSize="5" fontWeight="900" fontFamily="Inter">
                                0{i + 1}
                            </text>
                            {/* Entity name */}
                            <text x={lx} y={ny - 5} textAnchor={anchor} fill="#001233"
                                fontSize="7.5" fontWeight="700" fontFamily="Inter" opacity="0.85">
                                {e.label}
                            </text>
                            {/* Tag */}
                            <text x={lx} y={ny + 7} textAnchor={anchor} fill="#002366"
                                fontSize="5.5" fontFamily="Inter" opacity="0.45" letterSpacing="1">
                                {e.tag}
                            </text>
                        </g>
                    );
                })}

                {/* Scan line */}
                <motion.line
                    x1={cx} y1={cy - r2 - 20} x2={cx} y2={cy + r2 + 20}
                    stroke="#002366" strokeWidth="0.5" opacity="0.12"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
            </svg>
        </div>
    );
};

/* ── Marquee strip ──────────────────────────────────────────────── */
const Marquee = () => (
    <div className="overflow-hidden whitespace-nowrap py-6 border-y border-dark/5 pointer-events-none select-none bg-[#FAF9F6]">
        <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center"
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="text-[80px] md:text-[110px] font-black uppercase tracking-tighter text-dark/[0.06]">
                    Registry Governance
                </span>
            ))}
        </motion.div>
    </div>
);

/* ── Full-bleed leader row ──────────────────────────────────────── */
const LeaderRow = ({ leader, reverse }) => {
    return (
        <div
            className={`relative flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0 items-stretch border-b border-dark/8 group`}
        >
            {/* ── Photo panel ───────────────────────────── */}
            <div className="relative lg:w-[38%] overflow-hidden bg-[#001233] lg:min-h-full h-[600px]">
                <div className="absolute inset-0">
                    <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover object-top"
                        unoptimized={true}
                        style={{ color: "transparent" }}
                    />
                </div>

                {/* Subtle bottom gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001233]/40 via-transparent to-transparent" />

                {/* Subtle bottom gradient only — same as homepage */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001233]/60 via-transparent to-transparent" />

                {/* Executive badge */}
                <div className="absolute top-8 left-8 z-20">
                    <div className="bg-white/60 backdrop-blur-xl border border-dark/10 px-5 py-2 rounded-full">
                        <span className="text-[9px] font-black uppercase tracking-[0.45em] text-dark/70">
                            Executive Tier {leader.id}
                        </span>
                    </div>
                </div>

                {/* Logo badge */}
                {leader.logo && (
                    <div className="absolute bottom-8 right-8 z-20">
                        <div className={`w-14 h-14 ${leader.logoBg || "bg-white"} rounded-2xl shadow-xl p-3 border border-dark/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-700`}>
                            <Image src={leader.logo} alt="Company Logo" width={40} height={40} className="object-contain" unoptimized={true} />
                        </div>
                    </div>
                )}

                {/* Index number watermark */}
                <div className="absolute bottom-4 left-8 z-10 text-[120px] font-black leading-none text-dark/[0.05] pointer-events-none">
                    {leader.id}
                </div>
            </div>

            {/* ── Content panel ─────────────────────────── */}
            <div className={`relative lg:w-[62%] flex flex-col justify-center p-10 md:p-16 lg:p-24 bg-white ${reverse ? "items-end text-right" : "items-start text-left"}`}>
                {/* Thin accent line on edge */}
                <div className={`absolute top-0 ${reverse ? "right-0" : "left-0"} h-full w-[3px] bg-gradient-to-b from-transparent via-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                {/* Name */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-dark tracking-tighter leading-none mb-3 group-hover:text-blue-700 transition-colors duration-700">
                    {leader.name}
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 mb-12 italic">
                    {leader.role}
                </p>

                {/* Philosophy quote */}
                <div className={`mb-10 max-w-xl ${reverse ? "border-r-2 pr-8" : "border-l-2 pl-8"} border-blue-600/25`}>
                    <p className="text-lg md:text-xl text-dark/65 font-medium leading-relaxed italic">
                        "{leader.philosophy}"
                    </p>
                </div>

                {/* Vision + Focus grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl mb-12">
                    <div>
                        <h5 className="text-[9px] font-black uppercase tracking-[0.35em] text-blue-600/60 mb-3">Strategic Vision</h5>
                        <p className="text-sm text-dark/50 leading-relaxed">{leader.vision}</p>
                    </div>
                    <div>
                        <h5 className="text-[9px] font-black uppercase tracking-[0.35em] text-dark/30 mb-3">Core Focus</h5>
                        <p className="text-sm text-dark/50 leading-relaxed">{leader.focus}</p>
                    </div>
                </div>

                {/* Footer row */}
                <div className="flex items-center gap-6 pt-8 border-t border-dark/8 w-full max-w-xl">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-dark/25">Verified Institutional Lead</span>
                    </div>
                    <Link href="/contact" className="group/link flex items-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-dark/50 border-b border-transparent group-hover/link:border-blue-600 group-hover/link:text-dark transition-all py-1">
                            Connect
                        </span>
                        <div className="w-8 h-8 rounded-full bg-dark/5 border border-dark/10 text-dark flex items-center justify-center group-hover/link:bg-blue-600 group-hover/link:text-white group-hover/link:border-blue-600 transition-all duration-500">
                            <span className="material-symbols-outlined text-[11px]">north_east</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

/* ── Page ───────────────────────────────────────────────────────── */
export default function Leadership() {
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
    const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

    return (
        <div className="bg-white min-h-screen selection:bg-blue-600 selection:text-white">
            <Navbar />

            <main className="pt-16">
                {/* ── HERO ──────────────────────────────── */}
                <section ref={heroRef} className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden py-10 md:py-16 px-6 md:px-24 bg-[#FAF9F6]">
                    {/* Ambient glow */}
                    <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-blue-600/6 blur-[200px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/40 blur-[180px] rounded-full pointer-events-none" />

                    {/* Subtle dot grid */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,18,51,0.05) 1px, transparent 1px)",
                        backgroundSize: "48px 48px"
                    }} />

                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="max-w-[1700px] mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* ── Left: Text Content ── */}
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-4 mb-10"
                            >
                                <span className="h-[1px] w-16 bg-blue-600/50" />
                                <span className="text-[10px] font-black uppercase tracking-[0.7em] text-blue-600/70">Registry Governance</span>
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] text-dark tracking-tighter mb-12"
                            >
                                Institutional<br />
                                <span className="text-dark/15 italic">Architects.</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.35 }}
                                className="flex flex-col gap-10"
                            >
                                <p className="text-lg md:text-xl text-dark/45 font-secondary leading-relaxed max-w-lg">
                                    The executive governance behind RiseMate Venture. Each leader operates at the nexus of institutional stability and regional opportunity.
                                </p>

                                {/* Stat pills */}
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { num: "04", label: "Leaders" },
                                        { num: "4+", label: "Entities" },
                                        { num: "1.2B+", label: "Capital" }
                                    ].map((s) => (
                                        <div key={s.label} className="flex flex-col items-center bg-white border border-dark/5 rounded-2xl px-6 py-4 shadow-sm">
                                            <span className="text-2xl font-black text-dark tracking-tighter">{s.num}</span>
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-dark/35 mt-1">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Right: Orbital Network ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            className="hidden lg:flex items-center justify-center h-[560px]"
                        >
                            <OrbitalNetwork />
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── Marquee ─────────────────────────────── */}
                <Marquee />

                {/* ── LEADER ROWS ─────────────────────────── */}
                <section className="relative">
                    {leaders.map((leader, i) => (
                        <LeaderRow key={leader.id} leader={leader} reverse={i % 2 !== 0} />
                    ))}
                </section>

                {/* ── INSTITUTIONAL MANDATE ───────────────── */}
                <section className="relative py-20 md:py-32 overflow-hidden bg-dark text-white">
                    {/* Background warm glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[800px] h-[800px] bg-blue-900/30 blur-[200px] rounded-full" />
                    </div>

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />

                    <div className="container-wide relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="inline-flex items-center gap-4 mb-10">
                                <span className="h-[1px] w-12 bg-white/20" />
                                <span className="text-[10px] font-black uppercase tracking-[0.65em] text-white/40">Governance Standard</span>
                                <span className="h-[1px] w-12 bg-white/20" />
                            </span>

                            <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter text-white">
                                Unified Collective<br />
                                <span className="text-white/20 italic">Excellence</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-white/35 font-secondary max-w-3xl mx-auto italic mb-16 leading-relaxed">
                                "Our leadership is defined not by individual success, but by the sovereign performance of the conglomerate as a unified architectural unit."
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-5 group bg-white text-dark px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.45em] hover:bg-blue-600 hover:text-white transition-all duration-700 shadow-[0_20px_60px_rgba(0,18,51,0.3)]"
                            >
                                Join the Executive Network
                                <span className="material-symbols-outlined group-hover:rotate-45 transition-transform duration-500">north_east</span>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
