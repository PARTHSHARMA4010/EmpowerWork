import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, MessageSquareText, Briefcase, Building2, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { ImpactMetrics } from "@/components/impact-metrics"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Empowering PwDs with Careers</h1>
              <p className="text-lg md:text-xl text-white/90">
                AI-powered career training, job matching, and employer resources for people with disabilities.
              </p>
              <div className="flex flex-wrap gap-4">
              <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  asChild
                >
                  <Link href="/employers">Find Jobs</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/training">Start Learning</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  asChild
                >
                  <Link href="/employers">For Employers</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/image.png"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="AI-Powered Career Training"
              description="Personalized learning paths tailored to your abilities and career goals."
            />
            <FeatureCard
              icon={<MessageSquareText className="h-10 w-10 text-primary" />}
              title="AI Chatbot for Job Guidance"
              description="Get resume help, interview tips, and career advice 24/7."
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-primary" />}
              title="Inclusive Job Board"
              description="Find jobs with employers committed to accessibility and inclusion."
            />
            <FeatureCard
              icon={<Building2 className="h-10 w-10 text-primary" />}
              title="Employer Accessibility Support"
              description="Resources to help employers create inclusive workplaces."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <ImpactMetrics />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people with disabilities who have found meaningful careers through EmpowerWork.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Create Account</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Learn More <ChevronRight className="ml-2 h-4 w-4 text-black" /></Link>
              
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4">
          <Button variant="link" className="p-0 h-auto font-medium">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

