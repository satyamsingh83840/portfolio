"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Layout, Server, Database, Cloud, Cpu } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */
const skillGroups = [
  {
    title: "Languages",
    accent: "from-blue-400/30 via-blue-500/10 to-transparent",
    color: "text-blue-400",
    icon: <Code2 className="w-5 h-5" />,
    skills: ["TypeScript", "JavaScript", "Python"],
  },
  {
    title: "Frontend",
    accent: "from-purple-400/30 via-purple-500/10 to-transparent",
    color: "text-purple-400",
    icon: <Layout className="w-5 h-5" />,
    skills: ["Next.js", "React", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & APIs",
    accent: "from-emerald-400/30 via-emerald-500/10 to-transparent",
    color: "text-emerald-400",
    icon: <Server className="w-5 h-5" />,
    skills: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST APIs",
      "Microservices",
      "Apache Kafka",
    ],
  },
  {
    title: "Databases & ORM",
    accent: "from-amber-400/30 via-amber-500/10 to-transparent",
    color: "text-amber-400",
    icon: <Database className="w-5 h-5" />,
    skills: ["MongoDB", "PostgreSQL", "Prisma", "Drizzle ORM", "Redis"],
  },
  {
    title: "DevOps & Infrastructure",
    accent: "from-sky-400/30 via-sky-500/10 to-transparent",
    color: "text-sky-400",
    icon: <Cloud className="w-5 h-5" />,
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
  },
  {
    title: "Generative AI & Agents",
    accent: "from-rose-400/30 via-rose-500/10 to-transparent",
    color: "text-rose-400",
    icon: <Cpu className="w-5 h-5" />,
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
  },
];
/* -------------------------------------------------------------------------- */
/*                                 ANIMATION                                  */
/* -------------------------------------------------------------------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

/* -------------------------------------------------------------------------- */
/*                                   VIEW                                     */
/* -------------------------------------------------------------------------- */

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-36 bg-zinc-950 text-zinc-200 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#ffffff08,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] mask-radial-faded pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-400 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYSTEM STACK
          </span>

          <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Engineering{" "}
            <span className="italic font-serif text-zinc-500">Toolkit</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
            A carefully engineered stack optimized for performance, scale, and
            long-term maintainability — not hype-driven tooling.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={card}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              className="relative group rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl p-6 transition-all"
            >
              {/* Gradient glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl bg-gradient-to-br ${group.accent}`}
              />

              {/* Header */}
              <div className="relative z-10 flex items-center gap-3 mb-8">
                <div
                  className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${group.color}`}
                >
                  {group.icon}
                </div>
                <h3 className="text-lg font-medium tracking-tight">
                  {group.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-md border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
