import { ArrowUpRight, ArrowUp, GitBranch, Link2, Mail } from "lucide-react"

export function Footer() {
  const year = 2026

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0c] px-5 pb-32 pt-16 sm:px-8 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div>
            <p className="display text-[clamp(4rem,10vw,9rem)] leading-[0.8] text-white">AD<span className="text-[#d7ff65]">.</span></p>
            <p className="mt-7 max-w-sm text-sm leading-6 text-white/35">I make complex things feel simple — one thoughtful interface at a time.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-20">
            <div><p className="eyebrow mb-5 text-white/30">Navigate</p><nav className="space-y-2.5">{["About", "Experience", "Projects", "Skills", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="group flex items-center gap-1 text-sm text-white/45 transition-colors hover:text-[#d7ff65]">{item}<ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" /></a>)}</nav></div>
            <div><p className="eyebrow mb-5 text-white/30">Elsewhere</p><div className="space-y-2.5"><a href="mailto:ayush24das@gmail.com" className="flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-[#d7ff65]"><Mail className="h-3.5 w-3.5" />Email</a><a href="https://linkedin.com/in/iamayushdas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-[#a68bfa]"><Link2 className="h-3.5 w-3.5" />LinkedIn</a><a href="https://github.com/iamayushdas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"><GitBranch className="h-3.5 w-3.5" />GitHub</a></div></div>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-[10px] font-mono uppercase tracking-widest text-white/25 sm:flex-row sm:items-center"><span>© {year} Ayush Das</span><span>Built with Next.js · Framer Motion · a lot of curiosity</span><a href="#top" className="group flex items-center gap-2 transition-colors hover:text-[#d7ff65]">Back to top <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1" /></a></div>
      </div>
    </footer>
  )
}
