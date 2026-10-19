
"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Sparkles,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const technologies = [
  "TypeScript",
  "Next.js",
  "kafka",
  "Node.js",
  "NestJS",
  "Gen AI","kubernetes"
];


export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-zinc-950 text-white"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[8%] top-20 h-64 w-64 rounded-full bg-[#B8D878]/[0.055] blur-[110px]" />
        <div className="absolute bottom-10 right-[10%] h-72 w-72 rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-24 lg:pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_370px] xl:gap-24"
        >
          {/* Left: introduction */}
          <motion.div
            variants={itemVariants}
            className="order-2 min-w-0 lg:order-1"
          >
            <div className="mb-7 inline-flex items-center gap-2.5 border border-zinc-800 bg-zinc-900/70 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B8D878] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B8D878]" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300 sm:text-[11px]">
                Available for opportunities
              </span>
            </div>

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-[#B8D878] sm:text-sm">
              Full-Stack Developer · AI Enthusiast
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl md:text-7xl xl:text-[88px]">
              Building digital
              <br />
              <span className="text-zinc-500">experiences</span>
              <br />
              that matter<span className="text-[#B8D878]">.</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
              I&apos;m Satyam Kumar, a developer focused on building modern
              web applications, scalable backend systems, and AI-powered
              products. I enjoy turning complex problems into clean,
              practical experiences.
            </p>

            {/* Technologies */}
            <div className="mt-7 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:border-zinc-700 hover:text-[#B8D878]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex min-h-11 items-center gap-3 bg-[#B8D878] px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#c8e894]"
              >
                Explore my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border border-zinc-800 px-5 py-3 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-900"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>

          </motion.div>

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

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent"
                />

                {/* Availability label */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8D878]" />
                  <span className="text-[10px] font-medium tracking-wide text-zinc-200">
                    Open to building
                  </span>
                </div>

                {/* Portrait caption */}
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

              {/* Compact technology footer */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-4 py-4">
                {technologies
                  .filter((tech) =>
                    ["TypeScript", "Next.js", "NestJS","kubernetes", "Gen AI"].includes(tech),
                  )
                  .map((tech, index) => (
                    <span
                      key={tech}
                      className="text-[11px] text-zinc-400 transition-colors duration-200 hover:text-[#B8D878]"
                    >
                      {index > 0 && (
                        <span className="mr-2 text-zinc-700">/</span>
                      )}
                      {tech}
                    </span>
                  ))}
              </div>
            </motion.div>

            {/* Small detail beneath the card */}
            <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-3">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                <Sparkles className="h-3 w-3 text-[#B8D878]" />
                Curious by default
              </span>
              <span className="font-mono text-[10px] text-zinc-700">
                IN / 01
              </span>
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
