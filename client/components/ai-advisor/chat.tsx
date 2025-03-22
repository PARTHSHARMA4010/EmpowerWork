"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  PaperclipIcon,
  SendIcon,
  Mic,
  Bot,
  User,
  Loader2,
  Sparkles,
  FileText,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini API with direct API key
// Make sure to replace this with your actual API key for production
// For better security, this should be handled through an environment variable and server-side
const GEMINI_API_KEY = "AIzaSyC7gCMzu1z_xSkxmNv9VMcoKLK6-EMhBtM" // Replace this with your actual API key
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type SuggestionCategory = {
  id: string
  name: string
  icon: React.ElementType
  suggestions: string[]
}

const suggestionCategories: SuggestionCategory[] = [
  {
    id: "resume",
    name: "Resume",
    icon: FileText,
    suggestions: [
      "Review my resume for accessibility-friendly formatting",
      "How can I highlight my adaptive skills on my resume?",
      "What accommodations should I mention in my resume?",
    ],
  },
  {
    id: "interview",
    name: "Interviews",
    icon: MessageSquare,
    suggestions: [
      "How should I discuss my disability in an interview?",
      "Practice answering behavioral questions",
      "Tips for virtual interviews with my specific needs",
    ],
  },
  {
    id: "jobs",
    name: "Job Search",
    icon: Briefcase,
    suggestions: [
      "Find inclusive employers in my field",
      "How to research company accessibility policies",
      "Networking strategies for people with disabilities",
    ],
  },
  {
    id: "skills",
    name: "Skills",
    icon: GraduationCap,
    suggestions: [
      "What skills are in demand for my field?",
      "Accessible learning resources for technical skills",
      "How to showcase my adaptive problem-solving skills",
    ],
  },
  {
    id: "career",
    name: "Career Paths",
    icon: Award,
    suggestions: [
      "What careers match my abilities and interests?",
      "Career transition advice with my specific considerations",
      "Long-term career planning with disability considerations",
    ],
  },
  {
    id: "workplace",
    name: "Workplace",
    icon: Lightbulb,
    suggestions: [
      "How to request reasonable accommodations",
      "Navigating workplace challenges",
      "Building professional relationships and self-advocacy",
    ],
  },
]

export function AIAdvisorChat() {
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
  const [activeCategory, setActiveCategory] = useState<string>("resume")

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Alternative implementation using server API route
  const generateGeminiResponse = async (prompt: string, history: Message[]) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      // Ensure the first message in history is from the user
      let formattedHistory = history.map((msg, index) => ({
        role: index === 0 ? "user" : msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));
  
      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          maxOutputTokens: 1000,
        }
      });
  
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
  
      console.log("Gemini API Response:", response);  // Debug log
  
      return response.text();
    } catch (error) {
      console.error("Error with Gemini API:", error);
      return "I'm having trouble connecting to my services. Please try again in a moment.";
    }
  };
  
  // Alternative server-side approach
  const generateResponseServerSide = async (prompt: string, history: Message[]) => {
    try {
      // You would implement this API route in your Next.js app
      const response = await fetch('/api/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt, 
          history: history.map(msg => ({ 
            role: msg.role, 
            content: msg.content 
          }))
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate response')
      }
      
      const data = await response.json()
      return data.text
    } catch (error) {
      console.error("Server error:", error)
      return "I'm having trouble connecting to my services. Please try again in a moment."
    }
  }

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Get the message history excluding the latest user message
      const conversationHistory = messages

      // For direct API access (when API key is properly set)
      const aiResponse = await generateGeminiResponse(text, conversationHistory)
      
      // For server-side approach (recommended for production)
      // const aiResponse = await generateResponseServerSide(text, conversationHistory)

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      
      // Fallback to canned responses if API fails
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  return (
    <div id="chat" className="scroll-mt-16">
      <Card className="border-none bg-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Career Advisor
              </CardTitle>
              <CardDescription className="mt-1.5">
                Ask me anything about your career journey, resume, interviews, or job search
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1 bg-primary/5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium">Online</span>
              </div>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Suggestions */}
          <div className="px-6 py-4 border-b">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap bg-transparent p-0 h-auto gap-2">
                {suggestionCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 h-auto border border-border data-[state=active]:border-primary"
                  >
                    <category.icon className="mr-1.5 h-3.5 w-3.5" />
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {suggestionCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="flex flex-wrap gap-2">
                    {category.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="bg-background/80 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Chat messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex items-start gap-3 max-w-[85%]", message.role === "user" ? "ml-auto" : "")}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm shadow-sm",
                    message.role === "assistant"
                      ? "bg-card border border-border"
                      : "bg-primary text-primary-foreground",
                    message.role === "assistant" ? "rounded-tl-none" : "rounded-tr-none",
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
                  <Avatar className="h-9 w-9 border">
                    <AvatarFallback className="bg-secondary">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card rounded-xl rounded-tl-none px-4 py-3 text-sm shadow-sm border border-border flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Input area */}
        <CardFooter className="p-4 border-t bg-muted/30">
          <div className="flex items-end gap-2 w-full">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shrink-0 bg-background hover:bg-background/80"
            >
              <PaperclipIcon className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <div className="relative flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[80px] resize-none pr-12 bg-background border-muted"
              />
              <div className="absolute right-3 bottom-3 flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Voice input</span>
                </Button>
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="rounded-full h-8 w-8 bg-primary hover:bg-primary/90"
                >
                  <SendIcon className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}