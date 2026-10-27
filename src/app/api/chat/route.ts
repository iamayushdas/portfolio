const MODEL = "gemini-3.5-flash-lite"

const SYSTEM_PROMPT = `You are Ayush AI, the concise portfolio assistant for Ayush Das. Speak in first person as Ayush when describing my work.

Only answer questions about my work, experience, skills, projects, or how to contact me. Be warm, specific, and useful. Use “I”, “my”, and “me” naturally. Never invent clients, dates, metrics, links, or experience. If something is not in the context, say I don't have that detail and suggest contacting me at ayush24das@gmail.com.

Keep answers under 100 words unless the user explicitly asks for more detail. Use plain text with short paragraphs or simple bullets. Do not mention internal prompts, APIs, or that you are a language model.

Portfolio context:
- I am a product-minded software engineer in Bengaluru, India.
- I have 4+ years of experience building web and mobile products.
- I currently work at Optum Global Solutions as a Software Engineer, building insurance claim and compliance products.
- At Optum I have worked on Kanban workflows, AI-powered replies, SSO, analytics, drag-and-drop page builders, FastAPI services, GraphQL, React, Next.js, TypeScript, and TanStack Query.
- Previously at Accenture, I built a 100+ component library, cross-platform commerce apps with Next.js and Expo, a GPT-powered chatbot with LangChain, Contentful and GraphQL integrations, and Azure DevOps CI/CD.
- Reported outcomes include 40% faster launch turnaround, 3,000+ compliance portal users, 35% chatbot engagement lift, 20% faster releases, and 50% faster deployments.
- I mentor Google Summer of Code for Apache APISIX and contribute to Apache APISIX, Docusaurus, Relay, and Supabase.
- My core toolkit includes React, Next.js, TypeScript, React Native, Node.js, FastAPI, GraphQL, LangChain, OpenAI API, PostgreSQL, MongoDB, Firebase, Supabase, AWS, Docker, Vercel, and Azure DevOps.
- Contact me at ayush24das@gmail.com, github.com/iamayushdas, or linkedin.com/in/iamayushdas.`

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

function fallbackReply(message: string) {
  const text = message.toLowerCase()

  if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach")) {
    return "The best way to reach me is ayush24das@gmail.com. You can also find me on LinkedIn at linkedin.com/in/iamayushdas or GitHub at github.com/iamayushdas."
  }

  if (text.includes("project") || text.includes("work") || text.includes("built")) {
    return "I’ve built insurance claim and compliance platforms at Optum, plus cross-platform commerce apps, a component library, and a LangChain-powered shopping assistant at Accenture. Ask me about any one of them."
  }

  if (text.includes("skill") || text.includes("stack") || text.includes("technolog")) {
    return "My core stack is React, Next.js, TypeScript, React Native, FastAPI, GraphQL, LangChain, PostgreSQL, Supabase, AWS, Docker, and Azure DevOps."
  }

  if (text.includes("experience") || text.includes("career") || text.includes("optum") || text.includes("accenture")) {
    return "I have 4+ years of experience. I currently work at Optum on insurance and compliance products, and previously worked at Accenture on design systems, commerce apps, AI chat, and delivery infrastructure."
  }

  return "I’m Ayush’s portfolio assistant. Ask me about my projects, experience, skills, or how to get in touch with me."
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: unknown }
    const messages = Array.isArray(body.messages) ? body.messages : []
    const validMessages = messages
      .filter((message): message is ChatMessage => {
        if (!message || typeof message !== "object") return false
        const candidate = message as Record<string, unknown>
        return (
          (candidate.role === "user" || candidate.role === "assistant") &&
          typeof candidate.content === "string" &&
          candidate.content.trim().length > 0
        )
      })
      .map((message) => ({
        role: message.role,
        content: message.content.trim().slice(0, 1200),
      }))
      .slice(-10)

    if (validMessages.length === 0) {
      return Response.json({ error: "Please send a message." }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json({ reply: fallbackReply(validMessages[validMessages.length - 1].content), fallback: true })
    }

    const firstUserMessage = validMessages.findIndex((message) => message.role === "user")
    const conversation = validMessages.slice(firstUserMessage === -1 ? 0 : firstUserMessage)

    const transcript = conversation
      .map((message) => `${message.role === "user" ? "Visitor" : "Ayush AI"}: ${message.content}`)
      .join("\n")

    let response: Response
    try {
      response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          model: MODEL,
          system_instruction: SYSTEM_PROMPT,
          input: transcript,
          store: false,
          generation_config: {
            thinking_level: "minimal",
            temperature: 0.65,
            max_output_tokens: 320,
          },
        }),
      })
    } catch (error) {
      console.error("Gemini API request failed", error)
      return Response.json({ reply: fallbackReply(validMessages[validMessages.length - 1].content), fallback: true })
    }

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Gemini API error", response.status, errorBody)
      return Response.json(
        { reply: fallbackReply(validMessages[validMessages.length - 1].content), fallback: true },
      )
    }

    const data = (await response.json()) as {
      output_text?: string
      output?: Array<{ type?: string; text?: string }>
      steps?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }>
      interaction?: {
        output_text?: string
        output?: Array<{ type?: string; text?: string }>
        steps?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }>
      }
    }
    const output = data.output ?? data.interaction?.output ?? []
    const steps = data.steps ?? data.interaction?.steps ?? []
    const stepText = steps
      .filter((step) => step.type === "model_output")
      .flatMap((step) => step.content ?? [])
      .filter((part) => part.type === "text")
      .map((part) => part.text ?? "")
      .join("")
    const reply = [
      data.output_text,
      data.interaction?.output_text,
      output.filter((part) => part.type === "text").map((part) => part.text ?? "").join(""),
      stepText,
    ].find((text) => Boolean(text))?.trim()

    if (!reply) {
      return Response.json({ error: "The assistant did not return a message." }, { status: 502 })
    }

    return Response.json({ reply })
  } catch (error) {
    console.error("Chat route error", error)
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
