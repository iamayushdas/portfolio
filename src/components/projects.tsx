"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink, Layers3, MoveUpRight } from "lucide-react"

type Project = {
  index: string
  title: string
  type: string
  description: string
  metric: string
  metricLabel: string
  tech: string[]
  accent: string
  visual: "claims" | "chat" | "system" | "mobile" | "cloud"
  featured?: boolean
}

const projects: Project[] = [
  {
    index: "01",
    title: "Insurance claim platform",
    type: "Product system · Optum",
    description: "A calmer control room for high-stakes work: claims, conversations, approvals, and the data that keeps everything moving.",
    metric: "40%",
    metricLabel: "faster launches",
    tech: ["React", "FastAPI", "GraphQL", "AI workflows"],
    accent: "#d7ff65",
    visual: "claims",
    featured: true,
  },
  {
    index: "02",
    title: "Commerce, with a conversation",
    type: "AI experience · Accenture",
    description: "A context-aware shopping assistant that understood products, pages, and the difference between a question and a purchase signal.",
    metric: "35%",
    metricLabel: "engagement lift",
    tech: ["Next.js", "LangChain", "OpenAI", "Contentful"],
    accent: "#a68bfa",
    visual: "chat",
    featured: true,
  },
  {
    index: "03",
    title: "The shared language",
    type: "Design system · Open source",
    description: "100+ reusable components giving product teams a shared vocabulary, tighter quality, and more time for the work that matters.",
    metric: "100+",
    metricLabel: "components shipped",
    tech: ["React", "TypeScript", "Storybook", "Tailwind"],
    accent: "#ff9f7f",
    visual: "system",
    featured: true,
  },
  {
    index: "04",
    title: "One commerce surface",
    type: "Cross-platform · Web + native",
    description: "A shared component language across Next.js, iOS, and Android for faster releases and fewer platform surprises.",
    metric: "20%",
    metricLabel: "faster releases",
    tech: ["Next.js", "Expo", "Firebase"],
    accent: "#75d7ff",
    visual: "mobile",
  },
  {
    index: "05",
    title: "The invisible accelerator",
    type: "Infrastructure · Azure DevOps",
    description: "A CI/CD pipeline that made shipping repeatable: tests, staging, production, and less waiting around for a deploy.",
    metric: "50%",
    metricLabel: "less deploy time",
    tech: ["Docker", "Git", "Azure DevOps"],
    accent: "#f4ce69",
    visual: "cloud",
  },
]

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "claims") {
    return (
      <div className="relative h-full min-h-64 overflow-hidden bg-[#1b2018] p-5 sm:min-h-72">
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[28px] border-[#d7ff65]/10" />
        <div className="relative rounded-xl border border-white/15 bg-[#111512]/90 p-3 shadow-2xl">
          <div className="mb-4 flex items-center justify-between"><span className="text-[9px] font-mono uppercase tracking-widest text-white/40">claim desk</span><span className="h-2 w-2 rounded-full bg-[#d7ff65]" /></div>
          <div className="grid grid-cols-3 gap-2">
            {["review", "in progress", "resolved"].map((label, i) => <div key={label} className="rounded-lg bg-white/[0.06] p-2"><p className="text-[8px] uppercase text-white/35">{label}</p><div className="mt-4 space-y-1.5"><span className="block h-1.5 w-full rounded-full bg-white/10" /><span className="block h-1.5 w-2/3 rounded-full" style={{ backgroundColor: i === 2 ? "#d7ff65" : "rgba(255,255,255,.18)" }} /></div></div>)}
          </div>
        </div>
        <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-[#d7ff65]/25 bg-[#d7ff65]/10 px-3 py-2 text-[10px] text-[#d7ff65]"><span className="h-1.5 w-1.5 rounded-full bg-[#d7ff65]" /> 1,248 live claims</div>
      </div>
    )
  }

  if (project.visual === "chat") {
    return (
      <div className="relative h-full min-h-64 overflow-hidden bg-[#1a1725] p-5 sm:min-h-72">
        <div className="absolute bottom-[-5rem] left-[-3rem] h-56 w-56 rounded-full bg-[#a68bfa]/20 blur-3xl" />
        <div className="relative ml-auto max-w-[15rem] space-y-3 pt-4">
          <div className="ml-auto w-4/5 rounded-2xl rounded-br-sm bg-[#a68bfa] p-3 text-[10px] leading-4 text-[#16111f]">Show me something for a rainy Sunday.</div>
          <div className="w-11/12 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.08] p-3 text-[10px] leading-4 text-white/70">Try the Field Notes jacket — light, water-resistant, and built for the long way home.</div>
          <div className="flex gap-2"><span className="h-16 flex-1 rounded-lg bg-white/10" /><span className="h-16 flex-1 rounded-lg bg-[#a68bfa]/30" /></div>
        </div>
        <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-widest text-[#a68bfa]">intent → useful</span>
      </div>
    )
  }

  if (project.visual === "system") {
    return (
      <div className="relative h-full min-h-64 overflow-hidden bg-[#241b18] p-5 sm:min-h-72">
        <div className="grid h-full grid-cols-4 grid-rows-4 gap-2 opacity-90">
          {Array.from({ length: 16 }).map((_, index) => <span key={index} className="rounded-md border border-white/10 bg-white/[0.06]" style={{ backgroundColor: index === 5 ? "#ff9f7f" : index === 10 ? "rgba(255,159,127,.3)" : undefined }} />)}
        </div>
        <div className="absolute bottom-5 left-5 rounded-full border border-[#ff9f7f]/30 bg-[#ff9f7f]/10 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-[#ff9f7f]">one source of truth</div>
      </div>
    )
  }

  if (project.visual === "mobile") {
    return (
      <div className="relative h-full min-h-64 overflow-hidden bg-[#132027] p-5 sm:min-h-72">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end gap-2">
          <div className="h-40 w-20 rounded-[1.1rem] border-2 border-white/20 bg-[#192d35] p-2 shadow-2xl"><div className="h-full rounded-[0.8rem] bg-gradient-to-b from-[#75d7ff]/50 to-transparent p-2"><span className="block h-1 w-7 rounded-full bg-white/40" /><span className="mt-6 block h-14 rounded-lg bg-white/10" /></div></div>
          <div className="h-48 w-24 rounded-[1.2rem] border-2 border-white/20 bg-[#1c323a] p-2 shadow-2xl"><div className="h-full rounded-[0.9rem] bg-gradient-to-b from-[#75d7ff]/60 to-transparent p-2"><span className="block h-1 w-8 rounded-full bg-white/40" /><span className="mt-6 block h-20 rounded-lg bg-white/10" /></div></div>
        </div>
        <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-widest text-[#75d7ff]">one system / three surfaces</span>
      </div>
    )
  }

  return (
    <div className="relative h-full min-h-64 overflow-hidden bg-[#282218] p-5 sm:min-h-72">
      <div className="absolute inset-x-6 top-1/2 h-px bg-[#f4ce69]/50" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f4ce69]/40"><span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4ce69] shadow-[0_0_16px_#f4ce69]" /></div>
      <div className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-widest text-[#f4ce69]">commit → build → ship</div>
      <div className="absolute bottom-5 right-5 rounded-full border border-[#f4ce69]/30 bg-[#f4ce69]/10 px-3 py-2 text-[9px] text-[#f4ce69]">pipeline green</div>
    </div>
  )
}

export function Projects() {
  const featured = projects.filter((project) => project.featured)
  const archive = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="relative overflow-hidden border-b border-white/10 px-5 py-28 sm:px-8 lg:py-36">
      <div className="relative mx-auto max-w-6xl">
        <motion.div className="mb-16 flex flex-col justify-between gap-7 sm:flex-row sm:items-end" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <div>
            <p className="eyebrow mb-5">03 / Selected work</p>
            <h2 className="display max-w-2xl text-5xl leading-[0.94] text-white sm:text-7xl">Proof of work, in public.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/40 sm:pb-1">A small edit of the products, systems, and experiments I&apos;ve helped move from idea to useful.</p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((project, index) => (
            <motion.article key={project.index} className={index === 0 ? "group overflow-hidden rounded-2xl border border-white/10 bg-[#15151a] lg:col-span-2" : "group overflow-hidden rounded-2xl border border-white/10 bg-[#15151a]"} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: index * 0.1 }}>
              <div className={index === 0 ? "grid lg:grid-cols-[0.9fr_1.1fr]" : "flex flex-col"}>
                <ProjectVisual project={project} />
                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: project.accent }}>{project.index} / {project.type}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#d7ff65]">{project.title}</h3></div>
                    <a href="https://github.com/iamayushdas" target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`} className="rounded-full border border-white/10 p-2 text-white/30 transition-all hover:border-white/30 hover:text-white"><ExternalLink className="h-4 w-4" /></a>
                  </div>
                  <p className="mt-5 max-w-lg text-sm leading-6 text-white/45">{project.description}</p>
                  <div className="mt-auto grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:mt-10"><div><p className="text-3xl font-semibold tracking-tight" style={{ color: project.accent }}>{project.metric}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/30">{project.metricLabel}</p></div><div className="flex flex-wrap content-start justify-end gap-1.5">{project.tech.map((tech) => <span key={tech} className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/35">{tech}</span>)}</div></div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#121216]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7"><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/35"><Layers3 className="h-3.5 w-3.5 text-[#d7ff65]" /> More in the archive</p><a href="https://github.com/iamayushdas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-[#d7ff65]">All repos <ArrowUpRight className="h-3.5 w-3.5" /></a></div>
          {archive.map((project) => <div key={project.index} className="group grid gap-4 border-b border-white/10 px-5 py-5 transition-colors last:border-0 hover:bg-white/[0.035] sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:px-7"><span className="font-mono text-[10px] text-white/25">{project.index}</span><div><p className="text-sm font-medium text-white/75 transition-colors group-hover:text-white">{project.title}</p><p className="mt-1 text-xs text-white/35">{project.type}</p></div><div className="flex items-center gap-5"><span className="font-mono text-xs" style={{ color: project.accent }}>{project.metric} <span className="text-white/25">{project.metricLabel}</span></span><MoveUpRight className="h-4 w-4 text-white/25 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div>)}
        </div>
      </div>
    </section>
  )
}
