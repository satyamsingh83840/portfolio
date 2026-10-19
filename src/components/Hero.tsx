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
    
{/* Right: minimal portrait profile */}
<motion.div
  variants={itemVariants}
  className="order-1 mx-auto w-full max-w-[340px] lg:order-2 lg:ml-auto lg:mr-0"
>
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className="group relative overflow-hidden border border-zinc-800/80 bg-zinc-950"
  >
    {/* Portrait */}
    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
      <Image
        src="/p.png"
        alt="Satyam Kumar — Full-Stack Engineer"
        fill
        priority
        sizes="(max-width: 640px) 90vw, 340px"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />

      {/* Soft, restrained image fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent"
      />

      {/* Small availability indicator */}
      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#B8D878]" />
        <span className="text-[10px] font-medium tracking-wide text-zinc-200">
          Open to building
        </span>
      </div>

      {/* Name and role */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#B8D878]">
          Full-Stack · AI · Systems
        </p>

        <h2 className="text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">
          Satyam Kumar
        </h2>

        <p className="mt-2 text-sm text-zinc-300">
          Engineer building things that scale.
        </p>
      </div>
    </div>

    {/* Minimal skills strip */}
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-4 py-4">
      {["TypeScript", "Next.js", "NestJS", "Gen AI"].map(
        (tech, index) => (
          <span
            key={tech}
            className="text-[11px] text-zinc-400 transition-colors duration-200 hover:text-[#B8D878]"
          >
            {index > 0 && (
              <span className="mr-2 text-zinc-700">/</span>
            )}
            {tech}
          </span>
        ),
      )}
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
