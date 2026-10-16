"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const socials = [
  {
    icon: Github,
    href: "https://github.com/satyamsingh83840",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/satyam-kumar-0a625143a/",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://x.com/devsatyam823",
    label: "X (Twitter)",
  },
];

export default function Footer() {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  // Persist the timeout across renders.
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide while scrolling.
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

  // Fade out when the page footer enters the viewport.
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

  // Clean up the timeout when the component unmounts.
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: hidden || nearFooter ? 0 : 1,
        y: hidden ? 12 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        fixed bottom-4 sm:bottom-6
        left-1/2 -translate-x-1/2
        z-50
        max-w-[calc(100vw-2rem)]
      "
      style={{
        pointerEvents: hidden || nearFooter ? "none" : "auto",
      }}
    >
      {/* Responsive glass dock */}
      <div
        className="
          flex items-center justify-center
          gap-2 sm:gap-4
          rounded-full
          border border-white/10
          px-3 py-2 sm:px-4 sm:py-3
          bg-black/60
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
        "
      >
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
            className="
              group relative
              flex shrink-0 items-center justify-center
              h-10 w-10 sm:h-11 sm:w-11
              rounded-full
              border border-transparent
              bg-gray-900/70
              text-gray-400
              transition-colors duration-200
              hover:text-[rgb(var(--accent))]
              hover:border-white/10
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-indigo-400
            "
          >
            {/* Hover glow */}
            <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="absolute inset-0 rounded-full bg-[rgb(var(--accent)/0.2)] blur-md" />
            </span>

            <Icon className="relative z-10 h-5 w-5" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
