"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, Command, Menu, X } from "lucide-react";

const links = [
  { name: "About", href: "#about", number: "01" },
  { name: "Skills", href: "#skills", number: "02" },
  { name: "Projects", href: "#projects", number: "03" },
  { name: "Contact", href: "#contact", number: "04" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrollHidden, setScrollHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const difference = currentY - lastScrollY.current;

        setScrolled(currentY > 20);

        if (open) {
          setScrollHidden(false);
        } else if (currentY < 40) {
          setScrollHidden(false);
        } else if (difference > 5 && currentY > 100) {
          setScrollHidden(true);
        } else if (difference < -5) {
          setScrollHidden(false);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0]) {
          setActiveLink(`#${visibleSections[0].target.id}`);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close the mobile menu when returning to desktop.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: scrollHidden ? 0 : 1,
        y: scrollHidden ? -24 : 0,
      }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      style={{ pointerEvents: scrollHidden ? "none" : "auto" }}
      aria-label="Main navigation"
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Navigation bar */}
        <div
          className={`relative z-20 flex h-[58px] items-center justify-between border px-3.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-white/[0.13] bg-[#09090B]/90 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
              : "border-white/[0.09] bg-[#09090B]/70 backdrop-blur-xl"
          }`}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            aria-label="Satyam — home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-[#B8D878]/25 bg-[#B8D878]/[0.07] text-[#B8D878] transition-colors group-hover:bg-[#B8D878]/15">
              <Code2 className="h-4 w-4" strokeWidth={1.8} />
            </span>

            <span className="text-[15px] font-semibold tracking-[-0.045em] text-zinc-100">
              Satyam
              <span className="text-[#B8D878]">.</span>
            </span>

            <span className="ml-0.5 hidden border-l border-white/10 pl-2.5 font-mono text-[9px] tracking-wider text-zinc-500 sm:block">
              DEV / 001
            </span>
          </a>

          {/* Desktop links */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
            {links.map((link) => {
              const isActive = activeLink === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative flex h-9 items-center gap-2 px-3.5 text-[12px] font-medium transition-colors duration-200 lg:px-4 ${
                    isActive
                      ? "text-[#B8D878]"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 border border-[#B8D878]/15 bg-[#B8D878]/[0.07]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>

                  {isActive && (
                    <span className="relative z-10 h-1 w-1 bg-[#B8D878]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="group hidden h-9 items-center gap-2 border border-white/[0.12] bg-white/[0.035] px-3.5 text-[11px] font-medium text-zinc-200 transition hover:border-[#B8D878]/35 hover:bg-[#B8D878]/[0.07] hover:text-[#B8D878] md:flex"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex h-9 w-9 items-center justify-center border border-white/[0.10] bg-white/[0.025] text-zinc-300 transition hover:border-[#B8D878]/30 hover:text-[#B8D878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878] md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {open ? (
                  <X className="h-[18px] w-[18px]" />
                ) : (
                  <Menu className="h-[18px] w-[18px]" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {open && (
            <>
              <motion.button
                type="button"
                aria-label="Close navigation menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 -z-10 h-[100dvh] w-full cursor-default bg-black/40 backdrop-blur-[2px] md:hidden"
              />

              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-x-0 top-[calc(100%+8px)] z-30 border border-white/[0.12] bg-[#0C0C0E]/[0.98] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden"
              >
                <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] px-2 pb-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                    Navigation
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-600">
                    <Command className="h-3 w-3" />
                    MENU / 04
                  </span>
                </div>

                <div className="space-y-1">
                  {links.map((link, index) => {
                    const isActive = activeLink === link.href;

                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.045,
                        }}
                        onClick={() => setOpen(false)}
                        className={`group flex min-h-12 items-center justify-between border px-3.5 transition-colors ${
                          isActive
                            ? "border-[#B8D878]/20 bg-[#B8D878]/[0.06] text-[#B8D878]"
                            : "border-transparent text-zinc-300 hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-zinc-600">
                            {link.number}
                          </span>
                          <span className="text-sm font-medium">
                            {link.name}
                          </span>
                        </span>

                        <ArrowUpRight
                          className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                            isActive
                              ? "text-[#B8D878]"
                              : "text-zinc-600 group-hover:text-zinc-300"
                          }`}
                        />
                      </motion.a>
                    );
                  })}
                </div>

                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-3 flex min-h-11 items-center justify-center gap-2 bg-[#B8D878] px-4 text-xs font-semibold text-[#151710] transition hover:bg-[#c9e694]"
                >
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-3">
                  <span className="text-[10px] text-zinc-600">
                    Satyam Kumar
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    <span className="h-1.5 w-1.5 bg-[#B8D878]" />
                    Available to connect
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
