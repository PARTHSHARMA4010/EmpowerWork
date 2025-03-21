import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Briefcase, GraduationCap, Award, Lightbulb } from "lucide-react"

export function AdvisorWelcome() {
  return (
    <div className="p-6 border-b bg-muted/30">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your AI Career Advisor</h2>
      <p className="text-muted-foreground mb-6">
        I'm here to provide personalized career guidance tailored to your unique abilities and goals. Choose a topic
        below to get started or type your question in the chat.
      </p>

      <Tabs defaultValue="popular">
        <TabsList className="mb-4">
          <TabsTrigger value="popular">Popular Topics</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="interview">Interviews</TabsTrigger>
          <TabsTrigger value="jobs">Job Search</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <QuickStartCard
              icon={<FileText className="h-5 w-5" />}
              title="Resume Review"
              description="Get feedback on your resume and suggestions for improvement"
              prompt="I need help improving my resume"
            />
            <QuickStartCard
              icon={<MessageSquare className="h-5 w-5" />}
              title="Interview Prep"
              description="Practice common interview questions and get feedback"
              prompt="Help me prepare for an upcoming interview"
            />
            <QuickStartCard
              icon={<Briefcase className="h-5 w-5" />}
              title="Job Search"
              description="Develop a personalized job search strategy"
              prompt="I need help with my job search strategy"
            />
            <QuickStartCard
              icon={<GraduationCap className="h-5 w-5" />}
              title="Skill Development"
              description="Identify skills to develop for your career goals"
              prompt="What skills should I develop for my career?"
            />
            <QuickStartCard
              icon={<Award className="h-5 w-5" />}
              title="Career Paths"
              description="Explore potential career paths based on your interests"
              prompt="What career paths might be good for me?"
            />
            <QuickStartCard
              icon={<Lightbulb className="h-5 w-5" />}
              title="Workplace Success"
              description="Get advice on thriving in the workplace"
              prompt="How can I succeed in my workplace?"
            />
          </div>
        </TabsContent>

        <TabsContent value="resume" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <QuickStartCard
              title="Resume Review"
              description="Get feedback on your current resume"
              prompt="Review my resume for improvements"
            />
            <QuickStartCard
              title="ATS Optimization"
              description="Make your resume ATS-friendly"
              prompt="How can I make my resume ATS-friendly?"
            />
            <QuickStartCard
              title="Highlight Achievements"
              description="Effectively showcase your accomplishments"
              prompt="Help me highlight my achievements on my resume"
            />
            <QuickStartCard
              title="Skills Section"
              description="Create an impactful skills section"
              prompt="How should I organize my skills section?"
            />
            <QuickStartCard
              title="Accessibility Formatting"
              description="Format your resume for accessibility"
              prompt="How can I make my resume more accessible?"
            />
            <QuickStartCard
              title="Cover Letter Help"
              description="Craft a compelling cover letter"
              prompt="Help me write a cover letter"
            />
          </div>
        </TabsContent>

        <TabsContent value="interview" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <QuickStartCard
              title="Common Questions"
              description="Practice answering frequently asked questions"
              prompt="What are common interview questions I should prepare for?"
            />
            <QuickStartCard
              title="Behavioral Questions"
              description="Prepare for behavioral interview questions"
              prompt="Help me prepare for behavioral interview questions"
            />
            <QuickStartCard
              title="Technical Interviews"
              description="Strategies for technical interviews"
              prompt="How should I prepare for a technical interview?"
            />
            <QuickStartCard
              title="Discussing Accommodations"
              description="How to discuss needed accommodations"
              prompt="How should I discuss accommodations in an interview?"
            />
            <QuickStartCard
              title="Virtual Interviews"
              description="Tips for successful virtual interviews"
              prompt="Give me tips for virtual interviews"
            />
            <QuickStartCard
              title="Questions to Ask"
              description="Prepare questions to ask employers"
              prompt="What questions should I ask in an interview?"
            />
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <QuickStartCard
              title="Job Search Strategy"
              description="Develop an effective job search plan"
              prompt="Help me create a job search strategy"
            />
            <QuickStartCard
              title="Inclusive Employers"
              description="Find disability-inclusive employers"
              prompt="How can I find disability-inclusive employers?"
            />
            <QuickStartCard
              title="Networking Tips"
              description="Effective networking strategies"
              prompt="Give me networking tips for my job search"
            />
            <QuickStartCard
              title="Job Application Process"
              description="Navigate the application process"
              prompt="Help me with the job application process"
            />
            <QuickStartCard
              title="Remote Work Opportunities"
              description="Find and secure remote work"
              prompt="How can I find remote work opportunities?"
            />
            <QuickStartCard
              title="Salary Negotiation"
              description="Negotiate your compensation package"
              prompt="How should I negotiate my salary?"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QuickStartCard({
  icon,
  title,
  description,
  prompt,
}: {
  icon?: React.ReactNode
  title: string
  description: string
  prompt: string
}) {
  return (
    <Card className="hover:border-primary/50 transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {icon && <div className="bg-primary/10 p-2 rounded-lg shrink-0">{icon}</div>}
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

