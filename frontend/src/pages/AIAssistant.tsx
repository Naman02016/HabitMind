import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hey! I'm your HabitMind assistant. 🌿 Once connected to your saved data and an AI model, I'll help you understand your habits, find your notes, and review your progress. For now, the chat interface is ready for us to build on.",
    },
  ])

  const [input, setInput] = useState('')
  const [showDemoNotice, setShowDemoNotice] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const text = input.trim()
    if (!text) return

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: 'user',
        content: text,
      },
    ])

    setInput('')
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-73px)] max-w-6xl flex-col p-4 md:p-8">
      <header className="mb-5">
        <p className="mb-2 text-sm font-medium text-[#52664B]">
          YOUR PERSONAL ASSISTANT
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          AI Assistant
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#737B70]">
          Reflect on your habits, explore your notes, and understand your
          progress.
        </p>
      </header>

      {showDemoNotice && (
        <div className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-[#D9E2D2] bg-[#E5EBDD] p-4">
          <div className="flex gap-3">
            <Sparkles size={19} className="mt-0.5 shrink-0 text-[#52664B]" />
            <p className="text-sm leading-6 text-[#596255]">
              <span className="font-semibold">Interface preview:</span> Messages
              can be sent, but AI replies aren't connected yet. We'll connect
              the assistant to your saved data and an AI model later.
            </p>
          </div>
          <button
            onClick={() => setShowDemoNotice(false)}
            aria-label="Dismiss notice"
            className="shrink-0 rounded-lg px-2 py-1 text-[#737B70] hover:bg-[#D9E2D2]"
          >
            ×
          </button>
        </div>
      )}

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8]">
        <div className="flex items-center gap-3 border-b border-[#E5E2D9] px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5EBDD] text-[#52664B]">
            <Bot size={21} />
          </div>
          <div>
            <h3 className="text-sm font-semibold">HabitMind AI</h3>
            <p className="mt-1 text-xs text-[#737B70]">
              Your space to reflect and grow
            </p>
          </div>
          <span className="ml-auto rounded-full bg-[#E5EBDD] px-3 py-1 text-xs text-[#52664B]">
            Preview
          </span>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-4 md:p-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E5EBDD] text-[#52664B]">
                  <Bot size={17} />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 md:max-w-[75%] ${
                  message.role === 'user'
                    ? 'rounded-br-md bg-[#52664B] text-white'
                    : 'rounded-bl-md border border-[#E5E2D9] bg-white text-[#292E29]'
                }`}
              >
                {message.content}
              </div>

              {message.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#52664B] text-white">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-[#E5E2D9] p-3 md:p-4"
        >
          <div className="flex items-end gap-3 rounded-xl border border-[#E5E2D9] bg-white p-2 focus-within:border-[#52664B]">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder="Ask about your habits, lists, or notes..."
              rows={1}
              maxLength={2000}
              className="max-h-32 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-sm outline-none placeholder:text-[#A0A69B]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#52664B] text-white transition-colors hover:bg-[#41533B] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={17} />
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-[#737B70]">
            Preview only · AI responses aren't enabled yet
          </p>
        </form>
      </section>
    </div>
  )
}

export default AIAssistant