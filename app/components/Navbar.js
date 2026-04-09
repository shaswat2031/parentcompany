"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Leadership", href: "/leadership" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine scrolled status
    setScrolled(latest > 50);
    setLastScrollY(latest);
  });

  const isLightPage = ["/", "/about", "/leadership", "/portfolio", "/contact", "/companies"].includes(pathname);
  const isTransparent = !scrolled && isLightPage;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out h-20 md:h-24 flex items-center ${
        !isTransparent
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_10px_rgba(0,18,51,0.05)]"
          : "bg-white/5 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-14 flex justify-between items-center whitespace-nowrap">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-48 h-12"
          >
            <Image
              src="/logo.png"
              alt="RISEMATE Logo"
              fill
              sizes="(max-width: 768px) 150px, 192px"
              className="object-contain object-left scale-125 transition-all duration-1000 group-hover:opacity-100"
              priority
              unoptimized={true}
            />
          </motion.div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-14">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            className="flex gap-10 items-center"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={{
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Magnetic>
                  <Link
                    href={link.href}
                    className={`group relative text-[11px] font-black uppercase tracking-[0.4em] transition-colors duration-700 py-2 ${isTransparent && !isLightPage ? "text-white/70 hover:text-white" : "text-dark/60 hover:text-#002366"
                      }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.span
                      className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-700 group-hover:w-full ${isTransparent && !isLightPage ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "bg-#002366 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                        }`}
                    />
                  </Link>
                </Magnetic>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Section Wrapper */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className={`flex items-center gap-10 pl-14 border-l h-6 ${isTransparent && !isLightPage ? "border-white/10" : "border-dark/10"
              }`}
          >
            <Magnetic>
              <Link
                href="/contact"
                className={`group relative text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-700 ${isTransparent && !isLightPage ? "text-white hover:opacity-80" : "text-dark hover:text-#002366"
                  }`}
              >
                <span className="flex items-center gap-3">
                  Join NEXUS
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform duration-500">arrow_forward</span>
                </span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Mobile Navbar Interaction Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={`lg:hidden w-14 h-14 flex items-center justify-center rounded-full transition-all duration-700 ${isTransparent && !isLightPage ? "bg-white text-dark shadow-2xl" : "bg-dark text-white shadow-2xl"
            }`}
        >
          <span className="material-symbols-outlined text-2xl">menu_open</span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
