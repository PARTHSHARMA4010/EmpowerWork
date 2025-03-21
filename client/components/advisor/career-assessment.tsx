"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"

type Question = {
  id: string
  text: string
  options: {
    id: string
    text: string
  }[]
}

const questions: Question[] = [
  {
    id: "q1",
    text: "Which type of work environment do you prefer?",
    options: [
      { id: "q1a", text: "Collaborative team environment" },
      { id: "q1b", text: "Independent work with minimal supervision" },
      { id: "q1c", text: "Mix of collaboration and independent work" },
      { id: "q1d", text: "Structured environment with clear guidelines" },
    ],
  },
  {
    id: "q2",
    text: "Which skills do you enjoy using the most?",
    options: [
      { id: "q2a", text: "Creative and artistic skills" },
      { id: "q2b", text: "Analytical and problem-solving skills" },
      { id: "q2c", text: "Communication and interpersonal skills" },
      { id: "q2d", text: "Technical and practical skills" },
    ],
  },
  {
    id: "q3",
    text: "What type of work pace do you prefer?",
    options: [
      { id: "q3a", text: "Fast-paced with varied tasks" },
      { id: "q3b", text: "Steady and predictable" },
      { id: "q3c", text: "Project-based with deadlines" },
      { id: "q3d", text: "Flexible and self-directed" },
    ],
  },
  {
    id: "q4",
    text: "What motivates you most in your work?",
    options: [
      { id: "q4a", text: "Making a positive impact on others" },
      { id: "q4b", text: "Learning and developing new skills" },
      { id: "q4c", text: "Recognition and advancement opportunities" },
      { id: "q4d", text: "Financial stability and compensation" },
    ],
  },
  {
    id: "q5",
    text: "Which workplace accommodations would be most helpful for you?",
    options: [
      { id: "q5a", text: "Flexible work hours or remote work options" },
      { id: "q5b", text: "Assistive technology or adaptive equipment" },
      { id: "q5c", text: "Modified workspace or ergonomic setup" },
      { id: "q5d", text: "Structured communication and clear instructions" },
    ],
  },
]

export function CareerAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const handleNext = () => {
    if (selectedOption) {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: selectedOption,
      }))

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedOption(null)
      } else {
        setIsComplete(true)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedOption(answers[questions[currentQuestion - 1].id] || null)
    }
  }

  const progress = ((currentQuestion + (selectedOption ? 0.5 : 0)) / questions.length) * 100

  if (isComplete) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
          <CardDescription>
            Thank you for completing the career assessment. Your results are being analyzed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <div className="rounded-full bg-primary/10 p-6 mb-6">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <p className="text-center max-w-md mb-6">
            Based on your responses, we'll provide personalized career recommendations that align with your preferences,
            skills, and accommodation needs.
          </p>
          <p className="text-center text-muted-foreground mb-8">
            Your AI Career Advisor is preparing insights about potential career paths that would be a good match for
            you.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>View My Career Recommendations</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Career Assessment</CardTitle>
        <CardDescription>
          Answer these questions to help us understand your preferences and provide personalized career guidance.
        </CardDescription>
        <Progress value={progress} className="mt-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{questions[currentQuestion].text}</h3>
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
            {questions[currentQuestion].options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext} disabled={!selectedOption}>
          {currentQuestion < questions.length - 1 ? (
            <>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

