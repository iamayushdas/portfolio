"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowDownRight, ArrowUpRight, GitBranch, Link2, Mail, Sparkles } from "lucide-react"
import type { CSSProperties } from "react"

const stack = ["React", "Next.js", "TypeScript", "React Native", "AI systems", "Design systems"]

export function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function onMove(event: MouseEvent) {
      setMouse({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const gridStyle = {
    "--mx": mouse.x,
    "--my": mouse.y,
    backgroundImage:
      "radial-gradient(circle at var(--mx)px var(--my)px, rgba(215, 255, 101, 0.18) 0%, transparent 28%), linear-gradient(rgba(245,243,238,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.035) 1px, transparent 1px)",
    backgroundSize: "100% 100%, 72px 72px, 72px 72px",
    backgroundRepeat: "no-repeat, repeat, repeat",
  } as CSSProperties

  return (
    <section className="relative min-h-[680px] overflow-hidden border-b border-white/10 bg-[#0a0a0c] pt-20 lg:min-h-[760px]">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={gridStyle} />
      <div className="pointer-events-none absolute -right-48 top-28 h-[34rem] w-[34rem] rounded-full bg-[#a68bfa]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#d7ff65]/[0.06] blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-6xl flex-col justify-between px-5 pb-6 sm:px-8 lg:min-h-[680px]">
        <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-12">
          <div>
            <motion.div
              className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d7ff65]/50 text-[#d7ff65]">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="eyebrow">Independent software engineer / 04.26</span>
            </motion.div>

            <motion.h1
              className="display max-w-4xl text-[clamp(3.25rem,15vw,7.7rem)] leading-[0.88] text-[#f5f3ee] sm:text-[clamp(3.8rem,8vw,7.7rem)]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              I make complex
              <span className="relative mx-2 inline-block text-[#d7ff65] sm:mx-3">
                feel simple.
                <svg className="absolute -bottom-3 left-0 h-3 w-full overflow-visible" viewBox="0 0 250 12" fill="none" aria-hidden="true">
                  <path d="M2 8C50 2 120 2 248 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-base leading-7 text-white/55 sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I&apos;m a product-minded engineer turning ambitious ideas into calm interfaces, durable systems, and AI that knows when to stay out of the way.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href="#projects" className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d7ff65] px-5 py-3.5 text-sm font-semibold text-[#0a0a0c] transition-transform hover:-translate-y-1 sm:w-auto">
                See selected work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#contact" className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 px-5 py-3.5 text-sm font-semibold text-white/75 transition-all hover:border-[#d7ff65]/50 hover:text-[#d7ff65] sm:w-auto">
                Start a conversation <ArrowDownRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/35"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a href="mailto:ayush24das@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-[#d7ff65]"><Mail className="h-3.5 w-3.5" />ayush24das@gmail.com</a>
              <a href="https://github.com/iamayushdas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white"><GitBranch className="h-3.5 w-3.5" />GitHub</a>
              <a href="https://linkedin.com/in/iamayushdas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-[#a68bfa]"><Link2 className="h-3.5 w-3.5" />LinkedIn</a>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[26rem] lg:mx-0 lg:ml-auto"
            initial={{ opacity: 0, scale: 0.96, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -inset-4 rounded-[2rem] border border-dashed border-[#d7ff65]/20" />
            <div className="relative aspect-[0.86] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#19191e] shadow-2xl shadow-black/40">
              <Image src="/assets/ayush-photo.png" alt="Ayush Das smiling in a hoodie" fill priority sizes="(max-width: 1024px) 80vw, 420px" className="object-cover object-top grayscale-[0.15] transition duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/70 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0c]/65 px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-white/70 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d7ff65] shadow-[0_0_10px_#d7ff65]" />
                Currently building
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-white">Ayush Das</p>
                  <p className="mt-1 text-xs text-white/50">Bengaluru, India · IST</p>
                </div>
                <div className="float-slow flex h-12 w-12 items-center justify-center rounded-full bg-[#d7ff65] text-[#0a0a0c]">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-7 hidden rounded-xl border border-white/10 bg-[#15151a] p-4 shadow-xl sm:block">
              <p className="eyebrow mb-2 text-[9px]">Focus right now</p>
              <p className="text-sm font-medium text-white/80">Human-scale AI tools</p>
              <div className="mt-3 flex gap-1">
                <span className="h-1 w-10 rounded-full bg-[#d7ff65]" />
                <span className="h-1 w-4 rounded-full bg-[#a68bfa]" />
                <span className="h-1 w-2 rounded-full bg-white/20" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid items-end gap-5 border-t border-white/10 pt-5 sm:grid-cols-[1fr_auto_1fr]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="hidden text-xs leading-5 text-white/35 sm:block">From product thinking to pixel polish.<br />A little obsession in every layer.</p>
          <div className="flex max-w-full gap-2 overflow-hidden sm:max-w-[34rem]">
            <div className="marquee-track flex shrink-0 gap-2">
              {[...stack, ...stack].map((item, index) => <span key={`${item}-${index}`} className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/45">{item}</span>)}
            </div>
          </div>
          <a href="#about" className="group ml-auto inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 transition-colors hover:text-[#d7ff65]">
            Scroll to explore <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
