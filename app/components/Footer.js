"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="relative bg-dark text-white pt-12 pb-8 overflow-hidden">
            {/* Abstract Background Decoration */}
            <motion.div 
                animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} 
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" 
            />
            <motion.div 
                animate={{ x: [0, -40, 0], y: [0, 20, 0], scale: [1, 1.2, 1] }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" 
            />
            
            <div className="container-wide relative z-10">
                {/* CTA SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-10">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[1] tracking-tighter">
                                Ready to Build <br />
                                <span className="text-gold">the Future?</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/50 font-secondary leading-relaxed max-w-2xl">
                                Join our network of strategic partners and visionaries. <br className="hidden md:block" />
                                Let's create lasting impact together.
                            </p>
                        </motion.div>
                    </div>
                    
                    <div className="lg:col-span-4 lg:flex justify-end">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            <Link 
                                href="/contact" 
                                className="group relative inline-flex items-center justify-center w-48 h-48 md:w-64 md:h-64 border border-white/20 rounded-full hover:bg-white hover:text-dark transition-all duration-700"
                            >
                                <div className="text-center relative z-10 transition-transform duration-700 group-hover:scale-110">
                                    <span className="block text-lg font-black uppercase tracking-widest mb-2">Get in Touch</span>
                                    <span className="material-symbols-outlined text-4xl group-hover:rotate-45 transition-transform duration-500">north_east</span>
                                </div>
                                
                                {/* Continuous Spinning Text */}
                                <motion.div 
                                    className="absolute inset-0 p-4"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                >
                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                        <defs>
                                            <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                                        </defs>
                                        <text className="fill-white/30 text-[10px] font-black uppercase tracking-[0.5em] group-hover:fill-dark/20 transition-colors duration-700">
                                            <textPath href="#circlePath">
                                                Initialize Strategic Integration • Initialize Strategic Integration •
                                            </textPath>
                                        </text>
                                    </svg>
                                </motion.div>
                                
                                <div className="absolute inset-2 border border-dashed border-white/5 rounded-full group-hover:rotate-90 transition-transform duration-1000" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* MIDDLE DIVIDER */}
                <div className="h-[1px] w-full bg-white/10 mb-8" />

                {/* BOTTOM SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-8">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter group">
                            RISEMATE <span className="text-gold transition-all duration-500 group-hover:tracking-widest">VENTURE</span>
                        </Link>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 RISEMATE VENTURE. ALL RIGHTS RESERVED.</p>
                    </div>

                    <div className="flex items-center gap-10">
                        <Link href="/privacy" className="text-xs font-bold text-white/40 hover:text-white transition-all uppercase tracking-[0.2em] relative group">
                            Privacy Policy
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                        </Link>
                        <Link href="/terms" className="text-xs font-bold text-white/40 hover:text-white transition-all uppercase tracking-[0.2em] relative group">
                            Terms of Service
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
                        </Link>
                    </div>

                    <div className="flex gap-4">
                        {/* Social Links placeholder */}
                        {['LinkedIn', 'Twitter', 'X'].map((social) => (
                            <Link key={social} href="#" className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-500 group">
                                <span className="sr-only">{social}</span>
                                <div className="w-1 h-1 bg-current rounded-full group-hover:scale-150 transition-transform" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </footer>
    );
};

export default Footer;
