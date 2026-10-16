"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    category: "Typescript",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    live: "https://your-live-project.vercel.app",
    repo: "https://github.com/your-username/your-repository",
    image: "/projects/your-project.png",
    demoVideo: "https://x.com/akshaymarch7/status/2110741456927486015/video/1",
    featured: false,
  },
];

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

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.49 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.77 1.15 1.76 1.15 2.97 0 4.26-2.6 5.2-5.08 5.48.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.37L5.6 22H2.48l7.25-8.29L1.9 2h6.4l4.43 6.96L18.9 2Zm-1.1 18h1.73L7.36 3.89H5.5L17.8 20Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </svg>
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

  function renderProjectCard(project: Project, featured = false) {
    return (
      <motion.button
        key={project.title}
        type="button"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.985 }}
        onClick={() => setSelectedProject(project)}
        aria-label={`View details for ${project.title}`}
        className="group block w-full min-w-0 overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-lg shadow-black/20 transition-colors duration-300 hover:border-indigo-400/40">
          {/* IMAGE */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Desktop hover overlay; details are also visible below on mobile */}
            <div className="pointer-events-none absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-black/95 via-black/30 to-transparent p-5 opacity-0 transition-opacity duration-300 md:flex md:group-hover:opacity-100">
              <span className="mb-2 text-xs uppercase tracking-widest text-indigo-300">
                {project.category}
              </span>
              <p className="line-clamp-3 text-sm leading-relaxed text-gray-200">
                {project.description}
              </p>
            </div>
          </div>

          {/* CARD DETAILS */}
          <div className={featured ? "p-5 sm:p-6" : "p-4 sm:p-5"}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="min-w-0 break-words text-base font-semibold text-white transition-colors group-hover:text-indigo-300 sm:text-lg">
                {project.title}
              </h3>
              <span className="shrink-0 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-1 text-[10px] text-indigo-300 sm:text-xs">
                {project.category}
              </span>
            </div>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="max-w-full break-words rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-gray-300 sm:text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="rounded-md px-2 py-1 text-[11px] text-gray-500">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-gray-500">
                {project.demoVideo ? "Demo available" : "Project details"}
              </span>
              <span className="text-sm font-medium text-indigo-300">
                Explore <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-indigo-500/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-violet-500/[0.06] blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 space-y-4 sm:mb-16 lg:mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400 sm:text-sm">
            What I&apos;ve built
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Personal Projects
          </h2>

          <p className="max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Real-world systems focused on scalability and engineering depth.
          </p>
        </div>

        {/* FEATURED PROJECTS */}
        {mainProjects.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mb-24 lg:grid-cols-3 lg:gap-8">
            {mainProjects.map((project) => renderProjectCard(project, true))}
          </div>
        )}

        {/* FILTERS */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={active === category}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  active === category
                    ? "border-white bg-white text-black"
                    : "border-zinc-700 text-gray-400 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* OTHER PROJECTS */}
        {otherProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {otherProjects.map((project) => renderProjectCard(project))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-12 text-center sm:py-16">
            <p className="text-sm text-gray-400 sm:text-base">
              {projects.length === 0
                ? "Add your projects to the projects array to display them here."
                : "No projects found in this category yet."}
            </p>
          </div>
        )}
      </div>

      {/* RESPONSIVE PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-modal"
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.99 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[94dvh] w-full min-w-0 flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40 sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-2xl lg:max-w-4xl"
            >
              {/* STICKY MODAL HEADER */}
              <div className="sticky top-0 z-30 flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-zinc-950/95 px-4 py-3 backdrop-blur-xl sm:px-6">
                <span className="min-w-0 truncate text-xs font-medium uppercase tracking-[0.16em] text-indigo-400 sm:text-sm">
                  Project Overview
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl leading-none text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  &times;
                </button>
              </div>

              {/* SCROLLABLE MODAL CONTENT */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {/* PROJECT IMAGE */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black sm:aspect-[2/1]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-contain"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                </div>

                <div className="min-w-0 p-4 sm:p-6 md:p-8">
                  {/* TITLE AND DESCRIPTION */}
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-400 sm:text-xs">
                    {selectedProject.category} Project
                  </span>

                  <h3
                    id="project-modal-title"
                    className="mt-2 break-words text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl"
                  >
                    {selectedProject.title}
                  </h3>

                  <p className="mt-4 break-words text-sm leading-7 text-gray-400 sm:text-base">
                    {selectedProject.description}
                  </p>

                  {/* TECH STACK */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="max-w-full break-words rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-300 sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* ACTION LINKS */}
                  <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:text-base"
                    >
                      <GitHubIcon />
                      <span className="break-words">GitHub Repository</span>
                      <ExternalLinkIcon />
                    </a>

                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:text-base"
                    >
                      <span className="break-words">Live Project</span>
                      <ExternalLinkIcon />
                    </a>
                  </div>

                  {/* X DEMO */}
                  <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                    <div className="mb-5 flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white sm:h-11 sm:w-11">
                        <XIcon />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-base font-semibold text-white sm:text-lg">
                          Project Demo
                        </h4>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          Watch it in action
                        </p>
                      </div>
                    </div>

                    {selectedProject.demoVideo &&
                    getXPostId(selectedProject.demoVideo) ? (
                      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                        {/* The aspect-ratio wrapper scales the iframe with the viewport. */}
                        <div className="relative w-full aspect-[4/5] max-h-[650px] sm:aspect-[5/4] md:aspect-[4/3]">
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

                        <div className="border-t border-white/10 p-3 sm:p-4">
                          <a
                            href={selectedProject.demoVideo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-sm font-medium text-indigo-300 transition hover:bg-white/5 hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                          >
                            <XIcon />
                            <span>Watch original post on X</span>
                            <ExternalLinkIcon />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-8 text-center sm:px-6 sm:py-10">
                        <div className="mb-3 flex justify-center text-gray-500">
                          <XIcon className="h-7 w-7" />
                        </div>

                        <p className="text-sm font-medium text-gray-300 sm:text-base">
                          No demo video added yet
                        </p>

                        <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-gray-500 sm:text-sm">
                          Add the URL of your X post to this project&apos;s
                          demoVideo field to display your demo here.
                        </p>
                      </div>
                    )}
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
