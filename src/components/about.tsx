"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Brain, Code2, Globe2, Heart, Sparkles, Zap } from "lucide-react"

const stats = [
  { value: "04+", label: "years shipping" },
  { value: "100+", label: "components scaled" },
  { value: "5K+", label: "daily users reached" },
  { value: "50+", label: "open source PRs" },
]

const principles = [
  {
    number: "01",
    icon: Code2,
    title: "Systems over screens",
    desc: "I build foundations that make the next feature easier, faster, and more consistent than the last.",
    accent: "#d7ff65",
  },
  {
    number: "02",
    icon: Brain,
    title: "Useful intelligence",
    desc: "AI should remove friction and reveal the next best step—not make people decode a black box.",
    accent: "#a68bfa",
  },
  {
    number: "03",
    icon: Heart,
    title: "Care at the edges",
    desc: "The tiny transitions, loading states, and empty moments are where trust is earned.",
    accent: "#ff9f7f",
  },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:px-8 sm:py-24 lg:py-32">
      <div className="section-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="eyebrow mb-5">01 / The short version</p>
            <h2 className="display max-w-3xl text-5xl leading-[0.94] text-white sm:text-7xl">Good software has a point of view.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/45 lg:pb-1">I work at the intersection of product, engineering, and the quiet details that make a digital experience feel obvious.</p>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -left-4 top-1 h-24 w-px bg-gradient-to-b from-[#d7ff65] to-transparent" />
            <p className="pl-7 text-xl leading-8 text-white/70 sm:text-2xl sm:leading-9">
              I&apos;m Ayush, a software engineer at <span className="text-white">Optum</span>. I make web and mobile products that hold up under real users, real data, and real change.
            </p>
            <p className="mt-7 pl-7 text-sm leading-7 text-white/40">
              Before that, I was at Accenture building a component library, cross-platform commerce experiences, and a GPT-powered assistant. I also mentor open-source contributors through Google Summer of Code and keep learning in public.
            </p>
            <a href="#experience" className="group mt-9 ml-7 inline-flex items-center gap-2 border-b border-[#d7ff65]/40 pb-2 text-sm font-medium text-[#d7ff65] transition-colors hover:border-[#d7ff65]">
              Trace the journey <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-7">
              {stats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-white/35">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.number}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-6"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <div className="mb-16 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]" style={{ color: principle.accent }}>
                    <principle.icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] text-white/25">{principle.number}</span>
                </div>
                <h3 className="text-base font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 text-xs leading-6 text-white/40">{principle.desc}</p>
                <div className="absolute -bottom-12 -right-12 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" style={{ backgroundColor: principle.accent }} />
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-20 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#121216] px-5 py-4 sm:px-7"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-sm text-white/55"><Sparkles className="h-4 w-4 text-[#d7ff65]" /> A few things I care about</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
            <span className="inline-flex items-center gap-2"><Zap className="h-3 w-3 text-[#d7ff65]" /> speed</span>
            <span className="inline-flex items-center gap-2"><Globe2 className="h-3 w-3 text-[#a68bfa]" /> access</span>
            <span className="inline-flex items-center gap-2"><Code2 className="h-3 w-3 text-[#ff9f7f]" /> craft</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
