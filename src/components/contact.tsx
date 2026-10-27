"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Check, Clock3, GitBranch, Link2, Loader2, Mail, MapPin, Sparkles } from "lucide-react"

const contactLinks = [
  { icon: Mail, label: "Email", value: "ayush24das@gmail.com", href: "mailto:ayush24das@gmail.com" },
  { icon: Link2, label: "LinkedIn", value: "/in/iamayushdas", href: "https://linkedin.com/in/iamayushdas" },
  { icon: GitBranch, label: "GitHub", value: "/iamayushdas", href: "https://github.com/iamayushdas" },
]

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus("loading")
    await new Promise((resolve) => setTimeout(resolve, 900))
    setStatus("done")
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setStatus("idle"), 3500)
  }

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-8 lg:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#d7ff65]/[0.06] blur-[130px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <p className="eyebrow">05 / Say hello</p>
          <div><h2 className="display max-w-3xl text-5xl leading-[0.9] text-white sm:text-7xl">Let&apos;s make something worth remembering.</h2><p className="mt-6 max-w-xl text-sm leading-6 text-white/40">Have a product to shape, a system to untangle, or a good question? I&apos;d like to hear it.</p></div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#15151a] p-6 sm:p-8" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }}>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d7ff65] text-[#0a0a0c]"><Sparkles className="h-5 w-5" /></div>
              <p className="mt-10 text-2xl font-semibold tracking-tight text-white">The inbox is open.</p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/40">I&apos;m currently open to thoughtful product work, engineering collaborations, and conversations about making the web more human.</p>
            </div>
            <div className="mt-14 space-y-3">
              {contactLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-3.5 transition-colors hover:border-white/25 hover:bg-white/[0.06]"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/45 transition-colors group-hover:text-[#d7ff65]"><link.icon className="h-4 w-4" /></span><span className="min-w-0"><span className="block text-[10px] font-mono uppercase tracking-widest text-white/25">{link.label}</span><span className="mt-0.5 block truncate text-sm text-white/60 transition-colors group-hover:text-white">{link.value}</span></span><ArrowUpRight className="ml-auto h-4 w-4 text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs text-white/30"><Clock3 className="h-3.5 w-3.5 text-[#d7ff65]" /> Usually replies within 48 hours</div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: 0.1 }}>
            <div className="mb-8 flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-widest text-white/35">Project brief</p><span className="text-[10px] text-white/25">01 — 03</span></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block"><span className="mb-2 block text-xs text-white/40">Your name</span><input type="text" placeholder="Jane Smith" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required disabled={status === "loading"} className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#d7ff65]/60 focus:bg-white/[0.07] disabled:opacity-50" /></label>
              <label className="block"><span className="mb-2 block text-xs text-white/40">Email address</span><input type="email" placeholder="hello@company.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required disabled={status === "loading"} className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#d7ff65]/60 focus:bg-white/[0.07] disabled:opacity-50" /></label>
            </div>
            <label className="mt-5 block"><span className="mb-2 block text-xs text-white/40">What are we making?</span><textarea rows={7} placeholder="A little context goes a long way..." value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required disabled={status === "loading"} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-[#d7ff65]/60 focus:bg-white/[0.07] disabled:opacity-50" /></label>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs text-[10px] leading-4 text-white/25">No pitch deck required. Just the problem, the ambition, and where you are today.</p><button type="submit" disabled={status === "loading"} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#d7ff65] px-5 py-3 text-sm font-semibold text-[#0a0a0c] transition-transform hover:-translate-y-0.5 disabled:opacity-60">{status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}{status === "done" && <Check className="h-4 w-4" />}{status === "idle" ? "Send the brief" : status === "loading" ? "Sending…" : "Message sent"}<ArrowUpRight className="h-4 w-4" /></button></div>
            {status === "done" && <motion.p className="mt-5 text-right text-xs text-[#d7ff65]" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>Thanks — I&apos;ll be in touch soon.</motion.p>}
          </motion.form>
        </div>

        <motion.div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-white/30" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#d7ff65]" /> Bengaluru, India · IST</span><span>Good work starts with a good conversation.</span></motion.div>
      </div>
    </section>
  )
}
