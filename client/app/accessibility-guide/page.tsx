import type { Metadata } from "next"
import Link from "next/link"
import {
  Eye,
  Ear,
  MousePointer,
  Brain,
  Building,
  FileText,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Lightbulb,
  Zap,
  Palette,
  Volume2,
  Headphones,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AccessibilityFeatureCard } from "@/components/accessibility/feature-card"
import { DisabilityGuideCard } from "@/components/accessibility/disability-guide-card"
import { AccessibilitySettingsPanel } from "@/components/accessibility/settings-panel"
import { WCAGChecklist } from "@/components/accessibility/wcag-checklist"
import { KeyboardShortcuts } from "@/components/accessibility/keyboard-shortcuts"
import { AccessibilityStats } from "@/components/accessibility/accessibility-stats"
import { AccessibilityFeatureDemo } from "@/components/accessibility/feature-demo"
import { BeforeAfterExamples } from "@/components/accessibility/before-after-examples"
import { VideoTutorials } from "@/components/accessibility/video-tutorials"

export const metadata: Metadata = {
  title: "Accessibility Guide | EmpowerWork",
  description: "Comprehensive accessibility guide for using the EmpowerWork platform",
}

export default function AccessibilityGuidePage() {
  return (
    <div className="container mx-auto py-6 md:py-10">
      {/* Skip links - visually hidden but available for keyboard users */}
      <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:z-50 focus-within:w-full focus-within:p-4 focus-within:bg-background focus-within:shadow-lg">
        <Link href="#main-content" className="block p-2 focus:outline-none focus:ring-2 focus:ring-primary">
          Skip to main content
        </Link>
        <Link href="#disability-guides" className="block p-2 focus:outline-none focus:ring-2 focus:ring-primary">
          Skip to disability guides
        </Link>
        <Link href="#accessibility-settings" className="block p-2 focus:outline-none focus:ring-2 focus:ring-primary">
          Skip to accessibility settings
        </Link>
      </div>

      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Accessibility Guide</h1>
        <p className="text-lg text-muted-foreground">Making employment and training accessible for everyone</p>
      </div>

      <Separator className="my-6" />

      {/* Main Content */}
      <div id="main-content" className="space-y-10">
        {/* Introduction */}
        <section className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Our Commitment to Accessibility</h2>
              <p className="mt-2 text-muted-foreground">
                At EmpowerWork, we believe that everyone deserves equal access to employment opportunities and career
                development resources. Our platform is designed with accessibility as a core principle, not an
                afterthought.
              </p>
              <p className="mt-4 text-muted-foreground">
                This guide provides comprehensive information about the accessibility features of our platform, tips for
                users with different disabilities, resources for employers, and technical implementation details for
                developers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="#accessibility-settings">Customize Your Experience</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#disability-guides">View Disability Guides</Link>
                </Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Standards</CardTitle>
                <CardDescription>EmpowerWork meets or exceeds the following accessibility standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">WCAG 2.1 AA Compliance</h3>
                    <p className="text-sm text-muted-foreground">
                      Our platform adheres to Web Content Accessibility Guidelines 2.1 Level AA standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">ADA Compliance</h3>
                    <p className="text-sm text-muted-foreground">
                      We comply with the Americans with Disabilities Act requirements for digital accessibility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Section 508</h3>
                    <p className="text-sm text-muted-foreground">
                      Our platform meets Section 508 requirements for federal information technology.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#wcag-checklist">
                    View Full Compliance Checklist
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

     

        {/* Interactive Feature Demo */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Experience Accessibility Features</h2>
            <p className="mt-2 text-muted-foreground">
              Try out different accessibility settings to see how they transform the user experience
            </p>
          </div>

          <AccessibilityFeatureDemo />
        </section>

        {/* Before & After Examples */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Accessibility in Action</h2>
            <p className="mt-2 text-muted-foreground">See the difference accessibility improvements make</p>
          </div>

          <BeforeAfterExamples />
        </section>

        {/* Platform Accessibility Features */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Platform Accessibility Features</h2>
            <p className="mt-2 text-muted-foreground">
              EmpowerWork includes a wide range of features to ensure accessibility for all users
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AccessibilityFeatureCard
              icon={<Palette className="h-5 w-5" />}
              title="Visual Adjustments"
              description="Features to enhance visual accessibility"
            >
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>High contrast mode</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Text resizing options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Color blindness accommodations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Focus indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Dark and light themes</span>
                </li>
              </ul>
            </AccessibilityFeatureCard>

            <AccessibilityFeatureCard
              icon={<Volume2 className="h-5 w-5" />}
              title="Audio & Speech"
              description="Features for hearing and speech accessibility"
            >
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Screen reader compatibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Closed captions for videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Transcripts for audio content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Text-to-speech functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Volume controls</span>
                </li>
              </ul>
            </AccessibilityFeatureCard>

            <AccessibilityFeatureCard
              icon={<MousePointer className="h-5 w-5" />}
              title="Navigation & Input"
              description="Features for motor accessibility"
            >
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Keyboard navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Voice commands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Skip navigation links</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Form auto-completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 rounded-full bg-primary/10 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Extended time options</span>
                </li>
              </ul>
            </AccessibilityFeatureCard>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Video Tutorials</h2>
            <p className="mt-2 text-muted-foreground">
              Learn how to use accessibility features through visual demonstrations
            </p>
          </div>

          <VideoTutorials />
        </section>

        {/* Disability Guides */}
        <section id="disability-guides" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Disability-Specific Guides</h2>
            <p className="mt-2 text-muted-foreground">Tailored guides for users with different types of disabilities</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DisabilityGuideCard
              icon={<Eye className="h-5 w-5" />}
              title="Visual Impairments"
              description="For users who are blind, have low vision, or are color blind"
              features={[
                "Screen reader optimization",
                "Keyboard navigation tips",
                "Color contrast settings",
                "Text resizing options",
                "Audio descriptions for visual content",
              ]}
              learnMoreHref="/accessibility-guide/visual"
            />

            <DisabilityGuideCard
              icon={<Ear className="h-5 w-5" />}
              title="Hearing Impairments"
              description="For users who are deaf or hard of hearing"
              features={[
                "Closed captioning for videos",
                "Transcripts for audio content",
                "Visual notifications",
                "Text-based communication options",
                "Sign language video resources",
              ]}
              learnMoreHref="/accessibility-guide/hearing"
            />

            <DisabilityGuideCard
              icon={<MousePointer className="h-5 w-5" />}
              title="Motor Disabilities"
              description="For users with limited mobility or dexterity"
              features={[
                "Keyboard-only navigation",
                "Voice command options",
                "Switch device compatibility",
                "Extended time settings",
                "Alternative input methods",
              ]}
              learnMoreHref="/accessibility-guide/motor"
            />

            <DisabilityGuideCard
              icon={<Brain className="h-5 w-5" />}
              title="Cognitive Disabilities"
              description="For users with learning disabilities, ADHD, or autism"
              features={[
                "Simplified interface options",
                "Reading assistance tools",
                "Distraction reduction settings",
                "Memory aids and reminders",
                "Predictive text and autocomplete",
              ]}
              learnMoreHref="/accessibility-guide/cognitive"
            />

            <DisabilityGuideCard
              icon={<Lightbulb className="h-5 w-5" />}
              title="Neurodivergent Conditions"
              description="For users with autism, ADHD, or other neurodivergent conditions"
              features={[
                "Sensory-friendly interface options",
                "Customizable notification settings",
                "Task breakdown and organization tools",
                "Focus mode for reduced distractions",
                "Flexible time management features",
              ]}
              learnMoreHref="/accessibility-guide/neurodivergent"
            />

            <DisabilityGuideCard
              icon={<Headphones className="h-5 w-5" />}
              title="Speech Disabilities"
              description="For users with speech impairments or who are non-verbal"
              features={[
                "Text-based communication options",
                "Alternative input methods",
                "Symbol and picture communication",
                "Predictive text and word suggestions",
                "Speech synthesis options",
              ]}
              learnMoreHref="/accessibility-guide/speech"
            />
          </div>
        </section>

        {/* Accessibility Settings */}
        <section id="accessibility-settings" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Customize Your Experience</h2>
            <p className="mt-2 text-muted-foreground">
              Adjust these settings to personalize your accessibility experience
            </p>
          </div>

          <AccessibilitySettingsPanel />
        </section>

        {/* Keyboard Shortcuts */}
        <section id="keyboard-shortcuts" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Keyboard Navigation</h2>
            <p className="mt-2 text-muted-foreground">Navigate EmpowerWork efficiently using keyboard shortcuts</p>
          </div>

          <KeyboardShortcuts />
        </section>

        {/* For Employers */}
        <section id="for-employers" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">For Employers</h2>
            <p className="mt-2 text-muted-foreground">Resources to help employers create accessible workplaces</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Workplace Accommodations</CardTitle>
                <CardDescription>Guidelines for providing reasonable accommodations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Types of Accommodations</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Physical workspace modifications</li>
                    <li>• Assistive technology solutions</li>
                    <li>• Flexible work arrangements</li>
                    <li>• Communication adaptations</li>
                    <li>• Job restructuring options</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Implementation Process</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Assessment of employee needs</li>
                    <li>• Evaluation of reasonable options</li>
                    <li>• Implementation timeline</li>
                    <li>• Effectiveness monitoring</li>
                    <li>• Periodic review and adjustment</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/employers/accommodations">
                    View Accommodation Guide
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessible Hiring Practices</CardTitle>
                <CardDescription>Create an inclusive recruitment and hiring process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Job Descriptions</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Focus on essential functions</li>
                    <li>• Use inclusive language</li>
                    <li>• Avoid unnecessary requirements</li>
                    <li>• Include accommodation statement</li>
                    <li>• Highlight accessibility features</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Interview Process</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Accessible application systems</li>
                    <li>• Alternative interview formats</li>
                    <li>• Accommodation options</li>
                    <li>• Bias-free assessment methods</li>
                    <li>• Accessible interview locations</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/employers/hiring">
                    View Hiring Guide
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* WCAG Checklist */}
        <section id="wcag-checklist" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">WCAG 2.1 Compliance Checklist</h2>
            <p className="mt-2 text-muted-foreground">
              Our platform's compliance with Web Content Accessibility Guidelines
            </p>
          </div>

          <WCAGChecklist />
        </section>

        {/* Technical Resources */}
        <section id="technical-resources" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Technical Resources</h2>
            <p className="mt-2 text-muted-foreground">Resources for developers implementing accessibility features</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Development Guidelines</CardTitle>
                <CardDescription>Best practices for accessible development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">HTML Structure</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Semantic HTML elements</li>
                    <li>• Proper heading hierarchy</li>
                    <li>• ARIA landmarks and roles</li>
                    <li>• Form label associations</li>
                    <li>• Skip navigation links</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Interactive Elements</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Keyboard accessibility</li>
                    <li>• Focus management</li>
                    <li>• ARIA states and properties</li>
                    <li>• Touch target sizing</li>
                    <li>• Error handling and validation</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/developers/guidelines">
                    View Developer Guidelines
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testing Tools</CardTitle>
                <CardDescription>Tools and methods for accessibility testing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Automated Testing</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Lighthouse (Google)</li>
                    <li>• Axe (Deque)</li>
                    <li>• WAVE (WebAIM)</li>
                    <li>• Pa11y</li>
                    <li>• Accessibility Insights (Microsoft)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Manual Testing</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Keyboard navigation testing</li>
                    <li>• Screen reader testing</li>
                    <li>• Color contrast checking</li>
                    <li>• Content readability assessment</li>
                    <li>• User testing with PwD</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/developers/testing">
                    View Testing Resources
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Help and Support */}
        <section id="help-support" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Help and Support</h2>
            <p className="mt-2 text-muted-foreground">Get assistance with accessibility features or report issues</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2 text-primary">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <CardTitle>Accessibility Support</CardTitle>
                <CardDescription>Get help with accessibility features</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our dedicated accessibility team is available to assist with any questions or issues related to
                  platform accessibility.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/contact?department=accessibility">Contact Support</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <CardTitle>Report an Issue</CardTitle>
                <CardDescription>Report accessibility barriers or bugs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If you encounter any accessibility barriers or issues while using our platform, please report them so
                  we can address them promptly.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/feedback?type=accessibility">Submit Feedback</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 w-fit rounded-full bg-primary/10 p-2 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle>Accessibility FAQ</CardTitle>
                <CardDescription>Frequently asked questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Find answers to common questions about our accessibility features, accommodations, and support
                  options.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/faq?category=accessibility">View FAQ</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

