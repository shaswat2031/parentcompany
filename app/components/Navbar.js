"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Portfolios", href: "/companies" },
    { name: "Presence", href: "/operations" },
    { name: "Governance", href: "/leadership" },
    { name: "Invest", href: "/invest" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-dark/40 transition-all duration-500">
      <Link href="/" className="font-industrial text-xl md:text-2xl tracking-[0.2em] text-gold-premium uppercase z-50">
        RISEMATE VENTURE
      </Link>

      {/* Desktop Nav */}
      <div className="hidden lg:flex gap-12 font-body text-[10px] uppercase tracking-[0.4em] font-bold">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors hover:text-gold ${
              pathname === link.href ? "text-gold border-b border-gold/40 pb-1" : "text-glacier"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gold z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-dark z-40 lg:hidden flex flex-col items-center justify-start pt-32 transition-all duration-700 ${
          isMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 text-center px-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`font-headline italic text-4xl transition-colors ${
                pathname === link.href ? "text-gold" : "text-glacier hover:text-gold"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
