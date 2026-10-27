"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Check, GitFork, MapPin, GraduationCap } from "lucide-react"

const experiences = [
  {
    id: "now",
    company: "Optum Global Solutions",
    role: "Software Engineer",
    period: "May 2025 — now",
    location: "Bengaluru, India",
    color: "#d7ff65",
    summary: "Making insurance workflows feel less like insurance software.",
    achievements: [
      "Built a claim platform from zero: Kanban workflows, AI replies, SSO, and analytics.",
      "Shipped a drag-and-drop page builder that cut launch turnaround by 40%.",
      "Owned the frontend for a compliance portal serving 3,000+ users on Sparq.",
    ],
    tech: ["React", "Next.js", "TypeScript", "FastAPI", "GraphQL", "TanStack Query"],
  },
  {
    id: "before",
    company: "Accenture",
    role: "Software Engineer Analyst",
    period: "Sep 2022 — May 2025",
    location: "Bengaluru, India",
    color: "#a68bfa",
    summary: "Building the shared language behind a growing product ecosystem.",
    achievements: [
      "Created a 100+ component library that improved reuse by 40% and dev cycles by 25%.",
      "Delivered web, iOS, and Android commerce apps with a shared design language.",
      "Shipped a LangChain GPT chatbot that increased engagement by 35%.",
    ],
    tech: ["React", "React Native", "Expo", "LangChain", "GraphQL", "Azure DevOps"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden border-b border-white/10 bg-[#101014] px-5 py-28 sm:px-8 lg:py-36">
      <div className="pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[#a68bfa]/[0.06] blur-[110px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">02 / Work history</p>
          <div>
            <h2 className="display max-w-3xl text-5xl leading-[0.94] text-white sm:text-7xl">The through line is always the same: make it better.</h2>
            <p className="mt-6 max-w-xl text-sm leading-6 text-white/40">A few chapters from the last four years of designing, engineering, debugging, mentoring, and shipping.</p>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="hidden lg:block">
            <div className="sticky top-32 rounded-2xl border border-white/10 bg-white/[0.025] p-7">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Selected signal</p>
              <p className="mt-8 text-6xl font-semibold tracking-[-0.08em] text-[#d7ff65]">40<span className="text-3xl">%</span></p>
              <p className="mt-2 max-w-[13rem] text-sm leading-6 text-white/45">faster launch turnaround through a better editor and a little less friction.</p>
              <div className="mt-12 h-px bg-white/10" />
              <p className="mt-5 text-xs leading-5 text-white/35">The metric matters. The mechanism matters more.</p>
            </div>
          </div>

          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <motion.article
                key={experience.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#15151a] transition-all duration-500 hover:border-white/20"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: experience.color }} />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: experience.color }}>{experience.id === "now" ? "Current chapter" : "Previous chapter"}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{experience.role}</h3>
                      <p className="mt-1 text-sm font-medium text-white/50">{experience.company}</p>
                    </div>
                    <div className="space-y-2 text-xs text-white/35 sm:text-right">
                      <p className="flex items-center gap-2 sm:justify-end"><Calendar className="h-3.5 w-3.5" />{experience.period}</p>
                      <p className="flex items-center gap-2 sm:justify-end"><MapPin className="h-3.5 w-3.5" />{experience.location}</p>
                    </div>
                  </div>

                  <p className="mt-8 max-w-lg text-lg leading-7 text-white/75">{experience.summary}</p>
                  <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                    {experience.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3 text-sm leading-6 text-white/45">
                        <Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: experience.color }} />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {experience.tech.map((tech) => <span key={tech} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/40">{tech}</span>)}
                    <a href="#contact" className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-white/35 transition-colors hover:text-white">Say hello <ArrowUpRight className="h-3.5 w-3.5" /></a>
                  </div>
                </div>
              </motion.article>
            ))}

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <motion.div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <GraduationCap className="h-5 w-5 text-[#ff9f7f]" />
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/30">Education</p>
                <h3 className="mt-3 text-sm font-semibold text-white">B.Tech in Information Technology</h3>
                <p className="mt-1 text-xs leading-5 text-white/40">Maharaja Surajmal Institute of Technology · 2018—2022</p>
                <p className="mt-4 text-xs text-[#ff9f7f]">8.14 CGPA</p>
              </motion.div>
              <motion.div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <GitFork className="h-5 w-5 text-[#a68bfa]" />
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/30">In the commons</p>
                <p className="mt-3 text-sm leading-6 text-white/55">GSoC mentor for Apache APISIX. Contributions across APISIX, Docusaurus, Relay, and Supabase.</p>
                <p className="mt-4 text-xs text-[#a68bfa]">Build in public ↗</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
