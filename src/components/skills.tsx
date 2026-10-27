"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Braces, Database, GitBranch, Infinity, Sparkles } from "lucide-react"

const groups = [
  { label: "Interface", icon: Braces, color: "#75d7ff", items: ["React / Next.js", "TypeScript", "React Native / Expo", "Tailwind CSS", "Framer Motion"] },
  { label: "Intelligence", icon: Sparkles, color: "#a68bfa", items: ["LangChain", "OpenAI API", "Prompt engineering", "RAG systems", "TensorFlow.js"] },
  { label: "Systems", icon: Infinity, color: "#d7ff65", items: ["Node.js / Express", "FastAPI / Python", "GraphQL", "REST APIs", "Docker"] },
  { label: "Data", icon: Database, color: "#ff9f7f", items: ["PostgreSQL", "MongoDB", "Firebase", "Supabase", "Redis"] },
]

const tools = ["AWS", "Vercel", "Azure DevOps", "GitHub Actions", "Storybook", "Contentful", "Figma", "Linear"]

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-b border-white/10 bg-[#101014] px-5 py-28 sm:px-8 lg:py-36">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <p className="eyebrow">04 / Working toolkit</p>
          <div><h2 className="display max-w-3xl text-5xl leading-[0.94] text-white sm:text-7xl">Tools are just vocabulary.</h2><p className="mt-6 max-w-xl text-sm leading-6 text-white/40">The real craft is knowing what to say, what to leave out, and how to make the whole thing hold together.</p></div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {groups.map((group, index) => (
            <motion.article key={group.label} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.045] sm:p-7" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.08 }}>
              <div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]" style={{ color: group.color }}><group.icon className="h-4 w-4" /></span><h3 className="text-sm font-semibold text-white">{group.label}</h3></div><span className="font-mono text-[10px] text-white/25">0{index + 1}</span></div>
              <div className="mt-8 space-y-4">{group.items.map((item, itemIndex) => <div key={item} className="flex items-center gap-3"><span className="h-px w-5 transition-all group-hover:w-8" style={{ backgroundColor: itemIndex < 2 ? group.color : "rgba(255,255,255,.2)" }} /><span className="text-sm text-white/50">{item}</span>{itemIndex === 0 && <span className="ml-auto rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest" style={{ backgroundColor: `${group.color}15`, color: group.color }}>deep</span>}</div>)}</div>
            </motion.article>
          ))}
        </div>

        <motion.div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.55fr]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="rounded-2xl border border-white/10 bg-[#15151a] p-6 sm:p-7"><div className="flex items-center gap-3"><GitBranch className="h-4 w-4 text-[#d7ff65]" /><p className="font-mono text-[10px] uppercase tracking-widest text-white/35">The orbit</p></div><div className="mt-7 flex flex-wrap gap-2">{tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/50 transition-colors hover:border-[#d7ff65]/40 hover:text-[#d7ff65]">{tool}</span>)}</div></div>
          <a href="#contact" className="group relative overflow-hidden rounded-2xl border border-[#d7ff65]/25 bg-[#d7ff65] p-6 text-[#0a0a0c] transition-transform hover:-translate-y-1 sm:p-7"><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><Sparkles className="h-5 w-5" /><ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><p className="mt-12 max-w-[12rem] text-xl font-semibold leading-6">Have a hard problem? Bring it.</p></div><div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full border-[18px] border-black/10" /></a>
        </motion.div>
      </div>
    </section>
  )
}
