"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Leadership", href: "/leadership" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`fixed left-1/2 top-4 z-[200] w-[min(96vw,1380px)] -translate-x-1/2 px-3 sm:px-4 transition-all duration-500 ease-out ${loaded ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
    >
      <div className={`relative rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-300 ease-out sm:px-5 ${scrolled ? "border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(0,18,51,0.14)] py-2.5" : "border-white/55 bg-white/75 shadow-[0_14px_35px_rgba(0,18,51,0.08)]"}`}>
        <div className="mx-auto flex items-center justify-between gap-3 lg:gap-5">
          <div className="hidden min-w-0 flex-1 items-center gap-6 lg:flex xl:gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-300 ${isActive(link.href) ? "text-[#002366]" : "text-dark/65 hover:text-dark"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] rounded-full bg-[#002366] transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            ))}
          </div>

          <Link href="/" className="flex min-w-0 flex-1 items-center justify-center gap-2 md:gap-3 group">
            <span className={`text-lg font-black tracking-tighter transition-colors duration-300 md:text-2xl ${scrolled ? "text-[#002366]" : "text-dark"}`}>
              Risemate
            </span>
            <div className={`relative h-10 w-10 transition-transform duration-300 md:h-12 md:w-12 ${scrolled ? "scale-90" : "scale-100"}`}>
              <Image
                src="/logo.png"
                alt="RISEMATE Logo"
                fill
                className="object-contain"
                priority
                unoptimized={true}
              />
            </div>
            <span className={`text-lg font-black tracking-tighter transition-colors duration-300 md:text-2xl ${scrolled ? "text-[#002366]" : "text-dark"}`}>
              Venture
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex xl:gap-7">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-300 ${isActive(link.href) ? "text-[#002366]" : "text-dark/65 hover:text-dark"}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-4 w-px bg-dark/10" />
            <Link
              href="/contact"
              className="rounded-full bg-[#002366] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-[#002366]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-dark"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#002366] text-white transition-transform duration-300 hover:scale-105 lg:hidden"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${mobileOpen ? "mt-4 max-h-96 opacity-100 translate-y-0" : "pointer-events-none max-h-0 opacity-0 -translate-y-2"}`}
        >
          <div className="rounded-[28px] border border-dark/10 bg-white/95 p-4 shadow-[0_18px_50px_rgba(0,18,51,0.10)] backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${isActive(link.href) ? "bg-[#002366]/5 text-[#002366]" : "text-dark/70 hover:bg-dark/5 hover:text-dark"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-3 border-t border-dark/10 pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#002366] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-dark"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
