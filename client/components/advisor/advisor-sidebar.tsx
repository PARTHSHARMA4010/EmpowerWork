"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  FileText,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  PanelRight,
  ChevronRight,
} from "lucide-react"

const advisorTopics = [
  {
    id: "resume",
    title: "Resume Review",
    icon: FileText,
    description: "Get feedback on your resume and suggestions for improvement.",
    prompts: [
      "Review my resume for accessibility-friendly formatting",
      "How can I highlight my adaptive skills on my resume?",
      "What accommodations should I mention in my resume?",
    ],
  },
  {
    id: "interview",
    title: "Interview Preparation",
    icon: MessageSquare,
    description: "Practice interview questions and get tips for success.",
    prompts: [
      "How should I discuss my disability in an interview?",
      "Practice answering behavioral questions",
      "Tips for virtual interviews with my specific needs",
    ],
  },
  {
    id: "job-search",
    title: "Job Search Strategy",
    icon: Briefcase,
    description: "Develop a personalized job search strategy.",
    prompts: [
      "Find inclusive employers in my field",
      "How to research company accessibility policies",
      "Networking strategies for people with disabilities",
    ],
  },
  {
    id: "skill-development",
    title: "Skill Development",
    icon: GraduationCap,
    description: "Identify skills to develop for your career goals.",
    prompts: [
      "What skills are in demand for my field?",
      "Accessible learning resources for technical skills",
      "How to showcase my adaptive problem-solving skills",
    ],
  },
  {
    id: "career-path",
    title: "Career Path Planning",
    icon: Award,
    description: "Explore potential career paths based on your interests and abilities.",
    prompts: [
      "What careers match my abilities and interests?",
      "Career transition advice with my specific considerations",
      "Long-term career planning with disability considerations",
    ],
  },
  {
    id: "workplace-success",
    title: "Workplace Success",
    icon: Lightbulb,
    description: "Get advice on thriving in the workplace.",
    prompts: [
      "How to request reasonable accommodations",
      "Navigating workplace challenges",
      "Building professional relationships and self-advocacy",
    ],
  },
]

export function AdvisorSidebar() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Guidance Topics</h2>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <PanelRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-3">
        {advisorTopics.map((topic) => (
          <Card
            key={topic.id}
            className={`transition-all ${expanded === topic.id ? "border-primary" : "hover:border-primary/50"}`}
          >
            <CardContent className="p-4">
              <button
                className="flex items-start justify-between w-full text-left"
                onClick={() => setExpanded(expanded === topic.id ? null : topic.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{topic.title}</h3>
                    {expanded !== topic.id && (
                      <p className="text-sm text-muted-foreground line-clamp-1">{topic.description}</p>
                    )}
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${expanded === topic.id ? "rotate-90" : ""}`} />
              </button>

              {expanded === topic.id && (
                <div className="mt-4 space-y-3 pl-10">
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-medium text-muted-foreground">Try asking:</p>
                    {topic.prompts.map((prompt, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 font-normal"
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

