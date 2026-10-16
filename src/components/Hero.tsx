"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Download,
  Terminal,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const technologies = [
  "TypeScript",
  "Next.js",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "LangGraph",
];

export default function Hero() {
  return (
    <section
      id="about"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#09090B] pb-16 pt-28 text-zinc-100 selection:bg-[#B8D878]/30 sm:pt-32 lg:pb-12 lg:pt-28"
    >
      {/* Subtle editorial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #71717a 1px, transparent 1px), linear-gradient(to bottom, #71717a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      {/* Muted lime detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 -z-10 h-72 w-72 bg-[#B8D878]/[0.045] blur-[110px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16"
        >
          {/* Left: introduction — preserved */}
          <div className="order-2 min-w-0 lg:order-1">
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-wrap items-center gap-3"
            >
              <span className="h-px w-8 bg-[#B8D878]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400 sm:text-xs">
                Full-Stack Engineer / Builder
              </span>
              <span className="ml-1 inline-flex items-center gap-2 border border-[#B8D878]/20 bg-[#B8D878]/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#B8D878]">
                <span className="h-1.5 w-1.5 bg-[#B8D878]" />
                Building
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="max-w-4xl text-[clamp(3.25rem,7.5vw,6.7rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-zinc-100"
            >
              I build
              <br />
              things that
              <br />
              <span className="font-serif font-normal italic text-[#B8D878]">
                move forward.
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-7 flex items-start gap-3 sm:mt-9"
            >
              <span className="mt-2 h-8 w-[2px] shrink-0 bg-[#B8D878]" />
              <p className="max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                I’m{" "}
                <strong className="font-medium text-zinc-100">
                  Satyam Kumar
                </strong>
                , a TypeScript-focused engineer building scalable web apps,
                distributed backend systems, and AI-powered products. I work
                across{" "}
                <span className="text-zinc-200">Next.js, NestJS, DevOps,</span>{" "}
                and{" "}
                <span className="text-zinc-200">
                  agentic AI, LangGraph, and RAG.
                </span>
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row"
            >
              <a
                href="#projects"
                className="group inline-flex min-h-12 items-center justify-center gap-8 bg-[#B8D878] px-5 py-3 text-sm font-semibold text-[#151710] transition-colors duration-300 hover:bg-[#c9e694] active:scale-[0.98]"
              >
                Explore projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="group inline-flex min-h-12 items-center justify-center gap-3 border border-zinc-800 bg-zinc-950/60 px-5 py-3 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:border-zinc-600 hover:text-white active:scale-[0.98]"
              >
                <Download className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-[#B8D878]" />
                Download resume
                <ArrowDownRight className="h-4 w-4 text-zinc-600" />
              </a>
            </motion.div>

            {/* Areas of focus */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid max-w-xl grid-cols-2 border-y border-zinc-800/80 sm:mt-12"
            >
              <div className="flex items-center gap-3 py-4 pr-3">
                <Terminal className="h-4 w-4 shrink-0 text-[#B8D878]" />
                <div>
                  <p className="text-xs font-medium text-zinc-200">
                    Backend systems
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                    APIs / Distributed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-l border-zinc-800/80 py-4 pl-4">
                <Sparkles className="h-4 w-4 shrink-0 text-[#B8D878]" />
                <div>
                  <p className="text-xs font-medium text-zinc-200">
                    Generative AI
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                    Agents / RAG
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: simplified developer profile */}
          <motion.div
            variants={itemVariants}
            className="order-1 mx-auto w-full max-w-[370px] lg:order-2 lg:ml-auto lg:mr-0"
          >
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative border border-white/[0.14] bg-[#111113]"
            >
              {/* Compact top bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 bg-[#B8D878]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
                    Developer profile
                  </span>
                </div>

                <span className="font-mono text-[10px] text-zinc-500">
                  SK—001
                </span>
              </div>

              {/* Larger, cleaner portrait */}
              <div className="relative aspect-[4/4.2] overflow-hidden bg-[#18181B]">
                <Image
                  src="/p.png"
                  alt="Satyam Kumar — Full-Stack Engineer"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 370px, 370px"
                  className="object-cover object-center grayscale-[12%] transition duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                />

                {/* Subtle image treatment */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-transparent to-black/10"
                />

                {/* Minimal availability label */}
                <div className="absolute left-3 top-3 flex items-center gap-2 border border-white/15 bg-black/55 px-2.5 py-2 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 bg-[#B8D878]" />
                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-200">
                    Always building
                  </span>
                </div>

                {/* Name over portrait */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B8D878]">
                    Code / Systems / AI
                  </p>

                  <h2 className="text-3xl font-semibold leading-none tracking-[-0.055em] text-white sm:text-[2.1rem]">
                    Satyam Kumar
                  </h2>

                  <p className="mt-2 text-xs text-zinc-300">
                    Full-Stack Engineer
                  </p>
                </div>
              </div>

              {/* Selected technologies */}
              <div className="p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-zinc-200">
                      Core stack
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-500">
                      My go-to technologies
                    </p>
                  </div>

                  <span className="font-mono text-[10px] text-[#B8D878]">
                    06 TOOLS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {technologies.map((tech, index) => (
                    <div
                      key={tech}
                      className="flex min-h-10 items-center gap-2 border border-white/[0.11] bg-white/[0.035] px-2.5 transition-colors duration-200 hover:border-[#B8D878]/40 hover:bg-[#B8D878]/[0.05]"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#B8D878]/80" />
                      <span className="text-[11px] font-medium text-zinc-300">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clean footer */}
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">
                  Portfolio / 2026
                </span>

                <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400">
                  View projects
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#B8D878]" />
                </span>
              </div>
            </motion.div>

            {/* Small caption */}
            <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.14em] text-zinc-500">
              <span>Designed with intent.</span>
              <span>Built to scale.</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mx-auto mt-12 hidden w-fit items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-[#B8D878] lg:flex"
        >
          Scroll to explore
          <ArrowDownRight className="h-3.5 w-3.5" />
        </motion.a>
      </div>
    </section>
  );
}
