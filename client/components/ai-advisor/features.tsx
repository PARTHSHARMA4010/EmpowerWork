import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Briefcase, GraduationCap, Award, Lightbulb } from "lucide-react"

export function AIAdvisorFeatures() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">How Our AI Advisor Helps You</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI Career Advisor provides personalized guidance to help you navigate your career journey with confidence
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={FileText}
          title="Resume Enhancement"
          description="Get personalized feedback on your resume and learn how to highlight your unique skills and experiences"
        />
        <FeatureCard
          icon={MessageSquare}
          title="Interview Preparation"
          description="Practice answering common interview questions and receive feedback to improve your responses"
        />
        <FeatureCard
          icon={Briefcase}
          title="Job Search Strategy"
          description="Develop a personalized job search strategy and find inclusive employers in your field"
        />
        <FeatureCard
          icon={GraduationCap}
          title="Skill Development"
          description="Identify skills to develop for your career goals and find accessible learning resources"
        />
        <FeatureCard
          icon={Award}
          title="Career Path Planning"
          description="Explore potential career paths based on your interests, abilities, and goals"
        />
        <FeatureCard
          icon={Lightbulb}
          title="Workplace Success"
          description="Get advice on thriving in the workplace, requesting accommodations, and self-advocacy"
        />
      </div>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/80 to-primary" />
      <CardHeader className="pb-2">
        <div className="bg-primary/10 w-fit p-2 rounded-lg mb-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

