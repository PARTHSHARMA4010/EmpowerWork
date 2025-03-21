"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PaperclipIcon, SendIcon, Mic, Bot, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function AdvisorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI Career Advisor. How can I help with your career journey today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "I'd be happy to help with that! Let's start by discussing your specific goals and any challenges you're facing.",
        "That's a great question. Based on current job market trends, I'd recommend focusing on developing skills in these areas...",
        "I understand how challenging that can be. Here are some strategies that have worked well for others with similar experiences...",
        "Let's break this down into manageable steps. First, we should assess your current skills and interests...",
        "I can definitely help you prepare for that interview. Let's go through some common questions and how to highlight your unique strengths...",
      ]

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex items-start gap-3 max-w-[85%]", message.role === "user" ? "ml-auto" : "")}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "rounded-lg px-4 py-2 text-sm",
                message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground",
              )}
            >
              <div className="mb-1">{message.content}</div>
              <div
                className={cn(
                  "text-xs mt-1",
                  message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/80",
                )}
              >
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>

            {message.role === "user" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-secondary">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg px-4 py-2 text-sm flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Button variant="outline" size="icon" className="rounded-full shrink-0">
            <PaperclipIcon className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>

          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[80px] resize-none pr-12"
            />
            <div className="absolute right-3 bottom-3 flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Mic className="h-4 w-4" />
                <span className="sr-only">Voice input</span>
              </Button>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full h-8 w-8"
              >
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-center text-muted-foreground">
          Your conversations are private and help improve our AI.
          <Button variant="link" className="text-xs h-auto p-0 ml-1">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  )
}

