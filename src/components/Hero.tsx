"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Terminal, Sparkles } from "lucide-react";

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
  hidden: { opacity: 0, y: 22 },
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
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Kafka",
  "DevOps",
  "LangChain",
  "LangGraph",
  "LangSmith",
  "RAG",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black pb-12 pt-28 text-white selection:bg-white/20 sm:pt-32 lg:pb-0 lg:pt-20"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[450px] w-[450px] rounded-full bg-blue-500/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-500/[0.07] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10"
        >
          {/* Left content */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <motion.div
              variants={itemVariants}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-2 text-xs font-medium text-zinc-300 sm:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Full-Stack Engineer · DevOps · GenAI
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Engineering
              <br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                systems that scale.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg"
            >
              I’m{" "}
              <strong className="font-semibold text-white">Satyam Kumar</strong>
              , a TypeScript-focused engineer building scalable web
              applications, distributed backend systems, and AI-powered
              products. From{" "}
              <span className="text-zinc-200">Next.js and NestJS</span> to
              Kafka, cloud infrastructure, and{" "}
              <span className="text-zinc-200">
                agentic AI, LangGraph, and RAG
              </span>
              , I work across the entire development lifecycle.
            </motion.p>

            {/* Primary actions */}
            <motion.div
              variants={itemVariants}
              className="mb-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
            >
              <a
                href="#projects"
                className="group inline-flex w-full items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200 active:scale-95 sm:w-auto"
              >
                Explore My Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/50 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition duration-300 hover:border-zinc-600 hover:bg-zinc-900 active:scale-95 sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            {/* Specializations */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-zinc-500 sm:text-sm lg:justify-start"
            >
              <span className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-zinc-300" />
                Backend & Distributed Systems
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-zinc-300" />
                GenAI & AI Agents
              </span>
            </motion.div>
          </div>

          {/* Right profile card */}
          <motion.div
            variants={itemVariants}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="group relative w-full max-w-[390px]">
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/15 via-transparent to-violet-500/15 opacity-70 blur-2xl transition duration-700 group-hover:opacity-100" />

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50"
              >
                {/* Profile image */}
                <div className="relative aspect-[4/4.5] overflow-hidden">
                  <Image
                    src="/p.png"
                    alt="Satyam Kumar - Full-Stack Engineer, DevOps and GenAI"
                    fill
                    priority
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 390px, 390px"
                    className="object-cover opacity-90 transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black" />

                  {/* Identity */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-zinc-400">
                      Developer Portfolio
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Satyam Kumar
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">
                      Full-Stack · DevOps · Generative AI
                    </p>
                  </div>
                </div>

                {/* Stack panel */}
                <div className="border-t border-zinc-800 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                      Core Technologies
                    </span>
                    <span className="text-xs text-zinc-600">
                      TypeScript-first
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
