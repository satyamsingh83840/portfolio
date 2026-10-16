"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Cpu,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers3,
} from "lucide-react";

const skillGroups = [
  {
    number: "01",
    title: "Languages",
    kicker: "THE FOUNDATION",
    description: "Clean syntax. Thoughtful solutions.",
    icon: Code2,
    skills: ["TypeScript", "JavaScript", "Python"],
    mark: "</>",
    color: "#B8D878",
  },
  {
    number: "02",
    title: "Frontend",
    kicker: "THE EXPERIENCE",
    description: "Interfaces made for people.",
    icon: Layout,
    skills: ["Next.js", "React", "Tailwind CSS", "shadcn/ui"],
    mark: "Aa",
    color: "#BDA6E8",
  },
  {
    number: "03",
    title: "Backend & APIs",
    kicker: "BEHIND THE SCENES",
    description: "Reliable services. Scalable systems.",
    icon: Server,
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST APIs",
      "Microservices",
      "Apache Kafka",
    ],
    mark: "{ }",
    color: "#83C7A9",
  },
  {
    number: "04",
    title: "Data & Storage",
    kicker: "THE MEMORY",
    description: "Structured data. Efficient queries.",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "Prisma", "Drizzle ORM", "Redis"],
    mark: "01",
    color: "#D9B780",
  },
  {
    number: "05",
    title: "DevOps & Cloud",
    kicker: "BUILT TO SHIP",
    description: "Automated infrastructure. Reliable delivery.",
    icon: Cloud,
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "CI/CD",
      "Jenkins",
      "Nginx",
      "Linux",
    ],
    mark: "~/",
    color: "#8DBCD8",
  },
  {
    number: "06",
    title: "Generative AI",
    kicker: "THE NEXT FRONTIER",
    description: "Intelligent workflows. Agentic systems.",
    icon: Cpu,
    skills: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "RAG",
      "AI Agents",
      "MCP",
      "OpenAI API",
      "Vector Databases",
    ],
    mark: "AI*",
    color: "#DB9DA8",
  },
];

export default function Skills() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(index, skillGroups.length - 1));
    const track = trackRef.current;
    const slide = slideRefs.current[next];

    if (!track || !slide) return;

    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });

    setActive(next);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const center =
          track.getBoundingClientRect().left + track.clientWidth / 2;

        let nearest = 0;
        let distance = Infinity;

        slideRefs.current.forEach((slide, index) => {
          if (!slide) return;

          const rect = slide.getBoundingClientRect();
          const currentDistance = Math.abs(rect.left + rect.width / 2 - center);

          if (currentDistance < distance) {
            distance = currentDistance;
            nearest = index;
          }
        });

        setActive((current) => (current === nearest ? current : nearest));
      });
    };

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#09090B] py-16 text-zinc-100 sm:py-20"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#71717a 1px, transparent 1px), linear-gradient(90deg, #71717a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-5 mb-8 sm:mx-8 sm:mb-10 lg:mx-10"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-zinc-400">
              <span className="h-2 w-2 bg-[#B8D878]" />
              Technical Index
            </span>

            <span className="font-mono text-[10px] tracking-wide text-zinc-500">
              06 CATEGORIES
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 border-y border-white/15 py-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-[2.65rem] font-medium leading-[0.98] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
                My tech{" "}
                <span className="font-serif font-normal italic text-zinc-400">
                  universe.
                </span>
              </h2>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-[2px] w-8 bg-[#B8D878]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  Tools I build with
                </span>
              </div>
            </div>

            <p className="max-w-[300px] text-[13px] leading-6 text-zinc-400 sm:text-right">
              From frontend interfaces to cloud infrastructure and AI-powered
              applications.
            </p>
          </div>
        </motion.header>

        {/* Skill carousel */}
        <div
          ref={trackRef}
          role="region"
          aria-label="Technology skill categories"
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 pb-3 outline-none focus-visible:ring-1 focus-visible:ring-[#B8D878]/60 sm:gap-4 sm:px-8 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {skillGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.number}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative flex min-h-[330px] w-[min(84vw,305px)] shrink-0 snap-start flex-col overflow-hidden border border-white/[0.16] bg-[#141416] p-4 transition-all duration-300 hover:border-white/30 hover:bg-[#18181B] sm:min-h-[345px] sm:w-[310px] sm:p-5"
              >
                {/* Category accent */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-[2px] w-full opacity-70 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: group.color }}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-[0.09] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.17]"
                  style={{ backgroundColor: group.color }}
                />

                {/* Card header */}
                <div className="relative flex items-center justify-between border-b border-white/[0.13] pb-3">
                  <span className="font-mono text-[10px] font-medium tracking-[0.12em] text-zinc-400">
                    CATEGORY / {group.number}
                  </span>

                  <div
                    className="flex h-8 w-8 items-center justify-center border"
                    style={{
                      color: group.color,
                      borderColor: `${group.color}55`,
                      backgroundColor: `${group.color}12`,
                    }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Graphic */}
                <div className="relative flex h-[72px] items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[42px] font-semibold leading-none tracking-[-0.1em]"
                    style={{ color: `${group.color}B3` }}
                  >
                    {group.mark}
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-2 font-mono text-[70px] font-bold leading-none tracking-[-0.12em] text-white/[0.045]"
                  >
                    {group.number}
                  </span>

                  <span
                    className="relative border px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      color: group.color,
                      borderColor: `${group.color}55`,
                      backgroundColor: `${group.color}10`,
                    }}
                  >
                    {group.kicker}
                  </span>
                </div>

                {/* Title */}
                <div className="relative">
                  <h3 className="text-[25px] font-semibold leading-tight tracking-[-0.055em] text-white">
                    {group.title}
                    <span style={{ color: group.color }}>.</span>
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-5 text-zinc-400">
                    {group.description}
                  </p>
                </div>

                {/* Skill chips */}
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 border border-white/[0.14] bg-[#202023] px-2 py-[6px] text-[11px] font-medium text-zinc-200 transition-colors duration-200 hover:border-[#B8D878]/50 hover:text-[#D9F0A7]"
                    >
                      <span className="font-mono text-[9px] text-zinc-500">
                        {String(skillIndex + 1).padStart(2, "0")}
                      </span>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="relative mt-auto flex items-center justify-between border-t border-white/[0.13] pt-3 mt-4">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                    {String(group.skills.length).padStart(2, "0")} TOOLS
                  </span>

                  <ArrowUpRight
                    className="h-4 w-4 text-zinc-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mx-5 mt-5 flex items-center justify-between sm:mx-8 lg:mx-10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous category"
              className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.03] text-zinc-300 transition-colors hover:border-[#B8D878]/60 hover:text-[#B8D878] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === skillGroups.length - 1}
              aria-label="Next category"
              className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.03] text-zinc-300 transition-colors hover:border-[#B8D878]/60 hover:text-[#B8D878] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            <span className="ml-2 font-mono text-[11px] tabular-nums text-zinc-400">
              <span className="font-semibold text-[#B8D878]">
                {String(active + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(skillGroups.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pl-3">
            {skillGroups.map((group, index) => (
              <button
                key={group.number}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to ${group.title}`}
                aria-current={active === index ? "step" : undefined}
                className="flex h-6 items-center px-0.5"
              >
                <span
                  className={`h-[3px] transition-all duration-300 ${
                    index === active
                      ? "w-8 bg-[#B8D878]"
                      : "w-3 bg-zinc-600 hover:bg-zinc-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <div className="mx-5 mt-9 flex items-center justify-between border-t border-white/[0.13] pt-4 sm:mx-8 lg:mx-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
            Always building
          </span>

          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
            <Layers3 className="h-3.5 w-3.5 text-[#B8D878]" />
            End of index
          </span>
        </div>
      </div>
    </section>
  );
}
