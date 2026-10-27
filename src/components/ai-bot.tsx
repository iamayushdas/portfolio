"use client"

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Bot, RotateCcw, Send, Sparkles, X } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi, I’m Ayush AI. Ask me about my work, stack, or the kind of problems I like solving.",
}

const SUGGESTIONS = ["What have you built?", "What’s your stack?", "How can I hire you?"]

function renderInline(text: string): ReactNode[] {
  const tokens = /(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.\w+)/g
  const parts: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null
  let tokenIndex = 0

  while ((match = tokens.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index))

    const token = match[0]
    if (token.startsWith("**")) {
      parts.push(<strong key={`bold-${tokenIndex}`} className="font-semibold">{token.slice(2, -2)}</strong>)
    } else if (token.startsWith("`")) {
      parts.push(<code key={`code-${tokenIndex}`} className="rounded bg-black/10 px-1 py-0.5 font-mono text-[0.9em]">{token.slice(1, -1)}</code>)
    } else {
      const href = token.includes("@") && !token.startsWith("http") ? `mailto:${token}` : token
      parts.push(<a key={`link-${tokenIndex}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="underline decoration-current/40 underline-offset-2 hover:decoration-current">{token}</a>)
    }

    cursor = match.index + token.length
    tokenIndex += 1
  }

  if (cursor < text.length) parts.push(text.slice(cursor))
  return parts
}

function RichText({ content, tone }: { content: string; tone: "user" | "assistant" }) {
  const blocks: ReactNode[] = []
  const paragraph: string[] = []
  const bullets: string[] = []
  let blockIndex = 0

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    blocks.push(<p key={`paragraph-${blockIndex++}`}>{renderInline(paragraph.join(" "))}</p>)
    paragraph.length = 0
  }

  const flushBullets = () => {
    if (bullets.length === 0) return
    blocks.push(
      <ul key={`list-${blockIndex++}`} className="list-disc space-y-1.5 pl-4 marker:text-[#d7ff65]">
        {bullets.map((bullet, index) => <li key={`bullet-${index}`}>{renderInline(bullet)}</li>)}
      </ul>,
    )
    bullets.length = 0
  }

  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    const bullet = trimmed.match(/^[-*]\s+(.+)/)

    if (!trimmed) {
      flushParagraph()
      flushBullets()
    } else if (bullet) {
      flushParagraph()
      bullets.push(bullet[1])
    } else {
      flushBullets()
      paragraph.push(trimmed)
    }
  })

  flushParagraph()
  flushBullets()

  return <div className={tone === "assistant" ? "space-y-3 [&_a]:text-[#d7ff65] [&_strong]:text-white" : "space-y-3 [&_strong]:font-bold"}>{blocks}</div>
}

export function AiBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [isOpen, messages, isLoading])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    function openChat() {
      setIsOpen(true)
    }

    window.addEventListener("open-ai-chat", openChat)
    return () => window.removeEventListener("open-ai-chat", openChat)
  }, [])

  async function sendMessage(message = input) {
    const content = message.trim()
    if (!content || isLoading) return

    const userMessage: Message = { role: "user", content }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      })
      const data = (await response.json()) as { reply?: string; fallback?: boolean; error?: string }

      if (!response.ok || !data.reply) throw new Error(data.error ?? "Unable to reach the assistant")

      setUsingFallback(Boolean(data.fallback))
      setMessages((current) => [...current, { role: "assistant", content: data.reply as string }])
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "I’m having a quiet moment. Try again, or email me directly at ayush24das@gmail.com." }])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void sendMessage()
    }
  }

  function resetChat() {
    setMessages([INITIAL_MESSAGE])
    setInput("")
    setUsingFallback(false)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            key="ai-panel"
            role="dialog"
            aria-label="Ayush AI chat"
            aria-modal="true"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden border-0 bg-[#111116] shadow-none backdrop-blur-2xl md:bottom-24 md:left-auto md:right-6 md:top-auto md:h-[560px] md:max-h-none md:w-[380px] md:rounded-[1.5rem] md:border md:border-white/15 md:bg-[#111116]/95 md:shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          >
            <div className="relative border-b border-white/10 px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] md:pt-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d7ff65] to-transparent" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d7ff65] text-[#0a0a0c] shadow-[0_0_24px_rgba(215,255,101,0.15)]"><Bot className="h-5 w-5" /><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111116] bg-[#75d7ff]" /></div>
                  <div><p className="text-sm font-semibold text-white">Ayush AI</p><p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/35"><span className="h-1.5 w-1.5 rounded-full bg-[#d7ff65]" /> Portfolio guide</p></div>
                </div>
                <div className="flex items-center gap-1"><button type="button" onClick={resetChat} aria-label="Reset chat" className="rounded-lg p-2 text-white/30 transition-colors hover:bg-white/8 hover:text-white"><RotateCcw className="h-3.5 w-3.5" /></button><button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-lg p-2 text-white/30 transition-colors hover:bg-white/8 hover:text-white"><X className="h-4 w-4" /></button></div>
              </div>
            </div>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={message.role === "user" ? "max-w-[86%] rounded-2xl rounded-br-md bg-[#d7ff65] px-3.5 py-2.5 text-sm leading-5 text-[#0a0a0c]" : "max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm leading-5 text-white/70"}>
                    <RichText content={message.content} tone={message.role} />
                  </div>
                </div>
              ))}
              {messages.length === 1 && !isLoading && <div className="flex flex-wrap gap-2 pt-1">{SUGGESTIONS.map((suggestion) => <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)} className="rounded-full border border-white/10 px-3 py-2 text-[10px] text-white/45 transition-colors hover:border-[#d7ff65]/40 hover:text-[#d7ff65]">{suggestion}</button>)}</div>}
              {isLoading && <div className="flex justify-start"><div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-3"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d7ff65] [animation-delay:-0.2s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d7ff65] [animation-delay:-0.1s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d7ff65]" /></div></div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-3">
              {usingFallback && <p className="mb-2 px-1 text-[9px] text-white/25">Preview mode · add a Gemini key for live AI answers</p>}
              <form onSubmit={handleSubmit} className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 focus-within:border-[#d7ff65]/50">
                <textarea ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} rows={1} maxLength={1200} placeholder="Ask about my work…" aria-label="Message Ayush AI" className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2.5 text-sm leading-5 text-white outline-none placeholder:text-white/25" />
                <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#d7ff65] text-[#0a0a0c] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"><Send className="h-4 w-4" /></button>
              </form>
              <p className="mt-2 flex items-center justify-between px-1 text-[9px] text-white/20"><span>Enter to send · Shift + Enter for a new line</span><Sparkles className="h-3 w-3 text-[#d7ff65]/50" /></p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close Ayush AI" : "Open Ayush AI"} aria-expanded={isOpen} whileTap={{ scale: 0.95 }} className="fixed bottom-24 right-4 z-[60] hidden items-center gap-2 rounded-full border border-[#d7ff65]/50 bg-[#d7ff65] px-3.5 py-3 text-xs font-semibold text-[#0a0a0c] shadow-[0_10px_35px_rgba(215,255,101,0.2)] transition-transform hover:-translate-y-1 md:flex md:bottom-6 md:right-6 md:px-4">
        {isOpen ? <X className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
        <span className="hidden sm:inline">{isOpen ? "Close chat" : "Ask Ayush AI"}</span>
        {!isOpen && <ArrowUpRight className="hidden h-3.5 w-3.5 sm:inline" />}
      </motion.button>
    </>
  )
}
