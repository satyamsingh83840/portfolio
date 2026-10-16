"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const socials = [
  {
    icon: Github,
    href: "https://github.com/satyamsingh83840",
    label: "GitHub",
    handle: "SOURCE",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/satyam-kumar-0a625143a/",
    label: "LinkedIn",
    handle: "NETWORK",
  },
  {
    icon: Twitter,
    href: "https://x.com/devsatyam823",
    label: "X (Twitter)",
    handle: "UPDATES",
  },
];

export default function Footer() {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", () => {
    setHidden(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setHidden(false);
      scrollTimeout.current = null;
    }, 200);
  });

  // Hide the floating dock when the page footer enters view.
  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearFooter(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Clean up the pending timeout.
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const isVisible = !hidden && !nearFooter;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 12,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        pointerEvents: isVisible ? "auto" : "none",
      }}
      className="fixed bottom-4 left-1/2 z-50 w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2 sm:bottom-6"
    >
      <div className="relative flex items-center gap-1.5 border border-white/[0.13] bg-[#0C0C0E]/95 p-1.5 shadow-[0_12px_45px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:gap-2 sm:p-2">
        {/* Small lime accent */}
        <span
          aria-hidden="true"
          className="absolute left-3 top-0 h-px w-8 bg-[#B8D878]"
        />

        {/* Dock label */}
        <div className="hidden items-center gap-2 border-r border-white/[0.09] py-1 pl-2 pr-3 sm:flex">
          <span className="flex h-7 w-7 items-center justify-center border border-[#B8D878]/20 bg-[#B8D878]/[0.07] text-[#B8D878]">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>

          <div>
            <p className="text-[10px] font-semibold tracking-wide text-zinc-200">
              Find me online
            </p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-600">
              Social links / 03
            </p>
          </div>
        </div>

        {/* Social links */}
        {socials.map(({ icon: Icon, href, label, handle }, index) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 22,
            }}
            className="group relative flex h-10 w-10 shrink-0 items-center justify-center border border-transparent text-zinc-400 transition-colors duration-200 hover:border-[#B8D878]/25 hover:bg-[#B8D878]/[0.07] hover:text-[#B8D878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878] sm:h-11 sm:w-11"
          >
            {/* Hover highlight */}
            <span className="absolute inset-x-2 top-0 h-px scale-x-0 bg-[#B8D878] transition-transform duration-200 group-hover:scale-x-100" />

            <Icon className="relative z-10 h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-105" />

            {/* Hover tooltip */}
            <span className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap border border-white/[0.12] bg-[#101012] px-2.5 py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="block text-[10px] font-medium text-zinc-200">
                {label}
              </span>
              <span className="mt-1 block font-mono text-[8px] tracking-wider text-zinc-500">
                {handle}
              </span>
            </span>

            {/* Mobile index */}
            <span className="absolute bottom-0.5 right-1 font-mono text-[7px] text-zinc-700">
              0{index + 1}
            </span>
          </motion.a>
        ))}

        {/* Online indicator */}
        <div className="ml-0.5 flex h-10 items-center border-l border-white/[0.09] pl-2.5 pr-1 sm:h-11 sm:pl-3">
          <span
            className="h-1.5 w-1.5 bg-[#B8D878] shadow-[0_0_8px_rgba(184,216,120,0.55)]"
            aria-label="Available online"
            title="Available online"
          />
        </div>
      </div>
    </motion.div>
  );
}
