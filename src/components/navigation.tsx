"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  Home,
  Briefcase,
  Layers,
  BarChart3,
  Mail,
  Sparkles,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "#about", label: "About", icon: Home },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: Layers },
  { href: "#skills", label: "Skills", icon: BarChart3 },
  { href: "#contact", label: "Contact", icon: Mail },
]

const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((item) => item.href !== "#skills")

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState("#about")

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }

    function onHashChange() {
      setActiveHash(window.location.hash || "#about")
    }

    onScroll()
    onHashChange()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hashchange", onHashChange)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  function renderMobileItem(item: (typeof NAV_ITEMS)[number]) {
    const isActive = activeHash === item.href

    return (
      <a
        key={item.href}
        href={item.href}
        onClick={() => setActiveHash(item.href)}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[1rem] px-1.5 py-2 text-[9px] font-medium leading-none transition-all",
          isActive
            ? "bg-[#d7ff65] text-[#0a0a0c] shadow-[0_4px_18px_rgba(215,255,101,0.18)]"
            : "text-white/40 hover:bg-white/8 hover:text-white",
        )}
      >
        <item.icon className="h-4 w-4" />
        <span className="max-w-full truncate">{item.label}</span>
      </a>
    )
  }

  return (
    <>
      {/* Top header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[76px]">
            <Link href="/" className="group flex items-center gap-3" aria-label="Ayush Das home">
              <span className="display text-[1.75rem] leading-none tracking-[-0.08em] text-[#f5f3ee] sm:hidden">Ayush Das<span className="text-[#d7ff65]">.</span></span>
              <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#d7ff65] text-sm font-bold text-[#0a0a0c] transition-transform group-hover:rotate-12 sm:flex">AD</span>
              <span className="hidden text-sm font-semibold tracking-tight text-[#f5f3ee] sm:block">Ayush Das<span className="text-[#d7ff65]">.</span></span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7ff65] shadow-[0_0_12px_#d7ff65]" />
              <span>Available for select work</span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveHash(item.href)}
                  className={cn(
                    "rounded-full px-3 py-2 text-xs font-medium transition-all",
                    activeHash === item.href ? "bg-[#d7ff65] text-[#0a0a0c]" : "text-white/45 hover:bg-white/8 hover:text-white"
                  )}
                >
                  <span className="mr-1 text-[9px] opacity-50">0{index + 1}</span>{item.label}
                </a>
              ))}
            </nav>

            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#d7ff65]/40 px-4 py-2 text-xs font-semibold text-[#d7ff65] transition-all hover:bg-[#d7ff65] hover:text-[#0a0a0c]">
              Let&apos;s talk <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="mobile-tabbar md:hidden fixed inset-x-0 bottom-0 z-40 flex justify-center" aria-label="Mobile navigation">
        <div className="flex w-full max-w-[390px] items-center gap-1 overflow-visible rounded-[1.4rem] border border-white/15 bg-[#17171c]/75 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          {MOBILE_NAV_ITEMS.slice(0, 2).map(renderMobileItem)}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
            aria-label="Open Ayush AI"
            className="group flex min-w-0 flex-[1.15] flex-col items-center justify-center gap-1 rounded-[1rem] px-1 py-1 text-[9px] font-medium leading-none text-white/45 transition-colors hover:text-white"
          >
            <span className="relative -mt-6 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#17171c] bg-[#d7ff65] text-[#0a0a0c] shadow-[0_6px_20px_rgba(215,255,101,0.25)] transition-transform group-hover:-translate-y-1">
              <Sparkles className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#d7ff65] bg-[#75d7ff]" />
            </span>
            <span className="text-[#d7ff65]">Ask AI</span>
          </button>
          {MOBILE_NAV_ITEMS.slice(2).map(renderMobileItem)}
        </div>
      </nav>
    </>
  )
}
