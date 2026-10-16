"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Play,
  X,
} from "lucide-react";

type Category = "All" | "Typescript" | "Genai";

type Project = {
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  tech: string[];
  live: string;
  repo: string;
  image: string;
  demoVideo?: string;
  featured?: boolean;
};

const categories: Category[] = ["All", "Typescript", "Genai"];

const projects: Project[] = [
  {
    title: "Your Project Name",
    description:
      "A full-stack project built with modern technologies, focusing on performance, clean architecture, and a polished user experience.",
    category: "Typescript",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: true,
  },

  {
    title: "Your Project Name",
    description:
      "A full-stack project built with modern technologies, focusing on performance, clean architecture, and a polished user experience.",
    category: "Genai",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: false,
  },
  {
    title: "Your Project Name",
    description:
      "A full-stack project built with modern technologies, focusing on performance, clean architecture, and a polished user experience.",
    category: "Genai",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: false,
  },
  {
    title: "Your Project Name",
    description:
      "A full-stack project built with modern technologies, focusing on performance, clean architecture, and a polished user experience.",
    category: "Typescript",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: false,
  },
  {
    title: "Your Project Name",
    description:
      "A full-stack project built with modern technologies, focusing on performance, clean architecture, and a polished user experience.",
    category: "Typescript",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: false,
  },
  {
    title: "Your Project Name",
    description:
      "A full-stack project built with modern technologies, focusing on performance, clean architecture, and a polished user experience.",
    category: "Typescript",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: true,
  },
  {
    title: "Your Project Name",
    description:
      "A full-stack project built with modern technologies, focusing on performance, clean architecture, and a polished user experience.",
    category: "Typescript",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: true,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function getXPostId(url?: string): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (
      !["x.com", "www.x.com", "twitter.com", "www.twitter.com"].includes(
        parsed.hostname,
      )
    ) {
      return null;
    }

    return parsed.pathname.match(/\/status\/(\d+)/)?.[1] ?? null;
  } catch {
    return null;
  }
}

function ProjectSlider({
  items,
  onSelect,
  label,
}: {
  items: Project[];
  onSelect: (project: Project) => void;
  label: string;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const element = sliderRef.current;
    if (!element) return;

    const updateButtons = () => {
      setCanGoBack(element.scrollLeft > 4);
      setCanGoForward(
        element.scrollLeft + element.clientWidth < element.scrollWidth - 4,
      );
    };

    updateButtons();

    element.addEventListener("scroll", updateButtons, { passive: true });

    const observer = new ResizeObserver(updateButtons);
    observer.observe(element);

    return () => {
      element.removeEventListener("scroll", updateButtons);
      observer.disconnect();
    };
  }, [items]);

  function scroll(direction: "left" | "right") {
    const element = sliderRef.current;
    if (!element) return;

    const firstCard = element.querySelector<HTMLElement>("[data-project-card]");

    const distance = firstCard
      ? firstCard.offsetWidth + 16
      : element.clientWidth * 0.8;

    element.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: "smooth",
    });
  }

  if (!items.length) {
    return (
      <div className="border border-dashed border-zinc-800 px-5 py-10 text-center">
        <p className="text-sm text-zinc-500">
          No projects found in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div
        ref={sliderRef}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-4 [scrollbar-color:#3f3f46_transparent] [scrollbar-width:thin] sm:gap-5"
      >
        {items.map((project, index) => (
          <motion.button
            key={`${project.title}-${project.category}-${index}`}
            data-project-card
            type="button"
            onClick={() => onSelect(project)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.995 }}
            aria-label={`View details for ${project.title}`}
            className="group relative flex w-[82%] shrink-0 snap-start flex-col self-stretch border border-zinc-800 bg-[#101012] text-left transition-colors duration-300 hover:border-[#B8D878]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878] sm:w-[64%] lg:w-[58%] xl:w-[54%]"
          >
            <div className="grid min-w-0 flex-1 md:grid-cols-[1.05fr_0.95fr]">
              {/* Project preview */}
              <div className="relative flex min-h-[190px] items-center justify-center overflow-hidden border-b border-zinc-800 bg-[#09090B] sm:min-h-[230px] md:min-h-[270px] md:border-b-0 md:border-r">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #71717a 1px, transparent 1px), linear-gradient(to bottom, #71717a 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />

                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="relative z-10 h-full max-h-[320px] min-h-[190px] w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.035] sm:min-h-[230px] md:min-h-[270px] md:p-4"
                />

                <div className="absolute left-3 top-3 z-20 flex items-center gap-2 border border-zinc-700 bg-[#09090B]/90 px-2 py-1.5 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 bg-[#B8D878]" />
                  <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-zinc-300">
                    {project.category}
                  </span>
                </div>

                <span className="absolute bottom-3 right-3 z-20 font-mono text-[9px] tracking-widest text-zinc-500">
                  PROJECT / {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Project information */}
              <div className="flex min-w-0 flex-col p-4 sm:p-5 lg:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Selected work
                  </span>

                  <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition-colors duration-300 group-hover:text-[#B8D878]" />
                </div>

                <h3 className="max-w-md break-words text-xl font-semibold leading-[1.08] tracking-[-0.055em] text-zinc-100 sm:text-2xl lg:text-3xl">
                  {project.title}
                </h3>

                <div className="mt-4 flex items-start gap-3">
                  <span className="mt-1 h-7 w-[2px] shrink-0 bg-[#B8D878]" />
                  <p className="line-clamp-4 text-xs leading-6 text-zinc-400 sm:text-sm">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Technology stack
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-[9px] text-zinc-400 transition-colors group-hover:border-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}

                    {project.tech.length > 4 && (
                      <span className="border border-zinc-800 px-2 py-1.5 text-[9px] text-zinc-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto mt-5 flex items-center justify-between gap-2 border-t border-zinc-800 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.1em] text-zinc-500">
                    {project.demoVideo ? "Demo available" : "Project details"}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#B8D878]">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[2px] w-0 bg-[#B8D878] transition-all duration-500 group-hover:w-full" />
          </motion.button>
        ))}
      </div>

      {/* Slider controls */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600">
          Swipe to explore
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            disabled={!canGoBack}
            onClick={() => scroll("left")}
            className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-300 transition hover:border-[#B8D878]/50 hover:text-[#B8D878] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Next projects"
            disabled={!canGoForward}
            onClick={() => scroll("right")}
            className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-300 transition hover:border-[#B8D878]/50 hover:text-[#B8D878] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const mainProjects = projects.filter((project) => project.featured);

  const otherProjects =
    active === "All"
      ? projects.filter((project) => !project.featured)
      : projects.filter(
          (project) => !project.featured && project.category === active,
        );

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#09090B] py-16 text-zinc-100 selection:bg-[#B8D878]/30 sm:py-20 lg:py-24"
    >
      {/* Editorial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #71717a 1px, transparent 1px), linear-gradient(to bottom, #71717a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 -z-10 h-72 w-72 bg-[#B8D878]/[0.04] blur-[110px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-12 grid gap-7 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B8D878]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400 sm:text-xs">
                A selection of my work
              </span>
            </div>

            <h2 className="max-w-4xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-zinc-100">
              Ideas into
              <br />
              <span className="font-serif font-normal italic text-[#B8D878]">
                real products.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
              A closer look at the systems, applications, and experiments I
              build — combining thoughtful interfaces with solid engineering.
            </p>
          </div>

          <div className="flex items-center gap-4 border-y border-zinc-800 py-4 lg:min-w-44 lg:justify-end lg:border-y-0 lg:border-l lg:py-2 lg:pl-6">
            <span className="text-4xl font-semibold tracking-[-0.06em] text-zinc-100 sm:text-5xl">
              {String(projects.length).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-300">
                Projects
              </p>
              <p className="mt-1 text-[10px] text-zinc-600">And counting</p>
            </div>
          </div>
        </div>

        {/* Featured projects */}
        {mainProjects.length > 0 && (
          <div className="mb-14 lg:mb-20">
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#B8D878]">
                  01 / Highlights
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl">
                  Featured work
                </h3>
              </div>

              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:block">
                Selected projects
              </span>
            </div>

            <ProjectSlider
              items={mainProjects}
              label="Featured projects"
              onSelect={setSelectedProject}
            />
          </div>
        )}

        {/* All projects */}
        <div>
          <div className="mb-6 flex flex-col gap-5 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#B8D878]">
                02 / The collection
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl">
                More projects
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={active === category}
                  className={`min-h-9 border px-3.5 py-2 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878] ${
                    active === category
                      ? "border-[#B8D878] bg-[#B8D878] text-[#151710]"
                      : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease }}
            >
              <ProjectSlider
                items={otherProjects}
                label="More projects"
                onSelect={setSelectedProject}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer line */}
        <div className="mt-14 flex flex-col gap-3 border-t border-zinc-800 pt-5 text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <span>Designed with intent.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[#B8D878]" />
            Built to scale.
          </span>
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal"
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-md sm:items-center sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 20, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.99 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[88dvh] w-full min-w-0 flex-col overflow-hidden border border-zinc-800 bg-[#09090B] shadow-2xl sm:max-h-[82dvh] sm:max-w-2xl lg:max-w-3xl"
            >
              {/* Modal header */}
              <div className="sticky top-0 z-30 flex shrink-0 items-center justify-between gap-4 border-b border-zinc-800 bg-[#09090B]/95 px-4 py-3 backdrop-blur-xl sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-2 w-2 shrink-0 bg-[#B8D878]" />
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                      Portfolio / Project
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-zinc-200">
                      {selectedProject.title}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-800 text-zinc-300 transition hover:border-[#B8D878]/50 hover:text-[#B8D878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="relative aspect-[16/7] w-full shrink-0 overflow-hidden border-b border-zinc-800 bg-[#050505]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-contain"
                  />

                  <span className="absolute bottom-3 left-3 border border-zinc-700 bg-black/80 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#B8D878]">
                    {selectedProject.category} / Project
                  </span>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B8D878]">
                    Project overview
                  </p>

                  <h3
                    id="project-modal-title"
                    className="mt-3 break-words text-2xl font-semibold leading-[1.05] tracking-[-0.06em] text-zinc-100 sm:text-3xl"
                  >
                    {selectedProject.title}
                  </h3>

                  <div className="mt-4 flex items-start gap-3">
                    <span className="mt-1 h-8 w-[2px] shrink-0 bg-[#B8D878]" />
                    <p className="break-words text-sm leading-6 text-zinc-400 sm:text-base">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="mt-6 border-y border-zinc-800 py-4">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      Technologies used
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300"
                        >
                          <span className="font-mono text-[9px] text-[#B8D878]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* External links */}
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-11 items-center justify-center gap-2 bg-[#B8D878] px-4 py-2.5 text-sm font-semibold text-[#151710] transition hover:bg-[#c9e694] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878]"
                    >
                      <Github className="h-4 w-4" />
                      GitHub Repository
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-11 items-center justify-center gap-2 border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-[#B8D878]/50 hover:text-[#B8D878] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878]"
                    >
                      Live Project
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  {/* X video demo */}
                  <div className="mt-6 border-t border-zinc-800 pt-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-800 bg-zinc-950 text-[#B8D878]">
                        <Play className="h-4 w-4" />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-zinc-100">
                          Project demo
                        </h4>
                        <p className="mt-1 text-xs text-zinc-500">
                          See the project in action
                        </p>
                      </div>
                    </div>

                    {selectedProject.demoVideo &&
                    getXPostId(selectedProject.demoVideo) ? (
                      <div className="w-full min-w-0 overflow-hidden border border-zinc-800 bg-black">
                        <div className="relative mx-auto aspect-[4/5] w-full max-h-[420px] sm:aspect-[5/4] md:aspect-[4/3]">
                          <iframe
                            key={getXPostId(selectedProject.demoVideo)}
                            src={`https://platform.twitter.com/embed/Tweet.html?id=${getXPostId(
                              selectedProject.demoVideo,
                            )}&theme=dark`}
                            title={`X demo video for ${selectedProject.title}`}
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                          />
                        </div>

                        <div className="border-t border-zinc-800 p-3">
                          <a
                            href={selectedProject.demoVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-10 w-full items-center justify-center gap-2 px-3 py-2 text-center text-xs font-medium text-[#B8D878] transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8D878] sm:text-sm"
                          >
                            Watch original post on X
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-dashed border-zinc-800 px-4 py-8 text-center">
                        <Play className="mx-auto mb-3 h-6 w-6 text-zinc-600" />

                        <p className="text-sm font-medium text-zinc-300">
                          No demo video added yet
                        </p>

                        <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-zinc-500">
                          Add the URL of your X post to this project&apos;s
                          demoVideo field to display your demo here.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-800 pt-4 text-[9px] uppercase tracking-[0.17em] text-zinc-600">
                    <span>Project / Details</span>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex items-center gap-2 transition hover:text-[#B8D878]"
                    >
                      Close overview
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
